import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@repo/ui'
import { ArrowRight, ChevronRight, CheckCircle, XCircle, Clock, DollarSign, Users, Shield, Zap, BarChart3, TrendingUp, ArrowUpRight, ArrowDownRight, Minus, BookOpen, ExternalLink } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

const caseStudyData: Record<string, any> = {
  'global-saas-decacorn': {
    client: 'Global SaaS Decacorn',
    industry: 'SaaS',
    platforms: ['NetSuite', 'Coupa'],
    challenge: 'Processing 50K+ invoices/month manually across 12 subsidiaries with 4-day cycle times',
    solution: 'GenAI Document Intelligence + Autonomous Workflow Engine',
    metrics: [
      { label: 'Processing Time', before: '4 days', after: '3 minutes', improvement: 99, unit: 'reduction' },
      { label: 'Manual Hours', before: '2,400/mo', after: '120/mo', improvement: 95, unit: 'reduction' },
      { label: 'Error Rate', before: '3.2%', after: '0.08%', improvement: 97, unit: 'reduction' },
      { label: 'Annual Savings', value: '$4.5M', unit: 'currency' },
      { label: 'Invoices Processed', value: '600K+/yr', unit: 'volume' },
      { label: 'FTE Freed', value: '18', unit: 'people' },
    ],
    timeline: '3 months',
    teamSize: 8,
    capabilities: ['genai-doc-intelligence', 'autonomous-workflow-engine'],
    testimonial: {
      quote: 'We went from drowning in manual invoice processing to near-full automation in 90 days. The ROI was visible in month 2.',
      author: 'VP of Finance Operations',
      role: 'Global SaaS Decacorn',
    },
    details: {
      background: 'A $10B+ SaaS company with 12 global subsidiaries processing 50,000+ invoices monthly. Each subsidiary had unique invoice formats, languages, and approval workflows, creating a fragmented process that required 2,400 manual hours per month.',
      approach: 'Deployed GenAI Document Intelligence for multi-format, multi-language document understanding, paired with Autonomous Workflow Engine for intelligent routing and exception handling. Implemented in 3 phases: pilot (1 subsidiary), regional rollout (4 subsidiaries), global deployment (all 12).',
      results: [
        '99% reduction in invoice processing time (4 days → 3 minutes)',
        '95% reduction in manual hours (2,400 → 120 hrs/month)',
        '97% reduction in error rate (3.2% → 0.08%)',
        '$4.5M annual cost savings',
        '18 FTEs redeployed to strategic finance initiatives',
        '100% compliance audit pass rate',
      ],
      technicalHighlights: [
        'Processes 15+ document formats across 8 languages',
        '99.2% field extraction accuracy on first pass',
        'Sub-3-minute end-to-end processing SLA',
        'Real-time NetSuite + Coupa bidirectional sync',
        'Automated 3-way matching (PO, receipt, invoice)',
        'Built-in SOC2 Type II compliance controls',
      ],
    },
  },
  'fintech-unicorn': {
    client: 'FinTech Unicorn',
    industry: 'FinTech',
    platforms: ['SAP', 'Workday'],
    challenge: 'Cash flow forecasting accuracy below 60% causing liquidity events and emergency borrowing',
    solution: 'Predictive Analytics + Integration Health Monitoring',
    metrics: [
      { label: 'Forecast Accuracy', before: '58%', after: '92%', improvement: 58, unit: 'improvement' },
      { label: 'Liquidity Events', before: '12/yr', after: '0/yr', improvement: 100, unit: 'reduction' },
      { label: 'Manual Analysis', before: '40 hrs/wk', after: '2 hrs/wk', improvement: 95, unit: 'reduction' },
      { label: 'Risk Reduction', value: '$12M', unit: 'currency' },
      { label: 'Models Deployed', value: '4', unit: 'count' },
      { label: 'Data Sources', value: '23', unit: 'count' },
    ],
    timeline: '4 months',
    teamSize: 6,
    capabilities: ['predictive-analytics', 'integration-health-monitoring'],
    testimonial: {
      quote: 'For the first time in company history, we have 90%+ cash flow visibility 30 days out. Zero liquidity events since deployment.',
      author: 'CFO',
      role: 'FinTech Unicorn',
    },
    details: {
      background: 'A $3B valuation FinTech operating across SAP S/4HANA and Workday Financial Management. Cash flow forecasting relied on spreadsheets updated weekly by 3 analysts, achieving only 58% accuracy at 30-day horizon. 12 liquidity events in 2023 required emergency credit facility draws.',
      approach: 'Implemented Predictive Analytics with 4 specialized models (AR, AP, payroll, tax) trained on 3 years of transaction history across 23 data sources. Added Integration Health Monitoring for real-time data quality alerts. 4-month phased rollout: data pipeline (month 1), model training (month 2), validation (month 3), production (month 4).',
      results: [
        '92% forecast accuracy at 30 days (58% → 92%)',
        'Zero liquidity events in 12 months post-deployment',
        '95% reduction in manual analysis time (40 → 2 hrs/week)',
        '$12M risk reduction from eliminated emergency borrowing',
        'Board-level dashboards with drill-down to transaction level',
        'Automated variance alerts with root-cause attribution',
      ],
      technicalHighlights: [
        '4 ensemble models (XGBoost + LSTM + Transformer)',
        '23 data sources: ERP, banking, payroll, tax, market',
        'Real-time feature store with 15-min freshness',
        'Automated retraining pipeline (weekly)',
        'Model explainability with SHAP values',
        'Integration health: 99.9% uptime detection',
      ],
    },
  },
  'healthcare-manufacturing': {
    client: 'Healthcare Manufacturing Co',
    industry: 'Manufacturing',
    platforms: ['NetSuite', 'SAP'],
    challenge: 'PO matching errors causing 15% payment delays and 43 vendor disputes/month',
    solution: 'GenAI Document Intelligence + AI Governance & Compliance',
    metrics: [
      { label: 'PO Match Rate', before: '78%', after: '99.5%', improvement: 27, unit: 'improvement' },
      { label: 'Payment Delays', before: '15%', after: '0.5%', improvement: 97, unit: 'reduction' },
      { label: 'Vendor Disputes', before: '43/mo', after: '2/mo', improvement: 95, unit: 'reduction' },
      { label: 'Compliance Score', value: 'SOC2 Type II', unit: 'certification' },
      { label: 'Audit Findings', before: '12/yr', after: '0/yr', improvement: 100, unit: 'reduction' },
      { label: 'Processing Cost', value: '$2.8M/yr saved', unit: 'currency' },
    ],
    timeline: '5 months',
    teamSize: 10,
    capabilities: ['genai-doc-intelligence', 'ai-governance-compliance'],
    testimonial: {
      quote: 'Vendor relationships transformed from adversarial to strategic. Audit readiness is now continuous, not a fire drill.',
      author: 'Director of Procurement',
      role: 'Healthcare Manufacturing Co',
    },
    details: {
      background: 'A $2B healthcare manufacturer with dual ERP (NetSuite for US, SAP for EU). 3,000+ PO lines/month with complex line-item matching requirements. 78% first-pass match rate led to 15% payment delays, 43 vendor disputes/month, and 12 audit findings annually. FDA and EU MDR compliance added regulatory pressure.',
      approach: 'GenAI Document Intelligence for intelligent 3-way matching (PO, receipt, invoice) with tolerance rules. AI Governance & Compliance layer for automated SOX controls, audit trails, and regulatory reporting. 5-month implementation: data harmonization (month 1), matching logic (month 2), governance layer (month 3), UAT (month 4), production (month 5).',
      results: [
        '99.5% first-pass PO match rate (78% → 99.5%)',
        '97% reduction in payment delays (15% → 0.5%)',
        '95% reduction in vendor disputes (43 → 2/month)',
        'Zero audit findings in first year post-deployment',
        'Achieved SOC2 Type II + ISO 27001 certification',
        '$2.8M annual processing cost reduction',
      ],
      technicalHighlights: [
        'Multi-ERP data harmonization layer',
        'Configurable tolerance rules per vendor/category',
        'Automated exception routing with SLA tracking',
        'Continuous compliance monitoring (SOX, FDA, EU MDR)',
        'Audit-ready trails with immutable logs',
        'Vendor portal for self-service dispute resolution',
      ],
    },
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = caseStudyData[slug]

  if (!data) {
    return { title: 'Case Study Not Found' }
  }

  return {
    title: `${data.client} | Case Study | Flowtaris AI`,
    description: `${data.client} achieved ${data.metrics.find((m: any) => m.value?.includes('M') || m.label === 'Annual Savings')?.value || 'significant results'} with Flowtaris AI ${data.capabilities.join(', ')}.`,
    openGraph: {
      title: `${data.client} | Case Study | Flowtaris AI`,
      description: data.challenge,
      type: 'article',
    },
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const data = caseStudyData[slug]

  if (!data) {
    notFound()
  }

  const capabilitiesDisplay = data.capabilities.map((cap: string) =>
    cap.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
  ).join(' + ')

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: data.client,
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: data.challenge,
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Start Assessment', variant: 'default', className: 'glass-strong', href: `/assessment?industry=${data.industry.toLowerCase()}` },
          secondary: { label: 'Calculate ROI', variant: 'outline', className: 'glass', href: `/roi-calculator?platform=${data.platforms[0].toLowerCase()}` },
        }}
        stats={{
          items: data.metrics.slice(0, 4).map((m: any) => ({
            label: m.value || m.after || `${m.improvement}%`,
            value: m.label,
          })),
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        {/* Solution Overview */}
        <section className="py-24 px-6" aria-labelledby="solution-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <span className="badge-badge badge-success text-body-sm">
                  {data.timeline} Implementation
                </span>
                <span className="badge-badge badge-outline text-body-sm">
                  {data.teamSize} Person Team
                </span>
                <span className="badge-badge badge-info text-body-sm">
                  {data.industry}
                </span>
                {data.platforms.map((p: string) => (
                  <Badge key={p} variant="ghost" className="text-body-sm px-3 py-1">
                    {p}
                  </Badge>
                ))}
              </div>

              <header className="text-center max-w-3xl mx-auto">
                <h2 id="solution-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  The Solution: {capabilitiesDisplay}
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  {data.solution}
                </p>
              </header>

              <Grid columns={{ base: 1, md: 2 }} gap={6} className="w-full">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-brand-cyan-400" />
                      <CardTitle className="text-headline-sm">Challenge</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-md text-neutral-300">{data.details.background}</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <ArrowRight className="h-5 w-5 text-brand-green-400" />
                      <CardTitle className="text-headline-sm">Approach</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-body-md text-neutral-300">{data.details.approach}</p>
                  </CardContent>
                </Card>
              </Grid>

              {/* Testimonial */}
              <Card className="glass-strong border border-brand-cyan-500/30 bg-gradient-to-r from-brand-cyan-500/5 to-transparent">
                <CardContent className="p-8 md:p-12">
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="flex justify-center gap-2 mb-6">
                      <Shield className="h-6 w-6 text-brand-cyan-400" />
                      <Shield className="h-6 w-6 text-brand-cyan-400" />
                      <Shield className="h-6 w-6 text-brand-cyan-400" />
                      <Shield className="h-6 w-6 text-brand-cyan-400" />
                      <Shield className="h-6 w-6 text-brand-cyan-400" />
                    </div>
                    <blockquote className="text-display-sm text-white mb-6 text-balance leading-relaxed">
                      "{data.testimonial.quote}"
                    </blockquote>
                    <footer className="text-neutral-400">
                      <p className="font-medium text-white">{data.testimonial.author}</p>
                      <p className="text-body-sm">{data.testimonial.role}</p>
                    </footer>
                  </div>
                </CardContent>
              </Card>
            </Stack>
          </Container>
        </section>

        {/* Key Metrics */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="metrics-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="metrics-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Measured Results
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Production metrics from {data.timeline} post-deployment
                </p>
              </header>

              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {data.metrics.map((metric: any, i: number) => (
                  <div key={metric.label} className="glass-strong p-6 rounded-2xl group interactive relative overflow-hidden" style={{ animationDelay: `${i * 100}ms` }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-cyan-500/20 flex items-center justify-center">
                        {metric.unit === 'currency' && <DollarSign className="h-6 w-6 text-brand-cyan-400" />}
                        {metric.unit === 'improvement' && <TrendingUp className="h-6 w-6 text-brand-green-400" />}
                        {metric.unit === 'reduction' && <ArrowDownRight className="h-6 w-6 text-brand-red-400" />}
                        {metric.unit === 'volume' && <BarChart3 className="h-6 w-6 text-brand-purple-400" />}
                        {metric.unit === 'people' && <Users className="h-6 w-6 text-brand-amber-400" />}
                        {metric.unit === 'certification' && <Shield className="h-6 w-6 text-brand-cyan-400" />}
                        {metric.unit === 'count' && <CheckCircle className="h-6 w-6 text-brand-green-400" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-number-xl font-display tabular-nums text-white mb-1">
                          {metric.value || metric.after}
                        </div>
                        {metric.before && metric.improvement && (
                          <div className="flex items-center gap-2 text-body-sm mb-2">
                            <span className="text-neutral-500 line-through">{metric.before}</span>
                            <span className={`badge-badge ${metric.unit === 'reduction' ? 'badge-danger' : 'badge-success'} text-body-xs px-2 py-0.5`}>
                              {metric.improvement}% {metric.unit === 'reduction' ? 'reduction' : 'improvement'}
                            </span>
                          </div>
                        )}
                        <p className="text-body-sm text-neutral-400">{metric.label}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Stack>
          </Container>
        </section>

        {/* Detailed Results */}
        <section className="py-24 px-6" aria-labelledby="results-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="results-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Outcome Summary
                </h2>
              </header>

              <Grid columns={{ base: 1, md: 2 }} gap={6} className="w-full">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="h-5 w-5 text-brand-green-400" />
                      <CardTitle className="text-headline-sm">Key Results</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.details.results.map((result: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-body-md text-neutral-300">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-brand-green-400 mt-0.5" />
                          <span>{result}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-brand-purple-400" />
                      <CardTitle className="text-headline-sm">Technical Highlights</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.details.technicalHighlights.map((highlight: string, i: number) => (
                        <li key={i} className="flex items-start gap-3 text-body-md text-neutral-300">
                          <Zap className="h-5 w-5 flex-shrink-0 text-brand-purple-400 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">
                Want These Results for Your Organization?
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Take our 3-minute diagnostic to get a personalized AI automation roadmap with capability recommendations for your ERP and industry.
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

        {/* Back to Case Studies */}
        <section className="py-12 px-6">
          <Container size="xl">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/case-studies">
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  All Case Studies
                </a>
              </Button>
              <span className="text-body-sm text-neutral-500">← Back to case studies</span>
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