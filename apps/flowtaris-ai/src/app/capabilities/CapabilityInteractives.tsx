'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface Capability {
  slug: string
  title: string
  category: string
  maturity: string
  metric: string
  headline: string
  description: string
  accent: string
  accentMuted: string
  accentBorder: string
  platforms: string[]
  keyResult: string
}

export function CapabilityCardList({ capabilities }: { capabilities: Capability[] }) {
  return (
    <div className="space-y-6">
      {capabilities.map((cap, idx) => (
        <CapabilityCard key={cap.slug} cap={cap} idx={idx} />
      ))}
    </div>
  )
}

function CapabilityCard({ cap, idx }: { cap: Capability; idx: number }) {
  return (
    <Link
      href={`/capabilities/${cap.slug}`}
      className="group block rounded-3xl border p-8 md:p-12 transition-all duration-500 hover:-translate-y-1 relative overflow-hidden hover:!border-[var(--accent-border)] hover:!bg-[var(--accent-muted)]"
      style={
        {
          borderColor: 'rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(10,10,10,0.8)',
          '--accent': cap.accent,
          '--accent-muted': cap.accentMuted,
          '--accent-border': cap.accentBorder,
        } as React.CSSProperties
      }
    >
      {/* Background number */}
      <div className="absolute top-10 right-10 text-[100px] font-bold leading-none opacity-[0.04] text-white select-none pointer-events-none">
        {String(idx + 1).padStart(2, '0')}
      </div>

      <div className="relative z-10 grid md:grid-cols-[1fr_auto] gap-8 items-start">
        <div>
          <div className="flex items-center gap-4 mb-5">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.25em] px-3 py-1 rounded-full border"
              style={{ color: cap.accent, backgroundColor: cap.accentMuted, borderColor: cap.accentBorder }}
            >
              {cap.category}
            </span>
            <span className="text-xs text-gray-500 font-medium">● Production</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold text-white mb-3">{cap.title}</h3>
          <p className="text-base font-medium mb-4" style={{ color: cap.accent }}>{cap.headline}</p>
          <p className="text-gray-400 text-base font-light leading-relaxed max-w-2xl">{cap.description}</p>

          <div className="flex items-center gap-6 mt-8 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cap.accent }} />
              <span className="text-sm font-semibold text-white">{cap.metric}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-gray-600" />
              <span className="text-sm text-gray-400">{cap.keyResult}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            {cap.platforms.slice(0, 4).map(p => (
              <span key={p} className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-400 border border-white/[0.06]">{p}</span>
            ))}
            {cap.platforms.length > 4 && (
              <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-gray-500 border border-white/[0.06]">
                +{cap.platforms.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Arrow CTA */}
        <div className="flex flex-col items-end justify-between h-full gap-4 shrink-0">
          <div
            className="w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 group-hover:scale-110"
            style={{ borderColor: cap.accentBorder, backgroundColor: cap.accentMuted, color: cap.accent }}
          >
            <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <span className="text-sm font-semibold" style={{ color: cap.accent }}>
            Explore capability →
          </span>
        </div>
      </div>
    </Link>
  )
}

export function IntegrationChips({ integrations, accent, accentBorder }: { integrations: string[]; accent: string; accentBorder: string }) {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      {integrations.map(i => (
        <IntegrationChip key={i} label={i} accent={accent} accentBorder={accentBorder} />
      ))}
    </div>
  )
}

function IntegrationChip({ label, accent, accentBorder }: { label: string; accent: string; accentBorder: string }) {
  return (
    <span
      className="px-6 py-3 rounded-full text-sm font-medium text-gray-300 border transition-all duration-300 hover:!text-[var(--accent)] hover:!border-[var(--accent-border)] cursor-default"
      style={{ 
        backgroundColor: 'rgba(10,10,10,0.8)', 
        borderColor: 'rgba(255,255,255,0.08)',
        '--accent': accent,
        '--accent-border': accentBorder
      } as React.CSSProperties}
    >
      {label}
    </span>
  )
}

export function RelatedCapabilityLinks({ related }: {
  related: Array<{ slug: string; title: string; category: string; accent: string; accentBorder: string; accentMuted: string }>
}) {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {related.map(rc => (
        <RelatedCard key={rc.slug} cap={rc} />
      ))}
    </div>
  )
}

function RelatedCard({ cap }: { cap: { slug: string; title: string; category: string; accent: string; accentBorder: string; accentMuted: string } }) {
  return (
    <Link
      href={`/capabilities/${cap.slug}`}
      className="group rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1 hover:!border-[var(--accent-border)]"
      style={{ 
        borderColor: 'rgba(255,255,255,0.06)', 
        backgroundColor: 'rgba(10,10,10,0.8)',
        '--accent': cap.accent,
        '--accent-border': cap.accentBorder,
        '--accent-muted': cap.accentMuted,
      } as React.CSSProperties}
    >
      <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: cap.accent }}>{cap.category}</div>
      <div className="text-white font-semibold text-lg mb-4 leading-snug">{cap.title}</div>
      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: cap.accent }}>
        Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
