'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ── SEO / AEO / GEO Pillars ──────────────────────────────────────────────────

const COM_PILLARS = [
  {
    number: '01',
    title: 'Global Operations Platform',
    subtitle: 'Built for scale across 40+ countries',
    body: 'A unified finance operations backbone trusted by Fortune 500 enterprises. Best-in-class NetSuite, SAP, Workday, and Coupa implementations with governance-grade rigor.',
    tag: 'ERP Infrastructure',
  },
  {
    number: '02',
    title: 'Governance & Compliance',
    subtitle: 'SOC 2 · GDPR · ISO 27001',
    body: 'Enterprise controls, audit trails, and regulatory frameworks are not add-ons here — they are structural. Your finance operations are compliant by design, not by accident.',
    tag: 'Risk & Controls',
  },
  {
    number: '03',
    title: 'Long-Term Enterprise Value',
    subtitle: 'Compounding ROI over years',
    body: 'Strategic ERP roadmaps that compound operational value over years — turning your finance function into a competitive differentiator, not just a cost center.',
    tag: 'Strategic Advisory',
  },
]

const AI_PILLARS = [
  {
    number: '01',
    title: 'Autonomous Finance Agents',
    subtitle: 'Agents that read, decide, and act',
    body: 'AI agents live inside your ERP processes — handling AP automation, invoice matching, anomaly detection, and close cycles without human touch. Zero-touch finance is now operational.',
    tag: 'Agentic AI',
  },
  {
    number: '02',
    title: 'Predictive Intelligence Layer',
    subtitle: 'From lagging metrics to leading signals',
    body: 'Real-time cash flow forecasting, vendor risk scoring, and spend anomaly detection — surfacing opportunities and threats the moment the data changes, not the moment a report is run.',
    tag: 'Finance Intelligence',
  },
  {
    number: '03',
    title: 'GenAI Document Intelligence',
    subtitle: '99.8% extraction accuracy',
    body: 'Classify, validate, and route any financial document — invoices, contracts, POs, remittance — with large-language-model accuracy and ERP-native integration. No templates. No manual indexing.',
    tag: 'Document AI',
  },
]

// ── Intersection Observer hook for scroll-triggered animations ─────────────

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

// ── Pillar Row ─────────────────────────────────────────────────────────────

function PillarRow({
  number, title, subtitle, body, tag, gold, delay,
}: {
  number: string; title: string; subtitle: string; body: string; tag: string; gold?: boolean; delay: number
}) {
  const { ref, visible } = useFadeIn(0.1)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
      className={`
        group relative flex gap-5 p-6 rounded-2xl border transition-all duration-500 cursor-default
        ${gold
          ? 'bg-gradient-to-br from-[#D4A847]/[0.06] to-transparent border-[#D4A847]/20 hover:border-[#D4A847]/45 hover:from-[#D4A847]/[0.1]'
          : 'bg-gradient-to-br from-white/[0.04] to-transparent border-white/[0.08] hover:border-white/20 hover:from-white/[0.07]'
        }
      `}
    >
      {/* Animated glow line on left edge */}
      <div className={`
        absolute left-0 top-4 bottom-4 w-[2px] rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100
        ${gold ? 'bg-gradient-to-b from-[#f5d98c] via-[#D4A847] to-transparent' : 'bg-gradient-to-b from-white/50 via-white/20 to-transparent'}
      `} />

      {/* Number */}
      <div className={`flex-shrink-0 font-mono text-[11px] font-bold tracking-widest mt-0.5 ${gold ? 'text-[#D4A847]/50' : 'text-white/20'}`}>
        {number}
      </div>

      <div className="flex-1 min-w-0">
        {/* Tag pill */}
        <div className="mb-2">
          <span className={`inline-block text-[9px] font-bold tracking-[0.18em] uppercase px-2.5 py-1 rounded-full
            ${gold ? 'bg-[#D4A847]/10 text-[#D4A847]/70 border border-[#D4A847]/20' : 'bg-white/[0.06] text-white/40 border border-white/[0.08]'}
          `}>{tag}</span>
        </div>

        <h3 className={`text-[15px] font-bold mb-0.5 leading-tight
          ${gold ? 'text-[#f0c97a]' : 'text-white/90'}
        `}>{title}</h3>
        <p className={`text-[11px] font-semibold mb-2.5 ${gold ? 'text-[#D4A847]/50' : 'text-white/30'}`}>{subtitle}</p>
        <p className="text-[13px] leading-relaxed text-white/40">{body}</p>
      </div>
    </div>
  )
}

