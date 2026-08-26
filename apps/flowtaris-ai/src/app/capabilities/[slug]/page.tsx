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
    subheadline: 'Flowtaris AI extracts, validates, and routes invoices, purchase orders, receipts, and contracts — at 99.4% accuracy — directly into your ERP. No templates. No rules configuration. No manual keying.',
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
    faq_items: [
      { question: 'How does Flowtaris AI handle invoices from vendors it has never seen before?', answer: 'Unlike legacy OCR tools that require a template per vendor, Flowtaris AI uses a large language model trained on financial documents across industries. It understands the context of the document just like a human would.' },
      { question: 'What ERP systems does Flowtaris AI integrate with?', answer: 'Flowtaris AI integrates natively with NetSuite, Coupa, SAP, Workday, and Oracle ERP Cloud via native APIs, supporting bidirectional sync.' }
    ],
    cta_headline: 'See exactly how much your current AP process is costing you.',
    cta_body: 'Run our 3-minute Cost of Inaction analysis or take the AI Readiness Assessment to see how Flowtaris AI can transform your finance operations.',
    cta_primary_label: 'Start AI Readiness Assessment',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Calculate Cost of Inaction',
    cta_secondary_href: '/cost-of-inaction',
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
      <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none select-none">
        <span className="text-white font-medium text-lg leading-snug pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 text-brand-blue-400 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="pb-8 text-gray-400 text-base leading-relaxed max-w-3xl">
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

      {/* Premium Dark Theme Background with subtle grid pattern */}
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-brand-blue-500/30">
        
        {/* Background Grid & Glows */}
        <div className="fixed inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        {/* ── HERO ── */}
        <section className="pt-32 pb-24 px-6 relative overflow-hidden" aria-labelledby="hero-heading">
          {/* Deep elegant glowing orbs */}
          <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-brand-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-brand-cyan-900/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-6xl mx-auto relative text-center">
            <div className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue-400 bg-brand-blue-500/10 border border-brand-blue-500/20 px-5 py-2 rounded-full mb-8 backdrop-blur-md">
              {cap.category}
            </div>
            <h1 id="hero-heading" className="text-5xl md:text-7xl lg:text-[6rem] font-bold leading-[1.05] tracking-tight mb-8 text-white max-w-5xl mx-auto drop-shadow-2xl">
              {cap.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-16 font-light">
              {cap.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-32">
              <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center justify-center gap-2 bg-white text-black font-semibold text-lg px-10 py-5 rounded-2xl hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 w-full sm:w-auto">
                {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center justify-center gap-2 bg-[#111111] text-white font-semibold text-lg px-10 py-5 rounded-2xl border border-white/10 hover:bg-white/5 hover:border-white/20 transition-all duration-300 w-full sm:w-auto">
                {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
              </Link>
            </div>

            {/* Premium Stat Cards with dynamic hover states */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
              {cap.stats?.map((stat: any) => (
                <div key={stat.label} className="group bg-[#0a0a0a] rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-center text-center hover:-translate-y-2 hover:bg-[#111111] hover:border-brand-blue-500/30 hover:shadow-[0_0_30px_rgba(0,150,255,0.05)] transition-all duration-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="text-4xl md:text-5xl font-light tracking-tight text-white mb-3 relative z-10">{stat.value}</div>
                  <div className="text-sm font-semibold text-brand-blue-400 uppercase tracking-widest mb-2 relative z-10">{stat.label}</div>
                  <div className="text-sm text-gray-500 font-light relative z-10">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ── */}
        <section className="py-32 px-6 border-t border-white/5 bg-gradient-to-b from-[#0a0a0a] to-[#050505]" aria-labelledby="problem-heading">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-cyan-500 mb-6 flex items-center gap-3">
                  <span className="w-8 h-px bg-brand-cyan-500/50" />
                  {cap.problem_eyebrow || 'THE PROBLEM'}
                </div>
                <h2 id="problem-heading" className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-8">
                  {cap.problem_headline}
                </h2>
                <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed">
                  {cap.problem_body?.split('\n\n').map((para: string, i: number) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>
              <div className="bg-[#0a0a0a] rounded-[2.5rem] p-12 md:p-16 text-center border border-white/5 shadow-2xl relative overflow-hidden group hover:border-white/10 transition-colors duration-700">
                {/* Dynamic gradient background inside the card */}
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-brand-blue-900/10 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="text-7xl md:text-9xl font-light text-white mb-6 tracking-tighter drop-shadow-lg">{cap.problem_stat_value}</div>
                  <div className="text-brand-blue-400 text-xl md:text-2xl font-medium leading-relaxed max-w-sm mx-auto mb-10">{cap.problem_stat_label}</div>
                  <div className="pt-8 border-t border-white/10 text-[11px] text-gray-600 font-bold uppercase tracking-[0.2em]">
                    Source: Flowtaris AI benchmark across 200+ enterprise deployments
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS (Alternating visual steps with ENLARGED images) ── */}
        {steps.length > 0 && (
          <section className="py-40 px-6 overflow-hidden relative" aria-labelledby="how-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-32 relative z-10">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue-500 mb-6">HOW IT WORKS</div>
                <h2 id="how-heading" className="text-4xl md:text-6xl font-semibold text-white tracking-tight">
                  From document received to ERP posted.
                </h2>
              </div>

              <div className="space-y-40">
                {steps.map((step: any, idx: number) => (
                  <div
                    key={idx}
                    className={`grid lg:grid-cols-12 gap-16 lg:gap-20 items-center ${step.imageRight ? '' : 'lg:[&>*:first-child]:order-2'}`}
                  >
                    {/* Text - Takes 5 columns */}
                    <div className={`lg:col-span-5 ${step.imageRight ? '' : 'lg:order-2'}`}>
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xl mb-8 backdrop-blur-md">
                        {idx + 1}
                      </div>
                      <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">
                        {step.headline}
                      </h3>
                      <div className="space-y-6 text-gray-400 text-lg font-light leading-relaxed mb-10">
                        {step.body?.split('\n\n').map((para: string, i: number) => (
                          <p key={i}>{para}</p>
                        ))}
                      </div>
                      {step.bullets?.length > 0 && (
                        <ul className="space-y-4 mt-8">
                          {step.bullets.map((b: string) => (
                            <li key={b} className="flex items-center gap-4 text-base text-gray-300 font-medium">
                              <CheckCircle2 className="w-6 h-6 text-brand-blue-500 flex-shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Image - Takes 7 columns (ENLARGED) */}
                    <div className={`relative lg:col-span-7 ${step.imageRight ? '' : 'lg:order-1'}`}>
                      {/* Premium elegant glow behind image */}
                      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] rounded-full blur-[100px] -z-10 ${idx % 2 === 0 ? 'bg-brand-blue-900/20' : 'bg-brand-cyan-900/10'}`} />
                      
                      {/* Beautiful glowing glass border wrapper */}
                      <div className="relative p-[1px] rounded-3xl bg-gradient-to-br from-white/20 to-white/0 overflow-hidden transform hover:scale-[1.02] transition-transform duration-700 shadow-2xl">
                        <div className="relative rounded-3xl overflow-hidden aspect-[4/3] bg-[#0d0d0d]">
                          <Image
                            src={getStepImage(idx, step.image || '')}
                            alt={step.imageAlt || `Step ${idx + 1}`}
                            fill
                            className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-700"
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            priority={idx === 0}
                          />
                        </div>
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
          <section className="py-32 px-6 border-t border-white/5 bg-[#0a0a0a]" aria-labelledby="tech-heading">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-24">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-6">TECHNICAL ARCHITECTURE</div>
                <h2 id="tech-heading" className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
                  Built for the modern enterprise stack.
                </h2>
              </div>
              <div className="bg-[#0f0f0f] rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.02]">
                      <th className="px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 w-1/4">Component</th>
                      <th className="px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 w-1/4">Technology</th>
                      <th className="px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hidden md:table-cell w-1/2">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {cap.technical_details.map((row: any, i: number) => (
                      <tr key={row.component} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-10 py-8 font-medium text-white text-lg group-hover:text-brand-blue-400 transition-colors">{row.component}</td>
                        <td className="px-10 py-8 text-brand-blue-400 font-mono text-sm">{row.technology}</td>
                        <td className="px-10 py-8 text-gray-400 font-light text-base hidden md:table-cell leading-relaxed">{row.description}</td>
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
          <section className="py-32 px-6 bg-[#050505]" aria-labelledby="integrations-heading">
            <div className="max-w-5xl mx-auto text-center">
              <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-500 mb-6">PLATFORM INTEGRATIONS</div>
              <h2 id="integrations-heading" className="text-3xl font-semibold text-white mb-16">
                Works natively with the ERP stack you already have.
              </h2>
              <div className="flex flex-wrap justify-center gap-5">
                {cap.integrations.map((i: string) => (
                  <span key={i} className="px-8 py-4 bg-[#0a0a0a] border border-white/10 rounded-full text-base font-medium text-gray-300 hover:text-white hover:border-brand-blue-500/50 hover:bg-[#111111] hover:shadow-[0_0_20px_rgba(0,150,255,0.1)] transition-all duration-300 cursor-default">
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ── */}
        {cap.faq_items?.length > 0 && (
          <section className="py-32 px-6 border-t border-white/5 bg-[#0a0a0a]" aria-labelledby="faq-heading">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <div className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-blue-500 mb-6">FREQUENTLY ASKED QUESTIONS</div>
                <h2 id="faq-heading" className="text-4xl font-semibold text-white tracking-tight">
                  Questions your team will ask. Answered.
                </h2>
              </div>
              <div className="bg-[#0f0f0f] rounded-3xl p-12 border border-white/10 shadow-2xl">
                {cap.faq_items.map((faq: any, idx: number) => (
                  <FaqItem key={idx} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA (Massively upgraded) ── */}
        <section className="py-40 px-6 bg-[#050505] relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            {/* Glowing gradient border effect */}
            <div className="relative p-[1px] rounded-[3rem] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden shadow-[0_0_100px_rgba(0,150,255,0.1)]">
              <div className="bg-gradient-to-b from-[#111111] to-[#050505] rounded-[3rem] p-16 md:p-24 text-center relative overflow-hidden">
                
                {/* Internal Glows */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-brand-blue-600/10 blur-[100px] pointer-events-none" />
                
                <h2 id="cta-heading" className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tight relative z-10">
                  {cap.cta_headline || 'Ready to see it in action?'}
                </h2>
                <p className="text-gray-400 text-xl font-light leading-relaxed mb-16 max-w-2xl mx-auto relative z-10">
                  {cap.cta_body || 'Run our 3-minute Cost of Inaction analysis or take the AI Readiness Assessment to see how Flowtaris AI can transform your finance operations.'}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-5 justify-center relative z-10">
                  <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center justify-center gap-3 bg-white text-black font-semibold text-lg px-12 py-5 rounded-2xl hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300">
                    {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center justify-center gap-3 bg-white/5 text-white font-semibold text-lg px-12 py-5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-md">
                    {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BREADCRUMB FOOTER ── */}
        <div className="bg-[#030303] py-10 px-6 text-white border-t border-white/5">
          <div className="max-w-6xl mx-auto flex items-center gap-4 text-sm font-medium text-gray-500">
            <Link href="/" className="hover:text-white transition-colors">Flowtaris AI</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/capabilities" className="hover:text-white transition-colors">Capabilities</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">{cap.title}</span>
          </div>
        </div>
      </div>
    </>
  )
}