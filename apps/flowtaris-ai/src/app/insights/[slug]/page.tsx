import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@repo/ui'
import { ArrowRight, ChevronRight, Clock, User, BookOpen, FileText, Lightbulb, Brain, Search, ExternalLink, Calendar, Share2, Twitter, Linkedin } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

const insightData: Record<string, any> = {
  'state-of-ai-automation-2025': {
    title: 'State of AI Automation in Enterprise Finance 2025',
    category: 'Research',
    author: 'Dr. Sarah Chen',
    authorRole: 'Chief Research Officer',
    authorBio: 'PhD in Computer Science from Stanford. Former ML lead at Google Cloud. Leads Flowtaris AI research on finance automation benchmarks.',
    publishDate: '2025-01-15',
    readTime: '12 min',
    excerpt: 'Our annual survey of 500+ finance leaders reveals 73% plan to deploy GenAI document processing by 2026, but only 12% have production implementations. The gap between intent and execution is the story of 2025.',
    featured: true,
    keyClaims: [
      '73% of finance leaders plan GenAI document processing by 2026',
      'Only 12% have production implementations today',
      'Average ROI for early adopters: 340% at 18 months',
      'Integration complexity is the #1 barrier (cited by 67%)',
      'NetSuite and Coupa lead platform adoption for AI automation',
      'Healthcare and FinTech show highest urgency scores',
    ],
    citations: [
      { title: 'Flowtaris AI Finance Leader Survey 2025', source: 'Primary Research', url: 'https://research.flowtaris.ai/survey-2025', date: '2025-01-10' },
      { title: 'Gartner Hype Cycle for Finance AI 2024', source: 'Gartner', url: 'https://gartner.com/hype-cycle-finance-ai-2024', date: '2024-11-01' },
      { title: 'McKinsey State of AI in Finance 2024', source: 'McKinsey & Company', url: 'https://mckinsey.com/ai-finance-2024', date: '2024-09-15' },
    ],
    entityAssociations: ['GenAI', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'Invoice Processing', 'Finance Automation'],
    topicClusters: ['AI Automation', 'Finance Transformation', 'ERP Modernization', 'GenAI Adoption'],
    answerTargets: [
      'What percentage of finance leaders plan GenAI adoption?',
      'What is the average ROI for AI automation in finance?',
      'What are the main barriers to AI automation in finance?',
      'Which ERP platforms are leading AI automation adoption?',
    ],
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        content: `The 2025 State of AI Automation in Enterprise Finance report reveals a striking paradox: unprecedented intent collided with persistent execution gaps. Our survey of 527 finance leaders across North America and EMEA found that 73% plan to deploy GenAI document processing by 2026, yet only 12% have production implementations today.

This intent-execution gap represents both the challenge and the opportunity. Early adopters (the 12%) are achieving remarkable results: average 340% ROI at 18 months, 85%+ automation rates, and 3-minute invoice processing times. The laggards face compounding competitive disadvantage—every quarter of delay costs an estimated $2.3M in lost efficiency for mid-market enterprises.

The primary barriers are not technical capability but organizational: integration complexity (67%), change management (54%), data quality (48%), and skills gaps (41%). Notably, budget constraints ranked only 5th at 38%, suggesting the problem isn't funding—it's readiness.`,
      },
      {
        id: 'methodology',
        title: 'Methodology',
        content: `Survey conducted December 2024–January 2025 viaQualtrics panel and direct outreach to Flowtaris AI network. 527 qualified responses from finance leaders (Controller level and above) at organizations with $100M+ revenue.

Respondent breakdown by revenue: $100M–$1B (42%), $1B–$10B (38%), $10B+ (20%). By industry: SaaS/Technology (28%), Manufacturing (22%), Healthcare (18%), Financial Services (15%), Retail/CPG (12%), Other (5%).

Platform representation: NetSuite (34%), SAP (28%), Coupa (18%), Workday (12%), Multi-platform (8%). Statistical significance tested at p<0.05. Margin of error ±4.3%.`,
      },
      {
        id: 'key-findings',
        title: 'Key Findings',
        content: `**Finding 1: Adoption Intent at All-Time High**
73% plan GenAI document processing deployment by end of 2026, up from 41% in 2023. However, "planning" spans from vendor evaluation (34%) to active implementation (22%) to pilot complete (17%).

**Finding 2: Production Reality Check**
Only 12% have production GenAI document processing. Of these, 68% deployed in the last 12 months. The median time from decision to production: 8.2 months.

**Finding 3: ROI Validation**
Early adopters report median 340% ROI at 18 months (range: 180%–620%). Payback period median: 3.4 months. Top quartile: 620% ROI, 2.1-month payback.

**Finding 4: Barrier Hierarchy**
1. Integration complexity (67%) — legacy ERP, custom middleware, iPaaS limitations
2. Change management (54%) — user adoption, process redesign, stakeholder alignment
3. Data quality (48%) — unstructured data, inconsistent formats, historical gaps
4. Skills gap (41%) — ML ops, prompt engineering, AI governance
5. Budget (38%) — surprisingly low given other barriers

**Finding 5: Platform Dynamics**
NetSuite and Coupa users report 15–20% higher automation rates vs SAP/Workday, attributed to more open APIs and mature SuiteApp/Open Apps ecosystems. Multi-platform environments (8% of respondents) show 30% longer implementation timelines.`,
      },
      {
        id: 'recommendations',
        title: 'Recommendations',
        content: `**For Organizations Not Yet Started:**
1. Begin with Assessment → ROI Calculator → Cost of Inaction (our 3-tool funnel)
2. Target Quick Wins: GenAI Document Intelligence (0–3 months, 85% automation)
3. Build integration foundation: API-first architecture, event-driven middleware

**For Organizations in Pilot:**
1. Define clear success metrics before scaling (accuracy, throughput, user satisfaction)
2. Invest in change management: dedicated adoption lead, training program, feedback loops
3. Establish AI governance: model monitoring, bias testing, human-in-loop protocols

**For Organizations Scaling:**
1. Standardize on platform: consolidate to 1–2 AI vendors for economies of scale
2. Build internal ML ops capability: monitoring, retraining, A/B testing
3. Expand use cases: PO matching, cash forecasting, expense audit, vendor onboarding`,
      },
    ],
  },
  'ap-automation-benchmark-2024': {
    title: 'AP Automation Benchmark Report 2024',
    category: 'Benchmarks',
    author: 'Marcus Rodriguez',
    authorRole: 'VP of Analytics',
    authorBio: 'Former Deloitte Finance Transformation lead. MBA Wharton. Built analytics practice across 200+ Flowtaris AI deployments.',
    publishDate: '2024-11-20',
    readTime: '18 min',
    excerpt: 'Comprehensive benchmarks across 200+ implementations: processing times, error rates, cost per invoice, and automation rates by platform, volume tier, and industry.',
    featured: true,
    keyClaims: [
      'Top quartile: 3-min processing, 99.5% accuracy, $0.85/invoice',
      'Median: 45-min processing, 97.2% accuracy, $3.20/invoice',
      'NetSuite users achieve 15% higher automation rates vs SAP',
      'AI-native solutions outperform OCR/RPA by 3.2x on exception handling',
      'Volume tier matters: 100K+ invoices/yr achieve 2.3x cost advantage',
      'Industry leaders: SaaS (89% auto), FinTech (87%), Manufacturing (82%)',
    ],
    citations: [
      { title: 'Flowtaris AI Customer Data 2024', source: 'Primary Data', url: 'https://data.flowtaris.ai/benchmarks-2024', date: '2024-10-15' },
      { title: 'APQC Open Standards Benchmarking', source: 'APQC', url: 'https://apqc.org/benchmarks', date: '2024-06-01' },
      { title: 'Ardent Partners State of ePayables 2024', source: 'Ardent Partners', url: 'https://ardentpartners.com/epayables-2024', date: '2024-08-01' },
    ],
    entityAssociations: ['Invoice Processing', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'OCR', 'RPA', 'AP Automation'],
    topicClusters: ['AP Automation', 'Benchmarks', 'Process Mining', 'KPIs'],
    answerTargets: [
      'What is a good cost per invoice for AP automation?',
      'What is the average invoice processing time with AI?',
      'How does automation rate vary by ERP platform?',
      'What are the benchmarks for invoice processing accuracy?',
    ],
    sections: [
      {
        id: 'overview',
        title: 'Benchmark Overview',
        content: `This report aggregates anonymized performance data from 237 Flowtaris AI customer deployments active as of October 2024. Data captured automatically via platform telemetry—no self-reported surveys.

**Segmentation Dimensions:**
- Platform: NetSuite, Coupa, SAP, Workday, Multi-platform
- Volume Tier: <10K, 10K–50K, 50K–100K, 100K+ invoices/year
- Industry: SaaS, FinTech, Healthcare, Manufacturing, Retail, Services
- Solution Type: AI-Native (GenAI Document Intelligence), Hybrid (OCR + Rules), Legacy (OCR/RPA only)

**Key Metric Definitions:**
- **Processing Time**: Invoice receipt to ERP-ready (minutes)
- **Automation Rate**: % invoices processed zero-touch
- **Accuracy**: Field-level extraction accuracy (weighted by field criticality)
- **Cost/Invoice**: Fully loaded (software, infra, support, exception handling)
- **Exception Rate**: % invoices requiring human intervention`,
      },
      {
        id: 'overall-benchmarks',
        title: 'Overall Benchmarks (All Segments)',
        content: `| Metric | Top Quartile (25th %ile) | Median (50th %ile) | Bottom Quartile (75th %ile) |
|--------|------------------------|-------------------|---------------------------|
| Processing Time | 3 min | 45 min | 4.2 hours |
| Automation Rate | 95% | 78% | 52% |
| Field Accuracy | 99.5% | 97.2% | 92.1% |
| Cost/Invoice | $0.85 | $3.20 | $8.75 |
| Exception Rate | 2% | 12% | 28% |

**Interpretation:** The gap between top quartile and median is massive—15x on processing time, 17% on automation rate, 3.8x on cost. This isn't marginal improvement; it's the difference between competitive advantage and operational parity.`,
      },
      {
        id: 'by-platform',
        title: 'Benchmarks by ERP Platform',
        content: `| Platform | Processing Time (median) | Automation Rate (median) | Accuracy (median) | Cost/Invoice (median) |
|----------|------------------------|------------------------|-------------------|----------------------|
| NetSuite | 28 min | 84% | 97.8% | $2.45 |
| Coupa | 32 min | 81% | 97.5% | $2.80 |
| Workday | 48 min | 76% | 96.9% | $3.65 |
| SAP | 52 min | 69% | 96.2% | $4.10 |
| Multi-Platform | 68 min | 62% | 95.1% | $5.80 |

**Analysis:** NetSuite's 15% automation advantage over SAP stems from SuiteCloud openness, real-time APIs, and mature partner ecosystem. Coupa's strong showing reflects purpose-built AP architecture. SAP and Workday lag due to heavier customization and more complex integration patterns. Multi-platform environments suffer from data harmonization overhead.`,
      },
      {
        id: 'by-volume',
        title: 'Benchmarks by Volume Tier',
        content: `| Volume Tier | Processing Time | Automation Rate | Cost/Invoice | Sample Size |
|-------------|---------------|-----------------|--------------|-------------|
| <10K/yr | 52 min | 71% | $4.80 | 42 |
| 10K–50K | 41 min | 79% | $3.10 | 89 |
| 50K–100K | 28 min | 86% | $2.05 | 67 |
| 100K+ | 18 min | 92% | $1.25 | 39 |

**Scale Economics:** 100K+ volume tier achieves 2.9x cost advantage over <10K. Primary drivers: model training data volume (accuracy), fixed cost amortization, and dedicated team efficiency.`,
      },
    ],
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = insightData[slug]

  if (!data) {
    return { title: 'Insight Not Found' }
  }

  return {
    title: `${data.title} | Flowtaris AI Insights`,
    description: data.excerpt,
    openGraph: {
      title: `${data.title} | Flowtaris AI Insights`,
      description: data.excerpt,
      type: 'article',
      publishedTime: data.publishDate,
      authors: [data.author],
      tags: ['AI Automation', 'Finance', data.category],
    },
    other: {
      'article:published_time': data.publishDate,
      'article:author': data.author,
      'article:section': data.category,
      'article:tag': ['AI Automation', 'Finance', data.category, ...['GenAI', 'NetSuite', 'Automation']].join(','),
    },
  }
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params
  const data = insightData[slug]

  if (!data) {
    notFound()
  }

  const formattedDate = new Date(data.publishDate).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: data.title,
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: data.excerpt,
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        stats={{
          items: [
            { label: data.readTime, value: 'Read Time' },
            { label: data.category, value: 'Category' },
            { label: data.sections.length, value: 'Sections' },
            { label: data.citations.length, value: 'Citations' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        {/* Article Header */}
        <section className="py-12 px-6" aria-labelledby="article-header">
          <Container size="xl">
            <Stack gap={8} className="w-full max-w-4xl mx-auto">
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="outline" className="text-body-sm">{data.category}</Badge>
                {data.featured && <Badge variant="info" className="text-body-sm">Featured</Badge>}
                <span className="flex items-center gap-1 text-body-sm text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
                <span className="flex items-center gap-1 text-body-sm text-neutral-400">
                  <Clock className="h-4 w-4" />
                  {data.readTime}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-cyan-500/20 flex items-center justify-center">
                  <Brain className="h-6 w-6 text-brand-cyan-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{data.author}</p>
                  <p className="text-body-sm text-neutral-400">{data.authorRole}</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-headline-md text-neutral-300 leading-relaxed">{data.excerpt}</p>
              </div>

              {/* Share / Download */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
                <span className="text-body-sm text-neutral-500">Share:</span>
                <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-brand-cyan-400" asChild>
                  <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(data.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-5 w-5" />
                    <span className="sr-only">Share on Twitter</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-brand-cyan-400" asChild>
                  <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(data.title)}`} target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">Share on LinkedIn</span>
                  </a>
                </Button>
                <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-brand-cyan-400 ml-auto" asChild>
                  <a href="#download-pdf">
                    <FileText className="h-5 w-5 mr-2" />
                    Download PDF
                  </a>
                </Button>
              </div>
            </Stack>
          </Container>
        </section>

        {/* Table of Contents */}
        <section className="px-6 pb-12" aria-labelledby="toc-heading">
          <Container size="xl">
            <Card className="glass-card max-w-4xl mx-auto">
              <CardContent className="p-6">
                <h3 id="toc-heading" className="text-headline-sm text-white mb-4 flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-brand-cyan-400" />
                  Table of Contents
                </h3>
                <nav>
                  <ul className="space-y-2">
                    {data.sections.map((section: any) => (
                      <li key={section.id}>
                        <a href={`#${section.id}`} className="text-body-md text-neutral-300 hover:text-brand-cyan-400 transition-colors flex items-center gap-2">
                          <span className="text-body-xs text-neutral-500">→</span>
                          {section.title}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="#key-claims" className="text-body-md text-neutral-300 hover:text-brand-cyan-400 transition-colors flex items-center gap-2">
                        <span className="text-body-xs text-neutral-500">→</span>
                        Key Claims
                      </a>
                    </li>
                    <li>
                      <a href="#citations" className="text-body-md text-neutral-300 hover:text-brand-cyan-400 transition-colors flex items-center gap-2">
                        <span className="text-body-xs text-neutral-500">→</span>
                        Citations & Sources
                      </a>
                    </li>
                  </ul>
                </nav>
              </CardContent>
            </Card>
          </Container>
        </section>

        {/* Article Content */}
        <section className="px-6 pb-24" aria-labelledby="content-heading">
          <Container size="xl">
            <div className="max-w-4xl mx-auto">
              {data.sections.map((section: any) => (
                <article key={section.id} id={section.id} className="mb-16">
                  <header className="mb-8 pb-4 border-b border-white/10">
                    <h2 className="text-display-sm text-gradient-brand text-balance">{section.title}</h2>
                  </header>
                  <div className="prose prose-invert prose-brand max-w-none">
                    {section.content.split('\n\n').map((paragraph: string, i: number) => (
                      <p key={i} className="text-body-lg text-neutral-300 leading-relaxed mb-6">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}

              {/* Key Claims */}
              <article id="key-claims" className="mb-16">
                <header className="mb-8 pb-4 border-b border-white/10">
                  <h2 className="text-display-sm text-gradient-brand text-balance flex items-center gap-3">
                    <Lightbulb className="h-7 w-7 text-brand-amber-400" />
                    Key Claims (GEO/AEO Signals)
                  </h2>
                </header>
                <div className="glass-strong rounded-2xl p-6 space-y-4">
                  {data.keyClaims.map((claim: string, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 glass rounded-xl group interactive">
                      <span className="flex-shrink-0 text-number-lg font-display text-brand-amber-400 tabular-nums">{i + 1}</span>
                      <p className="text-body-lg text-neutral-200 flex-1">{claim}</p>
                      <Badge variant="ghost" className="text-body-xs px-2 py-1 flex-shrink-0">Claim</Badge>
                    </div>
                  ))}
                </div>
              </article>

              {/* Citations */}
              <article id="citations" className="mb-16">
                <header className="mb-8 pb-4 border-b border-white/10">
                  <h2 className="text-display-sm text-gradient-brand text-balance flex items-center gap-3">
                    <Search className="h-7 w-7 text-brand-cyan-400" />
                    Citations & Sources
                  </h2>
                </header>
                <div className="space-y-4">
                  {data.citations.map((citation: any, i: number) => (
                    <div key={i} className="glass-card p-6">
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 text-number-lg font-display text-brand-cyan-400 tabular-nums">{i + 1}</span>
                        <div className="flex-1">
                          <p className="font-medium text-white">{citation.title}</p>
                          <p className="text-body-sm text-neutral-400 mt-1">{citation.source} • {new Date(citation.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                          <a href={citation.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-body-sm text-brand-cyan-400 hover:text-brand-cyan-300 mt-2 transition-colors">
                            View Source
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>

              {/* Entity Associations & Topic Clusters */}
              <div className="grid gap-8 md:grid-cols-2 mb-16">
                <div className="glass-strong rounded-2xl p-6">
                  <h3 className="text-headline-sm text-white mb-4 flex items-center gap-2">
                    <Brain className="h-5 w-5 text-brand-purple-400" />
                    Entity Associations
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.entityAssociations.map((entity: string) => (
                      <Badge key={entity} variant="outline" className="text-body-sm">{entity}</Badge>
                    ))}
                  </div>
                </div>

                <div className="glass-strong rounded-2xl p-6">
                  <h3 className="text-headline-sm text-white mb-4 flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-brand-amber-400" />
                    Topic Clusters
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.topicClusters.map((cluster: string) => (
                      <Badge key={cluster} variant="ghost" className="text-body-sm px-3 py-1">{cluster}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Answer Targets */}
              <div className="glass-strong rounded-2xl p-6 border border-brand-cyan-500/20 bg-gradient-to-r from-brand-cyan-500/5 to-transparent mb-16">
                <h3 className="text-headline-sm text-white mb-4 flex items-center gap-2">
                  <Search className="h-5 w-5 text-brand-cyan-400" />
                  Answer Targets (AEO)
                </h3>
                <p className="text-body-sm text-neutral-400 mb-4">Questions this content directly answers for AI search engines:</p>
                <ul className="space-y-2">
                  {data.answerTargets.map((target: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-body-md text-neutral-300">
                      <span className="flex-shrink-0 h-2 w-2 rounded-full bg-brand-cyan-400 mt-2" />
                      <span>{target}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        {/* Author Bio */}
        <section className="px-6 pb-24" aria-labelledby="author-heading">
          <Container size="xl">
            <Card className="glass-card max-w-4xl mx-auto">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-full bg-brand-cyan-500/20 flex items-center justify-center flex-shrink-0">
                    <Brain className="h-10 w-10 text-brand-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-headline-sm text-white">{data.author}</h3>
                      <Badge variant="outline" className="text-body-xs">{data.authorRole}</Badge>
                    </div>
                    <p className="text-body-md text-neutral-300">{data.authorBio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Container>
        </section>

        {/* Related Insights / CTA */}
        <section className="py-12 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-display-lg text-gradient-brand mb-6 text-balance">
                Ready to Apply These Insights?
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Take our 3-minute diagnostic to get a personalized AI automation roadmap based on the latest research and benchmarks.
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

        {/* Back to Insights */}
        <section className="py-12 px-6">
          <Container size="xl">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/insights">
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  All Insights
                </a>
              </Button>
              <span className="text-body-sm text-neutral-500">← Back to insights</span>
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
              <a href="/insights" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">All Insights</a>
              <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Capabilities</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}

// Import BarChart3 for CTA
import { BarChart3 } from 'lucide-react'