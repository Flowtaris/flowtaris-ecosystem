'use client'

import { useState, useEffect, useRef, useMemo, FormEvent } from 'react'
import { calculateROI, type ROIInputs, sensitivityAnalysis } from '@flowtaris/roi-engine'
import { insertROICalculation } from '@flowtaris/supabase-client'
import { analytics } from '@flowtaris/analytics'

// ─── Currency ────────────────────────────────────────────────────────────────
const CURRENCIES = [
  { code: 'USD', symbol: '$',  label: 'US Dollar',        locale: 'en-US',  rate: 1 },
  { code: 'EUR', symbol: '€',  label: 'Euro',             locale: 'de-DE',  rate: 0.93 },
  { code: 'GBP', symbol: '£',  label: 'British Pound',    locale: 'en-GB',  rate: 0.79 },
  { code: 'INR', symbol: '₹',  label: 'Indian Rupee',     locale: 'en-IN',  rate: 83.5 },
  { code: 'AED', symbol: 'د.إ', label: 'UAE Dirham',      locale: 'ar-AE',  rate: 3.67 },
  { code: 'SGD', symbol: 'S$', label: 'Singapore Dollar', locale: 'en-SG',  rate: 1.35 },
  { code: 'AUD', symbol: 'A$', label: 'Australian Dollar',locale: 'en-AU',  rate: 1.53 },
  { code: 'CAD', symbol: 'C$', label: 'Canadian Dollar',  locale: 'en-CA',  rate: 1.36 },
  { code: 'JPY', symbol: '¥',  label: 'Japanese Yen',     locale: 'ja-JP',  rate: 149 },
  { code: 'SAR', symbol: '﷼',  label: 'Saudi Riyal',      locale: 'ar-SA',  rate: 3.75 },
  { code: 'CHF', symbol: 'Fr', label: 'Swiss Franc',      locale: 'de-CH',  rate: 0.90 },
]

// ─── ERP Platforms ───────────────────────────────────────────────────────────
const PLATFORMS = [
  { id: 'NetSuite',   label: 'NetSuite',   mult: 1.2 },
  { id: 'Coupa',      label: 'Coupa',      mult: 1.15 },
  { id: 'SAP',        label: 'SAP',        mult: 1.25 },
  { id: 'Workday',    label: 'Workday',    mult: 1.1 },
  { id: 'Salesforce', label: 'Salesforce', mult: 1.05 },
]

// ─── Use Cases ───────────────────────────────────────────────────────────────
const USE_CASES = [
  { id: 'ap-automation',    label: 'AP Automation',           desc: 'Invoice processing, 3-way matching, payment execution', icon: '📄' },
  { id: 'po-matching',      label: 'PO Matching',             desc: 'Purchase order reconciliation and exception handling',   icon: '🔗' },
  { id: 'cash-forecasting', label: 'Cash Flow Forecasting',   desc: 'Predictive cash position and liquidity planning',       icon: '📊' },
  { id: 'expense-audit',    label: 'Expense Compliance',      desc: 'Policy enforcement, duplicate detection, audit trails', icon: '🛡️' },
  { id: 'vendor-onboarding',label: 'Vendor Onboarding',       desc: 'Supplier validation, risk scoring, document intake',    icon: '🤝' },
]

// ─── Company Size Presets ────────────────────────────────────────────────────
const SIZES = [
  { id: 'small',   label: '5–25',   sub: 'Small team',     volume: 12000,  hours: 15, hourly: 45, errorRate: 4.2, attrition: 18, recruitCost: 22000, compliance: 35000 },
  { id: 'mid',     label: '25–100', sub: 'Mid-market',     volume: 65000,  hours: 12, hourly: 55, errorRate: 3.5, attrition: 15, recruitCost: 35000, compliance: 120000 },
  { id: 'large',   label: '100–500',sub: 'Enterprise',     volume: 180000, hours: 10, hourly: 65, errorRate: 2.8, attrition: 12, recruitCost: 50000, compliance: 280000 },
  { id: 'xlarge',  label: '500+',   sub: 'Large enterprise',volume: 420000, hours: 8,  hourly: 75, errorRate: 2.2, attrition: 10, recruitCost: 65000, compliance: 500000 },
]

