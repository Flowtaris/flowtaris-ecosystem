'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ── Default content (fallback when DB has no data yet) ───────────────────────

const DEFAULT_COM_PILLARS = [
  {
    number: '01',
    title: 'Global ERP Implementation',
    subtitle: 'The world trusts our hands-on expertise',
    body: 'Flowtaris.com delivers decade-deep ERP implementations across NetSuite, SAP, Workday, and Coupa — in 40+ countries. We are the partner enterprises call when execution cannot fail.',
    tag: 'Enterprise Operations',
  },
  {
    number: '02',
    title: 'Governance by Design',
    subtitle: 'SOC 2 · GDPR · ISO 27001 baked in',
    body: 'Compliance is structural at Flowtaris — not bolted on. Every process, integration, and workflow ships with enterprise-grade controls, audit trails, and regulatory documentation.',
    tag: 'Risk & Compliance',
  },
  {
    number: '03',
    title: 'Long-Term Strategic Partnership',
    subtitle: 'Compounding value, not one-time projects',
    body: 'We build lasting finance operations foundations — continuous optimization roadmaps that compound ROI year over year, turning your finance function into a strategic business asset.',
    tag: 'Advisory & Growth',
  },
]

const DEFAULT_AI_PILLARS = [
  {
    number: '01',
    title: 'Autonomous Finance Agents',
    subtitle: 'AI that acts — not just advises',
    body: 'AI agents embedded in your existing ERP handle AP, AR, invoice matching, and close cycles end-to-end. The same systems your team uses — now running themselves, backed by Flowtaris governance.',
    tag: 'Agentic Automation',
  },
  {
    number: '02',
    title: 'Predictive Intelligence',
    subtitle: 'From lagging reports to leading signals',
    body: 'Real-time cash flow forecasting, vendor risk scoring, and spend anomaly detection — surfacing what matters before it becomes a problem. Built on the same trusted data layer as flowtaris.com.',
    tag: 'Finance Intelligence',
  },
  {
    number: '03',
    title: 'GenAI Document Processing',
    subtitle: '99.8% accuracy · zero templates',
    body: 'Classify, extract, and route any financial document at enterprise scale. The same rigorous accuracy our implementation teams demand — now automated with large-language-model intelligence.',
    tag: 'Document AI',
  },
]
// ── Default section-level config ───────────────────────────────────────────
const DEFAULT_SECTION = {
  eyebrow: 'One Brand · Two Disciplines',
  heading1: 'Enterprise Mastery Meets',
  heading2: 'AI Intelligence',
  intro: 'Flowtaris.ai was built to amplify Flowtaris.com — not compete with it. Two disciplines. One brand. The trust of decades of enterprise work, now accelerated by AI that actually works inside your ERP.',
  unifyingText: 'Flowtaris AI does not replace what Flowtaris.com has built — it deepens it. Our AI products inherit the same governance controls, implementation expertise, and enterprise trust model that our clients across 40+ countries depend on. This is AI with accountability, not a proof-of-concept.',
  stats: [
    { label: '40+', sub: 'Countries' },
    { label: '200+', sub: 'Enterprises' },
    { label: '99.8%', sub: 'AI Accuracy' },
    { label: '10+', sub: 'Yrs Experience' },
  ],
  left: {
    domain: 'flowtaris.com',
    domainHref: 'https://flowtaris.com',
    headline1: 'The Enterprise',
    headline2: 'Operations Backbone',
    intro: 'The foundation every enterprise finance team can stake their ERP on. Decade-deep implementations, partner-grade governance, and a 40+ country delivery network built for when execution cannot fail.',
    imageSrc: '/images/com-vision.png',
    imageAlt: 'Flowtaris enterprise ERP operations — corporate finance operations center with SAP, NetSuite, Workday dashboards',
    ctaLabel: 'Explore Flowtaris.com',
    ctaHref: 'https://flowtaris.com',
    pillars: DEFAULT_COM_PILLARS,
  },
  right: {
    domain: 'flowtaris.ai',
    domainHref: '/assessment',
    headline1: 'The AI Intelligence',
    headline2: 'Layer Unlocked',
    intro: 'Built on the same enterprise trust foundation as Flowtaris.com — Flowtaris AI adds autonomous agents, predictive intelligence, and GenAI document processing to the ERP systems your team already runs.',
    imageSrc: '/images/ai-vision.png',
    imageAlt: 'Flowtaris AI intelligence layer — same enterprise finance environment now enhanced with golden AI agent data streams and autonomous processing',
    ctaLabel: 'Assess Your AI Readiness',
    ctaHref: '/assessment',
    pillars: DEFAULT_AI_PILLARS,
  },
}

