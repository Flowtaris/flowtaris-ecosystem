import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { HeroPattern } from '@repo/ui'
import { Section, Container, Stack, Grid, Card, CardHeader, CardTitle, CardContent, Badge, Button } from '@repo/ui'
import { ArrowRight, ChevronRight, CheckCircle, XCircle, Clock, DollarSign, Users, Shield, Zap, BarChart3, Lock, Cloud, Cpu, Database, Globe, Shield as ShieldIcon, BookOpen, ExternalLink } from 'lucide-react'

interface Props {
  params: Promise<{ slug: string }>
}

const platformData: Record<string, any> = {
  netsuite: {
    name: 'NetSuite',
    tagline: 'The #1 Cloud ERP for Growing Businesses',
    category: 'ERP',
    maturity: 'production',
    logo: '🔷',
    shortDescription: 'Native SuiteCloud integration with real-time APIs, SuiteScript automation, and SuiteApp marketplace connectivity.',
    description: 'Flowtaris AI\'s NetSuite integration is built natively on SuiteCloud, leveraging SuiteScript 2.x, SuiteTalk REST APIs, and SuiteFlow for seamless, real-time automation. Our SuiteApp-certified connector enables zero-code deployment with bi-directional sync for invoices, POs, vendors, and payments.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production', description: '85% automation for NetSuite invoice processing', metrics: ['3-min processing', '99.2% accuracy', '$4.5M savings'] },
      { name: 'Autonomous Workflow Engine', status: 'production', description: 'Self-healing workflows for NetSuite SuiteFlow', metrics: ['3-day deploy', '99.9% uptime', 'Zero-touch'] },
      { name: 'Integration Health Monitoring', status: 'production', description: 'Real-time SuiteTalk API health & data quality', metrics: ['Sub-min detection', 'Auto-healing', 'Slack/Teams alerts'] },
      { name: 'Predictive Analytics', status: 'pilot', description: 'Cash forecasting trained on NetSuite transaction data', metrics: ['92% accuracy', '30-day horizon', 'Multi-subsidiary'] },
      { name: 'Conversational ERP Interface', status: 'research', description: 'Natural language → SuiteQL for NetSuite', metrics: ['NL-to-SQL 92%', 'RLS enforced', 'Beta Q2 2025'] },
    ],
    integrations: [
      { name: 'SuiteCloud Platform', type: 'native', description: 'Native SuiteScript 2.x + SuiteTalk REST' },
      { name: 'SuiteFlow', type: 'native', description: 'Native workflow automation engine' },
      { name: 'SuiteAnalytics', type: 'native', description: 'Real-time analytics & saved searches' },
      { name: 'Celigo', type: 'partner', description: 'iPaaS for complex multi-system flows' },
      { name: 'Boomi', type: 'partner', description: 'Dell Boomi integration platform' },
      { name: 'MuleSoft', type: 'partner', description: 'Salesforce MuleSoft Anypoint Platform' },
    ],
    certifications: ['SuiteApp Certified', 'SuiteCloud Developer Network', 'Oracle Cloud Marketplace', 'SOC2 Type II'],
    faq: [
      { q: 'How long does NetSuite deployment take?', a: 'Typical Quick Win deployment: 3-4 weeks for GenAI Document Intelligence. Full platform: 8-12 weeks depending on customization complexity.' },
      { q: 'Does it work with SuiteScript customizations?', a: 'Yes. Our connector respects all SuiteScript customizations, user event scripts, and workflow triggers. Bi-directional sync preserves your business logic.' },
      { q: 'What NetSuite versions are supported?', a: 'NetSuite 2021.2 and later. We maintain compatibility with quarterly release updates through automated regression testing.' },
      { q: 'Is SuiteApp certification required?', a: 'Our connector is SuiteApp certified. Deployment via SuiteApp marketplace enables one-click install with guided configuration.' },
    ],
    architecture: [
      { layer: 'Ingestion', tech: 'SuiteTalk REST + Webhooks', detail: 'Real-time document ingestion via SuiteTalk REST API with webhook subscriptions for instant trigger' },
      { layer: 'Processing', tech: 'GenAI Models (AWS/GCP)', detail: 'Fine-tuned LLMs for invoice/PO classification and extraction with confidence scoring' },
      { layer: 'Validation', tech: 'SuiteScript 2.x Rules Engine', detail: 'Configurable business rules executed natively in NetSuite via SuiteScript' },
      { layer: 'Sync', tech: 'SuiteTalk REST Bi-directional', detail: 'Real-time write-back to NetSuite records: Vendor Bills, POs, Payments, Vendors' },
      { layer: 'Monitoring', tech: 'SuiteAnalytics + Custom Dashboards', detail: 'Automation rates, exception queues, processing times, error patterns in native NetSuite dashboards' },
    ],
    caseStudies: ['global-saas-decacorn', 'healthcare-manufacturing'],
    demoUrl: 'https://demo.flowtaris.ai/netsuite',
    docsUrl: 'https://docs.flowtaris.ai/platforms/netsuite',
  },
  coupa: {
    name: 'Coupa',
    tagline: 'Business Spend Management Leader',
    category: 'BSM',
    maturity: 'production',
    logo: '🟠',
    shortDescription: 'Native Coupa Open APIs integration with Coupa Link, Community Intelligence, and Coupa Pay connectivity.',
    description: 'Flowtaris AI connects natively to Coupa\'s Open APIs, leveraging Coupa Link for pre-built integrations and Community Intelligence for benchmarking. Our Coupa-certified connector automates invoice processing, PO matching, and expense audit with real-time sync to Coupa\'s unified data model.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production', description: '87% automation for Coupa invoicing', metrics: ['2-min processing', '99.5% accuracy', 'Coupa Link ready'] },
      { name: 'Autonomous Workflow Engine', status: 'production', description: 'Self-healing workflows for Coupa approval chains', metrics: ['Dynamic routing', 'SLA tracking', 'Exception auto-resolve'] },
      { name: 'Integration Health Monitoring', status: 'production', description: 'Coupa API health & Community Intelligence sync', metrics: ['Real-time monitoring', 'Benchmark alerts', 'API quota management'] },
      { name: 'Expense Audit & Compliance', status: 'pilot', description: 'AI-powered expense policy enforcement', metrics: ['88% auto-approval', 'Risk scoring', 'Receipt validation'] },
      { name: 'AI Governance & Compliance', status: 'research', description: 'SOC2 + Coupa compliance automation', metrics: ['Continuous monitoring', 'Audit trails', 'Policy as code'] },
    ],
    integrations: [
      { name: 'Coupa Open APIs', type: 'native', description: 'REST APIs for invoices, POs, expenses, suppliers' },
      { name: 'Coupa Link', type: 'native', description: 'Pre-built integration templates' },
      { name: 'Community Intelligence', type: 'native', description: 'Anonymized benchmarking data' },
      { name: 'Coupa Pay', type: 'native', description: 'Integrated payment processing' },
      { name: 'SAP Integration', type: 'partner', description: 'Coupa-SAP certified connector' },
      { name: 'Workday Integration', type: 'partner', description: 'Coupa-Workday HCM/Finance sync' },
    ],
    certifications: ['Coupa Link Certified', 'Coupa App Marketplace', 'SOC2 Type II', 'ISO 27001'],
    faq: [
      { q: 'How does Coupa Link integration work?', a: 'Our Coupa Link certified connector provides pre-mapped fields for invoices, POs, and expenses. Configuration is point-and-click via Coupa Setup > Integrations > Coupa Link.' },
      { q: 'Can you leverage Community Intelligence?', a: 'Yes. We enrich extraction with Community Intelligence benchmarks for vendor validation, pricing analysis, and fraud detection.' },
      { q: 'What about Coupa Pay integration?', a: 'Full Coupa Pay support: payment initiation, reconciliation, and virtual card processing all automated end-to-end.' },
    ],
    architecture: [
      { layer: 'Ingestion', tech: 'Coupa Open APIs + Coupa Link', detail: 'Real-time invoice/expense ingestion via Coupa REST APIs with Coupa Link templates' },
      { layer: 'Processing', tech: 'GenAI Models + Coupa Community Data', detail: 'LLM extraction enhanced with Community Intelligence vendor/pricing benchmarks' },
      { layer: 'Validation', tech: 'Coupa Business Rules + Custom Policies', detail: 'Native Coupa approval rules + Flowtaris AI policy engine for exception handling' },
      { layer: 'Sync', tech: 'Coupa REST Bi-directional', detail: 'Real-time write-back: Invoice headers/lines, Expense Reports, Supplier records, Payments' },
      { layer: 'Monitoring', tech: 'Coupa Analytics + Custom Reports', detail: 'Automation dashboards in Coupa Analytics with Community Intelligence comparisons' },
    ],
    caseStudies: ['global-saas-decacorn'],
    demoUrl: 'https://demo.flowtaris.ai/coupa',
    docsUrl: 'https://docs.flowtaris.ai/platforms/coupa',
  },
  sap: {
    name: 'SAP S/4HANA',
    tagline: 'Intelligent Enterprise ERP',
    category: 'ERP',
    maturity: 'production',
    logo: '🔵',
    shortDescription: 'SAP BTP integration with OData APIs, SAP Build Process Automation, and SAP AI Core connectivity.',
    description: 'Flowtaris AI integrates with SAP S/4HANA via SAP Business Technology Platform (BTP), leveraging OData V4 APIs, SAP Build Process Automation, and SAP AI Core for enterprise-grade automation. Our SAP-certified connector handles complex FI/CO/MM/SD processes with full authorization object compliance.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production', description: '82% automation for SAP FI/CO/MM invoices', metrics: ['5-min processing', '98.8% accuracy', 'MM/MIRO ready'] },
      { name: 'Autonomous Workflow Engine', status: 'production', description: 'SAP Build Process Automation integration', metrics: ['Low-code flows', 'SAPUI5 ready', 'Transport management'] },
      { name: 'Integration Health Monitoring', status: 'production', description: 'OData API health & SAP BTP connectivity monitoring', metrics: ['Gateway monitoring', 'BTP service health', 'Alerting via SAP Alerting'] },
      { name: 'Predictive Analytics', status: 'pilot', description: 'Cash forecasting on SAP HANA data', metrics: ['HANA-native ML', 'Real-time features', 'SAC integration'] },
      { name: 'AI Governance & Compliance', status: 'pilot', description: 'SAP GRC + EU AI Act compliance', metrics: ['Continuous controls', 'Audit automation', 'Risk classification'] },
    ],
    integrations: [
      { name: 'SAP BTP', type: 'native', description: 'Business Technology Platform foundation' },
      { name: 'OData V4 APIs', type: 'native', description: 'Standard S/4HANA CDS views & APIs' },
      { name: 'SAP Build Process Automation', type: 'native', description: 'Low-code workflow automation' },
      { name: 'SAP AI Core', type: 'native', description: 'Managed AI runtime on BTP' },
      { name: 'SAP Integration Suite', type: 'partner', description: 'Cloud Integration (CPI) for complex landscapes' },
      { name: 'SAP Signavio', type: 'partner', description: 'Process mining & optimization' },
    ],
    certifications: ['SAP Certified Integration', 'SAP BTP Certified', 'SAP Build Partner', 'SOC2 Type II'],
    faq: [
      { q: 'Does this require S/4HANA Cloud?', a: 'Supports both S/4HANA Cloud (Public/Private) and On-Premise 2021+. On-premise requires SAP Cloud Connector for BTP connectivity.' },
      { q: 'How are authorization objects handled?', a: 'Full authorization object compliance. Our connector respects SAP user roles, authorization objects (F_BKPF_KOAR, etc.), and client-dependent data segregation.' },
      { q: 'What about transport management?', a: 'Configuration transported via standard SAP transport requests. Code changes managed through SAP BTP CI/CD pipelines with gCTS.' },
    ],
    architecture: [
      { layer: 'Ingestion', tech: 'OData V4 + SAP Cloud Connector', detail: 'Secure OData ingestion from S/4HANA via Cloud Connector for on-prem/hybrid' },
      { layer: 'Processing', tech: 'SAP AI Core + Custom LLMs', detail: 'Models deployed on SAP AI Core with HANA vector engine for embeddings' },
      { layer: 'Validation', tech: 'SAP Build Process Automation + ABAP Rules', detail: 'Validation rules in SAP Build or native ABAP for complex FI/CO logic' },
      { layer: 'Sync', tech: 'OData V4 Bi-directional + BAPI/RFC', detail: 'Write-back via OData for standard objects, BAPI/RFC for complex postings (MIRO, FB60)' },
      { layer: 'Monitoring', tech: 'SAP Focused Run + Custom SAC Dashboards', detail: 'End-to-end monitoring via Focused Run, business dashboards in SAP Analytics Cloud' },
    ],
    caseStudies: ['fintech-unicorn', 'healthcare-manufacturing'],
    demoUrl: 'https://demo.flowtaris.ai/sap',
    docsUrl: 'https://docs.flowtaris.ai/platforms/sap',
  },
  workday: {
    name: 'Workday Financial Management',
    tagline: 'Unified Finance & HR Cloud',
    category: 'ERP/HCM',
    maturity: 'production',
    logo: '🟢',
    shortDescription: 'Workday Cloud Connect integration with Workday Extend, Prism Analytics, and Adaptive Planning connectivity.',
    description: 'Flowtaris AI connects to Workday Financial Management via Workday Cloud Connect and Workday Extend, enabling native automation for supplier invoices, expense reports, and financial close processes. Our Workday-certified connector leverages Workday\'s unified data model across Finance and HCM.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production', description: '84% automation for Workday supplier invoices', metrics: ['4-min processing', '99.0% accuracy', 'Workday Extend app'] },
      { name: 'Integration Health Monitoring', status: 'production', description: 'Workday API health & Cloud Connect monitoring', metrics: ['Real-time EIB monitoring', 'RaaS API tracking', 'Workday Alerting'] },
      { name: 'Predictive Analytics', status: 'pilot', description: 'Cash forecasting with Adaptive Planning', metrics: ['Adaptive integration', 'Driver-based models', 'Workday Prism'] },
      { name: 'Expense Audit & Compliance', status: 'pilot', description: 'AI-powered expense policy for Workday Expenses', metrics: ['Policy engine', 'Receipt AI', 'Audit trails'] },
      { name: 'Conversational ERP Interface', status: 'research', description: 'Natural language → Workday Report Writer', metrics: ['RaaS query gen', 'Security enforced', 'Beta Q3 2025'] },
    ],
    integrations: [
      { name: 'Workday Cloud Connect', type: 'native', description: 'Pre-built integration templates (EIB, Core Connectors)' },
      { name: 'Workday Extend', type: 'native', description: 'Low-code app development on Workday platform' },
      { name: 'Workday Prism Analytics', type: 'native', description: 'Advanced analytics & data blending' },
      { name: 'Adaptive Planning', type: 'native', description: 'Connected planning & forecasting' },
      { name: 'Workday RaaS', type: 'native', description: 'Report-as-a-Service for custom queries' },
      { name: 'MuleSoft', type: 'partner', description: 'Salesforce MuleSoft for Workday' },
    ],
    certifications: ['Workday Cloud Connect Certified', 'Workday Extend Partner', 'SOC2 Type II', 'ISO 27001'],
    faq: [
      { q: 'Does this work with Workday HCM?', a: 'Yes. Our connector leverages the unified Workday data model across Finance and HCM for employee-centric processes (expenses, travel, procurement).' },
      { q: 'What about Workday Extend apps?', a: 'We provide a Workday Extend app for GenAI Document Intelligence with point-and-click configuration. No Workday Studio development required.' },
      { q: 'How is tenant isolation handled?', a: 'Each customer gets dedicated Workday Extend app deployment with tenant-scoped credentials. No multi-tenant data sharing.' },
    ],
    architecture: [
      { layer: 'Ingestion', tech: 'Workday Cloud Connect + RaaS', detail: 'EIB for batch, Core Connectors for real-time, RaaS for ad-hoc queries' },
      { layer: 'Processing', tech: 'GenAI Models (AWS) + Workday Extend', detail: 'Models hosted on AWS with Workday Extend app for native UI/UX' },
      { layer: 'Validation', tech: 'Workday Business Process Framework', detail: 'Validation via Workday BPF with custom conditions and approval chains' },
      { layer: 'Sync', tech: 'Cloud Connect Bi-directional', detail: 'Write-back: Supplier Invoices, Expense Reports, Journals, Suppliers via Core Connectors' },
      { layer: 'Monitoring', tech: 'Workday Operations Dashboard + Prism', detail: 'Native Workday monitoring + custom Prism dashboards for automation KPIs' },
    ],
    caseStudies: ['fintech-unicorn'],
    demoUrl: 'https://demo.flowtaris.ai/workday',
    docsUrl: 'https://docs.flowtaris.ai/platforms/workday',
  },
  'multi-platform': {
    name: 'Multi-Platform Environments',
    tagline: 'Complex Landscapes, Unified Automation',
    category: 'Hybrid',
    maturity: 'production',
    logo: '🔄',
    shortDescription: 'Orchestrate automation across NetSuite, Coupa, SAP, Workday, and legacy systems with a single control plane.',
    description: 'Most enterprises run hybrid landscapes. Flowtaris AI\'s Multi-Platform capability provides a unified control plane for orchestrating automation across multiple ERPs, iPaaS layers, and legacy systems. Our platform-agnostic architecture normalizes data models, synchronizes processes, and provides single-pane-of-glass visibility.',
    capabilities: [
      { name: 'GenAI Document Intelligence', status: 'production', description: 'Unified document processing across all platforms', metrics: ['Single model', 'Cross-platform', 'Normalized output'] },
      { name: 'Autonomous Workflow Engine', status: 'production', description: 'Cross-ERP workflow orchestration', metrics: ['Event-driven', 'Saga patterns', 'Compensation logic'] },
      { name: 'Integration Health Monitoring', status: 'production', description: 'Unified observability across all integrations', metrics: ['Single dashboard', 'Cross-platform correlation', 'Unified alerting'] },
      { name: 'Predictive Analytics', status: 'pilot', description: 'Consolidated forecasting across entities', metrics: ['Multi-ERP data', 'Currency/GAAP norm', 'Consolidated view'] },
      { name: 'AI Governance & Compliance', status: 'pilot', description: 'Centralized governance for distributed AI', metrics: ['Policy as code', 'Audit aggregation', 'Risk dashboard'] },
    ],
    integrations: [
      { name: 'NetSuite SuiteCloud', type: 'native', description: 'Native NetSuite integration' },
      { name: 'Coupa Open APIs', type: 'native', description: 'Native Coupa integration' },
      { name: 'SAP BTP', type: 'native', description: 'Native SAP integration' },
      { name: 'Workday Cloud Connect', type: 'native', description: 'Native Workday integration' },
      { name: 'MuleSoft Anypoint', type: 'partner', description: 'iPaaS orchestration layer' },
      { name: 'Boomi AtomSphere', type: 'partner', description: 'iPaaS orchestration layer' },
      { name: 'Celonis', type: 'partner', description: 'Process mining across platforms' },
      { name: 'Custom Legacy', type: 'partner', description: 'Mainframe, AS/400, custom APIs' },
    ],
    certifications: ['SOC2 Type II', 'ISO 27001', 'Platform certifications per ERP'],
    faq: [
      { q: 'How do you handle different data models?', a: 'Our canonical data model normalizes invoices, POs, vendors, and payments across all platforms. Platform-specific fields preserved in extensions.' },
      { q: 'Can workflows span multiple ERPs?', a: 'Yes. Autonomous Workflow Engine supports saga-pattern orchestration across NetSuite → Coupa → SAP with compensation transactions for rollback.' },
      { q: 'What about master data synchronization?', a: 'Bi-directional master data sync for vendors, charts of accounts, payment terms, and tax codes with conflict resolution rules.' },
    ],
    architecture: [
      { layer: 'Ingestion', tech: 'Multi-Protocol Gateway', detail: 'Unified ingestion: REST, OData, SOAP, SFTP, Kafka, custom connectors' },
      { layer: 'Processing', tech: 'Platform-Agnostic GenAI + Canonical Model', detail: 'Single model deployment with platform-specific adapters for field mapping' },
      { layer: 'Validation', tech: 'Distributed Rules Engine', detail: 'Central policy definition, platform-specific execution via adapters' },
      { layer: 'Sync', tech: 'Event-Driven Orchestration (Kafka)', detail: 'Event sourcing with Kafka for cross-platform transaction coordination' },
      { layer: 'Monitoring', tech: 'Unified Observability Stack', detail: 'Grafana + Loki + Tempo for metrics, logs, traces across all platforms' },
    ],
    caseStudies: ['healthcare-manufacturing'],
    demoUrl: 'https://demo.flowtaris.ai/multi-platform',
    docsUrl: 'https://docs.flowtaris.ai/platforms/multi-platform',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const data = platformData[slug]

  if (!data) {
    return { title: 'Platform Not Found' }
  }

  return {
    title: `${data.name} Integration | Flowtaris AI`,
    description: data.shortDescription,
    openGraph: {
      title: `${data.name} Integration | Flowtaris AI`,
      description: data.shortDescription,
      type: 'website',
    },
  }
}

