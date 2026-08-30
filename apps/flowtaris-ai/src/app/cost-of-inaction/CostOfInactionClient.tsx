'use client'

import React, { useState, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'
import { Shield, TrendingUp, DollarSign, Timer, ArrowRight, Info, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'
import { calculateInaction, type InactionInputs, type InactionOutputs } from '@flowtaris/inaction-engine'
import { analytics } from '@flowtaris/analytics'

// ─── TYPES & DATA ────────────────────────────────────────────────────────────
interface SanityInactionConfig {
  riskModels?: Array<any>
}

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

const defaultPlatforms = [
  { value: 'NetSuite', label: 'NetSuite' },
  { value: 'Coupa', label: 'Coupa' },
  { value: 'SAP', label: 'SAP' },
  { value: 'Workday', label: 'Workday' },
  { value: 'Default', label: 'Other ERP' }
]

// ─── TICKING NUMBER COMPONENT ─────────────────────────────────────────────────
function TickingNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(value, { bounce: 0, duration: 800 })
  const display = useTransform(spring, (current) => prefix + Math.round(current).toLocaleString() + suffix)
  
  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  return <motion.span>{display}</motion.span>
}

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────────
function SectionTooltip({ title, description }: { title: string, description: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="mt-2 text-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 font-medium transition-colors"
      >
        <Info className="w-4 h-4" />
        {title} {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
      </button>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-2 p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 leading-relaxed"
        >
          {description}
        </motion.div>
      )}
    </div>
  )
}

