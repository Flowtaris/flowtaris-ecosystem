import { Metadata } from 'next'
import { HeroPattern, Badge, FloatingProduct } from '@repo/ui'
import Script from 'next/script'

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
      <HeroPattern
        headline={{
          text: 'AI Automation\nfor Enterprise Finance',
          animateOnMount: true,
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP — native on NetSuite, Coupa, SAP, and Workday.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        ctas={[
          { label: 'Start Free Assessment', variant: 'primary', href: '/assessment' },
          { label: 'Calculate Your ROI', variant: 'secondary', href: '/roi-calculator' },
        ]}
        stats={{
          items: [
            { label: '200+', value: 'Enterprise Customers' },
            { label: '95%', value: 'Automation Rate' },
            { label: '$50M+', value: 'Annual Savings' },
            { label: '4', value: 'Platforms' },
          ],
        }}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      {/* Trust Signals Bar */}
      <section
        className="border-t border-white/10 py-12 px-6"
        aria-labelledby="trust-heading"
      >
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-body-xs text-neutral-500 uppercase tracking-widest mb-8">Compliance & Reliability</p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {trustSignals.map((signal, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-center glass-card p-4 md:p-6 min-w-[120px] transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-number-lg font-display text-gradient-cyan tabular-nums">
                  {signal.value}
                </span>
                <span className="text-body-xs text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
                  {signal.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content sections */}
      <main className="flex-1 w-full">
        {/* Featured AI Interface Showcase */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <p className="text-body-sm text-brand-cyan-400 uppercase tracking-widest font-semibold mb-4">Live AI Dashboard</p>
              <h2 className="text-display-sm text-gradient-brand mb-6">
                Intelligence you can see and interact with
              </h2>
              <p className="text-headline-sm text-neutral-400 mb-8 leading-relaxed">
                Experience the power of our conversational ERP interface and predictive analytics engines.
                Our platform doesn&apos;t just process data—it visualizes it, predicts trends, and answers your questions in real-time.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="/assessment" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong text-white font-semibold text-body-md hover:scale-105 transition-transform duration-200">
                  See a Demo →
                </a>
                <a href="/capabilities" className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass text-white/80 font-medium text-body-md border border-white/10 hover:scale-105 transition-transform duration-200">
                  All Capabilities
                </a>
              </div>
            </div>
            <div className="lg:w-1/2 relative w-full flex justify-center items-center py-12">
              <div className="relative z-10 w-full max-w-[600px]">
                <FloatingProduct
                  src="/images/home_conversational_erp.png"
                  alt="Flowtaris AI Finance Dashboard"
                  frames={[
                    '/images/home_conversational_erp.png',
                    '/images/home_predictive_analytics.png'
                  ]}
                  mouseParallax={true}
                  parallaxStrength={0.15}
                  autoRotate={true}
                  rotationSpeed={12}
                  width={600}
                  height={450}
                  borderRadius="16px"
                  shadow={true}
                  shadowIntensity={1.5}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities Grid */}
        <section className="py-32 px-6" aria-labelledby="capabilities-heading">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-24">
              <p className="text-body-sm text-brand-cyan-400 uppercase tracking-widest font-semibold mb-4">Platform Capabilities</p>
              <h2 id="capabilities-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                Six Production-Grade AI Capabilities
              </h2>
              <p className="text-headline-md text-neutral-400 max-w-2xl mx-auto text-balance">
                Covering the full finance automation lifecycle — from document ingestion to governance.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((feature, i) => (
                <article key={feature.name} className="glass-card group interactive relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-8">
                    <div className="text-4xl mb-5">{feature.icon}</div>
                    <p className="text-body-xs text-brand-cyan-400 uppercase tracking-widest font-semibold mb-2">{feature.category}</p>
                    <h3 className="text-headline-sm text-white mb-3">{feature.name}</h3>
                    <p className="text-body-sm text-neutral-400 mb-5 leading-relaxed">{feature.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.platforms.map((platform) => (
                        <Badge key={platform} variant="ghost" className="text-body-xs px-2 py-1">{platform}</Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto glass-card p-16 text-center relative overflow-hidden">
            <div aria-hidden="true" className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-brand-cyan-500/10 blur-[80px] pointer-events-none" />
            <h2 className="text-display-md text-gradient-brand text-balance mb-6 relative">
              Ready to automate your finance operations?
            </h2>
            <p className="text-headline-sm text-neutral-400 mb-10 max-w-xl mx-auto text-balance">
              Get a free AI readiness assessment and personalized roadmap in 3 minutes.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/assessment" className="inline-flex items-center gap-2 px-10 py-4 rounded-full glass-strong text-white font-bold text-body-lg hover:scale-105 transition-transform duration-200">
                Start Free Assessment →
              </a>
              <a href="/roi-calculator" className="inline-flex items-center gap-2 px-10 py-4 rounded-full glass text-white/80 font-semibold text-body-lg border border-white/15 hover:scale-105 transition-transform duration-200">
                Calculate ROI
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-body-sm text-neutral-500">
            © 2024 Flowtaris AI. All rights reserved.
          </p>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Capabilities</a>
            <a href="/case-studies" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Case Studies</a>
            <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
            <a href="/insights" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Insights</a>
            <a href="/about" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">About</a>
            <a href="/contact" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}