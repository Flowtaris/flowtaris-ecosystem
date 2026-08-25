'use client'

import { useState, useEffect, useRef } from 'react'
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
  color: 'cyan' | 'amber' | 'red' | 'purple'
  metrics: { label: string; value: string }[]
}

// ─── Tool definitions ─────────────────────────────────────────────────────────
const TOOLS: Tool[] = [
  {
    id: 'assessment',
    tab: 'AI Readiness Score',
    headline: '6 questions. Your personalized AI roadmap.',
    tagline: 'AI Readiness Assessment',
    description:
      'Answer 6 questions about your ERP stack, pain points, and team — and receive a scored roadmap categorising your highest-ROI automation opportunities into Quick Wins, Strategic plays, and Innovation bets.',
    href: '/assessment',
    ctaLabel: 'Take the Assessment',
    color: 'cyan',
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
    headline: 'Slide. See $4.5M appear in real-time.',
    tagline: 'Enterprise ROI Calculator',
    description:
      'Enter your invoice volume, team size, and error rate. Our ROI engine — built on real enterprise benchmarks — outputs annual savings, payback period, FTE freed, and a 3-year NPV across 15 global currencies and 5 ERP platforms.',
    href: '/roi-calculator',
    ctaLabel: 'Calculate My ROI',
    color: 'amber',
    metrics: [
      { label: 'Currencies supported', value: '15' },
      { label: 'ERP platforms', value: '5' },
      { label: 'Avg annual savings', value: '$4.5M' },
      { label: 'Avg payback', value: '3 months' },
    ],
  },
  {
    id: 'inaction',
    tab: 'Cost of Waiting',
    headline: 'Every day of delay costs you money. See how much.',
    tagline: 'Cost of Inaction Engine',
    description:
      'Built for CFOs and board presentations. This engine calculates your monthly revenue leakage, annual compliance risk exposure, the 3-year competitive gap from delaying AI, and the cost of a 6-month implementation delay — in your currency.',
    href: '/cost-of-inaction',
    ctaLabel: 'See My Delay Cost',
    color: 'red',
    metrics: [
      { label: 'Monthly leakage calc', value: 'Live' },
      { label: 'Compliance risk', value: 'Quantified' },
      { label: '3-year gap model', value: 'Included' },
      { label: 'Board-ready output', value: 'Yes' },
    ],
  },
  {
    id: 'lab',
    tab: 'Innovation Lab',
    headline: 'Where our R&D becomes your competitive edge.',
    tagline: 'Flowtaris Innovation Lab',
    description:
      'Six active research tracks — from Conversational ERP (NL-to-SQL at 92% accuracy) to GenAI Document Understanding (99.5%+, 25+ formats) to Agentic Workflow Orchestration. This is where Flowtaris AI products are born, benchmarked, and battle-tested before reaching your ERP.',
    href: '/innovation-lab',
    ctaLabel: 'Explore the Lab',
    color: 'purple',
    metrics: [
      { label: 'Research tracks', value: '6 active' },
      { label: 'Doc AI accuracy', value: '99.5%+' },
      { label: 'Languages supported', value: '15+' },
      { label: 'Agentic success rate', value: '78%' },
    ],
  },
]

