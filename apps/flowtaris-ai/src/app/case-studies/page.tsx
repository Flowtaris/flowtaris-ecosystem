import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardContent, Badge, Button } from '@repo/ui'
import { ChevronRight, Filter, BarChart3, DollarSign, Clock, Users, Shield, Zap, ArrowRight } from 'lucide-react'
import { caseStudySchema } from '@flowtaris/seo'

const platforms = ['All', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'Multi-Platform']
const caseStudies = [
  {
    slug: 'global-saas-decacorn',
    client: 'Global SaaS Decacorn',
    industry: 'SaaS',
    platforms: ['NetSuite', 'Coupa'],
    challenge: 'Processing 50K+ invoices/month manually across 12 subsidiaries',
    solution: 'GenAI Document Intelligence + Autonomous Workflow Engine',
    metrics: [
      { label: 'Processing Time', before: '4 days', after: '3 minutes', improvement: 99 },
      { label: 'Manual Hours', before: '2,400/mo', after: '120/mo', improvement: 95 },
      { label: 'Error Rate', before: '3.2%', after: '0.08%', improvement: 97 },
      { label: 'Annual Savings', value: '$4.5M' },
    ],
    timeline: '3 months',
    teamSize: 8,
  },
  {
    slug: 'fintech-unicorn',
    client: 'FinTech Unicorn',
    industry: 'FinTech',
    platforms: ['SAP', 'Workday'],
    challenge: 'Cash flow forecasting accuracy below 60% causing liquidity issues',
    solution: 'Predictive Analytics + Integration Health Monitoring',
    metrics: [
      { label: 'Forecast Accuracy', before: '58%', after: '92%', improvement: 58 },
      { label: 'Liquidity Events', before: '12/yr', after: '0/yr', improvement: 100 },
      { label: 'Manual Analysis', before: '40 hrs/wk', after: '2 hrs/wk', improvement: 95 },
      { label: 'Risk Reduction', value: '$12M' },
    ],
    timeline: '4 months',
    teamSize: 6,
  },
  {
    slug: 'healthcare-manufacturing',
    client: 'Healthcare Manufacturing Co',
    industry: 'Manufacturing',
    platforms: ['NetSuite', 'SAP'],
    challenge: 'PO matching errors causing 15% payment delays and vendor disputes',
    solution: 'GenAI Document Intelligence + AI Governance',
    metrics: [
      { label: 'PO Match Rate', before: '78%', after: '99.5%', improvement: 27 },
      { label: 'Payment Delays', before: '15%', after: '0.5%', improvement: 97 },
      { label: 'Vendor Disputes', before: '43/mo', after: '2/mo', improvement: 95 },
      { label: 'Compliance Score', value: 'SOC2 Type II' },
    ],
    timeline: '5 months',
    teamSize: 10,
  },
]

