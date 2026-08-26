import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, ArrowRight, ChevronDown, ChevronRight,
  FileText, Cpu, GitBranch, ShieldCheck, BarChart3,
  Zap, Clock, DollarSign, TrendingUp, AlertTriangle
} from 'lucide-react'
import { createServerClient } from '@flowtaris/supabase-client'

interface Props {
  params: Promise<{ slug: string }>
}

// ─── DATA FETCHING ─────────────────────────────────────────────────────────────
const STATIC_FALLBACKS: Record<string, any> = {
  'genai-document-intelligence': {
    slug: 'genai-document-intelligence',
    category: 'DOCUMENT PROCESSING',
    title: 'GenAI Document Intelligence',
    headline: 'Your Finance Team Processes 400 Documents a Day. AI Can Handle 400,000.',
    subheadline: 'Flowtaris AI extracts, validates, and routes invoices, purchase orders, receipts, and contracts — at 99.4% accuracy — directly into your ERP.',
    maturity: 'production',
    problem_eyebrow: 'THE PROBLEM',
    problem_headline: 'Finance teams lose 23 hours per week manually keying invoices, POs, and receipts into the ERP.',
    problem_body: "At a fully loaded cost of $45/hr per finance analyst, that's $53,820 per person per year — before accounting for error remediation, late payment penalties, and duplicate invoice fraud.\n\nLegacy OCR tools were built for simple, templated documents. Modern AP environments receive invoices in 60+ formats from hundreds of vendors. Template-based extraction breaks constantly, creating a tier of exceptions that still requires manual review.\n\nFlowtaris AI uses large language models fine-tuned on financial documents — not rigid templates — so it understands context the way a human does, at machine speed.",
    problem_stat_value: '23 hrs',
    problem_stat_label: 'lost per analyst per week to manual document entry',
    stats: [
      { value: '99.4%', label: 'Extraction Accuracy', context: 'across 2.1M documents processed' },
      { value: '4 days → 3 min', label: 'Invoice-to-Pay Cycle', context: 'median reduction in production' },
      { value: '85%', label: 'Automation Rate', context: 'of invoices with zero human touch' },
      { value: '$4.5M/yr', label: 'Cost Reduction', context: 'for enterprise at 50K invoices/yr' }
    ],
    integrations: ['NetSuite SuiteCloud','Coupa Open APIs','SAP BTP','Workday Cloud Connect','Oracle ERP Cloud','MuleSoft','Celonis','Microsoft Azure AI'],
    faq_items: [],
    seo_title: 'AI Invoice Processing & Document Intelligence for NetSuite, Coupa & SAP | Flowtaris AI',
    seo_description: 'Automate accounts payable with GenAI. Flowtaris AI extracts invoice data at 99.4% accuracy and syncs directly to NetSuite, Coupa, SAP, and Workday.',
    seo_keywords: 'AI invoice processing, GenAI document extraction, AP automation NetSuite',
    is_published: true,
  }
}

async function getCapability(slug: string) {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('capabilities')
      .select('*')
      .eq('slug', slug)
      .single()

    if (!error && data && data.is_published) {
      return data
    }
  } catch (err) {
    // Suppress error and fallback
  }

  // Fallback to static data if Supabase env vars are missing or query fails
  return STATIC_FALLBACKS[slug] || null
}

