'use client'

import { useState, useEffect, useRef, FormEvent, useMemo } from 'react'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label, Slider, Select, SelectTrigger, SelectValue, SelectContent, SelectItem, BeforeAfterBar, StatTile } from '@repo/ui'
import { ArrowRight, ChevronRight, BarChart3, DollarSign, Shield, TrendingUp, Calculator, Zap, Loader2, CheckCircle, AlertCircle } from 'lucide-react'
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

// Empty starting state
const defaultValues = {
  platform: 'NetSuite',
  useCase: 'ap-automation',
  annualVolume: 0,
  avgManualHours: 0,
  hourlyCost: 0,
  errorRate: 0,
  currentAutomation: 0,
  attritionRate: 0,
  avgRecruitmentCost: 0,
  complianceFinesPerYear: 0,
}

interface CalculatorState {
  platform: string
  useCase: string
  annualVolume: number
  avgManualHours: number
  hourlyCost: number
  errorRate: number
  currentAutomation: number
  attritionRate: number
  avgRecruitmentCost: number
  complianceFinesPerYear: number
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
  const platforms = useMemo(() => {
    if (initialConfig?.assumptions?.platformMultipliers) {
      return Object.entries(initialConfig.assumptions.platformMultipliers).map(([value, multiplier]) => ({
        value, label: value, multiplier,
      }))
    }
    return defaultPlatforms
  }, [initialConfig])

  const useCases = useMemo(() => {
    if (initialConfig?.assumptions?.useCaseMultipliers) {
      return initialConfig.assumptions.useCaseMultipliers.map(u => ({
        value: u.id, label: u.name, automationRate: u.automationRate,
        errorReduction: u.errorReduction, timeSavings: u.timeSavings, description: u.description,
      }))
    }
    return defaultUseCases
  }, [initialConfig])

  const [state, setState] = useState<CalculatorState>(defaultValues)
  const [derived, setDerived] = useState<DerivedState>({
    manualCost: 0, autoCost: 0, annualSavings: 0, payback: 0, fteFreed: 0,
    breakdownManual: 0, breakdownImpl: 0, breakdownYear1: 0, breakdownNpv: 0,
    sensBest: 0, sensExpected: 0, sensConservative: 0,
  })
  
