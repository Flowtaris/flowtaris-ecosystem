'use client'

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import { runAssessment, type AssessmentAnswers, type AssessmentResult, type Recommendation } from '@flowtaris/assessment-engine'
import { insertAssessmentLead } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'
import { ArrowRight, ChevronLeft, Activity, Mail, TrendingUp, CheckCircle2, Zap, Target, Rocket } from 'lucide-react'

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface SanityAssessmentConfig {
  questions?: Array<{ id: string; step: number; title: string; description: string; type: string }>
  uiContent?: Record<string, string>
}

const STORAGE_KEY = 'flowtaris-assessment-v4'
const initialAnswers: AssessmentAnswers = {
  erp: '', painPoints: [],
  volume: { invoicesPerMonth: 0, employees: 1, transactions: 0, poLines: 0 },
  currentState: '', techMaturity: '', urgency: '',
}

// ─── ERP DATA ─────────────────────────────────────────────────────────────────
const ERP_LIST = [
  { value: 'NetSuite', abbr: 'NS', label: 'Oracle NetSuite', sub: 'ERP · Cloud', accent: '#00b4a0' },
  { value: 'SAP', abbr: 'SAP', label: 'SAP S/4HANA', sub: 'ERP · Hybrid', accent: '#3b82f6' },
  { value: 'Coupa', abbr: 'CPA', label: 'Coupa BSM', sub: 'Procurement · Cloud', accent: '#f97316' },
  { value: 'Workday', abbr: 'WD', label: 'Workday Finance', sub: 'HCM · Cloud', accent: '#22c55e' },
  { value: 'Multiple', abbr: '···', label: 'Multiple Systems', sub: 'Multi-platform', accent: '#a855f7' },
]

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
const PAIN_LIST = [
  { value: 'Manual data entry', label: 'Manual Invoice Processing', metric: '$14.20', unit: 'per invoice', severity: 92, color: '#ef4444' },
  { value: 'Invoice processing delays', label: 'Cash Flow Blind Spots', metric: '11 days', unit: 'avg DSO gap', severity: 78, color: '#f59e0b' },
  { value: 'Integration Failures', label: 'Integration Failures', metric: '4.3 hrs', unit: 'downtime/month', severity: 84, color: '#f97316' },
  { value: 'Compliance risks', label: 'Compliance Exposure', metric: '$82K', unit: 'avg fine risk', severity: 89, color: '#ef4444' },
  { value: 'Slow decision making', label: 'Slow Financial Close', metric: '7.5 days', unit: 'avg cycle', severity: 71, color: '#eab308' },
  { value: 'High error rates', label: 'Error Rates & Disputes', metric: '4.8%', unit: 'error rate avg', severity: 76, color: '#ef4444' },
]

const STATE_LIST = [
  { value: 'Manual', label: 'Fully Manual', tag: 'Spreadsheets · Email · Paper', level: 1 },
  { value: 'Partial', label: 'Partially Automated', tag: 'Some OCR/RPA · Heavy exceptions', level: 2 },
  { value: 'iPaaS', label: 'iPaaS Connected', tag: 'MuleSoft · Boomi · Celigo', level: 3 },
  { value: 'Custom', label: 'Custom Built', tag: 'In-house automation', level: 3 },
  { value: "Don't know", label: 'Unsure', tag: 'Unknown tech stack', level: 0 },
]

const MATURITY_LIST = [
  { value: 'Legacy', label: 'Legacy Core', tag: 'On-premise · Pre-2018 ERP', year: '< 2018' },
  { value: 'Hybrid', label: 'Hybrid Landscape', tag: 'Legacy + Cloud mix', year: '2018–2022' },
  { value: 'Modern', label: 'Cloud-Native', tag: 'SaaS-first · API-driven', year: '2022+' },
  { value: 'AI Pilot', label: 'AI Pilot Running', tag: 'Active ML/AI experiments', year: 'Now' },
]

const URGENCY_LIST = [
  { value: 'Exploring', label: 'Research Phase', tag: 'Building business case', signal: 'LOW', signalColor: '#94a3b8', priority: 1 },
  { value: 'Budget Approved', label: 'Budget Approved', tag: 'Funding secured', signal: 'MED', signalColor: '#3b82f6', priority: 2 },
  { value: 'Audit-Driven', label: 'Audit Deadline', tag: 'Regulatory requirement', signal: 'HIGH', signalColor: '#f59e0b', priority: 3 },
  { value: 'Board Mandate', label: 'Board Mandate', tag: 'Executive directive', signal: 'CRIT', signalColor: '#ef4444', priority: 4 },
]

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtK = (v: number) => v >= 1e6 ? `$${(v/1e6).toFixed(1)}M` : v >= 1000 ? `$${(v/1000).toFixed(0)}K` : `$${Math.round(v)}`

function livePainCost(vol: AssessmentAnswers['volume']) {
  return (vol.invoicesPerMonth * 12 * 14.20) + (vol.transactions * 12 * 3.50)
}

