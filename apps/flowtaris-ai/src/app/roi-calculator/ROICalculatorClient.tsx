'use client'

import { useState, useEffect } from 'react'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Card, CardHeader, CardTitle, CardContent, Button, Badge, Input, Label, Slider, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@repo/ui'
import { ArrowRight, ChevronRight, BarChart3, DollarSign, Shield, TrendingUp, Calculator, Zap } from 'lucide-react'

const platforms = [
  { value: 'netsuite', label: 'NetSuite', multiplier: 1.2 },
  { value: 'coupa', label: 'Coupa', multiplier: 1.15 },
  { value: 'sap', label: 'SAP', multiplier: 1.25 },
  { value: 'workday', label: 'Workday', multiplier: 1.1 },
  { value: 'salesforce', label: 'Salesforce', multiplier: 1.05 },
]

const useCases = [
  { value: 'ap-automation', label: 'AP Automation (Invoice Processing)', automationRate: 85, errorReduction: 95, timeSavings: 90 },
  { value: 'po-matching', label: 'PO Matching & Reconciliation', automationRate: 80, errorReduction: 92, timeSavings: 85 },
  { value: 'cash-forecasting', label: 'Cash Flow Forecasting', automationRate: 70, errorReduction: 60, timeSavings: 80 },
  { value: 'expense-audit', label: 'Expense Audit & Compliance', automationRate: 75, errorReduction: 88, timeSavings: 70 },
  { value: 'vendor-onboarding', label: 'Vendor Onboarding', automationRate: 65, errorReduction: 80, timeSavings: 75 },
]

