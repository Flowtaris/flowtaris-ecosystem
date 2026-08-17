import { createClient } from '@sanity/client'

const client = createClient({
  projectId: '5gbgq9zl',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || 'skYXlmiOQsbUzZRfyN6QwqOfK0zpuKmQymGfJNJZHZ8VkCzdGyUWTm4f2FXpML5tC8GgsMjyvIm4t7tkm',
  useCdn: false,
})

const capabilities = [
  {
    _type: 'aiCapability',
    title: 'GenAI Document Intelligence',
    slug: { current: 'genai-document-intelligence' },
    category: 'genai',
    shortDescription: 'Extract, classify, and enrich unstructured documents at scale using multimodal LLMs. Automate AP, contracts, and compliance workflows with 99%+ accuracy.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'GenAI Document Intelligence transforms how enterprises process unstructured content. Using state-of-the-art multimodal LLMs, it extracts structured data from invoices, contracts, purchase orders, and compliance documents with unprecedented accuracy.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Key capabilities include intelligent classification, key-value extraction, table parsing, handwriting recognition, and automated validation against business rules. The system learns from corrections and continuously improves.'
          }
        ]
      }
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Salesforce'],
    maturity: 'production',
    icon: 'file-text',
    technicalDetails: [
      { component: 'Document Ingestion', technology: 'Apache Kafka + AWS S3', description: 'High-throughput document intake with automatic format detection (PDF, images, emails, scans)' },
      { component: 'ML Pipeline', technology: 'Transformers + LayoutLMv3', description: 'Multimodal transformer architecture combining visual layout understanding with textual semantics' },
      { component: 'Validation Engine', technology: 'Custom rules engine', description: 'Business rule validation with configurable confidence thresholds and human-in-the-loop escalation' },
      { component: 'Export & Integration', technology: 'GraphQL + REST APIs', description: 'Structured JSON output with webhook notifications and native ERP connectors' }
    ],
    integrations: ['Google Document AI', 'AWS Textract', 'Azure Form Recognizer', 'Custom model training'],
    demoVideo: 'https://demo.flowtaris.ai/genai-doc-intelligence',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/genai-document-intelligence',
    metrics: [
      { label: 'Extraction Accuracy', value: '99.2%', context: 'on benchmark datasets (SROIE, CORD)' },
      { label: 'Processing Speed', value: '< 2 sec', context: 'per page at 99th percentile' },
      { label: 'Cost Reduction', value: '85%', context: 'vs manual data entry' },
      { label: 'Straight-Through Rate', value: '94%', context: 'documents processed without human review' }
    ],
    seo: {
      metaTitle: 'GenAI Document Intelligence | Flowtaris AI',
      metaDescription: 'Automate document processing with 99%+ accuracy using multimodal LLMs. Extract data from invoices, contracts, and compliance docs.',
      twitterCard: 'summary_large_image'
    },
    geoSignals: {
      keyClaims: [
        '99.2% extraction accuracy on industry benchmarks',
        'Processes 10,000+ documents per hour',
        'Reduces manual data entry costs by 85%',
        'Supports 50+ document types out of the box'
      ],
      citations: [
        { title: 'LayoutLMv3: Pre-training for Document AI', url: 'https://arxiv.org/abs/2204.08387', source: 'Microsoft Research' },
        { title: 'SROIE Benchmark Results', url: 'https://rrc.cvc.uab.es/?ch=13', source: 'ICDAR 2019' }
      ],
      faqItems: [
        { question: 'What document types are supported?', answer: 'Invoices, purchase orders, contracts, receipts, bank statements, tax forms, shipping documents, and custom templates.' },
        { question: 'How does it handle handwritten text?', answer: 'Uses ICR (Intelligent Character Recognition) models trained on diverse handwriting samples with 94%+ accuracy.' },
        { question: 'Can I train custom models?', answer: 'Yes, the platform supports few-shot fine-tuning with as few as 20 annotated documents per type.' }
      ],
      entityAssociations: ['Document AI', 'Intelligent Document Processing', 'OCR', 'LayoutLM', 'Multimodal LLM'],
      topicClusters: ['Document Intelligence', 'AI in Finance', 'Accounts Payable Automation'],
      answerTargets: [
        { question: 'What is GenAI document intelligence?', targetAnswer: 'GenAI Document Intelligence uses multimodal large language models to automatically extract, classify, and enrich structured data from unstructured documents like invoices, contracts, and forms.' },
        { question: 'How accurate is automated document extraction?', targetAnswer: 'Modern GenAI document intelligence achieves 99%+ accuracy on standard benchmarks, with straight-through processing rates of 90%+ for common document types.' }
      ]
    }
  },
  {
    _type: 'aiCapability',
    title: 'Predictive Analytics Engine',
    slug: { current: 'predictive-analytics-engine' },
    category: 'ml',
    shortDescription: 'Forecast demand, detect anomalies, and optimize decisions with AutoML-powered predictions. Turn historical ERP data into actionable foresight across finance, supply chain, and operations.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The Predictive Analytics Engine applies automated machine learning to your ERP data, uncovering patterns humans miss. It forecasts cash flow, predicts supplier risk, optimizes inventory, and detects fraudulent transactions — all without requiring a data science team.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Features include automated feature engineering, model selection, hyperparameter tuning, drift detection, and explainable predictions with SHAP values. Models retrain automatically as new data arrives.'
          }
        ]
      }
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Oracle Cloud'],
    maturity: 'production',
    icon: 'trending-up',
    technicalDetails: [
      { component: 'Data Pipeline', technology: 'dbt + Snowflake/BigQuery', description: 'Automated ETL from ERP sources with incremental synchronization and data quality checks' },
      { component: 'AutoML Core', technology: 'H2O.ai + Optuna', description: 'Automated algorithm selection, feature engineering, and hyperparameter optimization' },
      { component: 'Model Serving', technology: 'MLflow + KServe', description: 'Low-latency inference with A/B testing, canary deployments, and automated rollback on drift' },
      { component: 'Explainability', technology: 'SHAP + LIME', description: 'Feature attribution for every prediction with natural language explanations' }
    ],
    integrations: ['Snowflake', 'BigQuery', 'Databricks', 'Azure ML', 'AWS SageMaker'],
    demoVideo: 'https://demo.flowtaris.ai/predictive-analytics',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/predictive-analytics-engine',
    metrics: [
      { label: 'Forecast Accuracy (MAPE)', value: '8.5%', context: 'on 30-day cash flow forecasts' },
      { label: 'Anomaly Detection F1', value: '0.94', context: 'on procurement fraud benchmarks' },
      { label: 'Model Training Time', value: '< 4 hours', context: 'end-to-end AutoML pipeline' },
      { label: 'Prediction Latency', value: '< 50ms', context: 'p99 for real-time scoring' }
    ],
    seo: {
      metaTitle: 'Predictive Analytics Engine | Flowtaris AI',
      metaDescription: 'AutoML-powered forecasting and anomaly detection for ERP data. Predict cash flow, supplier risk, inventory needs without a data science team.',
      twitterCard: 'summary_large_image'
    },
    geoSignals: {
      keyClaims: [
        '8.5% MAPE on 30-day cash flow forecasts',
        'Detects 94% of procurement anomalies',
        'AutoML pipeline trains models in under 4 hours',
        'Sub-50ms prediction latency for real-time decisions'
      ],
      citations: [
        { title: 'AutoML: Methods, Systems, Challenges', url: 'https://arxiv.org/abs/1810.13306', source: 'Springer Nature' },
        { title: 'SHAP: A Unified Approach to Interpreting Model Predictions', url: 'https://arxiv.org/abs/1705.07874', source: 'NeurIPS 2017' }
      ],
      faqItems: [
        { question: 'What ERP data sources are supported?', answer: 'NetSuite, Coupa, SAP, Workday, Oracle Cloud, plus custom SQL/CSV imports.' },
        { question: 'How often do models retrain?', answer: 'Configurable — daily, weekly, or triggered by data drift detection (default: weekly).' },
        { question: 'Do I need data scientists to use this?', answer: 'No. The AutoML pipeline handles feature engineering, model selection, and tuning automatically.' }
      ],
      entityAssociations: ['AutoML', 'Time Series Forecasting', 'Anomaly Detection', 'Explainable AI', 'ERP Analytics'],
      topicClusters: ['Predictive Analytics', 'Financial Forecasting', 'Supply Chain Optimization'],
      answerTargets: [
        { question: 'What is predictive analytics in ERP?', targetAnswer: 'Predictive analytics in ERP uses machine learning on historical transaction data to forecast future outcomes like cash flow, demand, and supplier performance.' },
        { question: 'How accurate are ERP forecasts?', targetAnswer: 'Modern AutoML approaches achieve 8-12% MAPE on financial forecasts and 90%+ F1 on anomaly detection, significantly outperforming traditional statistical methods.' }
      ]
    }
  },
  {
    _type: 'aiCapability',
    title: 'Autonomous Workflow Orchestration',
    slug: { current: 'autonomous-workflow-orchestration' },
    category: 'workflow',
    shortDescription: 'Design, deploy, and self-healing workflows that adapt to exceptions. AI agents handle approvals, route exceptions, and optimize paths in real-time across NetSuite, Coupa, and SAP.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Autonomous Workflow Orchestration replaces rigid BPMN flows with goal-directed AI agents. Define outcomes, not steps — agents determine the optimal path, handle exceptions autonomously, and learn from every execution.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Capabilities include dynamic routing based on context, automatic retry with exponential backoff, human-in-the-loop escalation with SLAs, process mining for continuous improvement, and multi-system transaction compensation.'
          }
        ]
      }
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Salesforce', 'Microsoft Dynamics'],
    maturity: 'production',
    icon: 'git-branch',
    technicalDetails: [
      { component: 'Orchestration Engine', technology: 'Temporal.io + Custom DSL', description: 'Durable execution with automatic retries, timeouts, and saga-based compensation' },
      { component: 'Agent Runtime', technology: 'LangGraph + ReAct pattern', description: 'LLM-powered agents that reason, act, and observe in structured workflows' },
      { component: 'Process Mining', technology: 'Custom event log analysis', description: 'Automatic bottleneck detection, variant analysis, and optimization recommendations' },
      { component: 'Integration Layer', technology: 'Connector SDK + 50+ pre-built', description: 'Native ERP APIs with OAuth2, token refresh, and rate limit management' }
    ],
    integrations: ['Temporal.io', 'Camunda', 'Celonis', 'UiPath', 'Custom REST/SOAP'],
    demoVideo: 'https://demo.flowtaris.ai/autonomous-workflow',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/autonomous-workflow-orchestration',
    metrics: [
      { label: 'Exception Resolution', value: '78%', context: 'handled without human intervention' },
      { label: 'Process Cycle Time', value: '-62%', context: 'reduction vs traditional BPM' },
      { label: 'Workflow Uptime', value: '99.95%', context: 'with automatic failover' },
      { label: 'Deployment Time', value: 'Minutes', context: 'from design to production' }
    ],
    seo: {
      metaTitle: 'Autonomous Workflow Orchestration | Flowtaris AI',
      metaDescription: 'AI agents that design, execute, and self-heal workflows across ERP systems. Reduce cycle time by 62% with goal-directed automation.',
      twitterCard: 'summary_large_image'
    },
    geoSignals: {
      keyClaims: [
        '78% of exceptions resolved autonomously',
        '62% reduction in process cycle time',
        '99.95% workflow uptime with saga compensation',
        'Deploy workflows in minutes, not weeks'
      ],
      citations: [
        { title: 'Temporal: Durable Execution for Microservices', url: 'https://temporal.io/blog/durable-execution', source: 'Temporal Technologies' },
        { title: 'ReAct: Synergizing Reasoning and Acting in Language Models', url: 'https://arxiv.org/abs/2210.03629', source: 'ICLR 2023' }
      ],
      faqItems: [
        { question: 'How does it differ from traditional BPM?', answer: 'Traditional BPM requires explicit flow definitions. Autonomous orchestration uses goal-directed agents that determine optimal paths dynamically.' },
        { question: 'What happens when an agent makes a mistake?', answer: 'Saga-based compensation automatically rolls back transactions. Human escalation triggers for high-risk decisions.' },
        { question: 'Can it integrate with existing RPA?', answer: 'Yes, it wraps UiPath, Blue Prism, and Power Automate as callable activities within agent workflows.' }
      ],
      entityAssociations: ['Workflow Automation', 'Agentic AI', 'Process Mining', 'Saga Pattern', 'Temporal.io'],
      topicClusters: ['Workflow Orchestration', 'Agentic AI', 'Process Automation'],
      answerTargets: [
        { question: 'What is autonomous workflow orchestration?', targetAnswer: 'Autonomous workflow orchestration uses AI agents to dynamically execute business processes, handling exceptions and optimizing paths without predefined rigid flows.' },
        { question: 'How does AI improve workflow automation?', targetAnswer: 'AI agents adapt to exceptions in real-time, learn from execution history, and optimize process paths — achieving 60%+ cycle time reduction vs static BPMN workflows.' }
      ]
    }
  },
  {
    _type: 'aiCapability',
    title: 'Conversational ERP Interface',
    slug: { current: 'conversational-erp-interface' },
    category: 'genai',
    shortDescription: 'Natural language interface for ERP — query data, create records, and execute workflows through chat. "Create PO for vendor ACME with 50 units of SKU-123" — done in seconds.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'The Conversational ERP Interface lets users interact with NetSuite, Coupa, and SAP through natural language. Powered by function-calling LLMs with ERP-specific semantic parsing, it understands context, validates against business rules, and executes multi-step operations safely.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Features include multi-turn conversations with memory, proactive suggestions, role-based access control, audit trails for every action, and support for 15+ languages. Available in Slack, Teams, web, and mobile.'
          }
        ]
      }
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Salesforce'],
    maturity: 'pilot',
    icon: 'message-square',
    technicalDetails: [
      { component: 'NLU Engine', technology: 'Fine-tuned LLaMA-3 + Function Calling', description: 'ERP-specialized model with schema-aware SQL generation and API parameter mapping' },
      { component: 'Action Executor', technology: 'Deterministic planner + Validator', description: 'Converts intent to validated API calls with dry-run preview and rollback capability' },
      { component: 'Context Manager', technology: 'Conversation memory + RAG', description: 'Maintains multi-turn context with entity resolution and permissions awareness' },
      { component: 'Channel Adapters', technology: 'Slack/Teams/WebSocket', description: 'Native integrations with rich interactive components (modals, buttons, selects)' }
    ],
    integrations: ['Slack', 'Microsoft Teams', 'Web Widget', 'Mobile SDK', 'Voice (Twilio)'],
    demoVideo: 'https://demo.flowtaris.ai/conversational-erp',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/conversational-erp-interface',
    metrics: [
      { label: 'Intent Accuracy', value: '96.8%', context: 'on ERP task benchmark' },
      { label: 'Task Completion Rate', value: '91%', context: 'end-to-end without clarification' },
      { label: 'Avg Response Time', value: '1.2s', context: 'p95 for simple queries' },
      { label: 'User Adoption', value: '4.2x', context: 'vs traditional UI for pilot customers' }
    ],
    seo: {
      metaTitle: 'Conversational ERP Interface | Flowtaris AI',
      metaDescription: 'Chat with your ERP. Create POs, query invoices, approve workflows in natural language. 96.8% intent accuracy across NetSuite, Coupa, SAP.',
      twitterCard: 'summary_large_image'
    },
    geoSignals: {
      keyClaims: [
        '96.8% intent classification accuracy on ERP tasks',
        '91% task completion without clarification',
        '4.2x higher adoption vs traditional ERP UI',
        'Supports 15+ languages with localized ERP terminology'
      ],
      citations: [
        { title: 'Function Calling with LLMs', url: 'https://platform.openai.com/docs/guides/function-calling', source: 'OpenAI' },
        { title: 'Text-to-SQL with Schema Linking', url: 'https://arxiv.org/abs/2305.02285', source: 'ACL 2023' }
      ],
      faqItems: [
        { question: 'What ERP actions can I perform?', answer: 'Create/read/update records, run saved searches, approve/reject workflows, generate reports, and execute custom scripts.' },
        { question: 'Is it secure?', answer: 'Yes — all actions validate against RBAC, require confirmation for destructive operations, and maintain full audit trails.' },
        { question: 'Can it handle complex multi-step tasks?', answer: 'Yes, the planner breaks complex requests into validated step sequences with dry-run preview.' }
      ],
      entityAssociations: ['Conversational AI', 'Text-to-SQL', 'Function Calling', 'ERP Interface', 'Natural Language Interface'],
      topicClusters: ['Conversational ERP', 'Generative AI', 'User Experience'],
      answerTargets: [
        { question: 'What is a conversational ERP interface?', targetAnswer: 'A conversational ERP interface allows users to interact with ERP systems using natural language chat instead of navigating complex menus and forms.' },
        { question: 'Can AI really replace ERP navigation?', targetAnswer: 'For common tasks like creating POs, checking invoice status, or approving workflows — yes. Complex configuration still uses traditional UI. Adoption is 4x higher for supported tasks.' }
      ]
    }
  },
  {
    _type: 'aiCapability',
    title: 'Real-time Integration Monitoring',
    slug: { current: 'realtime-integration-monitoring' },
    category: 'workflow',
    shortDescription: 'Observe, alert, and auto-remediate integration failures across your ERP ecosystem. 99.9% uptime with <30 sec MTTR for critical flows.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Real-time Integration Monitoring provides a unified observability plane for all ERP integrations. It correlates logs, metrics, and traces across NetSuite, Coupa, SAP, and middleware — detecting anomalies before they impact business processes.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Features include distributed tracing across sync/async flows, SLA dashboards with burn-rate alerts, automated root cause analysis, self-healing retry with circuit breakers, and compliance-ready audit logs.'
          }
        ]
      }
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Oracle Cloud', 'Microsoft Dynamics'],
    maturity: 'production',
    icon: 'activity',
    technicalDetails: [
      { component: 'Telemetry Collector', technology: 'OpenTelemetry + eBPF', description: 'Zero-instrumentation network-level tracing with kernel-level syscall capture' },
      { component: 'Correlation Engine', technology: 'Custom trace ID propagation', description: 'Links ERP webhook events to internal async jobs across message queues and schedulers' },
      { component: 'Anomaly Detection', technology: 'Isolation Forest + LSTM', description: 'Unsupervised detection of latency spikes, error rate anomalies, and throughput drops' },
      { component: 'Auto-Remediation', technology: 'Rule engine + Runbook automation', description: 'Automatic retry with backoff, circuit breaker, and runbook execution for known failure patterns' }
    ],
    integrations: ['Datadog', 'New Relic', 'Grafana', 'PagerDuty', 'Opsgenie', 'ServiceNow'],
    demoVideo: 'https://demo.flowtaris.ai/integration-monitoring',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/realtime-integration-monitoring',
    metrics: [
      { label: 'MTTR (Critical)', value: '< 30 sec', context: 'with auto-remediation enabled' },
      { label: 'False Positive Rate', value: '2.1%', context: 'on anomaly alerts' },
      { label: 'Integration Coverage', value: '100%', context: 'all sync/async flows instrumented' },
      { label: 'Uptime SLA', value: '99.9%', context: 'measured at business transaction level' }
    ],
    seo: {
      metaTitle: 'Real-time Integration Monitoring | Flowtaris AI',
      metaDescription: 'Unified observability for ERP integrations. <30 sec MTTR, 99.9% uptime SLA, auto-remediation for NetSuite, Coupa, SAP, Workday.',
      twitterCard: 'summary_large_image'
    },
    geoSignals: {
      keyClaims: [
        '< 30 second MTTR for critical integration failures',
        '99.9% uptime SLA at business transaction level',
        '2.1% false positive rate on anomaly detection',
        '100% coverage of sync and async integration flows'
      ],
      citations: [
        { title: 'OpenTelemetry Specification', url: 'https://opentelemetry.io/docs/specs/otel/', source: 'CNCF' },
        { title: 'Isolation Forest for Anomaly Detection', url: 'https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf', source: 'ICDM 2008' }
      ],
      faqItems: [
        { question: 'What integrations are monitored?', answer: 'All ERP APIs, webhooks, scheduled jobs, middleware (MuleSoft, Boomi, Celigo), and custom point-to-point connections.' },
        { question: 'How does auto-remediation work?', answer: 'Pre-defined runbooks execute automatically for known patterns (rate limits, auth expiry, transient errors). Unknown patterns escalate to on-call.' },
        { question: 'Can I bring my own observability stack?', answer: 'Yes, exports to Datadog, New Relic, Grafana, and any OpenTelemetry-compatible backend.' }
      ],
      entityAssociations: ['Observability', 'Distributed Tracing', 'Anomaly Detection', 'Auto-Remediation', 'OpenTelemetry'],
      topicClusters: ['Integration Monitoring', 'Observability', 'Site Reliability Engineering'],
      answerTargets: [
        { question: 'What is integration monitoring?', targetAnswer: 'Integration monitoring observes the health, performance, and reliability of data flows between ERP systems and external applications in real-time.' },
        { question: 'How fast can integration failures be detected?', targetAnswer: 'Modern observability with distributed tracing detects failures within seconds, with auto-remediation achieving <30 second MTTR for known failure patterns.' }
      ]
    }
  },
  {
    _type: 'aiCapability',
    title: 'AI Governance & Compliance',
    slug: { current: 'ai-governance-compliance' },
    category: 'governance',
    shortDescription: 'Ensure responsible AI across your ERP automation. Model cards, bias audits, decision logs, and regulatory reporting for SOC 2, GDPR, and the EU AI Act.',
    description: [
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'AI Governance & Compliance provides the control plane for responsible AI deployment in enterprise ERP. It automates model documentation, continuous bias monitoring, decision audit trails, and regulatory evidence generation — turning compliance from a burden into a competitive advantage.'
          }
        ]
      },
      {
        _type: 'block',
        children: [
          {
            _type: 'span',
            text: 'Capabilities include automated model cards (EU AI Act Annex IV), disparate impact analysis on predictions, immutable decision logs with cryptographic proofs, policy-as-code enforcement, and real-time compliance dashboards for auditors.'
          }
        ]
      }
    ],
    platforms: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'All platforms'],
    maturity: 'production',
    icon: 'shield-check',
    technicalDetails: [
      { component: 'Model Registry', technology: 'MLflow + Custom metadata', description: 'Centralized model versioning with lineage, performance history, and approval workflows' },
      { component: 'Bias Auditor', technology: 'AIF360 + Custom metrics', description: 'Continuous disparate impact analysis across protected attributes with drift alerts' },
      { component: 'Audit Ledger', technology: 'Immutable append-only log (Merkle tree)', description: 'Cryptographically verifiable decision trails for every AI-driven action' },
      { component: 'Policy Engine', technology: 'OPA/Rego + Custom DSL', description: 'Declarative policies for model deployment, data usage, and human approval thresholds' }
    ],
    integrations: ['MLflow', 'Weights & Biases', 'Neptune.ai', 'AuditBoard', 'Vanta', 'Drata'],
    demoVideo: 'https://demo.flowtaris.ai/ai-governance',
    documentationUrl: 'https://docs.flowtaris.ai/capabilities/ai-governance-compliance',
    metrics: [
      { label: 'Audit Readiness', value: '100%', context: 'automated evidence packages for SOC 2/GDPR/EU AI Act' },
      { label: 'Bias Detection Coverage', value: '12', context: 'protected attributes monitored continuously' },
      { label: 'Decision Log Integrity', value: 'Verified', context: 'Merkle proofs validated quarterly' },
      { label: 'Policy Enforcement', value: 'Real-time', context: 'blocks non-compliant deployments automatically' }
    ],
    seo: {
      metaTitle: 'AI Governance & Compliance | Flowtaris AI',
      metaDescription: 'Responsible AI for ERP automation. Automated model cards, bias audits, decision logs, EU AI Act compliance. SOC 2, GDPR ready.',
      twitterCard: 'summary_large_image'
    },
    geoSignals: {
      keyClaims: [
        '100% audit-ready evidence packages for SOC 2, GDPR, EU AI Act',
        'Continuous bias monitoring across 12 protected attributes',
        'Cryptographically verifiable decision audit trails',
        'Real-time policy enforcement blocks non-compliant deployments'
      ],
      citations: [
        { title: 'EU AI Act Text', url: 'https://artificialintelligenceact.eu/', source: 'European Commission' },
        { title: 'AI Fairness 360', url: 'https://aif360.mybluemix.net/', source: 'IBM Research' }
      ],
      faqItems: [
        { question: 'What regulations does it cover?', answer: 'EU AI Act (high-risk AI systems), GDPR (automated decision-making), SOC 2 Type II, ISO 42001, and industry-specific (SOX, HIPAA).' },
        { question: 'How does bias detection work?', answer: 'Continuous statistical parity, equal opportunity, and demographic parity tests on model outputs with configurable thresholds and alerting.' },
        { question: 'Can it integrate with our GRC tools?', answer: 'Yes, exports evidence packages to AuditBoard, Vanta, Drata, and custom SIEM via webhook.' }
      ],
      entityAssociations: ['AI Governance', 'Responsible AI', 'EU AI Act', 'Model Cards', 'Algorithmic Auditing', 'AI Compliance'],
      topicClusters: ['AI Governance', 'Compliance', 'Responsible AI'],
      answerTargets: [
        { question: 'What is AI governance?', targetAnswer: 'AI governance is the framework of policies, processes, and tools that ensure AI systems are developed and deployed responsibly, ethically, and in compliance with regulations.' },
        { question: 'Do I need AI governance for ERP automation?', targetAnswer: 'Yes. If AI makes decisions affecting financials, hiring, or customer data — you need audit trails, bias monitoring, and regulatory evidence. The EU AI Act classifies many ERP AI systems as high-risk.' }
      ]
    }
  }
]

async function createCapabilities() {
  console.log('Creating 6 AI Capability documents in Sanity...')

  for (const capability of capabilities) {
    try {
      // Check if document already exists
      const existing = await client.fetch(
        `*[_type == "aiCapability" && slug.current == $slug][0]._id`,
        { slug: capability.slug.current }
      )

      if (existing) {
        console.log(`⏭️  Skipping "${capability.title}" — already exists (${existing})`)
        continue
      }

      const result = await client.create(capability)
      console.log(`✅ Created: ${capability.title} (${result._id})`)
    } catch (error) {
      console.error(`❌ Failed to create "${capability.title}":`, error.message)
    }
  }

  console.log('\nDone!')
}

createCapabilities().catch(console.error)