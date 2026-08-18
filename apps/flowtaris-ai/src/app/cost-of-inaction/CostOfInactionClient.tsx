'use client'

import { useState, useEffect, useRef, FormEvent, useMemo } from 'react'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label, Slider, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, BeforeAfterBar, StatTile } from '@repo/ui'
import { ArrowRight, ChevronRight, Shield, TrendingUp, Zap, Loader2, CheckCircle, AlertTriangle, Timer, DollarSign, BarChart2 } from 'lucide-react'
import { calculateInaction, breakEvenAnalysis, generateRiskNarrative, type InactionInputs, type InactionOutputs } from '@flowtaris/inaction-engine'
import { insertInactionCalculation } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'

// Sanity Inaction Config types
interface SanityInactionConfig {
  riskModels?: Array<{
    id: string
    name: string
    description: string
    category: string
    baseRate: number
    multipliers?: Record<string, number>
  }>
  formulas?: Record<string, string>
  industryMultipliers?: Record<string, number>
  sizeMultipliers?: Record<string, number>
  maturityMultipliers?: Record<string, number>
  regulatoryPressure?: Record<string, number>
  competitiveIntensity?: Record<string, number>
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
  geoSignals?: {
    keyClaims?: string[]
    faqItems?: Array<{ question: string; answer: string }>
    entityAssociations?: string[]
    topicClusters?: string[]
  }
}

// Default platforms fallback
const defaultPlatforms = [
  { value: 'NetSuite', label: 'NetSuite', multiplier: 1.0 },
  { value: 'Coupa', label: 'Coupa', multiplier: 1.15 },
  { value: 'SAP', label: 'SAP', multiplier: 1.25 },
  { value: 'Workday', label: 'Workday', multiplier: 1.05 },
]

// Default use cases fallback
const defaultUseCases = [
  { value: 'ap-automation', label: 'AP Automation (Invoice Processing)' },
  { value: 'po-matching', label: 'PO Matching & Reconciliation' },
  { value: 'cash-forecasting', label: 'Cash Flow Forecasting' },
  { value: 'expense-audit', label: 'Expense Audit & Compliance' },
  { value: 'vendor-onboarding', label: 'Vendor Onboarding' },
]

const defaultValues = {
  platform: 'NetSuite',
  useCase: 'ap-automation',
  annualVolume: 60000,
  avgManualHours: 15,
  hourlyCost: 45,
  errorRate: 3,
  competitivePressure: 'medium' as 'low' | 'medium' | 'high',
  complianceRequirements: 'basic' as 'none' | 'basic' | 'strict',
  monthsDelay: 6,
}

interface CalculatorState {
  platform: string
  useCase: string
  annualVolume: number
  avgManualHours: number
  hourlyCost: number
  errorRate: number
  competitivePressure: 'low' | 'medium' | 'high'
  complianceRequirements: 'none' | 'basic' | 'strict'
  monthsDelay: number
}

interface CostOfInactionClientProps {
  initialConfig: SanityInactionConfig | null
}

