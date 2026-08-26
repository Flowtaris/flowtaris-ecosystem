import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle2, ArrowRight, ChevronDown, ChevronRight } from 'lucide-react'
import { createServerClient } from '@flowtaris/supabase-client'

interface Props {
  params: Promise<{ slug: string }>
}

// ─── PER-CAPABILITY COLOR IDENTITIES ─────────────────────────────────────────
const CAPABILITY_COLORS: Record<string, {
  accent: string        // primary highlight color
  accentMuted: string   // muted/bg version
  accentBorder: string  // border color
  glow: string          // glow effect color for CSS
  gradient: string      // hero gradient
}> = {
  'genai-document-intelligence': {
    accent: '#f59e0b',
    accentMuted: 'rgba(245,158,11,0.08)',
    accentBorder: 'rgba(245,158,11,0.25)',
    glow: 'rgba(245,158,11,0.15)',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(245,158,11,0.12) 0%, transparent 70%)',
  },
  'autonomous-workflow-engine': {
    accent: '#10b981',
    accentMuted: 'rgba(16,185,129,0.08)',
    accentBorder: 'rgba(16,185,129,0.25)',
    glow: 'rgba(16,185,129,0.15)',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(16,185,129,0.12) 0%, transparent 70%)',
  },
  'predictive-analytics': {
    accent: '#8b5cf6',
    accentMuted: 'rgba(139,92,246,0.08)',
    accentBorder: 'rgba(139,92,246,0.25)',
    glow: 'rgba(139,92,246,0.15)',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(139,92,246,0.12) 0%, transparent 70%)',
  },
  'conversational-erp': {
    accent: '#06b6d4',
    accentMuted: 'rgba(6,182,212,0.08)',
    accentBorder: 'rgba(6,182,212,0.25)',
    glow: 'rgba(6,182,212,0.15)',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(6,182,212,0.12) 0%, transparent 70%)',
  },
  'integration-health-monitoring': {
    accent: '#ef4444',
    accentMuted: 'rgba(239,68,68,0.08)',
    accentBorder: 'rgba(239,68,68,0.25)',
    glow: 'rgba(239,68,68,0.15)',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(239,68,68,0.12) 0%, transparent 70%)',
  },
  'ai-governance-compliance': {
    accent: '#eab308',
    accentMuted: 'rgba(234,179,8,0.08)',
    accentBorder: 'rgba(234,179,8,0.25)',
    glow: 'rgba(234,179,8,0.15)',
    gradient: 'radial-gradient(ellipse 80% 60% at 60% -10%, rgba(234,179,8,0.10) 0%, transparent 70%)',
  },
}

const DEFAULT_COLOR = CAPABILITY_COLORS['genai-document-intelligence']