// ─── Sanity config type ──────────────────────────────────────────────────────
interface SanityROIConfig {
  assumptions?: Record<string, unknown>
  formulas?: Record<string, string>
  benchmarks?: Array<{ industry: string; avgAutomationRate: number; avgPaybackMonths: number; avgRoi: number; source: string; year: number }>
  sensitivityRanges?: { volumeVariance?: number; costVariance?: number; automationVariance?: number }
  seo?: { metaTitle?: string; metaDescription?: string }
  geoSignals?: Record<string, unknown>
  uiContent?: Record<string, string>
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface Diagnosis {
  manualLaborCost: number
  errorTaxCost: number
  attritionCost: number
  complianceCost: number
  totalBleed: number
}

interface Fix {
  manualLabor:   { before: number; after: number; pct: number }
  errorTax:      { before: number; after: number; pct: number }
  attrition:     { before: number; after: number; pct: number }
  compliance:    { before: number; after: number; pct: number }
  totalSavings:  number
  paybackMonths: number
  npv3Year:      number
  fteFreed:      number
  roiPercent:    number
  implCost:      number
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function useCurrency(code: string) {
  const cur = CURRENCIES.find(c => c.code === code) || CURRENCIES[0]
  const fmt = (val: number) => {
    const converted = Math.round(val * cur.rate)
    try {
      return new Intl.NumberFormat(cur.locale, { style: 'currency', currency: cur.code, maximumFractionDigits: 0 }).format(converted)
    } catch {
      return `${cur.symbol}${converted.toLocaleString()}`
    }
  }
  return { cur, fmt }
}

function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)
  const prev = useRef(0)

