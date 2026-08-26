'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { runAssessment, type AssessmentAnswers, type AssessmentResult } from '@flowtaris/assessment-engine'
import { insertAssessmentLead } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'
import {
  ArrowRight, ChevronLeft, CheckCircle2, Zap, Target, Rocket,
  Activity, Mail, BarChart3, Shield, TrendingUp, Users,
  FileText, AlertTriangle, Link2, Clock, DollarSign
} from 'lucide-react'

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface SanityAssessmentConfig {
  questions?: Array<{
    id: string; step: number; title: string; description: string
    type: 'radio' | 'checkbox' | 'number' | 'select'
    options?: Array<{ value: string; label: string; description: string; icon?: string; weight?: number }>
    fields?: Array<{ id: string; label: string; placeholder: string; min: number }>
    validation?: { required?: boolean; min?: number; max?: number; maxSelections?: number }
  }>
  uiContent?: Record<string, string>
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const STORAGE_KEY = 'flowtaris-assessment-v2'

const initialAnswers: AssessmentAnswers = {
  erp: '', painPoints: [],
  volume: { invoicesPerMonth: 0, employees: 1, transactions: 0, poLines: 0 },
  currentState: '', techMaturity: '', urgency: '',
}

// ERP platform brand configs
const ERP_CONFIG = [
  { value: 'NetSuite', label: 'NetSuite', color: '#0d9488', bg: 'bg-teal-500/10 border-teal-500/30', active: 'border-teal-400 bg-teal-500/20 shadow-teal-500/20', desc: 'Oracle NetSuite ERP' },
  { value: 'SAP', label: 'SAP S/4HANA', color: '#3b82f6', bg: 'bg-blue-500/10 border-blue-500/30', active: 'border-blue-400 bg-blue-500/20 shadow-blue-500/20', desc: 'SAP S/4HANA or ECC' },
  { value: 'Coupa', label: 'Coupa', color: '#f97316', bg: 'bg-orange-500/10 border-orange-500/30', active: 'border-orange-400 bg-orange-500/20 shadow-orange-500/20', desc: 'Business Spend Management' },
  { value: 'Workday', label: 'Workday', color: '#22c55e', bg: 'bg-green-500/10 border-green-500/30', active: 'border-green-400 bg-green-500/20 shadow-green-500/20', desc: 'Financial Management' },
  { value: 'Multiple', label: 'Multiple ERPs', color: '#a855f7', bg: 'bg-purple-500/10 border-purple-500/30', active: 'border-purple-400 bg-purple-500/20 shadow-purple-500/20', desc: 'Multi-platform landscape' },
]

const PAIN_POINTS = [
  { value: 'Manual data entry', label: 'Manual Invoice Processing', icon: FileText, cost: '$14.20/invoice avg', color: 'text-red-400', desc: 'High-volume manual data entry across invoices, POs, and receipts' },
  { value: 'Invoice processing delays', label: 'Cash Flow Visibility', icon: DollarSign, cost: '8-12 day DSO gap', color: 'text-amber-400', desc: 'Poor forecasting visibility leads to working capital inefficiencies' },
  { value: 'Integration Failures', label: 'Integration Failures', icon: Link2, cost: '4.3hrs downtime/mo', color: 'text-orange-400', desc: 'Frequent iPaaS/API breakages disrupting critical financial workflows' },
  { value: 'Compliance risks', label: 'Compliance & Audit Risk', icon: Shield, cost: '$82K avg fine exposure', color: 'text-red-500', desc: 'Regulatory pressure, audit findings, and manual compliance tracking' },
  { value: 'Slow decision making', label: 'Slow Financial Close', icon: Clock, cost: '7.5 day avg close', color: 'text-yellow-400', desc: 'Month-end close cycle extends due to manual reconciliation' },
  { value: 'High error rates', label: 'Vendor Disputes & Errors', icon: AlertTriangle, cost: '4.8% error rate avg', color: 'text-rose-400', desc: 'Payment delays, duplicate invoices, and dispute resolution overhead' },
]

const CURRENT_STATE = [
  { value: 'Manual', label: 'Fully Manual', icon: '✋', maturity: 10, desc: 'Spreadsheets, email, paper-based processes' },
  { value: 'Partial', label: 'Partial Automation', icon: '⚙️', maturity: 35, desc: 'Some OCR/RPA tools but heavy exception handling' },
  { value: 'iPaaS', label: 'iPaaS Connected', icon: '☁️', maturity: 60, desc: 'MuleSoft, Boomi, Celigo or similar integration layer' },
  { value: 'Custom', label: 'Custom Built', icon: '💻', maturity: 50, desc: 'In-house developed automation and integrations' },
  { value: "Don't know", label: 'Unsure', icon: '❓', maturity: 20, desc: 'Not sure about current tech stack' },
]

const TECH_MATURITY = [
  { value: 'Legacy', label: 'Legacy Systems', icon: '🏛️', desc: 'On-premise, older ERP versions pre-2018' },
  { value: 'Hybrid', label: 'Hybrid Environment', icon: '🔀', desc: 'Mix of legacy on-prem and modern cloud systems' },
  { value: 'Modern', label: 'Cloud-Native', icon: '☁️', desc: 'Fully cloud, implemented 2020 or later' },
  { value: 'AI Pilot', label: 'AI Pilot Active', icon: '🧪', desc: 'Already experimenting with AI/ML in finance workflows' },
]

const URGENCY = [
  { value: 'Exploring', label: 'Research Phase', icon: '🔍', signal: 'LOW', color: 'text-slate-400', desc: 'Exploring options, building business case' },
  { value: 'Budget Approved', label: 'Budget Approved', icon: '✅', signal: 'MEDIUM', color: 'text-blue-400', desc: 'Funding secured and ready to evaluate vendors' },
  { value: 'Audit-Driven', label: 'Audit/Compliance', icon: '📋', signal: 'HIGH', color: 'text-amber-400', desc: 'Regulatory or audit requirement with deadline' },
  { value: 'Board Mandate', label: 'Board Mandate', icon: '🎯', signal: 'CRITICAL', color: 'text-red-400', desc: 'Strategic directive from C-suite or board' },
]

// ─── SCORE HELPER ────────────────────────────────────────────────────────────
function computeLiveScore(answers: AssessmentAnswers, step: number): number {
  let score = 0
  if (step >= 1 && answers.erp) score += 12
  if (step >= 2 && answers.painPoints.length > 0) score += answers.painPoints.length * 8
  if (step >= 3 && answers.volume.invoicesPerMonth > 0) {
    const vol = answers.volume.invoicesPerMonth + answers.volume.transactions + answers.volume.poLines
    score += vol > 5000 ? 20 : vol > 1000 ? 15 : 10
  }
  if (step >= 4 && answers.currentState) score += answers.currentState === 'Manual' ? 15 : 10
  if (step >= 5 && answers.techMaturity) score += answers.techMaturity === 'AI Pilot' ? 20 : 12
  if (step >= 6 && answers.urgency) {
    const urgencyBonus: Record<string, number> = { 'Board Mandate': 25, 'Audit-Driven': 20, 'Budget Approved': 15, 'Exploring': 8 }
    score += urgencyBonus[answers.urgency] || 8
  }
  return Math.min(score, 100)
}

const fmt = (v: number) => `$${Math.round(v).toLocaleString()}`
const fmtK = (v: number) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `$${(v / 1000).toFixed(0)}K` : fmt(v)

// ─── SCORE GAUGE SVG ─────────────────────────────────────────────────────────
function ScoreGauge({ score, size = 160 }: { score: number; size?: number }) {
  const r = (size / 2) - 14
  const circ = 2 * Math.PI * r
  // Arc: 270 degrees (from 135° to 405°)
  const arc = (circ * 0.75)
  const filled = arc * (score / 100)
  const dashOffset = arc - filled

  const color = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444'
  const label = score >= 70 ? 'HIGH READINESS' : score >= 45 ? 'MODERATE' : 'DEVELOPING'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(135deg)' }}>
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={10}
          strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" />
        {/* Fill */}
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${filled} ${circ}`} strokeDashoffset={0} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1.2s cubic-bezier(0.4,0,0.2,1)', filter: `drop-shadow(0 0 6px ${color})` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-black font-mono" style={{ color }}>{score}</div>
        <div className="text-[9px] tracking-widest font-bold uppercase opacity-60 mt-1">{label}</div>
      </div>
    </div>
  )
}

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0)
  useEffect(() => {
    const start = displayed
    const diff = value - start
    const duration = 600
    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(Math.round(start + diff * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value])
  return <span>{prefix}{displayed.toLocaleString()}{suffix}</span>
}

// ─── SIDEBAR LIVE SCORE ──────────────────────────────────────────────────────
function LiveScoreSidebar({ answers, step }: { answers: AssessmentAnswers; step: number }) {
  const score = computeLiveScore(answers, step)

  const bars = [
    { label: 'ERP Complexity', value: answers.erp ? (answers.erp === 'SAP' ? 90 : answers.erp === 'Multiple' ? 85 : 70) : 0, color: '#0891b2' },
    { label: 'Pain Severity', value: Math.min(answers.painPoints.length * 33, 100), color: '#ef4444' },
    { label: 'Volume Scale', value: answers.volume.invoicesPerMonth > 5000 ? 90 : answers.volume.invoicesPerMonth > 1000 ? 65 : answers.volume.invoicesPerMonth > 0 ? 35 : 0, color: '#f59e0b' },
    { label: 'AI Readiness', value: { 'AI Pilot': 95, 'Modern': 70, 'Hybrid': 45, 'Legacy': 25 }[answers.techMaturity] || 0, color: '#10b981' },
  ]

  const tier = score >= 70 ? 'Enterprise' : score >= 45 ? 'Mid-Market' : 'Growth'
  const tierColor = score >= 70 ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' : score >= 45 ? 'text-blue-400 bg-blue-500/10 border-blue-500/20' : 'text-slate-400 bg-slate-500/10 border-slate-500/20'

  return (
    <div className="hidden xl:flex flex-col gap-6 sticky top-24 w-72">
      <div className="bg-black/60 border border-white/10 rounded-2xl p-6 backdrop-blur-xl">
        <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-4">AI Readiness Score</div>
        <div className="flex justify-center mb-4">
          <ScoreGauge score={score} size={140} />
        </div>
        <div className={`text-center text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border ${tierColor} mb-6`}>
          {tier} Profile
        </div>
        <div className="space-y-3">
          {bars.map(bar => (
            <div key={bar.label}>
              <div className="flex justify-between text-[10px] text-white/40 mb-1">
                <span>{bar.label}</span>
                <span>{bar.value}%</span>
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${bar.value}%`, backgroundColor: bar.color, boxShadow: `0 0 6px ${bar.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-black/60 border border-white/10 rounded-2xl p-5 backdrop-blur-xl">
        <div className="text-[10px] text-white/40 uppercase tracking-widest font-semibold mb-3">What You Will Get</div>
        <div className="space-y-2">
          {['Personalized AI roadmap', 'Quantified $ savings estimates', '3-tier implementation plan', 'Peer benchmark comparison'].map(item => (
            <div key={item} className="flex items-center gap-2 text-xs text-white/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── STEP COMPONENTS ─────────────────────────────────────────────────────────
function StepERP({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold mb-2">Step 1 of 6 · Platform</div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">Which ERP platform powers your finance operations?</h2>
        <p className="text-white/50 mt-3 text-base">We use this to calibrate our recommendations to your specific environment.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ERP_CONFIG.map(erp => {
          const selected = value === erp.value
          return (
            <button key={erp.value} onClick={() => onChange(erp.value)}
              className={`group relative p-5 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer
                ${selected ? erp.active + ' shadow-lg scale-[1.02]' : erp.bg + ' hover:border-white/20 hover:scale-[1.01]'}`}>
              {selected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-5 h-5 text-white" style={{ color: erp.color }} />
                </div>
              )}
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3 font-bold text-sm"
                style={{ backgroundColor: erp.color + '22', color: erp.color, border: `1px solid ${erp.color}44` }}>
                {erp.label.slice(0, 2).toUpperCase()}
              </div>
              <div className="font-semibold text-white text-base">{erp.label}</div>
              <div className="text-white/40 text-xs mt-1">{erp.desc}</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepPainPoints({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const MAX = 3
  const toggle = (v: string) => {
    if (value.includes(v)) { onChange(value.filter(x => x !== v)) }
    else if (value.length < MAX) { onChange([...value, v]) }
  }
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold mb-2">Step 2 of 6 · Pain Points</div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">Where is your team losing the most time and money?</h2>
        <p className="text-white/50 mt-3 text-base">Select your top 3 operational challenges. Industry benchmarks shown.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {PAIN_POINTS.map(pain => {
          const selected = value.includes(pain.value)
          const disabled = !selected && value.length >= MAX
          const Icon = pain.icon
          return (
            <button key={pain.value} onClick={() => !disabled && toggle(pain.value)}
              disabled={disabled}
              className={`group relative p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer
                ${selected ? 'border-cyan-500/60 bg-cyan-500/10 scale-[1.01]' : disabled ? 'border-white/5 bg-white/2 opacity-40 cursor-not-allowed' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'}`}>
              {selected && (
                <div className="absolute top-3 right-3">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
              )}
              <div className="flex items-start gap-3">
                <div className={`mt-0.5 p-2 rounded-lg bg-white/5 ${selected ? 'bg-cyan-500/20' : ''}`}>
                  <Icon className={`w-4 h-4 ${selected ? 'text-cyan-400' : pain.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-white text-sm">{pain.label}</div>
                  <div className="text-white/40 text-xs mt-0.5 leading-relaxed">{pain.desc}</div>
                  <div className={`text-xs font-mono font-bold mt-2 ${pain.color}`}>{pain.cost}</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <div className="mt-4 text-center text-xs text-white/30">
        {value.length}/{MAX} selected · {MAX - value.length} remaining
      </div>
    </div>
  )
}

function StepVolume({ value, onChange }: { value: AssessmentAnswers['volume']; onChange: (v: AssessmentAnswers['volume']) => void }) {
  const annualCost = (value.invoicesPerMonth * 12 * 14.20) + (value.transactions * 12 * 3.50)
  const flowtarisCost = annualCost * 0.08

  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold mb-2">Step 3 of 6 · Volume</div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">What volumes does your finance team handle?</h2>
        <p className="text-white/50 mt-3 text-base">Used to quantify your exact savings potential. Approximate numbers are fine.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
        {[
          { id: 'invoicesPerMonth' as const, label: 'Invoices / Month', placeholder: 'e.g. 5,000', icon: FileText, benchmark: 'Industry avg: $14.20/invoice' },
          { id: 'employees' as const, label: 'Finance Team (FTE)', placeholder: 'e.g. 15', icon: Users, benchmark: 'Fully-loaded: ~$72K/yr' },
          { id: 'transactions' as const, label: 'Transactions / Month', placeholder: 'e.g. 25,000', icon: Activity, benchmark: 'Avg 5 min manual handling' },
          { id: 'poLines' as const, label: 'PO Lines / Month', placeholder: 'e.g. 3,000', icon: BarChart3, benchmark: 'Avg 8 min per line' },
        ].map(f => {
          const Icon = f.icon
          return (
            <div key={f.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-cyan-400" />
                <label className="text-sm font-semibold text-white/80">{f.label}</label>
              </div>
              <input type="number" min="0" placeholder={f.placeholder}
                value={value[f.id] || ''}
                onChange={e => onChange({ ...value, [f.id]: parseInt(e.target.value) || 0 })}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white font-mono text-lg focus:border-cyan-500 outline-none transition-colors"
              />
              <div className="text-xs text-white/30 mt-2 font-mono">{f.benchmark}</div>
            </div>
          )
        })}
      </div>
      {annualCost > 0 && (
        <div className="bg-gradient-to-r from-red-500/10 to-amber-500/10 border border-red-500/20 rounded-2xl p-5">
          <div className="text-xs text-white/50 uppercase tracking-wider mb-3 font-semibold">Live Cost Estimate (Based On Industry Benchmarks)</div>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="text-xs text-red-400 mb-1">Current Annual Cost</div>
              <div className="text-2xl font-black font-mono text-red-300">{fmtK(annualCost)}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-emerald-400 mb-1">With Flowtaris AI</div>
              <div className="text-2xl font-black font-mono text-emerald-300">{fmtK(flowtarisCost)}</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-cyan-400 mb-1">Estimated Savings</div>
              <div className="text-2xl font-black font-mono text-cyan-300">{fmtK(annualCost - flowtarisCost)}/yr</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StepCurrentState({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold mb-2">Step 4 of 6 · Current State</div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">How are your finance processes currently handled?</h2>
        <p className="text-white/50 mt-3 text-base">This determines your automation uplift potential and implementation complexity.</p>
      </div>
      <div className="space-y-3">
        {CURRENT_STATE.map(cs => {
          const selected = value === cs.value
          return (
            <button key={cs.value} onClick={() => onChange(cs.value)}
              className={`w-full group p-5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-5
                ${selected ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'}`}>
              <div className={`w-14 h-10 flex-shrink-0 rounded-xl flex items-center justify-center text-xl bg-white/5 ${selected ? 'bg-cyan-500/20' : ''}`}>
                {cs.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">{cs.label}</span>
                  <div className="flex-1 h-1.5 bg-white/10 rounded-full max-w-[120px]">
                    <div className="h-full bg-cyan-500 rounded-full transition-all" style={{ width: `${cs.maturity}%`, opacity: selected ? 1 : 0.4 }} />
                  </div>
                  <span className="text-xs text-white/40 font-mono">{cs.maturity}%</span>
                </div>
                <div className="text-white/40 text-sm mt-1">{cs.desc}</div>
              </div>
              {selected && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepTechMaturity({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold mb-2">Step 5 of 6 · Tech Maturity</div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">Describe your organization&apos;s technology landscape.</h2>
        <p className="text-white/50 mt-3 text-base">This shapes the complexity and timeline of your AI roadmap.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {TECH_MATURITY.map(tm => {
          const selected = value === tm.value
          return (
            <button key={tm.value} onClick={() => onChange(tm.value)}
              className={`group p-6 rounded-2xl border-2 text-left transition-all duration-200
                ${selected ? 'border-cyan-500/60 bg-cyan-500/10 shadow-lg shadow-cyan-500/10 scale-[1.02]' : 'border-white/10 bg-white/3 hover:border-white/20 hover:scale-[1.01]'}`}>
              <div className="text-3xl mb-3">{tm.icon}</div>
              <div className="font-semibold text-white text-base mb-1">{tm.label}</div>
              <div className="text-white/40 text-sm">{tm.desc}</div>
              {selected && (
                <div className="mt-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400 font-semibold">Selected</span>
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepUrgency({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold mb-2">Step 6 of 6 · Timeline</div>
        <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight">What&apos;s driving your evaluation timeline?</h2>
        <p className="text-white/50 mt-3 text-base">This determines how we prioritize your roadmap — quick wins vs. strategic transformation.</p>
      </div>
      <div className="space-y-3">
        {URGENCY.map(u => {
          const selected = value === u.value
          return (
            <button key={u.value} onClick={() => onChange(u.value)}
              className={`w-full group p-5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-5
                ${selected ? 'border-cyan-500/60 bg-cyan-500/10' : 'border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5'}`}>
              <div className="text-2xl">{u.icon}</div>
              <div className="flex-1">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-semibold text-white">{u.label}</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${u.color} bg-white/5 border-white/10`}>
                    {u.signal}
                  </span>
                </div>
                <div className="text-white/40 text-sm mt-1">{u.desc}</div>
              </div>
              {selected && <CheckCircle2 className="w-5 h-5 text-cyan-400 flex-shrink-0" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── RESULTS COMPONENT ───────────────────────────────────────────────────────
function Results({ result, answers, assessmentId }: { result: AssessmentResult; answers: AssessmentAnswers; assessmentId: string | null }) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setShowScore(true), 400)
    return () => clearTimeout(t)
  }, [])

  const quickWins = result.recommendations.filter(r => r.category === 'quick-win')
  const strategic = result.recommendations.filter(r => r.category === 'strategic')
  const innovation = result.recommendations.filter(r => r.category === 'innovation')

  const tierLabel = result.tier === 'enterprise' ? 'Enterprise' : result.tier === 'mid-market' ? 'Mid-Market' : 'Growth'
  const tierColor = result.tier === 'enterprise' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
    result.tier === 'mid-market' ? 'text-blue-400 border-blue-500/30 bg-blue-500/10' : 'text-slate-400 border-slate-500/30 bg-slate-500/10'

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSending(true)
    setEmailError('')
    try {
      const resp = await fetch('/api/leads/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: assessmentId, email, result, answers }),
      })
      const data = await resp.json()
      if (!resp.ok) throw new Error(data.error || 'Failed')
      setEmailSent(true)
      localStorage.removeItem(STORAGE_KEY)
    } catch (err: unknown) {
      setEmailError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  const CATEGORY_CONFIG = {
    'quick-win': { label: 'Quick Wins', sub: '0–3 months', icon: Zap, color: '#10b981', border: 'border-emerald-500/30', bg: 'bg-emerald-500/5', badge: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    'strategic': { label: 'Strategic', sub: '3–9 months', icon: Target, color: '#f59e0b', border: 'border-amber-500/30', bg: 'bg-amber-500/5', badge: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    'innovation': { label: 'Innovation', sub: '9–18 months', icon: Rocket, color: '#a855f7', border: 'border-purple-500/30', bg: 'bg-purple-500/5', badge: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  }

  return (
    <div className="w-full animate-in fade-in duration-700">
      {/* ── HEADER HERO ── */}
      <div className="text-center py-12 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />
        <div className={`inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border mb-6 ${tierColor}`}>
          {tierLabel} Profile
        </div>
        <h2 className="text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">Your Strategic Intelligence Report</h2>
        <p className="text-white/50 max-w-2xl mx-auto text-base leading-relaxed">{result.summary}</p>
      </div>

      {/* ── KEY METRICS ROW ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 px-6 mb-10 max-w-5xl mx-auto w-full">
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">AI Readiness</div>
          <div className="flex justify-center">{showScore ? <ScoreGauge score={result.leadScore} size={90} /> : <div className="h-[90px]" />}</div>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Est. Annual Savings</div>
          <div className="text-3xl font-black font-mono text-emerald-400 mt-3">
            {showScore ? fmtK(result.totalEstimatedSavings) : '—'}
          </div>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Opportunities</div>
          <div className="text-3xl font-black font-mono text-white mt-3">{result.recommendations.length}</div>
          <div className="text-xs text-white/30 mt-1">AI capabilities identified</div>
        </div>
        <div className="bg-black/60 border border-white/10 rounded-2xl p-5 text-center">
          <div className="text-[10px] text-white/40 uppercase tracking-widest mb-2">Fastest Payback</div>
          <div className="text-3xl font-black font-mono text-cyan-400 mt-3">
            {result.recommendations.length > 0 ? `${Math.min(...result.recommendations.map(r => r.estimatedPaybackMonths))} mo` : '—'}
          </div>
        </div>
      </div>

      {/* ── ROADMAP ── */}
      <div className="px-6 max-w-5xl mx-auto w-full mb-10">
        <div className="text-[11px] text-white/40 uppercase tracking-widest font-semibold mb-6">Your AI Automation Roadmap</div>
        <div className="space-y-4">
          {(['quick-win', 'strategic', 'innovation'] as const).map(cat => {
            const recs = cat === 'quick-win' ? quickWins : cat === 'strategic' ? strategic : innovation
            const cfg = CATEGORY_CONFIG[cat]
            const Icon = cfg.icon
            if (recs.length === 0) return null
            return (
              <div key={cat} className={`rounded-2xl border ${cfg.border} ${cfg.bg} p-6`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2 rounded-xl" style={{ backgroundColor: cfg.color + '22' }}>
                    <Icon className="w-5 h-5" style={{ color: cfg.color }} />
                  </div>
                  <div>
                    <div className="font-bold text-white text-base">{cfg.label}</div>
                    <div className="text-xs text-white/40">{cfg.sub} · {recs.length} initiative{recs.length > 1 ? 's' : ''}</div>
                  </div>
                  <div className="ml-auto text-right">
                    <div className="text-xs text-white/30 mb-0.5">Tier savings</div>
                    <div className="font-bold font-mono text-sm" style={{ color: cfg.color }}>{fmtK(recs.reduce((s, r) => s + r.estimatedSavings, 0))}/yr</div>
                  </div>
                </div>
                <div className="space-y-3">
                  {recs.map(rec => (
                    <div key={rec.capabilitySlug} className="bg-black/30 rounded-xl p-4 border border-white/5">
                      <div className="flex items-start justify-between gap-3 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white text-sm mb-1">{rec.capability}</div>
                          <div className="text-white/40 text-xs leading-relaxed">{rec.description}</div>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <div className="text-xs text-white/30 mb-0.5">Est. savings</div>
                          <div className="font-bold font-mono text-base" style={{ color: cfg.color }}>{fmtK(rec.estimatedSavings)}/yr</div>
                          <div className="text-[10px] text-white/20 mt-0.5">{rec.estimatedPaybackMonths}mo payback</div>
                        </div>
                      </div>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${cfg.badge}`}>{rec.timeline}</span>
                        {rec.savingsBreakdown.laborSavings > 0 && (
                          <span className="text-[10px] text-white/30 font-mono">Labor: {fmtK(rec.savingsBreakdown.laborSavings)}</span>
                        )}
                        {rec.savingsBreakdown.errorReduction > 0 && (
                          <span className="text-[10px] text-white/30 font-mono">Errors: {fmtK(rec.savingsBreakdown.errorReduction)}</span>
                        )}
                        {rec.savingsBreakdown.complianceSavings > 0 && (
                          <span className="text-[10px] text-white/30 font-mono">Compliance: {fmtK(rec.savingsBreakdown.complianceSavings)}</span>
                        )}
                        <a href={`/capabilities/${rec.capabilitySlug}`} className="ml-auto text-[10px] text-cyan-400 hover:text-cyan-300 transition-colors">
                          View details →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── EMAIL CAPTURE ── */}
      <div className="px-6 max-w-5xl mx-auto w-full mb-10">
        <div className="bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 border border-cyan-500/20 rounded-2xl p-8">
          {emailSent ? (
            <div className="text-center py-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <div className="text-xl font-bold text-white mb-2">Report Sent to Your Inbox!</div>
              <div className="text-white/50 text-sm">Check your email for the full Strategic Intelligence Report with implementation guidance.</div>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-xl font-bold text-white mb-2">Get Your Full Report Delivered</div>
                <div className="text-white/50 text-sm max-w-md mx-auto">Receive your personalized roadmap with implementation guidance, peer benchmarks, and a conversation starter for your CFO.</div>
              </div>
              <form onSubmit={handleEmail} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="cfo@yourcompany.com"
                  className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-cyan-500 outline-none transition-colors" />
                <button type="submit" disabled={isSending}
                  className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-colors disabled:opacity-50 whitespace-nowrap">
                  {isSending ? <Activity className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                  {isSending ? 'Sending...' : 'Send Report'}
                </button>
              </form>
              {emailError && <div className="text-red-400 text-xs text-center mt-3">{emailError}</div>}
            </>
          )}
        </div>
      </div>

      {/* ── SECONDARY CTAs ── */}
      <div className="px-6 max-w-5xl mx-auto w-full mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a href={`/roi-calculator?erp=${encodeURIComponent(answers.erp)}&invoices=${answers.volume.invoicesPerMonth * 12}`}
            className="flex items-center gap-4 p-5 rounded-2xl border border-white/10 bg-white/3 hover:border-white/20 hover:bg-white/5 transition-all group">
            <TrendingUp className="w-8 h-8 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <div className="font-semibold text-white">Calculate Full ROI</div>
              <div className="text-white/40 text-sm">Get detailed financial projections with 3-year model</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="/demo"
            className="flex items-center gap-4 p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-all group">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
            <div>
              <div className="font-semibold text-white">Book a Live Demo</div>
              <div className="text-white/40 text-sm">30-min session with a Flowtaris solutions engineer</div>
            </div>
            <ArrowRight className="w-4 h-4 text-white/30 ml-auto group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN ORCHESTRATOR ───────────────────────────────────────────────────────
export default function AssessmentWizardClient({ initialConfig }: { initialConfig: SanityAssessmentConfig | null }) {
  const [step, setStep] = useState(1)
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [animDir, setAnimDir] = useState<'forward' | 'back'>('forward')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  // Restore draft
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (parsed.answers) setAnswers(parsed.answers)
        if (parsed.step && parsed.step <= 6) setStep(parsed.step)
      }
    } catch { /* ignore */ }
    analytics.assessment.start({ source: 'direct' })
  }, [])

  // Persist draft
  useEffect(() => {
    if (!result) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step, timestamp: Date.now() }))
    }
  }, [answers, step, result])

  const navigate = useCallback((direction: 'forward' | 'back') => {
    if (isTransitioning) return
    setAnimDir(direction)
    setIsTransitioning(true)
    setTimeout(() => {
      setStep(s => direction === 'forward' ? s + 1 : Math.max(s - 1, 1))
      setIsTransitioning(false)
    }, 220)
  }, [isTransitioning])

  const canProceed = useMemo(() => {
    if (step === 1) return !!answers.erp
    if (step === 2) return answers.painPoints.length > 0
    if (step === 3) return answers.volume.invoicesPerMonth > 0 && answers.volume.employees >= 1
    if (step === 4) return !!answers.currentState
    if (step === 5) return !!answers.techMaturity
    if (step === 6) return !!answers.urgency
    return true
  }, [step, answers])

  // Auto-advance on radio select (steps 1, 4, 5, 6)
  useEffect(() => {
    if ([1, 4, 5, 6].includes(step) && canProceed && step < 6) {
      const t = setTimeout(() => navigate('forward'), 380)
      return () => clearTimeout(t)
    }
  }, [answers.erp, answers.currentState, answers.techMaturity])

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (result) return
      const target = e.target as Element
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
      if (e.key === 'Enter' && canProceed) { e.preventDefault(); step < 6 ? navigate('forward') : handleSubmit() }
      if (e.key === 'ArrowLeft' && step > 1) { e.preventDefault(); navigate('back') }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [step, canProceed, result, navigate])

  const handleSubmit = async () => {
    if (!canProceed) return
    setIsSubmitting(true)
    setError('')
    try {
      const assessmentResult = runAssessment(answers)
      setResult(assessmentResult)
      setStep(7)
      analytics.assessment.complete({
        leadScore: assessmentResult.leadScore,
        recommendations: assessmentResult.recommendations.map(r => r.capability),
        erp: answers.erp,
      })
      const { data, error: dbError } = await insertAssessmentLead({
        answers: answers as unknown as Record<string, unknown>,
        recommendations: assessmentResult.recommendations.map(r => r.capability),
        lead_score: assessmentResult.leadScore,
        routed_to: assessmentResult.leadScore > 70 ? 'sales' : 'nurture',
      })
      if (!dbError && data) setAssessmentId(data.id)
    } catch (err) {
      console.error('Assessment error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const STEPS = ['ERP', 'Pain Points', 'Volume', 'Current State', 'Tech Maturity', 'Timeline']
  const progress = (step - 1) / 6 * 100

  return (
    <div className="min-h-screen bg-[#050508] relative">
      {/* BG Glows */}
      <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* ── HEADER ── */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <a href="/" className="text-sm font-bold text-white/60 hover:text-white transition-colors">← Flowtaris</a>
          <div className="flex-1 h-0.5 bg-white/5 rounded-full overflow-hidden">
            {!result && (
              <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
            )}
            {result && <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full" style={{ width: '100%' }} />}
          </div>
          {!result && (
            <div className="text-xs text-white/30 font-mono whitespace-nowrap">{step}/6</div>
          )}
        </div>
        {/* Step dots */}
        {!result && (
          <div className="max-w-7xl mx-auto px-6 pb-3 flex items-center gap-2">
            {STEPS.map((s, i) => (
              <React.Fragment key={s}>
                <div className={`flex items-center gap-1.5 cursor-pointer group`} onClick={() => i + 1 < step ? setStep(i + 1) : null}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold transition-all
                    ${i + 1 < step ? 'bg-cyan-500 text-black' : i + 1 === step ? 'bg-white/10 text-white border border-cyan-500' : 'bg-white/5 text-white/30'}`}>
                    {i + 1 < step ? '✓' : i + 1}
                  </div>
                  <span className={`text-[10px] font-semibold transition-all hidden sm:inline ${i + 1 === step ? 'text-white/70' : i + 1 < step ? 'text-cyan-400' : 'text-white/20'}`}>{s}</span>
                </div>
                {i < 5 && <div className={`flex-1 h-px transition-colors ${i + 1 < step ? 'bg-cyan-500/50' : 'bg-white/5'}`} />}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      {/* ── MAIN CONTENT ── */}
      <div className={`pt-${result ? '20' : '28'} pb-24 min-h-screen`} style={{ paddingTop: result ? '80px' : '110px' }}>
        {result ? (
          <Results result={result} answers={answers} assessmentId={assessmentId} />
        ) : (
          <div className="max-w-7xl mx-auto px-6 flex gap-10 items-start">
            {/* Main content */}
            <div className="flex-1 min-w-0">
              <div ref={contentRef}
                className={`transition-all duration-200 ${isTransitioning ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}`}
                style={{ transform: isTransitioning ? (animDir === 'forward' ? 'translateX(16px)' : 'translateX(-16px)') : 'none', opacity: isTransitioning ? 0 : 1 }}>
                {step === 1 && <StepERP value={answers.erp} onChange={v => setAnswers(p => ({ ...p, erp: v }))} />}
                {step === 2 && <StepPainPoints value={answers.painPoints} onChange={v => setAnswers(p => ({ ...p, painPoints: v }))} />}
                {step === 3 && <StepVolume value={answers.volume} onChange={v => setAnswers(p => ({ ...p, volume: v }))} />}
                {step === 4 && <StepCurrentState value={answers.currentState} onChange={v => setAnswers(p => ({ ...p, currentState: v }))} />}
                {step === 5 && <StepTechMaturity value={answers.techMaturity} onChange={v => setAnswers(p => ({ ...p, techMaturity: v }))} />}
                {step === 6 && <StepUrgency value={answers.urgency} onChange={v => setAnswers(p => ({ ...p, urgency: v }))} />}
              </div>

              {error && <div className="mt-4 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</div>}

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
                <button onClick={() => navigate('back')} disabled={step === 1}
                  className="flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors disabled:opacity-0">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <div className="text-xs text-white/20 font-mono">Press Enter to continue</div>
                {step < 6 ? (
                  <button onClick={() => navigate('forward')} disabled={!canProceed}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold px-6 py-3 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={!canProceed || isSubmitting}
                    className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-all disabled:opacity-30 disabled:cursor-not-allowed">
                    {isSubmitting ? <><Activity className="w-4 h-4 animate-spin" /> Analyzing...</> : <>Get My Roadmap <ArrowRight className="w-4 h-4" /></>}
                  </button>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <LiveScoreSidebar answers={answers} step={step} />
          </div>
        )}
      </div>
    </div>
  )
}
