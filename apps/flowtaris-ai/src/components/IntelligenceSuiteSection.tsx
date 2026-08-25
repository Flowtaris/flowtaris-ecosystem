'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Tool {
  id: string
  tab: string
  headline: string
  tagline: string
  description: string
  href: string
  ctaLabel: string
  color: 'violet' | 'amber' | 'red' | 'purple'
  metrics: { label: string; value: string }[]
}

const TOOLS: Tool[] = [
  {
    id: 'assessment',
    tab: 'AI Readiness Score',
    headline: '6 questions. Your personalized AI roadmap.',
    tagline: 'AI Readiness Assessment',
    description: 'Answer 6 questions about your ERP stack, pain points, and team — and receive a scored roadmap categorising your highest-ROI automation opportunities into Quick Wins, Strategic plays, and Innovation bets.',
    href: '/assessment',
    ctaLabel: 'Take the Assessment',
    color: 'violet',
    metrics: [
      { label: 'Completion time', value: '~4 min' },
      { label: 'Steps', value: '6 steps' },
      { label: 'Lead score tiers', value: '3 tiers' },
      { label: 'Cost', value: 'Free' },
    ],
  },
  {
    id: 'roi',
    tab: 'ROI Calculator',
    headline: 'Slide. Watch $4.5M appear in real-time.',
    tagline: 'Enterprise ROI Calculator',
    description: 'Enter your invoice volume, team size, and error rate. Our ROI engine outputs annual savings, payback period, FTE freed, and 3-year NPV across 15 global currencies and 5 ERP platforms.',
    href: '/roi-calculator',
    ctaLabel: 'Calculate My ROI',
    color: 'amber',
    metrics: [
      { label: 'Currencies', value: '15' },
      { label: 'ERP platforms', value: '5' },
      { label: 'Avg annual savings', value: '$4.5M' },
      { label: 'Avg payback', value: '3 months' },
    ],
  },
  {
    id: 'inaction',
    tab: 'Cost of Waiting',
    headline: 'Every day of delay has a price. See yours.',
    tagline: 'Cost of Inaction Engine',
    description: 'Built for CFOs and board presentations. Calculates monthly revenue leakage, annual compliance risk, the 3-year competitive gap from delaying AI, and the cost of a 6-month delay — in your currency.',
    href: '/cost-of-inaction',
    ctaLabel: 'See My Delay Cost',
    color: 'red',
    metrics: [
      { label: 'Monthly leakage', value: 'Live' },
      { label: 'Compliance risk', value: 'Quantified' },
      { label: '3-year gap model', value: 'Included' },
      { label: 'Board-ready output', value: 'Yes' },
    ],
  },
  {
    id: 'lab',
    tab: 'Innovation Lab',
    headline: 'Where R&D becomes your competitive edge.',
    tagline: 'Flowtaris Innovation Lab',
    description: 'Six active research tracks — from Conversational ERP (NL-to-SQL, 92% accuracy) to GenAI Document Understanding (99.5%+, 25+ formats) to Agentic Workflow Orchestration. Battle-tested before reaching your ERP.',
    href: '/innovation-lab',
    ctaLabel: 'Explore the Lab',
    color: 'purple',
    metrics: [
      { label: 'Research tracks', value: '6 active' },
      { label: 'Doc AI accuracy', value: '99.5%+' },
      { label: 'Languages', value: '15+' },
      { label: 'Agentic success', value: '78%' },
    ],
  },
]

