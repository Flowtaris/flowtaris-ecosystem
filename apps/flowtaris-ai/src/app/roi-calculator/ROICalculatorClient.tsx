'use client'

import { useState, useEffect, useRef, FormEvent, useMemo } from 'react'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label, Slider, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, BeforeAfterBar, StatTile } from '@repo/ui'
import { ArrowRight, ChevronRight, BarChart3, DollarSign, Shield, TrendingUp, Calculator, Zap, Loader2, CheckCircle } from 'lucide-react'
import { calculateROI, type ROIInputs, sensitivityAnalysis } from '@flowtaris/roi-engine'
import { insertROICalculation } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'

// Sanity ROI Config types
interface SanityROIConfig {
  assumptions?: {
    avgHourlyCost?: number
    workingDaysPerYear?: number
    hoursPerDay?: number
    implementationWeeks?: number
    implementationCostPerWeek?: number
    discountRate?: number
    platformMultipliers?: Record<string, number>
    useCaseMultipliers?: Array<{
      id: string
      name: string
      automationRate: number
      errorReduction: number
      timeSavings: number
      description: string
    }>
  }
  formulas?: Record<string, string>
  benchmarks?: Array<{
    industry: string
    avgAutomationRate: number
    avgPaybackMonths: number
    avgRoi: number
    source: string
    year: number
  }>
  sensitivityRanges?: {
    volumeVariance?: number
    costVariance?: number
    automationVariance?: number
  }
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
  { value: 'NetSuite', label: 'NetSuite', multiplier: 1.2 },
  { value: 'Coupa', label: 'Coupa', multiplier: 1.15 },
  { value: 'SAP', label: 'SAP', multiplier: 1.25 },
  { value: 'Workday', label: 'Workday', multiplier: 1.1 },
  { value: 'Salesforce', label: 'Salesforce', multiplier: 1.05 },
]

// Default use cases fallback
const defaultUseCases = [
  { value: 'ap-automation', label: 'AP Automation (Invoice Processing)', automationRate: 85, errorReduction: 95, timeSavings: 90 },
  { value: 'po-matching', label: 'PO Matching & Reconciliation', automationRate: 80, errorReduction: 92, timeSavings: 85 },
  { value: 'cash-forecasting', label: 'Cash Flow Forecasting', automationRate: 70, errorReduction: 60, timeSavings: 80 },
  { value: 'expense-audit', label: 'Expense Audit & Compliance', automationRate: 75, errorReduction: 88, timeSavings: 70 },
  { value: 'vendor-onboarding', label: 'Vendor Onboarding', automationRate: 65, errorReduction: 80, timeSavings: 75 },
]

const defaultValues = {
  platform: 'NetSuite',
  useCase: 'ap-automation',
  annualVolume: 60000,
  avgManualHours: 15,
  hourlyCost: 45,
  errorRate: 3,
  currentAutomation: 10,
}

interface CalculatorState {
  platform: string
  useCase: string
  annualVolume: number
  avgManualHours: number
  hourlyCost: number
  errorRate: number
  currentAutomation: number
}

interface DerivedState {
  manualCost: number
  autoCost: number
  annualSavings: number
  payback: number
  fteFreed: number
  breakdownManual: number
  breakdownImpl: number
  breakdownYear1: number
  breakdownNpv: number
  sensBest: number
  sensExpected: number
  sensConservative: number
}

interface ROICalculatorClientProps {
  initialConfig: SanityROIConfig | null
}

