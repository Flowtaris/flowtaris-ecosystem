import { Metadata } from 'next'
import { HeroPattern, Badge, FloatingProduct } from '@repo/ui'
import Script from 'next/script'
import { softwareApplicationSchema, speakableSchema } from '@flowtaris/seo'

export const metadata: Metadata = {
  title: 'Flowtaris AI | Enterprise AI Automation for Finance',
  description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics, and Conversational ERP for NetSuite, Coupa, SAP, and Workday.',
  openGraph: {
    title: 'Flowtaris AI | Enterprise AI Automation for Finance',
    description: 'Enterprise AI automation for finance teams. GenAI Document Intelligence, Autonomous Workflows, Predictive Analytics.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify([
      {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Flowtaris AI - Enterprise AI Automation for Finance',
        description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams.',
        publisher: {
          '@type': 'Organization',
          name: 'Flowtaris',
        },
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: [
            'GenAI Document Intelligence',
            'Autonomous Workflow Engine',
            'Predictive Analytics',
            'Conversational ERP Interface',
            'Integration Health Monitoring',
            'AI Governance & Compliance',
          ].map((name, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Service',
              name,
              provider: { '@type': 'Organization', name: 'Flowtaris' },
            },
          })),
        },
      },
      speakableSchema(['#capabilities-heading']),
    ]),
  },
}

const trustSignals = [
  { label: 'SOC 2 Type II', value: 'Certified' },
  { label: 'GDPR', value: 'Compliant' },
  { label: 'ISO 27001', value: 'Certified' },
  { label: '99.99%', value: 'Uptime SLA' },
  { label: '50M+', value: 'API Calls/Day' },
  { label: 'Fortune 500', value: 'Trusted By' },
]

const capabilities = [
  { name: 'GenAI Document Intelligence', category: 'Document Processing', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'Autonomous Workflow Engine', category: 'Process Automation', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'Predictive Analytics', category: 'Finance Intelligence', platforms: ['NetSuite', 'SAP', 'Workday'] },
  { name: 'Conversational ERP Interface', category: 'Human-Computer Interaction', platforms: ['NetSuite', 'Workday'] },
  { name: 'Integration Health Monitoring', category: 'Observability', platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'] },
  { name: 'AI Governance & Compliance', category: 'Risk & Compliance', platforms: ['SAP', 'Coupa'] },
]

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <Script
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebPage',
          name: 'Flowtaris AI - Enterprise AI Automation for Finance',
          description: 'Flowtaris AI builds enterprise-grade AI automation for finance teams.',
          publisher: {
            '@type': 'Organization',
            name: 'Flowtaris',
          },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: capabilities.map((cap, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: softwareApplicationSchema({
                name: cap.name,
                description: cap.category,
                category: cap.category,
                platforms: cap.platforms,
              }),
            })),
          },
        }) }}
      />
      <HeroPattern
        headline={{
          text: 'AI Automation<br />for Enterprise Finance',
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
          <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
            {trustSignals.map((signal, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 text-center glass-card p-4 md:p-6 min-w-[140px] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-cyan-500/10"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <span className="text-number-lg font-display text-gradient-cyan tabular-nums">
                  {signal.value}
                </span>
                <span className="text-body-sm text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
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
              <h2 className="text-display-sm text-gradient-brand mb-6">
                Intelligence you can see and interact with
              </h2>
              <p className="text-headline-sm text-neutral-400 mb-8 leading-relaxed">
                Experience the power of our conversational ERP interface and predictive analytics engines. 
                Our platform doesn't just process data—it visualizes it, predicts trends, and answers your questions in real-time.
              </p>
            </div>
            <div className="lg:w-1/2 relative w-full flex justify-center items-center py-12">
              <div className="relative z-10 w-full max-w-[600px]">
                <FloatingProduct
                  src="/images/home_conversational_erp.png"
                  alt="Flowtaris Conversational ERP"
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

        <section className="py-32 px-6" aria-labelledby="capabilities-heading">
          <div className="max-w-7xl mx-auto">
            <header className="text-center mb-24">
              <h2 id="capabilities-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                Our AI Capabilities
              </h2>
              <p className="text-headline-md text-neutral-400 max-w-2xl mx-auto text-balance">
                Six production-grade capabilities covering the full finance automation lifecycle.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((feature, i) => (
                <article key={feature.name} className="glass-card group interactive relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 p-6">
                    <h3 className="text-headline-sm text-white mb-3">{feature.name}</h3>
                    <Badge variant="outline" className="text-body-xs mb-4">{feature.category}</Badge>
                    <p className="text-body-sm text-neutral-400 mb-4">Platforms: {feature.platforms.join(', ')}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {feature.platforms.slice(0, 3).map((platform) => (
                        <Badge key={platform} variant="ghost" className="text-body-xs px-2 py-1">{platform}</Badge>
                      ))}
                      {feature.platforms.length > 3 && (
                        <Badge variant="ghost" className="text-body-xs px-2 py-1">+{feature.platforms.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
            Built with Flowtaris AI Design System
          </p>
          <div className="flex items-center gap-6">
            <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Capabilities</a>
            <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            <a href="/roi-calculator" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">ROI Calculator</a>
          </div>
        </div>
      </footer>
    </div>
  )
}