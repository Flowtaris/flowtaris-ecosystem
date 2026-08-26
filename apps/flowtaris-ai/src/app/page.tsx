import { Metadata } from 'next'
import { Badge } from '@repo/ui'
import { HomeHero } from './HomeHero'
import TrustSignalsSection from '../components/TrustSignalsSection'
import DualVisionSection from '../components/DualVisionSection'
import IntelligenceSuiteSection from '../components/IntelligenceSuiteSection'
import CapabilitiesSection from '../components/CapabilitiesSection'
import CtaTerminalSection from '../components/CtaTerminalSection'

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

      {/* ── CTA Banner: Terminal Unlock ── */}
      <CtaTerminalSection />

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