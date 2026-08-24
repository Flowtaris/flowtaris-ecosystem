import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Badge } from '@repo/ui'
import { Button } from '@repo/ui'
import { ArrowRight, ChevronRight, CheckCircle, Zap, DollarSign, BookOpen } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ preview?: string }>
}

interface CapabilityData {
  _id: string
  title: string
  slug: { current: string }
  category: string
  platforms: string[]
  maturity: 'production' | 'pilot' | 'research'
  shortDescription: string
  description?: any[]
  metrics: Array<{ label: string; value: string; context: string }>
  technicalDetails: Array<{ component: string; technology: string; description: string }>
  integrations?: string[]
  demoVideo: string
  documentationUrl: string
  caseStudies?: Array<{ _id: string; title: string; slug: { current: string }; client: string; results: any[] }>
  relatedCaseStudies?: Array<{ _id: string; title: string; slug: { current: string }; client: string; results: any[] }>
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
}

// Fallback data for when CMS is unavailable
const fallbackData: Record<string, CapabilityData> = {
  'genai-doc-intelligence': {
    _id: 'fallback-1',
    title: 'GenAI Document Intelligence',
    slug: { current: 'genai-doc-intelligence' },
    category: 'GenAI',
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday'],
    maturity: 'production',
    shortDescription: 'Automate invoice, PO, and contract processing with LLMs that understand context, not just keywords.',
    description: [],
    metrics: [
      { label: 'Automation Rate', value: '85%', context: 'vs manual processing' },
      { label: 'Processing Time', value: '4 days → 3 min', context: 'Invoice-to-pay cycle' },
      { label: 'Accuracy', value: '99.2%', context: 'Field extraction' },
      { label: 'Cost Reduction', value: '$4.5M/yr', context: 'For 50K invoices/yr' },
    ],
    technicalDetails: [
      { component: 'Document Ingestion', technology: 'AWS Textract + Custom LLMs', description: 'Multi-format support (PDF, images, emails) with OCR fallback' },
      { component: 'Classification Engine', technology: 'BERT-based classifier', description: 'Auto-routes documents to correct processing pipeline' },
      { component: 'Extraction Models', technology: 'Fine-tuned LLaMA 3 70B', description: 'Context-aware field extraction with confidence scoring' },
      { component: 'Validation Layer', technology: 'Rule engine + Human-in-loop', description: 'Configurable business rules with exception handling' },
      { component: 'ERP Integration', technology: 'Native APIs + iPaaS', description: 'Real-time sync with NetSuite, Coupa, SAP, Workday' },
    ],
    integrations: ['NetSuite SuiteCloud', 'Coupa Open APIs', 'SAP BTP', 'Workday Cloud Connect', 'Celonis', 'MuleSoft'],
    demoVideo: 'https://demo.flowtaris.ai/genai-doc-intelligence',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/genai-doc-intelligence',
    caseStudies: [
      { _id: 'cs-1', title: 'Global SaaS Decacorn', slug: { current: 'global-saas-decacorn' }, client: 'Global SaaS Decacorn', results: [] },
      { _id: 'cs-2', title: 'Fintech Unicorn', slug: { current: 'fintech-unicorn' }, client: 'Fintech Unicorn', results: [] },
      { _id: 'cs-3', title: 'Healthcare Manufacturing', slug: { current: 'healthcare-manufacturing' }, client: 'Healthcare Manufacturing', results: [] },
    ],
  },
}

async function getCapability(slug: string, preview = false): Promise<CapabilityData | null> {
  try {
    const client = getClient(preview)
    const data = await client.fetch(queries.capabilityBySlug, { slug })
    return data || null
  } catch (error) {
    console.error(`Failed to fetch capability ${slug}:`, error)
    return null
  }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  const data = await getCapability(slug, isPreview) || fallbackData[slug]

  if (!data) {
    return { title: 'Capability Not Found' }
  }

  return {
    title: data.seo?.metaTitle || `${data.title} | Flowtaris AI`,
    description: data.seo?.metaDescription || data.shortDescription,
    openGraph: {
      title: data.seo?.metaTitle || `${data.title} | Flowtaris AI`,
      description: data.seo?.metaDescription || data.shortDescription,
      type: 'website',
      images: data.seo?.ogImage ? [{ url: data.seo.ogImage }] : [],
    },
    other: {
      'script:ld+json': JSON.stringify(
        serviceSchema({
          name: data.title,
          description: data.shortDescription,
          category: data.category,
          platforms: data.platforms,
        })
      ),
    },
  }
}

// ISR: Revalidate every 60 seconds, fallback to preview mode
export const revalidate = 60