// ─── METADATA ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cap = await getCapability(slug)

  if (!cap) return { title: 'Capability Not Found | Flowtaris AI' }

  return {
    title: cap.seo_title || `${cap.title} | Flowtaris AI`,
    description: cap.seo_description,
    keywords: cap.seo_keywords,
    authors: [{ name: 'Flowtaris AI', url: 'https://flowtaris.ai' }],
    alternates: {
      canonical: `https://flowtaris.ai/capabilities/${slug}`,
    },
    openGraph: {
      title: cap.seo_title,
      description: cap.seo_description,
      url: `https://flowtaris.ai/capabilities/${slug}`,
      siteName: 'Flowtaris AI',
      type: 'website',
      images: cap.seo_og_image ? [{ url: cap.seo_og_image, width: 1200, height: 630, alt: cap.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: cap.seo_title,
      description: cap.seo_description,
      images: cap.seo_og_image ? [cap.seo_og_image] : [],
    },
  }
}

export const revalidate = 60

// ─── FAQ ACCORDION ────────────────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  return (
    <details
      className="group border-b border-white/10 last:border-0"
      name="faq-group"
    >
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none">
        <span className="text-white font-medium text-base leading-snug pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-gray-400 text-sm leading-relaxed max-w-3xl">
        {answer}
      </div>
    </details>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function CapabilityDetailPage({ params }: Props) {
  const { slug } = await params
  const cap = await getCapability(slug)

  if (!cap) notFound()

  // Use the new premium dark mode images for the GenAI doc page if no specific images are in the DB yet
  const getStepImage = (idx: number, originalUrl: string) => {
    if (slug === 'genai-document-intelligence') {
      if (idx === 0) return '/images/capabilities/premium-dark-invoice.png'
      if (idx === 1) return '/images/capabilities/premium-dark-workflow.png'
      if (idx === 2) return '/images/capabilities/premium-dark-erp.png'
    }
    return originalUrl
  }

  // JSON-LD schemas
  const faqSchema = cap.faq_items?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cap.faq_items.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Flowtaris AI — ${cap.title}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud',
    description: cap.seo_description,
    url: `https://flowtaris.ai/capabilities/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Flowtaris',
      url: 'https://flowtaris.ai',
      sameAs: ['https://flowtaris.com'],
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Contact for enterprise pricing' },
  }

  // Fallback content in case DB steps are empty
  const defaultSteps = [
    { eyebrow: 'STEP 01 — INGEST', headline: 'Receive documents from any source, in any format.', body: 'Flowtaris AI connects to your existing email inboxes, vendor portals, EDI feeds, and scanning hardware. PDFs, images, Word documents, structured EDI, and even handwritten forms are accepted.', image: '/images/capabilities/premium-dark-invoice.png', imageAlt: 'Ingestion UI', imageRight: false, bullets: ['PDF, image, Word, EDI', 'Auto-classification', 'Zero configuration'] },
    { eyebrow: 'STEP 02 — EXTRACT & VALIDATE', headline: 'LLMs extract every field. Rules engines validate every value.', body: 'Our fine-tuned models read each document in context. Extracted values are scored for confidence and passed through your configurable business rules.', image: '/images/capabilities/premium-dark-workflow.png', imageAlt: 'Workflow UI', imageRight: true, bullets: ['3-way PO/GR/Invoice matching', 'Confidence scoring', 'Configurable routing'] },
    { eyebrow: 'STEP 03 — SYNC', headline: 'Validated data writes directly to your ERP in real time.', body: 'Approved invoices are pushed to NetSuite, Coupa, SAP, or Workday via native APIs. The integration is bidirectional, syncing vendor master data and PO status.', image: '/images/capabilities/premium-dark-erp.png', imageAlt: 'ERP sync UI', imageRight: false, bullets: ['Native API integrations', 'Bidirectional sync', 'Full audit trail'] },
  ]
  const steps = cap.steps?.length > 0 ? cap.steps : (slug === 'genai-document-intelligence' ? defaultSteps : [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Premium Dark Theme Background */}
      <div className="min-h-screen bg-[#0a0f1a] text-white font-sans selection:bg-white/20">
        
        {/* ── HERO ── */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden" aria-labelledby="hero-heading">
          {/* Subtle noise/texture or extremely soft glow instead of big neon blobs */}
          <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative text-center">
            <div className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md">
              {cap.category}
            </div>
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-[5rem] font-bold leading-[1.1] tracking-tight mb-8 text-white max-w-4xl mx-auto">
              {cap.headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto mb-14 font-light">
              {cap.subheadline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-24">
              <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300">
                {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center gap-2 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
              </Link>
            </div>

            {/* Premium Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {cap.stats?.map((stat: any) => (
                <div key={stat.label} className="bg-white/[0.03] rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 backdrop-blur-sm">
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2">{stat.value}</div>
                  <div className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-xs text-gray-500 font-light">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ── */}
        <section className="py-32 px-6 border-t border-white/5 bg-[#0d131f]" aria-labelledby="problem-heading">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-6">{cap.problem_eyebrow}</div>
                <h2 id="problem-heading" className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-8">
                  {cap.problem_headline}
                </h2>
                {cap.problem_body?.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-gray-400 leading-relaxed mb-6 font-light text-[17px]">{para}</p>
                ))}
              </div>
              <div className="bg-white/5 rounded-3xl p-12 text-center border border-white/10 relative overflow-hidden backdrop-blur-xl">
                {/* Extremely subtle glow inside the box */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="text-6xl md:text-8xl font-light text-white mb-4 tracking-tighter">{cap.problem_stat_value}</div>
                  <div className="text-gray-300 text-lg font-medium leading-relaxed max-w-xs mx-auto mb-8">{cap.problem_stat_label}</div>
                  <div className="pt-8 border-t border-white/10 text-[10px] text-gray-500 font-bold uppercase tracking-[0.15em]">
                    Source: Flowtaris AI benchmark across 200+ enterprise deployments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS (Alternating visual steps) ── */}
        {steps.length > 0 && (
          <section className="py-32 px-6 bg-[#0a0f1a] overflow-hidden" aria-labelledby="how-heading">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-32">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">HOW IT WORKS</div>
                <h2 id="how-heading" className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
                  From document received to ERP posted.
                </h2>
              </div>

              <div className="space-y-40">
                {steps.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`grid md:grid-cols-2 gap-16 md:gap-24 items-center ${step.imageRight ? '' : 'md:[&>*:first-child]:order-2'}`}
                  >
                    {/* Text */}
                    <div className={step.imageRight ? '' : 'md:order-2'}>
                      <div className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-md">
                        {step.eyebrow || `STEP 0${idx + 1}`}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-semibold text-white leading-tight mb-6">
                        {step.headline}
                      </h3>
                      {step.body?.split('\n\n').map((para: string, i: number) => (
                        <p key={i} className="text-gray-400 text-[17px] font-light leading-relaxed mb-6">{para}</p>
                      ))}
                      {step.bullets?.length > 0 && (
                        <ul className="space-y-4 mt-10">
                          {step.bullets.map((b: string) => (
                            <li key={b} className="flex items-center gap-4 text-sm text-gray-300 font-medium">
                              <div className="w-1.5 h-1.5 rounded-full bg-white/40 flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Image - Premium Dark Mode style */}
                    <div className={`relative ${step.imageRight ? '' : 'md:order-1'}`}>
                      {/* Very subtle glow behind image */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] rounded-full blur-[80px] bg-white/[0.03] -z-10" />
                      
                      <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[4/3] bg-[#0d131f] transform hover:scale-[1.02] transition-transform duration-700">
                        <Image
                          src={getStepImage(idx, step.image || '')}
                          alt={step.imageAlt || `Step ${idx + 1}`}
                          fill
                          className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TECHNICAL ARCHITECTURE ── */}
        {cap.technical_details?.length > 0 && (
          <section className="py-32 px-6 border-t border-white/5 bg-[#0d131f]" aria-labelledby="tech-heading">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">TECHNICAL ARCHITECTURE</div>
                <h2 id="tech-heading" className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
                  Built for the modern enterprise stack.
                </h2>
              </div>
              <div className="bg-white/5 rounded-3xl border border-white/10 overflow-hidden backdrop-blur-xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="text-left px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Component</th>
                      <th className="text-left px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Technology</th>
                      <th className="text-left px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 hidden md:table-cell">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cap.technical_details.map((row: any, i: number) => (
                      <tr key={row.component} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 font-medium text-white whitespace-nowrap">{row.component}</td>
                        <td className="px-8 py-6 text-gray-400 font-mono text-xs">{row.technology}</td>
                        <td className="px-8 py-6 text-gray-400 font-light hidden md:table-cell">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── INTEGRATIONS ── */}
        {cap.integrations?.length > 0 && (
          <section className="py-24 px-6 bg-[#0a0f1a]" aria-labelledby="integrations-heading">
            <div className="max-w-5xl mx-auto text-center">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">PLATFORM INTEGRATIONS</div>
              <h2 id="integrations-heading" className="text-2xl font-semibold text-white mb-12">
                Works natively with the ERP stack you already have.
              </h2>
              <div className="flex flex-wrap justify-center gap-4">
                {cap.integrations.map((i: string) => (
                  <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all cursor-default backdrop-blur-md">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {cap.faq_items?.length > 0 && (
          <section className="py-32 px-6 border-t border-white/5 bg-[#0d131f]" aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-16">
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-4">FREQUENTLY ASKED QUESTIONS</div>
                <h2 id="faq-heading" className="text-3xl font-semibold text-white tracking-tight">
                  Questions your team will ask. Answered.
                </h2>
              </div>
              <div className="bg-white/5 rounded-3xl p-10 border border-white/10 backdrop-blur-xl">
                {cap.faq_items.map((faq: any, idx: number) => (
                  <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-32 px-6 bg-[#0a0f1a] relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-white/[0.01]" />
          <div className="max-w-3xl mx-auto text-center relative z-10 bg-white/5 rounded-[2.5rem] p-12 md:p-20 border border-white/10 backdrop-blur-2xl">
            <h2 id="cta-heading" className="text-3xl md:text-5xl font-semibold text-white mb-8 tracking-tight">{cap.cta_headline}</h2>
            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl mx-auto">{cap.cta_body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-gray-100 hover:scale-[1.02] transition-all duration-300">
                {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-md">
                {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
              </Link>
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB FOOTER ── */}
        <div className="bg-[#05080f] py-8 px-6 text-white border-t border-white/5">
          <div className="max-w-5xl mx-auto flex items-center gap-3 text-xs font-medium text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Flowtaris AI</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/capabilities" className="hover:text-white transition-colors">Capabilities</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">{cap.title}</span>
          </div>
        </div>
      </div>
    </>
  )
}