export default function ROICalculatorClient({ initialConfig }: ROICalculatorClientProps) {
  // Build platforms from Sanity config or use defaults
  const platforms = useMemo(() => {
    if (initialConfig?.assumptions?.platformMultipliers) {
      return Object.entries(initialConfig.assumptions.platformMultipliers).map(([value, multiplier]) => ({
        value,
        label: value,
        multiplier,
      }))
    }
    return defaultPlatforms
  }, [initialConfig])

  // Build use cases from Sanity config or use defaults
  const useCases = useMemo(() => {
    if (initialConfig?.assumptions?.useCaseMultipliers) {
      return initialConfig.assumptions.useCaseMultipliers.map(u => ({
        value: u.id,
        label: u.name,
        automationRate: u.automationRate,
        errorReduction: u.errorReduction,
        timeSavings: u.timeSavings,
        description: u.description,
      }))
    }
    return defaultUseCases
  }, [initialConfig])

  // Default values from Sanity config
  const configDefaults = useMemo(() => {
    const assumptions = initialConfig?.assumptions
    return {
      platform: defaultValues.platform,
      useCase: defaultValues.useCase,
      annualVolume: defaultValues.annualVolume,
      avgManualHours: defaultValues.avgManualHours,
      hourlyCost: assumptions?.avgHourlyCost || defaultValues.hourlyCost,
      errorRate: defaultValues.errorRate,
      currentAutomation: defaultValues.currentAutomation,
    }
  }, [initialConfig])

  const [state, setState] = useState<CalculatorState>(configDefaults)
  const [derived, setDerived] = useState<DerivedState>({
    manualCost: 0, autoCost: 0, annualSavings: 0, payback: 0, fteFreed: 0,
    breakdownManual: 0, breakdownImpl: 0, breakdownYear1: 0, breakdownNpv: 0,
    sensBest: 0, sensExpected: 0, sensConservative: 0,
  })
  const [roiCalculationId, setRoiCalculationId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)
  const initialCalculationDone = useRef(false)

  // Parse URL params for pre-fill from assessment
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('erp')) {
      const erpValue = params.get('erp')!.charAt(0).toUpperCase() + params.get('erp')!.slice(1)
      // Validate platform exists in config
      const platformExists = platforms.some(p => p.value === erpValue)
      if (platformExists) {
        setState(prev => ({ ...prev, platform: erpValue }))
      }
    }
    if (params.get('invoices')) setState(prev => ({ ...prev, annualVolume: parseInt(params.get('invoices')!) || configDefaults.annualVolume }))
    if (params.get('useCase')) {
      const useCaseValue = params.get('useCase')!
      const useCaseExists = useCases.some(u => u.value === useCaseValue)
      if (useCaseExists) {
        setState(prev => ({ ...prev, useCase: useCaseValue }))
      }
    }

    // Track ROI calculator open
    analytics.roi.open({
      source: params.get('assessmentId') ? 'assessment' : 'direct',
      prefilled: params.get('assessmentId') ? {
        erp: params.get('erp') || undefined,
        invoices: params.get('invoices') ? parseInt(params.get('invoices')!) : undefined,
        useCase: params.get('useCase') || undefined,
      } : undefined,
    })
  }, [platforms, useCases, configDefaults])

  const calculateDerived = (s: CalculatorState): DerivedState => {
    const roiInputs: ROIInputs = {
      annualVolume: s.annualVolume,
      avgManualHoursPerUnit: s.avgManualHours / 60, // minutes to hours
      hourlyCost: s.hourlyCost,
      errorRate: s.errorRate / 100, // percentage to decimal
      platform: s.platform,
      useCase: s.useCase,
    }

    const roiOutputs = calculateROI(roiInputs)
    const sens = sensitivityAnalysis(roiInputs)

    return {
      manualCost: Math.round(roiOutputs.annualSavings / 0.75),
      autoCost: Math.round(roiOutputs.annualSavings / 0.75) - roiOutputs.annualSavings,
      annualSavings: roiOutputs.annualSavings,
      payback: roiOutputs.paybackMonths,
      fteFreed: roiOutputs.fteFreed,
      breakdownManual: Math.round(roiOutputs.annualSavings / 0.75),
      breakdownImpl: roiOutputs.implementationCost,
      breakdownYear1: roiOutputs.netAnnualBenefit,
      breakdownNpv: Math.round(roiOutputs.annualSavings * 3 * 0.8),
      sensBest: sens[2]?.annualSavings || roiOutputs.annualSavings * 1.2,
      sensExpected: roiOutputs.annualSavings,
      sensConservative: sens[0]?.annualSavings || roiOutputs.annualSavings * 0.6,
    }
  }

  // Calculate on state change
  useEffect(() => {
    const d = calculateDerived(state)
    setDerived(d)
    if (initialCalculationDone.current) {
      // Debounce for real-time updates
      // Track calculate event on significant changes
    } else {
      initialCalculationDone.current = true
    }
  }, [state])

  // Track inputs change
  const handleSliderChange = (key: keyof CalculatorState) => (value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    setState(prev => ({ ...prev, [key]: v }))
    analytics.roi.inputsChange({ field: key, value: v })
  }

  const handleSelectChange = (key: keyof CalculatorState) => (value: string) => {
    setState(prev => ({ ...prev, [key]: value }))
    analytics.roi.inputsChange({ field: key, value })
  }

  const handleCalculate = async () => {
    setIsCalculating(true)
    const d = calculateDerived(state)

    // Track calculate event
    analytics.roi.calculate({
      projectedSavings: d.annualSavings,
      paybackMonths: d.payback,
      fteFreed: d.fteFreed,
      assessmentId: new URLSearchParams(window.location.search).get('assessmentId') || undefined,
    })

    // Save to Supabase
    try {
      const { data, error } = await insertROICalculation({
        inputs: state as unknown as Record<string, unknown>,
        outputs: d as unknown as Record<string, unknown>,
        email: null,
        assessment_id: new URLSearchParams(window.location.search).get('assessmentId'),
      })
      if (!error && data) setRoiCalculationId(data.id)
    } catch (err) {
      console.error('ROI save error:', err)
    } finally {
      setIsCalculating(false)
    }
  }

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !roiCalculationId) return

    setIsSubmitting(true)
    try {
      analytics.roi.emailCapture({
        email,
        assessmentId: new URLSearchParams(window.location.search).get('assessmentId') || undefined,
        projectedSavings: derived.annualSavings,
      })
      setEmailSent(true)
    } catch (err) {
      console.error('Email capture error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatCurrency = (val: number) => '$' + val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  const formatNumber = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'ROI Calculator',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Calculate your AI automation ROI with live sliders. Real-time projections for annual savings, payback period, and FTE freed based on your ERP, volume, and use case.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Calculate ROI', variant: 'default', className: 'glass-strong', href: '#calculator' },
          secondary: { label: 'Assessment First', variant: 'outline', className: 'glass', href: '/assessment' },
        }}
        stats={{
          items: [
            { label: '$4.5M', value: 'Avg Annual Savings' },
            { label: '3 mo', value: 'Avg Payback' },
            { label: '85%', value: 'Avg Automation' },
            { label: '12 FTE', value: 'Avg Freed' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="calculator-heading" id="calculator">
          <Container size="xl">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Inputs Panel */}
              <div className="lg:col-span-1">
                <Card className="glass-card sticky top-24 h-fit">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-badge badge-outline text-brand-cyan-400 border-brand-cyan-400/50 text-body-xs">
                        Inputs
                      </span>
                    </div>
                    <CardTitle className="text-headline-lg">Configure Your Scenario</CardTitle>
                    <p className="text-body-md text-neutral-400">Adjust values to see live ROI updates</p>
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
                              {p.label} <span className="text-neutral-400 ml-2">({p.multiplier}x)</span>
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
                              {u.label} <span className="text-neutral-400 ml-2">({u.automationRate}% auto)</span>
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

                    {/* Current Automation Slider */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Current Automation Level (%)</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">{state.currentAutomation}%</span>
                      </Label>
                      <Slider
                        value={[state.currentAutomation]}
                        onValueChange={handleSliderChange('currentAutomation')}
                        min={0}
                        max={90}
                        step={5}
                        className="accent-brand-cyan-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">Existing OCR/RPA/automation coverage</p>
                    </div>

                    {/* Pre-fill notice */}
                    <div className="glass rounded-xl p-4 border border-brand-amber-500/20">
                      <p className="text-body-sm text-brand-amber-300 flex items-center gap-2">
                        <Zap className="h-4 w-4" />
                        <span>Pre-filled from Assessment? <a href="#" className="underline hover:text-brand-amber-200">Use URL params</a></span>
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
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="mr-2 h-4 w-4" />
                          Calculate & Save ROI
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Live Visualization Panel */}
              <div className="lg:col-span-2 space-y-8">
                {/* Before/After Visualization using shared component */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="text-headline-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-brand-cyan-400" />
                      Live Impact Visualization
                    </CardTitle>
                    <p className="text-body-md text-neutral-400">Before vs After AI Automation</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <BeforeAfterBar
                        before={derived.manualCost}
                        after={derived.autoCost}
                        beforeLabel="Current Manual Cost (Annual)"
                        afterLabel="Projected Automated Cost (Annual)"
                        unit="$"
                        unitPosition="prefix"
                        variant="savings"
                        size="md"
                        showChange={true}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Key Metrics using shared StatTile components */}
                <div className="grid gap-4 md:grid-cols-3">
                  <StatTile
                    label="Annual Savings"
                    value={formatCurrency(derived.annualSavings)}
                    variant="primary"
                    icon={<DollarSign className="h-6 w-6" />}
                    iconBg="bg-brand-cyan-500/20"
                  />
                  <StatTile
                    label="Payback Period"
                    value={`${derived.payback.toFixed(1)} mo`}
                    variant="success"
                    icon={<TrendingUp className="h-6 w-6" />}
                    iconBg="bg-brand-green-500/20"
                  />
                  <StatTile
                    label="FTE Freed"
                    value={formatNumber(derived.fteFreed)}
                    variant="gradient"
                    icon={<Zap className="h-6 w-6" />}
                    iconBg="bg-brand-purple-500/20"
                  />
                </div>

                {/* Detailed Results */}
                <div className="grid gap-6 md:grid-cols-2">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-headline-sm flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-brand-green-400" />
                        Cost Breakdown
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-body-md">
                        <span className="text-neutral-300">Annual Manual Cost</span>
                        <span className="text-brand-red-400 font-mono tabular-nums">{formatCurrency(derived.breakdownManual)}</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-neutral-300">Implementation Cost (12 wks)</span>
                        <span className="text-brand-amber-400 font-mono tabular-nums">{formatCurrency(derived.breakdownImpl)}</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-neutral-300">Year 1 Net Savings</span>
                        <span className="text-brand-green-400 font-mono tabular-nums">{formatCurrency(derived.breakdownYear1)}</span>
                      </div>
                      <div className="flex justify-between text-body-md font-medium border-t border-white/10 pt-4">
                        <span className="text-white">3-Year NPV (10% discount)</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">{formatCurrency(derived.breakdownNpv)}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="text-headline-sm flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-brand-amber-400" />
                        Sensitivity Analysis
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="glass rounded-xl p-4">
                        <p className="text-body-sm text-neutral-400 mb-3">Best Case (+20% volume, +10% automation)</p>
                        <div className="flex justify-between">
                          <span className="text-body-md text-neutral-300">Annual Savings</span>
                          <span className="text-number-lg text-brand-green-400 font-display tabular-nums">{formatCurrency(derived.sensBest)}</span>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-body-sm text-neutral-400 mb-3">Expected Case (current inputs)</p>
                        <div className="flex justify-between">
                          <span className="text-body-md text-neutral-300">Annual Savings</span>
                          <span className="text-number-lg text-brand-cyan-400 font-display tabular-nums">{formatCurrency(derived.sensExpected)}</span>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-body-sm text-neutral-400 mb-3">Conservative (-20% volume, -10% automation)</p>
                        <div className="flex justify-between">
                          <span className="text-body-md text-neutral-300">Annual Savings</span>
                          <span className="text-number-lg text-brand-amber-400 font-display tabular-nums">{formatCurrency(derived.sensConservative)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Email Capture & Next Steps */}
            <div className="mt-12">
              <Card className="glass-strong border border-brand-cyan-500/30">
                <CardContent className="p-8 md:p-12 text-center">
                  <h3 className="text-display-md text-gradient-brand mb-4 text-balance">
                    Get Your Detailed ROI Report
                  </h3>
                  <p className="text-headline-md text-neutral-300 mb-8 max-w-2xl mx-auto text-balance">
                    Receive a PDF with full calculations, sensitivity analysis, implementation timeline, and capability-specific projections.
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
                          Sent
                        </>
                      ) : isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send My ROI Report
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </>
                      )}
                    </Button>
                  </form>

                  <p className="text-body-xs text-neutral-500 mb-8">{emailSent ? 'Check your inbox! We\'ll never share your email.' : "We'll never share your email. Includes pre-filled Cost of Inaction analysis."}</p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="glass px-10 py-4"
                      asChild
                      onClick={() => analytics.roi.inputsChange({ field: 'cta_click', value: 'cost_of_inaction' })}
                    >
                      <a href="/cost-of-inaction">
                        <Shield className="mr-2 h-5 w-5" />
                        What If I Wait? → Cost of Inaction
                      </a>
                    </Button>
                    <Button variant="ghost" size="lg" className="px-10 py-4" asChild>
                      <a href="/assessment">
                        <Calculator className="mr-2 h-5 w-5" />
                        Back to Assessment
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
              <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
              <a href="/cost-of-inaction" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Cost of Inaction</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}