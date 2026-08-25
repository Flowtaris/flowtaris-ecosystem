'use client'

import Link from 'next/link'
import { ArrowUpRight, Sparkles, Globe, Brain, TrendingUp, Shield, Zap } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

const FLOWTARIS_PILLARS = [
  {
    icon: Globe,
    label: 'Global Operations Platform',
    desc: 'A unified ERP and finance operations layer trusted by enterprises across 40+ countries.',
  },
  {
    icon: Shield,
    label: 'Governance & Compliance',
    desc: 'SOC 2, GDPR, and ISO-grade controls baked into every workflow — not bolted on.',
  },
  {
    icon: TrendingUp,
    label: 'Long-Term Enterprise Growth',
    desc: 'Strategic implementations that compound value — NetSuite, SAP, Workday, and Coupa partners.',
  },
]

const FLOWTARIS_AI_PILLARS = [
  {
    icon: Brain,
    label: 'Autonomous AI Finance Layer',
    desc: 'GenAI that reads, decides, and acts — eliminating manual effort from AP, AR, and close cycles.',
  },
  {
    icon: Zap,
    label: 'Real-Time Intelligence',
    desc: 'Predictive analytics that surface opportunities and anomalies the moment they emerge.',
  },
  {
    icon: Sparkles,
    label: 'Agentic ERP Workflows',
    desc: 'AI agents that live inside your ERP — approving, escalating, and learning autonomously.',
  },
]

// ── Sub-components ────────────────────────────────────────────────────────────

function PillarCard({
  icon: Icon,
  label,
  desc,
  gold,
}: {
  icon: React.ElementType
  label: string
  desc: string
  gold?: boolean
}) {
  return (
    <div
      className={`
        group flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300
        ${gold
          ? 'bg-[#D4A847]/[0.06] border-[#D4A847]/20 hover:border-[#D4A847]/50 hover:bg-[#D4A847]/[0.1]'
          : 'bg-white/[0.04] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.07]'
        }
      `}
    >
      <div
        className={`
          flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5
          ${gold
            ? 'bg-[#D4A847]/15 group-hover:bg-[#D4A847]/25'
            : 'bg-white/[0.06] group-hover:bg-white/[0.1]'
          }
          transition-colors duration-300
        `}
      >
        <Icon
          className={`w-5 h-5 ${gold ? 'text-[#f0c97a]' : 'text-white/70'}`}
          strokeWidth={1.8}
        />
      </div>
      <div>
        <p className={`text-sm font-semibold mb-1 ${gold ? 'text-[#f0c97a]' : 'text-white/90'}`}>
          {label}
        </p>
        <p className="text-[13px] leading-relaxed text-white/45">{desc}</p>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function DualVisionSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      aria-labelledby="vision-heading"
    >
      {/* ── Background: floating UI mockups image ── */}
      <div className="absolute inset-0 z-0">
        {/* The generated floating-screens image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.18]"
          style={{ backgroundImage: "url('/images/vision-bg.png')" }}
          aria-hidden="true"
        />
        {/* Dark gradient overlay to make text readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(5,5,15,0.97) 0%, rgba(10,10,25,0.92) 50%, rgba(5,5,15,0.97) 100%)',
          }}
          aria-hidden="true"
        />
        {/* Subtle gold glow top-center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] opacity-20 blur-[100px] pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, #D4A847 0%, transparent 70%)' }}
          aria-hidden="true"
        />
        {/* Split line glow */}
        <div
          className="absolute inset-y-0 left-1/2 -translate-x-px w-[1px] pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, transparent 0%, rgba(212,168,71,0.4) 30%, rgba(212,168,71,0.6) 50%, rgba(212,168,71,0.4) 70%, transparent 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-28 lg:py-36">

        {/* Section eyebrow */}
        <div className="flex justify-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#D4A847]/30 bg-[#D4A847]/[0.07] text-[#f0c97a] text-[11px] font-bold tracking-[0.18em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A847] animate-pulse" />
            One Brand · Two Horizons
          </span>
        </div>

        {/* Dual columns */}
        <div className="grid lg:grid-cols-2 gap-0 lg:gap-px relative">

          {/* ── LEFT: Flowtaris Vision ── */}
          <div className="lg:pr-16 pb-16 lg:pb-0">
            {/* Label */}
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/30 uppercase mb-5">
              flowtaris.com
            </p>

            <h2 id="vision-heading" className="text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight mb-5">
              The Enterprise
              <br />
              <span className="text-white/60">Operations Vision</span>
            </h2>

            <p className="text-[15px] text-white/50 leading-relaxed mb-10 max-w-md">
              Flowtaris is built for the long game — a global finance operations platform
              that combines best-in-class ERP implementations with strategic automation,
              governance, and partner-grade enterprise support.
            </p>

            <div className="space-y-3 mb-10">
              {FLOWTARIS_PILLARS.map((p) => (
                <PillarCard key={p.label} {...p} />
              ))}
            </div>

            <a
              href="https://flowtaris.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                border border-white/15 bg-white/[0.04]
                text-white/70 text-sm font-medium
                hover:bg-white/[0.08] hover:border-white/30 hover:text-white
                transition-all duration-300 group
              "
            >
              Visit Flowtaris.com
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300"
              />
            </a>
          </div>

          {/* ── RIGHT: Flowtaris AI Vision ── */}
          <div className="lg:pl-16 border-t border-white/[0.06] lg:border-t-0 pt-16 lg:pt-0">
            {/* Label */}
            <p className="text-[11px] font-bold tracking-[0.2em] text-[#D4A847]/60 uppercase mb-5">
              flowtaris.ai
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight mb-5">
              <span className="bg-gradient-to-br from-[#f5d98c] via-[#D4A847] to-[#b3852b] bg-clip-text text-transparent">
                The AI-Native
              </span>
              <br />
              <span className="text-white">Finance Vision</span>
            </h2>

            <p className="text-[15px] text-white/50 leading-relaxed mb-10 max-w-md">
              Flowtaris AI is the intelligence layer for enterprise finance — where autonomous
              agents replace repetitive workflows, predictive models replace lagging reports,
              and your ERP finally learns to think ahead.
            </p>

            <div className="space-y-3 mb-10">
              {FLOWTARIS_AI_PILLARS.map((p) => (
                <PillarCard key={p.label} {...p} gold />
              ))}
            </div>

            <Link
              href="/assessment"
              className="
                inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                bg-gradient-to-r from-[#D4A847] to-[#b3852b]
                text-[#0a0a0a] text-sm font-bold
                shadow-[0_0_20px_rgba(212,168,71,0.3)]
                hover:shadow-[0_0_30px_rgba(212,168,71,0.5)]
                hover:brightness-110
                transition-all duration-300 group
              "
            >
              Assess Your AI Readiness
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform duration-300" />
            </Link>
          </div>
        </div>

        {/* ── Bottom unifying statement ── */}
        <div className="mt-20 pt-10 border-t border-white/[0.06] text-center">
          <p className="text-sm text-white/30 max-w-xl mx-auto leading-relaxed">
            <span className="text-white/60 font-semibold">Flowtaris</span> and{' '}
            <span className="text-[#D4A847]/80 font-semibold">Flowtaris AI</span> operate
            as one unified brand — two complementary horizons of the same enterprise mission.
            The authority, trust, and expertise of{' '}
            <a
              href="https://flowtaris.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors"
            >
              flowtaris.com
            </a>{' '}
            powers everything you experience here.
          </p>
        </div>
      </div>
    </section>
  )
}