// ─── Colour maps ──────────────────────────────────────────────────────────────
const C = {
  cyan: {
    tab: 'border-[#00b8db]/50 text-[#00e0ff] bg-[#00b8db]/10',
    tabHover: 'hover:border-[#00b8db]/30 hover:text-[#00b8db]/70 hover:bg-[#00b8db]/5',
    accent: '#00b8db',
    glow: 'rgba(0,184,219,0.15)',
    badge: 'text-[#00e0ff] bg-[#00b8db]/10 border-[#00b8db]/30',
    bar: 'bg-[#00b8db]',
    cta: 'from-[#00b8db] to-[#0089a3] text-[#020817] shadow-[0_0_40px_rgba(0,184,219,0.3)]',
    ring: 'ring-[#00b8db]/30',
  },
  amber: {
    tab: 'border-[#D4A847]/50 text-[#f0c97a] bg-[#D4A847]/10',
    tabHover: 'hover:border-[#D4A847]/30 hover:text-[#D4A847]/70 hover:bg-[#D4A847]/5',
    accent: '#D4A847',
    glow: 'rgba(212,168,71,0.15)',
    badge: 'text-[#f0c97a] bg-[#D4A847]/10 border-[#D4A847]/30',
    bar: 'bg-[#D4A847]',
    cta: 'from-[#f5d98c] to-[#b3852b] text-[#0a0805] shadow-[0_0_40px_rgba(212,168,71,0.3)]',
    ring: 'ring-[#D4A847]/30',
  },
  red: {
    tab: 'border-red-500/50 text-red-300 bg-red-500/10',
    tabHover: 'hover:border-red-500/30 hover:text-red-400/70 hover:bg-red-500/5',
    accent: '#ef4444',
    glow: 'rgba(239,68,68,0.12)',
    badge: 'text-red-300 bg-red-500/10 border-red-500/30',
    bar: 'bg-red-500',
    cta: 'from-red-500 to-red-700 text-white shadow-[0_0_40px_rgba(239,68,68,0.25)]',
    ring: 'ring-red-500/30',
  },
  purple: {
    tab: 'border-purple-500/50 text-purple-300 bg-purple-500/10',
    tabHover: 'hover:border-purple-500/30 hover:text-purple-400/70 hover:bg-purple-500/5',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.12)',
    badge: 'text-purple-300 bg-purple-500/10 border-purple-500/30',
    bar: 'bg-purple-500',
    cta: 'from-purple-500 to-purple-700 text-white shadow-[0_0_40px_rgba(168,85,247,0.25)]',
    ring: 'ring-purple-500/30',
  },
}

