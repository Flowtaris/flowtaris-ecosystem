-- Flowtaris AI - Initial Content Migration
-- Migration: 20240820000001
-- Inserts initial content for site config, platform pages, AI capabilities, case studies, and insights

-- Update site config with desired values
UPDATE site_config SET
    site_name = 'Flowtaris AI',
    site_url = 'https://flowtaris.ai',
    tagline = 'Enterprise AI Automation for Finance Teams',
    logo_url = 'https://images.unsplash.com/photo-1551288048-b4ed7e68cf6e?auto=format&fit=crop&w=200&q=60', -- placeholder
    favicon_url = 'https://images.unsplash.com/photo-1551288048-b4ed7e68cf6e?auto=format&fit=crop&w=32&q=60', -- placeholder
    navigation = '[
        {"label": "Home", "href": "/"},
        {"label": "Capabilities", "href": "/capabilities"},
        {"label": "Platforms", "href": "/platforms"},
        {"label": "Case Studies", "href": "/case-studies"},
        {"label": "ROI Calculator", "href": "/roi-calculator"},
        {"label": "Insights", "href": "/insights"},
        {"label": "Contact", "href": "/contact"}
    ]'::jsonb,
    social_links = '{
        "linkedin": "https://linkedin.com/company/flowtaris-ai",
        "twitter": "https://twitter.com/flowtarisai",
        "github": "https://github.com/flowtaris-ai"
    }'::jsonb,
    contact_email = 'hello@flowtaris.ai',
    support_email = 'support@flowtaris.ai',
    privacy_policy_url = '/legal/privacy',
    terms_of_service_url = '/legal/terms',
    cookie_policy_url = '/legal/cookies',
    analytics = '{
        "ga4": "G-XXXXXXXXXX",
        "gtm": "GTM-XXXXXXX"
    }'::jsonb,
    seo = '{
        "title": "Flowtaris AI - Enterprise AI Automation",
        "description": "Flowtaris AI provides enterprise-grade AI automation for ERP platforms like NetSuite, Coupa, SAP, and Workday. Reduce costs by 60% and processing time by 90%.",
        "keywords": ["AI automation", "ERP AI", "NetSuite AI", "Coupa AI", "SAP AI", "Workday AI"]
    }'::jsonb
WHERE id = '00000000-0000-0000-0000-000000000001';

-- Update assessment config with sample questions and rules
UPDATE assessment_config SET
    questions = '[
        {
            "id": "q1",
            "text": "What is your primary ERP platform?",
            "type": "select",
            "options": ["NetSuite", "Coupa", "SAP", "Workday", "Other"],
            "required": true
        },
        {
            "id": "q2",
            "text": "How many invoices do you process per month?",
            "type": "number",
            "placeholder": "e.g., 1000",
            "required": true
        },
        {
            "id": "q3",
            "text": "What is the average time to process one invoice (in minutes)?",
            "type": "number",
            "placeholder": "e.g., 10",
            "required": true
        },
        {
            "id": "q4",
            "text": "What is your average cost per invoice processing?",
            "type": "number",
            "placeholder": "e.g., 5.00",
            "prefix": "$",
            "required": true
        },
        {
            "id": "q5",
            "text": "What is your error rate in invoice processing?",
            "type": "number",
            "placeholder": "e.g., 2.5",
            "suffix": "%",
            "required": true
        }
    ]'::jsonb,
    recommendation_rules = '[
        {
            "id": "rule1",
            "condition": {
                "all": [
                    {"fact": "invoiceVolume", "operator": ">=", "value": 500},
                    {"fact": "processingTime", "operator": ">=", "value": 5}
                ]
            },
            "recommendation": "Workflow Automation for Invoice Processing",
            "capability": "Workflow Automation",
            "priority": "high"
        },
        {
            "id": "rule2",
            "condition": {
                "all": [
                    {"fact": "errorRate", "operator": ">=", "value": 2}
                ]
            },
            "recommendation": "Document Intelligence for Data Extraction",
            "capability": "Document Intelligence",
            "priority": "medium"
        }
    ]'::jsonb,
    capability_mapping = '{
        "NetSuite": {
            "Workflow Automation": "netsuite-workflow-automation",
            "Document Intelligence": "netsuite-doc-intelligence",
            "Analytics & Forecasting": "netsuite-analytics",
            "Governance & Compliance": "netsuite-compliance",
            "Integration & Monitoring": "netsuite-integration"
        },
        "Coupa": {
            "Workflow Automation": "coupa-workflow-automation",
            "Document Intelligence": "coupa-doc-intelligence",
            "Analytics & Forecasting": "coupa-analytics",
            "Governance & Compliance": "coupa-compliance",
            "Integration & Monitoring": "coupa-integration"
        },
        "SAP": {
            "Workflow Automation": "sap-workflow-automation",
            "Document Intelligence": "sap-doc-intelligence",
            "Analytics & Forecasting": "sap-analytics",
            "Governance & Compliance": "sap-compliance",
            "Integration & Monitoring": "sap-integration"
        },
        "Workday": {
            "Workflow Automation": "workday-workflow-automation",
            "Document Intelligence": "workday-doc-intelligence",
            "Analytics & Forecasting": "workday-analytics",
            "Governance & Compliance": "workday-compliance",
            "Integration & Monitoring": "workday-integration"
        }
    }'::jsonb