  const [hasInteracted, setHasInteracted] = useState(false)
  const [roiCalculationId, setRoiCalculationId] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCalculating, setIsCalculating] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let prefilled = false
    if (params.get('erp')) {
      const erpValue = params.get('erp')!.charAt(0).toUpperCase() + params.get('erp')!.slice(1)
      if (platforms.some(p => p.value === erpValue)) {
        setState(prev => ({ ...prev, platform: erpValue }))
        prefilled = true
      }
    }
    if (params.get('invoices')) {
      setState(prev => ({ ...prev, annualVolume: parseInt(params.get('invoices')!) || defaultValues.annualVolume }))
      prefilled = true
    }
    if (params.get('useCase')) {
      if (useCases.some(u => u.value === params.get('useCase'))) {
        setState(prev => ({ ...prev, useCase: params.get('useCase')! }))
        prefilled = true
      }
    }

    if (prefilled) setHasInteracted(true)

    analytics.roi.open({
      source: params.get('assessmentId') ? 'assessment' : 'direct',
      prefilled: prefilled ? {
        erp: params.get('erp') || undefined,
        invoices: params.get('invoices') ? parseInt(params.get('invoices')!) : undefined,
        useCase: params.get('useCase') || undefined,
      } : undefined,
    })
  }, [platforms, useCases])

  const calculateDerived = (s: CalculatorState): DerivedState => {
    const roiInputs: ROIInputs = {
      annualVolume: s.annualVolume,
      avgManualHoursPerUnit: s.avgManualHours / 60,
      hourlyCost: s.hourlyCost,
      errorRate: s.errorRate / 100,
      platform: s.platform,
      useCase: s.useCase,
      attritionRate: s.attritionRate / 100,
      avgRecruitmentCost: s.avgRecruitmentCost,
      complianceFinesPerYear: s.complianceFinesPerYear
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

  useEffect(() => {
    if (hasInteracted) {
      setDerived(calculateDerived(state))
    }
  }, [state, hasInteracted])

  const handleInteraction = () => {
    if (!hasInteracted) setHasInteracted(true)
  }

  const handleSliderChange = (key: keyof CalculatorState) => (value: number | number[]) => {
    handleInteraction()
    const v = Array.isArray(value) ? value[0] : value
    setState(prev => ({ ...prev, [key]: v }))
    analytics.roi.inputsChange({ field: key, value: v })
  }

  const handleSelectChange = (key: keyof CalculatorState) => (value: string) => {
    handleInteraction()
    setState(prev => ({ ...prev, [key]: value }))
    analytics.roi.inputsChange({ field: key, value })
  }

  const handleCalculate = async () => {
    handleInteraction()
    setIsCalculating(true)
    const d = calculateDerived(state)

    analytics.roi.calculate({
      projectedSavings: d.annualSavings,
      paybackMonths: d.payback,
      fteFreed: d.fteFreed,
      assessmentId: new URLSearchParams(window.location.search).get('assessmentId') || undefined,
    })

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
      analytics.roi.emailCapture({ email, projectedSavings: derived.annualSavings })
      setEmailSent(true)
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
          text: 'Enterprise ROI Calculator',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Calculate your true AI automation ROI. Real-time projections for annual savings, FTE freed, and hidden costs like attrition and compliance.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Start Calculator', variant: 'default', className: 'glass-strong', href: '#calculator' },
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
                <Card className="glass-card sticky top-24 h-fit max-h-[80vh] overflow-y-auto">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="badge-badge badge-outline text-brand-cyan-400 border-brand-cyan-400/50 text-body-xs">
                        Inputs
                      </span>
                    </div>
                    <CardTitle className="text-headline-lg">Configure Your Scenario</CardTitle>
                    <p className="text-body-md text-neutral-400">Enter your baseline metrics</p>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label className="block text-body-sm text-neutral-300 mb-2">ERP Platform</Label>
                      <Select value={state.platform} onValueChange={handleSelectChange('platform')}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                          {platforms.map((p) => (
                            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="block text-body-sm text-neutral-300 mb-2">Use Case</Label>
                      <Select value={state.useCase} onValueChange={handleSelectChange('useCase')}>
                        <SelectTrigger className="glass">
                          <SelectValue placeholder="Select use case" />
                        </SelectTrigger>
                        <SelectContent>
                          {useCases.map((u) => (
                            <SelectItem key={u.value} value={u.value}>{u.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Annual Volume</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">{state.annualVolume.toLocaleString()}</span>
                      </Label>
                      <Slider value={[state.annualVolume]} onValueChange={handleSliderChange('annualVolume')} min={0} max={500000} step={1000} className="accent-brand-cyan-500" />
                    </div>

                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Avg Manual Minutes/Unit</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">{state.avgManualHours}</span>
                      </Label>
                      <Slider value={[state.avgManualHours]} onValueChange={handleSliderChange('avgManualHours')} min={0} max={60} step={0.5} className="accent-brand-cyan-500" />
                    </div>

                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Fully Loaded Hourly Cost ($)</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums">${state.hourlyCost}</span>
                      </Label>
                      <Slider value={[state.hourlyCost]} onValueChange={handleSliderChange('hourlyCost')} min={0} max={150} step={5} className="accent-brand-cyan-500" />
                    </div>
                    
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Current Error Rate (%)</span>
                        <span className="text-brand-amber-400 font-mono tabular-nums">{state.errorRate.toFixed(1)}%</span>
                      </Label>
                      <Slider value={[state.errorRate]} onValueChange={handleSliderChange('errorRate')} min={0} max={10} step={0.1} className="accent-brand-amber-500" />
                    </div>

                    <div className="pt-4 border-t border-white/10">
                      <Label className="text-body-sm font-semibold text-brand-purple-400 mb-4 block">Advanced Domain Pain Points</Label>
                      
                      <div className="space-y-4">
                        <div>
                          <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                            <span>Team Attrition Rate (%)</span>
                            <span className="text-brand-purple-400 font-mono tabular-nums">{state.attritionRate}%</span>
                          </Label>
                          <Slider value={[state.attritionRate]} onValueChange={handleSliderChange('attritionRate')} min={0} max={50} step={1} className="accent-brand-purple-500" />
                        </div>

                        <div>
                          <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                            <span>Avg Recruitment Cost ($)</span>
                            <span className="text-brand-purple-400 font-mono tabular-nums">${state.avgRecruitmentCost.toLocaleString()}</span>
                          </Label>
                          <Slider value={[state.avgRecruitmentCost]} onValueChange={handleSliderChange('avgRecruitmentCost')} min={0} max={100000} step={1000} className="accent-brand-purple-500" />
                        </div>
                        
                        <div>
                          <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                            <span>Annual Compliance Fines ($)</span>
                            <span className="text-brand-purple-400 font-mono tabular-nums">${state.complianceFinesPerYear.toLocaleString()}</span>
                          </Label>
                          <Slider value={[state.complianceFinesPerYear]} onValueChange={handleSliderChange('complianceFinesPerYear')} min={0} max={500000} step={5000} className="accent-brand-purple-500" />
                        </div>
                      </div>
                    </div>

                    <Button onClick={handleCalculate} disabled={isCalculating} className="glass-strong w-full py-3 mt-4" size="lg">
                      {isCalculating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Calculator className="mr-2 h-4 w-4" />}
                      {hasInteracted ? 'Update ROI' : 'Calculate ROI'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Live Visualization Panel */}
              <div className="lg:col-span-2 space-y-8">
                {!hasInteracted ? (
                  <div className="h-full min-h-[500px] glass-card rounded-2xl flex flex-col items-center justify-center p-12 text-center border border-white/10">
                    <div className="h-20 w-20 bg-brand-cyan-500/10 rounded-full flex items-center justify-center mb-6">
                      <Calculator className="h-10 w-10 text-brand-cyan-400" />
                    </div>
                    <h3 className="text-headline-lg text-white mb-2">Ready to see your ROI?</h3>
                    <p className="text-neutral-400 max-w-md">Adjust the baseline metrics in the left panel to instantly generate your Enterprise AI automation ROI projection.</p>
                  </div>
                ) : (
                  <>
                    <Card className="glass-card animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <CardHeader>
                        <CardTitle className="text-headline-lg flex items-center gap-2">
                          <BarChart3 className="h-5 w-5 text-brand-cyan-400" />
                          Live Impact Visualization
                        </CardTitle>
                        <p className="text-body-md text-neutral-400">Before vs After AI Automation</p>
                      </CardHeader>
                      <CardContent>
                        <BeforeAfterBar
                          before={derived.manualCost}
                          after={derived.autoCost}
                          beforeLabel="Current Cost (Annual)"
                          afterLabel="Projected Cost (Annual)"
                          unit="$"
                          unitPosition="prefix"
                          variant="savings"
                          size="md"
                          showChange={true}
                        />
                      </CardContent>
                    </Card>

                    <div className="grid gap-4 md:grid-cols-3 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
                      <StatTile label="Annual Savings" value={formatCurrency(derived.annualSavings)} variant="primary" icon={<DollarSign className="h-6 w-6" />} iconBg="bg-brand-cyan-500/20" />
                      <StatTile label="Payback Period" value={`${derived.payback.toFixed(1)} mo`} variant="success" icon={<TrendingUp className="h-6 w-6" />} iconBg="bg-brand-green-500/20" />
                      <StatTile label="FTE Freed" value={formatNumber(derived.fteFreed)} variant="gradient" icon={<Zap className="h-6 w-6" />} iconBg="bg-brand-purple-500/20" />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                      <Card className="glass-card">
                        <CardHeader><CardTitle className="text-headline-sm flex items-center gap-2"><DollarSign className="h-5 w-5 text-brand-green-400" /> Cost Breakdown</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex justify-between text-body-md"><span className="text-neutral-300">Annual Manual Cost</span><span className="text-brand-red-400 font-mono">{formatCurrency(derived.breakdownManual)}</span></div>
                          <div className="flex justify-between text-body-md"><span className="text-neutral-300">Implementation Cost</span><span className="text-brand-amber-400 font-mono">{formatCurrency(derived.breakdownImpl)}</span></div>
                          <div className="flex justify-between text-body-md"><span className="text-neutral-300">Year 1 Net Savings</span><span className="text-brand-green-400 font-mono">{formatCurrency(derived.breakdownYear1)}</span></div>
                          <div className="flex justify-between text-body-md font-medium border-t border-white/10 pt-4"><span className="text-white">3-Year NPV</span><span className="text-brand-cyan-400 font-mono">{formatCurrency(derived.breakdownNpv)}</span></div>
                        </CardContent>
                      </Card>

                      <Card className="glass-card">
                        <CardHeader><CardTitle className="text-headline-sm flex items-center gap-2"><TrendingUp className="h-5 w-5 text-brand-amber-400" /> Sensitivity Analysis</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                          <div className="glass rounded-xl p-4 flex justify-between">
                            <span className="text-body-sm text-neutral-300">Best Case</span>
                            <span className="text-brand-green-400 font-display">{formatCurrency(derived.sensBest)}</span>
                          </div>
                          <div className="glass rounded-xl p-4 flex justify-between">
                            <span className="text-body-sm text-neutral-300">Expected</span>
                            <span className="text-brand-cyan-400 font-display">{formatCurrency(derived.sensExpected)}</span>
                          </div>
                          <div className="glass rounded-xl p-4 flex justify-between">
                            <span className="text-body-sm text-neutral-300">Conservative</span>
                            <span className="text-brand-amber-400 font-display">{formatCurrency(derived.sensConservative)}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>
            </div>

            {hasInteracted && (
              <div className="mt-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <Card className="glass-strong border border-brand-cyan-500/30">
                  <CardContent className="p-8 md:p-12 text-center">
                    <h3 className="text-display-md text-gradient-brand mb-4 text-balance">Get Your Detailed ROI Report</h3>
                    <p className="text-headline-md text-neutral-300 mb-8 max-w-2xl mx-auto text-balance">Receive a PDF with full calculations, attrition savings, compliance risk reduction, and capability-specific projections.</p>
                    <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                      <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="flex-1 glass max-w-md" disabled={emailSent || isSubmitting} required />
                      <Button type="submit" size="lg" className="glass-strong px-10 py-4" disabled={emailSent || isSubmitting || !email}>
                        {emailSent ? <><CheckCircle className="mr-2 h-5 w-5" /> Sent</> : isSubmitting ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Sending...</> : <>Send My ROI Report <ArrowRight className="ml-2 h-5 w-5" /></>}
                      </Button>
                    </form>
                    <p className="text-body-xs text-neutral-500 mb-8">We'll never share your email.</p>
                  </CardContent>
                </Card>
              </div>
            )}
          </Container>
        </section>
      </main>
    </div>
  )
}