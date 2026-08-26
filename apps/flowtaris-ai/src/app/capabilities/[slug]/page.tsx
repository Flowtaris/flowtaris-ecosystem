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
async function getCapability(slug: string) {
  const supabase = createServerClient()
  const { data, error } = await supabase
    .from('capabilities')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !data || !data.is_published) {
    return null
  }
  return data
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
      className="group border-b border-slate-200 last:border-0"
      name="faq-group"
    >
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none">
        <span className="text-slate-900 font-semibold text-base leading-snug pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 text-brand-blue-500 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-slate-600 text-sm leading-relaxed max-w-3xl">
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

  // Use the new light theme images for the GenAI doc page if no specific images are in the DB yet
  const getStepImage = (idx: number, originalUrl: string) => {
    if (slug === 'genai-document-intelligence') {
      if (idx === 0) return '/images/capabilities/light-invoice-extraction.png'
      if (idx === 1) return '/images/capabilities/light-workflow-automation.png'
      if (idx === 2) return '/images/capabilities/light-erp-sync.png'
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
    { eyebrow: 'STEP 01 — INGEST', headline: 'Receive documents from any source, in any format.', body: 'Flowtaris AI connects to your existing email inboxes, vendor portals, EDI feeds, and scanning hardware. PDFs, images, Word documents, structured EDI, and even handwritten forms are accepted.', image: '/images/capabilities/light-invoice-extraction.png', imageAlt: 'Ingestion UI', imageRight: false, bullets: ['PDF, image, Word, EDI', 'Auto-classification', 'Zero configuration'] },
    { eyebrow: 'STEP 02 — EXTRACT & VALIDATE', headline: 'LLMs extract every field. Rules engines validate every value.', body: 'Our fine-tuned models read each document in context. Extracted values are scored for confidence and passed through your configurable business rules.', image: '/images/capabilities/light-workflow-automation.png', imageAlt: 'Workflow UI', imageRight: true, bullets: ['3-way PO/GR/Invoice matching', 'Confidence scoring', 'Configurable routing'] },
    { eyebrow: 'STEP 03 — SYNC', headline: 'Validated data writes directly to your ERP in real time.', body: 'Approved invoices are pushed to NetSuite, Coupa, SAP, or Workday via native APIs. The integration is bidirectional, syncing vendor master data and PO status.', image: '/images/capabilities/light-erp-sync.png', imageAlt: 'ERP sync UI', imageRight: false, bullets: ['Native API integrations', 'Bidirectional sync', 'Full audit trail'] },
  ]
  const steps = cap.steps?.length > 0 ? cap.steps : (slug === 'genai-document-intelligence' ? defaultSteps : [])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      {/* Light Theme Background */}
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        
        {/* ── HERO ── */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden bg-white" aria-labelledby="hero-heading">
          {/* Very soft gradient blobs matching Proteus style */}
          <div className="absolute top-0 right-0 -mr-32 -mt-32 w-[600px] h-[600px] bg-brand-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-[600px] h-[600px] bg-brand-cyan-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative text-center">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue-600 bg-brand-blue-50 px-4 py-1.5 rounded-full mb-6">
              {cap.category}
            </div>
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-[4.5rem] font-black leading-[1.1] tracking-tight mb-6 text-slate-900 max-w-4xl mx-auto">
              {cap.headline}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-12">
              {cap.subheadline}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-20">
              <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center gap-2 bg-brand-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-blue-500/25 hover:bg-brand-blue-700 hover:shadow-xl hover:shadow-brand-blue-500/30 hover:-translate-y-0.5 transition-all">
                {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center gap-2 bg-white text-slate-700 font-bold px-8 py-4 rounded-xl shadow-md border border-slate-200 hover:bg-slate-50 hover:shadow-lg transition-all">
                {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
              </Link>
            </div>

            {/* Floating Stats cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {cap.stats?.map((stat: any) => (
                <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 flex flex-col items-center justify-center text-center transform hover:-translate-y-1 transition-transform duration-300">
                  <div className="text-3xl md:text-4xl font-black font-display text-brand-blue-600 mb-2">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-800 mb-1">{stat.label}</div>
                  <div className="text-xs text-slate-500">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ── */}
        <section className="py-24 px-6 bg-slate-50" aria-labelledby="problem-heading">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-brand-cyan-600 mb-4">{cap.problem_eyebrow}</div>
                <h2 id="problem-heading" className="text-3xl md:text-4xl font-black text-slate-900 leading-tight mb-6">
                  {cap.problem_headline}
                </h2>
                {cap.problem_body?.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-slate-600 leading-relaxed mb-4 text-base">{para}</p>
                ))}
              </div>
              <div className="bg-white rounded-3xl p-10 text-center shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan-50 rounded-bl-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue-50 rounded-tr-full -ml-16 -mb-16" />
                
                <div className="relative z-10">
                  <div className="text-6xl md:text-8xl font-black font-display text-slate-900 mb-4 tracking-tighter">{cap.problem_stat_value}</div>
                  <div className="text-brand-blue-600 text-lg font-bold leading-relaxed max-w-xs mx-auto mb-6">{cap.problem_stat_label}</div>
                  <div className="pt-6 border-t border-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Source: Flowtaris AI benchmark across 200+ enterprise deployments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS (Alternating visual steps) ── */}
        {steps.length > 0 && (
          <section className="py-24 px-6 bg-white overflow-hidden" aria-labelledby="how-heading">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-cyan-600 mb-3">HOW IT WORKS</div>
                <h2 id="how-heading" className="text-3xl md:text-5xl font-black text-slate-900">
                  From document received to ERP posted.
                </h2>
              </div>

              <div className="space-y-32">
                {steps.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`grid md:grid-cols-2 gap-12 md:gap-24 items-center ${step.imageRight ? '' : 'md:[&>*:first-child]:order-2'}`}
                  >
                    {/* Text */}
                    <div className={step.imageRight ? '' : 'md:order-2'}>
                      <div className="inline-block text-xs font-bold uppercase tracking-widest text-brand-blue-600 bg-brand-blue-50 px-3 py-1 rounded-full mb-4">
                        {step.eyebrow || `STEP 0${idx + 1}`}
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-4">
                        {step.headline}
                      </h3>
                      {step.body?.split('\n\n').map((para: string, i: number) => (
                        <p key={i} className="text-slate-600 text-base leading-relaxed mb-4">{para}</p>
                      ))}
                      {step.bullets?.length > 0 && (
                        <ul className="space-y-3 mt-8">
                          {step.bullets.map((b: string) => (
                            <li key={b} className="flex items-start gap-3 text-sm text-slate-700 font-medium bg-slate-50 px-4 py-3 rounded-lg border border-slate-100">
                              <CheckCircle2 className="w-5 h-5 text-brand-blue-500 flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Image - Floating style */}
                    <div className={`relative ${step.imageRight ? '' : 'md:order-1'}`}>
                      {/* Decorative blob behind image */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-3xl opacity-30 -z-10 ${idx % 2 === 0 ? 'bg-brand-blue-200' : 'bg-brand-cyan-200'}`} />
                      
                      <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.1)] border border-slate-100 aspect-[4/3] bg-white transform hover:scale-[1.02] transition-transform duration-500">
                        <Image
                          src={getStepImage(idx, step.image || '')}
                          alt={step.imageAlt || `Step ${idx + 1}`}
                          fill
                          className="object-cover"
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
          <section className="py-24 px-6 bg-slate-50" aria-labelledby="tech-heading">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">TECHNICAL ARCHITECTURE</div>
                <h2 id="tech-heading" className="text-3xl md:text-4xl font-black text-slate-900">
                  Built for the modern enterprise stack.
                </h2>
              </div>
              <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      <th className="text-left px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Component</th>
                      <th className="text-left px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Technology</th>
                      <th className="text-left px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 hidden md:table-cell">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cap.technical_details.map((row: any, i: number) => (
                      <tr key={row.component} className="border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors">
                        <td className="px-8 py-5 font-bold text-slate-900 whitespace-nowrap">{row.component}</td>
                        <td className="px-8 py-5 text-brand-blue-600 font-mono text-xs">{row.technology}</td>
                        <td className="px-8 py-5 text-slate-600 hidden md:table-cell">{row.description}</td>
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
          <section className="py-20 px-6 bg-white" aria-labelledby="integrations-heading">
            <div className="max-w-5xl mx-auto text-center">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">PLATFORM INTEGRATIONS</div>
              <h2 id="integrations-heading" className="text-2xl font-black text-slate-900 mb-10">
                Works natively with the ERP stack you already have.
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                {cap.integrations.map((i: string) => (
                  <span key={i} className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-full text-sm font-bold text-slate-700 hover:border-brand-blue-300 hover:text-brand-blue-600 hover:shadow-md transition-all cursor-default">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {cap.faq_items?.length > 0 && (
          <section className="py-24 px-6 bg-slate-50" aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="text-xs font-bold uppercase tracking-widest text-brand-blue-600 mb-3">FREQUENTLY ASKED QUESTIONS</div>
                <h2 id="faq-heading" className="text-3xl font-black text-slate-900">
                  Questions your team will ask. Answered.
                </h2>
              </div>
              <div className="bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                {cap.faq_items.map((faq: any, idx: number) => (
                  <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-24 px-6 bg-white relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-brand-blue-50/50" />
          <div className="max-w-3xl mx-auto text-center relative z-10 bg-white rounded-3xl p-12 md:p-16 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-brand-blue-100">
            <h2 id="cta-heading" className="text-3xl md:text-4xl font-black text-slate-900 mb-6">{cap.cta_headline}</h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-10 max-w-xl mx-auto">{cap.cta_body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center justify-center gap-2 bg-brand-blue-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-brand-blue-500/25 hover:bg-brand-blue-700 hover:-translate-y-0.5 transition-all">
                {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-bold px-8 py-4 rounded-xl shadow-sm hover:bg-slate-50 transition-colors">
                {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
              </Link>
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB FOOTER ── */}
        <div className="bg-slate-900 py-8 px-6 text-white border-t border-slate-800">
          <div className="max-w-5xl mx-auto flex items-center gap-3 text-xs font-medium text-slate-400">
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