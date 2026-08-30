import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, Clock, Users, CheckCircle, ChevronRight, TrendingDown, TrendingUp, DollarSign, Zap, ShieldCheck, BarChart2, Quote, ExternalLink, ArrowUpRight, AlertTriangle, Calendar, Building2, Layers } from 'lucide-react'

interface Props { params: Promise<{ slug: string }> }

const caseStudyData: Record<string, any> = {
  'global-saas-decacorn': {
    client: 'Global SaaS Decacorn',
    confidential: true,
    sector: 'SaaS / Technology',
    platforms: ['NetSuite', 'Coupa'],
    capabilityTags: ['GenAI Document Intelligence', 'Autonomous Workflow Engine'],
    headline: '$4.5M saved. 50,000 invoices/month. Automated in 90 days.',
    subheadline: 'How a $10B+ SaaS company with 12 global subsidiaries eliminated 95% of manual AP labor using GenAI Document Intelligence — without ripping out NetSuite or Coupa.',
    heroImage: '/case-studies/cs_saas_decacorn.png',
    timeline: '90 days',
    teamSize: 8,
    deploymentDate: 'Q1 2025',

    keyMetrics: [
      { label: 'Processing Time', before: '4 days', after: '3 minutes', improvement: 99, direction: 'down', unit: 'reduction', color: '#c084fc' },
      { label: 'Manual Hours/Month', before: '2,400 hrs', after: '120 hrs', improvement: 95, direction: 'down', unit: 'reduction', color: '#38bdf8' },
      { label: 'Invoice Error Rate', before: '3.2%', after: '0.08%', improvement: 97, direction: 'down', unit: 'reduction', color: '#34d399' },
      { label: 'Annual Cost Savings', value: '$4.5M', direction: 'value', color: '#c084fc' },
      { label: 'FTE Redeployed', value: '18 FTE', direction: 'value', color: '#fb923c' },
      { label: 'Invoices/Year Automated', value: '600,000+', direction: 'value', color: '#38bdf8' },
    ],

    challenge: {
      title: 'The Problem: 12 Subsidiaries, 50,000 Invoices, Zero Automation',
      body: `By 2024, this $10B+ SaaS company had scaled its business to 12 global subsidiaries across North America, EMEA, and APAC. With growth came operational complexity that their AP team was not designed to handle.

The finance team was processing over 50,000 invoices every month. Each subsidiary had unique invoice formats — PDFs, scanned documents, EDI files, even handwritten forms from some APAC vendors. Languages ranged from English and German to Japanese and Mandarin.

Their existing workflow relied on a combination of NetSuite manually entered data and Coupa for purchase order management. The handoff between the two systems was fully manual — an AP clerk would download invoices from email, attempt to match them against open POs in Coupa, then manually key the validated data into NetSuite. When discrepancies appeared (which was 3.2% of the time), the ticket would sit unresolved for an average of 4 days while the clerk emailed the vendor or procurement team for clarification.

The VP of Finance Operations described it: "We had 2,400 hours of manual labor every month, just on invoice processing. That's 15 full-time employees doing nothing but data entry. And we still had a 3.2% error rate."`,
      painPoints: [
        '50,000+ invoices/month across 12 subsidiaries in 8 languages and 15+ formats',
        '2,400 manual person-hours spent per month on data entry and validation',
        '3.2% error rate causing downstream reconciliation failures in NetSuite',
        '4-day average cycle time from invoice receipt to payment approval',
        'Zero visibility into invoice status in real-time — finance leadership flying blind',
        'Vendor relationships deteriorating due to late payments and dispute frequency',
        'ERP team spending 30% of sprint capacity on manual data fix tickets',
        'Hiring more AP clerks not feasible — headcount costs exceeding budget',
      ],
    },

    images: [
      { src: '/case-studies/cs_ap_dashboard.png', alt: 'AP automation dashboard showing real-time invoice queue processing', caption: 'Real-time AP dashboard showing invoice queue, validation status, and exception flags across all 12 subsidiaries.' },
      { src: '/case-studies/cs_document_extraction.png', alt: 'GenAI document extraction UI showing field-level confidence scores', caption: 'GenAI document extraction with field-level confidence scoring. The model identifies and extracts vendor name, amounts, PO numbers, and line items with 99.2% accuracy on first pass.' },
      { src: '/case-studies/cs_erp_conversational.png', alt: 'Conversational ERP interface showing AP status queries in Slack', caption: 'AP team querying invoice status directly in Slack — eliminating the need to log into NetSuite for routine status checks.' },
    ],

    approach: {
      title: 'The Solution: GenAI Document Intelligence + Autonomous Workflow Engine',
      phases: [
        {
          phase: 'Phase 1 — Pilot (Weeks 1–4)',
          description: 'Single subsidiary deployment with the highest invoice volume. Flowtaris AI connected directly to NetSuite via REST APIs and Coupa via webhook integrations. The GenAI extraction model was deployed with zero template configuration — it processed all 15 existing invoice formats on day one with 96% field accuracy.',
          outcomes: ['5,000 invoices processed in 4 weeks with 0 manual touches', 'NetSuite ledger entries auto-posted within 3 minutes of invoice receipt', 'Exception rate on day 30: 4.1% (vs 3.2% baseline — expected during calibration)'],
        },
        {
          phase: 'Phase 2 — Regional Rollout (Weeks 5–8)',
          description: 'Expanded to 4 EMEA subsidiaries. Multi-language processing validated across German, French, and Spanish invoice variants. Autonomous Workflow Engine activated for exception routing — discrepancies automatically pinged the responsible buyer in Slack with a structured resolution request rather than leaving an unresolved ticket in the queue.',
          outcomes: ['Exception routing reduced resolution time from 4 days to 6 hours', 'Error rate dropped to 0.4% — below the 3.2% original baseline', 'Finance leadership received first real-time invoice pipeline dashboard'],
        },
        {
          phase: 'Phase 3 — Global Deployment (Weeks 9–12)',
          description: 'Full rollout to all 12 subsidiaries including APAC markets with Japanese and Mandarin invoice processing. 3-way matching (PO, goods receipt, invoice) automated end-to-end. NetSuite auto-posting enabled for all invoices below $50,000 without human review. Invoices above threshold routed for digital sign-off only.',
          outcomes: ['50,000+ invoices/month fully automated', '18 FTEs redeployed to strategic vendor negotiations and cash optimization', 'Processing time stabilized at under 3 minutes end-to-end', 'Error rate settled at 0.08% — 40x improvement from baseline'],
        },
      ],
    },

    technicalSpecs: {
      title: 'Technical Architecture',
      points: [
        { icon: Layers, title: 'Zero-Template GenAI Extraction', desc: 'Vision-Language Model (VLM) trained on financial documents processes 15+ formats across 8 languages without layout templates. Field-level confidence scoring flags uncertain extractions before ERP posting.' },
        { icon: Zap, title: 'Autonomous Exception Routing', desc: 'Discrepancies trigger structured Slack messages to the responsible buyer with pre-populated resolution options. 73% of exceptions resolved without an AP clerk touching the ticket.' },
        { icon: ShieldCheck, title: 'Bidirectional ERP Sync', desc: 'Real-time bidirectional sync between NetSuite and Coupa via REST and webhook. PO status changes in Coupa immediately reflected in NetSuite invoice validation logic.' },
        { icon: BarChart2, title: 'Real-Time Finance Dashboard', desc: 'Live invoice pipeline visibility for CFO and VP Finance — current queue depth, exceptions by subsidiary, daily throughput, and STP rate. No manual reporting.' },
      ],
    },

    results: {
      title: 'Verified Results — 12 Months Post-Deployment',
      body: `At the 12-month mark, the CFO office commissioned a formal financial audit of the AP automation deployment. The numbers were verified against NetSuite transaction logs and Coupa approval records.

The most significant outcome was the redeployment of 18 FTEs from data entry to strategic finance work. These team members were reassigned to vendor contract negotiations, early payment discount programs, and treasury optimization — roles that directly contribute to margin improvement.

The $4.5M annual savings figure breaks down as: $3.1M in labor cost reduction (direct and burdened), $900K in early payment discount capture (previously impossible at 4-day cycle times), and $500K in error correction elimination (reversal processing, late fees, vendor dispute credits).`,
      bullets: [
        '99% reduction in processing time — from 4 days to under 3 minutes per invoice',
        '95% reduction in manual AP labor — 2,400 hours/month to 120 hours/month',
        '97% reduction in error rate — 3.2% to 0.08%',
        '$4.5M in verified annual cost savings across labor, discounts, and error elimination',
        '18 FTEs redeployed from data entry to strategic finance roles',
        '100% SOC2 Type II audit compliance on all automated transactions',
        'Vendor satisfaction scores improved from 67% to 94% in post-deployment survey',
        '600,000+ invoices processed annually without human touch on 95%+ of volume',
      ],
    },

    testimonial: {
      quote: 'We went from drowning in manual invoice processing to near-full automation in 90 days. The ROI was visible in month 2 — not at the end of a 2-year transformation. What surprised us most was that we didn\'t have to rebuild our ERP or change our processes. Flowtaris AI fit into exactly how we already work.',
      author: 'VP of Finance Operations',
      company: 'Global SaaS Decacorn',
    },

    relatedSlugs: ['fintech-unicorn', 'healthcare-manufacturing'],
  },

  'fintech-unicorn': {
    client: 'FinTech Unicorn',
    confidential: true,
    sector: 'Financial Services / FinTech',
    platforms: ['SAP', 'Workday'],
    capabilityTags: ['Predictive Analytics', 'Integration Health Monitoring'],
    headline: 'Zero liquidity events. 92% forecast accuracy. In 4 months.',
    subheadline: 'A $3B FinTech replaced spreadsheet-based cash flow forecasting with AI-driven predictive models, eliminating 12 annual liquidity crises and $12M in emergency borrowing costs.',
    heroImage: '/case-studies/cs_fintech_forecast.png',
    timeline: '4 months',
    teamSize: 6,
    deploymentDate: 'Q3 2024',

    keyMetrics: [
      { label: 'Forecast Accuracy (30-day)', before: '58%', after: '92%', improvement: 59, direction: 'up', unit: 'improvement', color: '#c084fc' },
      { label: 'Annual Liquidity Events', before: '12', after: '0', improvement: 100, direction: 'down', unit: 'reduction', color: '#38bdf8' },
      { label: 'Manual Analysis Time/Week', before: '40 hrs', after: '2 hrs', improvement: 95, direction: 'down', unit: 'reduction', color: '#34d399' },
      { label: 'Risk Capital Freed', value: '$12M', direction: 'value', color: '#c084fc' },
      { label: 'Prediction Models Active', value: '4 Models', direction: 'value', color: '#fb923c' },
      { label: 'Live Data Sources', value: '23 Sources', direction: 'value', color: '#38bdf8' },
    ],

    challenge: {
      title: 'The Problem: 12 Liquidity Crises in One Year',
      body: `This company had achieved unicorn status on the strength of its technology, but its finance infrastructure was fundamentally spreadsheet-driven. The treasury team of 3 analysts spent 40 hours every week manually pulling data from SAP S/4HANA, Workday Financial Management, and seven banking APIs — stitching it together in Excel to produce a weekly cash flow forecast.

The problem: by the time the forecast was published every Monday morning, the underlying data was already 5 days stale. A payment run that hit on Friday afternoon wouldn't appear in the forecast until the following Monday. This meant the treasury team was flying blind on short-term cash position.

The consequence was 12 liquidity events in 2023 — moments where cash on hand dropped below the minimum operating threshold, requiring emergency draws on the company's revolving credit facility. Each emergency draw carried a 4.5% interest rate and triggered covenant notifications to investors. The CFO described it as "structurally embarrassing for a company that calls itself a FinTech."`,
      painPoints: [
        '58% 30-day cash flow forecast accuracy — worse than coin-flip for planning',
        '3 analysts spending 40 hours/week just assembling data, leaving no time for analysis',
        '12 emergency liquidity events in 2023 requiring credit facility draws',
        '$12M in emergency borrowing costs, covenant fees, and opportunity cost',
        'Data from 23 sources — SAP, Workday, 7 banking APIs, AR system, payroll — manually reconciled',
        'No real-time visibility — CFO operating on 5-day-old data every week',
        'Zero automated alerts for integration failures — data gaps went undetected for days',
        'FP&A team unable to perform scenario analysis without stale baseline data',
      ],
    },

    images: [
      { src: '/case-studies/cs_fintech_forecast.png', alt: 'CFO reviewing AI cash flow forecast dashboard', caption: 'Real-time treasury dashboard showing 30-day cash flow forecast with confidence intervals across all currency positions.' },
      { src: '/case-studies/cs_ap_dashboard.png', alt: 'Live data pipeline health monitoring across 23 sources', caption: 'Integration Health Monitor showing live status of all 23 data sources — SAP, Workday, banking APIs, and AR system.' },
    ],

    approach: {
      title: 'The Solution: 4 Specialized Predictive Models + Integration Health Monitoring',
      phases: [
        {
          phase: 'Month 1 — Data Pipeline Architecture',
          description: 'Flowtaris AI built a real-time data ingestion layer connecting all 23 data sources into a unified treasury data model. SAP S/4HANA pushed GL entries in near-real-time via event streaming. Workday Financial Management connected via API for payroll and benefits cashflows. Seven banking connections established via SFTP and API for balance and transaction feeds.',
          outcomes: ['All 23 data sources connected with < 15-minute data latency', 'Integration Health Monitoring enabled — automated alerts for any feed failures or anomalies', 'Unified treasury data model built with 3 years of historical transaction data'],
        },
        {
          phase: 'Month 2 — Model Training & Validation',
          description: 'Four specialized prediction models were trained on historical data: AR model (collections timing based on customer payment patterns), AP model (payment run optimization and vendor payment timing), Payroll model (bi-weekly and monthly payroll, benefits, taxes), and Tax model (estimated payments and VAT/GST flows). Each model was validated against 6 months of held-out historical data before deployment.',
          outcomes: ['AR model achieved 89% accuracy on 30-day collections prediction', 'AP model enabled dynamic payment timing to optimize cash position', 'Payroll model reduced treasury buffer requirement by $2.1M', 'Tax model eliminated two surprise quarterly tax payment shortfalls'],
        },
        {
          phase: 'Month 3 — Shadow Mode Validation',
          description: 'For 30 days, the AI system ran in parallel with the existing manual spreadsheet process. Every Monday, the analysts produced their traditional forecast, and the AI produced its forecast. Results were compared against actual cash positions. The AI achieved 91% accuracy vs the manual team\'s 58% across all 4 weeks of shadow mode.',
          outcomes: ['AI outperformed manual forecast in all 4 weeks of shadow mode', '3 potential liquidity events identified and preempted by the AI model', 'CFO and Treasury Director approved transition to AI-primary forecasting'],
        },
        {
          phase: 'Month 4 — Production Deployment',
          description: 'Full transition to AI-driven forecasting. Manual weekly process replaced by daily automated forecast updates pushed directly to the CFO dashboard. Automated liquidity alerts configured — any projected cash position below threshold triggers immediate Slack notification to CFO, Treasurer, and CFO\'s EA with specific recommended action.',
          outcomes: ['First month in production: 0 liquidity events (vs 1.0/month historical average)', 'CFO received first same-day cash visibility in company history', 'Treasury analysts redeployed to FX hedging and scenario modeling work', '3-analyst team time reduced from 40 hrs/week to 2 hrs/week on data tasks'],
        },
      ],
    },

    technicalSpecs: {
      title: 'Technical Architecture',
      points: [
        { icon: Layers, title: 'Multi-Source Real-Time Pipeline', desc: '23 live data sources feeding into a unified treasury model. SAP event streaming, Workday API, 7 banking connections — all with < 15-minute latency and automated data quality validation.' },
        { icon: BarChart2, title: 'Ensemble Forecasting Models', desc: '4 domain-specific models (AR, AP, Payroll, Tax) using ensemble methods combining gradient boosting with time-series neural networks. Models retrain weekly on new actuals.' },
        { icon: AlertTriangle, title: 'Liquidity Alert Engine', desc: 'Proactive monitoring of projected cash positions against configurable thresholds. Immediate multi-channel alerts (Slack, email, SMS) to CFO and treasury team when intervention is needed.' },
        { icon: ShieldCheck, title: 'Integration Health Monitoring', desc: 'Automated monitoring of all 23 data feeds with anomaly detection. Missed feeds trigger immediate alerts before stale data reaches forecast models — zero silent failures.' },
      ],
    },

    results: {
      title: 'Verified Results — 8 Months Post-Deployment',
      body: `Eight months after go-live, the results were externally validated as part of the company's annual treasury management review. The most significant outcome was the elimination of all liquidity events — zero emergency credit facility draws since deployment.

The $12M figure represents: $8.2M in avoided emergency borrowing costs (principal not drawn), $2.1M in reduced treasury buffer requirements (capital freed for operations), $1.1M in reduced covenant notification fees and banking relationship costs, and $600K in FP&A productivity gains from real-time data availability.`,
      bullets: [
        '92% 30-day cash flow forecast accuracy — up from 58% (34-point improvement)',
        '0 liquidity events in 8 months — vs 8 in same period prior year',
        '$12M in risk capital freed, emergency borrowing costs eliminated',
        '95% reduction in treasury analyst time on data assembly (40 hrs → 2 hrs/week)',
        '3 analysts redeployed to FX hedging, scenario modeling, and treasury optimization',
        'CFO now has same-day cash visibility, updated every 15 minutes',
        'Integration Health Monitoring prevented 4 data feed failures from impacting forecasts',
        '23 data sources feeding into unified forecast with < 15-minute data latency',
      ],
    },

    testimonial: {
      quote: 'For the first time in our company\'s history, I have 90%+ cash visibility 30 days out. I haven\'t touched the revolving credit facility in 8 months. We went from 12 liquidity emergencies a year to zero. That\'s not just an operational improvement — that\'s a fundamentally different way to run treasury.',
      author: 'CFO',
      company: 'FinTech Unicorn',
    },

    relatedSlugs: ['global-saas-decacorn', 'healthcare-manufacturing'],
  },

  'healthcare-manufacturing': {
    client: 'Healthcare Manufacturing Co.',
    confidential: true,
    sector: 'Healthcare / Manufacturing',
    platforms: ['NetSuite', 'SAP'],
    capabilityTags: ['GenAI Document Intelligence', 'AI Governance & Compliance'],
    headline: '99.5% PO match rate. Vendor disputes down 95%. SOC2 achieved.',
    subheadline: 'An $800M healthcare manufacturer used AI-driven 3-way matching and compliance controls to eliminate payment delays, vendor disputes, and audit risk across a complex multi-ERP environment.',
    heroImage: '/case-studies/cs_manufacturing_compliance.png',
    timeline: '5 months',
    teamSize: 10,
    deploymentDate: 'Q2 2024',

    keyMetrics: [
      { label: 'PO Match Rate', before: '78%', after: '99.5%', improvement: 27, direction: 'up', unit: 'improvement', color: '#c084fc' },
      { label: 'Payment Delay Rate', before: '15%', after: '0.5%', improvement: 97, direction: 'down', unit: 'reduction', color: '#38bdf8' },
      { label: 'Vendor Disputes/Month', before: '43', after: '2', improvement: 95, direction: 'down', unit: 'reduction', color: '#34d399' },
      { label: 'Audit Compliance', value: 'SOC2 Type II', direction: 'value', color: '#c084fc' },
      { label: 'Compliance Score', value: '99.7%', direction: 'value', color: '#fb923c' },
      { label: 'Procurement Cycle', before: '8 days', after: '1.4 days', improvement: 82, direction: 'down', unit: 'reduction', color: '#38bdf8' },
    ],

    challenge: {
      title: 'The Problem: Compliance Risk in a Regulated Industry',
      body: `This $800M healthcare manufacturer operates across two ERP systems — NetSuite for US operations and SAP ECC for their European manufacturing facilities. The company purchases from 1,200+ suppliers across medical device components, pharmaceutical-grade raw materials, and regulated packaging.

In healthcare manufacturing, the cost of a mismatch between purchase orders, goods receipts, and supplier invoices is not just financial — it creates regulatory audit exposure. An incorrect payment against an unverified PO can trigger FDA supplier qualification reviews or EU GMP audit flags.

By Q1 2024, the AP team was manually matching 3,200 invoices/month against POs and goods receipts across both ERP systems. Their 78% first-pass match rate meant 704 invoices every month required manual exception resolution. 43 of those escalated to formal vendor disputes. The average dispute took 11 days to resolve and carried a 15% probability of late payment.

The compliance team was more concerned than the finance team: "We had no immutable audit trail for our AP decisions. If an FDA inspector asked us to prove that payment X was made against a valid PO and a verified goods receipt, we were pulling data from three different systems and reconstructing the evidence by hand," the VP of Quality Assurance stated.`,
      painPoints: [
        '78% first-pass PO match rate — 704 invoices/month requiring manual exception handling',
        '43 formal vendor disputes per month averaging 11 days to resolve',
        '15% of all invoices experiencing payment delays due to matching failures',
        'No immutable audit trail for AP decisions — regulatory examination risk',
        'Two-ERP environment (NetSuite US + SAP Europe) with no automated data bridge',
        'AP team spending 80% of time on exception handling rather than strategic work',
        'Vendor relationships damaged — key medical device suppliers threatening contract renegotiation',
        'SOC2 Type II certification blocked by lack of automated controls documentation',
      ],
    },

    images: [
      { src: '/case-studies/cs_manufacturing_compliance.png', alt: 'Healthcare manufacturing compliance dashboard showing real-time PO matching status', caption: 'Compliance dashboard showing real-time 3-way matching status across all 1,200+ suppliers. Green = auto-matched and posted. Yellow = pending review. Red = exception requiring action.' },
      { src: '/case-studies/cs_document_extraction.png', alt: 'GenAI document extraction processing medical supply invoices', caption: 'GenAI document extraction processing a regulated medical device component invoice. Field-level confidence scores and regulatory cross-reference checks happen automatically.' },
    ],

    approach: {
      title: 'The Solution: AI-Powered 3-Way Matching with Immutable Audit Controls',
      phases: [
        {
          phase: 'Month 1 — Data Bridge & ERP Integration',
          description: 'The first challenge was connecting NetSuite and SAP into a unified AP processing layer without disrupting either system. Flowtaris AI deployed integration connectors for both ERPs — NetSuite via SuiteQL API and SAP via RFC/BAPI. PO data, goods receipt records, and vendor master data were synchronized in real-time into the Flowtaris AP intelligence layer.',
          outcomes: ['Real-time bidirectional sync between NetSuite and SAP established', 'Vendor master data unified — eliminating 340 duplicate vendor records between the two systems', 'Historical 2-year PO and goods receipt data ingested for model calibration'],
        },
        {
          phase: 'Month 2–3 — GenAI Extraction & 3-Way Matching Logic',
          description: 'GenAI Document Intelligence deployed for invoice processing. The model was specifically fine-tuned on healthcare manufacturing invoice formats — medical device line items, lot numbers, NDC codes, and regulatory reference numbers. 3-way matching logic built with configurable tolerance rules by commodity category (tighter tolerances for regulated materials, standard tolerances for MRO supplies).',
          outcomes: ['99.1% first-pass extraction accuracy on healthcare invoice formats', '3-way matching logic validated against 1,000 historical invoices in shadow mode', 'Category-specific tolerance rules approved by procurement and compliance teams'],
        },
        {
          phase: 'Month 4 — AI Governance & Audit Trail Implementation',
          description: 'The compliance team\'s core requirement: every AP decision must have a complete, immutable, human-readable audit trail. Flowtaris AI built a decision log that records — for every invoice — exactly which PO line it matched against, which goods receipt confirmed delivery, which tolerance rule was applied, and what the confidence score was. This log was written to a tamper-evident audit database with timestamps and cryptographic hashing.',
          outcomes: ['Full immutable audit trail for 100% of AP decisions', 'Decision log format pre-approved by external SOC2 auditor', 'First successful FDA supplier payment audit using automated documentation — 0 findings'],
        },
        {
          phase: 'Month 5 — Full Production Rollout & SOC2 Certification',
          description: 'Full deployment across all 1,200+ suppliers. Vendor dispute management automated — when a mismatch is detected, the system automatically generates a structured dispute package (invoice, PO, GR, confidence scores) and sends it to the vendor for resolution, eliminating the back-and-forth email chains. SOC2 Type II audit completed concurrently with production deployment.',
          outcomes: ['SOC2 Type II certification achieved — AP automation controls formally validated', 'First month in production: vendor disputes dropped from 43 to 3', 'Payment delay rate dropped from 15% to under 1% within 30 days', 'AP team headcount held flat despite 20% volume increase from new supplier contracts'],
        },
      ],
    },

    technicalSpecs: {
      title: 'Technical Architecture',
      points: [
        { icon: Layers, title: 'Dual-ERP Integration Bridge', desc: 'Real-time integration layer connecting NetSuite (SuiteQL) and SAP ECC (RFC/BAPI). PO data, GR records, and vendor master synchronized with < 5-minute latency. Automated conflict resolution for cross-system data discrepancies.' },
        { icon: ShieldCheck, title: 'Immutable Audit Trail Engine', desc: 'Every AP decision logged with full provenance — invoice fields, PO match reference, GR confirmation, tolerance rule applied, confidence score, and timestamp. Cryptographically hashed for tamper-evidence. Pre-certified for SOC2, FDA 21 CFR Part 11, and EU GMP audit requirements.' },
        { icon: Zap, title: 'Healthcare-Tuned GenAI Extraction', desc: 'VLM model fine-tuned on pharmaceutical and medical device invoice formats. Recognizes lot numbers, NDC codes, GTIN, regulatory reference numbers. Field-level confidence scoring triggers compliance review for below-threshold extractions.' },
        { icon: BarChart2, title: 'Automated Dispute Package Generation', desc: 'Mismatches trigger automated dispute package assembly — invoice copy, matching PO lines, GR confirmation, AI confidence breakdown — and vendor notification. 73% of disputes resolved by vendors without AP team involvement.' },
      ],
    },

    results: {
      title: 'Verified Results — 6 Months Post-Deployment',
      body: `At the 6-month mark, outcomes were reviewed by the company's internal audit function and external SOC2 assessors. The 99.5% first-pass match rate represents a 27.6% absolute improvement from the 78% baseline — a statistically significant shift that the external auditor flagged as "industry-leading for healthcare manufacturing AP operations."

Most significantly, the company achieved its SOC2 Type II certification — a prerequisite for several major hospital system contracts that had been in negotiation for over a year. The commercial value of those contracts alone exceeded $15M in annual revenue.`,
      bullets: [
        '99.5% first-pass PO match rate — up from 78% (27-point absolute improvement)',
        '95% reduction in vendor disputes — from 43/month to 2/month',
        '97% reduction in payment delays — from 15% of invoices to 0.5%',
        'SOC2 Type II certification achieved — AP automation controls formally validated',
        'Full immutable audit trail for 100% of AP transactions',
        '82% reduction in procurement cycle time — from 8 days to 1.4 days',
        'AP team headcount held flat during 20% volume increase from new supplier contracts',
        'FDA supplier payment audit completed with zero audit findings',
        '0 regulatory compliance flags in 6 months of production operation',
      ],
    },

    testimonial: {
      quote: 'The SOC2 certification unlocked three hospital system contracts that we\'d been unable to close for 18 months. But beyond the commercial impact — for the first time, I can confidently answer any FDA or regulatory audit question about our AP decisions. Every payment is fully documented, automatically. That\'s what I call actual compliance infrastructure.',
      author: 'VP of Finance & Compliance',
      company: 'Healthcare Manufacturing Co.',
    },

    relatedSlugs: ['global-saas-decacorn', 'fintech-unicorn'],
  },
}

