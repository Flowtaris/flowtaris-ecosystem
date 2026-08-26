-- Capabilities content table
-- Stores all 6 capability page content, editable via admin panel
-- Mirrors the fallback static data in /capabilities/[slug]/page.tsx

CREATE TABLE IF NOT EXISTS public.capabilities (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug            text UNIQUE NOT NULL,
  category        text NOT NULL,
  title           text NOT NULL,
  headline        text NOT NULL,
  subheadline     text NOT NULL,

  -- Problem section
  problem_eyebrow   text,
  problem_headline  text,
  problem_body      text,
  problem_stat_value  text,
  problem_stat_label  text,

  -- Stats (4 metric cards)
  stats           jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- shape: [{ value, label, context }]

  -- How it works steps (alternating image/text)
  steps           jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- shape: [{ eyebrow, headline, body, image_url, image_alt, image_right, bullets: [] }]

  -- Technical architecture table rows
  technical_details jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- shape: [{ component, technology, description }]

  -- Platform integrations (chip list)
  integrations    text[] NOT NULL DEFAULT '{}',

  -- FAQ items
  faq_items       jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- shape: [{ question, answer }]

  -- CTA section
  cta_headline    text,
  cta_body        text,
  cta_primary_label text,
  cta_primary_href  text,
  cta_secondary_label text,
  cta_secondary_href  text,

  -- Related capabilities (slugs)
  related_slugs   text[] NOT NULL DEFAULT '{}',

  -- SEO
  seo_title       text,
  seo_description text,
  seo_og_image    text,
  seo_keywords    text,

  -- Per-capability color identity (hex, e.g. #f59e0b)
  accent_color    text DEFAULT '#6366f1',

  -- Metadata
  is_published    boolean NOT NULL DEFAULT true,
  maturity        text NOT NULL DEFAULT 'production' CHECK (maturity IN ('production', 'pilot', 'research')),
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_capabilities_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER capabilities_updated_at
  BEFORE UPDATE ON public.capabilities
  FOR EACH ROW EXECUTE FUNCTION update_capabilities_updated_at();

-- RLS
ALTER TABLE public.capabilities ENABLE ROW LEVEL SECURITY;

-- Public read for published capabilities
CREATE POLICY "Public can read published capabilities"
  ON public.capabilities FOR SELECT
  USING (is_published = true);

-- Admin full access
CREATE POLICY "Admin full access to capabilities"
  ON public.capabilities FOR ALL
  USING (auth.role() = 'service_role');

-- Seed the 6 capabilities with initial content
INSERT INTO public.capabilities (slug, category, title, headline, subheadline, maturity, stats, integrations, faq_items, related_slugs, seo_title, seo_description, seo_keywords) VALUES
(
  'genai-document-intelligence',
  'DOCUMENT PROCESSING',
  'GenAI Document Intelligence',
  'Your Finance Team Processes 400 Documents a Day. AI Can Handle 400,000.',
  'Flowtaris AI extracts, validates, and routes invoices, purchase orders, receipts, and contracts — at 99.4% accuracy — directly into your ERP.',
  'production',
  '[{"value":"99.4%","label":"Extraction Accuracy","context":"across 2.1M documents processed"},{"value":"4 days → 3 min","label":"Invoice-to-Pay Cycle","context":"median reduction in production"},{"value":"85%","label":"Automation Rate","context":"of invoices with zero human touch"},{"value":"$4.5M/yr","label":"Cost Reduction","context":"for enterprise at 50K invoices/yr"}]',
  ARRAY['NetSuite SuiteCloud','Coupa Open APIs','SAP BTP','Workday Cloud Connect','Oracle ERP Cloud','MuleSoft','Celonis','Microsoft Azure AI'],
  '[]',
  ARRAY['autonomous-workflow-engine','predictive-analytics','integration-health-monitoring'],
  'AI Invoice Processing & Document Intelligence for NetSuite, Coupa & SAP | Flowtaris AI',
  'Automate accounts payable with GenAI. Flowtaris AI extracts invoice data at 99.4% accuracy and syncs directly to NetSuite, Coupa, SAP, and Workday.',
  'AI invoice processing, GenAI document extraction, AP automation NetSuite'
),
(
  'autonomous-workflow-engine',
  'PROCESS AUTOMATION',
  'Autonomous Workflow Engine',
  'Approval Workflows That Run Themselves.',
  'AI-driven workflow automation that routes, escalates, and resolves AP exceptions without manual intervention.',
  'production',
  '[{"value":"92%","label":"Straight-Through Rate","context":"invoices approved without human touch"},{"value":"4.2 days","label":"Cycle Time Reduction","context":"median approval cycle"},{"value":"$2.1M","label":"Annual Savings","context":"per 10K invoices processed"},{"value":"60+","label":"Workflow Templates","context":"pre-built for AP, PO, contracts"}]',
  ARRAY['NetSuite','Coupa','SAP','Workday','Slack','Microsoft Teams'],
  '[]',
  ARRAY['genai-document-intelligence','predictive-analytics'],
  'Autonomous AP Workflow Automation | Flowtaris AI',
  'AI-powered workflow engine that automates invoice approvals, exception routing, and escalation across NetSuite, Coupa, SAP, and Workday.',
  'AP workflow automation, invoice approval AI, ERP workflow engine'
),
(
  'predictive-analytics',
  'FINANCE INTELLIGENCE',
  'Predictive Analytics',
  'From Lagging Reports to Leading Signals.',
  'Real-time cash flow forecasting, vendor risk scoring, and spend anomaly detection — surfacing what matters before it becomes a problem.',
  'production',
  '[{"value":"94%","label":"Forecast Accuracy","context":"rolling 90-day cash flow prediction"},{"value":"12 days","label":"Early Warning Lead Time","context":"average detection before crisis"},{"value":"3.2%","label":"Spend Reduction","context":"from anomaly detection alerts"},{"value":"99","label":"Vendors Scored","context":"risk model running in background"}]',
  ARRAY['NetSuite','Coupa','SAP','Workday','Tableau','Power BI'],
  '[]',
  ARRAY['genai-document-intelligence','ai-governance-compliance'],
  'AI Predictive Analytics for Finance Teams | Flowtaris AI',
  'Real-time cash flow forecasting, spend anomaly detection, and vendor risk scoring powered by AI for NetSuite, Coupa, SAP, and Workday.',
  'predictive analytics finance, AI cash flow forecasting, spend analytics ERP'
),
(
  'conversational-erp',
  'HUMAN COMPUTER INTERACTION',
  'Conversational ERP Interface',
  'Talk to Your ERP Like You Talk to Your Team.',
  'Natural language queries, commands, and approvals — directly against your NetSuite, Coupa, or SAP data.',
  'production',
  '[{"value":"80%","label":"Query Resolution Rate","context":"answered without opening ERP UI"},{"value":"4 min","label":"Avg Report Time","context":"vs 45 min building in ERP"},{"value":"140+","label":"Supported Commands","context":"across AP, AR, GL, procurement"},{"value":"6 ERPs","label":"Supported Systems","context":"NetSuite, Coupa, SAP, Workday, Oracle, MS Dynamics"}]',
  ARRAY['NetSuite','SAP','Coupa','Workday','Slack','Microsoft Teams','Google Workspace'],
  '[]',
  ARRAY['autonomous-workflow-engine','integration-health-monitoring'],
  'Conversational ERP Interface — AI Natural Language for NetSuite & SAP | Flowtaris AI',
  'Query NetSuite, Coupa, SAP, and Workday in plain English with Flowtaris AI conversational interface.',
  'conversational ERP, AI ERP interface, natural language NetSuite'
),
(
  'integration-health-monitoring',
  'OBSERVABILITY',
  'Integration Health Monitoring',
  'Know When Your ERP Integrations Break — Before Your Finance Team Does.',
  'Continuous monitoring, anomaly detection, and auto-remediation for every data flow between your ERP and connected systems.',
  'production',
  '[{"value":"99.97%","label":"Uptime Monitored","context":"across all connected ERP integrations"},{"value":"8 min","label":"MTTD","context":"mean time to detect integration failures"},{"value":"73%","label":"Auto-Remediated","context":"of common integration errors"},{"value":"200+","label":"Data Points","context":"monitored per integration per minute"}]',
  ARRAY['NetSuite','Coupa','SAP','Workday','MuleSoft','PagerDuty','Slack','Datadog'],
  '[]',
  ARRAY['genai-document-intelligence','ai-governance-compliance'],
  'ERP Integration Health Monitoring & Observability | Flowtaris AI',
  'Real-time monitoring and anomaly detection for NetSuite, Coupa, SAP, and Workday integrations.',
  'ERP integration monitoring, NetSuite integration health, API monitoring finance'
),
(
  'ai-governance-compliance',
  'RISK AND COMPLIANCE',
  'AI Governance and Compliance',
  'Deploy AI in Finance With Full Auditability and Control.',
  'Model governance, explainability logs, access controls, and compliance reporting — built for SOX, GDPR, and internal audit requirements.',
  'production',
  '[{"value":"100%","label":"Audit Trail Coverage","context":"per AI decision, per transaction"},{"value":"SOX Ready","label":"Compliance Framework","context":"COSO-aligned control documentation"},{"value":"<24 hrs","label":"Audit Pack Generation","context":"vs weeks of manual preparation"},{"value":"GDPR","label":"Data Residency","context":"EU data stays in EU by configuration"}]',
  ARRAY['NetSuite','Coupa','SAP','Workday','Splunk','ServiceNow','Microsoft Purview'],
  '[]',
  ARRAY['predictive-analytics','integration-health-monitoring'],
  'AI Governance & Compliance for Finance Operations | Flowtaris AI',
  'Enterprise AI governance for finance teams. Full audit trails, model explainability, SOX-compliant access controls, and GDPR-ready data handling.',
  'AI governance finance, SOX compliance AI, audit trail AI automation'
)
ON CONFLICT (slug) DO NOTHING;