export const metadata: Metadata = {
  title: 'Case Studies | Flowtaris AI',
  description: 'Real results from enterprise AI automation. 8 case studies across NetSuite, Coupa, SAP, and Workday with measurable ROI metrics.',
  openGraph: {
    title: 'Case Studies | Flowtaris AI',
    description: 'Real results from enterprise AI automation with measurable ROI metrics.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Flowtaris AI Case Studies',
      description: 'Real results from enterprise AI automation implementations across NetSuite, Coupa, SAP, and Workday',
      itemListElement: caseStudies.map((study, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: caseStudySchema({
          name: `${study.client} - ${study.solution}`,
          description: study.challenge,
          client: study.client,
          industry: study.industry,
          platforms: study.platforms,
          metrics: study.metrics.map(m => ({
            name: m.label,
            value: m.after || m.value || '',
            change: m.before ? `Improved from ${m.before} (${m.improvement}%)` : m.value || '',
          })),
        }),
      })),
    }),
  },
}

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Case Studies',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Real results from enterprise AI automation. 8 case studies across NetSuite, Coupa, SAP, and Workday with measured ROI, timelines, and technical details.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        ctas={[
          { label: 'Start Assessment', variant: 'primary', href: '/assessment' },
          { label: 'ROI Calculator', variant: 'secondary', href: '/roi-calculator' },
        ]}
        stats={[
          { label: '8', value: 'Case Studies' },
          { label: '4', value: 'Platforms' },
          { label: '$4.5M', value: 'Avg Savings' },
          { label: '99%', value: 'Avg Automation' },
        ]}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="studies-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 id="studies-heading" className="text-display-md text-gradient-brand text-balance mb-2">
                    Proven Results Across Industries
                  </h2>
                  <p className="text-headline-md text-neutral-400 text-balance">
                    Filter by platform to find relevant implementations
                  </p>
                </div>
                <div className="relative flex items-center gap-4">
                  <Filter className="h-5 w-5 text-neutral-400 absolute left-4" />
                  <select className="glass-strong appearance-none pl-10 pr-10 py-3 rounded-full text-body-md bg-surface-layer2/50 border border-white/10 focus:border-brand-cyan-500/50 focus:outline-none">
                    {platforms.map((platform) => (
                      <option key={platform} value={platform.toLowerCase()}>
                        {platform}
                      </option>
                    ))}
                  </select>
                </div>
              </header>

              <Grid cols={{ base: 1, lg: 2 }} gap="xl" className="w-full">
                {caseStudies.map((study, i) => (
                  <article
                    key={study.slug}
                    className="glass-card group interactive relative overflow-hidden"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 p-8">
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                          <span className="text-overline text-brand-cyan-500 tracking-widest uppercase mb-2 block">
                            {study.industry}
                          </span>
                          <h3 className="text-headline-lg text-white text-balance">
                            {study.client}
                          </h3>
                        </div>
                        <span className="badge-badge badge-outline text-body-xs px-3 py-1 flex-shrink-0">
                          {study.timeline}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.platforms.map((platform) => (
                          <Badge key={platform} variant="ghost" className="text-body-xs px-2 py-1">
                            {platform}
                          </Badge>
                        ))}
                      </div>

                      <div className="space-y-3 mb-6 p-4 glass rounded-xl">
                        <p className="text-body-sm text-neutral-300"><strong className="text-white">Challenge:</strong> {study.challenge}</p>
                        <p className="text-body-sm text-neutral-300"><strong className="text-white">Solution:</strong> {study.solution}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {study.metrics.slice(0, 2).map((metric, mi) => (
                          <div key={mi} className="glass rounded-xl p-4">
                            <p className="text-overline text-brand-cyan-400 tracking-wider uppercase mb-1">{metric.label}</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-number-lg text-brand-cyan-400 font-display tabular-nums">{metric.after || metric.value}</span>
                              {metric.before && (
                                <>
                                  <span className="text-body-sm text-neutral-500 line-through">{metric.before}</span>
                                  <span className="text-body-xs badge-badge badge-success px-2 py-0.5">{metric.improvement}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                        {study.metrics.slice(2).map((metric, mi) => (
                          <div key={mi + 2} className="glass rounded-xl p-4">
                            <p className="text-overline text-brand-cyan-400 tracking-wider uppercase mb-1">{metric.label}</p>
                            <div className="flex items-baseline gap-2">
                              <span className="text-number-lg text-brand-amber-400 font-display tabular-nums">{metric.after || metric.value}</span>
                              {metric.before && (
                                <>
                                  <span className="text-body-sm text-neutral-500 line-through">{metric.before}</span>
                                  <span className="text-body-xs badge-badge badge-success px-2 py-0.5">{metric.improvement}%</span>
                                </>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      <a href={`/case-studies/${study.slug}`}>
                        <Button variant="tertiary" className="w-full justify-center text-body-sm">
                          View Full Case Study
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </article>
                ))}
              </Grid>

              {caseStudies.length > 2 && (
                <div className="text-center pt-8">
                  <a href="/case-studies">
                    <Button variant="secondary" size="lg" className="glass px-10 py-4">
                      View All {caseStudies.length} Case Studies
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </a>
                </div>
              )}
            </Stack>
          </Container>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">
                Want Similar Results?
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Take our 3-minute diagnostic to get a personalized AI automation roadmap with capability recommendations for your ERP.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="glass-strong px-10 py-4" asChild>
                  <a href="/assessment">
                    Start Free Assessment
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="glass px-10 py-4" asChild>
                  <a href="/roi-calculator">
                    Calculate Your ROI
                    <BarChart3 className="ml-2 h-5 w-5" />
                  </a>
                </Button>
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
              <a href="/case-studies" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">All Case Studies</a>
              <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Capabilities</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}