// ─── SCORE ────────────────────────────────────────────────────────────────────
function calcScore(answers: AssessmentAnswers, step: number) {
  let s = 0
  if (answers.erp) s += 12
  s += Math.min(answers.painPoints.length * 8, 24)
  const vol = answers.volume.invoicesPerMonth + answers.volume.transactions + answers.volume.poLines
  if (vol > 5000) s += 20; else if (vol > 1000) s += 14; else if (vol > 0) s += 8
  if (answers.currentState === 'Manual') s += 15; else if (answers.currentState) s += 9
  if (answers.techMaturity === 'AI Pilot') s += 20; else if (answers.techMaturity) s += 12
  const ub: Record<string,number> = { 'Board Mandate': 25, 'Audit-Driven': 20, 'Budget Approved': 15, 'Exploring': 8 }
  s += ub[answers.urgency] || 0
  return Math.min(s, 100)
}

// ─── GAUGE ────────────────────────────────────────────────────────────────────
function Gauge({ score }: { score: number }) {
  const sz = 120, r = 44, circ = 2 * Math.PI * r
  const arc = circ * 0.75
  const fill = arc * (score / 100)
  const color = score >= 70 ? '#10b981' : score >= 45 ? '#f59e0b' : '#ef4444'
  return (
    <div className="relative" style={{ width: sz, height: sz }}>
      <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ transform: 'rotate(135deg)' }}>
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={8} strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" />
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 8px ${color}80)` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-3xl font-black font-mono leading-none" style={{ color }}>{score}</div>
        <div className="text-[10px] tracking-widest text-white/50 uppercase mt-0.5 font-bold">/ 100</div>
      </div>
    </div>
  )
}

// ─── STEP 0: INTRO GUIDE ─────────────────────────────────────────────────────
function StepIntro({ onStart }: { onStart: () => void }) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-16">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-cyan-500 to-emerald-500 p-[2px] mb-8 shadow-[0_0_40px_rgba(6,182,212,0.3)]">
        <div className="w-full h-full bg-[#050508] rounded-[22px] flex items-center justify-center">
          <Target className="w-10 h-10 text-cyan-400" />
        </div>
      </div>
      
      <h1 className="text-display-sm md:text-display-md text-white font-black leading-[1.1] tracking-tight mb-6">
        Discover Your AI Automation <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">Potential & ROI</span>
      </h1>
      
      <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
        In just 3 minutes, we will analyze your finance tech stack, calculate your estimated annual bleed, and generate a customized roadmap to transform your operations with Autonomous AI.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-14 text-left">
        <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center mb-4 text-cyan-400 border border-cyan-500/30">
            <Activity className="w-6 h-6" />
          </div>
          <div className="font-bold text-white text-lg mb-2">Benchmarked Insights</div>
          <div className="text-sm text-white/60 leading-relaxed">See how your current processes stack up against top-performing modern finance teams.</div>
        </div>
        <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400 border border-emerald-500/30">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="font-bold text-white text-lg mb-2">Quantified ROI</div>
          <div className="text-sm text-white/60 leading-relaxed">Get real dollar estimates for immediate savings, operational uplift, and payback periods.</div>
        </div>
        <div className="bg-white/[0.08] border border-white/20 rounded-2xl p-6 shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4 text-purple-400 border border-purple-500/30">
            <Rocket className="w-6 h-6" />
          </div>
          <div className="font-bold text-white text-lg mb-2">Actionable Roadmap</div>
          <div className="text-sm text-white/60 leading-relaxed">Receive a step-by-step strategic plan outlining quick wins and long-term innovation.</div>
        </div>
      </div>

      <button onClick={onStart} className="bg-cyan-500 hover:bg-cyan-400 text-black font-black text-xl px-12 py-5 rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.4)]">
        Start Assessment <ArrowRight className="w-6 h-6" />
      </button>
      <div className="text-sm text-white/40 mt-6 font-mono font-medium">Takes ~3 minutes · No email required to see your score</div>
    </div>
  )
}

// ─── STEP 1: ERP ─────────────────────────────────────────────────────────────
function StepERP({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest">01 / 06</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest uppercase">ERP Platform</span>
        </div>
        <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight">
          Which ERP powers<br />your finance stack?
        </h2>
        <p className="text-white/60 mt-4 text-base max-w-md">We calibrate every recommendation to your specific platform and its known automation constraints.</p>
      </div>

      <div className="flex flex-col gap-3">
        {ERP_LIST.map((erp) => {
          const selected = value === erp.value
          return (
            <button key={erp.value} onClick={() => onChange(erp.value)}
              className="group w-full flex items-center gap-5 px-6 py-5 rounded-2xl border-2 transition-all duration-200 text-left relative overflow-hidden bg-[#0a0a0f]"
              style={{
                borderColor: selected ? erp.accent : 'rgba(255,255,255,0.15)',
                background: selected ? erp.accent + '15' : 'rgba(255,255,255,0.05)',
                boxShadow: selected ? `0 0 20px ${erp.accent}30` : 'none',
              }}>
              <div className="w-14 h-12 rounded-xl flex items-center justify-center font-mono text-sm font-black flex-shrink-0 relative z-10"
                style={{ background: erp.accent + '25', color: erp.accent, border: `1px solid ${erp.accent}50` }}>
                {erp.abbr}
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-white text-lg">{erp.label}</span>
                  <span className="text-xs font-mono text-white/50 bg-white/10 px-2.5 py-1 rounded-md font-semibold">{erp.sub}</span>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 transition-opacity" style={{ color: selected ? erp.accent : 'rgba(255,255,255,0.5)' }}>
                {selected ? <CheckCircle2 className="w-6 h-6" style={{ color: erp.accent }} /> : <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── STEP 2: PAIN POINTS ──────────────────────────────────────────────────────
function StepPain({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
  const MAX = 3
  const toggle = (v: string) => {
    if (value.includes(v)) onChange(value.filter(x => x !== v))
    else if (value.length < MAX) onChange([...value, v])
  }

  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest">02 / 06</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest uppercase">Pain Points</span>
        </div>
        <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight">
          Where is your team<br />bleeding money?
        </h2>
        <p className="text-white/60 mt-4 text-base max-w-md">
          Select your top <span className="text-white font-bold">{MAX}</span> operational pain points. Industry cost benchmarks shown.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {PAIN_LIST.map(p => {
          const selected = value.includes(p.value)
          const disabled = !selected && value.length >= MAX
          const rank = value.indexOf(p.value)

          return (
            <button key={p.value} onClick={() => !disabled && toggle(p.value)} disabled={disabled}
              className="group w-full flex items-center gap-5 px-6 py-5 rounded-2xl border-2 transition-all duration-150 text-left relative overflow-hidden bg-[#0a0a0f]"
              style={{
                borderColor: selected ? p.color : disabled ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.15)',
                background: selected ? p.color + '15' : 'rgba(255,255,255,0.05)',
                boxShadow: selected ? `0 0 20px ${p.color}25` : 'none',
                opacity: disabled ? 0.4 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}>
              <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: selected ? p.color : 'transparent' }} />

              <div className="w-8 h-8 rounded-full flex items-center justify-center font-mono text-sm font-black flex-shrink-0"
                style={selected ? { background: p.color + '30', color: p.color, border: `2px solid ${p.color}` } : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', border: '2px solid rgba(255,255,255,0.1)' }}>
                {selected ? rank + 1 : ''}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-bold text-white text-lg">{p.label}</div>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 h-2 bg-white/10 rounded-full max-w-[120px] overflow-hidden border border-white/5">
                    <div className="h-full rounded-full" style={{ width: `${p.severity}%`, background: p.color, opacity: selected ? 1 : 0.5 }} />
                  </div>
                  <span className="text-xs font-mono font-bold" style={{ color: selected ? p.color : 'rgba(255,255,255,0.4)' }}>
                    {p.metric} <span className="font-normal opacity-80">{p.unit}</span>
                  </span>
                </div>
              </div>
              {selected && <CheckCircle2 className="w-6 h-6 flex-shrink-0" style={{ color: p.color }} />}
            </button>
          )
        })}
      </div>
      <div className="mt-5 text-sm font-mono font-bold text-white/50 text-right">{value.length} / {MAX} selected</div>
    </div>
  )
}

// ─── STEP 3: VOLUME ───────────────────────────────────────────────────────────
function StepVolume({ value, onChange }: { value: AssessmentAnswers['volume']; onChange: (v: AssessmentAnswers['volume']) => void }) {
  const cost = livePainCost(value)
  const savings = cost * 0.78

  const fields = [
    { id: 'invoicesPerMonth' as const, label: 'Invoices / Month', bench: '$14.20 ea avg' },
    { id: 'employees' as const, label: 'Finance FTE', bench: '$72K/yr fully-loaded' },
    { id: 'transactions' as const, label: 'Transactions / Month', bench: '$3.50 ea avg' },
    { id: 'poLines' as const, label: 'PO Lines / Month', bench: '8 min manual each' },
  ]

  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest">03 / 06</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest uppercase">Volume</span>
        </div>
        <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight">
          What scale are<br />we dealing with?
        </h2>
        <p className="text-white/60 mt-4 text-base max-w-md">Approximate numbers are fine. We use industry benchmarks to compute your real dollar exposure.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {fields.map(f => (
          <div key={f.id} className="bg-[#0a0a0f] border-2 border-white/10 rounded-2xl p-5 hover:border-cyan-500/30 transition-colors group">
            <div className="text-xs uppercase tracking-wider text-white/60 font-bold mb-4">{f.label}</div>
            <input type="number" min="0" value={value[f.id] || ''}
              onChange={e => onChange({ ...value, [f.id]: parseInt(e.target.value) || 0 })}
              placeholder="0"
              className="w-full bg-transparent text-3xl font-black font-mono text-white outline-none border-b-2 border-white/20 group-hover:border-cyan-500 pb-2 transition-colors"
            />
            <div className="text-xs font-mono font-medium text-white/40 mt-3">{f.bench}</div>
          </div>
        ))}
      </div>

      {cost > 0 && (
        <div className="border-2 border-white/15 rounded-2xl overflow-hidden bg-[#0a0a0f] shadow-2xl">
          <div className="bg-white/10 px-6 py-4 border-b border-white/10">
            <span className="text-xs uppercase tracking-widest text-white/70 font-bold">Live Cost Estimate · Industry Benchmarks</span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/10">
            <div className="px-6 py-5">
              <div className="text-xs text-red-400 font-bold uppercase tracking-wider mb-2">Annual Bleed</div>
              <div className="text-2xl font-black font-mono text-red-400">{fmtK(cost)}</div>
            </div>
            <div className="px-6 py-5">
              <div className="text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2">With Flowtaris</div>
              <div className="text-2xl font-black font-mono text-emerald-400">{fmtK(cost - savings)}</div>
            </div>
            <div className="px-6 py-5 bg-white/5">
              <div className="text-xs text-white/70 font-bold uppercase tracking-wider mb-2">Net Savings</div>
              <div className="text-2xl font-black font-mono text-white">{fmtK(savings)} <span className="text-sm font-normal text-white/50">/ yr</span></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── STEP 4: CURRENT STATE ────────────────────────────────────────────────────
function StepState({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest">04 / 06</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest uppercase">Current State</span>
        </div>
        <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight">
          How do these processes<br />run today?
        </h2>
        <p className="text-white/60 mt-4 text-base max-w-md">This determines your automation uplift ceiling — how much Flowtaris can realistically shift.</p>
      </div>

      <div className="flex items-end gap-1.5 mb-10 h-12">
        {[...Array(5)].map((_, i) => {
          const level = STATE_LIST.find(s => s.value === value)?.level ?? -1
          const active = level >= 0 && i <= level
          return (
            <div key={i} className="flex-1 rounded-sm transition-all duration-500 border border-white/5"
              style={{
                height: `${(i + 1) * 20}%`,
                background: active ? '#06b6d4' : 'rgba(255,255,255,0.1)',
                boxShadow: active ? '0 0 15px rgba(6,182,212,0.5)' : 'none',
              }} />
          )
        })}
      </div>

      <div className="flex flex-col gap-3">
        {STATE_LIST.map(s => {
          const selected = value === s.value
          return (
            <button key={s.value} onClick={() => onChange(s.value)}
              className="group w-full flex items-center gap-5 px-6 py-5 rounded-2xl border-2 transition-all duration-150 text-left bg-[#0a0a0f]"
              style={{
                borderColor: selected ? '#06b6d4' : 'rgba(255,255,255,0.15)',
                background: selected ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
                boxShadow: selected ? '0 0 20px rgba(6,182,212,0.2)' : 'none',
              }}>
              <div className="w-8 h-8 rounded-full flex-shrink-0 border-2 transition-all flex items-center justify-center"
                style={selected ? { background: '#06b6d4', borderColor: '#06b6d4', boxShadow: '0 0 10px rgba(6,182,212,0.5)' } : { borderColor: 'rgba(255,255,255,0.3)' }}>
                {selected && <div className="w-3 h-3 bg-white rounded-full" />}
              </div>
              <div>
                <div className="font-bold text-white text-lg">{s.label}</div>
                <div className="text-sm font-medium text-white/50 mt-1">{s.tag}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── STEP 5: TECH MATURITY ────────────────────────────────────────────────────
function StepMaturity({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest">05 / 06</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest uppercase">Tech Maturity</span>
        </div>
        <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight">
          How modern is<br />your tech foundation?
        </h2>
        <p className="text-white/60 mt-4 text-base max-w-md">Your infrastructure vintage shapes our AI integration complexity and your time-to-value.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {MATURITY_LIST.map(m => {
          const selected = value === m.value
          return (
            <button key={m.value} onClick={() => onChange(m.value)}
              className="p-6 rounded-2xl border-2 text-left transition-all duration-150 relative bg-[#0a0a0f]"
              style={{
                borderColor: selected ? '#06b6d4' : 'rgba(255,255,255,0.15)',
                background: selected ? 'rgba(6,182,212,0.15)' : 'rgba(255,255,255,0.05)',
                boxShadow: selected ? '0 0 20px rgba(6,182,212,0.2)' : 'none',
              }}>
              <div className="text-xs font-mono font-bold px-3 py-1 bg-white/10 rounded-lg inline-block mb-4 text-white/70">{m.year}</div>
              <div className="font-bold text-white text-xl mb-2">{m.label}</div>
              <div className="text-sm font-medium text-white/60">{m.tag}</div>
              
              <div className="absolute top-6 right-6 w-6 h-6 rounded-full border-2 transition-all flex items-center justify-center"
                style={selected ? { background: '#06b6d4', borderColor: '#06b6d4' } : { borderColor: 'rgba(255,255,255,0.3)' }}>
                {selected && <CheckCircle2 className="w-4 h-4 text-white" />}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── STEP 6: URGENCY ─────────────────────────────────────────────────────────
function StepUrgency({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest">06 / 06</span>
          <div className="h-px flex-1 bg-white/20" />
          <span className="font-mono text-[13px] text-white/50 font-bold tracking-widest uppercase">Timeline</span>
        </div>
        <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight">
          What&apos;s forcing<br />the timeline?
        </h2>
        <p className="text-white/60 mt-4 text-base max-w-md">This determines how aggressively we front-load your roadmap with quick wins vs. strategic plays.</p>
      </div>

      <div className="flex flex-col gap-3">
        {URGENCY_LIST.map(u => {
          const selected = value === u.value
          return (
            <button key={u.value} onClick={() => onChange(u.value)}
              className="group w-full flex items-center gap-5 px-6 py-6 rounded-2xl border-2 transition-all duration-150 text-left relative overflow-hidden bg-[#0a0a0f]"
              style={{
                borderColor: selected ? u.signalColor : 'rgba(255,255,255,0.15)',
                background: selected ? u.signalColor + '15' : 'rgba(255,255,255,0.05)',
                boxShadow: selected ? `0 0 20px ${u.signalColor}30` : 'none',
              }}>
              <div className="w-14 h-14 rounded-xl flex items-center justify-center font-black font-mono text-base flex-shrink-0 border-2"
                style={selected ? { background: u.signalColor + '30', color: u.signalColor, borderColor: u.signalColor } : { background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.4)', borderColor: 'rgba(255,255,255,0.1)' }}>
                {u.signal}
              </div>
              <div className="flex-1">
                <div className="font-bold text-white text-lg">{u.label}</div>
                <div className="text-sm font-medium text-white/60 mt-1">{u.tag}</div>
              </div>
              <div className="w-24 flex flex-col items-end gap-2">
                <div className="text-xs text-white/50 uppercase font-bold tracking-wider">Priority</div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${u.priority * 25}%`, background: selected ? u.signalColor : 'rgba(255,255,255,0.3)' }} />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ answers, step }: { answers: AssessmentAnswers; step: number }) {
  if (step === 0) return null
  const score = calcScore(answers, step)
  const tier = score >= 70 ? 'Enterprise' : score >= 45 ? 'Mid-Market' : 'Growth'
  const tierColor = score >= 70 ? '#10b981' : score >= 45 ? '#3b82f6' : '#64748b'
  const cost = livePainCost(answers.volume)

  return (
    <div className="hidden xl:flex flex-col gap-5 w-[300px] sticky top-28">
      <div className="bg-[#0a0a0f] border-2 border-white/10 rounded-3xl p-6 shadow-2xl">
        <div className="text-xs uppercase tracking-widest text-white/50 mb-5 font-bold">AI Readiness Score</div>
        <div className="flex items-center gap-6">
          <Gauge score={score} />
          <div>
            <div className="text-xs uppercase tracking-wider text-white/50 mb-1 font-bold">Profile</div>
            <div className="text-lg font-black" style={{ color: tierColor }}>{tier}</div>
          </div>
        </div>
      </div>

      <div className="bg-[#0a0a0f] border-2 border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
        <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-2">Signal Breakdown</div>
        {[
          { label: 'ERP Complexity', value: answers.erp ? 75 : 0, color: '#06b6d4' },
          { label: 'Pain Severity', value: Math.min(answers.painPoints.length * 33, 100), color: '#ef4444' },
          { label: 'Volume Scale', value: answers.volume.invoicesPerMonth > 5000 ? 90 : answers.volume.invoicesPerMonth > 1000 ? 60 : answers.volume.invoicesPerMonth > 0 ? 30 : 0, color: '#f59e0b' },
          { label: 'Readiness Tier', value: { 'AI Pilot': 95, 'Modern': 70, 'Hybrid': 45, 'Legacy': 20 }[answers.techMaturity] || 0, color: '#10b981' },
        ].map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-xs font-bold text-white/60 mb-2"><span>{b.label}</span><span className="font-mono text-white">{b.value}%</span></div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden border border-white/5"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${b.value}%`, background: b.color, boxShadow: `0 0 8px ${b.color}80` }} /></div>
          </div>
        ))}
      </div>

      {cost > 0 && (
        <div className="bg-red-500/10 border-2 border-red-500/30 rounded-3xl p-6 shadow-2xl">
          <div className="text-xs uppercase tracking-widest text-red-400 font-bold mb-3">Est. Annual Bleed</div>
          <div className="text-3xl font-black font-mono text-red-400 drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">{fmtK(cost)}</div>
          <div className="text-xs font-medium text-white/50 mt-2">Based on industry benchmarks</div>
        </div>
      )}
    </div>
  )
}

// ─── RESULTS ─────────────────────────────────────────────────────────────────
function Results({ result, answers, assessmentId }: { result: AssessmentResult; answers: AssessmentAnswers; assessmentId: string | null }) {
  const [email, setEmail] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [isSending, setIsSending] = useState(false)

  const handleEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setIsSending(true)
    setEmailError('')
    try {
      const r = await fetch('/api/leads/assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: assessmentId, email, result, answers }),
      })
      if (!r.ok) throw new Error((await r.json()).error || 'Failed')
      setEmailSent(true)
      localStorage.removeItem(STORAGE_KEY)
    } catch (err: unknown) {
      setEmailError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setIsSending(false)
    }
  }

  const catConfig = {
    'quick-win': { Icon: Zap, label: 'Quick Wins', sub: '0–3 months', color: '#10b981' },
    'strategic': { Icon: Target, label: 'Strategic', sub: '3–9 months', color: '#f59e0b' },
    'innovation': { Icon: Rocket, label: 'Innovation', sub: '9–18 months', color: '#a855f7' },
  }

  const scoreColor = result.leadScore >= 70 ? '#10b981' : result.leadScore >= 45 ? '#f59e0b' : '#ef4444'

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 w-full">
      <div className="mb-14">
        <div className="flex items-start gap-10 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-xs uppercase tracking-widest text-cyan-400 font-bold mb-5 flex items-center gap-2">
              <Target className="w-4 h-4" /> Strategic Intelligence Report · {result.tier} Profile
            </div>
            <h2 className="text-display-xs text-white font-black leading-[1.05] tracking-tight mb-6">Your AI Automation<br />Roadmap is Ready</h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl">{result.summary}</p>
          </div>
          <div className="flex items-center gap-8 flex-shrink-0 bg-[#0a0a0f] border-2 border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-3">Readiness Score</div>
              <div className="text-7xl font-black font-mono leading-none drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]" style={{ color: scoreColor }}>{result.leadScore}</div>
              <div className="text-[10px] text-white/40 font-bold mt-2 font-mono">/ 100</div>
            </div>
            <div className="w-px h-24 bg-white/10" />
            <div className="text-center">
              <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-3">Est. Annual Savings</div>
              <div className="text-4xl font-black font-mono text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.3)]">{fmtK(result.totalEstimatedSavings)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {[
          { label: 'Opportunities', value: String(result.recommendations.length), unit: 'identified' },
          { label: 'Quick Wins', value: String(result.recommendations.filter(r => r.category === 'quick-win').length), unit: 'immediate' },
          { label: 'Fastest Payback', value: result.recommendations.length ? `${Math.min(...result.recommendations.map(r => r.estimatedPaybackMonths))} mo` : '—', unit: 'to value' },
          { label: 'Investment Tier', value: result.tier === 'enterprise' ? 'Ent.' : result.tier === 'mid-market' ? 'Mid' : 'SMB', unit: 'profile' },
        ].map(k => (
          <div key={k.label} className="bg-[#0a0a0f] border-2 border-white/10 rounded-2xl px-6 py-6 shadow-xl">
            <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-3">{k.label}</div>
            <div className="text-3xl font-black font-mono text-white">{k.value}</div>
            <div className="text-xs font-medium text-white/50 mt-1">{k.unit}</div>
          </div>
        ))}
      </div>

      <div className="mb-14">
        <div className="text-xs uppercase tracking-widest text-white/50 font-bold mb-6 flex items-center gap-4">
          <span>Recommended Roadmap</span>
          <div className="h-px flex-1 bg-white/10" />
        </div>
        <div className="space-y-6">
          {(['quick-win', 'strategic', 'innovation'] as const).map(cat => {
            const recs = result.recommendations.filter(r => r.category === cat)
            if (recs.length === 0) return null
            const cfg = catConfig[cat]
            const Icon = cfg.Icon
            return (
              <div key={cat} className="border-2 border-white/10 rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0f]">
                <div className="flex items-center gap-4 px-6 py-4 border-b-2 border-white/10" style={{ background: cfg.color + '15' }}>
                  <div className="p-2 rounded-xl bg-white/10"><Icon className="w-5 h-5" style={{ color: cfg.color }} /></div>
                  <span className="font-black text-lg text-white">{cfg.label}</span>
                  <span className="text-xs font-mono font-bold text-white/60 bg-white/10 px-3 py-1 rounded-md">{cfg.sub}</span>
                  <span className="ml-auto font-mono text-xl font-black" style={{ color: cfg.color }}>{fmtK(recs.reduce((s, r) => s + r.estimatedSavings, 0))}/yr</span>
                </div>
                {recs.map((rec: Recommendation, i: number) => (
                  <div key={rec.capabilitySlug} className={`px-6 py-5 flex items-start justify-between gap-6 ${i < recs.length - 1 ? 'border-b border-white/10' : ''}`}>
                    <div>
                      <div className="font-bold text-white text-lg">{rec.capability}</div>
                      <div className="text-sm font-medium text-white/60 mt-2 leading-relaxed max-w-3xl">{rec.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0 bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                      <div className="font-black font-mono text-lg" style={{ color: cfg.color }}>{fmtK(rec.estimatedSavings)}/yr</div>
                      <div className="text-xs font-bold text-white/50 mt-1">{rec.estimatedPaybackMonths}mo payback</div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      <div className="border-2 border-cyan-500/30 bg-cyan-500/10 rounded-3xl overflow-hidden mb-10 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 blur-[100px] pointer-events-none rounded-full" />
        <div className="px-8 py-6 border-b border-cyan-500/20">
          <div className="font-black text-white text-xl">Get the Full Executive Report</div>
          <div className="text-cyan-100/70 text-sm mt-2 font-medium">Receive your personalized roadmap with implementation guidance, CFO conversation starters, and peer benchmarks.</div>
        </div>
        <div className="px-8 py-8">
          {emailSent ? (
            <div className="flex items-center gap-4 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-5 rounded-2xl">
              <CheckCircle2 className="w-8 h-8" />
              <div>
                <span className="font-black text-lg block">Report sent successfully.</span>
                <span className="text-sm text-emerald-400/80 font-medium">Check your inbox.</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleEmail} className="flex gap-4">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="cfo@company.com"
                className="flex-1 bg-black/60 border-2 border-white/20 rounded-xl px-6 py-4 text-white text-lg font-medium outline-none focus:border-cyan-500 transition-colors shadow-inner" />
              <button type="submit" disabled={isSending}
                className="flex items-center gap-3 bg-cyan-500 text-black font-black text-lg px-8 py-4 rounded-xl transition-all hover:bg-cyan-400 active:scale-95 disabled:opacity-50">
                {isSending ? <Activity className="w-5 h-5 animate-spin" /> : <Mail className="w-5 h-5" />}
                {isSending ? 'Sending...' : 'Send Report'}
              </button>
            </form>
          )}
          {emailError && <div className="text-red-400 font-bold text-sm mt-3 bg-red-500/10 p-3 rounded-xl border border-red-500/20">{emailError}</div>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a href={`/roi-calculator?erp=${encodeURIComponent(answers.erp)}&invoices=${answers.volume.invoicesPerMonth * 12}`}
          className="flex items-center gap-5 px-6 py-6 rounded-2xl border-2 border-white/10 hover:border-cyan-500/40 bg-[#0a0a0f] hover:bg-cyan-500/5 transition-all group shadow-xl">
          <div className="w-12 h-12 rounded-xl bg-white/5 group-hover:bg-cyan-500/20 flex items-center justify-center transition-colors">
            <TrendingUp className="w-6 h-6 text-white/50 group-hover:text-cyan-400 transition-colors" />
          </div>
          <div>
            <div className="font-black text-white text-lg">Full ROI Calculator</div>
            <div className="text-white/50 text-sm font-medium mt-1">Detailed 3-year financial model</div>
          </div>
          <ArrowRight className="w-5 h-5 text-white/30 ml-auto group-hover:translate-x-2 group-hover:text-cyan-400 transition-all" />
        </a>
        <a href="/demo"
          className="flex items-center gap-5 px-6 py-6 rounded-2xl border-2 border-emerald-500/30 hover:border-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 transition-all group shadow-[0_0_30px_rgba(16,185,129,0.1)]">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center transition-colors">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <div className="font-black text-white text-lg">Book a Demo</div>
            <div className="text-white/70 text-sm font-medium mt-1">30-min with a solutions engineer</div>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-400/50 ml-auto group-hover:translate-x-2 group-hover:text-emerald-400 transition-all" />
        </a>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AssessmentWizardClient({ initialConfig }: { initialConfig: SanityAssessmentConfig | null }) {
  const [step, setStep] = useState(0) // Step 0 = Intro Screen
  const [answers, setAnswers] = useState<AssessmentAnswers>(initialAnswers)
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [assessmentId, setAssessmentId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [transitioning, setTransitioning] = useState(false)
  const [dir, setDir] = useState<'f'|'b'>('f')

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      if (s) { const p = JSON.parse(s); if (p.answers) setAnswers(p.answers); if (p.step !== undefined && p.step <= 6) setStep(p.step) }
    } catch {}
    analytics.assessment.start({ source: 'direct' })
  }, [])

  useEffect(() => {
    if (!result) localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step, ts: Date.now() }))
  }, [answers, step, result])

  const canGo = useMemo(() => {
    if (step === 0) return true
    if (step === 1) return !!answers.erp
    if (step === 2) return answers.painPoints.length > 0
    if (step === 3) return answers.volume.invoicesPerMonth > 0 && answers.volume.employees >= 1
    if (step === 4) return !!answers.currentState
    if (step === 5) return !!answers.techMaturity
    if (step === 6) return !!answers.urgency
    return false
  }, [step, answers])

  const go = useCallback((d: 'f'|'b') => {
    if (transitioning) return
    setDir(d)
    setTransitioning(true)
    setTimeout(() => {
      setStep(s => d === 'f' ? s + 1 : Math.max(s - 1, 0))
      setTransitioning(false)
    }, 200)
  }, [transitioning])

  // Auto-advance for single-select steps (only if not intro)
  useEffect(() => {
    if (step !== 0 && [1, 4, 5, 6].includes(step) && canGo && step < 6 && !transitioning) {
      const t = setTimeout(() => go('f'), 400)
      return () => clearTimeout(t)
    }
  }, [answers.erp, answers.currentState, answers.techMaturity, answers.urgency, step, canGo, transitioning, go])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (result) return
      const t = e.target as Element
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return
      if (e.key === 'Enter' && canGo) { e.preventDefault(); step < 6 ? go('f') : handleSubmit() }
      if (e.key === 'ArrowLeft' && step > 0) { e.preventDefault(); go('b') }
    }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [step, canGo, result, go])

  const handleSubmit = async () => {
    if (!canGo) return
    setIsSubmitting(true); setError('')
    try {
      const r = runAssessment(answers)
      setResult(r); setStep(7)
      analytics.assessment.complete({ leadScore: r.leadScore, recommendations: r.recommendations.map(x => x.capability), erp: answers.erp })
      const { data, dbErr } = await insertAssessmentLead({
        answers: answers as unknown as Record<string,unknown>,
        recommendations: r.recommendations.map(x => x.capability),
        lead_score: r.leadScore,
        routed_to: r.leadScore > 70 ? 'sales' : 'nurture',
      }) as any
      if (!dbErr && data) setAssessmentId(data.id)
    } catch (e) {
      console.error(e); setError('An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const STEP_LABELS = ['ERP', 'Pain Points', 'Volume', 'Current State', 'Maturity', 'Timeline']

  return (
    <div className="min-h-screen bg-[#050508]">
      {/* Fixed ambient bg */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-cyan-500/[0.05] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-emerald-500/[0.04] blur-[150px] rounded-full" />
      </div>

      {/* Top nav bar */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.1] bg-[#050508]/80 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-8">
          <a href="/" className="text-sm text-white/50 hover:text-white transition-colors font-bold tracking-wide">← flowtaris.com</a>

          {!result && step > 0 && (
            <>
              {/* Step dots */}
              <div className="flex items-center gap-2 flex-1">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1
                  const done = n < step
                  const cur = n === step
                  return (
                    <React.Fragment key={label}>
                      <button onClick={() => done ? setStep(n) : null}
                        className={`flex items-center gap-2 transition-all ${done ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-black transition-all border-2
                          ${done ? 'bg-cyan-500 text-black border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.4)]' : cur ? 'bg-white/10 text-white border-white/50' : 'bg-transparent text-white/30 border-white/10'}`}>
                          {done ? '✓' : n}
                        </div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider hidden sm:inline transition-colors ${cur ? 'text-white' : done ? 'text-cyan-400' : 'text-white/30'}`}>{label}</span>
                      </button>
                      {i < 5 && <div className={`w-8 h-[2px] rounded-full transition-colors ${done ? 'bg-cyan-500' : 'bg-white/10'}`} />}
                    </React.Fragment>
                  )
                })}
              </div>
              <div className="text-xs font-black font-mono text-white/50 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">{step}/6</div>
            </>
          )}
          {result && <div className="flex-1 text-sm font-bold text-emerald-400 flex justify-end items-center gap-2"><CheckCircle2 className="w-5 h-5"/> Assessment Complete</div>}
        </div>
      </div>

      {/* Main */}
      <div className="relative z-10" style={{ paddingTop: '64px' }}>
        {result ? (
          <Results result={result} answers={answers} assessmentId={assessmentId} />
        ) : (
          <div className="max-w-7xl mx-auto px-6 pt-12 pb-32 flex gap-16 items-start">
            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? `translateY(${dir === 'f' ? '15px' : '-15px'})` : 'translateY(0)',
                transition: 'opacity 250ms ease, transform 250ms ease',
              }}>
                {step === 0 && <StepIntro onStart={() => go('f')} />}
                {step === 1 && <StepERP value={answers.erp} onChange={v => setAnswers(p => ({ ...p, erp: v }))} />}
                {step === 2 && <StepPain value={answers.painPoints} onChange={v => setAnswers(p => ({ ...p, painPoints: v }))} />}
                {step === 3 && <StepVolume value={answers.volume} onChange={v => setAnswers(p => ({ ...p, volume: v }))} />}
                {step === 4 && <StepState value={answers.currentState} onChange={v => setAnswers(p => ({ ...p, currentState: v }))} />}
                {step === 5 && <StepMaturity value={answers.techMaturity} onChange={v => setAnswers(p => ({ ...p, techMaturity: v }))} />}
                {step === 6 && <StepUrgency value={answers.urgency} onChange={v => setAnswers(p => ({ ...p, urgency: v }))} />}
              </div>

              {error && <div className="mt-6 text-red-400 font-bold text-sm bg-red-500/10 border-2 border-red-500/30 rounded-xl px-5 py-4 flex items-center gap-3"><Activity className="w-5 h-5"/> {error}</div>}

              {/* Nav */}
              {step > 0 && (
                <div className="fixed bottom-0 left-0 right-0 border-t border-white/10 bg-[#050508]/90 backdrop-blur-2xl z-30 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                  <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
                    <button onClick={() => go('b')}
                      className="flex items-center gap-2 text-sm font-bold text-white/50 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-6 py-3 rounded-xl border border-white/10">
                      <ChevronLeft className="w-5 h-5" /> Back
                    </button>
                    
                    <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-white/30 bg-black/50 px-4 py-2 rounded-lg border border-white/5">
                      <span className="bg-white/10 text-white/70 px-2 py-0.5 rounded font-mono text-[10px]">ENTER</span> to continue
                    </div>

                    {step < 6 ? (
                      <button onClick={() => go('f')} disabled={!canGo}
                        className="flex items-center gap-3 text-sm font-black px-8 py-3.5 rounded-xl transition-all disabled:opacity-30 disabled:scale-100 hover:scale-105 active:scale-95 shadow-lg border-2"
                        style={{ borderColor: canGo ? 'white' : 'transparent', background: canGo ? 'white' : 'rgba(255,255,255,0.1)', color: canGo ? 'black' : 'rgba(255,255,255,0.5)' }}>
                        Continue <ArrowRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button onClick={handleSubmit} disabled={!canGo || isSubmitting}
                        className="flex items-center gap-3 text-base font-black px-10 py-4 rounded-xl transition-all disabled:opacity-30 disabled:scale-100 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(6,182,212,0.4)] bg-cyan-500 text-black">
                        {isSubmitting ? <><Activity className="w-5 h-5 animate-spin" /> Analyzing Stack...</> : <>Generate Roadmap <ArrowRight className="w-5 h-5" /></>}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Sidebar answers={answers} step={step} />
          </div>
        )}
      </div>
    </div>
  )
}