// ─── Colour system ────────────────────────────────────────────────────────────
const C = {
  violet: {
    accent: '#8b5cf6', accentLight: '#a78bfa', accentDim: 'rgba(139,92,246,0.15)',
    badge: 'text-[#a78bfa] bg-[#8b5cf6]/10 border-[#8b5cf6]/30',
    tab: 'border-[#8b5cf6]/50 text-[#a78bfa] bg-[#8b5cf6]/10 ring-2 ring-[#8b5cf6]/20',
    bar: 'bg-[#8b5cf6]', glow: 'rgba(139,92,246,0.18)',
    cta: 'from-[#8b5cf6] to-[#6d28d9] text-white shadow-[0_0_40px_rgba(139,92,246,0.35)]',
    scan: '#a78bfa', hint: 'bg-[#1e1333] border-[#8b5cf6]/40 text-[#a78bfa]',
  },
  amber: {
    accent: '#D4A847', accentLight: '#f0c97a', accentDim: 'rgba(212,168,71,0.15)',
    badge: 'text-[#f0c97a] bg-[#D4A847]/10 border-[#D4A847]/30',
    tab: 'border-[#D4A847]/50 text-[#f0c97a] bg-[#D4A847]/10 ring-2 ring-[#D4A847]/20',
    bar: 'bg-[#D4A847]', glow: 'rgba(212,168,71,0.18)',
    cta: 'from-[#f5d98c] to-[#b3852b] text-[#0a0805] shadow-[0_0_40px_rgba(212,168,71,0.35)]',
    scan: '#D4A847', hint: 'bg-[#1a1505] border-[#D4A847]/40 text-[#f0c97a]',
  },
  red: {
    accent: '#f43f5e', accentLight: '#fb7185', accentDim: 'rgba(244,63,94,0.12)',
    badge: 'text-[#fb7185] bg-[#f43f5e]/10 border-[#f43f5e]/30',
    tab: 'border-[#f43f5e]/50 text-[#fb7185] bg-[#f43f5e]/10 ring-2 ring-[#f43f5e]/20',
    bar: 'bg-[#f43f5e]', glow: 'rgba(244,63,94,0.15)',
    cta: 'from-[#f43f5e] to-[#be123c] text-white shadow-[0_0_40px_rgba(244,63,94,0.3)]',
    scan: '#f43f5e', hint: 'bg-[#200a0d] border-[#f43f5e]/40 text-[#fb7185]',
  },
  purple: {
    accent: '#a855f7', accentLight: '#c084fc', accentDim: 'rgba(168,85,247,0.12)',
    badge: 'text-[#c084fc] bg-[#a855f7]/10 border-[#a855f7]/30',
    tab: 'border-[#a855f7]/50 text-[#c084fc] bg-[#a855f7]/10 ring-2 ring-[#a855f7]/20',
    bar: 'bg-[#a855f7]', glow: 'rgba(168,85,247,0.15)',
    cta: 'from-[#a855f7] to-[#7e22ce] text-white shadow-[0_0_40px_rgba(168,85,247,0.3)]',
    scan: '#a855f7', hint: 'bg-[#140d1f] border-[#a855f7]/40 text-[#c084fc]',
  },
}