// Type alias
type SectionData = typeof DEFAULT_SECTION

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Pillar card ───────────────────────────────────────────────────────────────
function PillarCard({
  number, title, subtitle, body, tag, gold, delay, panelVisible,
}: {
  number: string; title: string; subtitle: string; body: string; tag: string
  gold?: boolean; delay: number; panelVisible: boolean
}) {
  return (
    <div
      style={{
        opacity: panelVisible ? 1 : 0,
        transform: panelVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
      }}
      className={`
        group relative flex gap-4 p-5 rounded-2xl border transition-colors duration-400 cursor-default
        ${gold
          ? 'bg-[#D4A847]/[0.05] border-[#D4A847]/20 hover:border-[#D4A847]/50 hover:bg-[#D4A847]/[0.09]'
          : 'bg-white/[0.03] border-white/[0.07] hover:border-white/18 hover:bg-white/[0.06]'
        }
      `}
    >
      {/* Animated left-edge accent */}
      <div className={`
        absolute left-0 top-5 bottom-5 w-[2px] rounded-full transition-all duration-400 scale-y-0 group-hover:scale-y-100 origin-center
        ${gold ? 'bg-gradient-to-b from-[#f5d98c] via-[#D4A847] to-transparent' : 'bg-gradient-to-b from-white/50 via-white/20 to-transparent'}
      `} />

      <div className={`flex-shrink-0 text-[11px] font-mono font-bold tracking-widest mt-1 ${gold ? 'text-[#D4A847]/40' : 'text-white/18'}`}>
        {number}
      </div>

      <div className="flex-1">
        <span className={`
          inline-block text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full mb-2
          ${gold ? 'bg-[#D4A847]/10 text-[#D4A847]/65 border border-[#D4A847]/15' : 'bg-white/[0.05] text-white/35 border border-white/[0.07]'}
        `}>{tag}</span>
        <h3 className={`text-[14px] font-bold mb-0.5 leading-snug ${gold ? 'text-[#f0c97a]' : 'text-white/90'}`}>{title}</h3>
        <p className={`text-[11px] font-semibold mb-2 ${gold ? 'text-[#D4A847]/45' : 'text-white/28'}`}>{subtitle}</p>
        <p className="text-[13px] leading-relaxed text-white/38">{body}</p>
      </div>
    </div>
  )
}