WHERE id = '00000000-0000-0000-0000-000000000002';

-- Update ROI config with sample assumptions and formulas
UPDATE roi_config SET
    assumptions = '{
        "currency": "USD",
        "taxRate": 0.25,
        "discountRate": 0.1,
        "inflationRate": 0.03,
        "averageSalary": 65000,
        "benefitsOverhead": 0.3
    }'::jsonb,
    formulas = '{
        "currentAnnualCost": "(invoiceVolume * processingTime * (averageSalary/2080) * (1 + benefitsOverhead)) + (invoiceVolume * costPerInvoice)",
        "automatedAnnualCost": "(invoiceVolume * automatedTimePerInvoice * (averageSalary/2080) * (1 + benefitsOverhead)) + (invoiceVolume * automatedCostPerInvoice) + platformLicenseFee",
        "annualSavings": "currentAnnualCost - automatedAnnualCost",
        "paybackPeriodMonths": "(implementationCost * 12) / annualSavings"
    }'::jsonb,
    benchmarks = '{
        "NetSuite": {
            "automatedTimePerInvoice": 0.5,
            "automatedCostPerInvoice": 0.5,
            "implementationCost": 15000,
            "platformLicenseFee": 5000
        },
        "Coupa": {
            "automatedTimePerInvoice": 0.4,
            "automatedCostPerInvoice": 0.6,
            "implementationCost": 18000,
            "platformLicenseFee": 6000
        },
        "SAP": {
            "automatedTimePerInvoice": 0.6,
            "automatedCostPerInvoice": 0.7,
            "implementationCost": 25000,
            "platformLicenseFee": 8000
        },
        "Workday": {
            "automatedTimePerInvoice": 0.5,
            "automatedCostPerInvoice": 0.6,
            "implementationCost": 20000,
            "platformLicenseFee": 7000
        }
    }'::jsonb,
    platform_multipliers = '{
        "NetSuite": 1.0,
        "Coupa": 1.1,
        "SAP": 1.2,
        "Workday": 1.0
    }'::jsonb
WHERE id = '00000000-0000-0000-0000-000000000003';

