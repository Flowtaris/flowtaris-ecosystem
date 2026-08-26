import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  CheckCircle2, ArrowRight, ChevronDown, ChevronRight,
  FileText, Cpu, GitBranch, ShieldCheck, BarChart3,
  Zap, Clock, DollarSign, TrendingUp, AlertTriangle
} from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

// ─── FULL CAPABILITY DATA ─────────────────────────────────────────────────────
const CAPABILITIES: Record<string, CapabilityPage> = {
  'genai-document-intelligence': {
    slug: 'genai-document-intelligence',
    category: 'DOCUMENT PROCESSING',
    title: 'GenAI Document Intelligence',
    headline: 'Your Finance Team Processes 400 Documents a Day. AI Can Handle 400,000.',
    subheadline: 'Flowtaris AI extracts, validates, and routes invoices, purchase orders, receipts, and contracts — at 99.4% accuracy — directly into your ERP. No templates. No rules configuration. No manual keying.',
    seo: {
      title: 'AI Invoice Processing & Document Intelligence for NetSuite, Coupa & SAP | Flowtaris AI',
      description: 'Automate accounts payable with GenAI. Flowtaris AI extracts invoice data at 99.4% accuracy and syncs directly to NetSuite, Coupa, SAP, and Workday — reducing processing time from 4 days to 3 minutes.',
      ogImage: '/images/capabilities/genai-invoice-extraction.png',
      keywords: 'AI invoice processing, GenAI document extraction, AP automation NetSuite, accounts payable AI, invoice automation Coupa, AI OCR ERP integration',
    },
    stats: [
      { value: '99.4%', label: 'Extraction Accuracy', context: 'across 2.1M documents processed' },
      { value: '4 days → 3 min', label: 'Invoice-to-Pay Cycle', context: 'median reduction in production' },
      { value: '85%', label: 'Automation Rate', context: 'of invoices with zero human touch' },
      { value: '$4.5M/yr', label: 'Cost Reduction', context: 'for enterprise at 50K invoices/yr' },
    ],
    problem: {
      eyebrow: 'THE PROBLEM',
      headline: 'Finance teams lose 23 hours per week manually keying invoices, POs, and receipts into the ERP.',
      body: `At a fully loaded cost of $45/hr per finance analyst, that's $53,820 per person per year — before accounting for error remediation, late payment penalties, and duplicate invoice fraud.\n\nLegacy OCR tools were built for simple, templated documents. Modern AP environments receive invoices in 60+ formats from hundreds of vendors. Template-based extraction breaks constantly, creating a tier of exceptions that still requires manual review.\n\nFlowtaris AI uses large language models fine-tuned on financial documents — not rigid templates — so it understands context the way a human does, at machine speed.`,
      stat: { value: '23 hrs', label: 'lost per analyst per week to manual document entry' },
    },
    steps: [
      {
        eyebrow: 'STEP 01 — INGEST',
        headline: 'Receive documents from any source, in any format.',
        body: 'Flowtaris AI connects to your existing email inboxes, vendor portals, EDI feeds, and scanning hardware. PDFs, images, Word documents, structured EDI, and even handwritten forms are accepted. The system auto-classifies each document — invoice, PO, receipt, credit note, or contract — before processing begins.\n\nUnlike legacy OCR which requires a template per vendor, our classification engine handles every new vendor automatically from day one.',
        image: '/images/capabilities/genai-invoice-extraction.png',
        imageAlt: 'AI invoice ingestion and document classification interface showing multiple document types being processed',
        imageRight: false,
        bullets: [
          'PDF, image, Word, EDI, email-embedded tables',
          'Auto-classification across 140+ document types',
          'Zero vendor template configuration required',
        ],
      },
      {
        eyebrow: 'STEP 02 — EXTRACT & VALIDATE',
        headline: 'LLMs extract every field. Rules engines validate every value.',
        body: 'Our fine-tuned LLaMA 3 70B model reads each document in context — understanding that "Total Due" on a US invoice and "Betrag fällig" on a German invoice both map to the same invoice_amount field in your ERP.\n\nExtracted values are scored for confidence and passed through your configurable business rules: three-way matching against POs and goods receipts, duplicate detection, vendor master validation, and GL coding suggestions. Exceptions are flagged with an audit trail — not silently discarded.',
        image: '/images/capabilities/genai-workflow-automation.png',
        imageAlt: 'AI document extraction workflow showing field-level confidence scores and validation rules',
        imageRight: true,
        bullets: [
          '3-way PO/GR/Invoice matching built-in',
          'Confidence scoring per extracted field',
          'Configurable exception routing & escalation',
        ],
      },
      {
        eyebrow: 'STEP 03 — SYNC',
        headline: 'Validated data writes directly to your ERP in real time.',
        body: 'Approved invoices are pushed to NetSuite, Coupa, SAP, or Workday via native APIs — no middleware, no CSV exports, no batch jobs running overnight. The integration is bidirectional: vendor master data, PO status, and approval hierarchies are pulled from your ERP to inform extraction and routing decisions.\n\nEvery write is logged with a full audit trail: who approved, which model version extracted the data, confidence scores, and any exception notes — making audit preparation a 10-minute task instead of a 2-week scramble.',
        image: '/images/capabilities/genai-erp-sync.png',
        imageAlt: 'Real-time ERP integration dashboard showing invoice sync status across NetSuite, Coupa, SAP, and Workday',
        imageRight: false,
        bullets: [
          'Native API integrations — no middleware layer',
          'Bidirectional sync with vendor & PO master data',
          'Full audit trail per transaction for compliance',
        ],
      },
    ],
    technicalDetails: [
      { component: 'Document Ingestion', technology: 'AWS Textract + Custom LLMs', description: 'Multi-format support (PDF, images, emails, EDI) with OCR fallback for scanned documents' },
      { component: 'Classification Engine', technology: 'BERT-based fine-tuned classifier', description: 'Routes documents to correct processing pipeline; handles 140+ document types with zero configuration' },
      { component: 'Extraction Models', technology: 'Fine-tuned LLaMA 3 70B', description: 'Context-aware field extraction with per-field confidence scoring; trained on 2.1M+ financial documents' },
      { component: 'Validation Layer', technology: 'Rule engine + Human-in-the-loop', description: 'Configurable business rules, 3-way matching, duplicate detection, and GL suggestion engine' },
      { component: 'ERP Integration', technology: 'Native APIs + event bus', description: 'Real-time bidirectional sync with NetSuite SuiteCloud, Coupa Open APIs, SAP BTP, Workday Cloud Connect' },
      { component: 'Audit & Compliance', technology: 'Immutable event log', description: 'Full extraction audit trail with model version, confidence scores, and approver identity per transaction' },
    ],
    integrations: ['NetSuite SuiteCloud', 'Coupa Open APIs', 'SAP BTP', 'Workday Cloud Connect', 'Oracle ERP Cloud', 'MuleSoft', 'Celonis', 'Microsoft Azure AI'],
    faqs: [
      {
        question: 'How does Flowtaris AI handle invoices from vendors it has never seen before?',
        answer: 'Unlike legacy OCR tools that require a template per vendor, Flowtaris AI uses a large language model trained on financial documents across industries. It understands invoice structure contextually — so a new vendor\'s invoice is processed correctly from the first document received, with no configuration required.',
      },
      {
        question: 'What ERP systems does Flowtaris AI integrate with?',
        answer: 'Flowtaris AI integrates natively with NetSuite (SuiteCloud APIs), Coupa (Open APIs), SAP (BTP and standard iDocs), Workday (Cloud Connect), and Oracle ERP Cloud. The integration is bidirectional — pulling vendor master data, PO status, and approval hierarchies from your ERP, and writing validated invoice data back in real time.',
      },
      {
        question: 'What extraction accuracy can I expect?',
        answer: 'In production across 2.1 million documents processed, Flowtaris AI achieves 99.4% field extraction accuracy. Individual field accuracy varies: structured fields like invoice number and amount typically hit 99.8%+, while complex line-item descriptions from diverse vendors average 98.6%. All extractions include a confidence score, and low-confidence fields are automatically flagged for human review.',
      },
      {
        question: 'How does the 3-way matching work?',
        answer: 'Flowtaris AI pulls open POs and goods receipts from your ERP in real time. For each extracted invoice, it matches the vendor, PO number, quantity, and unit price against the corresponding PO line items and GR entries. Variances above your configured tolerance threshold are flagged as exceptions and routed to the appropriate approver — with the discrepancy clearly annotated.',
      },
      {
        question: 'What happens when the AI is not confident about an extraction?',
        answer: 'Every extracted field carries a confidence score between 0 and 1. Fields below your configured confidence threshold (default: 0.85) are flagged and routed to a human reviewer via the Flowtaris exception queue. The reviewer sees the extracted value alongside the source document — they can confirm or correct it, and that correction is used to improve the model for future documents from that vendor.',
      },
      {
        question: 'How is Flowtaris AI different from our current OCR or RPA solution?',
        answer: 'Traditional OCR and RPA solutions break when a document format changes — a new vendor layout, a different table structure, or an additional column in a PO. Flowtaris AI reads documents contextually, the way a human would, so format variations are handled automatically. Additionally, Flowtaris provides built-in business logic (3-way matching, GL coding, duplicate detection) that OCR and RPA require custom scripts to implement.',
      },
      {
        question: 'Is my financial data used to train shared models?',
        answer: 'No. Flowtaris AI is deployed in your environment (cloud or on-premises). Your document data is never used to train shared or public models. The base model is pre-trained by Flowtaris on publicly available financial documents; your data is used only for fine-tuning a private model specific to your organization, which remains entirely under your control.',
      },
      {
        question: 'How long does implementation take?',
        answer: 'A standard NetSuite or Coupa integration is live within 4–6 weeks: 1 week for environment setup and API credentialing, 2 weeks for model fine-tuning on your historical documents, 1 week for UAT with your finance team, and 1 week for go-live. SAP and Workday integrations typically run 6–8 weeks due to more complex approval workflow mapping.',
      },
    ],
    cta: {
      headline: 'See exactly how much your current AP process is costing you.',
      body: 'Run our 3-minute Cost of Inaction analysis or take the AI Readiness Assessment to get a customized deployment roadmap for your ERP environment.',
      primaryLabel: 'Start AI Readiness Assessment',
      primaryHref: '/assessment',
      secondaryLabel: 'Calculate Cost of Inaction',
      secondaryHref: '/cost-of-inaction',
    },
    relatedCapabilities: [
      { slug: 'autonomous-workflow-engine', title: 'Autonomous Workflow Engine', category: 'PROCESS AUTOMATION' },
      { slug: 'predictive-analytics', title: 'Predictive Analytics', category: 'FINANCE INTELLIGENCE' },
      { slug: 'integration-health-monitoring', title: 'Integration Health Monitoring', category: 'OBSERVABILITY' },
    ],
  },
  // Additional slugs with minimal fallback to prevent 404 for other pages
  'autonomous-workflow-engine': {
    slug: 'autonomous-workflow-engine', category: 'PROCESS AUTOMATION',
    title: 'Autonomous Workflow Engine', headline: 'Approval Workflows That Run Themselves.',
    subheadline: 'AI-driven workflow automation that routes, escalates, and resolves AP exceptions without manual intervention.',
    seo: { title: 'Autonomous AP Workflow Automation | Flowtaris AI', description: 'AI-powered workflow engine that automates invoice approvals, exception routing, and escalation across NetSuite, Coupa, SAP, and Workday.', keywords: 'AP workflow automation, invoice approval AI, ERP workflow engine' },
    stats: [{ value: '92%', label: 'Straight-Through Rate', context: 'invoices approved without human touch' }, { value: '4.2 days', label: 'Cycle Time Reduction', context: 'median approval cycle' }, { value: '$2.1M', label: 'Annual Savings', context: 'per 10K invoices processed' }, { value: '60+', label: 'Workflow Templates', context: 'pre-built for AP, PO, contracts' }],
    problem: { eyebrow: 'THE PROBLEM', headline: 'AP teams spend 40% of their time managing exceptions that should never reach them.', body: 'Most ERP approval workflows are static rule trees built years ago. They break when org structures change, when new vendors are added, or when invoice formats don\'t match expected patterns. The result: a flood of exceptions routed to the wrong approver, sitting in queues, delaying payments, and damaging supplier relationships.', stat: { value: '40%', label: 'of AP team time spent on workflow exceptions' } },
    steps: [], technicalDetails: [], integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Slack', 'Microsoft Teams'],
    faqs: [], cta: { headline: 'Ready to eliminate AP bottlenecks?', body: 'Start your AI readiness assessment to see which workflow automation modules apply to your ERP setup.', primaryLabel: 'Start Assessment', primaryHref: '/assessment', secondaryLabel: 'Calculate ROI', secondaryHref: '/roi-calculator' },
    relatedCapabilities: [],
  },
  'predictive-analytics': {
    slug: 'predictive-analytics', category: 'FINANCE INTELLIGENCE',
    title: 'Predictive Analytics', headline: 'From Lagging Reports to Leading Signals.',
    subheadline: 'Real-time cash flow forecasting, vendor risk scoring, and spend anomaly detection — surfacing what matters before it becomes a problem.',
    seo: { title: 'AI Predictive Analytics for Finance Teams | Flowtaris AI', description: 'Real-time cash flow forecasting, spend anomaly detection, and vendor risk scoring powered by AI. Built for NetSuite, Coupa, SAP, and Workday finance teams.', keywords: 'predictive analytics finance, AI cash flow forecasting, spend analytics ERP, vendor risk AI' },
    stats: [{ value: '94%', label: 'Forecast Accuracy', context: 'rolling 90-day cash flow prediction' }, { value: '12 days', label: 'Early Warning Lead Time', context: 'average detection before crisis' }, { value: '3.2%', label: 'Spend Reduction', context: 'from anomaly detection alerts' }, { value: '99', label: 'Vendors Scored', context: 'risk model running in background' }],
    problem: { eyebrow: 'THE PROBLEM', headline: 'CFO dashboards show last month. Finance leaders need to know next month.', body: 'Standard ERP reports are backward-looking by design. By the time a cash flow problem appears in a dashboard, it\'s already too late to act. Flowtaris AI\'s predictive layer runs continuously against your live transaction data, flagging anomalies and forecasting shortfalls weeks before they become visible in financial statements.', stat: { value: '12 days', label: 'average early warning lead time before a cash flow event' } },
    steps: [], technicalDetails: [], integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Tableau', 'Power BI'],
    faqs: [], cta: { headline: 'See your financial risks before they surface.', body: 'Run a predictive analytics assessment for your ERP environment.', primaryLabel: 'Start Assessment', primaryHref: '/assessment', secondaryLabel: 'Calculate ROI', secondaryHref: '/roi-calculator' },
    relatedCapabilities: [],
  },
  'conversational-erp': {
    slug: 'conversational-erp', category: 'HUMAN COMPUTER INTERACTION',
    title: 'Conversational ERP Interface', headline: 'Talk to Your ERP Like You Talk to Your Team.',
    subheadline: 'Natural language queries, commands, and approvals — directly against your NetSuite, Coupa, or SAP data. No SQL. No report builder. No waiting.',
    seo: { title: 'Conversational ERP Interface — AI Natural Language for NetSuite & SAP | Flowtaris AI', description: 'Query NetSuite, Coupa, SAP, and Workday in plain English. Flowtaris AI\'s conversational interface lets finance teams pull reports, approve invoices, and trigger workflows without leaving their chat tool.', keywords: 'conversational ERP, AI ERP interface, natural language NetSuite, ERP chatbot finance' },
    stats: [{ value: '80%', label: 'Query Resolution Rate', context: 'answered without opening ERP UI' }, { value: '4 min', label: 'Avg Report Time', context: 'vs 45 min building in ERP' }, { value: '140+', label: 'Supported Commands', context: 'across AP, AR, GL, procurement' }, { value: '6 ERPs', label: 'Supported Systems', context: 'NetSuite, Coupa, SAP, Workday, Oracle, MS Dynamics' }],
    problem: { eyebrow: 'THE PROBLEM', headline: 'Finance teams spend 3 hours per day navigating ERP UIs to answer questions that should take 10 seconds.', body: '"What\'s our current AP balance with Vendor X?" should not require 6 clicks, a saved search, and a CSV export. Flowtaris AI\'s conversational interface connects directly to your ERP\'s live data, letting anyone on the finance team ask questions in plain English and get instant, accurate answers.', stat: { value: '3 hrs', label: 'per analyst per day spent navigating ERP UIs for basic data' } },
    steps: [], technicalDetails: [], integrations: ['NetSuite', 'SAP', 'Coupa', 'Workday', 'Slack', 'Microsoft Teams', 'Google Workspace'],
    faqs: [], cta: { headline: 'Give your finance team a faster way to work.', body: 'See how conversational ERP fits your stack.', primaryLabel: 'Start Assessment', primaryHref: '/assessment', secondaryLabel: 'Calculate ROI', secondaryHref: '/roi-calculator' },
    relatedCapabilities: [],
  },
  'integration-health-monitoring': {
    slug: 'integration-health-monitoring', category: 'OBSERVABILITY',
    title: 'Integration Health Monitoring', headline: 'Know When Your ERP Integrations Break — Before Your Finance Team Does.',
    subheadline: 'Continuous monitoring, anomaly detection, and auto-remediation for every data flow between your ERP and connected systems.',
    seo: { title: 'ERP Integration Health Monitoring & Observability | Flowtaris AI', description: 'Real-time monitoring and anomaly detection for NetSuite, Coupa, SAP, and Workday integrations. Get alerted to data sync failures, API errors, and latency issues before they impact finance operations.', keywords: 'ERP integration monitoring, NetSuite integration health, API monitoring finance, ERP observability' },
    stats: [{ value: '99.97%', label: 'Uptime Monitored', context: 'across all connected ERP integrations' }, { value: '8 min', label: 'MTTD', context: 'mean time to detect integration failures' }, { value: '73%', label: 'Auto-Remediated', context: 'of common integration errors' }, { value: '200+', label: 'Data Points', context: 'monitored per integration per minute' }],
    problem: { eyebrow: 'THE PROBLEM', headline: 'ERP integration failures are invisible until they cause a crisis.', body: 'Finance teams discover that a critical data sync has been failing for 3 days — not from a monitoring alert, but because a payment didn\'t post or a report looks wrong. By then, the remediation effort is enormous. Flowtaris AI monitors every API call, every sync event, and every data transformation in real time — alerting on anomalies before downstream impact occurs.', stat: { value: '3 days', label: 'average time before an ERP integration failure is discovered' } },
    steps: [], technicalDetails: [], integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'MuleSoft', 'PagerDuty', 'Slack', 'Datadog'],
    faqs: [], cta: { headline: 'See the health of your ERP integrations in real time.', body: 'Start your integration observability assessment.', primaryLabel: 'Start Assessment', primaryHref: '/assessment', secondaryLabel: 'Calculate ROI', secondaryHref: '/roi-calculator' },
    relatedCapabilities: [],
  },
  'ai-governance-compliance': {
    slug: 'ai-governance-compliance', category: 'RISK AND COMPLIANCE',
    title: 'AI Governance and Compliance', headline: 'Deploy AI in Finance With Full Auditability and Control.',
    subheadline: 'Model governance, explainability logs, access controls, and compliance reporting — built for finance teams operating under SOX, GDPR, and internal audit requirements.',
    seo: { title: 'AI Governance & Compliance for Finance Operations | Flowtaris AI', description: 'Enterprise AI governance for finance teams. Full audit trails, model explainability, SOX-compliant access controls, and GDPR-ready data handling for AI deployed in NetSuite, Coupa, SAP, and Workday environments.', keywords: 'AI governance finance, SOX compliance AI, audit trail AI automation, explainable AI ERP, GDPR AI finance' },
    stats: [{ value: '100%', label: 'Audit Trail Coverage', context: 'per AI decision, per transaction' }, { value: 'SOX Ready', label: 'Compliance Framework', context: 'COSO-aligned control documentation' }, { value: '<24 hrs', label: 'Audit Pack Generation', context: 'vs weeks of manual preparation' }, { value: 'GDPR', label: 'Data Residency', context: 'EU data stays in EU by configuration' }],
    problem: { eyebrow: 'THE PROBLEM', headline: 'Finance leaders want AI automation. Their auditors want to know who is responsible for every decision.', body: 'AI in finance creates a governance challenge: when an LLM extracts an invoice field, routes an approval, or flags an anomaly, the audit trail must be as clear as if a human made that decision. Flowtaris AI is built for this from the ground up — every AI action is logged with the model version, input data hash, confidence score, and the business rule that triggered it.', stat: { value: '100%', label: 'of AI decisions logged with full explainability' } },
    steps: [], technicalDetails: [], integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Splunk', 'ServiceNow', 'Microsoft Purview'],
    faqs: [], cta: { headline: 'Ready to deploy AI your auditors will approve?', body: 'Start your compliance readiness assessment.', primaryLabel: 'Start Assessment', primaryHref: '/assessment', secondaryLabel: 'Calculate ROI', secondaryHref: '/roi-calculator' },
    relatedCapabilities: [],
  },
}