  useEffect(() => {
    const start = prev.current
    const diff = value - start
    if (diff === 0) return
    const startTime = performance.now()
    let raf: number

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setDisplay(Math.round(start + diff * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
      else prev.current = value
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [value, duration])

  return <>{display.toLocaleString()}</>
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1 — YOUR OPERATIONS
// ═══════════════════════════════════════════════════════════════════════════════
function Step1({ platform, setPlatform, useCase, setUseCase, companySize, setCompanySize, currency, setCurrency, onNext }: {
  platform: string; setPlatform: (v: string) => void
  useCase: string;  setUseCase: (v: string) => void
  companySize: string; setCompanySize: (v: string) => void
  currency: string; setCurrency: (v: string) => void
  onNext: () => void
}) {
  const canProceed = platform && useCase && companySize

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 24px 120px' }}>
      <div style={{ maxWidth: 780, width: '100%' }}>
        {/* Eyebrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981', animation: 'pulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif" }}>Step 1 of 4</span>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter',sans-serif", letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 12 }}>
          Tell us about your operations.
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter',sans-serif", lineHeight: 1.6, marginBottom: 56, maxWidth: 560 }}>
          Three answers. That is all we need to run a full financial analysis of your current cost structure.
        </p>

        {/* ── ERP Platform Pills ── */}
        <div style={{ marginBottom: 48 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
            What ERP does your finance team run on?
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
            {PLATFORMS.map(p => (
              <button key={p.id} onClick={() => setPlatform(p.id)} style={{
                padding: '14px 28px', borderRadius: 99, fontSize: 14, fontWeight: 700, fontFamily: "'Inter',sans-serif",
                cursor: 'pointer', transition: 'all 0.2s',
                background: platform === p.id ? 'rgba(99,102,241,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${platform === p.id ? 'rgba(99,102,241,0.5)' : 'rgba(255,255,255,0.08)'}`,
                color: platform === p.id ? '#818cf8' : 'rgba(255,255,255,0.5)',
                boxShadow: platform === p.id ? '0 0 20px rgba(99,102,241,0.15)' : 'none',
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Use Case Cards ── */}
        <div style={{ marginBottom: 48 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
            What is your biggest automation opportunity?
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
            {USE_CASES.map(u => (
              <button key={u.id} onClick={() => setUseCase(u.id)} style={{
                padding: '20px', borderRadius: 16, textAlign: 'left' as const, cursor: 'pointer', transition: 'all 0.2s',
                background: useCase === u.id ? 'rgba(245,158,11,0.08)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${useCase === u.id ? 'rgba(245,158,11,0.35)' : 'rgba(255,255,255,0.06)'}`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{u.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: useCase === u.id ? '#fbbf24' : 'rgba(255,255,255,0.7)', marginBottom: 4, fontFamily: "'Inter',sans-serif" }}>{u.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5, fontFamily: "'Inter',sans-serif" }}>{u.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Company Size ── */}
        <div style={{ marginBottom: 48 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 16, fontFamily: "'Inter',sans-serif" }}>
            Finance team size
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 10 }}>
            {SIZES.map(s => (
              <button key={s.id} onClick={() => setCompanySize(s.id)} style={{
                padding: '16px 24px', borderRadius: 14, cursor: 'pointer', transition: 'all 0.2s', textAlign: 'center' as const, minWidth: 120,
                background: companySize === s.id ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${companySize === s.id ? 'rgba(16,185,129,0.4)' : 'rgba(255,255,255,0.06)'}`,
              }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: companySize === s.id ? '#34d399' : 'rgba(255,255,255,0.6)', fontFamily: "'Inter',sans-serif" }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, fontFamily: "'Inter',sans-serif" }}>{s.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Currency (compact) ── */}
        <div style={{ marginBottom: 56 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', marginBottom: 12, fontFamily: "'Inter',sans-serif" }}>Currency</label>
          <select value={currency} onChange={e => setCurrency(e.target.value)} style={{
            padding: '12px 20px', borderRadius: 10, fontSize: 14, fontFamily: 'monospace',
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer', outline: 'none', minWidth: 220,
          }}>
            {CURRENCIES.map(c => <option key={c.code} value={c.code} style={{ background: '#111' }}>{c.symbol} {c.label}</option>)}
          </select>
        </div>

        {/* ── CTA ── */}
        <button onClick={onNext} disabled={!canProceed} style={{
          padding: '18px 48px', borderRadius: 99, fontSize: 16, fontWeight: 800, fontFamily: "'Inter',sans-serif",
          background: canProceed ? '#6366f1' : 'rgba(255,255,255,0.06)',
          color: canProceed ? '#fff' : 'rgba(255,255,255,0.2)',
          border: 'none', cursor: canProceed ? 'pointer' : 'not-allowed',
          boxShadow: canProceed ? '0 8px 32px rgba(99,102,241,0.35)' : 'none',
          transition: 'all 0.3s',
          letterSpacing: '-0.01em',
        }}>
          Run My Financial X-Ray →
        </button>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2 — THE DIAGNOSIS (Pain Amplification)
// ═══════════════════════════════════════════════════════════════════════════════
function Step2({ diagnosis, currency, onAdjust, onNext }: {
  diagnosis: Diagnosis; currency: string; onAdjust: (field: keyof Diagnosis, val: number) => void; onNext: () => void
}) {
  const { fmt } = useCurrency(currency)
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  const painCards = [
    { key: 'manualLaborCost' as const, label: 'Manual Labor Overhead', desc: 'Your team spends thousands of hours per year on tasks a machine handles in seconds.', color: '#ef4444', dimBg: 'rgba(239,68,68,0.06)', dimBorder: 'rgba(239,68,68,0.2)' },
    { key: 'errorTaxCost' as const,    label: 'Error Tax',              desc: 'Every miskeyed entry triggers rework, delays, and downstream data corruption.',       color: '#f59e0b', dimBg: 'rgba(245,158,11,0.06)', dimBorder: 'rgba(245,158,11,0.2)' },
    { key: 'attritionCost' as const,   label: 'Attrition Drain',        desc: 'Manual drudgery burns out your best people. Replacing them costs 6+ months of salary.', color: '#8b5cf6', dimBg: 'rgba(139,92,246,0.06)', dimBorder: 'rgba(139,92,246,0.2)' },
    { key: 'complianceCost' as const,  label: 'Compliance Exposure',    desc: 'Manual processes create audit gaps. Regulators do not accept "we missed it" as a defense.', color: '#06b6d4', dimBg: 'rgba(6,182,212,0.06)', dimBorder: 'rgba(6,182,212,0.2)' },
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px 120px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ef4444' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)' }}>Step 2 of 4 — The Diagnosis</span>
        </div>

        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter',sans-serif", letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 12 }}>
          Your finance operations are costing you
        </h2>

        {/* The Big Number */}
        <div style={{ fontSize: 'clamp(48px, 8vw, 80px)', fontWeight: 900, color: '#ef4444', fontFamily: "'Inter',sans-serif", letterSpacing: '-0.04em', lineHeight: 1, marginBottom: 8, fontVariantNumeric: 'tabular-nums' }}>
          {fmt(diagnosis.totalBleed)}
        </div>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.3)', fontFamily: "'Inter',sans-serif", marginBottom: 64 }}>per year — and climbing.</p>

        {/* Pain Cards */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 16 }}>
          {painCards.map((card, i) => {
            const val = diagnosis[card.key]
            return (
              <div key={card.key} style={{
                padding: '28px 32px', borderRadius: 16, transition: 'all 0.4s',
                background: card.dimBg, border: `1px solid ${card.dimBorder}`,
                opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: `${200 + i * 150}ms`,
              }}>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: card.color, marginBottom: 6, fontFamily: "'Inter',sans-serif", textTransform: 'uppercase' as const, letterSpacing: '0.05em' }}>{card.label}</div>
                    <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', lineHeight: 1.5, fontFamily: "'Inter',sans-serif" }}>{card.desc}</p>
                  </div>
                  <div style={{ textAlign: 'right' as const }}>
                    <div style={{ fontSize: 28, fontWeight: 900, color: card.color, fontFamily: "'Inter',sans-serif", letterSpacing: '-0.03em', fontVariantNumeric: 'tabular-nums' }}>
                      {fmt(val)}
                    </div>
                    <button onClick={() => {
                      const input = prompt(`Adjust ${card.label} (USD):`, String(val))
                      if (input) onAdjust(card.key, parseFloat(input))
                    }} style={{
                      fontSize: 11, color: 'rgba(255,255,255,0.25)', background: 'none', border: 'none', cursor: 'pointer',
                      textDecoration: 'underline', marginTop: 4, fontFamily: "'Inter',sans-serif",
                    }}>
                      Adjust
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total + CTA */}
        <div style={{ marginTop: 48, padding: '32px', borderRadius: 16, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', textAlign: 'center' as const }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 8 }}>Total Annual Cost of Manual Operations</p>
          <div style={{ fontSize: 'clamp(36px, 6vw, 56px)', fontWeight: 900, color: '#ef4444', fontFamily: "'Inter',sans-serif", fontVariantNumeric: 'tabular-nums' }}>
            {fmt(diagnosis.totalBleed)}
          </div>
        </div>

        <div style={{ textAlign: 'center' as const, marginTop: 48 }}>
          <button onClick={onNext} style={{
            padding: '18px 48px', borderRadius: 99, fontSize: 16, fontWeight: 800, fontFamily: "'Inter',sans-serif",
            background: '#6366f1', color: '#fff', border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(99,102,241,0.35)', transition: 'all 0.3s',
          }}>
            Show Me What Flowtaris Fixes →
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3 — THE FIX (Flowtaris Impact)
// ═══════════════════════════════════════════════════════════════════════════════
function Step3({ fix, diagnosis, currency, onNext }: {
  fix: Fix; diagnosis: Diagnosis; currency: string; onNext: () => void
}) {
  const { fmt } = useCurrency(currency)
  const [visible, setVisible] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  const reductions = [
    { label: 'Manual Labor',     before: fix.manualLabor.before,  after: fix.manualLabor.after,  pct: fix.manualLabor.pct,  color: '#10b981' },
    { label: 'Error Rework',     before: fix.errorTax.before,     after: fix.errorTax.after,     pct: fix.errorTax.pct,     color: '#10b981' },
    { label: 'Team Attrition',   before: fix.attrition.before,    after: fix.attrition.after,    pct: fix.attrition.pct,    color: '#10b981' },
    { label: 'Compliance Risk',  before: fix.compliance.before,   after: fix.compliance.after,   pct: fix.compliance.pct,   color: '#10b981' },
  ]

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px 120px' }}>
      <div style={{ maxWidth: 880, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)' }}>Step 3 of 4 — The Fix</span>
        </div>

        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter',sans-serif", letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 12 }}>
          Here is what Flowtaris eliminates.
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif", marginBottom: 56 }}>
          Based on your operations profile, deployed within 60 days.
        </p>

        {/* Reduction Bars */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: 20, marginBottom: 64 }}>
          {reductions.map((r, i) => {
            const barPct = r.before > 0 ? ((r.before - r.after) / r.before) * 100 : 0
            return (
              <div key={r.label} style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(16px)', transition: 'all 0.5s', transitionDelay: `${200 + i * 120}ms` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: 'rgba(255,255,255,0.7)', fontFamily: "'Inter',sans-serif" }}>{r.label}</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                    <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.25)', textDecoration: 'line-through', fontFamily: 'monospace' }}>{fmt(r.before)}</span>
                    <span style={{ fontSize: 14, color: '#fff', fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>→</span>
                    <span style={{ fontSize: 18, color: '#10b981', fontWeight: 800, fontFamily: "'Inter',sans-serif", fontVariantNumeric: 'tabular-nums' }}>{fmt(r.after)}</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#10b981', background: 'rgba(16,185,129,0.1)', padding: '2px 8px', borderRadius: 99 }}>-{Math.round(r.pct)}%</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div style={{ height: 6, borderRadius: 99, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', borderRadius: 99, background: 'linear-gradient(90deg, #10b981, #34d399)', width: visible ? `${barPct}%` : '0%', transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)', transitionDelay: `${400 + i * 120}ms` }} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Net Savings */}
        <div style={{ textAlign: 'center' as const, padding: '40px', borderRadius: 20, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', marginBottom: 48 }}>
          <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', textTransform: 'uppercase' as const, marginBottom: 12 }}>Net Annual Savings</p>
          <div style={{ fontSize: 'clamp(40px, 7vw, 64px)', fontWeight: 900, color: '#10b981', fontFamily: "'Inter',sans-serif", letterSpacing: '-0.04em', fontVariantNumeric: 'tabular-nums', marginBottom: 16 }}>
            {fmt(fix.totalSavings)}
          </div>

          {/* 3 Hero Stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap' as const, justifyContent: 'center', gap: 32, marginTop: 24 }}>
            {[
              { val: `${fix.paybackMonths.toFixed(1)} mo`, label: 'Payback Period' },
              { val: fmt(fix.npv3Year), label: '3-Year NPV' },
              { val: `${fix.fteFreed.toFixed(1)} people`, label: 'FTE Capacity Freed' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center' as const }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: '#fff', fontFamily: "'Inter',sans-serif", fontVariantNumeric: 'tabular-nums' }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 4, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ textAlign: 'center' as const }}>
          <button onClick={onNext} style={{
            padding: '18px 48px', borderRadius: 99, fontSize: 16, fontWeight: 800, fontFamily: "'Inter',sans-serif",
            background: '#10b981', color: '#0a0a0f', border: 'none', cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(16,185,129,0.35)', transition: 'all 0.3s',
          }}>
            Build My Business Case →
          </button>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4 — YOUR BUSINESS CASE (The Closer)
// ═══════════════════════════════════════════════════════════════════════════════
function Step4({ fix, diagnosis, currency, platform, useCase, companySize, onSave }: {
  fix: Fix; diagnosis: Diagnosis; currency: string; platform: string; useCase: string; companySize: string
  onSave: (email: string) => Promise<void>
}) {
  const { fmt } = useCurrency(currency)
  const [visible, setVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [showMethodology, setShowMethodology] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVisible(true), 100); return () => clearTimeout(t) }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSending(true)
    await onSave(email)
    setSent(true)
    setSending(false)
  }

  const platformLabel = PLATFORMS.find(p => p.id === platform)?.label || platform
  const useCaseLabel  = USE_CASES.find(u => u.id === useCase)?.label || useCase
  const sizeLabel     = SIZES.find(s => s.id === companySize)?.label || companySize

  const rows = [
    { category: 'Manual Labor Cost',  current: diagnosis.manualLaborCost, projected: fix.manualLabor.after,  savings: diagnosis.manualLaborCost - fix.manualLabor.after },
    { category: 'Error Rework Cost',  current: diagnosis.errorTaxCost,    projected: fix.errorTax.after,     savings: diagnosis.errorTaxCost - fix.errorTax.after },
    { category: 'Attrition Cost',     current: diagnosis.attritionCost,   projected: fix.attrition.after,    savings: diagnosis.attritionCost - fix.attrition.after },
    { category: 'Compliance Risk',    current: diagnosis.complianceCost,  projected: fix.compliance.after,   savings: diagnosis.complianceCost - fix.compliance.after },
  ]
  const totals = { current: diagnosis.totalBleed, projected: diagnosis.totalBleed - fix.totalSavings, savings: fix.totalSavings }

  return (
    <div style={{ minHeight: '100vh', padding: '80px 24px 120px' }}>
      <div style={{ maxWidth: 920, margin: '0 auto', opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(40px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)' }}>Step 4 of 4 — Your Business Case</span>
        </div>

        <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, color: '#fff', fontFamily: "'Inter',sans-serif", letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 8 }}>
          Executive Summary
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.35)', fontFamily: "'Inter',sans-serif", marginBottom: 40 }}>
          {platformLabel} · {useCaseLabel} · {sizeLabel} employees · {fix.roiPercent}% projected 3-year ROI
        </p>

        {/* ── Comparison Table ── */}
        <div style={{ borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 40 }}>
          {/* Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '16px 24px', background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            {['Cost Category', 'Current State', 'With Flowtaris', 'Annual Savings'].map((h, i) => (
              <div key={h} style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.3)', textAlign: i === 0 ? 'left' as const : 'right' as const }}>{h}</div>
            ))}
          </div>
          {/* Rows */}
          {rows.map((r, i) => (
            <div key={r.category} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.04)', background: i % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', fontFamily: "'Inter',sans-serif" }}>{r.category}</div>
              <div style={{ fontSize: 14, color: '#ef4444', fontFamily: 'monospace', textAlign: 'right' as const }}>{fmt(r.current)}</div>
              <div style={{ fontSize: 14, color: '#10b981', fontFamily: 'monospace', textAlign: 'right' as const }}>{fmt(r.projected)}</div>
              <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, fontFamily: 'monospace', textAlign: 'right' as const }}>{fmt(r.savings)}</div>
            </div>
          ))}
          {/* Totals */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', padding: '20px 24px', background: 'rgba(99,102,241,0.06)', borderTop: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', fontFamily: "'Inter',sans-serif" }}>Total Annual</div>
            <div style={{ fontSize: 16, color: '#ef4444', fontWeight: 800, fontFamily: 'monospace', textAlign: 'right' as const }}>{fmt(totals.current)}</div>
            <div style={{ fontSize: 16, color: '#10b981', fontWeight: 800, fontFamily: 'monospace', textAlign: 'right' as const }}>{fmt(totals.projected)}</div>
            <div style={{ fontSize: 16, color: '#6366f1', fontWeight: 900, fontFamily: 'monospace', textAlign: 'right' as const }}>{fmt(totals.savings)}</div>
          </div>
        </div>

        {/* ── Key Metrics Row ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
          {[
            { val: `${fix.paybackMonths.toFixed(1)} months`, label: 'Payback Period',          color: '#10b981' },
            { val: fmt(fix.npv3Year),                        label: '3-Year Net Present Value', color: '#6366f1' },
            { val: `${fix.fteFreed.toFixed(1)}`,             label: 'FTE Capacity Freed',       color: '#f59e0b' },
            { val: `${fix.roiPercent}%`,                     label: '3-Year ROI',               color: '#06b6d4' },
            { val: fmt(fix.implCost),                        label: 'Est. Implementation Cost', color: 'rgba(255,255,255,0.5)' },
          ].map(m => (
            <div key={m.label} style={{ padding: '24px', borderRadius: 14, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' as const }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: m.color, fontFamily: "'Inter',sans-serif", fontVariantNumeric: 'tabular-nums' }}>{m.val}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 6, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* ── Methodology Accordion ── */}
        <div style={{ marginBottom: 48 }}>
          <button onClick={() => setShowMethodology(!showMethodology)} style={{
            width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '16px 24px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
            cursor: 'pointer', color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif",
          }}>
            <span>Methodology and Assumptions</span>
            <span style={{ transform: showMethodology ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▾</span>
          </button>
          {showMethodology && (
            <div style={{ padding: '24px', borderRadius: '0 0 12px 12px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.06)', borderTop: 'none', fontSize: 13, color: 'rgba(255,255,255,0.35)', lineHeight: 1.8, fontFamily: "'Inter',sans-serif" }}>
              <p><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Labor savings:</strong> Annual volume × avg manual hours/unit × hourly cost × automation rate (capped at 90%) × platform complexity multiplier.</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Error reduction:</strong> Volume × error rate × rework cost (3× base processing cost) × automation rate.</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Attrition savings:</strong> FTE freed × current attrition rate × 30% burnout reduction × avg recruitment cost.</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Compliance reduction:</strong> Annual compliance fines × automation rate.</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>Implementation cost:</strong> $50,000 base + $2,000 per estimated user (1 per 10,000 annual volume).</p>
              <p style={{ marginTop: 8 }}><strong style={{ color: 'rgba(255,255,255,0.5)' }}>NPV:</strong> 3-year savings × 0.8 discount factor. Payback = implementation cost ÷ monthly savings.</p>
            </div>
          )}
        </div>

        {/* ── Lead Capture ── */}
        <div style={{ padding: '48px 40px', borderRadius: 20, background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)', textAlign: 'center' as const }}>
          <h3 style={{ fontSize: 24, fontWeight: 900, color: '#fff', fontFamily: "'Inter',sans-serif", marginBottom: 8 }}>Get your personalized business case.</h3>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.4)', marginBottom: 32, fontFamily: "'Inter',sans-serif" }}>We will send a PDF with full calculations, methodology, and executive summary — ready for your CFO.</p>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap' as const, gap: 12, justifyContent: 'center', maxWidth: 500, margin: '0 auto 16px' }}>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required disabled={sent} style={{
              flex: 1, minWidth: 240, padding: '14px 20px', borderRadius: 99, fontSize: 14, fontFamily: "'Inter',sans-serif",
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none',
            }} />
            <button type="submit" disabled={sent || sending || !email} style={{
              padding: '14px 32px', borderRadius: 99, fontSize: 14, fontWeight: 800, fontFamily: "'Inter',sans-serif",
              background: sent ? '#10b981' : '#6366f1', color: '#fff', border: 'none', cursor: sent ? 'default' : 'pointer',
              transition: 'all 0.3s', opacity: sending ? 0.7 : 1,
            }}>
              {sent ? '✓ Sent' : sending ? 'Sending...' : 'Email My Business Case'}
            </button>
          </form>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', fontFamily: "'Inter',sans-serif" }}>We never share your email. Unsubscribe anytime.</p>
        </div>

        {/* ── Secondary CTA ── */}
        <div style={{ textAlign: 'center' as const, marginTop: 32 }}>
          <a href="/assessment" style={{
            fontSize: 14, color: 'rgba(255,255,255,0.4)', fontFamily: "'Inter',sans-serif", textDecoration: 'underline',
          }}>
            Or take our free AI Readiness Assessment →
          </a>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════════════════════
export default function ROICalculatorClient({ initialConfig }: { initialConfig: SanityROIConfig | null }) {
  const [step, setStep] = useState(1)
  const [platform, setPlatform] = useState('')
  const [useCase, setUseCase] = useState('')
  const [companySize, setCompanySize] = useState('')
  const [currency, setCurrency] = useState('USD')
  const [roiCalculationId, setRoiCalculationId] = useState<string | null>(null)

  // Editable diagnosis values (initialized from size presets)
  const [diagnosisOverrides, setDiagnosisOverrides] = useState<Partial<Diagnosis>>({})

  // Get size preset
  const sizePreset = SIZES.find(s => s.id === companySize) || SIZES[1]

  // ── Calculate Diagnosis ───────────────────────────────────────────────────
  const diagnosis = useMemo<Diagnosis>(() => {
    const vol = sizePreset.volume
    const hoursPerUnit = sizePreset.hours / 60 // convert minutes to hours
    const hourlyCost = sizePreset.hourly
    const errorRate = sizePreset.errorRate / 100

    const manualLaborCost = diagnosisOverrides.manualLaborCost ?? Math.round(vol * hoursPerUnit * hourlyCost)
    const errorTaxCost = diagnosisOverrides.errorTaxCost ?? Math.round(vol * errorRate * hoursPerUnit * hourlyCost * 3)
    const attritionCost = diagnosisOverrides.attritionCost ?? Math.round(
      (vol * hoursPerUnit / 1920) * (sizePreset.attrition / 100) * 0.3 * sizePreset.recruitCost
    )
    const complianceCost = diagnosisOverrides.complianceCost ?? sizePreset.compliance
    const totalBleed = manualLaborCost + errorTaxCost + attritionCost + complianceCost

    return { manualLaborCost, errorTaxCost, attritionCost, complianceCost, totalBleed }
  }, [sizePreset, diagnosisOverrides])

  // ── Calculate Fix (uses roi-engine) ───────────────────────────────────────
  const fix = useMemo<Fix>(() => {
    const roiInputs: ROIInputs = {
      annualVolume: sizePreset.volume,
      avgManualHoursPerUnit: sizePreset.hours / 60,
      hourlyCost: sizePreset.hourly,
      errorRate: sizePreset.errorRate / 100,
      platform: platform || 'NetSuite',
      useCase: useCase || 'ap-automation',
      attritionRate: sizePreset.attrition / 100,
      avgRecruitmentCost: sizePreset.recruitCost,
      complianceFinesPerYear: sizePreset.compliance,
    }

    const result = calculateROI(roiInputs)

    // Derive the before/after breakdowns from diagnosis + engine
    const automationPct = 85
    const errorReductionPct = 95
    const attritionReductionPct = 30
    const complianceReductionPct = Math.round(result.complianceSavings / Math.max(1, diagnosis.complianceCost) * 100)

    return {
      manualLabor: { before: diagnosis.manualLaborCost, after: Math.round(diagnosis.manualLaborCost * (1 - automationPct / 100)), pct: automationPct },
      errorTax:    { before: diagnosis.errorTaxCost,    after: Math.round(diagnosis.errorTaxCost * (1 - errorReductionPct / 100)),    pct: errorReductionPct },
      attrition:   { before: diagnosis.attritionCost,   after: Math.round(diagnosis.attritionCost * (1 - attritionReductionPct / 100)),  pct: attritionReductionPct },
      compliance:  { before: diagnosis.complianceCost,  after: Math.round(diagnosis.complianceCost * (1 - complianceReductionPct / 100)), pct: complianceReductionPct },
      totalSavings: result.annualSavings,
      paybackMonths: result.paybackMonths,
      npv3Year: Math.round(result.annualSavings * 3 * 0.8),
      fteFreed: result.fteFreed,
      roiPercent: result.threeYearROI,
      implCost: result.implementationCost,
    }
  }, [diagnosis, sizePreset, platform, useCase])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAdjust = (field: keyof Diagnosis, val: number) => {
    if (isNaN(val) || val < 0) return
    setDiagnosisOverrides(prev => ({ ...prev, [field]: Math.round(val) }))
  }

  const goToStep = (s: number) => {
    setStep(s)
    window.scrollTo({ top: 0, behavior: 'smooth' })

    // Track analytics
    if (s === 2) {
      analytics.roi.open({ source: 'calculator-step1', prefilled: { erp: platform, useCase, invoices: sizePreset.volume } })
    }
    if (s === 3) {
      analytics.roi.calculate({ projectedSavings: fix.totalSavings, paybackMonths: fix.paybackMonths, fteFreed: fix.fteFreed })
    }
  }

  const handleSaveEmail = async (email: string) => {
    analytics.roi.emailCapture({ email, projectedSavings: fix.totalSavings })
    try {
      const { data, error } = await insertROICalculation({
        inputs: { platform, useCase, companySize, currency, sizePreset } as unknown as Record<string, unknown>,
        outputs: { diagnosis, fix } as unknown as Record<string, unknown>,
        email,
        assessment_id: typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('assessmentId') : null,
      })
      if (!error && data) setRoiCalculationId(data.id)
    } catch (err) {
      console.error('ROI save error:', err)
    }
  }

  // ── Progress bar ──────────────────────────────────────────────────────────
  const progressPct = ((step - 1) / 3) * 100

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      {/* Top progress bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 3, zIndex: 100, background: 'rgba(255,255,255,0.04)' }}>
        <div style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #10b981)', width: `${progressPct}%`, transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)' }} />
      </div>

      {/* Step navigation dots */}
      <div style={{ position: 'fixed', right: 24, top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column' as const, gap: 12 }}>
        {[1,2,3,4].map(s => (
          <button key={s} onClick={() => s <= step && goToStep(s)} disabled={s > step} style={{
            width: 10, height: 10, borderRadius: '50%', border: 'none', cursor: s <= step ? 'pointer' : 'default',
            background: s === step ? '#6366f1' : s < step ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)',
            transition: 'all 0.3s', boxShadow: s === step ? '0 0 12px rgba(99,102,241,0.5)' : 'none',
          }} aria-label={`Step ${s}`} />
        ))}
      </div>

      {/* Render current step */}
      {step === 1 && (
        <Step1
          platform={platform} setPlatform={setPlatform}
          useCase={useCase} setUseCase={setUseCase}
          companySize={companySize} setCompanySize={setCompanySize}
          currency={currency} setCurrency={setCurrency}
          onNext={() => goToStep(2)}
        />
      )}
      {step === 2 && (
        <Step2 diagnosis={diagnosis} currency={currency} onAdjust={handleAdjust} onNext={() => goToStep(3)} />
      )}
      {step === 3 && (
        <Step3 fix={fix} diagnosis={diagnosis} currency={currency} onNext={() => goToStep(4)} />
      )}
      {step === 4 && (
        <Step4
          fix={fix} diagnosis={diagnosis} currency={currency}
          platform={platform} useCase={useCase} companySize={companySize}
          onSave={handleSaveEmail}
        />
      )}

      <style dangerouslySetInnerHTML={{__html: `@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }`}} />
    </div>
  )
}