const defaultValues = {
  platform: 'netsuite',
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

export default function ROICalculatorClient() {
  const [state, setState] = useState<CalculatorState>(defaultValues)
  const [derived, setDerived] = useState({
    manualCost: 0,
    autoCost: 0,
    annualSavings: 0,
    payback: 0,
    fteFreed: 0,
    breakdownManual: 0,
    breakdownImpl: 0,
    breakdownYear1: 0,
    breakdownNpv: 0,
    sensBest: 0,
    sensExpected: 0,
    sensConservative: 0,
  })

  const calculate = (s: CalculatorState) => {
    const platform = platforms.find(p => p.value === s.platform) || platforms[0]
    const useCase = useCases.find(u => u.value === s.useCase) || useCases[0]

    const hoursPerInvoice = s.avgManualHours / 60 // minutes to hours
    const manualCost = s.annualVolume * hoursPerInvoice * s.hourlyCost * platform.multiplier

    const automationRate = useCase.automationRate / 100
    const remainingManualRate = Math.max(0, 1 - automationRate + s.currentAutomation / 100)
    const autoCost = manualCost * remainingManualRate

    const annualSavings = manualCost - autoCost
    const implCost = annualSavings * 0.3 // 30% of annual savings as implementation cost
    const year1Savings = annualSavings - implCost
    const payback = implCost / (annualSavings / 12) // months
    const fteFreed = (s.annualVolume * hoursPerInvoice * automationRate) / 1920 // annual hours / FTE hours
    const npv = year1Savings * 2.5 // simplified 3-year NPV at 10%

    const bestSavings = annualSavings * 1.2
    const conservativeSavings = annualSavings * 0.6

    return {
      manualCost,
      autoCost,
      annualSavings,
      payback: Math.round(payback * 10) / 10,
      fteFreed: Math.round(fteFreed * 10) / 10,
      breakdownManual: manualCost,
      breakdownImpl: implCost,
      breakdownYear1: year1Savings,
      breakdownNpv: npv,
      sensBest: bestSavings,
      sensExpected: annualSavings,
      sensConservative: conservativeSavings,
    }
  }

  useEffect(() => {
    const d = calculate(state)
    setDerived(d)
    // Update DOM elements
    updateDOM(d)
  }, [state])

  const updateDOM = (d: typeof derived) => {
    const formatCurrency = (val: number) => '$' + val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })
    const formatNumber = (val: number) => val.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 1 })

    const manualCostEl = document.getElementById('manual-cost')
    if (manualCostEl) manualCostEl.textContent = formatCurrency(d.manualCost)

    const autoCostEl = document.getElementById('auto-cost')
    if (autoCostEl) autoCostEl.textContent = formatCurrency(d.autoCost)

    const manualBar = document.getElementById('manual-bar')
    if (manualBar) manualBar.style.width = '100%'

    const autoBar = document.getElementById('auto-bar')
    if (autoBar) {
      const pct = d.manualCost > 0 ? (d.autoCost / d.manualCost) * 100 : 0
      autoBar.style.width = pct + '%'
    }

    const annualSavingsEl = document.getElementById('annual-savings')
    if (annualSavingsEl) annualSavingsEl.textContent = formatCurrency(d.annualSavings)

    const paybackEl = document.getElementById('payback')
    if (paybackEl) paybackEl.textContent = d.payback.toString()

    const fteFreedEl = document.getElementById('fte-freed')
    if (fteFreedEl) fteFreedEl.textContent = formatNumber(d.fteFreed)

    const breakdownManualEl = document.getElementById('breakdown-manual')
    if (breakdownManualEl) breakdownManualEl.textContent = formatCurrency(d.breakdownManual)

    const breakdownImplEl = document.getElementById('breakdown-impl')
    if (breakdownImplEl) breakdownImplEl.textContent = formatCurrency(d.breakdownImpl)

    const breakdownYear1El = document.getElementById('breakdown-year1')
    if (breakdownYear1El) breakdownYear1El.textContent = formatCurrency(d.breakdownYear1)

    const breakdownNpvEl = document.getElementById('breakdown-npv')
    if (breakdownNpvEl) breakdownNpvEl.textContent = formatCurrency(d.breakdownNpv)

    const sensBestEl = document.getElementById('sens-best')
    if (sensBestEl) sensBestEl.textContent = formatCurrency(d.sensBest)

    const sensExpectedEl = document.getElementById('sens-expected')
    if (sensExpectedEl) sensExpectedEl.textContent = formatCurrency(d.sensExpected)

    const sensConservativeEl = document.getElementById('sens-conservative')
    if (sensConservativeEl) sensConservativeEl.textContent = formatCurrency(d.sensConservative)
  }

  const handleSliderChange = (key: keyof CalculatorState) => (value: number | number[]) => {
    const v = Array.isArray(value) ? value[0] : value
    setState(prev => ({ ...prev, [key]: v }))
  }

  const handleSelectChange = (key: keyof CalculatorState) => (value: string) => {
    setState(prev => ({ ...prev, [key]: value }))
  }

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
                        <span className="text-brand-cyan-400 font-mono tabular-nums" id="volume-value">{state.annualVolume.toLocaleString()}</span>
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
                        <span>Avg Manual Hours/Invoice</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums" id="hours-value">{state.avgManualHours}</span>
                      </Label>
                      <Slider
                        value={[state.avgManualHours]}
                        onValueChange={handleSliderChange('avgManualHours')}
                        min={1}
                        max={60}
                        step={0.5}
                        className="accent-brand-cyan-500"
                      />
                      <p className="text-body-xs text-neutral-500 mt-1">Minutes per invoice (converted to hours)</p>
                    </div>

                    {/* Hourly Cost Slider */}
                    <div>
                      <Label className="flex justify-between text-body-sm text-neutral-300 mb-2">
                        <span>Fully Loaded Hourly Cost ($)</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums" id="cost-value">${state.hourlyCost}</span>
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
                        <span className="text-brand-amber-400 font-mono tabular-nums" id="error-value">{state.errorRate.toFixed(1)}%</span>
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
                        <span className="text-brand-cyan-400 font-mono tabular-nums" id="auto-value">{state.currentAutomation}%</span>
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
                  </CardContent>
                </Card>
              </div>

              {/* Live Visualization Panel */}
              <div className="lg:col-span-2 space-y-8">
                {/* Before/After Visualization */}
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
                      {/* Manual Cost Bar */}
                      <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-headline-sm text-white">Current Manual Cost (Annual)</h4>
                          <div className="text-number-xl text-brand-red-400 font-display tabular-nums" id="manual-cost">$4,050,000</div>
                        </div>
                        <div className="h-8 bg-surface-layer3 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-brand-red-500 to-brand-amber-500 rounded-full transition-all duration-500"
                            style={{ width: '100%' }}
                            id="manual-bar"
                          />
                        </div>
                        <div className="flex justify-between text-body-xs text-neutral-400 mt-2">
                          <span>Volume: 60,000</span>
                          <span>Hours: 90,000</span>
                          <span>Cost: $45/hr</span>
                        </div>
                      </div>

                      {/* Automated Cost Bar */}
                      <div className="glass rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="text-headline-sm text-white">Projected Automated Cost (Annual)</h4>
                          <div className="text-number-xl text-brand-green-400 font-display tabular-nums" id="auto-cost">$607,500</div>
                        </div>
                        <div className="h-8 bg-surface-layer3 rounded-full overflow-hidden relative">
                          <div
                            className="h-full bg-gradient-to-r from-brand-green-500 to-brand-cyan-500 rounded-full transition-all duration-500"
                            style={{ width: '15%' }}
                            id="auto-bar"
                          />
                        </div>
                        <div className="flex justify-between text-body-xs text-neutral-400 mt-2">
                          <span>Automation: 85%</span>
                          <span>Remaining: 13,500 hrs</span>
                          <span>Savings: 85%</span>
                        </div>
                      </div>

                      {/* Savings Highlight */}
                      <div className="glass-strong rounded-xl p-6 border border-brand-cyan-500/30 bg-gradient-to-r from-brand-cyan-500/10 to-transparent">
                        <div className="grid grid-cols-3 gap-4 text-center">
                          <div>
                            <div className="text-number-2xl text-brand-cyan-400 font-display tabular-nums" id="annual-savings">$3,442,500</div>
                            <div className="text-overline text-brand-cyan-300 tracking-wider">Annual Savings</div>
                          </div>
                          <div className="border-l border-white/10">
                            <div className="text-number-2xl text-brand-green-400 font-display tabular-nums" id="payback">3.2</div>
                            <div className="text-overline text-brand-green-300 tracking-wider">Payback (months)</div>
                          </div>
                          <div className="border-l border-white/10">
                            <div className="text-number-2xl text-brand-purple-400 font-display tabular-nums" id="fte-freed">12.3</div>
                            <div className="text-overline text-brand-purple-300 tracking-wider">FTE Freed</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

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
                        <span className="text-brand-red-400 font-mono tabular-nums" id="breakdown-manual">$4,050,000</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-neutral-300">Implementation Cost (12 wks)</span>
                        <span className="text-brand-amber-400 font-mono tabular-nums" id="breakdown-impl">$1,080,000</span>
                      </div>
                      <div className="flex justify-between text-body-md">
                        <span className="text-neutral-300">Year 1 Net Savings</span>
                        <span className="text-brand-green-400 font-mono tabular-nums" id="breakdown-year1">$2,362,500</span>
                      </div>
                      <div className="flex justify-between text-body-md font-medium border-t border-white/10 pt-4">
                        <span className="text-white">3-Year NPV (10% discount)</span>
                        <span className="text-brand-cyan-400 font-mono tabular-nums" id="breakdown-npv">$7,240,000</span>
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
                          <span className="text-number-lg text-brand-green-400 font-display tabular-nums" id="sens-best">$4,130,000</span>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-body-sm text-neutral-400 mb-3">Expected Case (current inputs)</p>
                        <div className="flex justify-between">
                          <span className="text-body-md text-neutral-300">Annual Savings</span>
                          <span className="text-number-lg text-brand-cyan-400 font-display tabular-nums" id="sens-expected">$3,442,500</span>
                        </div>
                      </div>
                      <div className="glass rounded-xl p-4">
                        <p className="text-body-sm text-neutral-400 mb-3">Conservative (-20% volume, -10% automation)</p>
                        <div className="flex justify-between">
                          <span className="text-body-md text-neutral-300">Annual Savings</span>
                          <span className="text-number-lg text-brand-amber-400 font-display tabular-nums" id="sens-conservative">$2,150,000</span>
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

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                    <Input
                      type="email"
                      placeholder="you@company.com"
                      className="flex-1 glass max-w-md"
                    />
                    <Button size="lg" className="glass-strong px-10 py-4" asChild>
                      <a href="#email-capture">
                        Send My ROI Report
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>

                  <p className="text-body-xs text-neutral-500 mb-8">We'll never share your email. Includes pre-filled Cost of Inaction analysis.</p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button variant="outline" size="lg" className="glass px-10 py-4" asChild>
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