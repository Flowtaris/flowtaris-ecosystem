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

const STORAGE_KEY = 'flowtaris-assessment-v3'
const initialAnswers: AssessmentAnswers = {
  erp: '', painPoints: [],
  volume: { invoicesPerMonth: 0, employees: 1, transactions: 0, poLines: 0 },
  currentState: '', techMaturity: '', urgency: '',
}

// ─── ERP DATA ─────────────────────────────────────────────────────────────────
const ERP_LIST = [
  { value: 'NetSuite', abbr: 'NS', label: 'Oracle NetSuite', sub: 'ERP · Cloud', accent: '#00b4a0' },
  { value: 'SAP', abbr: 'SAP', label: 'SAP S/4HANA', sub: 'ERP · Hybrid', accent: '#0070f3' },
  { value: 'Coupa', abbr: 'CPA', label: 'Coupa BSM', sub: 'Procurement · Cloud', accent: '#f76b15' },
  { value: 'Workday', abbr: 'WD', label: 'Workday Finance', sub: 'HCM · Cloud', accent: '#00c86e' },
  { value: 'Multiple', abbr: '···', label: 'Multiple Systems', sub: 'Multi-platform', accent: '#9b6fff' },
]

// ─── PAIN POINTS ──────────────────────────────────────────────────────────────
const PAIN_LIST = [
  { value: 'Manual data entry', label: 'Manual Invoice Processing', metric: '$14.20', unit: 'per invoice', severity: 92, color: '#ff4d4f' },
  { value: 'Invoice processing delays', label: 'Cash Flow Blind Spots', metric: '11 days', unit: 'avg DSO gap', severity: 78, color: '#fa8c16' },
  { value: 'Integration Failures', label: 'Integration Failures', metric: '4.3 hrs', unit: 'downtime/month', severity: 84, color: '#ff7a45' },
  { value: 'Compliance risks', label: 'Compliance Exposure', metric: '$82K', unit: 'avg fine risk', severity: 89, color: '#f5222d' },
  { value: 'Slow decision making', label: 'Slow Financial Close', metric: '7.5 days', unit: 'avg cycle', severity: 71, color: '#faad14' },
  { value: 'High error rates', label: 'Error Rates & Disputes', metric: '4.8%', unit: 'error rate avg', severity: 76, color: '#ff4d4f' },
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
  { value: 'Exploring', label: 'Research Phase', tag: 'Building business case', signal: 'L', signalColor: '#64748b', priority: 1 },
  { value: 'Budget Approved', label: 'Budget Approved', tag: 'Funding secured', signal: 'M', signalColor: '#3b82f6', priority: 2 },
  { value: 'Audit-Driven', label: 'Audit Deadline', tag: 'Regulatory requirement', signal: 'H', signalColor: '#f59e0b', priority: 3 },
  { value: 'Board Mandate', label: 'Board Mandate', tag: 'Executive directive', signal: '!', signalColor: '#ef4444', priority: 4 },
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
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={8} strokeDasharray={`${arc} ${circ}`} strokeLinecap="round" />
        <circle cx={sz/2} cy={sz/2} r={r} fill="none" stroke={color} strokeWidth={8} strokeDasharray={`${fill} ${circ}`} strokeLinecap="round"
          style={{ transition: 'stroke-dasharray 1s ease', filter: `drop-shadow(0 0 5px ${color})` }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-2xl font-black font-mono leading-none" style={{ color }}>{score}</div>
        <div className="text-[8px] tracking-widest text-white/30 uppercase mt-0.5">/ 100</div>
      </div>
    </div>
  )
}

