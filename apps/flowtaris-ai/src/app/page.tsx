import { Metadata } from 'next'
import { Badge } from '@repo/ui'
import { HomeHero } from './HomeHero'
import TrustSignalsSection from '../components/TrustSignalsSection'
import DualVisionSection from '../components/DualVisionSection'
import IntelligenceSuiteSection from '../components/IntelligenceSuiteSection'
import CapabilitiesSection from '../components/CapabilitiesSection'

export const metadata: Metadata = {
  title: 'Flowtaris AI | Enterprise AI Automation for Finance',
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  openGraph: {
    title: 'Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics.',
    type: 'website',
  },
}



export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">

      {/* ── Animated Hero ── */}
      <HomeHero />

      {/* ── Dynamic Trust Signals ── */}
      <TrustSignalsSection />

      {/* ── Dual Vision: Flowtaris × Flowtaris AI ── */}
      <DualVisionSection />

      {/* ── Intelligence Suite: 4 Real Interactive Tools ── */}
      <IntelligenceSuiteSection />

      {/* ── Capabilities: Proof Wall Accordion ── */}
      <CapabilitiesSection />

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