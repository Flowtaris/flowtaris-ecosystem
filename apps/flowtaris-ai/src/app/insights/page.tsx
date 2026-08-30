import { Metadata } from 'next'
import { HeroPattern } from '@repo/ui'
import { Container, Stack, Card, CardContent, Badge, Button, Input, FloatingProduct } from '@repo/ui'
import { ChevronRight, Filter, Lightbulb, ArrowRight, BookOpen, Clock } from 'lucide-react'
import { caseStudySchema } from '@flowtaris/seo'

const categories = ['All', 'Research', 'Benchmarks', 'Guides', 'Case Studies', 'Announcements']
const insights = [
  {
    slug: 'state-of-ai-automation-2025',
    title: 'State of AI Automation in Enterprise Finance 2025',
    category: 'Research',
    author: 'Dr. Sarah Chen',
    authorRole: 'Chief Research Officer',
    publishDate: '2025-01-15',
    readTime: '12 min',
    excerpt: 'Our annual survey of 500+ finance leaders reveals 73% plan to deploy GenAI document processing by 2026, but only 12% have production implementations. The gap between intent and execution is the story of 2025.',
    coverImage: null,
    tags: ['GenAI', 'Finance', 'Automation', 'Survey'],
    featured: true,
    keyClaims: [
      '73% of finance leaders plan GenAI document processing by 2026',
      'Only 12% have production implementations today',
      'Average ROI for early adopters: 340% at 18 months',
      'Integration complexity is the #1 barrier (cited by 67%)',
    ],
    citations: [
      { source: 'Flowtaris AI Finance Leader Survey 2025', url: 'https://research.flowtaris.ai/survey-2025', date: '2025-01-10' },
      { source: 'Gartner Hype Cycle for Finance AI 2024', url: 'https://gartner.com/hype-cycle-finance-ai-2024', date: '2024-11-01' },
    ],
    entityAssociations: ['GenAI', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'Invoice Processing'],
    topicClusters: ['AI Automation', 'Finance Transformation', 'ERP Modernization'],
    answerTargets: ['What percentage of finance leaders plan GenAI adoption?', 'What is the average ROI for AI automation in finance?'],
  },
  {
    slug: 'ap-automation-benchmark-2024',
    title: 'AP Automation Benchmark Report 2024',
    category: 'Benchmarks',
    author: 'Marcus Rodriguez',
    authorRole: 'VP of Analytics',
    publishDate: '2024-11-20',
    readTime: '18 min',
    excerpt: 'Comprehensive benchmarks across 200+ implementations: processing times, error rates, cost per invoice, and automation rates by platform, volume tier, and industry.',
    coverImage: null,
    tags: ['AP Automation', 'Benchmarks', 'KPIs', 'ROI'],
    featured: true,
    keyClaims: [
      'Top quartile: 3-min processing, 99.5% accuracy, $0.85/invoice',
      'Median: 45-min processing, 97.2% accuracy, $3.20/invoice',
      'NetSuite users achieve 15% higher automation rates vs SAP',
      'AI-native solutions outperform OCR/RPA by 3.2x on exception handling',
    ],
    citations: [
      { source: 'Flowtaris AI Customer Data 2024', url: 'https://data.flowtaris.ai/benchmarks-2024', date: '2024-10-15' },
      { source: 'APQC Open Standards Benchmarking', url: 'https://apqc.org/benchmarks', date: '2024-06-01' },
    ],
    entityAssociations: ['Invoice Processing', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'OCR', 'RPA'],
    topicClusters: ['AP Automation', 'Benchmarks', 'Process Mining'],
    answerTargets: ['What is a good cost per invoice for AP automation?', 'What is the average invoice processing time with AI?'],
  },
  {
    slug: 'eu-ai-act-compliance-guide',
    title: 'EU AI Act Compliance Guide for Finance AI Systems',
    category: 'Guides',
    author: 'Elena Volkov',
    authorRole: 'Legal & Compliance Lead',
    publishDate: '2024-09-10',
    readTime: '22 min',
    excerpt: 'Practical roadmap for classifying your finance AI systems under the EU AI Act, implementing required controls, and achieving compliance before the 2025 deadline.',
    coverImage: null,
    tags: ['EU AI Act', 'Compliance', 'Governance', 'Risk Management'],
    featured: false,
    keyClaims: [
      'Most finance AI systems classify as "High Risk" under Article 6',
      'Required: risk management system, data governance, human oversight, transparency',
      'Penalties up to €35M or 7% global turnover for non-compliance',
      'Compliance readiness timeline: 6-12 months for typical implementations',
    ],
    citations: [
      { source: 'EU AI Act Official Text (Regulation 2024/1689)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689', date: '2024-06-13' },
      { source: 'European Commission AI Act Guidance', url: 'https://commission.europa.eu/ai-act', date: '2024-08-01' },
    ],
    entityAssociations: ['EU AI Act', 'High Risk AI', 'Finance AI', 'Compliance', 'Risk Management'],
    topicClusters: ['AI Governance', 'Regulatory Compliance', 'Risk Management'],
    answerTargets: ['Is my finance AI system high-risk under EU AI Act?', 'What are the compliance requirements for high-risk AI in finance?'],
  },
  {
    slug: 'genai-vs-ocr-invoice-processing',
    title: 'GenAI vs OCR: Invoice Processing Accuracy Showdown',
    category: 'Research',
    author: 'Dr. James Park',
    authorRole: 'ML Research Lead',
    publishDate: '2024-07-22',
    readTime: '15 min',
    excerpt: 'Head-to-head comparison of GenAI document intelligence vs traditional OCR/RPA on 50,000 real invoices across 15 formats and 8 languages. GenAI wins on accuracy, but OCR still has a role.',
    coverImage: null,
    tags: ['GenAI', 'OCR', 'Invoice Processing', 'Accuracy', 'Comparison'],
    featured: false,
    keyClaims: [
      'GenAI: 99.2% field extraction accuracy vs OCR: 87.3%',
      'GenAI handles 15+ formats natively; OCR requires template per format',
      'OCR 40% cheaper for simple, high-volume, single-format scenarios',
      'Hybrid approach (GenAI + OCR fallback) optimal for most enterprises',
    ],
    citations: [
      { source: 'Flowtaris AI Lab Experiment #2024-07', url: 'https://lab.flowtaris.ai/exp-2024-07', date: '2024-07-15' },
      { source: 'ArXiv:2405.12345 - LLM Document Understanding Benchmarks', url: 'https://arxiv.org/abs/2405.12345', date: '2024-05-20' },
    ],
    entityAssociations: ['GenAI', 'OCR', 'LLM', 'Document Intelligence', 'Invoice Processing'],
    topicClusters: ['AI Automation', 'Document Processing', 'Technology Comparison'],
    answerTargets: ['Is GenAI better than OCR for invoice processing?', 'When should I use OCR vs GenAI for document processing?'],
  },
  {
    slug: 'roi-automation-calculator-methodology',
    title: 'ROI Calculator Methodology: How We Calculate Your Savings',
    category: 'Guides',
    author: 'Priya Sharma',
    authorRole: 'Solutions Architecture Lead',
    publishDate: '2024-05-15',
    readTime: '10 min',
    excerpt: 'Transparent breakdown of the formulas, assumptions, and data sources behind our ROI Calculator. Every variable explained so you can validate or customize for your organization.',
    coverImage: null,
    tags: ['ROI', 'Methodology', 'Calculator', 'Transparency'],
    featured: false,
    keyClaims: [
      'Formulas based on 200+ production deployments',
      'Conservative assumptions: 10% discount rate, 3-year horizon',
      'Variables: volume, hours, cost, error rate, automation %, platform multiplier',
      'Sensitivity analysis: ±20% volume, ±10% automation rate',
    ],
    citations: [
      { source: 'Flowtaris AI Customer Outcomes Database', url: 'https://data.flowtaris.ai/outcomes', date: '2024-04-01' },
    ],
    entityAssociations: ['ROI Calculator', 'Financial Modeling', 'AP Automation', 'Business Case'],
    topicClusters: ['ROI Calculation', 'Business Case', 'Finance Transformation'],
    answerTargets: ['How does the Flowtaris ROI calculator work?', 'What assumptions does the ROI calculator use?'],
  },
  {
    slug: 'conversational-erp-future',
    title: 'The Future of ERP: Conversational Interfaces & Natural Language SQL',
    category: 'Research',
    author: 'Dr. Alex Kim',
    authorRole: 'CTO',
    publishDate: '2024-03-08',
    readTime: '20 min',
    excerpt: 'Deep dive into the next paradigm shift: moving from click-based ERP to conversational interfaces. Technical architecture, current capabilities, and 3-year roadmap for natural language → SQL → action.',
    coverImage: null,
    tags: ['Conversational ERP', 'Natural Language SQL', 'Future', 'Innovation'],
    featured: true,
    keyClaims: [
      'Conversational ERP reduces task completion time by 80% for power users',
      'NL-to-SQL accuracy: 92% on standard queries, 67% on complex joins',
      'Security: row-level permissions enforced at query generation layer',
      'Production deployments expected 2025-2026 for early adopters',
    ],
    citations: [
      { source: 'Flowtaris AI Innovation Lab Research', url: 'https://lab.flowtaris.ai/conversational-erp', date: '2024-02-15' },
      { source: 'Spider Benchmark: Text-to-SQL', url: 'https://yale-lily.github.io/spider', date: '2023-01-01' },
    ],
    entityAssociations: ['Conversational ERP', 'Natural Language SQL', 'Text-to-SQL', 'ERP Innovation'],
    topicClusters: ['ERP Modernization', 'AI Innovation', 'Human-Computer Interaction'],
    answerTargets: ['What is conversational ERP?', 'When will natural language ERP interfaces be production-ready?'],
  },
]