// ─── STEP 1: ERP — Full-width horizontal slots ───────────────────────────────
function StepERP({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] text-white/20 tracking-widest">01 / 06</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">ERP Platform</span>
        </div>
        <h2 className="text-display-xs text-white leading-[1.05] tracking-tight">
          Which ERP powers<br />your finance stack?
        </h2>
        <p className="text-white/30 mt-3 text-sm max-w-md">We calibrate every recommendation to your specific platform and its known automation constraints.</p>
      </div>

      <div className="flex flex-col gap-2.5">
        {ERP_LIST.map((erp) => {
          const selected = value === erp.value
          return (
            <button key={erp.value} onClick={() => onChange(erp.value)}
              className="group w-full flex items-center gap-5 px-5 py-4 rounded-xl border transition-all duration-200 text-left relative overflow-hidden"
              style={{
                borderColor: selected ? erp.accent + '60' : 'rgba(255,255,255,0.06)',
                background: selected ? erp.accent + '12' : 'rgba(255,255,255,0.02)',
              }}>
              {selected && <div className="absolute inset-0 opacity-5" style={{ background: `linear-gradient(90deg, ${erp.accent}, transparent)` }} />}
              <div className="w-12 h-10 rounded-lg flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 relative z-10"
                style={{ background: erp.accent + '18', color: erp.accent, border: `1px solid ${erp.accent}30` }}>
                {erp.abbr}
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white text-sm">{erp.label}</span>
                  <span className="text-[10px] font-mono text-white/20 bg-white/5 px-2 py-0.5 rounded">{erp.sub}</span>
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: selected ? erp.accent : 'rgba(255,255,255,0.3)' }}>
                {selected ? <CheckCircle2 className="w-5 h-5" style={{ color: erp.accent }} /> : <ArrowRight className="w-4 h-4" />}
              </div>
              {selected && <CheckCircle2 className="w-5 h-5 flex-shrink-0 relative z-10" style={{ color: erp.accent }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── STEP 2: PAIN POINTS — Severity-ranked selection ─────────────────────────
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
          <span className="font-mono text-[11px] text-white/20 tracking-widest">02 / 06</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">Pain Points</span>
        </div>
        <h2 className="text-display-xs text-white leading-[1.05] tracking-tight">
          Where is your team<br />bleeding money?
        </h2>
        <p className="text-white/30 mt-3 text-sm max-w-md">
          Select your top <span className="text-white/60 font-semibold">{MAX}</span> operational pain points. Industry cost benchmarks shown.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {PAIN_LIST.map(p => {
          const selected = value.includes(p.value)
          const disabled = !selected && value.length >= MAX
          const rank = value.indexOf(p.value)

          return (
            <button key={p.value} onClick={() => !disabled && toggle(p.value)} disabled={disabled}
              className="group w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-150 text-left relative overflow-hidden"
              style={{
                borderColor: selected ? p.color + '50' : disabled ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.07)',
                background: selected ? p.color + '0a' : 'rgba(255,255,255,0.015)',
                opacity: disabled ? 0.35 : 1,
                cursor: disabled ? 'not-allowed' : 'pointer',
              }}>
              {/* Severity bar - left border accent */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 rounded-l" style={{ background: selected ? p.color : 'transparent', boxShadow: selected ? `0 0 8px ${p.color}` : 'none' }} />

              {/* Rank badge */}
              <div className="w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold flex-shrink-0"
                style={selected ? { background: p.color + '25', color: p.color, border: `1px solid ${p.color}60` } : { background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.2)' }}>
                {selected ? rank + 1 : '·'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-semibold text-white text-sm">{p.label}</div>
                {/* Severity strip */}
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="flex-1 h-1 bg-white/5 rounded-full max-w-[80px]">
                    <div className="h-full rounded-full" style={{ width: `${p.severity}%`, background: p.color, opacity: selected ? 0.9 : 0.3 }} />
                  </div>
                  <span className="text-[10px] font-mono" style={{ color: selected ? p.color : 'rgba(255,255,255,0.2)' }}>
                    {p.metric} {p.unit}
                  </span>
                </div>
              </div>

              {selected && <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: p.color }} />}
            </button>
          )
        })}
      </div>
      <div className="mt-4 text-xs font-mono text-white/20 text-right">{value.length} / {MAX} selected</div>
    </div>
  )
}

// ─── STEP 3: VOLUME — Trading terminal inputs ─────────────────────────────────
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
          <span className="font-mono text-[11px] text-white/20 tracking-widest">03 / 06</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">Volume</span>
        </div>
        <h2 className="text-display-xs text-white leading-[1.05] tracking-tight">
          What scale are<br />we dealing with?
        </h2>
        <p className="text-white/30 mt-3 text-sm max-w-md">Approximate numbers are fine. We use industry benchmarks to compute your real dollar exposure.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {fields.map(f => (
          <div key={f.id} className="bg-white/[0.03] border border-white/[0.07] rounded-xl p-4">
            <div className="text-[10px] uppercase tracking-wider text-white/30 font-semibold mb-3">{f.label}</div>
            <input type="number" min="0" value={value[f.id] || ''}
              onChange={e => onChange({ ...value, [f.id]: parseInt(e.target.value) || 0 })}
              placeholder="0"
              className="w-full bg-transparent text-2xl font-black font-mono text-white outline-none border-b border-white/10 focus:border-white/30 pb-2 transition-colors"
            />
            <div className="text-[10px] font-mono text-white/20 mt-2">{f.bench}</div>
          </div>
        ))}
      </div>

      {cost > 0 && (
        <div className="border border-white/10 rounded-xl overflow-hidden">
          <div className="bg-white/[0.03] px-5 py-3 border-b border-white/5">
            <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">Live Cost Estimate · Industry Benchmarks</span>
          </div>
          <div className="grid grid-cols-3 divide-x divide-white/5">
            <div className="px-5 py-4">
              <div className="text-[10px] text-red-400/70 uppercase tracking-wider mb-1">Annual Bleed</div>
              <div className="text-xl font-black font-mono text-red-400">{fmtK(cost)}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] text-emerald-400/70 uppercase tracking-wider mb-1">With Flowtaris</div>
              <div className="text-xl font-black font-mono text-emerald-400">{fmtK(cost - savings)}</div>
            </div>
            <div className="px-5 py-4">
              <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Net Savings</div>
              <div className="text-xl font-black font-mono text-white">{fmtK(savings)} / yr</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── STEP 4: CURRENT STATE — Maturity spectrum ────────────────────────────────
function StepState({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="w-full">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-[11px] text-white/20 tracking-widest">04 / 06</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">Current State</span>
        </div>
        <h2 className="text-display-xs text-white leading-[1.05] tracking-tight">
          How do these processes<br />run today?
        </h2>
        <p className="text-white/30 mt-3 text-sm max-w-md">This determines your automation uplift ceiling — how much Flowtaris can realistically shift.</p>
      </div>

      {/* Maturity spectrum bar */}
      <div className="flex items-end gap-1 mb-8 h-8">
        {[...Array(5)].map((_, i) => {
          const level = STATE_LIST.find(s => s.value === value)?.level ?? -1
          const active = level >= 0 && i <= level
          return (
            <div key={i} className="flex-1 rounded-sm transition-all duration-500"
              style={{
                height: `${(i + 1) * 20}%`,
                background: active ? '#06b6d4' : 'rgba(255,255,255,0.06)',
                boxShadow: active ? '0 0 8px #06b6d440' : 'none',
              }} />
          )
        })}
      </div>

      <div className="flex flex-col gap-2">
        {STATE_LIST.map(s => {
          const selected = value === s.value
          return (
            <button key={s.value} onClick={() => onChange(s.value)}
              className="group w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all duration-150 text-left"
              style={{
                borderColor: selected ? '#06b6d4' : 'rgba(255,255,255,0.06)',
                background: selected ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.02)',
              }}>
              <div className="w-6 h-6 rounded-full flex-shrink-0 border transition-all"
                style={selected ? { background: '#06b6d4', borderColor: '#06b6d4', boxShadow: '0 0 8px #06b6d440' } : { borderColor: 'rgba(255,255,255,0.12)' }} />
              <div>
                <div className="font-semibold text-white text-sm">{s.label}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{s.tag}</div>
              </div>
              {selected && <CheckCircle2 className="w-4 h-4 ml-auto text-cyan-400" />}
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
          <span className="font-mono text-[11px] text-white/20 tracking-widest">05 / 06</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">Tech Maturity</span>
        </div>
        <h2 className="text-display-xs text-white leading-[1.05] tracking-tight">
          How modern is<br />your tech foundation?
        </h2>
        <p className="text-white/30 mt-3 text-sm max-w-md">Your infrastructure vintage shapes our AI integration complexity and your time-to-value.</p>
      </div>

      {/* Timeline visual */}
      <div className="relative mb-8">
        <div className="h-px w-full bg-white/10 absolute top-3" />
        <div className="flex justify-between relative">
          {MATURITY_LIST.map(m => {
            const selected = value === m.value
            return (
              <button key={m.value} onClick={() => onChange(m.value)} className="flex flex-col items-center gap-2 group">
                <div className="w-6 h-6 rounded-full border-2 transition-all duration-200 z-10 flex items-center justify-center"
                  style={selected ? { background: '#06b6d4', borderColor: '#06b6d4', boxShadow: '0 0 12px #06b6d460' } : { background: '#050508', borderColor: 'rgba(255,255,255,0.15)' }}>
                  {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className={`text-[10px] font-mono transition-colors ${selected ? 'text-cyan-400' : 'text-white/25 group-hover:text-white/50'}`}>{m.year}</div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {MATURITY_LIST.map(m => {
          const selected = value === m.value
          return (
            <button key={m.value} onClick={() => onChange(m.value)}
              className="p-5 rounded-xl border text-left transition-all duration-150"
              style={{
                borderColor: selected ? '#06b6d4' : 'rgba(255,255,255,0.07)',
                background: selected ? 'rgba(6,182,212,0.08)' : 'rgba(255,255,255,0.02)',
              }}>
              <div className="font-semibold text-white text-sm mb-1">{m.label}</div>
              <div className="text-[11px] text-white/30">{m.tag}</div>
              {selected && <div className="mt-2 text-[10px] text-cyan-400 font-semibold">✓ Selected</div>}
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
          <span className="font-mono text-[11px] text-white/20 tracking-widest">06 / 06</span>
          <div className="h-px flex-1 bg-white/5" />
          <span className="font-mono text-[11px] text-white/20 tracking-widest uppercase">Priority Signal</span>
        </div>
        <h2 className="text-display-xs text-white leading-[1.05] tracking-tight">
          What&apos;s forcing<br />the timeline?
        </h2>
        <p className="text-white/30 mt-3 text-sm max-w-md">This determines how aggressively we front-load your roadmap with quick wins vs. strategic plays.</p>
      </div>

      <div className="flex flex-col gap-3">
        {URGENCY_LIST.map(u => {
          const selected = value === u.value
          return (
            <button key={u.value} onClick={() => onChange(u.value)}
              className="group w-full flex items-center gap-5 px-5 py-5 rounded-xl border transition-all duration-150 text-left relative overflow-hidden"
              style={{
                borderColor: selected ? u.signalColor + '50' : 'rgba(255,255,255,0.07)',
                background: selected ? u.signalColor + '0d' : 'rgba(255,255,255,0.02)',
              }}>
              {/* Priority signal dot */}
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-sm flex-shrink-0"
                style={selected ? { background: u.signalColor + '25', color: u.signalColor, border: `1.5px solid ${u.signalColor}60` } : { background: 'rgba(255,255,255,0.04)', color: 'rgba(255,255,255,0.2)', border: '1.5px solid rgba(255,255,255,0.08)' }}>
                {u.signal}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-white text-base">{u.label}</div>
                <div className="text-[11px] text-white/30 mt-0.5">{u.tag}</div>
              </div>
              {/* Priority bar */}
              <div className="w-16 flex flex-col items-end gap-1">
                <div className="text-[9px] text-white/20 uppercase tracking-wider">Priority</div>
                <div className="w-full h-1.5 bg-white/5 rounded-full">
                  <div className="h-full rounded-full transition-all" style={{ width: `${u.priority * 25}%`, background: selected ? u.signalColor : 'rgba(255,255,255,0.1)' }} />
                </div>
              </div>
              {selected && <CheckCircle2 className="w-5 h-5" style={{ color: u.signalColor }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ answers, step }: { answers: AssessmentAnswers; step: number }) {
  const score = calcScore(answers, step)
  const tier = score >= 70 ? 'Enterprise' : score >= 45 ? 'Mid-Market' : 'Growth'
  const tierColor = score >= 70 ? '#10b981' : score >= 45 ? '#3b82f6' : '#64748b'
  const cost = livePainCost(answers.volume)

  return (
    <div className="hidden xl:flex flex-col gap-4 w-64 sticky top-28">
      {/* Score panel */}
      <div className="bg-black/70 border border-white/[0.07] rounded-2xl p-5 backdrop-blur-xl">
        <div className="text-[9px] uppercase tracking-widest text-white/25 mb-4 font-semibold">AI Readiness Score</div>
        <div className="flex items-center gap-4">
          <Gauge score={score} />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-white/30 mb-1">Profile</div>
            <div className="text-sm font-bold" style={{ color: tierColor }}>{tier}</div>
          </div>
        </div>
      </div>

      {/* Signal bars */}
      <div className="bg-black/70 border border-white/[0.07] rounded-2xl p-5 backdrop-blur-xl space-y-3">
        <div className="text-[9px] uppercase tracking-widest text-white/25 font-semibold mb-1">Signal Breakdown</div>
        {[
          { label: 'ERP Complexity', value: answers.erp ? 75 : 0, color: '#06b6d4' },
          { label: 'Pain Severity', value: Math.min(answers.painPoints.length * 33, 100), color: '#ef4444' },
          { label: 'Volume Scale', value: answers.volume.invoicesPerMonth > 5000 ? 90 : answers.volume.invoicesPerMonth > 1000 ? 60 : answers.volume.invoicesPerMonth > 0 ? 30 : 0, color: '#f59e0b' },
          { label: 'Readiness Tier', value: { 'AI Pilot': 95, 'Modern': 70, 'Hybrid': 45, 'Legacy': 20 }[answers.techMaturity] || 0, color: '#10b981' },
        ].map(b => (
          <div key={b.label}>
            <div className="flex justify-between text-[9px] text-white/25 mb-1"><span>{b.label}</span><span className="font-mono">{b.value}%</span></div>
            <div className="h-1 bg-white/5 rounded-full"><div className="h-full rounded-full transition-all duration-700" style={{ width: `${b.value}%`, background: b.color, boxShadow: `0 0 4px ${b.color}60` }} /></div>
          </div>
        ))}
      </div>

      {/* Cost preview */}
      {cost > 0 && (
        <div className="bg-red-500/5 border border-red-500/15 rounded-2xl p-5">
          <div className="text-[9px] uppercase tracking-widest text-red-400/60 font-semibold mb-2">Est. Annual Bleed</div>
          <div className="text-2xl font-black font-mono text-red-400">{fmtK(cost)}</div>
          <div className="text-[10px] text-white/25 mt-1">Based on industry benchmarks</div>
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
      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-start gap-8 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-[10px] uppercase tracking-widest text-white/30 font-semibold mb-4">Strategic Intelligence Report · {result.tier}</div>
            <h2 className="text-display-xs text-white leading-[1.05] tracking-tight mb-4">Your AI Automation<br />Roadmap is Ready</h2>
            <p className="text-white/40 text-sm leading-relaxed max-w-lg">{result.summary}</p>
          </div>
          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-widest text-white/25 mb-2">Readiness Score</div>
              <div className="text-6xl font-black font-mono leading-none" style={{ color: scoreColor }}>{result.leadScore}</div>
              <div className="text-[9px] text-white/20 mt-1 font-mono">/ 100</div>
            </div>
            <div className="w-px h-16 bg-white/10" />
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-widest text-white/25 mb-2">Est. Annual Savings</div>
              <div className="text-3xl font-black font-mono text-emerald-400">{fmtK(result.totalEstimatedSavings)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12">
        {[
          { label: 'Opportunities', value: String(result.recommendations.length), unit: 'identified' },
          { label: 'Quick Wins', value: String(result.recommendations.filter(r => r.category === 'quick-win').length), unit: 'immediate' },
          { label: 'Fastest Payback', value: result.recommendations.length ? `${Math.min(...result.recommendations.map(r => r.estimatedPaybackMonths))} mo` : '—', unit: 'to value' },
          { label: 'Investment Tier', value: result.tier === 'enterprise' ? 'Ent.' : result.tier === 'mid-market' ? 'Mid' : 'SMB', unit: 'profile' },
        ].map(k => (
          <div key={k.label} className="bg-white/[0.03] border border-white/[0.07] rounded-xl px-4 py-4">
            <div className="text-[9px] uppercase tracking-widest text-white/25 mb-2">{k.label}</div>
            <div className="text-2xl font-black font-mono text-white">{k.value}</div>
            <div className="text-[10px] text-white/25 mt-0.5">{k.unit}</div>
          </div>
        ))}
      </div>

      {/* Roadmap */}
      <div className="mb-12">
        <div className="text-[10px] uppercase tracking-widest text-white/25 font-semibold mb-5 flex items-center gap-3">
          <span>Recommended Roadmap</span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
        <div className="space-y-3">
          {(['quick-win', 'strategic', 'innovation'] as const).map(cat => {
            const recs = result.recommendations.filter(r => r.category === cat)
            if (recs.length === 0) return null
            const cfg = catConfig[cat]
            const Icon = cfg.Icon
            return (
              <div key={cat} className="border border-white/[0.07] rounded-xl overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5" style={{ background: cfg.color + '08' }}>
                  <Icon className="w-4 h-4" style={{ color: cfg.color }} />
                  <span className="font-semibold text-sm text-white">{cfg.label}</span>
                  <span className="text-[10px] font-mono text-white/30">{cfg.sub}</span>
                  <span className="ml-auto font-mono text-sm font-bold" style={{ color: cfg.color }}>{fmtK(recs.reduce((s, r) => s + r.estimatedSavings, 0))}/yr</span>
                </div>
                {recs.map((rec: Recommendation, i: number) => (
                  <div key={rec.capabilitySlug} className={`px-5 py-4 flex items-start justify-between gap-4 ${i < recs.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                    <div>
                      <div className="font-semibold text-white text-sm">{rec.capability}</div>
                      <div className="text-[11px] text-white/30 mt-0.5 leading-relaxed">{rec.description}</div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="font-bold font-mono text-sm" style={{ color: cfg.color }}>{fmtK(rec.estimatedSavings)}/yr</div>
                      <div className="text-[10px] text-white/20 mt-0.5">{rec.estimatedPaybackMonths}mo payback</div>
                    </div>
                  </div>
                ))}
              </div>
            )
          })}
        </div>
      </div>

      {/* Email */}
      <div className="border border-white/10 rounded-2xl overflow-hidden mb-8">
        <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02]">
          <div className="font-semibold text-white">Get the Full Report</div>
          <div className="text-white/40 text-xs mt-1">Receive your personalized roadmap with implementation guidance and CFO conversation starters.</div>
        </div>
        <div className="px-6 py-5">
          {emailSent ? (
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold text-sm">Report sent — check your inbox.</span>
            </div>
          ) : (
            <form onSubmit={handleEmail} className="flex gap-3">
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="cfo@company.com"
                className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-white/25 transition-colors" />
              <button type="submit" disabled={isSending}
                className="flex items-center gap-2 bg-white text-black font-bold text-sm px-5 py-2.5 rounded-lg transition-opacity disabled:opacity-50 hover:bg-white/90">
                {isSending ? <Activity className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                {isSending ? 'Sending...' : 'Send Report'}
              </button>
            </form>
          )}
          {emailError && <div className="text-red-400 text-xs mt-2">{emailError}</div>}
        </div>
      </div>

      {/* CTAs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <a href={`/roi-calculator?erp=${encodeURIComponent(answers.erp)}&invoices=${answers.volume.invoicesPerMonth * 12}`}
          className="flex items-center gap-4 px-5 py-4 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.02] hover:bg-white/[0.04] transition-all group">
          <TrendingUp className="w-5 h-5 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0" />
          <div>
            <div className="font-semibold text-white text-sm">Full ROI Calculator</div>
            <div className="text-white/30 text-xs">3-year financial model</div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="/demo"
          className="flex items-center gap-4 px-5 py-4 rounded-xl border border-emerald-500/20 hover:border-emerald-500/40 bg-emerald-500/[0.04] hover:bg-emerald-500/[0.08] transition-all group">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <div>
            <div className="font-semibold text-white text-sm">Book a Demo</div>
            <div className="text-white/30 text-xs">30-min with a solutions engineer</div>
          </div>
          <ArrowRight className="w-4 h-4 text-white/20 ml-auto group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function AssessmentWizardClient({ initialConfig }: { initialConfig: SanityAssessmentConfig | null }) {
  const [step, setStep] = useState(1)
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
      if (s) { const p = JSON.parse(s); if (p.answers) setAnswers(p.answers); if (p.step && p.step <= 6) setStep(p.step) }
    } catch {}
    analytics.assessment.start({ source: 'direct' })
  }, [])

  useEffect(() => {
    if (!result) localStorage.setItem(STORAGE_KEY, JSON.stringify({ answers, step, ts: Date.now() }))
  }, [answers, step, result])

  const canGo = useMemo(() => {
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
      setStep(s => d === 'f' ? s + 1 : Math.max(s - 1, 1))
      setTransitioning(false)
    }, 200)
  }, [transitioning])

  // Auto-advance for single-select steps
  useEffect(() => {
    if ([1, 4, 5, 6].includes(step) && canGo && step < 6 && !transitioning) {
      const t = setTimeout(() => go('f'), 350)
      return () => clearTimeout(t)
    }
  }, [answers.erp, answers.currentState, answers.techMaturity, answers.urgency])

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (result) return
      const t = e.target as Element
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return
      if (e.key === 'Enter' && canGo) { e.preventDefault(); step < 6 ? go('f') : handleSubmit() }
      if (e.key === 'ArrowLeft' && step > 1) { e.preventDefault(); go('b') }
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
      const { data, error: dbErr } = await insertAssessmentLead({
        answers: answers as unknown as Record<string,unknown>,
        recommendations: r.recommendations.map(x => x.capability),
        lead_score: r.leadScore,
        routed_to: r.leadScore > 70 ? 'sales' : 'nurture',
      })
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
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/[0.04] blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/[0.03] blur-[120px] rounded-full" />
      </div>

      {/* Top nav bar */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-white/[0.05] bg-[#050508]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-6">
          <a href="/" className="text-xs text-white/30 hover:text-white/60 transition-colors font-mono">← flowtaris.com</a>

          {!result && (
            <>
              {/* Step dots */}
              <div className="flex items-center gap-1.5 flex-1">
                {STEP_LABELS.map((label, i) => {
                  const n = i + 1
                  const done = n < step
                  const cur = n === step
                  return (
                    <React.Fragment key={label}>
                      <button onClick={() => done ? setStep(n) : null}
                        className={`flex items-center gap-1.5 transition-all ${done ? 'cursor-pointer' : 'cursor-default'}`}>
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all
                          ${done ? 'bg-cyan-500 text-black' : cur ? 'bg-white/10 text-white border border-white/30' : 'bg-white/[0.04] text-white/20'}`}>
                          {done ? '✓' : n}
                        </div>
                        <span className={`text-[9px] font-mono hidden sm:inline transition-colors ${cur ? 'text-white/50' : done ? 'text-cyan-500/60' : 'text-white/15'}`}>{label}</span>
                      </button>
                      {i < 5 && <div className={`w-6 h-px transition-colors ${done ? 'bg-cyan-500/40' : 'bg-white/[0.04]'}`} />}
                    </React.Fragment>
                  )
                })}
              </div>
              <div className="text-[10px] font-mono text-white/20">{step}/6</div>
            </>
          )}
          {result && <div className="flex-1 text-xs text-white/30 font-mono">Assessment Complete</div>}
        </div>
      </div>

      {/* Main */}
      <div style={{ paddingTop: result ? '56px' : '56px' }}>
        {result ? (
          <Results result={result} answers={answers} assessmentId={assessmentId} />
        ) : (
          <div className="max-w-7xl mx-auto px-6 pt-12 pb-28 flex gap-12 items-start">
            {/* Step content */}
            <div className="flex-1 min-w-0">
              <div style={{
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? `translateY(${dir === 'f' ? '10px' : '-10px'})` : 'translateY(0)',
                transition: 'opacity 200ms ease, transform 200ms ease',
              }}>
                {step === 1 && <StepERP value={answers.erp} onChange={v => setAnswers(p => ({ ...p, erp: v }))} />}
                {step === 2 && <StepPain value={answers.painPoints} onChange={v => setAnswers(p => ({ ...p, painPoints: v }))} />}
                {step === 3 && <StepVolume value={answers.volume} onChange={v => setAnswers(p => ({ ...p, volume: v }))} />}
                {step === 4 && <StepState value={answers.currentState} onChange={v => setAnswers(p => ({ ...p, currentState: v }))} />}
                {step === 5 && <StepMaturity value={answers.techMaturity} onChange={v => setAnswers(p => ({ ...p, techMaturity: v }))} />}
                {step === 6 && <StepUrgency value={answers.urgency} onChange={v => setAnswers(p => ({ ...p, urgency: v }))} />}
              </div>

              {error && <div className="mt-4 text-red-400 text-xs bg-red-500/10 border border-red-500/15 rounded-xl px-4 py-3">{error}</div>}

              {/* Nav */}
              <div className="fixed bottom-0 left-0 right-0 border-t border-white/[0.05] bg-[#050508]/95 backdrop-blur-xl z-30">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
                  <button onClick={() => go('b')} disabled={step === 1}
                    className="flex items-center gap-2 text-xs text-white/30 hover:text-white/60 transition-colors disabled:opacity-0">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <span className="text-[10px] font-mono text-white/15 hidden sm:inline">Enter to continue</span>
                  {step < 6 ? (
                    <button onClick={() => go('f')} disabled={!canGo}
                      className="flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-lg border transition-all disabled:opacity-25"
                      style={{ borderColor: canGo ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)', color: canGo ? 'white' : 'rgba(255,255,255,0.3)' }}>
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button onClick={handleSubmit} disabled={!canGo || isSubmitting}
                      className="flex items-center gap-2 text-sm font-bold px-6 py-2.5 rounded-lg transition-all disabled:opacity-25"
                      style={{ background: canGo ? 'white' : 'rgba(255,255,255,0.1)', color: canGo ? '#050508' : 'rgba(255,255,255,0.3)' }}>
                      {isSubmitting ? <><Activity className="w-4 h-4 animate-spin" /> Analyzing...</> : <>Get My Roadmap <ArrowRight className="w-4 h-4" /></>}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <Sidebar answers={answers} step={step} />
          </div>
        )}
      </div>
    </div>
  )
}