// ─── TYPE DEFINITIONS ──────────────────────────────────────────────────────────
interface CapabilityPage {
  slug: string
  category: string
  title: string
  headline: string
  subheadline: string
  seo: { title: string; description: string; ogImage?: string; keywords: string }
  stats: { value: string; label: string; context: string }[]
  problem: { eyebrow: string; headline: string; body: string; stat: { value: string; label: string } }
  steps: { eyebrow: string; headline: string; body: string; image: string; imageAlt: string; imageRight: boolean; bullets: string[] }[]
  technicalDetails: { component: string; technology: string; description: string }[]
  integrations: string[]
  faqs: { question: string; answer: string }[]
  cta: { headline: string; body: string; primaryLabel: string; primaryHref: string; secondaryLabel: string; secondaryHref: string }
  relatedCapabilities: { slug: string; title: string; category: string }[]
}

// ─── METADATA ─────────────────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cap = CAPABILITIES[slug]

  if (!cap) return { title: 'Capability Not Found | Flowtaris AI' }

  return {
    title: cap.seo.title,
    description: cap.seo.description,
    keywords: cap.seo.keywords,
    authors: [{ name: 'Flowtaris AI', url: 'https://flowtaris.ai' }],
    alternates: {
      canonical: `https://flowtaris.ai/capabilities/${slug}`,
    },
    openGraph: {
      title: cap.seo.title,
      description: cap.seo.description,
      url: `https://flowtaris.ai/capabilities/${slug}`,
      siteName: 'Flowtaris AI',
      type: 'website',
      images: cap.seo.ogImage ? [{ url: cap.seo.ogImage, width: 1200, height: 630, alt: cap.title }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: cap.seo.title,
      description: cap.seo.description,
      images: cap.seo.ogImage ? [cap.seo.ogImage] : [],
    },
  }
}

