import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack } from '@repo/ui'
import { CascadingCardStack } from '@repo/ui'
import { Button } from '@repo/ui'
import { ArrowRight, Zap, Shield, BarChart3, Code2, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Capabilities | Flowtaris AI',
  description: 'Explore 6 enterprise AI capabilities for NetSuite, Coupa, SAP, and Workday automation. From GenAI Document Intelligence to AI Governance.',
  openGraph: {
    title: 'AI Capabilities | Flowtaris AI',
    description: 'Explore 6 enterprise AI capabilities for NetSuite, Coupa, SAP, and Workday automation.',
    type: 'website',
  },
}

const capabilities = [
  {
    slug: 'genai-doc-intelligence',
    title: 'GenAI Document Intelligence',
    category: 'GenAI',
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
    maturity: 'production',
    metric: '85% faster processing',
    icon: '📄',
    description: 'Automate invoice, PO, and contract processing with LLMs that understand context, not just keywords.',
  },
  {
    slug: 'predictive-analytics',
    title: 'Predictive Analytics',
    category: 'ML',
    platforms: ['NetSuite', 'SAP', 'Workday'],
    maturity: 'pilot',
    metric: '92% forecast accuracy',
    icon: '📈',
    description: 'Forecast cash flow, detect anomalies, and predict payment delays before they happen.',
  },
  {
    slug: 'autonomous-workflow',
    title: 'Autonomous Workflow Engine',
    category: 'Workflow',
    platforms: ['NetSuite', 'Coupa', 'SAP'],
    maturity: 'production',
    metric: '3-day implementation',
    icon: '⚙️',
    description: 'Self-healing workflows that adapt to ERP changes without code modifications.',
  },
  {
    slug: 'conversational-erp',
    title: 'Conversational ERP Interface',
    category: 'GenAI',
    platforms: ['NetSuite', 'Workday', 'Salesforce'],
    maturity: 'research',
    metric: 'Natural language → SQL',
    icon: '💬',
    description: 'Chat with your ERP. Ask questions, run reports, execute transactions in plain English.',
  },
  {
    slug: 'integration-monitoring',
    title: 'Integration Health Monitoring',
    category: 'RPA',
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
    maturity: 'production',
    metric: '99.9% uptime detection',
    icon: '🔍',
    description: 'Real-time visibility into iPaaS, API, and custom integration health with auto-remediation.',
  },
  {
    slug: 'ai-governance',
    title: 'AI Governance & Compliance',
    category: 'Governance',
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
    maturity: 'pilot',
    metric: 'SOC2 + EU AI Act ready',
    icon: '🛡️',
    description: 'Audit trails, bias detection, and compliance reporting for every AI-driven decision.',
  },
]

export default function CapabilitiesPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Enterprise AI<br />Capabilities',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Six production-ready AI capabilities built for NetSuite, Coupa, SAP, and Workday. Each capability delivers measurable ROI through automation, intelligence, and governance.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        ctas={[
          { label: 'Start Assessment', variant: 'primary', href: '/assessment' },
          { label: 'ROI Calculator', variant: 'secondary', href: '/roi-calculator' },
        ]}
        stats={[
          { label: '6', value: 'Capabilities' },
          { label: '4', value: 'Platforms' },
          { label: '85%', value: 'Avg Automation' },
          { label: '3mo', value: 'Avg Payback' },
        ]}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      <main className="flex-1 w-full">
        <section className="py-32 px-6" aria-labelledby="capabilities-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="capabilities-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Production-Ready AI for Enterprise ERP
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Each capability is battle-tested, platform-certified, and designed for measurable business impact.
                </p>
              </header>

              <CascadingCardStack
                cards={capabilities.map((cap) => ({
                  id: cap.slug,
                  title: cap.title,
                  category: cap.category,
                  platforms: cap.platforms,
                  maturity: cap.maturity as 'production' | 'pilot' | 'research',
                  metric: cap.metric,
                  icon: cap.icon,
                  description: cap.description,
                  href: `/capabilities/${cap.slug}`,
                }))}
                perspective={1000}
                staggerDelay={100}
                itemHeight={460}
                gap={24}
                className="w-full"
              />
            </Stack>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-12 md:p-16 text-center">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">
                Not Sure Where to Start?
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Take our 3-minute diagnostic to get a personalized AI automation roadmap tailored to your ERP, volume, and urgency.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="/assessment">
                  <Button size="lg" className="glass-strong px-10 py-4">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="/roi-calculator">
                  <Button variant="secondary" size="lg" className="glass px-10 py-4">
                    Calculate ROI First
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <Container size="xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
              Built with Flowtaris AI Design System
            </p>
            <div className="flex items-center gap-6">
              <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">All Capabilities</a>
              <a href="/case-studies" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Case Studies</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}