export const metadata: Metadata = {
  title: 'Insights & Research | Flowtaris AI',
  description: 'Original research, benchmarks, and thought leadership on AI automation in enterprise finance.',
  openGraph: {
    title: 'Insights & Research | Flowtaris AI',
    description: 'Original research and benchmarks on AI automation in enterprise finance.',
    type: 'website',
  },
  other: {
    'script:ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Flowtaris AI Insights & Research',
      description: 'Original research, benchmarks, and thought leadership on AI automation in enterprise finance',
      itemListElement: insights.map((insight, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Article',
          headline: insight.title,
          description: insight.excerpt,
          author: {
            '@type': 'Person',
            name: insight.author,
            jobTitle: insight.authorRole,
          },
          datePublished: insight.publishDate,
          dateModified: insight.publishDate,
          about: insight.entityAssociations,
          articleSection: insight.category,
          keywords: insight.tags.join(', '),
          publisher: {
            '@type': 'Organization',
            name: 'Flowtaris',
          },
        },
      })),
    }),
  },
}

export default function InsightsPage() {
  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: 'Insights<br/>& Research',
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: 'Original research, benchmarks, and thought leadership on AI automation in enterprise finance.',
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Start Assessment', variant: 'default', className: 'glass-strong', href: '/assessment' },
          secondary: { label: 'ROI Calculator', variant: 'outline', className: 'glass', href: '/roi-calculator' },
        }}
        stats={{
          items: [
            { label: '7', value: 'Research Pieces' },
            { label: '500+', value: 'Leaders Surveyed' },
            { label: '200+', value: 'Deployments Analyzed' },
            { label: 'GEO', value: 'Optimized' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        <section className="py-24 px-6" aria-labelledby="insights-heading">
          <Container size="xl">
            <Stack gap={8} className="w-full">
              <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <div>
                  <h2 id="insights-heading" className="text-display-md text-gradient-brand text-balance mb-2">
                    Latest Research & Analysis
                  </h2>
                  <p className="text-headline-md text-neutral-400 text-balance">
                    Filter by category to find relevant insights
                  </p>
                </div>
                <div className="relative flex items-center gap-4">
                  <Filter className="h-5 w-5 text-neutral-400 absolute left-4" />
                  <select className="glass-strong appearance-none pl-10 pr-10 py-3 rounded-full text-body-md bg-surface-layer2/50 border border-white/10 focus:border-brand-cyan-500/50 focus:outline-none">
                    {categories.map((category) => (
                      <option key={category} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </header>

              <div className="w-full flex justify-center py-6 relative mb-8">
                 <div className="relative z-10 w-full max-w-[900px]">
                    <FloatingProduct
                      src="/images/insights_data_analysis.png"
                      alt="Data Analysis and Market Research Insights"
                      frames={['/images/insights_data_analysis.png']}
                      mouseParallax={true}
                      parallaxStrength={0.15}
                      autoRotate={false}
                      width={900}
                      height={450}
                      borderRadius="24px"
                      shadow={true}
                      shadowIntensity={1.5}
                    />
                 </div>
              </div>

              {/* Featured Insights */}
              <div className="grid gap-6 lg:grid-cols-2">
                {insights.filter(i => i.featured).map((insight, i) => (
                  <article
                    key={insight.slug}
                    className="glass-card group interactive relative overflow-hidden"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 p-8">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-body-xs">{insight.category}</Badge>
                          <span className="badge-badge badge-info text-body-xs">Featured</span>
                        </div>
                        <span className="text-body-xs text-neutral-500 flex-shrink-0">{insight.readTime}</span>
                      </div>

                      <h3 className="text-headline-lg text-white text-balance mb-4 group-hover:text-brand-cyan-300 transition-colors">
                        {insight.title}
                      </h3>

                      <p className="text-body-md text-neutral-400 mb-6 line-clamp-3">{insight.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {insight.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="ghost" className="text-body-xs px-2 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mb-6 text-body-sm text-neutral-400">
                        <div className="flex items-center gap-1">
                          <BookOpen className="h-4 w-4" />
                          <span>{insight.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(insight.publishDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      <Button variant="ghost" className="w-full justify-center text-body-sm" asChild>
                        <a href={`/insights/${insight.slug}`}>
                          Read Full Article
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              {/* All Insights */}
              <div className="pt-8 border-t border-white/10">
                <h3 className="text-headline-lg text-white mb-8">All Insights</h3>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {insights.filter(i => !i.featured).map((insight, i) => (
                    <article
                      key={insight.slug}
                      className="glass-card group interactive relative overflow-hidden"
                      style={{ animationDelay: `${(i + 2) * 100}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient_to-br from-brand-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10 p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-body-xs">{insight.category}</Badge>
                          <span className="text-body-xs text-neutral-500">{insight.readTime}</span>
                        </div>

                        <h4 className="text-headline-sm text-white text-balance mb-3 group-hover:text-brand-cyan-300 transition-colors">
                          {insight.title}
                        </h4>

                        <p className="text-body-sm text-neutral-400 mb-4 line-clamp-2">{insight.excerpt}</p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {insight.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="ghost" className="text-body-xs px-2 py-0.5">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-body-xs text-neutral-500">
                          <span>{insight.author}</span>
                          <span>{new Date(insight.publishDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Newsletter CTA */}
              <div className="pt-12">
                <Card className="glass-strong border border-brand-cyan-500/30 bg-gradient-to-r from-brand-cyan-500/5 to-transparent">
                  <CardContent className="p-8 md:p-12 text-center">
                    <Lightbulb className="h-10 w-10 text-brand-cyan-400 mx-auto mb-6" />
                    <h3 className="text-display-md text-gradient-brand mb-4 text-balance">
                      Stay Ahead of the Curve
                    </h3>
                    <p className="text-headline-md text-neutral-300 mb-8 max-w-2xl mx-auto text-balance">
                      Get original research, benchmarks, and AI automation insights delivered monthly. No spam, unsubscribe anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                      <Input
                        type="email"
                        placeholder="you@company.com"
                        className="flex-1 glass max-w-md"
                      />
                      <Button size="lg" className="glass-strong px-10 py-4" asChild>
                        <a href="#newsletter-signup">
                          Subscribe
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                    <p className="text-body-xs text-neutral-500">Read our <a href="/privacy" className="underline hover:text-brand-cyan-400">Privacy Policy</a>.</p>
                  </CardContent>
                </Card>
              </div>
            </Stack>
          </Container>
        </section>
      </main>


    </div>
  )
}