// ─── COMPLETE STATIC FALLBACK DATA FOR ALL 6 CAPABILITIES ───────────────────
const STATIC_FALLBACKS: Record<string, any> = {

  // ── 1. GENAI DOCUMENT INTELLIGENCE ─────────────────────────────────────────
  'genai-document-intelligence': {
    slug: 'genai-document-intelligence',
    category: 'DOCUMENT PROCESSING',
    title: 'GenAI Document Intelligence',
    accent_color: '#f59e0b',
    headline: 'Your Finance Team Is Spending $53,820 Per Analyst Per Year Doing Something AI Can Do in 3 Minutes.',
    subheadline: 'Flowtaris AI extracts, validates, and routes every invoice, PO, and contract — at 99.4% accuracy — directly into NetSuite, Coupa, SAP, or Workday. No templates. No rules configuration. No manual keying.',
    maturity: 'production',
    problem_eyebrow: 'THE BOARDROOM PROBLEM',
    problem_headline: 'Finance doesn\'t have a data problem. It has a document problem nobody\'s solved yet.',
    problem_body: 'The average enterprise finance team processes 80,000–400,000 documents per year. Every one of those documents requires a human to read it, understand it, extract data from it, validate it against a purchase order, and key it into an ERP. At scale, that\'s not a process — it\'s a liability.\n\nLegacy OCR tools promised to fix this in 2018. They didn\'t. They required templates per vendor, broke every time a vendor changed their invoice format, and created a new exception queue that still needed a human.\n\nFlowtaris AI doesn\'t use templates. It uses large language models fine-tuned on 2.1M real enterprise financial documents. It reads invoices the way a CFO\'s best analyst would — with context, judgment, and confidence scoring.',
    problem_stat_value: '$53K',
    problem_stat_label: 'per analyst per year lost to manual document processing. Across 10 people, that\'s $530,000.',
    stats: [
      { value: '99.4%', label: 'Extraction Accuracy', context: 'across 2.1M enterprise documents' },
      { value: '3 min', label: 'Invoice to ERP Post', context: 'was 4 days manual average' },
      { value: '85%', label: 'Straight-Through Rate', context: 'zero human touch required' },
      { value: '$4.5M', label: 'Annual Savings', context: 'at 50,000 invoices per year' },
    ],
    steps: [
      {
        eyebrow: 'STEP 01 — CAPTURE',
        headline: 'Every document in. Zero configuration.',
        body: 'Flowtaris connects to your email inbox, vendor portals, EDI feeds, shared drives, and scanning stations. Every document — regardless of format, language, or vendor — is captured automatically and classified in under 2 seconds. No whitelisting vendors. No building templates. No IT project.\n\nPDFs, scanned images, Word documents, structured XML, and handwritten forms are all handled natively.',
        image: '/images/capabilities/cap1-invoice-extract.png',
        imageAlt: 'AI document capture and classification dashboard',
        imageRight: false,
        bullets: ['Connects to 40+ document sources', 'Auto-classifies invoice, PO, contract, receipt', 'Supports 28 languages including multilingual documents', 'Processes 10,000 documents per hour at enterprise tier'],
      },
      {
        eyebrow: 'STEP 02 — EXTRACT & VALIDATE',
        headline: 'Every field extracted. Every value validated. No templates.',
        body: 'The Flowtaris extraction engine uses a fine-tuned LLM to read each document in context — understanding that "Net 30" on a Siemens invoice means something different than "30 days" on a startup vendor\'s PDF.\n\nExtracted values are confidence-scored, cross-referenced against your vendor master, and validated with configurable business rules. 3-way PO/GR/Invoice matching happens in milliseconds.',
        image: '/images/capabilities/cap1-3way-match.png',
        imageAlt: 'AI field extraction and 3-way matching validation',
        imageRight: true,
        bullets: ['Extracts 120+ standard fields per document type', '3-way PO/GR/Invoice matching in <500ms', 'Configurable tolerance rules per vendor or category', 'Exception queue with AI-suggested resolution for every mismatch'],
      },
      {
        eyebrow: 'STEP 03 — POST TO ERP',
        headline: 'Validated. Posted. Auditable. Automatically.',
        body: 'Approved documents are pushed to your ERP via native APIs — not screen-scraping, not RPA bots. The integration is bidirectional: vendor master data, PO status, and payment terms sync in real time so Flowtaris always works from current data.\n\nEvery AI decision is logged with the confidence score, extracted values, and validation outcome — giving your auditors exactly what they need.',
        image: '/images/capabilities/premium-dark-erp.png',
        imageAlt: 'ERP integration and audit trail dashboard',
        imageRight: false,
        bullets: ['Native API integrations with NetSuite, Coupa, SAP, Workday, Oracle', 'Full audit trail per document per AI decision', 'Bidirectional vendor master sync', 'ISR revalidation — ERP changes instantly reflected'],
      },
    ],
    technical_details: [
      { component: 'Extraction Engine', technology: 'Fine-tuned Gemini 1.5 Pro', description: 'Reads financial documents in context — understands vendor-specific formats, multi-currency, and complex line items without templates' },
      { component: 'Validation Layer', technology: 'Rules Engine + LLM Reasoning', description: 'Configurable tolerance rules per vendor/category plus AI-powered anomaly detection for values that look statistically unusual' },
      { component: 'ERP Connector', technology: 'Native REST + GraphQL APIs', description: 'Certified integrations for NetSuite SuiteCloud, Coupa Open API, SAP BTP, and Workday Cloud Connect — not RPA' },
      { component: 'Audit Log', technology: 'Immutable append-only log', description: 'Every AI extraction, validation decision, and ERP post stored with timestamp, confidence score, and actor' },
    ],
    integrations: ['NetSuite SuiteCloud', 'Coupa Open APIs', 'SAP BTP', 'Workday Cloud Connect', 'Oracle ERP Cloud', 'MuleSoft', 'Celonis', 'Microsoft Azure AI', 'SharePoint', 'Google Drive'],
    faq_items: [
      {
        question: 'How does Flowtaris handle invoices from vendors it has never seen before?',
        answer: 'Unlike legacy OCR tools that require a template per vendor, Flowtaris uses a large language model trained on 2.1M real financial documents across hundreds of industries. It reads invoices contextually — the same way a senior AP analyst does — so new vendor formats are processed correctly from day one. In our benchmark, 94.7% of first-time vendor invoices were processed straight-through with zero human intervention.',
      },
      {
        question: 'What is your accuracy rate, and how do you define it?',
        answer: 'We report 99.4% field-level extraction accuracy — measured as the percentage of extracted field values that match the ground truth (verified against the vendor\'s original data). This is measured across 2.1M documents in production deployments over 24 months. We do not cherry-pick document types — this includes handwritten delivery notes, scanned fax invoices, and multilingual documents.',
      },
      {
        question: 'What happens when the AI is wrong or uncertain?',
        answer: 'Every extracted value carries a confidence score. Fields below your configured threshold are flagged for human review — but with a pre-filled suggestion and the specific reason for the low confidence. The result: reviewers spend 30 seconds on an exception instead of 5 minutes. Over time, your exception rate drops as the model learns your vendor base.',
      },
      {
        question: 'How long does implementation take?',
        answer: 'Our fastest production deployment took 11 days from contract signature to first invoices processing. The median is 21 days. We connect to your email inbox and ERP on Day 1, configure your business rules in Week 1, and run parallel processing alongside your existing team in Week 2 before cutover.',
      },
      {
        question: 'Will Flowtaris work with our existing ERP setup or do we need a new implementation?',
        answer: 'Flowtaris connects to your ERP as-is via native APIs. We do not require an ERP upgrade, a new module, or a systems integrator project. Our connector team has certified integrations for NetSuite, Coupa, SAP, and Workday. If you have a custom ERP or a heavily customized instance, we have a REST webhook layer that works with any system that exposes an API.',
      },
      {
        question: 'How does the AI handle multi-entity, multi-currency, and multi-language documents?',
        answer: 'Flowtaris natively supports 28 languages, 140+ currencies, and unlimited subsidiary entities within a single deployment. Multi-entity routing is handled by configuring entity matching rules against your vendor master — Flowtaris automatically assigns the correct entity and currency conversion based on vendor, PO, and document metadata.',
      },
      {
        question: 'Is there a risk that the AI will approve fraudulent or duplicate invoices?',
        answer: 'No — and this is actually where AI significantly outperforms human review. Flowtaris runs a duplicate detection check (fuzzy matching on amount, vendor, invoice number, and date) on every document. It also applies statistical anomaly detection to flag invoices where the amount, line items, or vendor pattern deviates from historical norms. In production, Flowtaris catches 3.2x more duplicate and suspicious invoices than the average human-reviewed AP process.',
      },
      {
        question: 'What does the audit trail look like for our internal and external auditors?',
        answer: 'Every AI decision generates an immutable audit record containing: the raw document, every extracted field value and its confidence score, the validation outcome and rule applied, the approver identity (human or AI), the timestamp, and the ERP transaction reference. Audit packs covering any date range can be generated in under 30 minutes — versus the typical 3-week manual preparation process.',
      },
    ],
    cta_headline: 'Calculate the exact cost of your current AP process.',
    cta_body: 'Most CFOs are shocked by the number. Take our 3-minute Cost of Inaction analysis and see your personalized ROI before your next board meeting.',
    cta_primary_label: 'Calculate My Cost of Inaction',
    cta_primary_href: '/cost-of-inaction',
    cta_secondary_label: 'Start AI Readiness Assessment',
    cta_secondary_href: '/assessment',
    related_slugs: ['autonomous-workflow-engine', 'predictive-analytics', 'integration-health-monitoring'],
    seo_title: 'AI Invoice Processing & Document Intelligence for NetSuite, Coupa & SAP | Flowtaris AI',
    seo_description: 'Eliminate manual AP processing. Flowtaris AI extracts invoice data at 99.4% accuracy and posts directly to NetSuite, Coupa, SAP, and Workday. Average ROI in 47 days.',
    seo_keywords: 'AI invoice processing, GenAI document intelligence, AP automation, NetSuite invoice automation, Coupa AI, SAP accounts payable AI',
    is_published: true,
  },

  // ── 2. AUTONOMOUS WORKFLOW ENGINE ───────────────────────────────────────────
  'autonomous-workflow-engine': {
    slug: 'autonomous-workflow-engine',
    category: 'PROCESS AUTOMATION',
    title: 'Autonomous Workflow Engine',
    accent_color: '#10b981',
    headline: 'Your Approval Workflows Are Running on Email, Spreadsheets, and Hope.',
    subheadline: 'Flowtaris AI replaces fragile, manual approval chains with self-healing workflows that route, escalate, and resolve — automatically — across NetSuite, Coupa, SAP, and Workday.',
    maturity: 'production',
    problem_eyebrow: 'THE OPERATIONAL PROBLEM',
    problem_headline: 'The average enterprise invoice sits in an approval queue for 4.2 days. That queue runs on email.',
    problem_body: 'Finance transformation projects always tackle the ERP. They almost never tackle the workflow layer that sits on top of it — the approval chains, escalation paths, and exception queues that determine whether an invoice gets paid in 3 days or 43 days.\n\nThe result: companies spend $2M+ on an ERP implementation, then manage AP exceptions with a shared Outlook inbox and a color-coded spreadsheet.\n\nFlowtaris Autonomous Workflow Engine replaces that chaos with an AI-native orchestration layer that reads your ERP data, understands your business rules, and routes every document to the right person at the right time — or auto-approves it without a person at all.',
    problem_stat_value: '4.2 days',
    problem_stat_label: 'average invoice sits in approval queue. Every day costs early-pay discounts and vendor relationships.',
    stats: [
      { value: '92%', label: 'Straight-Through Rate', context: 'auto-approved without human intervention' },
      { value: '4.2 → 0.3 days', label: 'Approval Cycle Time', context: 'median across production deployments' },
      { value: '$2.1M', label: 'Annual Savings', context: 'per 10,000 invoices at $45/hr cost' },
      { value: '60+', label: 'Pre-Built Templates', context: 'AP, PO, contract, travel & expense' },
    ],
    steps: [
      {
        eyebrow: 'STEP 01 — CONFIGURE ONCE',
        headline: 'Build your approval logic in plain English. No coding required.',
        body: 'The Flowtaris Workflow Builder lets you define approval rules using natural language conditions: "If invoice amount exceeds $25,000 and vendor is not on preferred list, escalate to VP Finance within 4 hours."\n\nThe AI translates your business rules into executable workflow logic, validates them against your ERP master data, and deploys them to production — no developer involvement required.',
        image: '/images/capabilities/cap2-workflow-builder.png',
        imageAlt: 'Visual workflow builder canvas with approval routing logic',
        imageRight: false,
        bullets: ['Natural language rule builder — no coding', '60+ pre-built templates for AP, PO, contracts, T&E', 'Validates rules against live ERP master data', 'Version control — roll back any workflow change'],
      },
      {
        eyebrow: 'STEP 02 — ROUTE INTELLIGENTLY',
        headline: 'The right approver. The right channel. The right time.',
        body: 'Flowtaris doesn\'t just send email notifications. It routes approvals intelligently based on approver availability (calendar integration), delegation rules, and urgency scoring.\n\nApprovers receive context-rich approval requests in Slack, Teams, or email — with the vendor history, PO match status, and AI recommendation embedded. One click to approve. Zero need to log into the ERP.',
        image: '/images/capabilities/cap2-workflow-builder.png',
        imageAlt: 'Intelligent approval routing and Slack integration',
        imageRight: true,
        bullets: ['Calendar-aware routing — routes around OOO automatically', 'Slack and Microsoft Teams native approval actions', 'AI recommendation embedded in every notification', 'SLA tracking — auto-escalate after configurable timeout'],
      },
      {
        eyebrow: 'STEP 03 — SELF-HEAL',
        headline: 'When the workflow breaks, it fixes itself.',
        body: 'Traditional workflow tools break when an approver leaves, when a vendor changes their format, or when your ERP chart of accounts changes. Flowtaris monitors every workflow in real time and auto-remediates common failures.\n\nWhen a new failure pattern is detected, the AI proposes a rule update — you approve it with one click and it\'s live in seconds.',
        image: '/images/capabilities/cap2-workflow-builder.png',
        imageAlt: 'Self-healing workflow auto-remediation panel',
        imageRight: false,
        bullets: ['Auto-delegates when primary approver is unavailable', 'Detects and resolves workflow bottlenecks', 'AI proposes rule improvements from failure patterns', 'Zero downtime — changes apply to running workflows'],
      },
    ],
    technical_details: [
      { component: 'Workflow Engine', technology: 'Event-driven DAG executor', description: 'Executes parallel approval chains, handles conditional branching, and manages retry logic with exponential backoff' },
      { component: 'Rule Interpreter', technology: 'LLM + AST Compiler', description: 'Translates natural language business rules to executable logic, validates against ERP schema at compile time' },
      { component: 'Notification Layer', technology: 'Slack API + Teams Bot Framework', description: 'Sends context-rich approval requests with embedded data, approval actions, and AI recommendation — without opening the ERP' },
      { component: 'Monitoring', technology: 'Real-time event stream', description: 'Every workflow step emits events — SLA breaches, approval delays, and bottlenecks surface in the ops dashboard within 90 seconds' },
    ],
    integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Slack', 'Microsoft Teams', 'Google Workspace', 'PagerDuty', 'Jira Service Management', 'ServiceNow'],
    faq_items: [
      {
        question: 'How does the workflow engine handle approvers who are out of office?',
        answer: 'Flowtaris integrates with Google Calendar and Microsoft Exchange to detect OOO status in real time. When a primary approver is unavailable, the workflow automatically routes to their designated delegate — or, if none is configured, escalates up the reporting chain based on your org hierarchy. You can also set maximum escalation time thresholds to prevent documents from sitting unreviewed.',
      },
      {
        question: 'Can we migrate our existing Coupa or NetSuite approval workflows into Flowtaris?',
        answer: 'Yes — and we automate most of the migration. Flowtaris connects to your existing ERP workflow configuration and uses an AI migration assistant to map your current approval rules into Flowtaris workflow templates. The average migration takes 3-5 days for a company with 20-50 active workflow configurations.',
      },
      {
        question: 'What happens if the Flowtaris system goes down? Will approvals stop?',
        answer: 'Flowtaris runs on a 99.97% SLA with active-active multi-region deployment. In the extremely rare event of a service interruption, all in-flight workflows are stored durably and resume from their last checkpoint when service is restored. We also support a "fallback mode" where critical pending approvals are surfaced via direct email with a lightweight approval link that works without the Flowtaris platform.',
      },
      {
        question: 'How do we handle spend authority limits and segregation of duties?',
        answer: 'Flowtaris enforces spend authority limits configured per role, cost center, and department — pulled directly from your ERP\'s approval matrix if available. Segregation of duties (SoD) rules prevent the same person from both submitting and approving a transaction. All SoD configurations are stored with full audit trails for SOX compliance.',
      },
      {
        question: 'Can the workflow engine learn from our approval patterns over time?',
        answer: 'Yes. Flowtaris continuously analyzes approval decisions and outcomes to identify optimization opportunities — for example, if 98% of invoices from a specific vendor category are approved at the first level within 2 hours, it will propose an auto-approval rule for that category. Proposed optimizations are always presented for human review before being activated.',
      },
      {
        question: 'How long does it take to go live with the workflow engine?',
        answer: 'Our fastest deployment was 9 days from contract to live workflows. The standard timeline is 2-3 weeks: Week 1 is ERP connectivity and master data sync; Week 2 is workflow configuration and user acceptance testing; Week 3 is parallel run before cutover. We provide a dedicated implementation engineer for the full onboarding period.',
      },
    ],
    cta_headline: 'How many days is your average invoice waiting for approval right now?',
    cta_body: 'Run our workflow efficiency diagnostic and see exactly where your approval bottlenecks are — and what automating them would save you this fiscal year.',
    cta_primary_label: 'Run Workflow Diagnostic',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Calculate Approval Cycle Savings',
    cta_secondary_href: '/cost-of-inaction',
    related_slugs: ['genai-document-intelligence', 'predictive-analytics', 'integration-health-monitoring'],
    seo_title: 'AI Workflow Automation for AP Approvals — NetSuite, Coupa, SAP | Flowtaris AI',
    seo_description: 'Replace manual approval queues with AI-powered autonomous workflows. 92% straight-through processing rate. Connects to NetSuite, Coupa, SAP, and Workday.',
    seo_keywords: 'AP workflow automation, invoice approval AI, autonomous workflow ERP, Coupa workflow, NetSuite approval automation',
    is_published: true,
  },

  // ── 3. PREDICTIVE ANALYTICS ─────────────────────────────────────────────────
  'predictive-analytics': {
    slug: 'predictive-analytics',
    category: 'FINANCE INTELLIGENCE',
    title: 'Predictive Analytics',
    accent_color: '#8b5cf6',
    headline: 'Your CFO Is Making $50M Decisions With Lagging Data That Is 30 Days Old.',
    subheadline: 'Flowtaris AI delivers real-time cash flow forecasting, vendor risk scoring, and spend anomaly detection — giving your finance leadership the signals they need before problems become crises.',
    maturity: 'production',
    problem_eyebrow: 'THE INTELLIGENCE GAP',
    problem_headline: 'ERP systems are the world\'s best record-keeping tools. They\'re terrible forecasting tools.',
    problem_body: 'Every Fortune 500 CFO has the same problem: their ERP is a perfect ledger of what happened. It tells you almost nothing about what\'s about to happen.\n\nCash flow forecasting still happens in Excel. Vendor risk is assessed annually by a consultant. Spend anomaly detection means an AP clerk reviewing 400 transactions manually every Monday morning.\n\nFlowtaris Predictive Analytics changes the intelligence layer above your ERP. Instead of reports about the past, your finance leadership gets signals about the future — delivered in real time, actionable in seconds.',
    problem_stat_value: '30 days',
    problem_stat_label: 'behind. That\'s how old your ERP reports are when your CFO reads them. Decisions made on stale data cost companies millions.',
    stats: [
      { value: '94%', label: 'Forecast Accuracy', context: '90-day rolling cash flow prediction' },
      { value: '12 days', label: 'Early Warning Lead Time', context: 'average before cash position crisis' },
      { value: '3.2%', label: 'Spend Reduction', context: 'from anomaly detection program' },
      { value: '$8M+', label: 'Fraud Prevented', context: 'across production customer base in 2024' },
    ],
    steps: [
      {
        eyebrow: 'LAYER 01 — CASH FLOW FORECASTING',
        headline: 'See your 90-day cash position with 94% accuracy. Updated every hour.',
        body: 'Flowtaris connects to your AR, AP, payroll, and treasury systems in real time. Our forecasting model combines historical payment patterns, open invoice data, committed spend, and macroeconomic signals to produce a rolling 90-day cash flow forecast — updated hourly, not monthly.\n\nEvery forecast comes with a confidence band and the specific variables driving uncertainty, so your treasury team knows exactly where to focus.',
        image: '/images/capabilities/premium-dark-invoice.png',
        imageAlt: 'Real-time cash flow forecasting dashboard with 90-day projection',
        imageRight: false,
        bullets: ['90-day rolling forecast updated every hour', 'Scenario modeling: best case, base case, stress case', 'Drill down to entity, cost center, or GL account level', 'Integrates payroll, AR, AP, and committed spend'],
      },
      {
        eyebrow: 'LAYER 02 — VENDOR RISK SCORING',
        headline: 'Know which vendors are about to become a problem before they do.',
        body: 'Flowtaris scores every vendor in your master list on financial stability, payment behavior, concentration risk, and geopolitical exposure — updated quarterly from public financial data and your private transaction history.\n\nWhen a vendor\'s risk score drops sharply, your procurement team gets an alert 30–90 days before the vendor stops delivering or requests extraordinary payment terms.',
        image: '/images/capabilities/premium-dark-workflow.png',
        imageAlt: 'Vendor risk scoring heatmap and alert system',
        imageRight: true,
        bullets: ['Scores 99+ financial stability indicators per vendor', 'Concentration risk alerts when single vendor >15% of spend', 'Payment behavior trending — detect early signs of distress', 'Geopolitical and supply chain exposure flagging'],
      },
      {
        eyebrow: 'LAYER 03 — SPEND ANOMALY DETECTION',
        headline: 'The fraud your AP team will never catch manually. Flowtaris catches it automatically.',
        body: 'Flowtaris runs a continuous anomaly detection model across every transaction — not just daily batch reports. Duplicate invoices, split transactions designed to stay under approval thresholds, unusual weekend spend patterns, and vendors with newly registered bank accounts are all detected and escalated within minutes of the transaction occurring.',
        image: '/images/capabilities/premium-dark-erp.png',
        imageAlt: 'Spend anomaly detection and fraud alert panel',
        imageRight: false,
        bullets: ['Real-time duplicate detection with fuzzy matching', 'Threshold-splitting detection (intentional under-approval)', 'Statistical baseline per vendor, category, cost center', 'Integrates with ServiceNow and Jira for investigation workflow'],
      },
    ],
    technical_details: [
      { component: 'Forecast Model', technology: 'Temporal Fusion Transformer (TFT)', description: 'State-of-the-art time-series model trained on your historical financial data with transfer learning from global financial patterns' },
      { component: 'Risk Engine', technology: 'Ensemble ML + external data feeds', description: 'Combines your private transaction history with public company financials, credit scores, and news signal APIs for real-time vendor risk' },
      { component: 'Anomaly Detection', technology: 'Isolation Forest + LLM Reasoning', description: 'Unsupervised anomaly detection for unknown fraud patterns, plus LLM-powered explanation of why each anomaly was flagged' },
      { component: 'Data Pipeline', technology: 'Real-time CDC + event streaming', description: 'Change Data Capture from your ERP ensures the forecasting model always works from current data, not yesterday\'s batch export' },
    ],
    integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Tableau', 'Power BI', 'Looker', 'Snowflake', 'Databricks', 'Bloomberg Terminal'],
    faq_items: [
      {
        question: 'How accurate is the 90-day cash flow forecast, really?',
        answer: 'Our production average is 94.2% accuracy at the 90-day horizon, measured as MAPE (Mean Absolute Percentage Error) against actual cash position outcomes. Accuracy increases to 97.8% at the 30-day horizon. These figures are measured across our live customer base, not cherry-picked pilot scenarios. We publish a monthly accuracy report to all customers as part of the standard dashboard.',
      },
      {
        question: 'Our ERP data quality is poor. Will this still work?',
        answer: 'Flowtaris includes a data quality assessment as part of the onboarding process. In our experience, approximately 60% of customers have some data quality issues that affect forecast accuracy — most commonly inconsistent vendor master data, missing GL codes, or unbilled accruals. We provide a data remediation playbook and can work with your ERP team to fix the highest-impact issues before go-live.',
      },
      {
        question: 'How does the anomaly detection avoid false positives that waste analyst time?',
        answer: 'We tune the anomaly threshold during onboarding based on your historical exception rate and analyst capacity. The model learns from feedback — when an analyst marks a flagged transaction as "not anomalous," that signal is used to refine the model. In production, our false positive rate runs at 2.8% — meaning 97.2% of flagged anomalies result in real findings or confirmed investigation.',
      },
      {
        question: 'Can we use the forecasting data in our existing BI tool (Tableau, Power BI)?',
        answer: 'Yes. Flowtaris exposes a REST API and direct Snowflake/BigQuery connector for all forecast outputs. Most customers connect their existing BI tool within 1-2 days of go-live. We also provide a native dashboard for customers who don\'t want to manage a separate BI integration.',
      },
      {
        question: 'How does vendor risk scoring work and what data does it use?',
        answer: 'The vendor risk model combines five data categories: (1) your private transaction history with the vendor, (2) public financial data from company registrations and credit bureaus, (3) news and sentiment signals from financial news APIs, (4) supply chain exposure data from Dun & Bradstreet and similar, and (5) geopolitical risk indices from Oxford Analytica. Each vendor receives a composite score from 0-100 updated quarterly, with real-time alerts on material changes.',
      },
      {
        question: 'What is the implementation timeline and data requirements?',
        answer: 'The forecasting module goes live in 4-6 weeks. Week 1-2: data extraction from your ERP and 24-36 months of historical transaction data. Week 3-4: model training and initial forecast validation. Week 5-6: dashboard configuration, user training, and go-live. We require at minimum 12 months of historical AP/AR data for the forecast model to be statistically meaningful.',
      },
    ],
    cta_headline: 'What would your CFO do with 90-day cash visibility updated every hour?',
    cta_body: 'Book a 30-minute demo and we\'ll show you a live forecast built on anonymized data from a company your size in your industry.',
    cta_primary_label: 'See Live Demo',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Read the ROI Analysis',
    cta_secondary_href: '/cost-of-inaction',
    related_slugs: ['genai-document-intelligence', 'ai-governance-compliance'],
    seo_title: 'AI Cash Flow Forecasting & Spend Analytics for Finance Teams | Flowtaris AI',
    seo_description: 'Real-time cash flow forecasting at 94% accuracy, vendor risk scoring, and spend anomaly detection for NetSuite, SAP, Coupa, and Workday finance teams.',
    seo_keywords: 'AI cash flow forecasting, spend analytics, vendor risk scoring, finance predictive analytics, ERP anomaly detection',
    is_published: true,
  },

  // ── 4. CONVERSATIONAL ERP ────────────────────────────────────────────────────
  'conversational-erp': {
    slug: 'conversational-erp',
    category: 'HUMAN COMPUTER INTERACTION',
    title: 'Conversational ERP Interface',
    accent_color: '#06b6d4',
    headline: 'Your $5M ERP Is Locked Behind 40 Screens Nobody on Your Team Knows How to Use.',
    subheadline: 'Flowtaris Conversational ERP lets every finance team member — from the AP clerk to the CFO — access, query, and act on ERP data in plain English. No training. No navigation. No waiting.',
    maturity: 'production',
    problem_eyebrow: 'THE USABILITY CRISIS',
    problem_headline: 'The average enterprise ERP requires 6 months of training to use effectively. Most users learn 4% of its capabilities.',
    problem_body: 'Enterprise ERP systems are engineering marvels. They store every transaction your company has ever made, support hundreds of report types, and can model virtually any financial scenario.\n\nNobody uses 96% of that capability because finding and using it requires navigating 40+ screens, knowing the exact field names, and remembering which of 200 report templates you need.\n\nFlowtaris Conversational ERP puts a natural language interface in front of your ERP. Your team asks questions in plain English — or via Slack — and gets accurate answers, run reports, and executes approved actions without opening the ERP interface at all.',
    problem_stat_value: '45 min',
    problem_stat_label: 'average time to produce a custom ERP report manually. Flowtaris delivers the same result in 4 minutes — in Slack.',
    stats: [
      { value: '80%', label: 'Query Resolution', context: 'answered without opening ERP UI' },
      { value: '4 min', label: 'Report Delivery Time', context: 'vs 45 min manual average' },
      { value: '140+', label: 'Supported Commands', context: 'across AP, AR, GL, procurement' },
      { value: '6 ERPs', label: 'Supported Systems', context: 'NetSuite, Coupa, SAP, Workday, Oracle, Dynamics' },
    ],
    steps: [
      {
        eyebrow: 'LAYER 01 — NATURAL LANGUAGE QUERY',
        headline: 'Ask anything about your financial data. In plain English.',
        body: 'Flowtaris connects to your ERP\'s data layer and builds a semantic index of your chart of accounts, vendor master, cost centers, and transaction history. Your team types questions like "Show me all invoices from Salesforce over $50K in Q3" or "What is our current AP aging by category?" and gets accurate results in seconds.\n\nThe system handles ambiguous queries by asking a clarifying question, never by guessing and returning wrong data.',
        image: '/images/capabilities/premium-dark-invoice.png',
        imageAlt: 'Conversational ERP natural language query interface in Slack',
        imageRight: false,
        bullets: ['Natural language queries against live ERP data', 'Works in Slack, Teams, and the Flowtaris web interface', 'Handles ambiguity with clarifying questions, not guesses', 'Results include drill-down links directly into ERP'],
      },
      {
        eyebrow: 'LAYER 02 — NATURAL LANGUAGE COMMANDS',
        headline: 'Approve. Route. Update. All in Slack. All with full audit trail.',
        body: 'Beyond queries, your team can execute approved actions through the conversational interface: approve an invoice, update a payment term, flag a vendor for review, or route an exception to a colleague — all without touching the ERP UI.\n\nEvery action is permissioned against your ERP role assignments and logged with the full context of the conversational request.',
        image: '/images/capabilities/premium-dark-workflow.png',
        imageAlt: 'Approval and action execution via conversational interface',
        imageRight: true,
        bullets: ['Approve/reject invoices and POs directly in Slack', 'Update vendor records with voice-of-reasoning capture', 'Delegate and escalate with one-line commands', 'All actions enforce ERP role permissions — no privilege escalation'],
      },
      {
        eyebrow: 'LAYER 03 — AUTOMATED REPORTING',
        headline: 'Your Monday morning reports. Generated automatically. Delivered before you wake up.',
        body: 'Flowtaris can be configured to generate and deliver recurring reports on a schedule — AP aging, cash position summary, outstanding approvals, top vendor spend — formatted for Slack, email, or PDF.\n\nAd-hoc report requests are fulfilled in under 4 minutes. Complex multi-entity, multi-period analyses that previously required a Financial Analyst take 8-12 minutes.',
        image: '/images/capabilities/premium-dark-erp.png',
        imageAlt: 'Automated report delivery and scheduling dashboard',
        imageRight: false,
        bullets: ['Scheduled report delivery to Slack or email', 'Ad-hoc report generation in <4 minutes', 'Multi-entity and multi-currency support', 'Export to Excel, PDF, or direct BI connector'],
      },
    ],
    technical_details: [
      { component: 'NL Understanding', technology: 'Fine-tuned GPT-4o + RAG', description: 'ERP-specialized language model with retrieval-augmented generation against your semantic data index for high-accuracy financial query understanding' },
      { component: 'Query Engine', technology: 'Text-to-SQL + API Router', description: 'Converts natural language to SQL or ERP API calls, with entity resolution against your vendor master and chart of accounts' },
      { component: 'Action Layer', technology: 'ERP API + Permission Proxy', description: 'Executes actions via ERP APIs with permission validation against your existing role assignments — no separate access management needed' },
      { component: 'Audit Trail', technology: 'Immutable conversation log', description: 'Every query, result, and action stored with timestamp, user identity, and ERP transaction reference for SOX compliance' },
    ],
    integrations: ['NetSuite', 'SAP', 'Coupa', 'Workday', 'Oracle Fusion', 'Microsoft Dynamics', 'Slack', 'Microsoft Teams', 'Google Workspace', 'Salesforce'],
    faq_items: [
      {
        question: 'How accurate are the natural language query results?',
        answer: 'In our benchmark across 500+ real finance queries, Flowtaris returns accurate results for 97.3% of queries on the first attempt. The remaining 2.7% trigger a clarifying question that resolves the ambiguity — we never return confidently wrong data. Accuracy is higher for transactional queries (invoices, payments, vendors) and slightly lower for complex analytical queries that require multi-step reasoning.',
      },
      {
        question: 'What ERP permissions does Flowtaris need?',
        answer: 'Flowtaris requires read access to the data objects relevant to your use case (AP transactions, vendor master, chart of accounts, etc.) and write access only for the action types you explicitly enable. Action permissions are enforced against your existing ERP role assignments — if a user doesn\'t have approval authority in NetSuite, they cannot approve via Flowtaris either. We follow least-privilege by default.',
      },
      {
        question: 'Can Flowtaris handle our custom ERP fields and configurations?',
        answer: 'Yes. During onboarding, Flowtaris indexes your ERP schema including all custom fields, custom records, and custom segments. Custom fields are exposed in natural language queries using your internal field labels, not the ERP\'s technical names. Heavily customized instances take 1-2 additional days during onboarding to index and validate.',
      },
      {
        question: 'How do we prevent users from accessing data they shouldn\'t see?',
        answer: 'Flowtaris inherits all data access permissions from your ERP role assignments. A user who can only see their cost center\'s AP data in NetSuite will only see that data through Flowtaris. We also support subsidiary-level and department-level data isolation at the Flowtaris layer as an additional control, independent of ERP permissions.',
      },
      {
        question: 'Does Flowtaris learn our team\'s query patterns over time?',
        answer: 'Yes — the system learns from usage. Frequently asked queries become faster and more accurate as the model refines its entity resolution for your specific terminology. Common report requests are automatically offered as "quick actions" in the interface. We also surface query pattern analytics to admins showing which reports are most requested and which data points drive the most queries.',
      },
    ],
    cta_headline: 'What if every question your finance team asked was answered in 4 minutes instead of 4 hours?',
    cta_body: 'See a live demo of Flowtaris answering real finance questions against a real ERP data set — in Slack, in real time.',
    cta_primary_label: 'Book a Live Demo',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Calculate Time Savings',
    cta_secondary_href: '/roi-calculator',
    related_slugs: ['autonomous-workflow-engine', 'integration-health-monitoring'],
    seo_title: 'Conversational ERP Interface — AI Natural Language for NetSuite, SAP & Workday | Flowtaris',
    seo_description: 'Query NetSuite, SAP, Coupa, and Workday in plain English via Slack or web. Flowtaris Conversational ERP delivers reports in 4 minutes, not 45.',
    seo_keywords: 'conversational ERP, AI ERP interface, natural language NetSuite, Slack ERP integration, AI finance assistant',
    is_published: true,
  },

  // ── 5. INTEGRATION HEALTH MONITORING ────────────────────────────────────────
  'integration-health-monitoring': {
    slug: 'integration-health-monitoring',
    category: 'OBSERVABILITY',
    title: 'Integration Health Monitoring',
    accent_color: '#ef4444',
    headline: 'Your ERP Integrations Failed Three Times This Month. Your Finance Team Found Out on Day Four.',
    subheadline: 'Flowtaris monitors every data flow between your ERP and connected systems — in real time. When something breaks, you know in 8 minutes and in 73% of cases, the system fixes itself before a human ever sees it.',
    maturity: 'production',
    problem_eyebrow: 'THE SILENT FAILURE PROBLEM',
    problem_headline: 'Integration failures are the most expensive IT event finance teams never budget for.',
    problem_body: 'Every enterprise with a modern ERP stack has integrations connecting it to procurement platforms, banks, payment systems, reporting tools, and operational systems. Each of those integrations is a potential point of failure — and most failures are invisible for hours or days.\n\nWhen a MuleSoft flow silently stops processing invoices at 2am on a Friday, the finance team finds out Monday morning when a CFO asks why payment run failed. By then, the financial impact is already done.\n\nFlowtaris Integration Health Monitoring puts a real-time observability layer over every data flow — detecting failures in minutes, auto-remediating 73% of common errors, and giving your IT and finance teams a shared view of integration health they\'ve never had before.',
    problem_stat_value: '4 days',
    problem_stat_label: 'average time before a silent integration failure is discovered. By then, downstream financial data is corrupted.',
    stats: [
      { value: '99.97%', label: 'Uptime Monitored', context: 'across all connected ERP integrations' },
      { value: '8 min', label: 'Mean Time to Detect', context: 'integration failures and anomalies' },
      { value: '73%', label: 'Auto-Remediated', context: 'common errors fixed without human intervention' },
      { value: '200+', label: 'Data Points Monitored', context: 'per integration per minute, real-time' },
    ],
    steps: [
      {
        eyebrow: 'LAYER 01 — REAL-TIME MONITORING',
        headline: 'Every data flow. Every minute. Visible in one dashboard.',
        body: 'Flowtaris connects to your iPaaS layer (MuleSoft, Dell Boomi, Azure Data Factory, Workato), your ERP\'s native integration framework, and your custom API connections. It monitors 200+ health indicators per integration — message throughput, latency, error rates, data quality scores — and surfaces anomalies within 8 minutes of occurrence.\n\nThe monitoring dashboard gives your IT and finance teams a shared, real-time view of every data flow they depend on.',
        image: '/images/capabilities/premium-dark-invoice.png',
        imageAlt: 'Real-time integration health monitoring dashboard',
        imageRight: false,
        bullets: ['Monitors MuleSoft, Boomi, Azure Data Factory, Workato', '200+ health indicators per integration per minute', 'Cross-system correlation — trace data from source to destination', 'Unified IT + finance view of integration health'],
      },
      {
        eyebrow: 'LAYER 02 — INTELLIGENT ALERTING',
        headline: 'The right alert to the right person. Not a flood of noise.',
        body: 'Most monitoring tools send too many alerts — until teams start ignoring them. Flowtaris uses ML-based alert correlation to suppress redundant alerts, group related failures, and route notifications to the right person based on the system and business impact of the failure.\n\nA failed payment file integration alerts your treasury team and your IT integration engineer simultaneously. A data quality issue in a reporting flow alerts your FP&A analyst. Nobody gets flooded.',
        image: '/images/capabilities/premium-dark-workflow.png',
        imageAlt: 'Intelligent alert routing and notification management',
        imageRight: true,
        bullets: ['ML-based alert correlation suppresses noise by 84%', 'Impact-based routing: financial vs. operational vs. IT alerts', 'PagerDuty, Slack, and Teams native integrations', 'Business-context alerts: "AP payment run will fail in 2 hours"'],
      },
      {
        eyebrow: 'LAYER 03 — AUTO-REMEDIATION',
        headline: '73% of integration failures fixed before your team sees them.',
        body: 'Flowtaris maintains a library of 400+ remediation playbooks for common integration failure patterns — connection timeouts, schema mismatches, authentication token expiry, message queue backlogs. When a known failure pattern is detected, the appropriate playbook executes automatically.\n\nFor novel failure patterns, Flowtaris generates a suggested remediation and routes it to your integration engineer with one-click approval.',
        image: '/images/capabilities/premium-dark-erp.png',
        imageAlt: 'Auto-remediation execution log and playbook library',
        imageRight: false,
        bullets: ['400+ pre-built remediation playbooks', 'Auto-restarts failed connections and clears message queues', 'Schema drift detection and auto-mapping updates', 'Full remediation audit log for post-incident review'],
      },
    ],
    technical_details: [
      { component: 'Monitoring Agent', technology: 'Lightweight Go agent + eBPF probes', description: 'Deploys alongside your integration middleware, capturing 200+ metrics per integration at sub-second granularity with <0.1% overhead' },
      { component: 'Anomaly Detection', technology: 'LSTM Neural Network + threshold rules', description: 'Detects both statistical anomalies and threshold breaches, with separate models per integration type and traffic pattern' },
      { component: 'Remediation Engine', technology: 'Decision tree + LLM Reasoning', description: 'Matches failure signatures to playbooks, executes safe remediation actions autonomously, escalates novel patterns with AI-generated diagnosis' },
      { component: 'Alert Correlation', technology: 'Graph-based event correlation', description: 'Groups related alerts from multiple systems into a single incident, suppressing noise and providing root cause context within the alert' },
    ],
    integrations: ['MuleSoft', 'Dell Boomi', 'Azure Data Factory', 'Workato', 'NetSuite', 'Coupa', 'SAP', 'Workday', 'PagerDuty', 'Datadog', 'Splunk', 'ServiceNow'],
    faq_items: [
      {
        question: 'How does Flowtaris connect to our existing integration middleware?',
        answer: 'Flowtaris uses a lightweight monitoring agent that deploys alongside your existing middleware — MuleSoft, Boomi, Workato, Azure Data Factory, or custom Node.js/Python integration services. The agent captures metrics via standard observability interfaces (OpenTelemetry, Prometheus, vendor APIs) and does not require changes to your integration code. Deployment takes 2-4 hours per integration platform.',
      },
      {
        question: 'What is the performance impact of the monitoring agent?',
        answer: 'The Flowtaris monitoring agent is built in Go and uses eBPF kernel probes where available to capture metrics with near-zero overhead. In production benchmarks, the agent adds <0.1% CPU overhead and <50MB memory consumption on the host system. Network overhead for telemetry transmission is <2MB per hour per monitored integration.',
      },
      {
        question: 'How does auto-remediation work and what actions can it take?',
        answer: 'Auto-remediation executes from a library of pre-approved playbooks. Common automated actions include: restarting a failed integration flow, clearing a blocked message queue, refreshing an expired OAuth token, reallocating a connection pool, or reprocessing a failed batch from the last successful checkpoint. Destructive actions (deleting records, truncating queues) are never automated — they always require human approval.',
      },
      {
        question: 'Can Flowtaris detect data quality issues, not just infrastructure failures?',
        answer: 'Yes — data quality monitoring is a first-class capability. Flowtaris compares data volumes, field completeness, format consistency, and referential integrity across integration checkpoints. If an integration is flowing data but 30% of invoice records are missing a required GL code, that data quality anomaly is flagged as a warning before it causes downstream ERP posting failures.',
      },
      {
        question: 'How does this integrate with our existing IT incident management process?',
        answer: 'Flowtaris integrates natively with ServiceNow, Jira Service Management, PagerDuty, and OpsGenie for incident creation and management. When Flowtaris creates an incident, it includes the full diagnostic context — which integration failed, what data was affected, the remediation steps attempted, and the business impact assessment. This dramatically reduces MTTR by eliminating the diagnosis phase of incident response.',
      },
    ],
    cta_headline: 'Do you know the current health status of every ERP integration you depend on?',
    cta_body: 'Most finance and IT teams don\'t — until something breaks. Run our integration risk assessment and see your exposure in 15 minutes.',
    cta_primary_label: 'Run Integration Risk Assessment',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Calculate Downtime Cost',
    cta_secondary_href: '/cost-of-inaction',
    related_slugs: ['autonomous-workflow-engine', 'ai-governance-compliance'],
    seo_title: 'ERP Integration Health Monitoring & Observability — NetSuite, SAP, Coupa | Flowtaris AI',
    seo_description: 'Real-time monitoring, anomaly detection, and auto-remediation for ERP integrations. Detect failures in 8 minutes. Auto-fix 73% of issues before your team knows.',
    seo_keywords: 'ERP integration monitoring, NetSuite integration health, MuleSoft monitoring, API monitoring finance, iPaaS observability',
    is_published: true,
  },

  // ── 6. AI GOVERNANCE & COMPLIANCE ───────────────────────────────────────────
  'ai-governance-compliance': {
    slug: 'ai-governance-compliance',
    category: 'RISK AND COMPLIANCE',
    title: 'AI Governance & Compliance',
    accent_color: '#eab308',
    headline: 'Your Auditor Is Going to Ask How Every AI Decision Was Made. Do You Have an Answer?',
    subheadline: 'Flowtaris AI Governance gives you complete auditability, model explainability, and compliance controls over every AI-driven action in your finance operation — built for SOX, GDPR, and the EU AI Act.',
    maturity: 'production',
    problem_eyebrow: 'THE GOVERNANCE IMPERATIVE',
    problem_headline: 'AI in finance without governance is not a technology problem. It\'s a fiduciary risk.',
    problem_body: 'The SEC, the EU AI Act, and your external auditors are all asking the same question: can you explain every consequential decision your AI systems made, who authorized them, and what controls prevented errors?\n\nFor companies deploying AI in accounts payable, procurement, and financial reporting, the answer has to be yes — or the risk exposure from an adverse audit finding, a GDPR data breach, or an SEC investigation exceeds the efficiency gains from AI automation by an order of magnitude.\n\nFlowtaris AI Governance is not an add-on. It\'s the control layer that makes every other Flowtaris capability compliant by design — not by retrofitting.',
    problem_stat_value: '<24 hrs',
    problem_stat_label: 'to generate a complete AI audit pack for any date range. The industry average without Flowtaris is 3-4 weeks.',
    stats: [
      { value: '100%', label: 'Audit Trail Coverage', context: 'per AI decision, per transaction' },
      { value: 'SOX Ready', label: 'Compliance Framework', context: 'COSO-aligned control documentation' },
      { value: '<24 hrs', label: 'Audit Pack Generation', context: 'vs 3-4 weeks manual preparation' },
      { value: 'EU AI Act', label: 'Regulatory Coverage', context: 'High-risk AI system documentation built-in' },
    ],
    steps: [
      {
        eyebrow: 'CONTROL 01 — IMMUTABLE AUDIT TRAIL',
        headline: 'Every AI decision. Every human override. Permanently logged.',
        body: 'Flowtaris maintains an append-only, cryptographically tamper-evident audit log for every AI-driven action: document extraction, approval decision, anomaly flag, workflow routing, and ERP post.\n\nEach log entry contains the full input context, the AI model\'s output with confidence scores, the business rule applied, the human decision (if any), and the downstream ERP transaction reference. No record can be modified or deleted — by anyone.',
        image: '/images/capabilities/premium-dark-invoice.png',
        imageAlt: 'Immutable AI audit trail and decision log',
        imageRight: false,
        bullets: ['Append-only log — no record modification or deletion', 'Cryptographic hash chain — tamper detection at record level', 'Full input/output capture per AI model invocation', 'Retention configurable: 7 years default for SOX environments'],
      },
      {
        eyebrow: 'CONTROL 02 — MODEL EXPLAINABILITY',
        headline: 'Not just "the AI decided this." Exactly why it decided this.',
        body: 'When Flowtaris auto-approves an invoice, rejects a vendor, or flags an anomaly, it generates a human-readable explanation of the decision — the specific factors, their weights, and the counterfactual (what would have changed the decision).\n\nThis is not a post-hoc rationalization. It\'s generated by the same model that made the decision, using Shapley value attribution to show which input features drove the outcome.',
        image: '/images/capabilities/premium-dark-workflow.png',
        imageAlt: 'Model explainability and Shapley value attribution dashboard',
        imageRight: true,
        bullets: ['Shapley value attribution per AI decision', 'Counterfactual explanation: "what would change this outcome?"', 'Plain-English decision summaries for non-technical stakeholders', 'Bias detection: flags decisions that correlate with protected attributes'],
      },
      {
        eyebrow: 'CONTROL 03 — COMPLIANCE REPORTING',
        headline: 'Audit packs in hours. Compliance evidence in one click.',
        body: 'Flowtaris generates compliance evidence packages for SOX, GDPR, DORA, and EU AI Act requirements on demand. Your audit team specifies the scope (date range, process area, entity) and Flowtaris assembles the complete evidence pack — AI decision logs, control testing results, access logs, and model change history — in under 24 hours.\n\nThe same evidence supports both internal audit and external auditor requests.',
        image: '/images/capabilities/premium-dark-erp.png',
        imageAlt: 'Compliance reporting and audit pack generation dashboard',
        imageRight: false,
        bullets: ['On-demand audit pack generation in <24 hours', 'Pre-mapped to SOX COSO, GDPR Article 22, EU AI Act Annex IV', 'Model change history and approval records included', 'External auditor portal — share evidence packages securely'],
      },
    ],
    technical_details: [
      { component: 'Audit Ledger', technology: 'Append-only log with SHA-256 hash chain', description: 'Cryptographically tamper-evident ledger stored in immutable cloud storage, with hash chain verification on every read' },
      { component: 'Explainability Engine', technology: 'SHAP (SHapley Additive exPlanations)', description: 'Generates mathematically rigorous feature attribution for every AI model decision — not post-hoc rationalization' },
      { component: 'Compliance Mapper', technology: 'LLM + regulation knowledge base', description: 'Maps Flowtaris audit data to the specific requirements of SOX, GDPR, DORA, and EU AI Act, generating structured compliance evidence' },
      { component: 'Access Control', technology: 'RBAC + Attribute-Based Access Control', description: 'Fine-grained access control per AI capability, model version, and data domain — with just-in-time access provisioning for audit requests' },
    ],
    integrations: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Microsoft Purview', 'Splunk', 'ServiceNow GRC', 'Archer', 'OneTrust', 'Vanta', 'SecureFrame'],
    faq_items: [
      {
        question: 'What does "immutable audit trail" actually mean technically?',
        answer: 'Every audit record generated by Flowtaris is written to an append-only log with a SHA-256 hash that incorporates the previous record\'s hash — forming a hash chain. Any modification to any historical record would break the chain, which is verified on every read. Records are stored in immutable cloud storage (AWS S3 Object Lock or Azure Blob Storage with Legal Hold) and cannot be modified or deleted by anyone — including Flowtaris engineers.',
      },
      {
        question: 'How does Flowtaris support our SOX compliance program specifically?',
        answer: 'Flowtaris is mapped to the COSO Internal Control framework used by SOX compliance programs. For each AI-driven finance process, we maintain: (1) control documentation describing the AI\'s decision-making process, (2) testing evidence showing the control operated effectively, (3) exception reports showing all cases where the AI was overridden and why, and (4) access control evidence showing who can modify AI configurations. These are packaged for your external auditors in our SOX Evidence Pack.',
      },
      {
        question: 'Are we required to disclose to vendors that AI is processing their invoices?',
        answer: 'Legal requirements vary by jurisdiction. In the EU under GDPR Article 22 and the EU AI Act, you may have disclosure and transparency obligations for automated decision-making systems. Flowtaris includes a Vendor Transparency Module that can generate and deliver required disclosures to vendors, maintain records of disclosures sent, and provide a vendor-facing portal where vendors can request information about how their data is processed.',
      },
      {
        question: 'How does the EU AI Act classify Flowtaris, and what documentation does it require?',
        answer: 'AI systems used in financial services for credit decisions, fraud detection, or employment fall under "High Risk" classification under the EU AI Act. AP automation systems typically fall under "Limited Risk" or "Minimal Risk" depending on their decision authority. Flowtaris provides EU AI Act Annex IV Technical Documentation for all its models, including intended purpose, training data description, accuracy metrics, and human oversight mechanisms — ready for submission to your notified body.',
      },
      {
        question: 'What happens if an AI decision turns out to be wrong? What\'s the remediation path?',
        answer: 'Flowtaris includes a Decision Remediation workflow for cases where an AI decision needs to be reversed. The workflow captures the reason for reversal, the corrected outcome, the human approver, and automatically generates a correcting ERP transaction. The reversal is linked to the original AI decision in the audit trail, creating a complete picture of what happened and why it was corrected — essential for your auditors and for improving the model.',
      },
      {
        question: 'Can Flowtaris detect bias in AI decisions — for example, if the model treats certain vendors differently?',
        answer: 'Yes. Flowtaris includes a Fairness Monitoring module that continuously analyzes AI decisions across vendor attributes (size, geography, industry, payment history) to detect statistical disparities in outcomes. If the model approves invoices from one vendor category 15% faster than another with equivalent risk profiles, that disparity is flagged for human review. Fairness reports are generated monthly and included in the governance dashboard.',
      },
      {
        question: 'How do we manage access to AI model configurations and ensure segregation of duties?',
        answer: 'Flowtaris implements Role-Based Access Control (RBAC) for all AI configuration — model parameters, business rules, approval thresholds, and automation limits. Changes to any AI configuration require approval from a second authorized user (four-eyes principle), are logged in the audit trail, and include a mandatory business justification. Configuration history is retained indefinitely and included in audit evidence packages.',
      },
    ],
    cta_headline: 'Is your AI deployment ready for your next external audit?',
    cta_body: 'Run our AI Governance Readiness Assessment and get a specific compliance gap report for SOX, GDPR, and the EU AI Act in 15 minutes.',
    cta_primary_label: 'Run Governance Assessment',
    cta_primary_href: '/assessment',
    cta_secondary_label: 'Download AI Governance Framework',
    cta_secondary_href: '/cost-of-inaction',
    related_slugs: ['predictive-analytics', 'integration-health-monitoring'],
    seo_title: 'AI Governance & SOX Compliance for Finance AI Systems | Flowtaris AI',
    seo_description: 'Complete AI governance for finance teams. Immutable audit trails, model explainability, SOX-compliant controls, GDPR Article 22, and EU AI Act documentation built-in.',
    seo_keywords: 'AI governance finance, SOX AI compliance, GDPR Article 22 AI, EU AI Act finance, audit trail AI automation, model explainability finance',
    is_published: true,
  },
}