export default function CostOfInactionClient({ initialConfig }: CostOfInactionClientProps) {
  // Platforms and use cases could be enhanced with Sanity config, but the inaction-engine
  // uses its own hardcoded multipliers. We keep defaults for UI options.
  const platforms = defaultPlatforms
  const useCases = defaultUseCases

  const [state, setState] = useState<CalculatorState>(defaultValues)
  const [outputs, setOutputs] = useState<InactionOutputs | null>(null)
  const [breakEven, setBreakEven] = useState<ReturnType<typeof breakEvenAnalysis> | null>(null)
  const [narrative, setNarrative] = useState<string>('')
  const [inactionCalculationId, setInactionCalculationId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const initialCalculationDone = useRef(false)

  // Parse URL params for pre-fill from assessment or ROI calculator
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('erp')) {
      const erpValue = params.get('erp')!.charAt(0).toUpperCase() + params.get('erp')!.slice(1)
      const platformExists = platforms.some(p => p.value === erpValue)
      if (platformExists) {
        setState(prev => ({ ...prev, platform: erpValue }))
      }
    }
    if (params.get('invoices')) setState(prev => ({ ...prev, annualVolume: parseInt(params.get('invoices')!) || defaultValues.annualVolume }))
    if (params.get('useCase')) {
      const useCaseValue = params.get('useCase')!
      const useCaseExists = useCases.some(u => u.value === useCaseValue)
      if (useCaseExists) {
        setState(prev => ({ ...prev, useCase: useCaseValue }))
      }
    }
    if (params.get('hours')) setState(prev => ({ ...prev, avgManualHours: parseFloat(params.get('hours')!) || defaultValues.avgManualHours }))
    if (params.get('cost')) setState(prev => ({ ...prev, hourlyCost: parseInt(params.get('cost')!) || defaultValues.hourlyCost }))
    if (params.get('errorRate')) setState(prev => ({ ...prev, errorRate: parseFloat(params.get('errorRate')!) || defaultValues.errorRate }))
    if (params.get('competitivePressure')) setState(prev => ({ ...prev, competitivePressure: params.get('competitivePressure')! as 'low' | 'medium' | 'high' }))
    if (params.get('compliance')) setState(prev => ({ ...prev, complianceRequirements: params.get('compliance')! as 'none' | 'basic' | 'strict' }))
    if (params.get('delay')) setState(prev => ({ ...prev, monthsDelay: parseInt(params.get('delay')!) || defaultValues.monthsDelay }))

    // Track inaction calculator open
    const source = params.get('roiCalcId') ? 'roi' : params.get('assessmentId') ? 'assessment' : 'direct'
    analytics.inaction.open({ source })
  }, [])

  const calculateDerived = (s: CalculatorState): { outputs: InactionOutputs; inputs: InactionInputs } => {
    const inactionInputs: InactionInputs = {
      annualVolume: s.annualVolume,
      avgManualHoursPerUnit: s.avgManualHours / 60, // minutes to hours
      hourlyCost: s.hourlyCost,
      errorRate: s.errorRate / 100, // percentage to decimal
      platform: s.platform,
      useCase: s.useCase,
      competitivePressure: s.competitivePressure,
      complianceRequirements: s.complianceRequirements,
      monthsDelay: s.monthsDelay,
    }

    const outputs = calculateInaction(inactionInputs)
    return { outputs, inputs: inactionInputs }
  }

  // Calculate on state change
  useEffect(() => {
    const { outputs: derivedOutputs, inputs: inactionInputs } = calculateDerived(state)
    setOutputs(derivedOutputs)
    setBreakEven(breakEvenAnalysis(inactionInputs))
    setNarrative(generateRiskNarrative(inactionInputs, derivedOutputs))

    if (initialCalculationDone.current) {
      // Track calculate event on significant changes
      analytics.inaction.calculate({
        monthlyLeakage: derivedOutputs.monthlyLeakage,
        annualRisk: derivedOutputs.annualRisk,
        competitiveGap: derivedOutputs.competitiveGap,
      })
    } else {
      initialCalculationDone.current = true
    }
  }, [state])

  const handleSliderChange = (key: keyof CalculatorState) => (value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    setState(prev => ({ ...prev, [key]: v }))
  }

  const handleSelectChange = (key: keyof CalculatorState) => (value: string) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    const { outputs: derivedOutputs, inputs: inactionInputs } = calculateDerived(state)

    // Track calculate event
    analytics.inaction.calculate({
      monthlyLeakage: derivedOutputs.monthlyLeakage,
      annualRisk: derivedOutputs.annualRisk,
      competitiveGap: derivedOutputs.competitiveGap,
    })

    // Save to Supabase
    try {
      const { data, error } = await insertInactionCalculation({
        inputs: inactionInputs as unknown as Record<string, unknown>,
        outputs: derivedOutputs as unknown as Record<string, unknown>,
        email: null,
        roi_calc_id: new URLSearchParams(window.location.search).get('roiCalcId'),
      })
      if (!error && data) setInactionCalculationId(data.id)
    } catch (err) {
      console.error('Inaction save error:', err)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !inactionCalculationId || !outputs) return

    setIsSubmitting(true)
    try {
      // Track email capture using analytics helper
      analytics.inaction.emailCapture({
        email,
        monthlyLeakage: outputs.monthlyLeakage,
        annualRisk: outputs.annualRisk,
      })
      // Also track the demo CTA click
      analytics.inaction.ctaClick({ ctaType: 'demo' })

      // Get URL params for context
      const params = new URLSearchParams(window.location.search)
      const assessmentId = params.get('assessmentId') || undefined
      const roiCalcId = params.get('roiCalcId') || undefined

      // Call demo request API to send confirmation email and notify team
      try {
        await fetch('/api/leads/demo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            name: email.split('@')[0], // Use email prefix as name fallback
            company: '', // Could be enhanced with company lookup
            assessmentId,
            roiCalcId,
            urgently: outputs && outputs.monthlyLeakage > 100000 ? 'high' : 'standard',
          }),
        })
      } catch (demoErr) {
        console.error('Demo request notification failed:', demoErr)
        // Don't fail the whole flow if demo API fails
      }

      setEmailSent(true)
    } catch (err) {
      console.error('Email capture error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (val: number) => '$' + val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })

  if (!outputs) return null

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Cost of<br />Inaction',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap, and cost of 6-month delay.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Calculate My Risk', variant: 'default', className: 'glass-strong', href: '#calculator' },
          secondary: { label: 'ROI Calculator First', variant: 'outline', className: 'glass', href: '/roi-calculator' },
        }}
        stats={{
          items: [
            { label: '$2.1M', value: 'Avg Annual Leakage' },
            { label: '$480K', value: 'Avg Compliance Risk' },
            { label: '3.2x', value: 'Competitive Gap' },
            { label: '6 mo', value: 'Typical Delay Cost' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="inaction-heading" id="calculator">
          <Container size="xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Inputs Panel */}
              <div className="lg:col-span-1">
                <Card className="glass-card sticky top-24 h-fit">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-badge badge-outline text-brand-amber-400 border-brand-amber-400/50 text-body-xs">
                        Inputs
                      </span>
                    </div>
                    <CardTitle className="text-headline-lg">Configure Your Risk Scenario</CardTitle>
                    <p className="text-body-md text-neutral-400">Adjust values to see the true cost of delay</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Platform Selector */}
                    <div>
                      <Label className="block text-body-sm text-neutral-300 mb-2">ERP Platform</Label>
                      <Select value={state.platform} onValueChange={handleSelectChange('platform')}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                              {p.label} <span className="text-neutral-400 ml-2">({p.multiplier}x risk)</span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Use Case Selector */}
                    <div>
                      <Label className="block text-body-sm text-neutral-300 mb-2">Use Case</Label>
                      <Select value={state.useCase} onValueChange={handleSelectChange('useCase')}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select use case" />
                        </SelectTrigger>
                        <SelectContent>
                          {useCases.map((u) => (
                            <SelectItem key={u.value} value={u.value}>
                              {u.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Volume Slider */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Annual Invoice Volume</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">{state.annualVolume.toLocaleString()}</span>
                      </Label>
                      <Slider
                        value={[state.annualVolume]}
                        onValueChange={handleSliderChange('annualVolume')}
                        min={1000}
                        max={500000}
                        step={1000}
                        className="accent-brand-cyan-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">1,000 - 500,000 invoices/year</p>
                    </div>

                    {/* Manual Hours Slider */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Avg Manual Minutes/Invoice</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">{state.avgManualHours}</span>
                      </Label>
                      <Slider
                        value={[state.avgManualHours]}
                        onValueChange={handleSliderChange('avgManualHours')}
                        min={1}
                        max={60}
                        step={0.5}
                        className="accent-brand-cyan-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">Minutes per invoice</p>
                    </div>

                    {/* Hourly Cost Slider */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Fully Loaded Hourly Cost ($)</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">${state.hourlyCost}</span>
                      </Label>
                      <Slider
                        value={[state.hourlyCost]}
                        onValueChange={handleSliderChange('hourlyCost')}
                        min={15}
                        max={150}
                        step={5}
                        className="accent-brand-cyan-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">Includes benefits, overhead, management</p>
                    </div>

                    {/* Error Rate Slider */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Current Error Rate (%)</span>
                        <span className="text-brand-amber-400 font-mono tabular-nums">{state.errorRate.toFixed(1)}%</span>
                      </Label>
                      <Slider
                        value={[state.errorRate]}
                        onValueChange={handleSliderChange('errorRate')}
                        min={0}
                        max={10}
                        step={0.1}
                        className="accent-brand-amber-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">Percentage of invoices requiring rework</p>
                    </div>

                    {/* Competitive Pressure */}
                    <div>
                      <Label className="block text-body-sm text-neutral-300 mb-2">Competitive Pressure</Label>
                      <Select value={state.competitivePressure} onValueChange={handleSelectChange('competitivePressure')}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select pressure level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Stable market, few competitors automating</SelectItem>
                          <SelectItem value="medium">Medium - Some competitors adopting AI</SelectItem>
                          <SelectItem value="high">High - Competitors rapidly automating, losing deals</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Compliance Requirements */}
                    <div>
                      <Label className="block text-body-sm text-neutral-300 mb-2">Compliance Requirements</Label>
                      <Select value={state.complianceRequirements} onValueChange={handleSelectChange('complianceRequirements')}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select compliance level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None - No specific regulatory requirements</SelectItem>
                          <SelectItem value="basic">Basic - Standard financial controls (SOX, GAAP)</SelectItem>
                          <SelectItem value="strict">Strict - Heavy regulation (GDPR, HIPAA, PCI-DSS, Industry-specific)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Delay Months */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Delay Period (months)</span>
                        <span className="text-brand-red-400 font-mono tabular-nums">{state.monthsDelay}</span>
                      </Label>
                      <Slider
                        value={[state.monthsDelay]}
                        onValueChange={handleSliderChange('monthsDelay')}
                        min={0}
                        max={36}
                        step={1}
                        className="accent-brand-red-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">How long until you implement?</p>
                    </div>

                    {/* Pre-fill notice */}
                    <div className="glass rounded-xl p-4 border border-brand-amber-500/20">
                      <p className="text-body-sm text-brand-amber-300 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Pre-filled from Assessment/ROI? <a href="#" className="underline hover:text-brand-amber-200">Use URL params</a></span>
                      </p>
                    </div>

                    {/* Calculate Button */}
                    <Button
                      onClick={handleCalculate}
                      disabled={isCalculating}
                      className="glass-strong w-full py-3"
                      size="lg"
                    >
                      {isCalculating ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Calculating Risk...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-4 w-4" />
                          Calculate & Save Risk Analysis
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Results Panel */}
              <div className="lg:col-span-2 space-y-8">
                {/* Key Metrics Strip using shared StatTile components */}
                <div className="grid gap-4 md:grid-cols-4">
                  <StatTile
                    label="Monthly Leakage"
                    value={formatCurrency(outputs.monthlyLeakage)}
                    variant="error"
                    icon={<DollarSign className="h-6 w-6" />}
                    iconBg="bg-brand-red-500/20"
                  />
                  <StatTile
                    label="Annual Risk Exposure"
                    value={formatCurrency(outputs.annualRisk)}
                    variant="warning"
                    icon={<AlertTriangle className="h-6 w-6" />}
                    iconBg="bg-brand-amber-500/20"
                  />
                  <StatTile
                    label="3-Year Competitive Gap"
                    value={formatCurrency(outputs.competitiveGap)}
                    variant="gradient"
                    icon={<TrendingUp className="h-6 w-6" />}
                    iconBg="bg-brand-purple-500/20"
                  />
                  <StatTile
                    label={`Cost of ${state.monthsDelay}-Month Delay`}
                    value={formatCurrency(outputs.costOfDelay)}
                    variant="primary"
                    icon={<Timer className="h-6 w-6" />}
                    iconBg="bg-brand-cyan-500/20"
                  />
                </div>

                {/* Before/After Bar - Monthly Leakage vs Zero */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-headline-lg flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-brand-cyan-400" />
                      Inaction Impact Visualization
                    </CardTitle>
                    <p className="text-body-md text-neutral-400">Monthly leakage accumulating over time</p>
                  </CardHeader>
                  <CardContent>
                    <BeforeAfterBar
                      before={outputs.threeYearProjectedLoss}
                      after={0}
                      beforeLabel="3-Year Projected Loss (No Action)"
                      afterLabel="With Full Automation"
                      unit="$"
                      unitPosition="prefix"
                      variant="savings"
                      size="md"
                      showChange={true}
                    />
                  </CardContent>
                </Card>

                {/* Risk Narrative */}
                <Card className="glass-card border-l-4 border-brand-red-500">
                  <CardHeader>
                    <CardTitle className="text-headline-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-brand-red-400" />
                      Risk Narrative
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-md text-neutral-300">{narrative}</p>
                  </CardContent>
                </Card>

                {/* Detailed Breakdown */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-headline-sm flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-brand-amber-400" />
                        Cost Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="glass rounded-xl p-4">
                        <p className="text-body-sm text-neutral-400 mb-2">3-Year Projected Loss (if never implemented)</p>
                        <p className="text-number-xl text-brand-red-400 font-display tabular-nums">{formatCurrency(outputs.threeYearProjectedLoss)}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="glass rounded-xl p-4 text-center">
                          <p className="text-overline text-neutral-400 tracking-wider">Monthly</p>
                          <p className="text-number-lg text-brand-red-400 font-display tabular-nums">{formatCurrency(outputs.monthlyLeakage)}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                          <p className="text-overline text-neutral-400 tracking-wider">Annual</p>
                          <p className="text-number-lg text-brand-amber-400 font-display tabular-nums">{formatCurrency(outputs.annualRisk)}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                          <p className="text-overline text-neutral-400 tracking-wider">Competitive</p>
                          <p className="text-number-lg text-brand-purple-400 font-display tabular-nums">{formatCurrency(outputs.competitiveGap)}</p>
                        </div>
                        <div className="glass rounded-xl p-4 text-center">
                          <p className="text-overline text-neutral-400 tracking-wider">{state.monthsDelay}mo Delay</p>
                          <p className="text-number-lg text-brand-cyan-400 font-display tabular-nums">{formatCurrency(outputs.costOfDelay)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-headline-sm flex items-center gap-2">
                        <Shield className="h-5 w-5 text-brand-green-400" />
                        Break-Even Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {breakEven && (
                        <>
                          <div className="glass rounded-xl p-4">
                            <p className="text-body-sm text-neutral-400 mb-2">Months to break even on implementation</p>
                            <p className="text-number-2xl text-brand-green-400 font-display tabular-nums">{breakEven.monthsToBreakEven}</p>
                          </div>
                          <div className="glass rounded-xl p-4">
                            <p className="text-body-sm text-neutral-400 mb-2">Break-even date</p>
                            <p className="text-headline-md text-brand-green-400 font-display">{breakEven.breakEvenDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          </div>
                          <div className="glass rounded-xl p-4">
                            <p className="text-body-sm text-neutral-400 mb-2">Monthly leakage continues during implementation</p>
                            <p className="text-headline-md text-brand-amber-400 font-display">{formatCurrency(breakEven.monthlyLeakage)}/mo</p>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Visualization */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-headline-lg flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-brand-cyan-400" />
                      Leakage Timeline
                    </CardTitle>
                    <p className="text-body-md text-neutral-400">Cumulative cost of inaction over 36 months</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 relative">
                      {/* Simple SVG chart for timeline */}
                      <svg className="w-full h-full" viewBox="0 0 800 256" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="leakageGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#D93D3D" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#D93D3D" stopOpacity="0.05" />
                          </linearGradient>
                          <linearGradient id="riskGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                            <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>
                        {/* Leakage area */}
                        <path
                          d={`M 40,200 L ${Array.from({length: 36}, (_, i) => {
                            const x = 40 + (i * 720 / 35)
                            const y = 200 - (outputs.monthlyLeakage * (i + 1) * 200 / outputs.threeYearProjectedLoss)
                            return `${x},${y}`
                          }).join(' L ')} L 760,200 Z`}
                          fill="url(#leakageGradient)"
                          stroke="#D93D3D"
                          strokeWidth="2"
                        />
                        {/* Risk line */}
                        <path
                          d={`M 40,200 L ${Array.from({length: 36}, (_, i) => {
                            const x = 40 + (i * 720 / 35)
                            const y = 200 - (outputs.annualRisk / 12 * (i + 1) * 200 / outputs.threeYearProjectedLoss)
                            return `${x},${y}`
                          }).join(' L ')}`}
                          fill="none"
                          stroke="#FF8C00"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        {/* Delay marker */}
                        {state.monthsDelay > 0 && state.monthsDelay <= 36 && (
                          <>
                            <line
                              x1={40 + (state.monthsDelay * 720 / 35)}
                              y1={40}
                              x2={40 + (state.monthsDelay * 720 / 35)}
                              y2={200}
                              stroke="#00C9B1"
                              strokeWidth="2"
                              strokeDasharray="5,5"
                            />
                            <circle
                              cx={40 + (state.monthsDelay * 720 / 35)}
                              cy={40}
                              r={6}
                              fill="#00C9B1"
                            />
                            <text
                              x={40 + (state.monthsDelay * 720 / 35)}
                              y={30}
                              textAnchor="middle"
                              fill="#00C9B1"
                              fontSize="10"
                              fontWeight="bold"
                            >
                              Delay Point
                            </text>
                          </>
                        )}
                      </svg>
                      {/* Axis labels */}
                      <div className="flex justify-between text-body-xs text-neutral-500 mt-4 px-4">
                        <span>Now</span>
                        <span>6 mo</span>
                        <span>12 mo</span>
                        <span>18 mo</span>
                        <span>24 mo</span>
                        <span>30 mo</span>
                        <span>36 mo</span>
                      </div>
                      <div className="flex gap-2 text-body-xs text-neutral-500 mt-2 px-4">
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-brand-red-500" /> Leakage</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-brand-amber-500 border-t border-dashed" /> Risk</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-brand-cyan-500" /> Delay</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Email Capture & Next Steps */}
            <div className="mt-12">
              <Card className="glass-strong border border-brand-red-500/30 bg-brand-red-500/5">
                <CardContent className="p-8 md:p-12 text-center">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <AlertTriangle className="h-8 w-8 text-brand-red-400" />
                    <h3 className="text-display-md text-gradient-brand mb-0 text-balance">
                      Don't Let Inaction Cost You
                    </h3>
                  </div>
                  <p className="text-headline-md text-neutral-300 mb-8 max-w-2xl mx-auto text-balance">
                    Every month of delay costs you <span className="text-brand-red-400 font-bold">{formatCurrency(outputs.monthlyLeakage)}/month</span>.
                    Get a personalized demo showing how Flowtaris AI stops the leakage in 30 days.
                  </p>

                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="flex-1 glass max-w-md"
                      disabled={emailSent || isSubmitting}
                      required
                    />
                    <Button type="submit" size="lg" className="glass-strong px-10 py-4" disabled={emailSent || isSubmitting || !email}>
                      {emailSent ? (
                        <>
                          <CheckCircle className="mr-2 h-5 w-5" />
                          Demo Requested
                        </>
                      ) : isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Requesting...
                        </>
                      ) : (
                        <>
                          Book Demo - Stop the Leakage
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-body-xs text-neutral-500 mb-8">
                    {emailSent ? 'We\'ll contact you within 4 hours to schedule your demo.' : "We'll contact you within 4 hours. Includes full risk assessment & implementation plan."}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="glass px-10 py-4"
                      asChild
                      onClick={() => analytics.inaction.ctaClick({ ctaType: 'roi' })}
                    >
                      <a href="/roi-calculator">
                        <TrendingUp className="mr-2 h-5 w-5" />
                        Back to ROI Calculator
                      </a>
                    </Button>
                    <Button
                      variant="ghost"
                      size="lg"
                      className="px-10 py-4"
                      asChild
                      onClick={() => analytics.inaction.ctaClick({ ctaType: 'assessment' })}
                    >
                      <a href="/assessment">
                        <BarChart2 className="mr-2 h-5 w-5" />
                        Start Over: Assessment
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
              Built with Flowtaris AI Design System
            </p>
            <div className="flex items-center gap-6">
              <a href="/cost-of-inaction" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Cost of Inaction</a>
              <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}