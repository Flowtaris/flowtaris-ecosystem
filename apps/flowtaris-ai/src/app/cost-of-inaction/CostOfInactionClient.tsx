'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Shield, TrendingUp, DollarSign, Timer, ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
import { calculateInaction, breakEvenAnalysis, generateRiskNarrative, type InactionInputs, type InactionOutputs } from '@flowtaris/inaction-engine'
import { insertInactionCalculation } from '@flowtaris/supabase-client'
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

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function CostOfInactionClient({ initialConfig }: { initialConfig: SanityInactionConfig | null }) {
  const [state, setState] = useState(defaultValues)
  const [outputs, setOutputs] = useState<InactionOutputs | null>(null)
  const [narrative, setNarrative] = useState('')
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)

  // Parse URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('invoices')) setState(p => ({ ...p, annualVolume: parseInt(params.get('invoices')!) || p.annualVolume }))
    if (params.get('delay')) setState(p => ({ ...p, monthsDelay: parseInt(params.get('delay')!) || p.monthsDelay }))
    // ... we keep it simple for the demo
    analytics.inaction.open({ source: 'direct' })
  }, [])

  // Calculate live
  useEffect(() => {
    const inputs: InactionInputs = {
      ...state,
      avgManualHoursPerUnit: state.avgManualHours / 60, // mins to hours
      errorRate: state.errorRate / 100, // % to decimal
    }
    const res = calculateInaction(inputs)
    setOutputs(res)
    setNarrative(generateRiskNarrative(inputs, res))
  }, [state])

  if (!outputs) return null

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setEmailSent(true)
    // Async fire and forget
    fetch('/api/leads/demo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, urgently: outputs.monthlyLeakage > 50000 ? 'high' : 'standard' }),
    }).catch(console.error)
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-sans flex flex-col lg:flex-row">
      {/* ─── LEFT PANEL: INPUTS ─── */}
      <div className="w-full lg:w-[420px] bg-[#0a0a0a] border-r border-white/5 h-screen overflow-y-auto custom-scrollbar flex-shrink-0 z-20">
        <div className="p-8">
          <a href="/" className="font-black text-xl tracking-tight mb-12 block hover:opacity-80 transition-opacity">
            Flowtaris
          </a>
          
          <div className="mb-8">
            <h2 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-1">Cost of Inaction</h2>
            <h1 className="text-2xl font-black">Configure Scenario</h1>
          </div>

          <div className="space-y-8">
            {/* ERP Platform */}
            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 block">ERP Platform</label>
              <div className="grid grid-cols-2 gap-2">
                {defaultPlatforms.map(p => (
                  <button
                    key={p.value}
                    onClick={() => setState(s => ({ ...s, platform: p.value }))}
                    className={`px-4 py-3 text-sm font-bold rounded-lg transition-all border ${state.platform === p.value ? 'bg-red-500/10 border-red-500/50 text-red-400' : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:bg-white/[0.05]'}`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Volume */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Annual Invoices</label>
                <span className="text-lg font-mono font-black text-white">{state.annualVolume.toLocaleString()}</span>
              </div>
              <input 
                type="range" min="1000" max="250000" step="1000" 
                value={state.annualVolume} 
                onChange={e => setState(s => ({ ...s, annualVolume: parseInt(e.target.value) }))}
                className="w-full accent-red-500 h-2 bg-neutral-900 rounded-full appearance-none outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            {/* Manual Mins */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Mins / Invoice</label>
                <span className="text-lg font-mono font-black text-white">{state.avgManualHours}m</span>
              </div>
              <input 
                type="range" min="1" max="60" step="1" 
                value={state.avgManualHours} 
                onChange={e => setState(s => ({ ...s, avgManualHours: parseInt(e.target.value) }))}
                className="w-full accent-red-500 h-2 bg-neutral-900 rounded-full appearance-none outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            {/* Hourly Cost */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Hourly Cost</label>
                <span className="text-lg font-mono font-black text-white">${state.hourlyCost}</span>
              </div>
              <input 
                type="range" min="15" max="150" step="5" 
                value={state.hourlyCost} 
                onChange={e => setState(s => ({ ...s, hourlyCost: parseInt(e.target.value) }))}
                className="w-full accent-red-500 h-2 bg-neutral-900 rounded-full appearance-none outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            {/* Error Rate */}
            <div>
              <div className="flex justify-between items-end mb-3">
                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Error Rate</label>
                <span className="text-lg font-mono font-black text-red-400">{state.errorRate}%</span>
              </div>
              <input 
                type="range" min="0" max="15" step="0.5" 
                value={state.errorRate} 
                onChange={e => setState(s => ({ ...s, errorRate: parseFloat(e.target.value) }))}
                className="w-full accent-red-500 h-2 bg-neutral-900 rounded-full appearance-none outline-none focus:ring-2 focus:ring-red-500/50"
              />
            </div>

            <div className="h-px bg-white/5 w-full my-4" />

            {/* Competitiveness */}
            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 block">Competitor AI Adoption</label>
              <div className="flex bg-neutral-900 rounded-lg p-1">
                {(['low', 'medium', 'high'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setState(s => ({ ...s, competitivePressure: p }))}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${state.competitivePressure === p ? 'bg-[#1a1a1a] shadow text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Compliance */}
            <div>
              <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3 block">Compliance Needs</label>
              <div className="flex bg-neutral-900 rounded-lg p-1">
                {(['none', 'basic', 'strict'] as const).map(p => (
                  <button
                    key={p}
                    onClick={() => setState(s => ({ ...s, complianceRequirements: p }))}
                    className={`flex-1 py-2 text-xs font-bold uppercase rounded-md transition-all ${state.complianceRequirements === p ? 'bg-[#1a1a1a] shadow text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: DASHBOARD ─── */}
      <div className="flex-1 h-screen overflow-y-auto relative pb-32">
        {/* Ambient red glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-8 py-16 relative z-10">
          
          {/* Main Bleed Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest rounded-full mb-6">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> Live Exposure
            </div>
            <h2 className="text-neutral-400 font-medium text-xl mb-4">If you wait 3 years to automate, you will burn</h2>
            <div className="text-6xl md:text-8xl font-black font-mono tracking-tighter text-white drop-shadow-[0_0_40px_rgba(239,68,68,0.4)]">
              <TickingNumber value={outputs.threeYearProjectedLoss} prefix="$" />
            </div>
          </div>

          {/* Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20">
            <div className="bg-[#0a0a0a] border border-red-900/30 p-6 rounded-2xl relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-red-400 opacity-50" />
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" /> Monthly Leakage
              </div>
              <div className="text-3xl font-black font-mono text-white">
                <TickingNumber value={outputs.monthlyLeakage} prefix="$" />
              </div>
              <div className="text-sm text-neutral-500 mt-2">Cash burned every 30 days</div>
            </div>

            <div className="bg-[#0a0a0a] border border-amber-900/30 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-600 to-amber-400 opacity-50" />
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-amber-500" /> Compliance Risk
              </div>
              <div className="text-3xl font-black font-mono text-white">
                <TickingNumber value={outputs.annualRisk} prefix="$" />
              </div>
              <div className="text-sm text-neutral-500 mt-2">Annual regulatory exposure</div>
            </div>

            <div className="bg-[#0a0a0a] border border-purple-900/30 p-6 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-purple-400 opacity-50" />
              <div className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-purple-500" /> Competitive Gap
              </div>
              <div className="text-3xl font-black font-mono text-white">
                <TickingNumber value={outputs.competitiveGap} prefix="$" />
              </div>
              <div className="text-sm text-neutral-500 mt-2">Lost leverage over 3 years</div>
            </div>
          </div>

          {/* Time Machine / Delay Slider */}
          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-8 md:p-12 mb-12">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
              <Timer className="w-6 h-6 text-red-400" /> The Cost of Waiting
            </h3>
            
            <div className="mb-12">
              <div className="flex justify-between items-end mb-4">
                <div className="text-sm text-neutral-400">If you delay the project by</div>
                <div className="text-3xl font-black font-mono text-white">{state.monthsDelay} <span className="text-lg text-neutral-500">months</span></div>
              </div>
              <div className="relative">
                <input 
                  type="range" min="0" max="36" step="1" 
                  value={state.monthsDelay} 
                  onChange={e => setState(s => ({ ...s, monthsDelay: parseInt(e.target.value) }))}
                  className="w-full accent-white h-2 bg-neutral-800 rounded-full appearance-none outline-none focus:ring-2 focus:ring-white/50 relative z-10"
                />
                <div className="absolute top-4 left-0 w-full flex justify-between text-[10px] text-neutral-600 font-mono font-bold uppercase">
                  <span>Now</span>
                  <span>1 yr</span>
                  <span>2 yrs</span>
                  <span>3 yrs</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 justify-between p-6 bg-red-500/5 border border-red-500/20 rounded-2xl">
              <div>
                <div className="text-sm font-bold text-red-400 uppercase tracking-widest mb-1">Guaranteed Sunk Cost</div>
                <div className="text-neutral-400 text-sm">Money that is gone forever while you decide.</div>
              </div>
              <div className="text-5xl font-black font-mono text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)] text-right">
                <TickingNumber value={outputs.costOfDelay} prefix="$" />
              </div>
            </div>
          </div>

          {/* AI Threat Report */}
          <div className="bg-[#050505] border border-white/10 rounded-2xl overflow-hidden font-mono text-sm shadow-2xl">
            <div className="bg-white/5 px-4 py-2 border-b border-white/10 flex items-center gap-3 text-neutral-500 text-xs">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              sys.risk_narrative.log
            </div>
            <div className="p-6 text-neutral-300 leading-relaxed opacity-90">
              <span className="text-red-400 font-bold">[WARN]</span> {narrative}
            </div>
          </div>
        </div>
      </div>

      {/* ─── FLOATING CTA ─── */}
      <div className="fixed bottom-0 left-0 lg:left-[420px] right-0 p-6 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent z-30 pointer-events-none">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-2 shadow-[0_0_50px_rgba(0,0,0,0.8)] pointer-events-auto flex items-center justify-between">
          <div className="pl-6 py-2 hidden sm:block">
            <div className="text-sm font-black text-black">Ready to stop the bleed?</div>
            <div className="text-xs text-neutral-500 font-medium mt-0.5">Book a strategy call to map out an AI roadmap.</div>
          </div>
          
          {emailSent ? (
            <div className="flex-1 flex items-center justify-center gap-2 py-4 px-6 text-green-600 bg-green-50 rounded-xl font-bold">
              <CheckCircle2 className="w-5 h-5" /> Request Sent
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="flex gap-2 flex-1 sm:flex-none pl-2 sm:pl-0">
              <input 
                type="email" 
                required 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" 
                className="bg-neutral-100 border-none px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-red-500 text-black text-sm font-medium w-full sm:w-64"
              />
              <button 
                type="submit"
                className="bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-black text-sm transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                Book Demo <ArrowRight className="w-4 h-4 hidden sm:block" />
              </button>
            </form>
          )}
        </div>
      </div>

    </div>
  )
}