// ── Vision Panel ─────────────────────────────────────────────────────────────

function VisionPanel({
  domain, domainHref, headline1, headline2, intro, pillars, gold,
  ctaLabel, ctaHref, imageSrc, imageAlt,
}: {
  domain: string; domainHref: string; headline1: string; headline2: string;
  intro: string; pillars: typeof COM_PILLARS; gold?: boolean;
  ctaLabel: string; ctaHref: string; imageSrc: string; imageAlt: string;
}) {
  const { ref: headRef, visible: headVisible } = useFadeIn(0.1)

  return (
    <div className="flex flex-col h-full">

      {/* Visual header — full-width image with overlay */}
      <div className="relative h-[260px] rounded-2xl overflow-hidden mb-8 group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className={`
          absolute inset-0
          ${gold
            ? 'bg-gradient-to-t from-[#0a0805] via-[#0a0805]/70 to-[#0a0805]/20'
            : 'bg-gradient-to-t from-[#05050a] via-[#05050a]/70 to-[#05050a]/20'
          }
        `} />

        {/* Domain badge on image */}
        <div className="absolute bottom-5 left-5">
          <a
            href={domainHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold tracking-[0.12em] uppercase
              backdrop-blur-md border transition-all duration-300 group/badge
              ${gold
                ? 'bg-[#D4A847]/15 border-[#D4A847]/40 text-[#f0c97a] hover:bg-[#D4A847]/25 hover:border-[#D4A847]/60'
                : 'bg-white/[0.08] border-white/[0.15] text-white/70 hover:bg-white/[0.14] hover:border-white/30'
              }
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${gold ? 'bg-[#D4A847] animate-pulse' : 'bg-white/60'}`} />
            {domain}
          </a>
        </div>

        {/* Corner geometric accent */}
        <div className={`
          absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 rounded-tr-xl opacity-40
          ${gold ? 'border-[#D4A847]' : 'border-white/30'}
        `} />
      </div>

      {/* Text block */}
      <div ref={headRef} style={{ opacity: headVisible ? 1 : 0, transform: headVisible ? 'none' : 'translateY(20px)', transition: 'all 0.8s ease 0.1s' }}>
        <h2 className={`text-4xl xl:text-5xl font-black leading-[1.05] tracking-tight mb-5`}>
          <span className={gold
            ? 'bg-gradient-to-br from-[#f5e0a0] via-[#D4A847] to-[#a06b1a] bg-clip-text text-transparent'
            : 'text-white'
          }>
            {headline1}
          </span>
          <br />
          <span className={gold ? 'text-white' : 'text-white/55'}>
            {headline2}
          </span>
        </h2>
        <p className="text-[15px] text-white/50 leading-[1.8] mb-8 max-w-[440px]">{intro}</p>
      </div>

      {/* Pillars */}
      <div className="space-y-3 flex-1">
        {pillars.map((p, i) => (
          <PillarRow key={p.title} {...p} gold={gold} delay={i * 120} />
        ))}
      </div>

      {/* CTA */}
      <div className="mt-8">
        {gold ? (
          <Link
            href={ctaHref}
            className="
              inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-sm
              bg-gradient-to-r from-[#f5d98c] via-[#D4A847] to-[#b3852b]
              text-[#0a0805] shadow-[0_0_30px_rgba(212,168,71,0.35)]
              hover:shadow-[0_0_50px_rgba(212,168,71,0.55)] hover:brightness-110
              transition-all duration-300 group
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
              inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm
              border border-white/15 bg-white/[0.04] text-white/70
              hover:bg-white/[0.09] hover:border-white/30 hover:text-white
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
  const { ref: eyebrowRef, visible: eyebrowVisible } = useFadeIn(0.15)

  return (
    <section
      className="relative w-full overflow-hidden bg-[#05050a]"
      aria-labelledby="dual-vision-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      {/* ── Ambient background atmosphere ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Very faint blueprint grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Left cold glow (blue-white, .com side) */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[700px] opacity-[0.07] blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, #b0d0ff 0%, transparent 70%)' }}
        />

        {/* Right warm glow (gold, .ai side) */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[700px] opacity-[0.09] blur-[120px]"
          style={{ background: 'radial-gradient(ellipse, #D4A847 0%, transparent 70%)' }}
        />

        {/* Vertical center gold divider */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-px w-px hidden lg:block"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(212,168,71,0.12) 15%, rgba(212,168,71,0.35) 50%, rgba(212,168,71,0.12) 85%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 py-24 lg:py-36">

        {/* Eyebrow + section title */}
        <div
          ref={eyebrowRef}
          style={{
            opacity: eyebrowVisible ? 1 : 0,
            transform: eyebrowVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
          }}
          className="text-center mb-20 lg:mb-28"
        >
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#D4A847]/25 bg-[#D4A847]/[0.06] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A847] animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.2em] text-[#f0c97a] uppercase">
              One Brand · Two Horizons
            </span>
          </div>

          <h2
            id="dual-vision-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight mb-5"
            itemProp="name"
          >
            The Flowtaris{' '}
            <span className="bg-gradient-to-r from-[#f5d98c] to-[#b3852b] bg-clip-text text-transparent">
              Vision Architecture
            </span>
          </h2>
          <p className="text-[15px] text-white/40 max-w-2xl mx-auto leading-relaxed" itemProp="description">
            Flowtaris operates as one unified enterprise brand across two interdependent fronts:
            a world-class ERP operations platform and an AI-native finance intelligence layer —
            each reinforcing the authority, trust, and capability of the other.
          </p>
        </div>

        {/* Two-column panels — perfectly mirrored structure */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-px lg:divide-x lg:divide-white/[0.04]">

          {/* ── LEFT: flowtaris.com ── */}
          <div className="lg:pr-12 xl:pr-16">
            <VisionPanel
              domain="flowtaris.com"
              domainHref="https://flowtaris.com"
              headline1="The Enterprise"
              headline2="Operations Platform"
              intro="Flowtaris.com is the operational bedrock — built for enterprises that run on NetSuite, SAP, Workday, and Coupa. A global finance operations powerhouse with decade-long ERP expertise, strategic governance, and partner-grade execution."
              pillars={COM_PILLARS}
              ctaLabel="Explore Flowtaris.com"
              ctaHref="https://flowtaris.com"
              imageSrc="/images/com-vision.png"
              imageAlt="Flowtaris global enterprise ERP operations platform - connected globe showing multinational finance operations"
            />
          </div>

          {/* ── RIGHT: flowtaris.ai ── */}
          <div className="lg:pl-12 xl:pl-16 border-t border-white/[0.05] pt-12 lg:border-t-0 lg:pt-0">
            <VisionPanel
              domain="flowtaris.ai"
              domainHref="/assessment"
              headline1="The AI-Native"
              headline2="Finance Intelligence"
              intro="Flowtaris AI is the intelligence layer that sits atop your ERP — deploying autonomous agents that handle AP, AR, and close cycles end-to-end, with predictive analytics and GenAI document intelligence that make human-touch finance feel like the past."
              pillars={AI_PILLARS}
              gold
              ctaLabel="Assess Your AI Readiness"
              ctaHref="/assessment"
              imageSrc="/images/ai-vision.png"
              imageAlt="Flowtaris AI autonomous finance agents - golden neural network visualization of AI-powered ERP intelligence"
            />
          </div>
        </div>

        {/* ── Unifying bottom strip ── */}
        <div className="mt-20 pt-10 border-t border-white/[0.06]">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <p className="text-[13px] text-white/30 max-w-lg leading-relaxed text-center lg:text-left">
              <span className="text-white/60 font-semibold">Flowtaris</span>{' '}
              and{' '}
              <span className="text-[#D4A847]/80 font-semibold">Flowtaris AI</span>{' '}
              share a single trust lineage. Every AI capability is underpinned by the same enterprise
              governance, implementation rigor, and customer success model that flowtaris.com has
              earned across 40+ countries — making us the{' '}
              <em className="not-italic text-white/50">only AI finance platform</em>{' '}
              that is also a world-class ERP implementation partner.
            </p>
            <div className="flex items-center gap-4 shrink-0">
              {[
                { label: '40+', sub: 'Countries' },
                { label: '200+', sub: 'Enterprises' },
                { label: '99.8%', sub: 'AI Accuracy' },
              ].map((stat, i) => (
                <div key={i} className="text-center px-5 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="text-xl font-black text-white tracking-tight">{stat.label}</div>
                  <div className="text-[10px] text-white/30 uppercase tracking-widest font-semibold mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