// ── Single vision panel ───────────────────────────────────────────────────────
function VisionPanel({
  side, domain, domainHref, headline1, headline2, intro,
  pillars, gold, ctaLabel, ctaHref, imageSrc, imageAlt,
  panelVisible,
}: {
  side: 'left' | 'right'
  domain: string; domainHref: string
  headline1: string; headline2: string; intro: string
  pillars: typeof COM_PILLARS; gold?: boolean
  ctaLabel: string; ctaHref: string
  imageSrc: string; imageAlt: string
  panelVisible: boolean
}) {
  const slideDir = side === 'left' ? '-40px' : '40px'

  return (
    <div
      style={{
        opacity: panelVisible ? 1 : 0,
        transform: panelVisible ? 'translateX(0)' : `translateX(${slideDir})`,
        transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
      }}
      className="flex flex-col h-full"
    >
      {/* ── Visual header image ── */}
      <div className="relative h-[240px] rounded-2xl overflow-hidden mb-7 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        {/* Gradient overlay — heavier at bottom for text readability */}
        <div className={`absolute inset-0 ${gold
          ? 'bg-gradient-to-t from-[#08060a] via-[#08060a]/65 to-transparent'
          : 'bg-gradient-to-t from-[#05050a] via-[#05050a]/65 to-transparent'
        }`} />

        {/* Corner accent lines */}
        <div className={`absolute top-4 right-4 w-10 h-10 border-t-[1.5px] border-r-[1.5px] rounded-tr-lg opacity-50 transition-opacity duration-500 group-hover:opacity-100 ${gold ? 'border-[#D4A847]' : 'border-white/30'}`} />
        <div className={`absolute bottom-4 left-4 w-10 h-10 border-b-[1.5px] border-l-[1.5px] rounded-bl-lg opacity-30 transition-opacity duration-500 group-hover:opacity-70 ${gold ? 'border-[#D4A847]' : 'border-white/20'}`} />

        {/* Domain badge */}
        <div className="absolute bottom-4 left-5">
          <a
            href={domainHref}
            target={domainHref.startsWith('http') ? '_blank' : undefined}
            rel={domainHref.startsWith('http') ? 'noopener noreferrer' : undefined}
            className={`
              inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase
              backdrop-blur-sm border transition-all duration-300
              ${gold
                ? 'bg-[#D4A847]/20 border-[#D4A847]/50 text-[#f0c97a] hover:bg-[#D4A847]/30'
                : 'bg-white/[0.1] border-white/20 text-white/80 hover:bg-white/[0.17]'
              }
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${gold ? 'bg-[#D4A847] animate-pulse' : 'bg-white/60'}`} />
            {domain}
          </a>
        </div>
      </div>

      {/* ── Headline ── */}
      <h2 className="text-[2.1rem] lg:text-[2.6rem] xl:text-[3rem] font-black leading-[1.04] tracking-tight mb-4">
        <span className={gold
          ? 'bg-gradient-to-br from-[#f5e0a0] via-[#D4A847] to-[#a06b1a] bg-clip-text text-transparent'
          : 'text-white'
        }>{headline1}</span>
        <br />
        <span className={gold ? 'text-white' : 'text-white/50'}>{headline2}</span>
      </h2>

      <p className="text-[14px] lg:text-[15px] text-white/48 leading-[1.85] mb-7 max-w-[420px]">{intro}</p>

      {/* ── Pillar cards ── */}
      <div className="space-y-2.5 flex-1">
        {pillars.map((p, i) => (
          <PillarCard
            key={p.title}
            {...p}
            gold={gold}
            delay={i * 110}
            panelVisible={panelVisible}
          />
        ))}
      </div>

      {/* ── CTA ── */}
      <div className="mt-7">
        {gold ? (
          <Link
            href={ctaHref}
            className="
              inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-[14px]
              bg-gradient-to-r from-[#f5d98c] via-[#D4A847] to-[#b3852b] text-[#0a0805]
              shadow-[0_0_30px_rgba(212,168,71,0.3)] hover:shadow-[0_0_48px_rgba(212,168,71,0.5)]
              hover:brightness-110 transition-all duration-300 group
            "
          >
            {ctaLabel}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        ) : (
          <a
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-[14px]
              border border-white/15 bg-white/[0.04] text-white/65
              hover:bg-white/[0.09] hover:border-white/28 hover:text-white
              transition-all duration-300 group
            "
          >
            {ctaLabel}
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 16 16">
              <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        )}
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function DualVisionSection() {
  const [data, setData] = useState<SectionData>(DEFAULT_SECTION)

  // Fetch live data from Admin Panel / DB
  useEffect(() => {
    fetch('/api/site-config')
      .then(r => r.json())
      .then(cfg => {
        if (cfg?.dualVision) {
          const dv = cfg.dualVision
          setData({
            eyebrow: dv.eyebrow ?? DEFAULT_SECTION.eyebrow,
            heading1: dv.heading1 ?? DEFAULT_SECTION.heading1,
            heading2: dv.heading2 ?? DEFAULT_SECTION.heading2,
            intro: dv.intro ?? DEFAULT_SECTION.intro,
            unifyingText: dv.unifyingText ?? DEFAULT_SECTION.unifyingText,
            stats: dv.stats ?? DEFAULT_SECTION.stats,
            left: {
              ...DEFAULT_SECTION.left,
              ...(dv.left ?? {}),
              pillars: dv.left?.pillars ?? DEFAULT_SECTION.left.pillars,
            },
            right: {
              ...DEFAULT_SECTION.right,
              ...(dv.right ?? {}),
              pillars: dv.right?.pillars ?? DEFAULT_SECTION.right.pillars,
            },
          })
        }
      })
      .catch(() => {/* use defaults */})
  }, [])
  // Section trigger — fires when section enters viewport
  const { ref: sectionRef, visible: sectionVisible } = useReveal(0.12)

  // Left panel becomes visible immediately when section triggers
  // Right panel waits an extra 1 second
  const [rightVisible, setRightVisible] = useState(false)
  useEffect(() => {
    if (!sectionVisible) return
    const t = setTimeout(() => setRightVisible(true), 950)
    return () => clearTimeout(t)
  }, [sectionVisible])

  // Eyebrow trigger
  const { ref: eyebrowRef, visible: eyebrowVisible } = useReveal(0.1)

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-[#05050a]"
      aria-labelledby="dual-vision-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* ── Ambient atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.7) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)
            `,
            backgroundSize: '72px 72px',
          }}
        />

        {/* Left glow — cool, neutral (traditional .com) */}
        <div
          className="absolute -left-40 top-1/2 -translate-y-1/2 w-[600px] h-[800px] blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, rgba(160,190,240,0.06) 0%, transparent 70%)' }}
        />

        {/* Right glow — warm gold (.ai) */}
        <div
          className="absolute -right-40 top-1/2 -translate-y-1/2 w-[600px] h-[800px] blur-[130px]"
          style={{ background: 'radial-gradient(ellipse, rgba(212,168,71,0.09) 0%, transparent 70%)' }}
        />

        {/* Center divider — visible only on large screens */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-px w-px hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(212,168,71,0.1) 20%, rgba(212,168,71,0.28) 50%, rgba(212,168,71,0.1) 80%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36">

        {/* Eyebrow */}
        <div
          ref={eyebrowRef}
          style={{
            opacity: eyebrowVisible ? 1 : 0,
            transform: eyebrowVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1)',
          }}
          className="text-center mb-20 lg:mb-24"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#D4A847]/22 bg-[#D4A847]/[0.05] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A847] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#f0c97a]/80 uppercase">
              {data.eyebrow}
            </span>
          </div>
          <h2
            id="dual-vision-heading"
            className="text-3xl sm:text-4xl lg:text-[2.8rem] font-black tracking-tight text-white leading-tight mb-4"
            itemProp="name"
          >
            {data.heading1}{' '}
            <span className="bg-gradient-to-r from-[#f5d98c] to-[#b3852b] bg-clip-text text-transparent">
              {data.heading2}
            </span>
          </h2>
          <p className="text-[15px] text-white/38 max-w-xl mx-auto leading-relaxed" itemProp="description">
            {data.intro}
          </p>
        </div>

        {/* Two panels — LEFT appears first, RIGHT after 1 second */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-0 lg:divide-x lg:divide-white/[0.04]">

          {/* LEFT — flowtaris.com */}
          <div className="lg:pr-12 xl:pr-16">
            <VisionPanel
              side="left"
              domain={data.left.domain}
              domainHref={data.left.domainHref}
              headline1={data.left.headline1}
              headline2={data.left.headline2}
              intro={data.left.intro}
              pillars={data.left.pillars}
              ctaLabel={data.left.ctaLabel}
              ctaHref={data.left.ctaHref}
              imageSrc={data.left.imageSrc}
              imageAlt={data.left.imageAlt}
              panelVisible={sectionVisible}
            />
          </div>

          {/* RIGHT — flowtaris.ai — appears 1 second later */}
          <div className="lg:pl-12 xl:pl-16 border-t border-white/[0.05] pt-10 lg:border-t-0 lg:pt-0">
            <VisionPanel
              side="right"
              domain={data.right.domain}
              domainHref={data.right.domainHref}
              headline1={data.right.headline1}
              headline2={data.right.headline2}
              intro={data.right.intro}
              pillars={data.right.pillars}
              gold
              ctaLabel={data.right.ctaLabel}
              ctaHref={data.right.ctaHref}
              imageSrc={data.right.imageSrc}
              imageAlt={data.right.imageAlt}
              panelVisible={rightVisible}
            />
          </div>
        </div>

        {/* ── Unifying bottom strip ── */}
        <div className="mt-20 pt-10 border-t border-white/[0.05]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <p
              className="text-[13px] text-white/30 max-w-lg leading-[1.9] text-center lg:text-left"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s ease 0.3s',
              }}
            >
              {data.unifyingText}
            </p>

            <div
              className="flex items-center gap-3 shrink-0"
              style={{
                opacity: rightVisible ? 1 : 0,
                transform: rightVisible ? 'translateY(0)' : 'translateY(16px)',
                transition: 'all 0.7s ease 0.5s',
              }}
            >
              {data.stats.map((stat, i) => (
                <div key={i} className="text-center px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-[#D4A847]/25 transition-colors duration-300">
                  <div className="text-[18px] font-black text-white tracking-tight">{stat.label}</div>
                  <div className="text-[9px] text-white/28 uppercase tracking-widest font-bold mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