async function getCapability(slug: string) {
  try {
    const supabase = createServerClient()
    const { data, error } = await supabase
      .from('capabilities')
      .select('*')
      .eq('slug', slug)
      .single()
    if (!error && data && data.is_published) return data
  } catch (_) {}
  return STATIC_FALLBACKS[slug] || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cap = await getCapability(slug)
  if (!cap) return { title: 'Capability Not Found | Flowtaris AI' }
  return {
    title: cap.seo_title || `${cap.title} | Flowtaris AI`,
    description: cap.seo_description,
    keywords: cap.seo_keywords,
    authors: [{ name: 'Flowtaris AI', url: 'https://flowtaris.ai' }],
    alternates: { canonical: `https://flowtaris.ai/capabilities/${slug}` },
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

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function FaqItem({ question, answer, accent }: { question: string; answer: string; accent: string }) {
  return (
    <details className="group border-b border-white/10 last:border-0" name="faq-group">
      <summary className="flex items-center justify-between gap-4 py-6 cursor-pointer list-none select-none">
        <span className="text-white font-medium text-lg leading-snug pr-4">{question}</span>
        <ChevronDown className="w-5 h-5 flex-shrink-0 transition-transform duration-300 group-open:rotate-180" style={{ color: accent }} />
      </summary>
      <div className="pb-8 text-gray-400 text-base leading-relaxed max-w-3xl">{answer}</div>
    </details>
  )
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default async function CapabilityDetailPage({ params }: Props) {
  const { slug } = await params
  const cap = await getCapability(slug)
  if (!cap) notFound()

  const colors = CAPABILITY_COLORS[slug] || DEFAULT_COLOR
  const { accent, accentMuted, accentBorder, glow, gradient } = colors

  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Flowtaris AI — ${cap.title}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud',
    description: cap.seo_description,
    url: `https://flowtaris.ai/capabilities/${slug}`,
    publisher: { '@type': 'Organization', name: 'Flowtaris', url: 'https://flowtaris.ai', sameAs: ['https://flowtaris.com'] },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Contact for enterprise pricing' },
  }

  const faqSchema = cap.faq_items?.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: cap.faq_items.map((f: any) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  const steps = cap.steps || []

  // All 6 caps for related section
  const ALL_CAPS = [
    { slug: 'genai-document-intelligence', title: 'GenAI Document Intelligence', category: 'DOCUMENT PROCESSING', accent: '#f59e0b' },
    { slug: 'autonomous-workflow-engine', title: 'Autonomous Workflow Engine', category: 'PROCESS AUTOMATION', accent: '#10b981' },
    { slug: 'predictive-analytics', title: 'Predictive Analytics', category: 'FINANCE INTELLIGENCE', accent: '#8b5cf6' },
    { slug: 'conversational-erp', title: 'Conversational ERP Interface', category: 'HCI', accent: '#06b6d4' },
    { slug: 'integration-health-monitoring', title: 'Integration Health Monitoring', category: 'OBSERVABILITY', accent: '#ef4444' },
    { slug: 'ai-governance-compliance', title: 'AI Governance & Compliance', category: 'RISK & COMPLIANCE', accent: '#eab308' },
  ]
  const related = (cap.related_slugs || []).map((s: string) => ALL_CAPS.find(c => c.slug === s)).filter(Boolean).slice(0, 3)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="min-h-screen bg-[#050505] text-white font-sans">
        {/* Subtle grid overlay */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

        {/* ── HERO ───────────────────────────────────────────────────────────── */}
        <section className="relative pt-32 pb-28 px-6 overflow-hidden" aria-labelledby="hero-heading">
          {/* Per-capability radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: gradient }} />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Category pill */}
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-block text-[11px] font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full border" style={{ color: accent, backgroundColor: accentMuted, borderColor: accentBorder }}>
                {cap.category}
              </span>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">
                {cap.maturity === 'production' ? '● Production' : cap.maturity === 'pilot' ? '◐ Pilot' : '◌ Research'}
              </span>
            </div>

            {/* Hero headline — large, confident, boardroom language */}
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-white mb-8 max-w-5xl">
              {cap.headline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-3xl mb-14">
              {cap.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-5 mb-24">
              <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-10 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl" style={{ backgroundColor: accent, color: '#050505', boxShadow: `0 0 40px ${glow}` }}>
                {cap.cta_primary_label || 'Start Assessment'} <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center justify-center gap-2 bg-white/5 text-white font-semibold text-lg px-10 py-5 rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                {cap.cta_secondary_label || 'Calculate Cost of Inaction'}
              </Link>
            </div>

            {/* Stats — 4 cards with per-capability accent */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {cap.stats?.map((stat: any) => (
                <div key={stat.label} className="group rounded-2xl p-7 border transition-all duration-500 hover:-translate-y-1 relative overflow-hidden" style={{ backgroundColor: accentMuted, borderColor: accentBorder }}>
                  <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl opacity-20 pointer-events-none" style={{ backgroundColor: accent }} />
                  <div className="text-3xl md:text-4xl font-light tracking-tight text-white mb-2 relative z-10">{stat.value}</div>
                  <div className="text-xs font-bold uppercase tracking-widest mb-1 relative z-10" style={{ color: accent }}>{stat.label}</div>
                  <div className="text-xs text-gray-500 font-light relative z-10">{stat.context}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEM SECTION ────────────────────────────────────────────────── */}
        <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5" aria-labelledby="problem-heading">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>{cap.problem_eyebrow}</span>
              </div>
              <h2 id="problem-heading" className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight mb-10">
                {cap.problem_headline}
              </h2>
              <div className="space-y-6">
                {cap.problem_body?.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-gray-400 text-lg font-light leading-[1.8]">{para}</p>
                ))}
              </div>
            </div>

            {/* Big stat callout */}
            <div className="relative rounded-[2rem] p-12 md:p-16 border overflow-hidden" style={{ borderColor: accentBorder, backgroundColor: accentMuted }}>
              <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at top right, ${glow}, transparent 70%)` }} />
              <div className="relative z-10 text-center">
                <div className="text-7xl md:text-[6.5rem] font-light text-white mb-6 tracking-tighter leading-none">{cap.problem_stat_value}</div>
                <div className="text-lg font-medium leading-relaxed max-w-sm mx-auto mb-10" style={{ color: accent }}>{cap.problem_stat_label}</div>
                <div className="pt-8 border-t border-white/10 text-[11px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                  Flowtaris AI benchmark · 200+ enterprise deployments
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS — IMMERSIVE ALTERNATING STEPS ─────────────────────── */}
        {steps.length > 0 && (
          <section className="py-40 px-6 overflow-hidden" aria-labelledby="how-heading">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-32">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>HOW IT WORKS</span>
                  <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                </div>
                <h2 id="how-heading" className="text-4xl md:text-6xl font-semibold text-white tracking-tight max-w-3xl mx-auto">
                  From day one to fully operational.
                </h2>
              </div>

              <div className="space-y-40">
                {steps.map((step: any, idx: number) => {
                  const isRight = step.imageRight
                  return (
                    <div key={idx} className="grid lg:grid-cols-12 gap-12 lg:gap-0 items-stretch">

                      {/* Text side — 5 cols */}
                      <div className={`lg:col-span-5 flex flex-col justify-center px-0 lg:px-8 ${isRight ? 'lg:order-1' : 'lg:order-2'}`}>
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl border font-bold text-2xl mb-8 flex-shrink-0" style={{ borderColor: accentBorder, backgroundColor: accentMuted, color: accent }}>
                          {idx + 1}
                        </div>
                        <div className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4" style={{ color: accent }}>{step.eyebrow}</div>
                        <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-6">{step.headline}</h3>
                        <div className="space-y-5 mb-10">
                          {step.body?.split('\n\n').map((para: string, i: number) => (
                            <p key={i} className="text-gray-400 text-lg font-light leading-[1.8]">{para}</p>
                          ))}
                        </div>
                        {step.bullets?.length > 0 && (
                          <ul className="space-y-4">
                            {step.bullets.map((b: string) => (
                              <li key={b} className="flex items-start gap-4 text-base text-gray-300">
                                <CheckCircle2 className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: accent }} />
                                <span>{b}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Image side — 7 cols, FULL BLEED, metrics overlaid */}
                      <div className={`relative lg:col-span-7 min-h-[420px] lg:min-h-[520px] ${isRight ? 'lg:order-2' : 'lg:order-1'}`}>
                        {/* Glow behind image */}
                        <div className="absolute inset-0 blur-[80px] opacity-30 rounded-3xl" style={{ backgroundColor: accent }} />

                        {/* Image with gradient border */}
                        <div className="absolute inset-0 rounded-3xl overflow-hidden border" style={{ borderColor: accentBorder }}>
                          {step.image ? (
                            <Image
                              src={step.image}
                              alt={step.imageAlt || `Step ${idx + 1}`}
                              fill
                              className="object-cover"
                              sizes="(max-width: 1024px) 100vw, 58vw"
                              priority={idx === 0}
                            />
                          ) : (
                            // Fallback: sophisticated gradient visual for steps without images
                            <div className="absolute inset-0 flex items-center justify-center" style={{ background: `linear-gradient(135deg, #0a0a0a 0%, ${accentMuted} 100%)` }}>
                              <div className="text-center space-y-4 px-8">
                                <div className="text-8xl font-light" style={{ color: accent }}>0{idx + 1}</div>
                                <div className="text-2xl font-semibold text-white max-w-xs mx-auto leading-tight">{step.headline}</div>
                              </div>
                            </div>
                          )}

                          {/* Gradient overlay from bottom for readability */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        </div>

                        {/* Metrics embedded ON TOP of image — bottom left */}
                        {cap.stats && idx < 2 && (
                          <div className="absolute bottom-6 left-6 right-6 z-20 flex gap-3 flex-wrap">
                            {cap.stats.slice(idx * 2, idx * 2 + 2).map((stat: any) => (
                              <div key={stat.label} className="backdrop-blur-xl rounded-xl px-4 py-3 border flex items-center gap-3" style={{ backgroundColor: 'rgba(0,0,0,0.6)', borderColor: accentBorder }}>
                                <span className="text-xl font-semibold" style={{ color: accent }}>{stat.value}</span>
                                <span className="text-xs text-gray-300 font-medium">{stat.label}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── TECHNICAL ARCHITECTURE ──────────────────────────────────────────── */}
        {cap.technical_details?.length > 0 && (
          <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5" aria-labelledby="tech-heading">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-20">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>TECHNICAL ARCHITECTURE</span>
                  <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                </div>
                <h2 id="tech-heading" className="text-3xl md:text-5xl font-semibold text-white tracking-tight">
                  Enterprise-grade from the ground up.
                </h2>
              </div>
              <div className="rounded-3xl border overflow-hidden" style={{ borderColor: accentBorder, backgroundColor: 'rgba(10,10,10,0.8)' }}>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 w-[22%]">Component</th>
                      <th className="px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 w-[28%]">Technology</th>
                      <th className="px-10 py-6 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 hidden md:table-cell">What it does</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {cap.technical_details.map((row: any) => (
                      <tr key={row.component} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-10 py-7 font-medium text-white group-hover:text-white transition-colors">{row.component}</td>
                        <td className="px-10 py-7 font-mono text-sm" style={{ color: accent }}>{row.technology}</td>
                        <td className="px-10 py-7 text-gray-400 font-light leading-relaxed hidden md:table-cell">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ── INTEGRATIONS ──────────────────────────────────────────────────── */}
        {cap.integrations?.length > 0 && (
          <section className="py-24 px-6" aria-labelledby="integrations-heading">
            <div className="max-w-5xl mx-auto text-center">
              <h2 id="integrations-heading" className="text-2xl font-semibold text-white mb-4">
                Connects to the stack you already run.
              </h2>
              <p className="text-gray-500 mb-14 text-base font-light">No rip-and-replace. No new modules. Flowtaris layers on top of your existing ERP investment.</p>
              <div className="flex flex-wrap justify-center gap-4">
                {cap.integrations.map((i: string) => (
                  <span key={i} className="px-6 py-3 rounded-full text-sm font-medium text-gray-300 border transition-all duration-300 hover:text-white cursor-default" style={{ backgroundColor: 'rgba(10,10,10,0.8)', borderColor: 'rgba(255,255,255,0.08)' }} onMouseEnter={(e) => { (e.target as HTMLElement).style.borderColor = accentBorder; (e.target as HTMLElement).style.color = accent; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)'; (e.target as HTMLElement).style.color = 'rgb(209,213,219)'; }}>
                    {i}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
        {cap.faq_items?.length > 0 && (
          <section className="py-32 px-6 bg-[#0a0a0a] border-t border-white/5" aria-labelledby="faq-heading">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>FAQ</span>
                  <span className="w-8 h-px" style={{ backgroundColor: accent }} />
                </div>
                <h2 id="faq-heading" className="text-4xl font-semibold text-white tracking-tight">
                  The questions your board will ask. Answered.
                </h2>
              </div>
              <div className="rounded-3xl p-8 md:p-12 border" style={{ borderColor: accentBorder, backgroundColor: accentMuted }}>
                {cap.faq_items.map((faq: any, idx: number) => (
                  <FaqItem key={idx} question={faq.question} answer={faq.answer} accent={accent} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── RELATED CAPABILITIES ─────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="py-24 px-6 border-t border-white/5">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold text-white mb-10 text-center">Related Capabilities</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {related.map((rc: any) => {
                  const rcColors = CAPABILITY_COLORS[rc.slug] || DEFAULT_COLOR
                  return (
                    <Link key={rc.slug} href={`/capabilities/${rc.slug}`} className="group rounded-2xl p-8 border transition-all duration-300 hover:-translate-y-1" style={{ borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(10,10,10,0.8)' }} onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = rcColors.accentBorder; }} onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)'; }}>
                      <div className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: rcColors.accent }}>{rc.category}</div>
                      <div className="text-white font-semibold text-lg mb-4 leading-snug">{rc.title}</div>
                      <div className="flex items-center gap-2 text-sm font-medium" style={{ color: rcColors.accent }}>
                        Explore <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────────────────────────────── */}
        <section className="py-40 px-6 relative overflow-hidden" aria-labelledby="cta-heading">
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 50%, ${glow}, transparent 70%)` }} />

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="p-[1px] rounded-[2.5rem] overflow-hidden" style={{ background: `linear-gradient(135deg, ${accentBorder}, rgba(255,255,255,0.05) 60%, transparent)` }}>
              <div className="bg-[#0a0a0a] rounded-[2.5rem] p-14 md:p-24 text-center">
                <h2 id="cta-heading" className="text-4xl md:text-6xl font-semibold text-white mb-8 tracking-tight">{cap.cta_headline}</h2>
                <p className="text-gray-400 text-xl font-light leading-relaxed mb-14 max-w-2xl mx-auto">{cap.cta_body}</p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center">
                  <Link href={cap.cta_primary_href || '/assessment'} className="inline-flex items-center justify-center gap-2 font-semibold text-lg px-12 py-5 rounded-2xl transition-all duration-300 hover:scale-[1.02]" style={{ backgroundColor: accent, color: '#050505', boxShadow: `0 0 40px ${glow}` }}>
                    {cap.cta_primary_label || 'Get Started'} <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link href={cap.cta_secondary_href || '/cost-of-inaction'} className="inline-flex items-center justify-center gap-2 bg-white/5 text-white font-semibold text-lg px-12 py-5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                    {cap.cta_secondary_label || 'Learn More'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Breadcrumb */}
        <div className="bg-[#030303] py-8 px-6 border-t border-white/[0.04]">
          <div className="max-w-6xl mx-auto flex items-center gap-3 text-sm font-medium text-gray-600">
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