// ─── Live mockup: Assessment Wizard Preview ───────────────────────────────────
function AssessmentPreview({ active }: { active: boolean }) {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [showScore, setShowScore] = useState(false)

  useEffect(() => {
    if (!active) { setStep(0); setSelected(null); setScore(0); setShowScore(false); return }
    const t1 = setTimeout(() => setStep(1), 400)
    const t2 = setTimeout(() => setSelected(1), 1800)
    const t3 = setTimeout(() => setStep(2), 2800)
    const t4 = setTimeout(() => setShowScore(true), 3600)
    let scoreInterval: NodeJS.Timeout
    const t5 = setTimeout(() => {
      scoreInterval = setInterval(() => setScore(s => { if (s >= 82) { clearInterval(scoreInterval); return 82 }; return s + 2 }), 18)
    }, 3700)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearInterval(scoreInterval) }
  }, [active])

  const options = ['NetSuite', 'SAP', 'Workday', 'Coupa']

  return (
    <div className="relative h-full w-full flex flex-col gap-3 p-1 font-['Inter',sans-serif]">
      {/* Progress bar */}
      <div className="flex items-center gap-3 mb-1">
        <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00b8db] rounded-full transition-all duration-700"
            style={{ width: step === 0 ? '0%' : step === 1 ? '16%' : '33%' }}
          />
        </div>
        <span className="text-[10px] text-white/30 font-mono">
          {step === 0 ? 'Start' : step === 1 ? 'Step 1 of 6' : 'Step 2 of 6'}
        </span>
      </div>

      {/* Step card */}
      <div
        className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 transition-all duration-500"
        style={{ opacity: step >= 1 ? 1 : 0, transform: step >= 1 ? 'translateY(0)' : 'translateY(12px)' }}
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#00b8db]/60">Step 1 of 6</span>
        </div>
        <p className="text-white/80 text-sm font-semibold mb-4">Which ERP platform do you use?</p>
        <div className="grid grid-cols-2 gap-2">
          {options.map((o, i) => (
            <div
              key={o}
              className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition-all duration-300 cursor-pointer ${
                selected === i
                  ? 'border-[#00b8db]/50 bg-[#00b8db]/10 text-[#00e0ff]'
                  : 'border-white/[0.07] bg-white/[0.02] text-white/50'
              }`}
            >
              {o}
            </div>
          ))}
        </div>
      </div>

      {/* Score reveal */}
      <div
        className="rounded-2xl border border-[#00b8db]/20 bg-[#00b8db]/[0.04] p-5 transition-all duration-700"
        style={{ opacity: showScore ? 1 : 0, transform: showScore ? 'translateY(0)' : 'translateY(16px)' }}
      >
        <p className="text-[11px] text-white/40 mb-2 uppercase tracking-widest">Your AI Readiness Score</p>
        <div className="flex items-end gap-3">
          <span className="text-5xl font-black text-[#00e0ff] tabular-nums leading-none">{score}</span>
          <span className="text-xl text-white/30 mb-1">/100</span>
          <span className="mb-1.5 ml-auto text-[10px] font-bold text-[#00b8db] bg-[#00b8db]/10 border border-[#00b8db]/25 rounded-full px-2.5 py-1">High Potential</span>
        </div>
        <div className="mt-3 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00b8db] to-[#0089a3] rounded-full transition-all duration-1000" style={{ width: `${score}%` }} />
        </div>
      </div>
    </div>
  )
}

// ─── Live mockup: ROI Calculator Preview ─────────────────────────────────────
function ROIPreview({ active }: { active: boolean }) {
  const [volume, setVolume] = useState(0)
  const [savings, setSavings] = useState(0)
  const [animDone, setAnimDone] = useState(false)

  useEffect(() => {
    if (!active) { setVolume(0); setSavings(0); setAnimDone(false); return }
    const TARGET_VOL = 50000
    const TARGET_SAV = 4500000
    const STEPS = 60
    let step = 0
    const interval = setInterval(() => {
      step++
      const pct = step / STEPS
      const ease = 1 - Math.pow(1 - pct, 3)
      setVolume(Math.round(TARGET_VOL * ease))
      setSavings(Math.round(TARGET_SAV * ease))
      if (step >= STEPS) { clearInterval(interval); setAnimDone(true) }
    }, 25)
    return () => clearInterval(interval)
  }, [active])

  const pct = (savings / 4500000) * 100
  const beforeWidth = 100
  const afterWidth = Math.max(5, (100 - pct * 0.7))

  return (
    <div className="h-full w-full flex flex-col gap-4 p-1 font-['Inter',sans-serif]">
      {/* Inputs row */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">ERP Platform</p>
          <p className="text-sm font-bold text-white">NetSuite</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
          <p className="text-[10px] text-white/35 uppercase tracking-widest mb-1">Use Case</p>
          <p className="text-sm font-bold text-white">AP Automation</p>
        </div>
      </div>

      {/* Slider */}
      <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[11px] text-white/40">Annual Invoice Volume</p>
          <p className="text-sm font-mono font-bold text-[#D4A847]">{volume.toLocaleString()}</p>
        </div>
        <div className="relative h-2 bg-white/[0.06] rounded-full">
          <div className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#f5d98c] to-[#D4A847] rounded-full transition-none" style={{ width: `${(volume / 50000) * 100}%` }} />
          <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#D4A847] border-2 border-white/80 shadow-lg transition-none" style={{ left: `calc(${(volume / 50000) * 100}% - 8px)` }} />
        </div>
      </div>

      {/* Before / After bar */}
      <div className="rounded-xl border border-[#D4A847]/20 bg-[#D4A847]/[0.04] p-4">
        <p className="text-[10px] text-white/35 uppercase tracking-widest mb-3">Annual Cost — Before vs After</p>
        <div className="space-y-2.5">
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-white/40">Manual Process</span>
              <span className="text-red-400 font-mono font-bold">$6.0M</span>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-red-500/60 rounded-full" style={{ width: `${beforeWidth}%` }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-[10px] mb-1">
              <span className="text-white/40">With Flowtaris AI</span>
              <span className="text-[#D4A847] font-mono font-bold">${((6000000 - savings) / 1000000).toFixed(1)}M</span>
            </div>
            <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#f5d98c] to-[#D4A847] rounded-full transition-none" style={{ width: `${afterWidth}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'Annual Savings', val: `$${(savings / 1000000).toFixed(1)}M`, c: 'text-[#D4A847]' },
          { label: 'Payback Period', val: animDone ? '3.0 mo' : '—', c: 'text-green-400' },
          { label: 'FTE Freed', val: animDone ? '12.4' : '—', c: 'text-purple-400' },
        ].map(k => (
          <div key={k.label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 text-center">
            <p className={`text-base font-black tabular-nums ${k.c}`}>{k.val}</p>
            <p className="text-[9px] text-white/30 uppercase tracking-wider mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Live mockup: Cost of Inaction Preview ────────────────────────────────────
function InactionPreview({ active }: { active: boolean }) {
  const [leakage, setLeakage] = useState(0)
  const [complianceRisk, setComplianceRisk] = useState(0)
  const [gap, setGap] = useState(0)
  const [tick, setTick] = useState(0)
  const targetLeakage = 142500
  const targetCompliance = 280000
  const targetGap = 3700000

  useEffect(() => {
    if (!active) { setLeakage(0); setComplianceRisk(0); setGap(0); setTick(0); return }
    let step = 0
    const STEPS = 80
    const rollup = setInterval(() => {
      step++
      const ease = 1 - Math.pow(1 - step / STEPS, 3)
      setLeakage(Math.round(targetLeakage * ease))
      setComplianceRisk(Math.round(targetCompliance * ease))
      setGap(Math.round(targetGap * ease))
      if (step >= STEPS) clearInterval(rollup)
    }, 20)

    // Tick every second (live bleed counter)
    const tickInterval = setInterval(() => setTick(t => t + 1), 1000)
    return () => { clearInterval(rollup); clearInterval(tickInterval) }
  }, [active])

  // ~$142,500/mo ≈ $4.75/sec
  const liveBleed = leakage + tick * 4.75

  return (
    <div className="h-full w-full flex flex-col gap-3 p-1 font-['Inter',sans-serif]">
      {/* Live bleeding counter */}
      <div className="rounded-2xl border border-red-500/30 bg-red-500/[0.05] p-5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-transparent pointer-events-none" />
        <div className="flex items-start justify-between mb-1">
          <p className="text-[10px] text-red-400/70 uppercase tracking-widest font-bold">Monthly Revenue Leakage</p>
          <span className="flex items-center gap-1.5 text-[10px] text-red-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
            Live
          </span>
        </div>
        <p className="text-4xl font-black text-red-300 tabular-nums leading-none mt-2">
          ${Math.round(liveBleed).toLocaleString()}
        </p>
        <p className="text-[10px] text-red-400/50 mt-1.5">Estimated cost since you loaded this page</p>
      </div>

      {/* Compliance + 3yr gap */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-orange-500/20 bg-orange-500/[0.04] p-4">
          <p className="text-[10px] text-orange-400/60 uppercase tracking-widest mb-1">Annual Compliance Risk</p>
          <p className="text-xl font-black text-orange-300 tabular-nums">${(complianceRisk / 1000).toFixed(0)}K</p>
        </div>
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/[0.04] p-4">
          <p className="text-[10px] text-yellow-400/60 uppercase tracking-widest mb-1">3-Year Competitive Gap</p>
          <p className="text-xl font-black text-yellow-300 tabular-nums">${(gap / 1000000).toFixed(1)}M</p>
        </div>
      </div>

      {/* Urgency bar */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <p className="text-[10px] text-white/35 uppercase tracking-widest mb-3">Cost of 6-Month Delay</p>
        <div className="space-y-2">
          {[
            { label: 'Revenue Leakage', pct: 72, color: 'bg-red-500' },
            { label: 'Compliance Exposure', pct: 55, color: 'bg-orange-500' },
            { label: 'Competitive Erosion', pct: 88, color: 'bg-yellow-500' },
          ].map(row => (
            <div key={row.label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-white/40">{row.label}</span>
                <span className="text-white/50 font-mono">{active ? row.pct : 0}%</span>
              </div>
              <div className="h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className={`h-full ${row.color} rounded-full transition-all duration-1000`}
                  style={{ width: active ? `${row.pct}%` : '0%', transitionDelay: '0.5s' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Live mockup: Innovation Lab Preview ─────────────────────────────────────
const LAB_TRACKS = [
  { title: 'GenAI Document Understanding', status: 'production', metric: '99.5% accuracy', color: 'text-green-400 border-green-500/30 bg-green-500/10' },
  { title: 'Conversational ERP Interface', status: 'beta', metric: 'NL→SQL 92%', color: 'text-[#00b8db] border-[#00b8db]/30 bg-[#00b8db]/10' },
  { title: 'Predictive Finance Models', status: 'pilot', metric: '30d accuracy 92%', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { title: 'AI Governance & Compliance', status: 'pilot', metric: 'EU AI Act ready', color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  { title: 'Agentic Workflow Orchestration', status: 'research', metric: '78% success rate', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
  { title: 'Multimodal Finance Understanding', status: 'research', metric: 'Chart extraction 89%', color: 'text-purple-400 border-purple-500/30 bg-purple-500/10' },
]

function LabPreview({ active }: { active: boolean }) {
  const [revealed, setRevealed] = useState(0)

  useEffect(() => {
    if (!active) { setRevealed(0); return }
    let i = 0
    const interval = setInterval(() => {
      i++
      setRevealed(i)
      if (i >= LAB_TRACKS.length) clearInterval(interval)
    }, 220)
    return () => clearInterval(interval)
  }, [active])

  return (
    <div className="h-full w-full flex flex-col gap-2.5 p-1 font-['Inter',sans-serif]">
      <div className="flex items-center justify-between mb-1">
        <p className="text-[10px] text-white/30 uppercase tracking-widest">Active Research Tracks</p>
        <span className="text-[10px] text-purple-400 font-bold">{revealed} / 6</span>
      </div>
      {LAB_TRACKS.map((track, i) => (
        <div
          key={track.title}
          className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3 transition-all duration-400"
          style={{
            opacity: i < revealed ? 1 : 0,
            transform: i < revealed ? 'translateX(0)' : 'translateX(-12px)',
            transitionDelay: `${i * 50}ms`,
          }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white/80 truncate">{track.title}</p>
            <p className="text-[10px] text-white/35 mt-0.5">{track.metric}</p>
          </div>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border ${track.color} shrink-0`}>
            {track.status}
          </span>
        </div>
      ))}
    </div>
  )
}

// ─── Aggregated stat strip ────────────────────────────────────────────────────
const BOTTOM_STATS = [
  { value: '$4.5M', label: 'Avg Annual Savings Calculated' },
  { value: '3 mo', label: 'Avg Payback Period Modeled' },
  { value: '6', label: 'Active R&D Research Tracks' },
  { value: '99.5%', label: 'Document AI Accuracy Benchmark' },
  { value: '15+', label: 'Languages Supported' },
  { value: 'Free', label: 'All Tools — No Signup Required' },
]

// ─── Intersection Observer hook ───────────────────────────────────────────────
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ─── Main section component ───────────────────────────────────────────────────
export default function IntelligenceSuiteSection() {
  const [activeTab, setActiveTab] = useState(0)
  const { ref: sectionRef, visible: sectionVisible } = useReveal(0.1)

  const tool = TOOLS[activeTab]
  const c = C[tool.color]

  const PREVIEWS = [
    <AssessmentPreview key="assessment" active={activeTab === 0 && sectionVisible} />,
    <ROIPreview key="roi" active={activeTab === 1 && sectionVisible} />,
    <InactionPreview key="inaction" active={activeTab === 2 && sectionVisible} />,
    <LabPreview key="lab" active={activeTab === 3 && sectionVisible} />,
  ]

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative w-full overflow-hidden py-24 lg:py-36"
      aria-labelledby="suite-heading"
      itemScope
      itemType="https://schema.org/SoftwareApplication"
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Ambient color glow that shifts per active tab */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full blur-[120px] transition-all duration-700"
          style={{ background: c.glow, opacity: 0.5 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <div
          className="text-center mb-16 lg:mb-20"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.04] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.18em] text-white/50 uppercase">The Flowtaris Intelligence Suite</span>
          </div>
          <h2
            id="suite-heading"
            className="text-3xl sm:text-4xl lg:text-[2.9rem] font-black tracking-tight text-white leading-tight mb-5"
            itemProp="name"
          >
            Stop guessing. Start calculating.
          </h2>
          <p className="text-[15px] text-white/40 max-w-2xl mx-auto leading-relaxed" itemProp="description">
            Four strategic tools — built on real enterprise benchmarks — that prove the financial impact of AI adoption
            <em className="not-italic font-semibold text-white/60"> before</em> you sign a contract.
            No fake dashboards. No stock photos. Just your numbers.
          </p>
        </div>

        {/* ── Tab bar ── */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-12"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.15s',
          }}
          role="tablist"
        >
          {TOOLS.map((t, i) => {
            const tc = C[t.color]
            const isActive = activeTab === i
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={isActive}
                aria-controls={`panel-${t.id}`}
                onClick={() => setActiveTab(i)}
                className={`
                  px-5 py-2.5 rounded-full border text-[13px] font-semibold transition-all duration-300
                  ${isActive ? `${tc.tab} ring-2 ring-offset-2 ring-offset-transparent ${tc.ring} scale-[1.04]` : `border-white/[0.08] text-white/45 hover:border-white/20 hover:text-white/65 hover:bg-white/[0.04]`}
                `}
              >
                {t.tab}
              </button>
            )
          })}
        </div>

        {/* ── Main panel ── */}
        <div
          id={`panel-${tool.id}`}
          role="tabpanel"
          className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        >
          {/* LEFT — text content */}
          <div className="flex flex-col gap-6">
            {/* Tag */}
            <div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-widest ${c.badge}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${c.bar} animate-pulse`} />
                {tool.tagline}
              </span>
            </div>

            <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight" style={{ transition: 'all 0.4s ease' }}>
              {tool.headline}
            </h3>

            <p className="text-[15px] text-white/45 leading-[1.85]">
              {tool.description}
            </p>

            {/* Metrics grid */}
            <div className="grid grid-cols-2 gap-3">
              {tool.metrics.map(m => (
                <div key={m.label} className="rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-3">
                  <p className={`text-lg font-black tabular-nums`} style={{ color: c.accent }}>{m.value}</p>
                  <p className="text-[10px] text-white/30 uppercase tracking-wider mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-4 mt-2">
              <Link
                href={tool.href}
                className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[14px] bg-gradient-to-r ${c.cta} hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300 group`}
              >
                {tool.ctaLabel}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 16 16">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <span className="text-[11px] text-white/25 font-medium">No signup required</span>
            </div>
          </div>

          {/* RIGHT — live coded preview */}
          <div className="relative">
            {/* Outer glow frame */}
            <div
              className="absolute -inset-3 rounded-[2rem] blur-2xl opacity-30 transition-colors duration-700"
              style={{ background: c.glow }}
              aria-hidden="true"
            />
            {/* Browser chrome */}
            <div className="relative rounded-[1.5rem] border border-white/[0.08] bg-[#0d0b14]/80 backdrop-blur-xl overflow-hidden shadow-2xl">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/[0.05] bg-white/[0.02]">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="bg-white/[0.05] rounded-md px-3 py-1 text-[11px] text-white/30 font-mono text-center">
                    flowtaris.ai{tool.href}
                  </div>
                </div>
                <span className={`text-[10px] font-bold ${c.badge.split(' ')[0]} flex items-center gap-1`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${c.bar} animate-pulse`} />
                  Live
                </span>
              </div>

              {/* Preview body */}
              <div className="p-5 min-h-[380px]" key={activeTab}>
                {PREVIEWS[activeTab]}
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom stat strip ── */}
        <div
          className="mt-20 pt-10 border-t border-white/[0.05]"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1) 0.4s',
          }}
        >
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-6">
            {BOTTOM_STATS.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-2xl font-black text-white tabular-nums">{s.value}</p>
                <p className="text-[10px] text-white/28 uppercase tracking-widest mt-0.5 max-w-[130px] mx-auto leading-snug">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