-- Insert Platform Pages (only if they don't exist)
INSERT INTO platform_pages (id, slug, name, tagline, category, maturity, logo_emoji, short_description, description, capabilities, integrations, certifications, case_study_ids, demo_url, docs_url, metrics, faq, architecture, seo, created_at, updated_at)
VALUES
    -- NetSuite
    (
        '11111111-1111-1111-1111-111111111111',
        'netsuite',
        'NetSuite',
        'AI-Powered Finance Automation for NetSuite',
        'ERP',
        'production',
        '💼',
        'Automate invoice processing, expense management, and financial reporting in NetSuite with AI.',
        'Our NetSuite AI capability transforms your financial operations by automating routine tasks, providing real-time insights, and ensuring compliance. Features include intelligent invoice processing, predictive cash flow forecasting, and automated reconciliation.',
        '[{"label": "Invoice Automation", "value": "invoice-automation"}, {"label": "Expense Management", "value": "expense-management"}, {"label": "Financial Reporting", "value": "financial-reporting"}, {"label": "Cash Flow Forecasting", "value": "cash-flow-forecasting"}]'::jsonb,
        '[{"name": "Celigo", "type": "iPaaS"}, {"name": "Workato", "type": "iPaaS"}, {"name": "Boomi", "type": "iPaaS"}]'::jsonb,
        '["SuiteCloud Developer", "NetSuite ERP Consultant"]'::jsonb,
        '["aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"]',
        'https://demo.flowtaris.ai/netsuite',
        'https://docs.flowtaris.ai/netsuite',
        '{"invoiceProcessingTime": "3 mins (from 10 mins)", "costPerInvoice": "$0.50 (from $5.00)", "errorRate": "0.1% (from 3%)", "monthlySavings": "$12,500"}'::jsonb,
        '[{"q": "How long does implementation take?", "a": "Typical implementation takes 4-6 weeks for mid-sized companies."}, {"q": "What data is required?", "a": "We need access to your invoice records, vendor master, and chart of accounts."}]'::jsonb,
        '[{"layer": "Presentation", "tech": "SuiteScript 2.0", "detail": "Custom UI components and dashboards"}, {"layer": "Integration", "tech": "RESTlets", "detail": "Secure API connections to Flowtaris AI engine"}, {"layer": "AI Engine", "tech": "Python/PyTorch", "detail": "Document understanding and predictive models"}]'::jsonb,
        '{"title": "NetSuite AI Automation | Flowtaris AI", "description": "Automate your NetSuite financial operations with AI. Reduce invoice processing time by 90% and costs by 80%.", "keywords": ["NetSuite AI", "NetSuite automation", "AI for NetSuite"]}'::jsonb
    )
    ,

    -- Coupa
    (
        '22222222-2222-2222-2222-222222222222',
        'coupa',
        'Coupa',
        'AI-Driven Spend Management for Coupa',
        'ERP',
        'production',
        '💳',
        'Optimize procurement and expense management in Coupa with AI-powered insights and automation.',
        'Our Coupa AI capability transforms your spend management by automating purchase order processing, detecting maverick spending, and providing predictive analytics for better decision making.',
        '[{"label": "PO Automation", "value": "po-automation"}, {"label": "Expense Audit", "value": "expense-audit"}, {"label": "Spend Analytics", "value": "spend-analytics"}, {"label": "Contract Compliance", "value": "contract-compliance"}]'::jsonb,
        '[{"name": "Coupa Core", "type": "native"}, {"name": "Coupa Pay", "type": "payment"}, {"name": "Coupa Supplier Management", "type": "supplier"}]'::jsonb,
        '["Coupa Certified Professional", "CPPB (Certified Professional Public Buyer)"]'::jsonb,
        '["cccccccc-cccc-cccc-cccc-cccccccccccc", "dddddddd-dddd-dddd-dddd-dddddddddddd"]',
        'https://demo.flowtaris.ai/coupa',
        'https://docs.flowtaris.ai/coupa',
        '{"poProcessingTime": "2 mins (from 15 mins)", "maverickSpendReduction": "40%", "invoiceAccuracy": "99.5%", "annualSavings": "$250,000"}'::jsonb,
        '[{"q": "Does this work with Coupa Pay?", "a": "Yes, our solution integrates seamlessly with Coupa Pay for automated invoice processing and payment."}, {"q": "How do you ensure data security?", "a": "We use Coupa\''s secure APIs and SOC 2 Type II certified infrastructure."}]'::jsonb,
        '[{"layer": "Presentation", "tech": "Coupa Extensibility Framework", "detail": "Custom UI components within Coupa UI"}, {"layer": "Integration", "tech": "Coupa REST API", "detail": "Secure, authenticated connections"}, {"layer": "AI Engine", "tech": "Python/Scikit-learn", "detail": "Spend classification and predictive modeling"}]'::jsonb,
        '{"title": "Coupa AI Automation | Flowtaris AI", "description": "Transform your Coupa spend management with AI. Reduce processing costs by 50% and improve compliance.", "keywords": ["Coupa AI", "Coupa automation", "AI for Coupa"]}'::jsonb
    )
    ,

    -- SAP
    (
        '33333333-3333-3333-3333-333333333333',
        'sap',
        'SAP',
        'Intelligent Automation for SAP ERP',
        'ERP',
        'production',
        '🏭',
        'Automate order-to-cash, procure-to-pay, and financial processes in SAP with AI.',
        'Our SAP AI capability transforms your core ERP processes by automating routine transactions, predicting bottlenecks, and providing intelligent recommendations for process optimization.',
        '[{"label": "Order-to-Cash", "value": "order-to-cash"}, {"label": "Procure-to-Pay", "value": "procure-to-pay"}, {"label": "Financial Close", "value": "financial-close"}, {"label": "Inventory Optimization", "value": "inventory-optimization"}]'::jsonb,
        '[{"name": "SAP PO", "type": "module"}, {"name": "SAP FI", "type": "module"}, {"name": "SAP MM", "type": "module"}, {"name": "SAP SD", "type": "module"}]'::jsonb,
        '["SAP Certified Development Associate", "SAP Certified Application Associate"]'::jsonb,
        '["eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee", "ffffffff-ffff-ffff-ffff-ffffffffffff"]',
        'https://demo.flowtaris.ai/sap',
        'https://docs.flowtaris.ai/sap',
        '{"ocCycleTime": "4 days (from 10 days)", "ppCycleTime": "5 days (from 12 days)", "financialClose": "2 days (from 6 days)", "inventoryCarryingCost": "25% reduction"}'::jsonb,
        '[{"q": "Which SAP modules do you support?", "a": "We support SAP ECC and S/4HANA modules including FI, CO, MM, SD, PP, and QM."}, {"q": "Do you require SAP PI/PO?", "a": "No, we can connect directly via RFC or SAP Cloud Platform APIs."}]'::jsonb,
        '[{"layer": "Presentation", "tech": "SAP Fiori", "detail": "Custom Fiori elements and analytical apps"}, {"layer": "Integration", "tech": "SAP RFC/API", "detail": "Direct connections to SAP ECC and S/4HANA"}, {"layer": "AI Engine", "tech": "Java/SAP HANA ML", "detail": "Machine learning models trained on SAP data"}]'::jsonb,
        '{"title": "SAP AI Automation | Flowtaris AI", "description": "Automate your SAP ERP processes with AI. Reduce process cycle times by 60% and improve accuracy.", "keywords": ["SAP AI", "SAP automation", "AI for SAP"]}'::jsonb
    )
    ,

    -- Workday
    (
        '44444444-4444-4444-4444-444444444444',
        'workday',
        'Workday',
        'AI-Powered Finance & HR for Workday',
        'ERP',
        'production',
        '☁️',
        'Automate financial management, payroll, and HR processes in Workday with AI-powered insights.',
        'Our Workday AI capability transforms your financial and HR operations by automating routine tasks, providing predictive analytics, and ensuring compliance with changing regulations.',
        '[{"label": "Financial Accounting", "value": "financial-accounting"}, {"label": "Payroll Automation", "value": "payroll-automation"}, {"label": "HR Operations", "value": "hr-operations"}, {"label": "Talent Management", "value": "talent-management"}]'::jsonb,
        '[{"name": "Workday Prism", "type": "analytics"}, {"name": "Workday Peakon", "type": "employee-voice"}, {"name": "Workday Adaptive Planning", "type": "fp&a"}]'::jsonb,
        '["Workday Certified Pro", "Workday Payroll Certification"]'::jsonb,
        '["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222"]',
        'https://demo.flowtaris.ai/workday',
        'https://docs.flowtaris.ai/workday',
        '{"financialClose": "3 days (from 7 days)", "payrollAccuracy": "99.9%", "timeToHire": "25 days (from 45 days)", "employeeSatisfaction": "15% increase"}'::jsonb,
        '[{"q": "How does this affect our existing Workday integrations?", "a": "Our solution sits alongside your existing integrations and enhances them without requiring changes."}, {"q": "What data sources do you use?", "a": "We use Workday\''s reported data, supplemented with external benchmarks and market data."}]'::jsonb,
        '[{"layer": "Presentation", "tech": "Workday Extend", "detail": "Custom applications built on Workday Extend"}, {"layer": "Integration", "tech": "Workday SOAP/API", "detail": "Secure connections to core Workday modules"}, {"layer": "AI Engine", "tech": "Python/TensorFlow", "detail": "Predictive models for financial forecasting and attrition"}]'::jsonb,
        '{"title": "Workday AI Automation | Flowtaris AI", "description": "Transform your Workday finance and HR operations with AI. Reduce close time by 60% and improve payroll accuracy.", "keywords": ["Workday AI", "Workday automation", "AI for Workday"]}'::jsonb
    )
    ON CONFLICT (slug) DO NOTHING;

-- Insert AI Capabilities (only if they don't exist)
INSERT INTO ai_capabilities (id, slug, name, category, maturity, short_description, description, icon, key_metrics, features, use_cases, supported_platform_ids, timeline, prerequisites, demo_url, docs_url, related_capability_ids, case_study_ids, seo, created_at, updated_at)
VALUES
    -- Document Intelligence
    (
        '55555555-5555-5555-5555-555555555555',
        'document-intelligence',
        'Document Intelligence',
        'Document Intelligence',
        'production',
        'Extract, classify, and validate data from unstructured documents with 99%+ accuracy.',
        'Our Document Intelligence capability uses advanced OCR, NLP, and machine learning to automatically extract data from invoices, receipts, contracts, and other business documents. Eliminate manual data entry and reduce errors by 90%.',
        '📄',
        '[{"label": "Accuracy", "value": "99.2%"}, {"label": "Speed", "value": "2 sec/page"}, {"label": "Cost Savings", "value": "80%"}]'::jsonb,
        '["Multi-language OCR", "Handwritten text recognition", "Signature verification", "Fraud detection", "Batch processing"]'::jsonb,
        '["Invoice processing", "Expense management", "Contract management", "Accounts payable", "Knowledge management"]'::jsonb,
        '["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222", "33333333-3333-3333-3333-333333333333", "44444444-4444-4444-4444-444444444444"]',
        'Q3 2023 - Q1 2024',
        '["Document storage (S3/Blob)", "API access to ERP systems"]'::jsonb,
        'https://demo.flowtaris.ai/doc-intelligence',
        'https://docs.flowtaris.ai/doc-intelligence',
        '["66666666-6666-6666-6666-666666666666", "77777777-7777-7777-7777-777777777777"]',
        '["aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa", "bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"]',
        '{"title": "Document Intelligence | Flowtaris AI", "description": "Extract data from any document with AI-powered OCR and NLP. Achieve 99%+ accuracy and 80% cost savings.", "keywords": ["document intelligence", "AI OCR", "invoice processing"]}'::jsonb
    )
    ,

    -- Workflow Automation
    (
        '66666666-6666-6666-6666-666666666666',
        'workflow-automation',
        'Workflow Automation',
        'Workflow Automation',
        'production',
        'Automate end-to-end business processes across your ERP ecosystem.',
        'Our Workflow Automation capability connects your ERP systems with intelligent bots that handle repetitive tasks, approvals, and notifications. Reduce process cycle times by 70% and free up your team for higher-value work.',
        '⚙️',
        '[{"label": "Process Speed", "value": "70% faster"}, {"label": "Error Reduction", "value": "95% fewer errors"}, {"label": "ROI", "value": "<6 months"}]'::jsonb,
        '["Drag-and-drop workflow builder", "Conditional logic and branching", "SLA monitoring", "Exception handling", "Audit trails"]'::jsonb,
        '["Order-to-cash", "Procure-to-pay", "Financial close", "Employee onboarding", "Expense reimbursement"]'::jsonb,
        '["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222", "33333333-3333-3333-3333-333333333333", "44444444-4444-4444-4444-444444444444"]',
        'Q2 2023 - Q4 2023',
        '["API access to ERP systems", "Identity provider (AD/LDAP)"]'::jsonb,
        'https://demo.flowtaris.ai/workflow-automation',
        'https://docs.flowtaris.ai/workflow-automation',
        '["55555555-5555-5555-5555-555555555555", "77777777-7777-7777-7777-777777777777"]',
        '["cccccccc-cccc-cccc-cccc-cccccccccccc", "dddddddd-dddd-dddd-dddd-dddddddddddd"]',
        '{"title": "Workflow Automation | Flowtaris AI", "description": "Automate complex business processes with AI-powered bots. Achieve 70% faster cycle times and 95% fewer errors.", "keywords": ["workflow automation", "RPA", "business process automation"]}'::jsonb
    )
    ,

    -- Analytics & Forecasting
    (
        '77777777-7777-7777-7777-777777777777',
        'analytics-forecasting',
        'Analytics & Forecasting',
        'Analytics & Forecasting',
        'production',
        'Predict future financial performance with AI-powered forecasting and anomaly detection.',
        'Our Analytics & Forecasting capability uses machine learning to analyze historical data, identify trends, and predict future outcomes. Get accurate forecasts for cash flow, revenue, expenses, and key financial metrics.',
        '📊',
        '[{"label": "Forecast Accuracy", "value": "95%+"}, {"label": "Lead Time", "value": "2 weeks vs 6 weeks"}, {"label": "Confidence Interval", "value": "90%"}]'::jsonb,
        '["Time series forecasting", "Anomaly detection", "Scenario planning", "Root cause analysis", "Executive dashboards"]'::jsonb,
        '["Cash flow forecasting", "Revenue prediction", "Expense budgeting", "Risk management", "Investment analysis"]'::jsonb,
        '["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222", "33333333-3333-3333-3333-333333333333", "44444444-4444-4444-4444-444444444444"]',
        'Q1 2024 - Q3 2024',
        '["Historical financial data (2+ years)", "Clean data warehouse or data lake"]'::jsonb,
        'https://demo.flowtaris.ai/analytics-forecasting',
        'https://docs.flowtaris.ai/analytics-forecasting',
        '["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]',
        '["eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee", "ffffffff-ffff-ffff-ffff-ffffffffffff"]',
        '{"title": "Analytics & Forecasting | Flowtaris AI", "description": "Predict financial outcomes with AI-powered forecasting. Achieve 95%+ accuracy and reduce planning cycles by 70%.", "keywords": ["financial forecasting", "AI analytics", "predictive analytics"]}'::jsonb
    )
    ,

    -- Governance & Compliance
    (
        '88888888-8888-8888-8888-888888888888',
        'governance-compliance',
        'Governance & Compliance',
        'Governance & Compliance',
        'production',
        'Ensure regulatory compliance and reduce risk with automated monitoring and controls.',
        'Our Governance & Compliance capability continuously monitors your ERP transactions for regulatory compliance, policy violations, and potential fraud. Generate audit-ready reports and reduce compliance costs by 60%.',
        '⚖️',
        '[{"label": "Compliance Coverage", "value": "100% of transactions"}, {"label": "Audit Prep Time", "value": "90% reduction"}, {"label": "Fraud Detection", "value": "5x more effective"}]'::jsonb,
        '["Real-time transaction monitoring", "Policy rule engine", "Fraud detection algorithms", "Regulatory update service", "Audit trail management"]'::jsonb,
        '["SOX compliance", "GDPR/CCPA privacy", "Industry-specific regulations (HIPAA, PCI-DSS)", "Internal policy enforcement", "Vendor compliance management"]'::jsonb,
        '["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222", "33333333-3333-3333-3333-333333333333", "44444444-4444-4444-4444-444444444444"]',
        'Q4 2023 - Q2 2024',
        '["Access to transaction logs", "Defined compliance policies"]'::jsonb,
        'https://demo.flowtaris.ai/governance-compliance',
        'https://docs.flowtaris.ai/governance-compliance',
        '["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]',
        '["11111111-1111-1111-1111-111111111111", "33333333-3333-3333-3333-333333333333"]',
        '{"title": "Governance & Compliance | Flowtaris AI", "description": "Ensure regulatory compliance with AI-powered monitoring. Reduce audit preparation time by 90% and improve fraud detection.", "keywords": ["governance compliance", "regulatory tech", "AI auditing"]}'::jsonb
    )
    ,

    -- Integration & Monitoring
    (
        '99999999-9999-9999-9999-999999999999',
        'integration-monitoring',
        'Integration & Monitoring',
        'Integration & Monitoring',
        'production',
        'Connect, monitor, and optimize your entire ERP ecosystem with real-time insights.',
        'Our Integration & Monitoring capability provides a unified view of your ERP ecosystem, monitoring health, performance, and data quality across all connected systems. Ensure seamless operations and reduce downtime by 80%.',
        '🔗',
        '[{"label": "System Uptime", "value": "99.95%"}, {"label": "Issue Resolution", "value": "4x faster"}, {"label": "Data Quality Score", "value": "98%"}]'::jsonb,
        '["Real-time health dashboards", "Automated failover", "Data reconciliation", "Performance analytics", "Custom alerting"]'::jsonb,
        '["System health monitoring", "Data migration verification", "API performance monitoring", "Batch job orchestration", "Security and access monitoring"]'::jsonb,
        '["11111111-1111-1111-1111-111111111111", "22222222-2222-2222-2222-222222222222", "33333333-3333-3333-3333-333333333333", "44444444-4444-4444-4444-444444444444"]',
        'Q1 2023 - Q4 2023',
        '["API access to all ERP systems", "Monitoring infrastructure (Prometheus/Grafana)"]'::jsonb,
        'https://demo.flowtaris.ai/integration-monitoring',
        'https://docs.flowtaris.ai/integration-monitoring',
        '["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]',
        '["22222222-2222-2222-2222-222222222222", "44444444-4444-4444-4444-444444444444"]',
        '{"title": "Integration & Monitoring | Flowtaris AI", "description": "Monitor and optimize your ERP ecosystem with AI-powered insights. Achieve 99.95% uptime and 4x faster issue resolution.", "keywords": ["ERP monitoring", "integration platform", "IT operations analytics"]}'::jsonb
    )
    ON CONFLICT (slug) DO NOTHING;

-- Insert Case Studies (only if they don't exist)
INSERT INTO case_studies (id, slug, title, client, industry, platforms, challenge, solution, results, timeline, testimonial, hero_image_url, seo, geo_signals, related_capability_ids, created_at, updated_at)
VALUES
    -- NetSuite Case Study
    (
        'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
        'netsuite-invoice-automation',
        'Global Manufacturing Leader Reduces Invoice Processing by 90% with Flowtaris AI',
        'Global Manufacturing Inc.',
        'Manufacturing',
        '["11111111-1111-1111-1111-111111111111"]',
        'Manual invoice processing was causing delays, errors, and high operating costs. The company processed 15,000 invoices monthly with an average cost of $6.50 per invoice and 15% error rate.',
        'Implemented Flowtaris AI Document Intelligence and Workflow Automation to automate invoice capture, data extraction, validation, and routing. Integrated with NetSuite via SuiteTalk and customized approval workflows.',
        '[{"label": "Monthly Invoices Processed", "value": "15,000 → 15,000 (same volume)"}, {"label": "Processing Time", "value": "10 mins → 0.8 mins per invoice"}, {"label": "Cost Per Invoice", "value": "$6.50 → $0.65 per invoice"}, {"label": "Error Rate", "value": "15% → 0.2%"}, {"label": "Annual Savings", "value": "$1,170,000"}]'::jsonb,
        'Q1 2024',
        '\"Flowtaris AI transformed our invoice processing from a painful manual task to a seamless automated process. The ROI was realized in just 3 months.\" - Director of Finance',
        'https://images.unsplash.com/photo-1551288048-b4ed7e68cf6e?auto=format&fit=crop&w=1200&q=60', -- placeholder
        '{"title": "NetSuite Invoice Automation Case Study | Flowtaris AI", "description": "See how a global manufacturer reduced invoice processing costs by 90% with AI-powered automation.", "keywords": ["NetSuite case study", "invoice automation", "manufacturing AI"]}'::jsonb,
        '{"geo_signals": ["US", "CA", "MX", "DE", "FR", "JP"]}'::jsonb,
        '["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]',
        NOW()
    )
    ,

    -- Coupa Case Study
    (
        'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
        'coupa-spend-analytics',
        'Technology Company Cuts Maverick Spend by 40% with Flowtaris AI',
        'TechFlow Solutions',
        'Technology',
        '["22222222-2222-2222-2222-222222222222"]',
        'Lack of spend visibility led to maverick purchasing, budget overruns, and compliance issues. The company had 30% maverick spend and struggled with contract compliance.',
        'Deployed Flowtaris AI Analytics & Forecasting and Governance & Compliance to monitor all purchasing transactions, detect policy violations, and predict spending patterns. Integrated with Coupa via APIs and configured real-time alerts.',
        '[{"label": "Monthly Purchase Orders", "value": "8,000 → 8,000 (same volume)"}, {"label": "Maverick Spend", "value": "30% → 18%"}, {"label": "Contract Compliance", "value": "65% → 92%"}, {"label": "Savings from Maverick Spend", "value": "$0 → $480,000 annually"}, {"label": "Budget Variance", "value": "15% → 3%"}]'::jsonb,
        'Q2 2024',
        '\"Flowtaris AI gave us the visibility and control we needed over our spending. We\''ve saved nearly half a million dollars in the first year alone.\" - VP of Procurement',
        'https://images.unsplash.com/photo-1551288048-b4ed7e68cf6e?auto=format&fit=crop&w=1200&q=60', -- placeholder
        '{"title": "Coupa Spend Analytics Case Study | Flowtaris AI", "description": "Learn how a technology company reduced maverick spend by 40% with AI-powered spend monitoring.", "keywords": ["Coupa case study", "spend analytics", "technology AI"]}'::jsonb,
        '{"geo_signals": ["US", "CA", "NY", "TX", "FL", "IN"]}'::jsonb,
        '["77777777-7777-7777-7777-777777777777", "88888888-8888-8888-8888-888888888888"]',
        NOW()
    )
    ON CONFLICT (slug) DO NOTHING;

-- Insert Insights (only if they don't exist)
INSERT INTO insights (id, slug, title, author, excerpt, rich_text, topic_clusters, faq_items, citations, related_capability_ids, published_at, seo, geo_signals, created_at, updated_at)
VALUES
    -- Insight 1: The Future of ERP Automation
    (
        'cccccccc-cccc-cccc-cccc-cccccccccccc',
        'future-of-erp-automation',
        'The Future of ERP Automation: Beyond RPA to Intelligent Process Automation',
        'Dr. Elena Rodriguez',
        'Discover how AI is transforming ERP systems from basic automation to intelligent, self-optimizing platforms.',
        '{"blocks": [{"key": "a1b2c", "text": "The landscape of ERP automation is undergoing a fundamental shift. Traditional RPA approaches are being superseded by Intelligent Process Automation (IPA) that combines AI, machine learning, and advanced analytics to create self-optimizing systems.", "type": "paragraph"}, {"key": "d3e4f", "text": "Key trends include: 1) Hyperautomation of end-to-end processes, 2) AI-driven decision making, 3) Predictive process optimization, 4) Autonomous exception handling.", "type": "paragraph"}, {"key": "g5h6i", "text": "Organizations that embrace IPA are seeing 3x faster ROI compared to traditional RPA implementations.", "type": "paragraph"}], "entityRanges": [], "data": {}}'::jsonb,
        '["ERP Automation", "Intelligent Process Automation", "AI in Enterprise"]'::jsonb,
        '[{"question": "What is the difference between RPA and IPA?", "answer": "RPA focuses on automating repetitive, rule-based tasks, while IPA adds AI capabilities for decision making, learning, and adaptation to changing conditions."}]'::jsonb,
        '[{"source": "Gartner", "title": "Hyperautomation and the Future of Work", "date": "2023"}, {"source": "Forrester", "title": "The Intelligent Process Automation Wave", "date": "2024"}]'::jsonb,
        '["66666666-6666-6666-6666-666666666666", "77777777-7777-7777-7777-777777777777", "88888888-8888-8888-8888-888888888888", "99999999-9999-9999-9999-999999999999"]',
        '2024-08-15T00:00:00Z',
        '{"title": "Future of ERP Automation | Flowtaris AI Insights", "description": "Explore how AI is evolving ERP automation beyond RPA to intelligent, self-optimizing systems.", "keywords": ["ERP automation", "intelligent process automation", "AI trends"]}'::jsonb,
        '{"geo_signals": ["US", "CA", "TX", "NY", "FL", "IL"]}'::jsonb,
        NOW()
    )
    ,

    -- Insight 2: AI for NetSuite Financial Close
    (
        'dddddddd-dddd-dddd-dddd-dddddddddddd',
        'ai-for-netsuite-financial-close',
        'Accelerating NetSuite Financial Close with AI-Powered Automation',
        'Michael Chen',
        'Learn how AI technologies are reducing financial close cycles from days to hours in NetSuite environments.',
        '{"blocks": [{"key": "a1b2c", "text": "The financial close process remains one of the most time-consuming and error-prone activities in finance departments. Traditional approaches rely heavily on manual reconciliations and spreadsheet-based adjustments.", "type": "paragraph"}, {"key": "d3e4f", "text": "AI-powered automation is transforming this landscape by automating data collection, validation, reconciliation, and reporting. Companies are seeing close cycles reduced from 5-7 days to under 24 hours.", "type": "paragraph"}, {"key": "g5h6i", "text": "Key automation opportunities include: intercompany eliminations, accrual management, variance analysis, and financial statement preparation.", "type": "paragraph"}], "entityRanges": [], "data": {}}'::jsonb,
        '["NetSuite", "Financial Close", "Accounting Automation"]'::jsonb,
        '[{"question": "Which NetSuite modules benefit most from AI automation?", "answer": "General Ledger, Accounts Payable, Accounts Receivable, and Fixed Assets modules see the greatest impact from AI automation."}]'::jsonb,
        '[{"source": "Deloitte", "title": "AI in Finance: Transforming the Office of the CFO", "date": "2023"}, {"source": "NetSuite", "title": "SuiteSuccess Finance Cloud?", "date": "2024"}]'::jsonb,
        '["55555555-5555-5555-5555-555555555555", "66666666-6666-6666-6666-666666666666"]',
        '2024-08-10T00:00:00Z',
        '{"title": "AI for NetSuite Financial Close | Flowtaris AI Insights", "description": "Discover how AI is reducing financial close cycles in NetSuite environments from days to hours.", "keywords": ["NetSuite financial close", "AI accounting", "automated close"]}'::jsonb,
        '{"geo_signals": ["US", "CA", "TX", "NY", "FL", "IL"]}'::jsonb,
        NOW()
    )
    ON CONFLICT (slug) DO NOTHING;
