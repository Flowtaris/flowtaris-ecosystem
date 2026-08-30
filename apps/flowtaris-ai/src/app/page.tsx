import { Metadata } from 'next'
import { Badge } from '@repo/ui'
import { HomeHero } from './HomeHero'
import TrustSignalsSection from '../components/TrustSignalsSection'
import DualVisionSection from '../components/DualVisionSection'
import IntelligenceSuiteSection from '../components/IntelligenceSuiteSection'
import CapabilitiesSection from '../components/CapabilitiesSection'
import CtaCostSection from '../components/CtaCostSection'

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

      {/* ── CTA: Cost of Inaction Counter ── */}
      <CtaCostSection />

    </div>
  )
}