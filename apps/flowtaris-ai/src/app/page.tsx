import { Metadata } from 'next'
import { Badge, FloatingProduct } from '@repo/ui'
import { HomeHero } from './HomeHero'
import DualVisionSection from '../components/DualVisionSection'

export const metadata: Metadata = {
  title: 'Flowtaris AI | Enterprise AI Automation for Finance',
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  openGraph: {
    title: 'Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics.',
    type: 'website',
  },
}

const trustSignals = [
  { label: 'Certified', value: 'SOC 2' },
  { label: 'Compliant', value: 'GDPR' },
  { label: 'Certified', value: 'ISO 27001' },
  { label: 'Uptime SLA', value: '99.99%' },
  { label: 'API Calls/Day', value: '50M+' },
  { label: 'Trusted By', value: 'Fortune 500' },
]

const capabilities = [
  { name: 'GenAI Document Intelligence', category: 'Document Processing', icon: '⚡', desc: 'Automatically extract, classify, and validate financial documents with 99.8% accuracy.', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'Autonomous Workflow Engine', category: 'Process Automation', icon: '🔄', desc: 'Self-healing workflows that adapt to exceptions without human intervention.', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'Predictive Analytics', category: 'Finance Intelligence', icon: '📊', desc: 'Forecast cash flow, detect anomalies, and surface actionable insights in real time.', platforms: ['NetSuite', 'SAP', 'Workday'] },
  { name: 'Conversational ERP Interface', category: 'Human-Computer Interaction', icon: '💬', desc: 'Ask your ERP anything in plain English. Get instant answers, run approvals, update records.', platforms: ['NetSuite', 'Workday'] },
  { name: 'Integration Health Monitoring', category: 'Observability', icon: '🛡️', desc: 'Real-time visibility into every integration, with automated alerting and self-healing.', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'AI Governance & Compliance', category: 'Risk & Compliance', icon: '✅', desc: 'Full audit trail, explainable AI, and regulatory controls built into every workflow.', platforms: ['SAP', 'Coupa'] },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">

      {/* ── Animated Hero ── */}
      <HomeHero />

      {/* ── Trust Signals ── */}
      <section
        style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '56px 24px', background: 'rgba(0,0,0,0.2)' }}
        aria-label="Compliance and reliability"
      >
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <p style={{ textAlign: 'center', fontSize: 11, letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: 36, fontFamily: "'Inter', sans-serif" }}>
            Trusted compliance &amp; reliability
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '14px 20px' }}>
            {trustSignals.map((signal, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                padding: '18px 24px', borderRadius: 16,
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                minWidth: 110, transition: 'transform 0.2s',
              }}>
                <span style={{
                  fontSize: 20, fontWeight: 800,
                  background: 'linear-gradient(135deg, #00b8db, #62e4fa)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em',
                }}>
                  {signal.value}
                </span>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>
                  {signal.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dual Vision: Flowtaris × Flowtaris AI ── */}
      <DualVisionSection />

      {/* ── Product Showcase ── */}
      <section style={{ padding: '96px 24px', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 64 }}>
          <div style={{ textAlign: 'center', maxWidth: 700 }}>
            <p style={{ fontSize: 11, color: '#00b8db', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 16 }}>Live AI Dashboard</p>
            <h2 className="text-display-sm text-gradient-brand" style={{ marginBottom: 20 }}>
              Intelligence you can see and interact with
            </h2>
            <p className="text-headline-sm" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
              Experience the power of our conversational ERP interface and predictive analytics engines —
              real-time, visual, and actionable.
            </p>
          </div>
          <div style={{ width: '100%', maxWidth: 860, position: 'relative' }}>
            <FloatingProduct
              src="/images/home_conversational_erp.png"
              alt="Flowtaris AI Finance Dashboard"
              frames={['/images/home_conversational_erp.png', '/images/home_predictive_analytics.png']}
              mouseParallax={true}
              parallaxStrength={0.12}
              autoRotate={true}
              rotationSpeed={10}
              width={860}
              height={540}
              borderRadius="20px"
              shadow={true}
              shadowIntensity={1.4}
            />
          </div>
        </div>
      </section>

      {/* ── Capabilities Grid ── */}
      <section style={{ padding: '96px 24px', background: 'rgba(255,255,255,0.01)' }} aria-labelledby="capabilities-heading">
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 72 }}>
            <p style={{ fontSize: 11, color: '#00b8db', textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 700, marginBottom: 16, fontFamily: "'Inter', sans-serif" }}>Platform Capabilities</p>
            <h2 id="capabilities-heading" className="text-display-md text-gradient-brand" style={{ marginBottom: 20 }}>
              Six Production-Grade AI Capabilities
            </h2>
            <p className="text-headline-sm" style={{ color: 'rgba(255,255,255,0.45)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>
              Covering the full finance automation lifecycle — from document ingestion to governance.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: 24 }}>
            {capabilities.map((cap, i) => (
              <article key={i} className="glass-card" style={{ padding: '32px 28px', borderRadius: 20, transition: 'transform 0.25s', cursor: 'default', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{cap.icon}</div>
                <p style={{ fontSize: 10, color: '#00b8db', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, marginBottom: 8 }}>{cap.category}</p>
                <h3 className="text-headline-sm" style={{ color: '#ffffff', marginBottom: 12 }}>{cap.name}</h3>
                <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.65, marginBottom: 20 }}>{cap.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {cap.platforms.map((p) => (
                    <Badge key={p} variant="ghost" className="text-body-xs">{p}</Badge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section style={{ padding: '96px 24px' }}>
        <div className="glass-card" style={{ maxWidth: 820, margin: '0 auto', padding: '72px 48px', borderRadius: 32, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 500, height: 300, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,184,219,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <h2 className="text-display-sm text-gradient-brand" style={{ marginBottom: 16 }}>
            Ready to automate your finance operations?
          </h2>
          <p className="text-headline-sm" style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 40, maxWidth: 520, margin: '0 auto 40px', lineHeight: 1.6 }}>
            Get a free AI readiness assessment and personalized roadmap in 3 minutes.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center' }}>
            <a href="/assessment" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px', borderRadius: 99,
              background: 'linear-gradient(135deg, #00b8db, #0096b3)',
              color: '#05050a', fontWeight: 700, fontSize: 16, textDecoration: 'none',
              boxShadow: '0 0 30px rgba(0,184,219,0.35)', fontFamily: "'Inter', sans-serif",
            }}>
              Start Free Assessment →
            </a>
            <a href="/roi-calculator" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '16px 36px', borderRadius: 99,
              background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.8)',
              fontWeight: 600, fontSize: 16, textDecoration: 'none',
              border: '1px solid rgba(255,255,255,0.14)', fontFamily: "'Inter', sans-serif",
            }}>
              Calculate ROI
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.07)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 24px', justifyContent: 'center' }}>
            {['Capabilities', 'Case Studies', 'Assessment', 'ROI Calculator', 'Insights', 'Platforms', 'About', 'Contact'].map((link) => (
              <a key={link} href={`/${link.toLowerCase().replace(/ /g, '-')}`}
                className="text-body-sm"
                style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}>
                {link}
              </a>
            ))}
          </div>
          <p className="text-body-sm" style={{ color: 'rgba(255,255,255,0.2)' }}>
            © 2024 Flowtaris AI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}