// ─── Hint bubble ──────────────────────────────────────────────────────────────
function HintBubble({ text, visible, style, color }: {
  text: string; visible: boolean; style?: React.CSSProperties; color: keyof typeof C
}) {
  const c = C[color]
  return (
    <div
      className={`absolute z-30 flex items-center gap-2 px-3 py-2 rounded-xl border text-[11px] font-semibold pointer-events-none transition-all duration-500 backdrop-blur-sm ${c.hint}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1) translateY(0)' : 'scale(0.85) translateY(6px)',
        ...style,
      }}
    >
      <span className="text-base leading-none">💡</span>
      {text}
    </div>
  )
}

// ─── PREVIEW 1: Assessment Wizard ────────────────────────────────────────────
function AssessmentPreview({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0)
  const [selected, setSelected] = useState(-1)
  const [score, setScore] = useState(0)
  const [showHint1, setShowHint1] = useState(false)
  const [showHint2, setShowHint2] = useState(false)
  const options = ['NetSuite', 'SAP', 'Workday', 'Coupa']

  useEffect(() => {
    if (!active) {
      setPhase(0); setSelected(-1); setScore(0); setShowHint1(false); setShowHint2(false)
      return
    }
    const timers: NodeJS.Timeout[] = []
    // Phase 1 — card appears
    timers.push(setTimeout(() => setPhase(1), 500))
    // Phase 2 — hint 1 appears
    timers.push(setTimeout(() => setShowHint1(true), 1500))
    // Phase 3 — select SAP
    timers.push(setTimeout(() => { setSelected(1); setShowHint1(false) }, 3200))
    // Phase 4 — next step
    timers.push(setTimeout(() => setPhase(2), 4200))
    // Phase 5 — score starts counting
    timers.push(setTimeout(() => setPhase(3), 5400))
    // Phase 6 — score ticks up
    const scoreStart = setTimeout(() => {
      let s = 0
      const iv = setInterval(() => {
        s += 3; setScore(Math.min(s, 82))
        if (s >= 82) clearInterval(iv)
      }, 22)
      timers.push(iv)
    }, 5500)
    timers.push(scoreStart)
    // Phase 7 — hint 2 appears
    timers.push(setTimeout(() => setShowHint2(true), 7800))
    // Phase 8 — loop reset
    timers.push(setTimeout(() => {
      setPhase(0); setSelected(-1); setScore(0); setShowHint1(false); setShowHint2(false)
      setTimeout(() => setPhase(1), 400)
    }, 13000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [active])

  const progressPct = phase === 0 ? 0 : phase === 1 ? 16 : phase >= 2 ? 33 : 16

  return (
    <div className="relative h-full flex flex-col gap-3 select-none font-['Inter',sans-serif]">
      {/* Hint 1 */}
      <HintBubble text="Select your ERP platform to begin →" visible={showHint1} color="violet"
        style={{ top: '30%', left: '8%' }} />
      {/* Hint 2 */}
      <HintBubble text="Your roadmap is ready — view full report →" visible={showHint2} color="violet"
        style={{ bottom: '5%', right: '4%' }} />

      {/* Progress */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all duration-700"
            style={{ width: `${progressPct}%` }} />
        </div>
        <span className="text-[10px] text-white/30 font-mono whitespace-nowrap">
          {phase === 0 ? 'Ready' : phase === 1 ? 'Step 1 / 6' : 'Step 2 / 6'}
        </span>
      </div>

      {/* Question card */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0, transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)' }}>
        <div className="mb-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#8b5cf6]/60">Step 1 of 6 — ERP Platform</span>
        </div>
        <p className="text-white/85 text-sm font-semibold mb-3">Which ERP platform do you use?</p>
        <div className="grid grid-cols-2 gap-2">
          {options.map((o, i) => (
            <div key={o} className={`rounded-lg border px-3 py-2.5 text-xs font-medium transition-all duration-300 ${
              selected === i
                ? 'border-[#8b5cf6]/60 bg-[#8b5cf6]/15 text-[#a78bfa]'
                : 'border-white/[0.06] bg-white/[0.02] text-white/45'
            }`}>
              {o}
            </div>
          ))}
        </div>
      </div>

      {/* Pain points preview (step 2) */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-500"
        style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)' }}>
        <span className="text-[9px] font-bold uppercase tracking-widest text-[#8b5cf6]/60">Step 2 of 6 — Pain Points</span>
        <p className="text-white/70 text-[12px] font-semibold mt-1 mb-2.5">Select your top 3 pain points</p>
        <div className="space-y-1.5">
          {['Manual Invoice Processing', 'Cash Flow Visibility', 'Compliance & Audit Risk'].map((p, i) => (
            <div key={p} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[11px] transition-all duration-300 ${
              phase >= 2 ? 'border border-[#8b5cf6]/30 bg-[#8b5cf6]/8 text-[#a78bfa]' : 'text-white/30'
            }`}
              style={{ transitionDelay: `${i * 120}ms` }}>
              <span className="text-[#8b5cf6]">✓</span> {p}
            </div>
          ))}
        </div>
      </div>

      {/* Score reveal */}
      <div className="rounded-xl border border-[#8b5cf6]/25 bg-[#8b5cf6]/[0.05] p-4 transition-all duration-700"
        style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(14px)' }}>
        <p className="text-[9px] text-white/35 mb-2 uppercase tracking-widest">Your AI Readiness Score</p>
        <div className="flex items-end gap-2">
          <span className="text-5xl font-black text-[#a78bfa] tabular-nums leading-none">{score}</span>
          <span className="text-xl text-white/25 mb-1">/100</span>
          <span className="mb-1 ml-auto text-[9px] font-bold bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 text-[#a78bfa] rounded-full px-2.5 py-1">
            High Potential ✦
          </span>
        </div>
        <div className="mt-2.5 h-1 bg-white/[0.05] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#8b5cf6] to-[#a78bfa] rounded-full transition-all duration-1000"
            style={{ width: `${score}%` }} />
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[{ l: 'Quick Wins', v: '3', c: 'text-green-400' }, { l: 'Strategic', v: '5', c: 'text-[#a78bfa]' }, { l: 'Innovation', v: '2', c: 'text-orange-400' }].map(k => (
            <div key={k.l} className="text-center">
              <p className={`text-base font-black ${k.c}`}>{phase >= 3 ? k.v : '—'}</p>
              <p className="text-[8px] text-white/25 uppercase tracking-wider">{k.l}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PREVIEW 2: ROI Calculator ────────────────────────────────────────────────
function ROIPreview({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0)
  const [volume, setVolume] = useState(0)
  const [savings, setSavings] = useState(0)
  const [showHint1, setShowHint1] = useState(false)
  const [showHint2, setShowHint2] = useState(false)

  useEffect(() => {
    if (!active) { setPhase(0); setVolume(0); setSavings(0); setShowHint1(false); setShowHint2(false); return }
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setPhase(1), 500))
    timers.push(setTimeout(() => setShowHint1(true), 1800))
    const countStart = setTimeout(() => {
      setShowHint1(false)
      let s = 0
      const iv = setInterval(() => {
        s += 1; const pct = 1 - Math.pow(1 - s / 70, 3)
        setVolume(Math.round(50000 * pct))
        setSavings(Math.round(4500000 * pct))
        if (s >= 70) { clearInterval(iv); setPhase(2) }
      }, 22)
      timers.push(iv)
    }, 3000)
    timers.push(countStart)
    timers.push(setTimeout(() => setPhase(3), 5800))
    timers.push(setTimeout(() => setShowHint2(true), 7200))
    timers.push(setTimeout(() => {
      setPhase(0); setVolume(0); setSavings(0); setShowHint1(false); setShowHint2(false)
      setTimeout(() => setPhase(1), 400)
    }, 13500))
    return () => timers.forEach(t => clearTimeout(t))
  }, [active])

  const savPct = savings / 4500000
  const beforeW = 100
  const afterW = Math.max(8, 100 - savPct * 62)

  return (
    <div className="relative h-full flex flex-col gap-3 select-none font-['Inter',sans-serif]">
      <HintBubble text="Drag the slider to see your annual savings →" visible={showHint1} color="amber"
        style={{ top: '32%', left: '4%' }} />
      <HintBubble text="📊 Download your full ROI report as PDF" visible={showHint2} color="amber"
        style={{ bottom: '5%', right: '4%' }} />

      {/* Config row */}
      <div className="grid grid-cols-2 gap-2 transition-all duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}>
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
          <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">Platform</p>
          <p className="text-xs font-bold text-white">NetSuite</p>
        </div>
        <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5">
          <p className="text-[9px] text-white/30 uppercase tracking-widest mb-0.5">Use Case</p>
          <p className="text-xs font-bold text-white">AP Automation</p>
        </div>
      </div>

      {/* Slider */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}>
        <div className="flex justify-between mb-2">
          <p className="text-[10px] text-white/35">Annual Invoice Volume</p>
          <p className="text-xs font-mono font-black text-[#D4A847] tabular-nums">{volume.toLocaleString()}</p>
        </div>
        <div className="relative h-2 bg-white/[0.06] rounded-full">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#f5d98c] to-[#D4A847] rounded-full"
            style={{ width: `${(volume / 50000) * 100}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D4A847] border-2 border-white/80 shadow-lg shadow-amber-600/30"
            style={{ left: `calc(${(volume / 50000) * 100}% - 8px)` }} />
        </div>
        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] text-white/20">0</span>
          <span className="text-[9px] text-white/20">500K</span>
        </div>
      </div>

      {/* Before/After */}
      <div className="rounded-xl border border-[#D4A847]/20 bg-[#D4A847]/[0.04] p-4 transition-all duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}>
        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-3">Annual Cost — Before vs After AI</p>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-white/35">Manual Process Today</span>
              <span className="text-red-400 font-mono font-bold">$6.0M</span>
            </div>
            <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-red-500/50 rounded-full" style={{ width: `${beforeW}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-white/35">With Flowtaris AI</span>
              <span className="text-[#f0c97a] font-mono font-bold">${((6000000 - savings) / 1000000).toFixed(1)}M</span>
            </div>
            <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#f5d98c] to-[#D4A847] rounded-full transition-all duration-100"
                style={{ width: `${afterW}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-2 transition-all duration-700"
        style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)' }}>
        {[
          { l: 'Annual Savings', v: `$${(savings / 1000000).toFixed(1)}M`, c: 'text-[#f0c97a]' },
          { l: 'Payback Period', v: phase >= 3 ? '3.0 mo' : '…', c: 'text-green-400' },
          { l: 'FTE Freed', v: phase >= 3 ? '12.4' : '…', c: 'text-violet-400' },
        ].map(k => (
          <div key={k.l} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 text-center">
            <p className={`text-sm font-black tabular-nums ${k.c}`}>{k.v}</p>
            <p className="text-[8px] text-white/25 uppercase tracking-wider mt-0.5">{k.l}</p>
          </div>
        ))}
      </div>

      {/* Report CTA row */}
      <div className="flex items-center gap-3 transition-all duration-700"
        style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(8px)' }}>
        <div className="flex-1 h-px bg-white/[0.06]" />
        <span className="text-[10px] text-[#D4A847] font-semibold">Send full report to your CFO →</span>
        <div className="flex-1 h-px bg-white/[0.06]" />
      </div>
    </div>
  )
}

// ─── PREVIEW 3: Cost of Inaction ──────────────────────────────────────────────
function InactionPreview({ active }: { active: boolean }) {
  const [phase, setPhase] = useState(0)
  const [leakage, setLeakage] = useState(0)
  const [tick, setTick] = useState(0)
  const [compRisk, setCompRisk] = useState(0)
  const [gap, setGap] = useState(0)
  const [showHint1, setShowHint1] = useState(false)
  const [showHint2, setShowHint2] = useState(false)

  useEffect(() => {
    if (!active) {
      setPhase(0); setLeakage(0); setTick(0); setCompRisk(0); setGap(0)
      setShowHint1(false); setShowHint2(false); return
    }
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setPhase(1), 400))
    const rollup = setTimeout(() => {
      let s = 0
      const iv = setInterval(() => {
        s += 1; const p = 1 - Math.pow(1 - s / 60, 3)
        setLeakage(Math.round(142500 * p))
        setCompRisk(Math.round(280000 * p))
        setGap(Math.round(3700000 * p))
        if (s >= 60) { clearInterval(iv); setPhase(2) }
      }, 25)
      timers.push(iv)
    }, 600)
    timers.push(rollup)
    timers.push(setTimeout(() => setShowHint1(true), 2000))
    timers.push(setTimeout(() => setShowHint1(false), 4500))
    timers.push(setTimeout(() => setPhase(3), 5500))
    timers.push(setTimeout(() => setShowHint2(true), 7000))
    // Tick every second
    const tickIv = setInterval(() => setTick(t => t + 1), 1000)
    timers.push(tickIv)
    timers.push(setTimeout(() => {
      setPhase(0); setLeakage(0); setTick(0); setCompRisk(0); setGap(0)
      setShowHint1(false); setShowHint2(false)
      setTimeout(() => setPhase(1), 400)
    }, 14000))
    return () => timers.forEach(t => clearTimeout(t))
  }, [active])

  const liveLeak = leakage + tick * 4.75

  return (
    <div className="relative h-full flex flex-col gap-3 select-none font-['Inter',sans-serif]">
      <HintBubble text="⚡ This counter updates every second — live" visible={showHint1} color="red"
        style={{ top: '12%', right: '4%' }} />
      <HintBubble text="📋 Export board-ready PDF for your CFO" visible={showHint2} color="red"
        style={{ bottom: '5%', left: '4%' }} />

      {/* Live bleeding counter */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.06] p-5 relative overflow-hidden transition-all duration-500"
        style={{ opacity: phase >= 1 ? 1 : 0 }}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-bl-full pointer-events-none" />
        <div className="flex items-start justify-between mb-2">
          <p className="text-[9px] text-red-400/70 uppercase tracking-widest font-bold">Monthly Revenue Leakage</p>
          <span className="flex items-center gap-1.5 text-[9px] text-red-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
            Live tracking
          </span>
        </div>
        <p className="text-4xl font-black text-red-200 tabular-nums leading-none">
          ${Math.round(liveLeak).toLocaleString()}
        </p>
        <p className="text-[9px] text-red-400/40 mt-1.5">Estimated since you opened this page</p>
      </div>

      {/* 2-col metrics */}
      <div className="grid grid-cols-2 gap-2 transition-all duration-700"
        style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(10px)' }}>
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.05] p-3">
          <p className="text-[9px] text-orange-400/55 uppercase tracking-widest mb-1">Annual Compliance Risk</p>
          <p className="text-xl font-black text-orange-300 tabular-nums">${(compRisk / 1000).toFixed(0)}K</p>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-3">
          <p className="text-[9px] text-yellow-400/55 uppercase tracking-widest mb-1">3-Year Competitive Gap</p>
          <p className="text-xl font-black text-yellow-200 tabular-nums">${(gap / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Delay cost bars */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 transition-all duration-700"
        style={{ opacity: phase >= 2 ? 1 : 0 }}>
        <p className="text-[9px] text-white/30 uppercase tracking-widest mb-3">Impact of 6-Month Delay</p>
        <div className="space-y-2">
          {[
            { l: 'Revenue Leakage', pct: 72, c: 'bg-red-500' },
            { l: 'Compliance Exposure', pct: 55, c: 'bg-orange-500' },
            { l: 'Competitive Erosion', pct: 88, c: 'bg-yellow-500' },
          ].map((row, ri) => (
            <div key={row.l}>
              <div className="flex justify-between text-[9px] mb-1">
                <span className="text-white/35">{row.l}</span>
                <span className="text-white/40 font-mono">{phase >= 2 ? row.pct : 0}%</span>
              </div>
              <div className="h-1 bg-white/[0.05] rounded-full overflow-hidden">
                <div className={`h-full ${row.c} rounded-full transition-all duration-1200`}
                  style={{ width: phase >= 2 ? `${row.pct}%` : '0%', transitionDelay: `${ri * 150}ms` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export CTA */}
      <div className="flex items-center justify-between rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 transition-all duration-700"
        style={{ opacity: phase >= 3 ? 1 : 0 }}>
        <div>
          <p className="text-[10px] text-white/60 font-semibold">Board-ready PDF ready</p>
          <p className="text-[9px] text-white/25 mt-0.5">Includes 3-year model, benchmarks & delay cost</p>
        </div>
        <div className="text-[10px] text-red-300 font-bold whitespace-nowrap">Export →</div>
      </div>
    </div>
  )
}

// ─── PREVIEW 4: Innovation Lab ────────────────────────────────────────────────
const LAB_TRACKS = [
  { title: 'GenAI Document Understanding', status: 'production', metric: '99.5% accuracy', c: 'text-green-400 bg-green-500/10 border-green-500/30' },
  { title: 'Conversational ERP Interface', status: 'beta', metric: 'NL→SQL 92%', c: 'text-[#a78bfa] bg-[#8b5cf6]/10 border-[#8b5cf6]/30' },
  { title: 'Predictive Finance Models', status: 'pilot', metric: '30-day accuracy 92%', c: 'text-amber-300 bg-amber-500/10 border-amber-500/30' },
  { title: 'AI Governance & Compliance', status: 'pilot', metric: 'EU AI Act ready', c: 'text-amber-300 bg-amber-500/10 border-amber-500/30' },
  { title: 'Agentic Workflow Orchestration', status: 'research', metric: '78% success rate', c: 'text-purple-300 bg-purple-500/10 border-purple-500/30' },
  { title: 'Multimodal Finance Understanding', status: 'research', metric: 'Chart extraction 89%', c: 'text-purple-300 bg-purple-500/10 border-purple-500/30' },
]

function LabPreview({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(0)
  const [expandedIdx, setExpandedIdx] = useState(-1)
  const [showHint1, setShowHint1] = useState(false)
  const [showHint2, setShowHint2] = useState(false)

  useEffect(() => {
    if (!active) { setRevealed(0); setExpandedIdx(-1); setShowHint1(false); setShowHint2(false); return }
    const timers: NodeJS.Timeout[] = []
    timers.push(setTimeout(() => setShowHint1(true), 800))
    let i = 0
    const iv = setInterval(() => {
      i++; setRevealed(i)
      if (i >= LAB_TRACKS.length) clearInterval(iv)
    }, 230)
    timers.push(iv)
    timers.push(setTimeout(() => setShowHint1(false), 3500))
    timers.push(setTimeout(() => setExpandedIdx(1), 4200))
    timers.push(setTimeout(() => setShowHint2(true), 5500))
    timers.push(setTimeout(() => {
      setRevealed(0); setExpandedIdx(-1); setShowHint1(false); setShowHint2(false)
      let j = 0
      const iv2 = setInterval(() => { j++; setRevealed(j); if (j >= LAB_TRACKS.length) clearInterval(iv2) }, 230)
      timers.push(iv2)
    }, 13000))
    return () => { timers.forEach(t => clearTimeout(t)); clearInterval(iv) }
  }, [active])

  return (
    <div className="relative h-full flex flex-col gap-2 select-none font-['Inter',sans-serif]">
      <HintBubble text="← 6 active R&D tracks — tap to explore" visible={showHint1} color="purple"
        style={{ top: '2%', right: '4%' }} />
      <HintBubble text="🔬 Join our beta program → get early access" visible={showHint2} color="purple"
        style={{ bottom: '4%', left: '4%' }} />

      <div className="flex items-center justify-between mb-1">
        <p className="text-[9px] text-white/25 uppercase tracking-widest">Active Research Tracks</p>
        <span className="text-[9px] font-mono text-purple-400">{Math.min(revealed, LAB_TRACKS.length)} / 6 loaded</span>
      </div>
      {LAB_TRACKS.map((t, i) => (
        <div key={t.title}
          className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden transition-all duration-500 cursor-pointer"
          style={{
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? 'translateX(0)' : 'translateX(-10px)',
            transitionDelay: `${i * 40}ms`,
          }}>
          <div className="flex items-center gap-3 px-3 py-2.5">
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-semibold text-white/80 truncate">{t.title}</p>
              {expandedIdx === i && (
                <p className="text-[9px] text-white/35 mt-0.5 transition-all">{t.metric}</p>
              )}
            </div>
            <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border shrink-0 ${t.c}`}>
              {t.status}
            </span>
          </div>
          {expandedIdx === i && (
            <div className="px-3 pb-3 flex items-center gap-3 border-t border-white/[0.05] pt-2">
              <div className="flex-1 h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#a855f7] to-[#c084fc] rounded-full transition-all duration-700" style={{ width: '92%' }} />
              </div>
              <span className="text-[9px] text-purple-400 font-mono">92%</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Bottom stats ─────────────────────────────────────────────────────────────
const STATS = [
  { v: '$4.5M', l: 'Avg Annual Savings' },
  { v: '3 mo', l: 'Avg Payback Period' },
  { v: '99.5%', l: 'Document AI Accuracy' },
  { v: '6', l: 'R&D Research Tracks' },
  { v: '15+', l: 'Languages Supported' },
  { v: 'Free', l: 'All Tools — No Signup' },
]

// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function IntelligenceSuiteSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref: sectionRef, visible: sectionVisible } = useReveal(0.1)

  const tool = TOOLS[activeTab]
  const c = C[tool.color]

  const PREVIEWS = [
    <AssessmentPreview key={`assessment-${activeTab}`} active={activeTab === 0 && sectionVisible} />,
    <ROIPreview key={`roi-${activeTab}`} active={activeTab === 1 && sectionVisible} />,
    <InactionPreview key={`inaction-${activeTab}`} active={activeTab === 2 && sectionVisible} />,
    <LabPreview key={`lab-${activeTab}`} active={activeTab === 3 && sectionVisible} />,
  ]

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden py-24 lg:py-36"
      aria-labelledby="suite-heading"
      itemScope itemType="https://schema.org/SoftwareApplication"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.9) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.9) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[55%] rounded-full blur-[130px] transition-all duration-1000"
          style={{ background: c.glow, opacity: 0.45 }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Header ── */}
        <div className="text-center mb-14 lg:mb-18" style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500/70 animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-white/45 uppercase">The Flowtaris Intelligence Suite</span>
          </div>
          <h2 id="suite-heading" className="text-3xl sm:text-4xl lg:text-[2.9rem] font-black tracking-tight text-white leading-tight mb-5" itemProp="name">
            Stop guessing.{' '}
            <span className="bg-gradient-to-r from-[#a78bfa] via-[#D4A847] to-[#f43f5e] bg-clip-text text-transparent">
              Start calculating.
            </span>
          </h2>
          <p className="text-[15px] text-white/38 max-w-xl mx-auto leading-relaxed" itemProp="description">
            Four enterprise-grade tools — built on real benchmarks — that prove the financial impact of AI
            <em className="not-italic font-semibold text-white/55"> before</em> you sign a contract. No fake dashboards. Your numbers.
          </p>
        </div>

        {/* ── Tabs ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" style={{
          opacity: sectionVisible ? 1 : 0,
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s',
        }} role="tablist">
          {TOOLS.map((t, i) => {
            const tc = C[t.color]
            const isActive = activeTab === i
            return (
              <button key={t.id} role="tab" aria-selected={isActive}
                onClick={() => setActiveTab(i)}
                className={`px-5 py-2.5 rounded-full border text-[13px] font-semibold transition-all duration-300 ${
                  isActive ? `${tc.tab} scale-[1.04]` : 'border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white/60 hover:bg-white/[0.04]'
                }`}>
                {t.tab}
              </button>
            )
          })}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center" style={{
          opacity: sectionVisible ? 1 : 0,
          transition: 'opacity 0.6s ease',
        }}>

          {/* LEFT — text */}
          <div className="flex flex-col gap-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-widest w-fit ${c.badge}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${c.bar} animate-pulse`} />
              {tool.tagline}
            </span>
            <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
              {tool.headline}
            </h3>
            <p className="text-[15px] text-white/40 leading-[1.85]">{tool.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {tool.metrics.map(m => (
                <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                  <p className="text-lg font-black tabular-nums" style={{ color: c.accent }}>{m.value}</p>
                  <p className="text-[10px] text-white/28 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <Link href={tool.href}
                className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[14px] bg-gradient-to-r ${c.cta} hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 group`}>
                {tool.ctaLabel}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="text-[11px] text-white/22 font-medium">No signup required</span>
            </div>
          </div>

          {/* RIGHT — Laptop mockup */}
          <div className="relative flex flex-col items-center">

            {/* Glow behind laptop */}
            <div className="absolute -inset-6 rounded-[3rem] blur-3xl opacity-25 pointer-events-none transition-colors duration-700"
              style={{ background: c.glow }} aria-hidden="true" />

            {/* ── LAPTOP LID / SCREEN ── */}
            <div className="relative w-full max-w-[560px]">

              {/* Camera notch */}
              <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#1a1a24] border border-white/10 z-20" />

              {/* Screen bezel */}
              <div className="rounded-t-2xl rounded-b-md bg-gradient-to-b from-[#16151f] to-[#12111c] border border-white/[0.1] border-b-white/[0.06] overflow-hidden shadow-2xl"
                style={{ boxShadow: '0 40px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)' }}>

                {/* macOS-style title bar */}
                <div className="flex items-center gap-2.5 px-4 py-3 bg-[#0f0e18]/80 border-b border-white/[0.05]">
                  {/* Traffic lights */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80 border border-red-600/30" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/80 border border-yellow-600/30" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]/80 border border-green-600/30" />
                  </div>
                  {/* Address bar */}
                  <div className="flex-1 mx-3">
                    <div className="bg-white/[0.06] rounded-md px-3 py-1.5 flex items-center gap-2">
                      <svg className="w-3 h-3 text-white/20 shrink-0" fill="none" viewBox="0 0 16 16">
                        <path d="M11 10l3 3M4.5 8a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                      <span className="text-[10px] text-white/30 font-mono flex-1 text-center tracking-wide">
                        flowtaris.ai{tool.href}
                      </span>
                    </div>
                  </div>
                  {/* Live dot */}
                  <span className="flex items-center gap-1.5 text-[10px] font-bold shrink-0" style={{ color: c.accentLight }}>
                    <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: c.accent }} />
                    Live
                  </span>
                </div>

                {/* Screen content */}
                <div className="p-4 min-h-[420px] bg-[#0b0a15]" key={`${activeTab}-content`}>
                  {PREVIEWS[activeTab]}
                </div>

                {/* Bottom scan line effect */}
                <div className="h-px w-full opacity-20" style={{ background: `linear-gradient(90deg, transparent, ${c.accent}, transparent)` }} />
              </div>

              {/* ── LAPTOP BASE / KEYBOARD ── */}
              <div className="relative mx-auto" style={{ width: '108%', marginLeft: '-4%' }}>
                {/* Hinge */}
                <div className="h-[5px] bg-gradient-to-b from-[#1e1d2a] to-[#16151f] rounded-none border-x border-white/[0.06]" />
                {/* Keyboard deck */}
                <div className="h-[28px] bg-gradient-to-b from-[#1a192a] to-[#14131e] rounded-b-xl border border-t-0 border-white/[0.07] relative overflow-hidden"
                  style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                  {/* Keyboard grid dots */}
                  <div className="absolute inset-x-8 top-3 flex justify-center gap-1.5">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <div key={i} className="w-1.5 h-1 rounded-sm bg-white/[0.04]" />
                    ))}
                  </div>
                  {/* Trackpad */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-16 h-2 rounded-md bg-white/[0.04] border border-white/[0.04]" />
                </div>
              </div>

              {/* Desk reflection */}
              <div className="h-2 mx-6 rounded-b-full bg-gradient-to-b from-white/[0.03] to-transparent" />
            </div>
          </div>
        </div>

        {/* ── Bottom stats ── */}
        <div className="mt-20 pt-10 border-t border-white/[0.05]" style={{
          opacity: sectionVisible ? 1 : 0,
          transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
        }}>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-white tabular-nums">{s.v}</p>
                <p className="text-[10px] text-white/25 uppercase tracking-widest mt-0.5 max-w-[120px] mx-auto leading-snug">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