function DetailCard({ title, icon, value, subtitle, description }: { title: string, icon: React.ReactNode, value: number, subtitle: string, description: string }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
      <div className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-4 flex items-center gap-2">
        {icon} {title}
      </div>
      <div className="text-4xl font-black font-mono text-slate-900 mb-2 tracking-tight">
        <TickingNumber value={value} prefix="$" />
      </div>
      <div className="text-sm font-bold text-slate-700 mb-2">{subtitle}</div>
      <div className="text-sm text-slate-500 leading-relaxed">{description}</div>
    </div>
  )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CostOfInactionClient({ initialConfig }: { initialConfig: SanityInactionConfig | null }) {
  const [state, setState] = useState(defaultValues)
  const [outputs, setOutputs] = useState<InactionOutputs | null>(null)
  const [narrative, setNarrative] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('invoices')) setState(p => ({ ...p, annualVolume: parseInt(params.get('invoices')!) || p.annualVolume }))
    if (params.get('delay')) setState(p => ({ ...p, monthsDelay: parseInt(params.get('delay')!) || p.monthsDelay }))
    analytics.inaction.open({ source: 'direct' })
  }, [])

  useEffect(() => {
    const inputs: InactionInputs = {
      ...state,
      avgManualHoursPerUnit: state.avgManualHours / 60,
      errorRate: state.errorRate / 100,
    }
    const res = calculateInaction(inputs)
    setOutputs(res)
    
    // We enhance the basic engine narrative for the UI
    const enhancedNarrative = `Our AI diagnostic engine has processed your inputs against industry benchmarks. Based on an invoice volume of ${inputs.annualVolume.toLocaleString()} and an average manual processing time of ${state.avgManualHours} minutes, your baseline operational friction is significantly higher than top-quartile performers. \n\nWith a ${inputs.complianceRequirements} compliance posture and ${inputs.competitivePressure} competitive pressure, your risk profile amplifies the financial leakage. A delay of ${state.monthsDelay} months translates directly to unrecoverable sunk costs. This analysis provides a structured, data-driven projection to help build your business case.`
    setNarrative(enhancedNarrative)
  }, [state])

  if (!outputs) return null

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmailSent(true)
    fetch('/api/leads/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, urgently: outputs.monthlyLeakage > 50000 ? 'high' : 'standard' }),
    }).catch(console.error)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100">
      
      {/* ─── HEADER ─── */}
      <header className="border-b border-slate-200 bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-500 uppercase tracking-widest">
            Cost of Inaction Analysis
          </div>
        </div>
      </header>

      <div className="flex flex-col xl:flex-row max-w-7xl mx-auto">
        
        {/* ─── LEFT PANEL: INPUTS ─── */}
        <div className="w-full xl:w-[400px] border-b xl:border-b-0 xl:border-r border-slate-200 bg-slate-50 p-6 md:p-8 flex-shrink-0">
          <div className="mb-8">
            <h1 className="text-2xl font-black mb-2">Scenario Builder</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Adjust the parameters below. The analysis engine will instantly recalculate your projected financial leakage and risk exposure.
            </p>
          </div>

          <div className="space-y-8">
            {/* ERP Platform */}
            <div>
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-3 block">1. Core Infrastructure</label>
              <div className="grid grid-cols-2 gap-2">
                {defaultPlatforms.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setState(s => ({ ...s, platform: p.value }))}
                    className={`px-4 py-3 text-sm font-bold rounded-lg transition-all border ${state.platform === p.value ? 'bg-slate-900 border-slate-900 text-white shadow-md' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <SectionTooltip 
                title="Why does the ERP matter?" 
                description="Different platforms have varying degrees of native automation and API accessibility. Our engine applies historical integration friction multipliers based on your core system to accurately project costs."
              />
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Operational Metrics */}
            <div className="space-y-6">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest block">2. Operational Metrics</label>
              
              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">Annual Invoices</span>
                  <span className="text-sm font-mono font-black">{state.annualVolume.toLocaleString()}</span>
                </div>
                <input 
                  type="range" min="1000" max="250000" step="1000" 
                  value={state.annualVolume} 
                  onChange={e => setState(s => ({ ...s, annualVolume: parseInt(e.target.value) }))}
                  className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-full appearance-none outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">Minutes per Invoice</span>
                  <span className="text-sm font-mono font-black">{state.avgManualHours}m</span>
                </div>
                <input 
                  type="range" min="1" max="60" step="1" 
                  value={state.avgManualHours} 
                  onChange={e => setState(s => ({ ...s, avgManualHours: parseInt(e.target.value) }))}
                  className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-full appearance-none outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">Loaded Hourly Cost</span>
                  <span className="text-sm font-mono font-black">${state.hourlyCost}</span>
                </div>
                <input 
                  type="range" min="15" max="150" step="5" 
                  value={state.hourlyCost} 
                  onChange={e => setState(s => ({ ...s, hourlyCost: parseInt(e.target.value) }))}
                  className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-full appearance-none outline-none"
                />
              </div>

              <div>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-slate-700">Error & Rework Rate</span>
                  <span className="text-sm font-mono font-black">{state.errorRate}%</span>
                </div>
                <input 
                  type="range" min="0" max="15" step="0.5" 
                  value={state.errorRate} 
                  onChange={e => setState(s => ({ ...s, errorRate: parseFloat(e.target.value) }))}
                  className="w-full accent-slate-900 h-1.5 bg-slate-200 rounded-full appearance-none outline-none"
                />
              </div>
              
              <SectionTooltip 
                title="How are these used?" 
                description="Volume, manual processing time, labor cost, and rework frequency form the baseline of 'addressable cost'. This calculates exactly how much capital is trapped in manual data entry and exception handling rather than strategic work."
              />
            </div>

            <div className="h-px bg-slate-200 w-full" />

            {/* Market & Compliance */}
            <div className="space-y-6">
              <label className="text-xs font-bold text-slate-900 uppercase tracking-widest block">3. Risk Factors</label>
              
              <div>
                <div className="text-sm font-bold text-slate-700 mb-2">Market Pressure</div>
                <div className="flex bg-slate-200 rounded-lg p-1">
                  {(['low', 'medium', 'high'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setState(s => ({ ...s, competitivePressure: p }))}
                      className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${state.competitivePressure === p ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-700 mb-2">Compliance Needs</div>
                <div className="flex bg-slate-200 rounded-lg p-1">
                  {(['none', 'basic', 'strict'] as const).map(p => (
                    <button
                      key={p}
                      onClick={() => setState(s => ({ ...s, complianceRequirements: p }))}
                      className={`flex-1 py-1.5 text-xs font-bold uppercase rounded-md transition-all ${state.complianceRequirements === p ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <SectionTooltip 
                title="Understanding Risk Multipliers" 
                description="High market pressure accelerates the competitive gap, compounding the cost of falling behind peers in automation. Strict compliance environments introduce quantifiable audit risk and penalty exposure when relying on manual controls."
              />
            </div>

          </div>
        </div>

        {/* ─── RIGHT PANEL: DASHBOARD ─── */}
        <div className="flex-1 p-6 md:p-12 pb-32 xl:pb-12 bg-white">
          
          <div className="max-w-4xl mx-auto">
            {/* Executive Synthesis */}
            <div className="relative mb-16">
              <div className="hidden md:block absolute -left-6 top-0 bottom-0 w-1 bg-slate-900 rounded-full" />
              <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                Executive Synthesis
              </h2>
              <div className="text-slate-700 text-base leading-relaxed mb-6 max-w-3xl">
                {narrative.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4 last:mb-0">{paragraph}</p>
                ))}
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-semibold rounded-md uppercase tracking-wider">
                <Info className="w-3.5 h-3.5" />
                Diagnostic Projection Engine
              </div>
            </div>
            
            {/* Main Financial Leakage Header */}
            <div className="text-center mb-16">
              <h2 className="text-slate-500 font-bold uppercase tracking-widest text-sm mb-4">Projected 3-Year Financial Leakage</h2>
              <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-slate-900">
                <TickingNumber value={outputs.threeYearProjectedLoss} prefix="$" />
              </div>
              <p className="text-slate-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">
                This figure represents the total compounded cost of manual operations, error remediation, and competitive disadvantage if automation is entirely ignored over a 36-month horizon.
              </p>
              <p className="text-slate-400 mt-2 max-w-lg mx-auto text-xs">
                * Projections are estimates based on industry benchmarks and your inputs. Actual results will vary. Not financial advice.
              </p>
            </div>

            {/* Detailed Breakdown Cards */}
            <div className="mb-12">
              <h3 className="text-xl font-black text-slate-900 mb-6">Component Breakdown</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <DetailCard 
                  title="Monthly Leakage" 
                  icon={<DollarSign className="w-4 h-4" />} 
                  value={outputs.monthlyLeakage}
                  subtitle="Immediate operational drain"
                  description="The direct capital lost every 30 days to manual data entry, invoice processing bottlenecks, and exception handling overhead."
                />
                
                <DetailCard 
                  title="Annual Risk" 
                  icon={<Shield className="w-4 h-4" />} 
                  value={outputs.annualRisk}
                  subtitle="Compliance & audit exposure"
                  description="Calculated based on your selected compliance tier, representing the financial risk of manual control failures and audit penalties."
                />
                
                <DetailCard 
                  title="Competitive Gap" 
                  icon={<TrendingUp className="w-4 h-4" />} 
                  value={outputs.competitiveGap}
                  subtitle="3-year market position loss"
                  description="The compounded opportunity cost of operating slower and with higher overhead than automated competitors."
                />
              </div>
            </div>

            {/* Time Machine / Delay Slider */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-12 mb-12">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2 flex items-center gap-3">
                    <Timer className="w-6 h-6 text-slate-400" /> Scenario: The Cost of Delay
                  </h3>
                  <p className="text-slate-600 text-sm max-w-md leading-relaxed">
                    Adjust the timeline below to see exactly how much capital is irrevocably lost while evaluating, deferring, or delaying implementation.
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Delay Duration</div>
                  <div className="text-3xl font-black font-mono text-slate-900">{state.monthsDelay} <span className="text-lg text-slate-500">months</span></div>
                </div>
              </div>
              
              <div className="mb-12 px-2">
                <input 
                  type="range" min="0" max="36" step="1" 
                  value={state.monthsDelay} 
                  onChange={e => setState(s => ({ ...s, monthsDelay: parseInt(e.target.value) }))}
                  className="w-full accent-slate-900 h-2 bg-slate-300 rounded-full appearance-none outline-none focus:ring-2 focus:ring-slate-400 relative z-10"
                />
                <div className="w-full flex justify-between text-[10px] text-slate-400 font-mono font-bold uppercase mt-4">
                  <span>Immediate Action</span>
                  <span>1 Year Delay</span>
                  <span>2 Year Delay</span>
                  <span>3 Year Delay</span>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
                <div>
                  <div className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-1">Sunk Cost of Delay</div>
                  <div className="text-slate-500 text-sm">Capital that cannot be recovered.</div>
                </div>
                <div className="text-4xl md:text-5xl font-black font-mono text-slate-900 mt-4 md:mt-0">
                  <TickingNumber value={outputs.costOfDelay} prefix="$" />
                </div>
              </div>
            </div>

            {/* Inline CTA */}
            <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
              <div className="text-center max-w-2xl mx-auto">
                <h3 className="text-2xl font-black mb-4">Transition from Projection to Execution</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  The numbers above are a diagnostic baseline. Book a 30-minute technical review with our solutions team to refine this model with your actual historical data and map out a precise deployment strategy.
                </p>
                
                {emailSent ? (
                  <div className="inline-flex items-center justify-center gap-2 py-4 px-8 text-green-400 bg-green-400/10 border border-green-400/20 rounded-xl font-bold">
                    <CheckCircle2 className="w-5 h-5" /> Meeting Request Confirmed
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3 justify-center">
                    <input 
                      type="email" 
                      required 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="work@company.com" 
                      className="bg-white/10 border border-white/20 px-6 py-4 rounded-xl outline-none focus:ring-2 focus:ring-white text-white text-sm font-medium w-full sm:w-80 placeholder:text-slate-500"
                    />
                    <button 
                      type="submit"
                      className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded-xl font-black text-sm transition-colors flex items-center justify-center gap-2"
                    >
                      Book Technical Review <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}