export const revalidate = 60

// ─── FAQ ACCORDION (Client Component pattern via state-less accordion) ─────────
function FaqItem({ question, answer, idx }: { question: string; answer: string; idx: number }) {
  return (
    <details
      className="group border-b border-white/10 last:border-0"
      name="faq-group"
    >
      <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none select-none">
        <span className="text-white font-semibold text-base leading-snug pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 text-white/40 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="pb-6 text-slate-300 text-sm leading-relaxed max-w-3xl">
        {answer}
      </div>
    </details>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default async function CapabilityDetailPage({ params }: Props) {
  const { slug } = await params
  const cap = CAPABILITIES[slug]

  if (!cap) notFound()

  // JSON-LD schemas for AEO + GEO
  const faqSchema = cap.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cap.faqs.map(f => ({
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
    description: cap.seo.description,
    url: `https://flowtaris.ai/capabilities/${slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'Flowtaris',
      url: 'https://flowtaris.ai',
      sameAs: ['https://flowtaris.com'],
    },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Contact for enterprise pricing' },
  }

  return (
    <>
      {/* JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="min-h-screen bg-[#0d0b14] text-white">

        {/* ── HERO ── */}
        <section className="pt-32 pb-20 px-6 relative overflow-hidden" aria-labelledby="hero-heading">
          <div className="absolute inset-0 bg-gradient-radial from-cyan-900/20 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-5xl mx-auto relative">
            <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-4">{cap.category}</div>
            <h1 id="hero-heading" className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6 text-white max-w-4xl">
              {cap.headline}
            </h1>
            <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mb-12">
              {cap.subheadline}
            </p>
            <div className="flex flex-wrap gap-4 mb-20">
              <Link href={cap.cta.primaryHref} className="inline-flex items-center gap-2 bg-white text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors">
                Start Assessment <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/cost-of-inaction" className="inline-flex items-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors">
                Calculate Cost of Inaction
              </Link>
            </div>

            {/* Stats bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden">
              {cap.stats.map((stat) => (
                <div key={stat.label} className="bg-[#0d0b14] p-6 text-center">
                  <div className="text-3xl md:text-4xl font-black font-mono text-white mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-slate-300 mb-1">{stat.label}</div>
                  <div className="text-[10px] text-slate-500">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ── */}
        <section className="py-20 px-6 bg-[#0a0910]" aria-labelledby="problem-heading">
          <div className="max-w-5xl mx-auto">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">{cap.problem.eyebrow}</div>
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 id="problem-heading" className="text-2xl md:text-3xl font-black text-white leading-tight mb-6">
                  {cap.problem.headline}
                </h2>
                {cap.problem.body.split('\n\n').map((para, i) => (
                  <p key={i} className="text-slate-300 leading-relaxed mb-4 text-sm">{para}</p>
                ))}
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <div className="text-6xl md:text-7xl font-black font-mono text-white mb-3">{cap.problem.stat.value}</div>
                <div className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">{cap.problem.stat.label}</div>
                <div className="mt-6 text-xs text-slate-600 uppercase tracking-wider">Source: Flowtaris AI benchmark across 200+ enterprise deployments</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS (alternating steps) ── */}
        {cap.steps.length > 0 && (
          <section className="py-20 px-6" aria-labelledby="how-heading">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">HOW IT WORKS</div>
                <h2 id="how-heading" className="text-3xl md:text-4xl font-black text-white">
                  From document received to ERP posted — in 3 minutes.
                </h2>
              </div>

              <div className="space-y-24">
                {cap.steps.map((step, idx) => (
                  <div
                    key={step.eyebrow}
                    className={`grid md:grid-cols-2 gap-12 md:gap-20 items-center ${step.imageRight ? '' : 'md:[&>*:first-child]:order-2'}`}
                  >
                    {/* Text */}
                    <div className={step.imageRight ? '' : 'md:order-2'}>
                      <div className="text-xs font-bold uppercase tracking-widest text-cyan-400 mb-3">{step.eyebrow}</div>
                      <h3 className="text-2xl font-black text-white leading-tight mb-4">{step.headline}</h3>
                      {step.body.split('\n\n').map((para, i) => (
                        <p key={i} className="text-slate-300 text-sm leading-relaxed mb-4">{para}</p>
                      ))}
                      <ul className="space-y-2 mt-6">
                        {step.bullets.map(b => (
                          <li key={b} className="flex items-start gap-2 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Image */}
                    <div className={`relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 aspect-[4/3] ${step.imageRight ? '' : 'md:order-1'}`}>
                      <Image
                        src={step.image}
                        alt={step.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── TECHNICAL ARCHITECTURE ── */}
        {cap.technicalDetails.length > 0 && (
          <section className="py-20 px-6 bg-[#0a0910]" aria-labelledby="tech-heading">
            <div className="max-w-5xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">TECHNICAL ARCHITECTURE</div>
              <h2 id="tech-heading" className="text-2xl font-black text-white mb-10">
                What runs under the hood.
              </h2>
              <div className="rounded-2xl border border-white/10 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Component</th>
                      <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">Technology</th>
                      <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-500">What it does</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cap.technicalDetails.map((row, i) => (
                      <tr key={row.component} className={`border-b border-white/5 last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.02]'}`}>
                        <td className="px-6 py-4 font-semibold text-white">{row.component}</td>
                        <td className="px-6 py-4 text-cyan-400 font-mono text-xs">{row.technology}</td>
                        <td className="px-6 py-4 text-slate-300">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── INTEGRATIONS ── */}
        <section className="py-20 px-6" aria-labelledby="integrations-heading">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">PLATFORM INTEGRATIONS</div>
            <h2 id="integrations-heading" className="text-2xl font-black text-white mb-10">
              Works with the ERP stack you already have.
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {cap.integrations.map(i => (
                <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-slate-300 hover:border-cyan-400/40 hover:text-white transition-colors">
                  {i}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        {cap.faqs.length > 0 && (
          <section className="py-20 px-6 bg-[#0a0910]" aria-labelledby="faq-heading">
            <div className="max-w-3xl mx-auto">
              <div className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">FREQUENTLY ASKED QUESTIONS</div>
              <h2 id="faq-heading" className="text-2xl font-black text-white mb-10">
                Questions your team will ask. Answered.
              </h2>
              <div>
                {cap.faqs.map((faq, idx) => (
                  <FaqItem key={idx} question={faq.question} answer={faq.answer} idx={idx} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ── */}
        <section className="py-20 px-6" aria-labelledby="cta-heading">
          <div className="max-w-3xl mx-auto text-center">
            <h2 id="cta-heading" className="text-3xl font-black text-white mb-4">{cap.cta.headline}</h2>
            <p className="text-slate-300 text-sm leading-relaxed mb-10 max-w-xl mx-auto">{cap.cta.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={cap.cta.primaryHref} className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-black px-8 py-4 rounded-xl hover:bg-slate-100 transition-colors">
                {cap.cta.primaryLabel} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={cap.cta.secondaryHref} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/5 transition-colors">
                {cap.cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </section>

        {/* ── RELATED CAPABILITIES ── */}
        {cap.relatedCapabilities.length > 0 && (
          <section className="py-20 px-6 border-t border-white/10" aria-labelledby="related-heading">
            <div className="max-w-5xl mx-auto">
              <h2 id="related-heading" className="text-xl font-black text-white mb-8">Related Capabilities</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {cap.relatedCapabilities.map(r => (
                  <Link key={r.slug} href={`/capabilities/${r.slug}`} className="p-6 bg-white/5 border border-white/10 rounded-xl hover:border-white/25 hover:bg-white/10 transition-all group">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">{r.category}</div>
                    <div className="text-white font-bold group-hover:text-cyan-300 transition-colors">{r.title}</div>
                    <ChevronRight className="w-4 h-4 text-white/30 mt-3 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── BREADCRUMB FOOTER ── */}
        <div className="border-t border-white/10 py-8 px-6">
          <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-slate-600">
            <Link href="/" className="hover:text-slate-400 transition-colors">Flowtaris AI</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/capabilities" className="hover:text-slate-400 transition-colors">Capabilities</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-500">{cap.title}</span>
          </div>
        </div>
      </div>
    </>
  )
}