export default async function PlatformDetailPage({ params }: Props) {
  const { slug } = await params
  const data = platformData[slug]

  if (!data) {
    notFound()
  }

  type BadgeVariant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline' | 'ghost'

  const maturityColors: Record<string, BadgeVariant> = {
    production: 'success',
    pilot: 'warning',
    beta: 'info',
    research: 'ghost',
  }

  const maturityLabels: Record<string, string> = {
    production: 'Production Ready',
    pilot: 'Pilot / Beta',
    beta: 'Beta',
    research: 'Research / Alpha',
  }

  return (
    <div className="flex flex-col flex-1 w-full">
      <HeroPattern
        headline={{
          text: `${data.logo} ${data.name}`,
          split: ['words', 'lines'],
          className: 'text-display-xl text-gradient-brand text-balance',
        }}
        subheadline={{
          text: data.tagline,
          shape: 'wave',
          className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance max-w-3xl',
        }}
        cta={{
          primary: { label: 'Start Assessment', variant: 'default', className: 'glass-strong', href: `/assessment?platform=${slug}` },
          secondary: { label: 'Calculate ROI', variant: 'outline', className: 'glass', href: `/roi-calculator?platform=${slug}` },
        }}
        stats={{
          items: [
            { label: data.capabilities.filter((c: any) => c.status === 'production').length, value: 'Production Capabilities' },
            { label: data.integrations.length, value: 'Integrations' },
            { label: data.certifications.length, value: 'Certifications' },
            { label: data.caseStudies.length, value: 'Case Studies' },
          ],
        }}
        scrollIndicator={true}
        vignette={true}
        noise={true}
      />

      <main className="flex-1 w-full">
        {/* Overview */}
        <section className="py-24 px-6" aria-labelledby="overview-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Badge variant={maturityColors[data.maturity]} className="text-body-sm">
                    {maturityLabels[data.maturity]}
                  </Badge>
                  <Badge variant="outline" className="text-body-sm">{data.category}</Badge>
                </div>
                <h2 id="overview-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Platform Overview
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  {data.description}
                </p>
              </header>

              <Grid columns={{ base: 1, md: 2 }} gap={6} className="w-full">
                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="h-5 w-5 text-brand-cyan-400" />
                      <CardTitle className="text-headline-sm">Key Differentiators</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {data.capabilities.filter((c: any) => c.status === 'production').slice(0, 3).map((cap: any) => (
                        <li key={cap.name} className="flex items-start gap-3 text-body-md text-neutral-300">
                          <CheckCircle className="h-5 w-5 flex-shrink-0 text-brand-green-400 mt-0.5" />
                          <div>
                            <p className="font-medium">{cap.name}</p>
                            <p className="text-body-sm text-neutral-400">{cap.description}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldIcon className="h-5 w-5 text-brand-green-400" />
                      <CardTitle className="text-headline-sm">Certifications & Compliance</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {data.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline" className="text-body-sm">{cert}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Capabilities Matrix */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="capabilities-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="capabilities-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Capabilities on {data.name}
                </h2>
                <p className="text-headline-md text-neutral-400 text-balance">
                  Each capability adapted for {data.name}\'s native architecture and APIs
                </p>
              </header>

              <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={6} className="w-full">
                {data.capabilities.map((cap: any, i: number) => (
                  <Card key={cap.name} className="glass-card h-full group interactive">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-brand-cyan-400" />
                          <CardTitle className="text-headline-sm">{cap.name}</CardTitle>
                        </div>
                        <Badge variant={maturityColors[cap.status]} className="text-body-xs">
                          {cap.status.charAt(0).toUpperCase() + cap.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-body-sm text-brand-cyan-300">{cap.metrics.join(' • ')}</p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-body-md text-neutral-300">{cap.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Technical Architecture */}
        <section className="py-24 px-6" aria-labelledby="architecture-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="architecture-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Technical Architecture
                </h2>
              </header>

              <div className="glass-strong rounded-2xl p-8 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-overline text-brand-cyan-400 tracking-widest uppercase">Layer</th>
                      <th className="text-left p-4 text-overline text-brand-cyan-400 tracking-widest uppercase">Technology</th>
                      <th className="text-left p-4 text-overline text-brand-cyan-400 tracking-widest uppercase">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.architecture.map((layer: any) => (
                      <tr key={layer.layer} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-medium text-white flex items-center gap-2">
                          <Cpu className="h-4 w-4 text-brand-cyan-400" />
                          {layer.layer}
                        </td>
                        <td className="p-4 text-brand-cyan-300 font-mono text-body-sm">{layer.tech}</td>
                        <td className="p-4 text-neutral-300">{layer.detail}</td>
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
            <Stack gap={8} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="integrations-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Key Integrations
                  <span className="text-display-sm text-neutral-400 font-normal ml-2">({data.integrations.length})</span>
                </h2>
              </header>

              <div className="space-y-4">
                {['native', 'partner'].map((type) => {
                  const items = data.integrations.filter((i: any) => i.type === type)
                  if (items.length === 0) return null
                  return (
                    <div key={type} className="glass-card">
                      <CardContent className="p-6">
                        <h3 className="text-headline-sm text-white mb-4 flex items-center gap-2">
                          {type === 'native' ? <Cloud className="h-5 w-5 text-brand-cyan-400" /> : <Globe className="h-5 w-5 text-brand-purple-400" />}
                          {type === 'native' ? 'Native Integrations' : 'Partner Ecosystem'}
                        </h3>
                        <div className="flex flex-wrap gap-3">
                          {items.map((integration: any) => (
                            <Badge key={integration.name} variant="outline" className="text-body-sm px-4 py-2">
                              {integration.name}
                              <span className="ml-2 text-body-xs text-neutral-400">{integration.description}</span>
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </div>
                  )
                })}
              </div>
            </Stack>
          </Container>
        </section>

        {/* FAQ */}
        <section className="py-24 px-6" aria-labelledby="faq-heading">
          <Container size="xl">
            <Stack gap={12} className="w-full max-w-3xl mx-auto">
              <header className="text-center">
                <h2 id="faq-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Frequently Asked Questions
                </h2>
              </header>

              <div className="space-y-4">
                {data.faq.map((item: any, i: number) => (
                  <Card key={i} className="glass-card">
                    <CardContent className="p-6">
                      <details className="group">
                        <summary className="flex items-center justify-between cursor-pointer list-none text-headline-sm text-white">
                          {item.q}
                          <ChevronRight className="h-5 w-5 text-neutral-400 group-open:rotate-90 transition-transform" />
                        </summary>
                        <p className="text-body-md text-neutral-300 mt-4 pb-2">{item.a}</p>
                      </details>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </Stack>
          </Container>
        </section>

        {/* Case Studies */}
        <section className="py-24 px-6 bg-gradient-to-b from-brand-navy-900/50 to-transparent" aria-labelledby="case-studies-heading">
          <Container size="xl">
            <Stack gap={8} className="w-full">
              <header className="text-center max-w-3xl mx-auto">
                <h2 id="case-studies-heading" className="text-display-md text-gradient-brand text-balance mb-6">
                  Case Studies on {data.name}
                </h2>
              </header>

              <Grid columns={{ base: 1, md: 2 }} gap={6} className="w-full">
                {data.caseStudies.map((caseStudySlug: string) => (
                  <Card key={caseStudySlug} className="glass-card interactive">
                    <CardContent className="p-6">
                      <h4 className="text-headline-sm text-white mb-2">
                        {caseStudySlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </h4>
                      <p className="text-body-md text-neutral-400 mb-4">
                        See how Flowtaris AI delivered results on {data.name} for a similar organization.
                      </p>
                      <Button variant="ghost" size="sm" asChild>
                        <a href={`/case-studies/${caseStudySlug}`}>
                          View Case Study
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </Grid>
            </Stack>
          </Container>
        </section>

        {/* Demo & CTA */}
        <section className="py-24 px-6" aria-labelledby="demo-heading">
          <Container size="lg">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <h2 id="demo-heading" className="text-display-lg text-gradient-brand mb-6 text-balance">
                See {data.name} Integration in Action
              </h2>
              <p className="text-headline-md text-neutral-300 mb-10 max-w-2xl mx-auto text-balance">
                Watch a live demo or start your personalized assessment to see how Flowtaris AI works with your {data.name} environment.
              </p>

              {data.demoUrl && (
                <div className="mb-10 aspect-video max-w-3xl mx-auto rounded-xl overflow-hidden glass">
                  <iframe
                    src={data.demoUrl}
                    title={`${data.name} Demo`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="glass-strong px-10 py-4" asChild>
                  <a href={`/assessment?platform=${slug}`}>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Start Assessment
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="glass px-10 py-4" asChild>
                  <a href={`/roi-calculator?platform=${slug}`}>
                    <DollarSign className="mr-2 h-5 w-5" />
                    Calculate ROI
                  </a>
                </Button>
                {data.docsUrl && (
                  <Button variant="ghost" size="lg" className="px-10 py-4" asChild>
                    <a href={data.docsUrl} target="_blank" rel="noopener noreferrer">
                      <BookOpen className="mr-2 h-5 w-5" />
                      View Documentation
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* Back to Platforms */}
        <section className="py-12 px-6">
          <Container size="xl">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <a href="/platforms">
                  <ChevronRight className="mr-2 h-4 w-4 rotate-180" />
                  All Platforms
                </a>
              </Button>
              <span className="text-body-sm text-neutral-500">← Back to platforms</span>
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
              <a href="/platforms" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">All Platforms</a>
              <a href="/capabilities" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Capabilities</a>
              <a href="/assessment" className="text-body-sm text-neutral-500 hover:text-brand-cyan-400 transition-colors">Assessment</a>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  )
}