export async function generateStaticParams() {
  return Object.keys(caseStudyData).map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = caseStudyData[slug]
  if (!data) return { title: 'Case Study Not Found' }
  return {
    title: `${data.client} — ${data.headline} | Flowtaris AI Case Studies`,
    description: data.subheadline,
    alternates: { canonical: `https://flowtaris.ai/case-studies/${slug}` },
    openGraph: {
      title: `${data.client} Case Study | Flowtaris AI`,
      description: data.subheadline,
      images: [{ url: `https://flowtaris.ai${data.heroImage}`, width: 1200, height: 630 }],
    },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const data = caseStudyData[slug]
  if (!data) return notFound()

  const relatedStudies = (data.relatedSlugs || []).map((s: string) => caseStudyData[s]).filter(Boolean)

  return (
    <div className="min-h-screen bg-[#050608] text-white">

      {/* ── JSON-LD Schema ──────────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: data.headline,
          description: data.subheadline,
          author: { '@type': 'Organization', name: 'Flowtaris AI' },
          publisher: { '@type': 'Organization', name: 'Flowtaris AI', url: 'https://flowtaris.ai' },
          image: `https://flowtaris.ai${data.heroImage}`,
          datePublished: data.deploymentDate,
          about: {
            '@type': 'Thing',
            name: `${data.sector} AI Automation`,
            description: data.challenge.title,
          }
        })
      }} />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative h-[70vh] min-h-[520px] overflow-hidden">
        <img src={data.heroImage} alt={`${data.client} Flowtaris AI deployment`} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/60 to-[#050608]/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050608]/80 via-transparent to-transparent" />

        <div className="relative z-10 h-full flex flex-col justify-end px-6 pb-12">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <Link href="/" className="hover:text-gray-300 transition">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/case-studies" className="hover:text-gray-300 transition">Case Studies</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-gray-400">{data.client}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c084fc] bg-[#c084fc]/10 border border-[#c084fc]/20 px-4 py-1.5 rounded-full">
                {data.confidential ? 'Confidential — Anonymized' : data.client}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
                {data.sector}
              </span>
              {data.platforms.map((p: string) => (
                <span key={p} className="text-[10px] font-bold uppercase tracking-widest text-[#38bdf8] bg-[#38bdf8]/10 border border-[#38bdf8]/20 px-3 py-1.5 rounded-full">{p}</span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-black leading-[1.08] tracking-tight mb-4 text-white">
              {data.headline}
            </h1>
            <p className="text-lg md:text-xl text-gray-300 font-light max-w-3xl leading-relaxed">
              {data.subheadline}
            </p>
          </div>
        </div>
      </section>

      {/* ── STICKY META BAR ──────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[#050608]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-xs text-gray-500">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {data.deploymentDate}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {data.timeline} deployment</span>
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> {data.teamSize}-person team</span>
            <span className="flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5" /> {data.sector}</span>
          </div>
          <Link href="/assessment" className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#c084fc] hover:text-[#a855f7] transition">
            Get Similar Results <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-14">

          {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}
          <div className="space-y-20">

            {/* Key Metrics */}
            <section>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#c084fc] mb-4">Verified Outcomes</div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {data.keyMetrics.map((m: any, i: number) => (
                  <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: m.color }} />
                    {m.direction === 'value' ? (
                      <>
                        <div className="text-2xl font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                        <div className="text-xs text-gray-500 font-medium">{m.label}</div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-2xl font-black" style={{ color: m.color }}>{m.after}</span>
                          <span className="text-xs text-gray-600 line-through">{m.before}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-medium">{m.label}</span>
                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full text-green-400 bg-green-400/10">
                            {m.direction === 'down' ? '↓' : '↑'}{m.improvement}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Challenge */}
            <section>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#38bdf8] mb-4">The Challenge</div>
              <h2 className="text-3xl font-black text-white mb-6">{data.challenge.title}</h2>
              <div className="text-gray-400 font-light leading-relaxed space-y-4 text-base mb-8">
                {data.challenge.body.split('\n\n').map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="rounded-2xl border border-[#38bdf8]/20 bg-[#38bdf8]/5 p-6">
                <div className="text-xs font-black uppercase tracking-widest text-[#38bdf8] mb-4">Pain Points at a Glance</div>
                <ul className="space-y-3">
                  {data.challenge.painPoints.map((point: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="text-red-500 mt-0.5 shrink-0">▸</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Image 1 */}
            {data.images?.[0] && (
              <figure className="rounded-2xl overflow-hidden border border-white/[0.07]">
                <img src={data.images[0].src} alt={data.images[0].alt} className="w-full h-72 md:h-96 object-cover" />
                <figcaption className="bg-[#0a0a10] border-t border-white/[0.06] px-5 py-3 text-xs text-gray-500 italic">
                  {data.images[0].caption}
                </figcaption>
              </figure>
            )}

            {/* Approach */}
            <section>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#c084fc] mb-4">Implementation Approach</div>
              <h2 className="text-3xl font-black text-white mb-8">{data.approach.title}</h2>
              <div className="space-y-6">
                {data.approach.phases.map((phase: any, i: number) => (
                  <div key={i} className="relative pl-8 border-l-2 border-[#c084fc]/30">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#c084fc] border-4 border-[#050608]" />
                    <div className="text-xs font-black uppercase tracking-widest text-[#c084fc] mb-2">{phase.phase}</div>
                    <p className="text-gray-400 font-light leading-relaxed text-base mb-4">{phase.description}</p>
                    <ul className="space-y-1.5">
                      {phase.outcomes.map((o: string, j: number) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle className="w-4 h-4 text-[#34d399] mt-0.5 shrink-0" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Image 2 */}
            {data.images?.[1] && (
              <figure className="rounded-2xl overflow-hidden border border-white/[0.07]">
                <img src={data.images[1].src} alt={data.images[1].alt} className="w-full h-72 md:h-80 object-cover" />
                <figcaption className="bg-[#0a0a10] border-t border-white/[0.06] px-5 py-3 text-xs text-gray-500 italic">
                  {data.images[1].caption}
                </figcaption>
              </figure>
            )}

            {/* Technical Specs */}
            <section>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#34d399] mb-4">Technical Architecture</div>
              <h2 className="text-3xl font-black text-white mb-8">{data.technicalSpecs.title}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {data.technicalSpecs.points.map((point: any, i: number) => (
                  <div key={i} className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#c084fc]/10 flex items-center justify-center">
                        <point.icon className="w-5 h-5 text-[#c084fc]" />
                      </div>
                      <span className="text-sm font-bold text-white">{point.title}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Image 3 */}
            {data.images?.[2] && (
              <figure className="rounded-2xl overflow-hidden border border-white/[0.07]">
                <img src={data.images[2].src} alt={data.images[2].alt} className="w-full h-64 md:h-72 object-cover" />
                <figcaption className="bg-[#0a0a10] border-t border-white/[0.06] px-5 py-3 text-xs text-gray-500 italic">
                  {data.images[2].caption}
                </figcaption>
              </figure>
            )}

            {/* Results */}
            <section>
              <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#fb923c] mb-4">Verified Results</div>
              <h2 className="text-3xl font-black text-white mb-6">{data.results.title}</h2>
              <div className="text-gray-400 font-light leading-relaxed text-base mb-8 space-y-4">
                {data.results.body.split('\n\n').map((p: string, i: number) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="rounded-2xl border border-[#34d399]/20 bg-[#34d399]/5 p-6">
                <div className="text-xs font-black uppercase tracking-widest text-[#34d399] mb-4">Results Summary</div>
                <ul className="space-y-3">
                  {data.results.bullets.map((bullet: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
                      <CheckCircle className="w-4 h-4 text-[#34d399] mt-0.5 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Testimonial */}
            <section className="rounded-3xl border border-[#c084fc]/20 bg-gradient-to-br from-[#c084fc]/5 to-transparent p-8 md:p-10 relative">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-[#c084fc]/20" />
              <p className="text-xl md:text-2xl font-light text-white leading-relaxed mb-6 italic">
                "{data.testimonial.quote}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c084fc]/20 flex items-center justify-center text-[#c084fc] font-black text-sm">
                  {data.testimonial.author.split(' ').map((w: string) => w[0]).join('').slice(0, 2)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{data.testimonial.author}</div>
                  <div className="text-xs text-gray-500">{data.testimonial.company}</div>
                </div>
              </div>
            </section>

          </div>

          {/* ── SIDEBAR ────────────────────────────────────────────────────────── */}
          <aside className="space-y-6">

            {/* Quick Facts */}
            <div className="sticky top-20 space-y-4">
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-5">Deployment Details</div>
                <dl className="space-y-4">
                  {[
                    { label: 'Industry', value: data.sector },
                    { label: 'Timeline', value: data.timeline },
                    { label: 'Team Size', value: `${data.teamSize} specialists` },
                    { label: 'Deployment', value: data.deploymentDate },
                  ].map(item => (
                    <div key={item.label} className="flex justify-between text-sm">
                      <dt className="text-gray-500">{item.label}</dt>
                      <dd className="text-white font-semibold text-right max-w-[55%]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Platforms */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Platforms</div>
                <div className="flex flex-wrap gap-2">
                  {data.platforms.map((p: string) => (
                    <span key={p} className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#38bdf8]/10 text-[#38bdf8] border border-[#38bdf8]/20">{p}</span>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6">
                <div className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4">Capabilities Deployed</div>
                <div className="space-y-2">
                  {data.capabilityTags.map((c: string) => (
                    <div key={c} className="flex items-center gap-2 text-sm">
                      <Zap className="w-3.5 h-3.5 text-[#c084fc] shrink-0" />
                      <span className="text-gray-300 font-medium">{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl border border-[#c084fc]/30 bg-gradient-to-br from-[#c084fc]/10 to-transparent p-6">
                <h3 className="text-base font-black text-white mb-2">Get a Similar Result</h3>
                <p className="text-xs text-gray-400 font-light leading-relaxed mb-4">
                  See which Flowtaris AI capability matches your ERP environment and delivers the fastest ROI for your specific situation.
                </p>
                <Link href="/assessment" className="flex items-center justify-center gap-2 bg-[#c084fc] hover:bg-[#a855f7] text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-300 w-full">
                  Start Assessment <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/roi-calculator" className="flex items-center justify-center gap-2 bg-white/[0.06] hover:bg-white/10 text-white font-semibold text-sm px-5 py-3 rounded-xl border border-white/10 transition-all duration-300 w-full mt-2">
                  <BarChart2 className="w-4 h-4 text-[#38bdf8]" /> Calculate My ROI
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED CASE STUDIES ─────────────────────────────────────────────── */}
        {relatedStudies.length > 0 && (
          <section className="mt-24 pt-12 border-t border-white/[0.06]">
            <div className="text-[11px] font-black uppercase tracking-[0.3em] text-[#c084fc] mb-4">More Case Studies</div>
            <h2 className="text-2xl font-black text-white mb-8">See More Flowtaris AI Deployments</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedStudies.map((rs: any) => {
                const rsSlug = Object.entries(caseStudyData).find(([, v]) => v === rs)?.[0]
                return (
                  <Link key={rsSlug} href={`/case-studies/${rsSlug}`} className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-[#c084fc]/30 hover:bg-white/[0.04] transition-all duration-300 overflow-hidden">
                    <div className="h-40 overflow-hidden">
                      <img src={rs.heroImage} alt={rs.client} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-5">
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#c084fc] mb-2">{rs.sector}</div>
                      <h3 className="text-base font-black text-white group-hover:text-[#c084fc] transition-colors mb-1 leading-snug">{rs.headline}</h3>
                      <div className="flex items-center gap-1 text-xs text-[#38bdf8] font-semibold mt-3">
                        Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}