export default async function CapabilityDetailPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { preview } = await searchParams
  const isPreview = preview === 'true'

  const data = await getCapability(slug, isPreview) || fallbackData[slug]

  if (!data) {
    notFound()
  }

  // Merge Sanity data with fallbacks for missing fields
  const integrations = data.integrations || data.relatedCaseStudies?.map(cs => cs.client) || []
  const caseStudies = data.caseStudies || data.relatedCaseStudies || []

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: data.title,
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: data.shortDescription,
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        ctas={[
          { label: 'Start Assessment', variant: 'primary', href: `/assessment?capability=${slug}` },
          { label: 'Calculate ROI', variant: 'secondary', href: `/roi-calculator?capability=${slug}` },
        ]}
        stats={data.metrics.map((m) => ({ label: m.value, value: m.label }))}
        scrollIndicator={{ show: true }}
        vignette={{ show: true, intensity: 0.3 }}
        noise={{ show: true, opacity: 0.03 }}
      />

      <main className="flex-1 w-full">
        {/* What / How / Proof / Who / Next Sections */}
        <section className="py-24 px-6" aria-labelledby="what-heading">
          <Container size="xl">
            <Stack gap="3xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="what-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  What It Does
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  {data.shortDescription}
                </p>
              </header>

              <Grid cols={{ base: 1, md: 2 }} gap="xl" className="w-full">
                {data.technicalDetails.map((detail, i) => (
                  <Card key={detail.component} className="glass-card h-full">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Zap className="h-5 w-5 text-brand-cyan-400" />
                        <CardTitle className="text-headline-sm">{detail.component}</CardTitle>
                      </div>
                      <p className="text-body-sm text-brand-cyan-300">{detail.technology}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-md text-neutral-300">{detail.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Metrics / Proof */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="proof-heading">
          <Container size="xl">
            <Stack gap="3xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="proof-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Proven Results
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Real metrics from production deployments across NetSuite, Coupa, SAP, and Workday
                </p>
              </header>

              <Grid cols={{ base: 1, md: 2, lg: 4 }} gap="xl" className="w-full">
                {data.metrics.map((metric, i) => (
                  <div key={metric.label} className="glass-strong p-6 rounded-2xl text-center group interactive">
                    <div className="text-number-xl text-gradient-brand font-display tabular-nums mb-2">
                      {metric.value}
                    </div>
                    <h4 className="text-headline-sm text-white mb-1">{metric.label}</h4>
                    <p className="text-body-sm text-neutral-400">{metric.context}</p>
                  </div>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Technical Architecture */}
        <section className="py-24 px-6" aria-labelledby="architecture-heading">
          <Container size="xl">
            <Stack gap="3xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="architecture-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Technical Architecture
                </h2>
              </header>

              <div className="glass-strong rounded-2xl p-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-overline text-brand-cyan-400 tracking-widest uppercase">Component</th>
                      <th className="text-left p-4 text-overline text-brand-cyan-400 tracking-widest uppercase">Technology</th>
                      <th className="text-left p-4 text-overline text-brand-cyan-400 tracking-widest uppercase">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.technicalDetails.map((detail) => (
                      <tr key={detail.component} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white">{detail.component}</td>
                        <td className="p-4 text-brand-cyan-300 font-mono text-body-sm">{detail.technology}</td>
                        <td className="p-4 text-neutral-300">{detail.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Stack>
          </Container>
        </section>

        {/* Integrations */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="integrations-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="integrations-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Key Integrations
                </h2>
              </header>

              <div className="flex flex-wrap justify-center gap-4">
                {integrations.map((integration) => (
                  <Badge key={integration} variant="outline" className="text-body-sm px-4 py-2">
                    {integration}
                  </Badge>
                ))}
              </div>
            </Stack>
          </Container>
        </section>

        {/* Demo & CTA */}
        <section className="py-24 px-6" aria-labelledby="next-heading">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 id="next-heading" className="text-display-lg text-gradient-brand mb-6 text-balance">
                See It in Action
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Watch a live demo or start your personalized assessment to see how this capability fits your ERP environment.
              </p>

              {data.demoVideo && (
                <div className="mb-10 aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden glass">
                  <iframe
                    src={data.demoVideo}
                    title={`${data.title} Demo`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href={`/assessment?capability=${slug}`}>
                  <Button size="lg" className="glass-strong px-10 py-4">
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Start Assessment
                  </Button>
                </a>
                <a href={`/roi-calculator?capability=${slug}`}>
                  <Button variant="secondary" size="lg" className="glass px-10 py-4">
                    <DollarSign className="mr-2 h-5 w-5" />
                    Calculate ROI
                  </Button>
                </a>
                {data.documentationUrl && (
                  <a href={data.documentationUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="tertiary" size="lg" className="px-10 py-4">
                      <BookOpen className="mr-2 h-5 w-5" />
                      View Documentation
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Related Case Studies */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="related-heading">
          <Container size="xl">
            <Stack gap="2xl" className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="related-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Related Case Studies
                </h2>
              </header>

              <Grid cols={{ base: 1, md: 3 }} gap="xl" className="w-full">
                {caseStudies.map((caseStudy) => (
                  <Card key={caseStudy._id} className="glass-card interactive">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-body-xs">
                          {data.maturity.charAt(0).toUpperCase() + data.maturity.slice(1)}
                        </Badge>
                      </div>
                      <h4 className="text-headline-sm text-white mb-2">
                        {caseStudy.title}
                      </h4>
                      <p className="text-body-md text-neutral-400 mb-4">
                        See how this capability delivered results for {caseStudy.client}.
                      </p>
                      <a href={`/case-studies/${caseStudy.slug.current}`}>
                        <Button variant="tertiary" size="sm">
                          View Case Study
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
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