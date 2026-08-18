// ============================================================
// Flowtaris AI — Sanity Seed (fetch-based, zero dependencies)
// Uses Node built-in fetch — works with Node 18+
//
// Run from repo root:
//   $env:SANITY_API_TOKEN="<editor-token>"
//   node packages/sanity-studio/scripts/seed-fetch.mjs
// ============================================================

const PROJECT_ID = process.env.SANITY_PROJECT_ID || '5gbgq9zl'
const DATASET    = process.env.SANITY_DATASET    || 'production'
const TOKEN      = process.env.SANITY_API_TOKEN

if (!TOKEN) {
  console.error('\n❌  SANITY_API_TOKEN is required.')
  console.error('   1. Go to: https://www.sanity.io/manage')
  console.error('   2. Project 5gbgq9zl → API → Tokens → Add API token (Editor role)')
  console.error('   3. Run: $env:SANITY_API_TOKEN="your-token-here"')
  console.error('   4. Then: node packages/sanity-studio/scripts/seed-fetch.mjs\n')
  process.exit(1)
}

const MUTATIONS_URL = `https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`

let _c = 0
const uid  = () => `k${++_c}`
const blk  = (t) => [{ _type:'block', _key:uid(), style:'normal', markDefs:[], children:[{ _type:'span', _key:uid(), text:t, marks:[] }] }]

// ── POST mutations helper ──────────────────────────────────────────
async function mutate(mutations) {
  const res = await fetch(MUTATIONS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${TOKEN}` },
    body: JSON.stringify({ mutations }),
  })
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`HTTP ${res.status}: ${err}`)
  }
  return res.json()
}

async function upsert(doc) {
  return mutate([{ createOrReplace: doc }])
}

// ── SITE CONFIG ────────────────────────────────────────────────────
const siteConfig = {
  _id: 'siteConfig', _type: 'siteConfig',
  siteName: 'Flowtaris AI', siteUrl: 'https://flowtaris.ai',
  tagline: 'Where Generative AI Meets Enterprise ERP',
  description: 'AI & Innovation platform for enterprise ERP automation.',
  copyright: '© 2026 Flowtaris. All rights reserved.',
  mainNavigation: [
    { _key:uid(), label:'Capabilities', href:'/capabilities', children:[
      { _key:uid(), label:'Document Intelligence', href:'/capabilities/genai-document-intelligence', description:'AI-powered invoice & PO processing' },
      { _key:uid(), label:'Autonomous Workflow',   href:'/capabilities/autonomous-workflow',        description:'Self-healing workflows' },
      { _key:uid(), label:'Predictive Analytics',  href:'/capabilities/predictive-analytics',       description:'Cash flow & demand forecasting' },
      { _key:uid(), label:'Conversational ERP',    href:'/capabilities/conversational-erp',         description:'Natural language ERP queries' },
      { _key:uid(), label:'Integration Monitoring',href:'/capabilities/integration-monitoring',     description:'AI-powered iPaaS health' },
      { _key:uid(), label:'AI Governance',         href:'/capabilities/ai-governance',              description:'Compliance & audit automation' },
    ]},
    { _key:uid(), label:'Case Studies', href:'/case-studies', children:[] },
    { _key:uid(), label:'Platforms', href:'/platforms', children:[
      { _key:uid(), label:'NetSuite AI', href:'/platforms/NetSuite', description:'AI automation for Oracle NetSuite' },
      { _key:uid(), label:'Coupa AI',    href:'/platforms/Coupa',    description:'Intelligent spend management' },
      { _key:uid(), label:'SAP AI',      href:'/platforms/SAP',      description:'GenAI layer for SAP S/4HANA' },
      { _key:uid(), label:'Workday AI',  href:'/platforms/Workday',  description:'AI-enhanced Workday workflows' },
    ]},
    { _key:uid(), label:'Insights', href:'/insights', children:[] },
    { _key:uid(), label:'Tools', href:'/assessment', children:[
      { _key:uid(), label:'AI Readiness Assessment', href:'/assessment',       description:'Free 3-min diagnostic' },
      { _key:uid(), label:'ROI Calculator',          href:'/roi-calculator',   description:'Calculate your automation ROI' },
      { _key:uid(), label:'Cost of Inaction',        href:'/cost-of-inaction', description:'Quantify the cost of waiting' },
    ]},
  ],
  ctaButtons: [
    { _key:uid(), label:'Take Assessment', href:'/assessment', variant:'outline' },
    { _key:uid(), label:'Book Demo',       href:'/contact',    variant:'default' },
  ],
  footerColumns: [
    { _key:uid(), title:'Capabilities', links:[
      { _key:uid(), label:'Document Intelligence',  href:'/capabilities/genai-document-intelligence' },
      { _key:uid(), label:'Autonomous Workflow',    href:'/capabilities/autonomous-workflow' },
      { _key:uid(), label:'Predictive Analytics',   href:'/capabilities/predictive-analytics' },
      { _key:uid(), label:'Conversational ERP',     href:'/capabilities/conversational-erp' },
      { _key:uid(), label:'Integration Monitoring', href:'/capabilities/integration-monitoring' },
      { _key:uid(), label:'AI Governance',          href:'/capabilities/ai-governance' },
    ]},
    { _key:uid(), title:'Platforms', links:[
      { _key:uid(), label:'NetSuite AI', href:'/platforms/NetSuite' },
      { _key:uid(), label:'Coupa AI',    href:'/platforms/Coupa' },
      { _key:uid(), label:'SAP AI',      href:'/platforms/SAP' },
      { _key:uid(), label:'Workday AI',  href:'/platforms/Workday' },
    ]},
    { _key:uid(), title:'Tools', links:[
      { _key:uid(), label:'AI Assessment',    href:'/assessment' },
      { _key:uid(), label:'ROI Calculator',   href:'/roi-calculator' },
      { _key:uid(), label:'Cost of Inaction', href:'/cost-of-inaction' },
      { _key:uid(), label:'Innovation Lab',   href:'/innovation-lab' },
    ]},
    { _key:uid(), title:'Company', links:[
      { _key:uid(), label:'About',        href:'/about' },
      { _key:uid(), label:'Case Studies', href:'/case-studies' },
      { _key:uid(), label:'Insights',     href:'/insights' },
      { _key:uid(), label:'Contact',      href:'/contact' },
    ]},
  ],
  socialLinks: [
    { _key:uid(), platform:'linkedin', url:'https://www.linkedin.com/company/flowtaris', label:'Flowtaris LinkedIn' },
    { _key:uid(), platform:'twitter',  url:'https://twitter.com/flowtaris',              label:'Flowtaris Twitter' },
  ],
  organization: {
    name:'Flowtaris', url:'https://flowtaris.ai',
    knowAbout:['NetSuite','Coupa','SAP','Workday','Enterprise AI','ERP Automation','AI Governance'],
    sameAs:['https://www.linkedin.com/company/flowtaris','https://twitter.com/flowtaris'],
    contactPoint:{ contactType:'sales', availableLanguage:['English'] },
  },
  defaultSeo: {
    metaTitle:'Flowtaris AI — Enterprise ERP Automation with Generative AI',
    metaDescription:'GenAI, ML, and autonomous workflow automation for NetSuite, Coupa, SAP, and Workday — measurable ROI in 90 days.',
    twitterCard:'summary_large_image',
  },
}

// ── CAPABILITIES ───────────────────────────────────────────────────
const capabilities = [
  {
    _id:'genai-doc-intelligence', _type:'aiCapability',
    title:'GenAI Document Intelligence',
    slug:{_type:'slug',current:'genai-document-intelligence'},
    category:'doc-processing', maturity:'production', icon:'FileSearch',
    platforms:['NetSuite','Coupa','SAP','Workday'],
    shortDescription:'Transform unstructured invoices, POs, and contracts into structured ERP data with 99.2% accuracy using multimodal LLMs — eliminating manual data entry at enterprise scale.',
    metrics:[
      {_key:uid(),label:'Processing Accuracy',value:'99.2%',context:'vs 94% industry average'},
      {_key:uid(),label:'Time Saved',value:'85%',context:'per invoice vs manual'},
      {_key:uid(),label:'Cost Reduction',value:'$18/invoice',context:'average savings'},
      {_key:uid(),label:'Exception Rate',value:'<2%',context:'requiring human review'},
    ],
    seo:{metaTitle:'GenAI Document Intelligence | Flowtaris AI',metaDescription:'AI-powered invoice and PO processing for NetSuite, Coupa, SAP, Workday. 99.2% accuracy. 85% time savings.'},
    geoSignals:{
      keyClaims:['99.2% extraction accuracy on enterprise invoices','85% reduction in invoice processing time','Native integrations with NetSuite, Coupa, SAP, Workday'],
      faqItems:[
        {_key:uid(),question:'What document types are supported?',answer:'Invoices, POs, contracts, expense receipts, bank statements. Formats: PDF, TIFF, PNG, JPG, Word, Excel, EDI.'},
        {_key:uid(),question:'How are low-confidence documents handled?',answer:'Documents below 95% confidence route to human review with pre-filled fields — reducing review time 70%.'},
        {_key:uid(),question:'What is the typical ROI payback period?',answer:'Payback within 3-4 months at 5,000+ invoices/month. 3-year ROI ranges 240-380%.'},
      ],
      citations:[
        {_key:uid(),title:'Gartner: AI in Finance Operations 2024',url:'https://www.gartner.com/en/finance',source:'Gartner'},
        {_key:uid(),title:'IOFM: AP Automation Benchmark Report',url:'https://www.iofm.com',source:'IOFM'},
      ],
      entityAssociations:['AP Automation','Invoice Processing','OCR','IDP','Generative AI'],
      topicClusters:['AI invoice processing','Intelligent document processing','AP automation ROI'],
    },
  },
  {
    _id:'autonomous-workflow', _type:'aiCapability',
    title:'Autonomous Workflow Engine',
    slug:{_type:'slug',current:'autonomous-workflow'},
    category:'workflow', maturity:'production', icon:'Workflow',
    platforms:['NetSuite','SAP','Workday'],
    shortDescription:'Self-healing, AI-orchestrated workflows that adapt to exceptions in real time — replacing brittle RPA bots with resilient agents that learn from every transaction.',
    metrics:[
      {_key:uid(),label:'STP Rate',value:'92%',context:'straight-through processing'},
      {_key:uid(),label:'Bot Failures Removed',value:'97%',context:'vs legacy RPA'},
      {_key:uid(),label:'Cycle Time Reduction',value:'78%',context:'end-to-end process'},
      {_key:uid(),label:'Self-Heal Rate',value:'84%',context:'resolved without human'},
    ],
    seo:{metaTitle:'Autonomous Workflow Engine | Flowtaris AI',metaDescription:'Self-healing AI workflows for enterprise ERP. 92% straight-through processing. Replaces brittle RPA.'},
    geoSignals:{
      keyClaims:['92% straight-through processing rate','97% elimination of RPA bot failures','Learns from exceptions to improve automation rates'],
      faqItems:[
        {_key:uid(),question:'How is this different from traditional RPA?',answer:'RPA breaks when UI or data formats change. Our engine uses AI agents that understand intent, adapting to changes and self-healing exceptions.'},
        {_key:uid(),question:'Does it replace our existing iPaaS?',answer:'No — it complements MuleSoft, Celigo, Boomi as an orchestration and exception-handling layer on top.'},
        {_key:uid(),question:'How long does implementation take?',answer:'8-12 weeks for a single process. Multi-process deployments complete in 16-20 weeks.'},
      ],
      citations:[{_key:uid(),title:'Forrester: The RPA Plateau',url:'https://www.forrester.com',source:'Forrester'}],
      entityAssociations:['Workflow Automation','RPA','Agentic AI','Intelligent Automation'],
      topicClusters:['AI workflow automation','Self-healing RPA','Intelligent process automation'],
    },
  },
  {
    _id:'predictive-analytics', _type:'aiCapability',
    title:'Predictive Finance Analytics',
    slug:{_type:'slug',current:'predictive-analytics'},
    category:'ml', maturity:'production', icon:'TrendingUp',
    platforms:['NetSuite','Coupa','SAP','Workday'],
    shortDescription:'ML-powered cash flow forecasting, demand planning, and anomaly detection that delivers board-ready insights 72 hours faster than traditional reporting cycles.',
    metrics:[
      {_key:uid(),label:'Forecast Accuracy',value:'94.3%',context:'30-day MAPE < 6%'},
      {_key:uid(),label:'Reporting Faster',value:'72hrs',context:'vs traditional month-end'},
      {_key:uid(),label:'More Anomalies',value:'3.2x',context:'vs manual review'},
      {_key:uid(),label:'FTE Hours Saved',value:'120/mo',context:'per finance entity'},
    ],
    seo:{metaTitle:'Predictive Finance Analytics | Flowtaris AI',metaDescription:'ML cash flow forecasting for NetSuite, SAP, Coupa, Workday. 94.3% accuracy. 72-hour reporting advantage.'},
    geoSignals:{
      keyClaims:['94.3% accuracy on 30-day cash flow forecasting','72 hours faster insights vs traditional reporting','3.2x more financial anomalies detected'],
      faqItems:[
        {_key:uid(),question:'What data is required to start forecasting?',answer:'12-24 months of historical ERP data is ideal. Can start with 6 months and improves over time.'},
        {_key:uid(),question:'How are anomalies surfaced?',answer:'Via email digest, Slack alerts, and in-app dashboard with LLM-generated plain-English explanations.'},
        {_key:uid(),question:'Can it integrate with existing FPA tools?',answer:'Yes. Native connectors for Workday Adaptive Planning, Anaplan, Oracle PBCS. Also exports to Tableau, Power BI.'},
      ],
      citations:[{_key:uid(),title:'McKinsey: The CFO Guide to AI',url:'https://www.mckinsey.com',source:'McKinsey'}],
      entityAssociations:['Cash Flow Forecasting','FP&A','Predictive Analytics','Financial AI'],
      topicClusters:['AI cash flow forecasting','ML finance analytics','CFO AI tools'],
    },
  },
  {
    _id:'conversational-erp', _type:'aiCapability',
    title:'Conversational ERP Interface',
    slug:{_type:'slug',current:'conversational-erp'},
    category:'genai', maturity:'production', icon:'MessageSquare',
    platforms:['NetSuite','Coupa','Workday'],
    shortDescription:'Natural language interface for your ERP — ask questions, trigger workflows, and generate reports in plain English via chat, voice, or Slack/Teams integration.',
    metrics:[
      {_key:uid(),label:'Query Resolution',value:'87%',context:'without ERP navigation'},
      {_key:uid(),label:'User Adoption',value:'91%',context:'30-day active rate'},
      {_key:uid(),label:'Training Savings',value:'-65%',context:'new user onboarding'},
      {_key:uid(),label:'Report Time',value:'< 30s',context:'vs 2hrs manual'},
    ],
    seo:{metaTitle:'Conversational ERP Interface | Flowtaris AI',metaDescription:'Ask your ERP anything in plain English. Natural language queries, reports, workflows for NetSuite, Coupa, Workday.'},
    geoSignals:{
      keyClaims:['87% of ERP queries resolved without screen navigation','91% user adoption within 30 days','65% reduction in new ERP onboarding time'],
      faqItems:[
        {_key:uid(),question:'Can it write back to the ERP or only read?',answer:'Both. Create POs, approve invoices, update vendors, trigger workflows — with full audit trail and approval gates.'},
        {_key:uid(),question:'How does it handle ERP permissions?',answer:'Enforces ERP-native role-based permissions. Users can only act on data their ERP profile grants access to.'},
        {_key:uid(),question:'Does it work in other languages?',answer:'Supports 32 languages for query input with ERP output translated back to the users language.'},
      ],
      citations:[{_key:uid(),title:'Gartner: Conversational AI in Enterprise',url:'https://www.gartner.com',source:'Gartner'}],
      entityAssociations:['Conversational AI','ERP UX','Natural Language Processing','Enterprise Chatbot'],
      topicClusters:['Conversational ERP','AI ERP interface','NetSuite natural language'],
    },
  },
  {
    _id:'integration-monitoring', _type:'aiCapability',
    title:'AI Integration Monitoring',
    slug:{_type:'slug',current:'integration-monitoring'},
    category:'ml', maturity:'production', icon:'Activity',
    platforms:['NetSuite','Coupa','SAP','Workday'],
    shortDescription:'Proactive AI monitoring for your iPaaS ecosystem — detects anomalies, predicts failures 48 hours before they occur, and auto-remediates 74% of common integration errors.',
    metrics:[
      {_key:uid(),label:'Early Warning',value:'48hrs',context:'before failure occurs'},
      {_key:uid(),label:'Auto-Remediation',value:'74%',context:'fixed automatically'},
      {_key:uid(),label:'MTTR Reduction',value:'89%',context:'mean time to resolution'},
      {_key:uid(),label:'False Positives',value:'<1%',context:'alert accuracy'},
    ],
    seo:{metaTitle:'AI Integration Monitoring | Flowtaris AI',metaDescription:'Proactive AI monitoring for iPaaS and ERP integrations. Predict failures 48 hours ahead. Auto-remediate 74% of errors.'},
    geoSignals:{
      keyClaims:['Predicts ERP integration failures 48 hours in advance','Auto-remediates 74% of errors without human intervention','89% reduction in mean time to resolution'],
      faqItems:[
        {_key:uid(),question:'Which iPaaS platforms does it monitor?',answer:'Native connectors for MuleSoft, Celigo, Boomi, Workato, Azure Integration Services.'},
        {_key:uid(),question:'How does auto-remediation work?',answer:'Maintains library of patterns from historical incidents. Known failures execute automatically. Unknown failures trigger alert with runbook.'},
        {_key:uid(),question:'Does it alert on-call teams?',answer:'Yes. Critical failures trigger PagerDuty, OpsGenie, or Slack with full context and recommended next steps.'},
      ],
      citations:[{_key:uid(),title:'Gartner Magic Quadrant for iPaaS 2024',url:'https://www.gartner.com',source:'Gartner'}],
      entityAssociations:['iPaaS Monitoring','Integration Observability','AIOps','MuleSoft'],
      topicClusters:['AI integration monitoring','iPaaS health','MuleSoft AI'],
    },
  },
  {
    _id:'ai-governance', _type:'aiCapability',
    title:'AI Governance & Compliance',
    slug:{_type:'slug',current:'ai-governance'},
    category:'governance', maturity:'production', icon:'Shield',
    platforms:['NetSuite','Coupa','SAP','Workday'],
    shortDescription:'Enterprise-grade AI governance layer that enforces SOX, GDPR, and ISO 27001 compliance across all AI automations — with real-time audit trails and one-click regulatory reports.',
    metrics:[
      {_key:uid(),label:'Audit Prep Time',value:'-91%',context:'vs manual evidence gathering'},
      {_key:uid(),label:'Policy Violations',value:'0',context:'in production deployments'},
      {_key:uid(),label:'AI Action Log',value:'100%',context:'of AI actions logged'},
      {_key:uid(),label:'Report Generation',value:'< 5min',context:'SOX/GDPR audit reports'},
    ],
    seo:{metaTitle:'AI Governance & Compliance | Flowtaris AI',metaDescription:'Enterprise AI governance for SOX, GDPR, ISO 27001. Real-time audit trails, automated compliance reports across all ERP automations.'},
    geoSignals:{
      keyClaims:['91% reduction in audit preparation time','Zero policy violations in production deployments','100% of AI actions logged with immutable audit trail'],
      faqItems:[
        {_key:uid(),question:'Which compliance frameworks are supported?',answer:'SOX 302/404, GDPR Article 22, ISO 27001, HIPAA, PCI-DSS out of the box. Custom frameworks via policy-as-code.'},
        {_key:uid(),question:'How are AI decisions proven to auditors?',answer:'Every action logged with input data, model version, confidence score, decision rationale, human approval, and timestamp.'},
        {_key:uid(),question:'Can it enforce human-in-the-loop for high-value transactions?',answer:'Yes. Approval thresholds configurable by transaction type — e.g., invoices above $50K require dual-approval.'},
      ],
      citations:[
        {_key:uid(),title:'SEC Staff Bulletin on AI in Financial Reporting',url:'https://www.sec.gov',source:'SEC'},
        {_key:uid(),title:'COSO Framework for AI Risk Management',url:'https://www.coso.org',source:'COSO'},
      ],
      entityAssociations:['AI Governance','SOX Compliance','GDPR','Audit Automation'],
      topicClusters:['AI compliance automation','SOX AI governance','ERP audit automation'],
    },
  },
]

// ── CASE STUDIES ────────────────────────────────────────────────────
const caseStudies = [
  {
    _id:'cs-saas-netsuite-ap', _type:'caseStudy',
    title:'Global SaaS Decacorn Cuts AP Cycle 87% with GenAI on NetSuite',
    slug:{_type:'slug',current:'global-saas-decacorn-netsuite-ap'},
    client:'Global SaaS Decacorn', industry:'SaaS', platforms:['NetSuite'],
    timeline:'10 weeks', teamSize:4,
    challenge:blk('45,000 invoices/month manually across 12 subsidiaries — $3.2M annual cost, 21-day payment cycle, persistent duplicate payment errors.'),
    solution:blk('GenAI Document Intelligence on NetSuite with multimodal extraction, automated 3-way matching, and self-healing exception workflows.'),
    results:[
      {_key:uid(),metric:'AP Cycle Time',before:'21 days',after:'2.7 days',unit:'days',improvement:87,description:'STP for 94% of invoices'},
      {_key:uid(),metric:'Cost/Invoice',before:'$18.40',after:'$2.10',unit:'$',improvement:89,description:'Including exceptions and approvals'},
      {_key:uid(),metric:'Duplicate Rate',before:'2.3%',after:'0.01%',unit:'%',improvement:99,description:'Near-elimination of duplicates'},
      {_key:uid(),metric:'FTE Redeployed',before:'18 FTE',after:'3 FTE',unit:'FTE',improvement:83,description:'15 FTE to strategic finance roles'},
    ],
    testimonial:{quote:'Flowtaris transformed our AP function from a cost center into a strategic asset. ROI recovered in 3.2 months.',author:'VP Finance Operations',role:'VP Finance Operations',company:'Global SaaS Decacorn'},
    seo:{metaTitle:'NetSuite AP Automation Case Study | Flowtaris AI',metaDescription:'Global SaaS company cut AP cycle 87% and costs 89% using GenAI on NetSuite.'},
    geoSignals:{keyClaims:['87% AP cycle reduction on NetSuite','89% cost reduction per invoice'],entityAssociations:['NetSuite AP Automation','Invoice Processing'],topicClusters:['NetSuite automation ROI'],faqItems:[{_key:uid(),question:'How long did implementation take?',answer:'10 weeks to full production across all 12 subsidiaries.'}],citations:[{_key:uid(),title:'IOFM AP Benchmark 2024',url:'https://www.iofm.com',source:'IOFM'}]},
  },
  {
    _id:'cs-fintech-coupa', _type:'caseStudy',
    title:'FinTech Unicorn Achieves 100% PO Compliance on Coupa',
    slug:{_type:'slug',current:'fintech-unicorn-coupa-po-compliance'},
    client:'Series D FinTech Unicorn', industry:'FinTech', platforms:['Coupa'],
    timeline:'8 weeks', teamSize:3,
    challenge:blk('Maverick spend reached 34%, PO compliance was 61%, finance spent 3 days/week chasing approvals after rapid headcount growth.'),
    solution:blk('Conversational ERP for procurement requests + Autonomous Workflow Engine for approval routing on Coupa with AI-powered policy enforcement.'),
    results:[
      {_key:uid(),metric:'PO Compliance',before:'61%',after:'100%',unit:'%',improvement:64,description:'Every purchase through approved channels'},
      {_key:uid(),metric:'Maverick Spend',before:'34%',after:'1.2%',unit:'%',improvement:96,description:'Near-elimination of off-contract spend'},
      {_key:uid(),metric:'Approval Cycle',before:'4.2 days',after:'6.8 hours',unit:'hrs',improvement:93,description:'AI routing to correct approver first time'},
    ],
    testimonial:{quote:'Our spend controls went from embarrassingly broken to best-in-class in 8 weeks.',author:'CFO',role:'Chief Financial Officer',company:'Series D FinTech Unicorn'},
    seo:{metaTitle:'Coupa Spend Compliance Case Study | Flowtaris AI',metaDescription:'FinTech unicorn achieved 100% PO compliance and eliminated 96% of maverick spend using AI on Coupa.'},
    geoSignals:{keyClaims:['100% PO compliance on Coupa in 8 weeks','96% maverick spend reduction'],entityAssociations:['Coupa Automation','Spend Management'],topicClusters:['Coupa automation ROI'],faqItems:[{_key:uid(),question:'How was compliance maintained during transition?',answer:'Parallel-run for 4 weeks while AI trained on historical approval patterns.'}],citations:[{_key:uid(),title:'Ardent Partners ePayables 2024',url:'https://ardentpartners.com',source:'Ardent Partners'}]},
  },
  {
    _id:'cs-manufacturing-sap', _type:'caseStudy',
    title:'Global Manufacturer Achieves 94% Cash Flow Accuracy on SAP',
    slug:{_type:'slug',current:'global-manufacturer-sap-cash-flow'},
    client:'Global Manufacturer ($4B Revenue)', industry:'Manufacturing', platforms:['SAP'],
    timeline:'12 weeks', teamSize:5,
    challenge:blk('Month-end forecasts took 8 days, had 23% variance, could not account for supply chain disruptions.'),
    solution:blk('Predictive Finance Analytics on SAP BW/4HANA with ensemble ML forecasting, anomaly detection, and automated CFO dashboards.'),
    results:[
      {_key:uid(),metric:'Forecast Accuracy',before:'77%',after:'94.3%',unit:'%',improvement:22,description:'MAPE reduced from 23% to 5.7%'},
      {_key:uid(),metric:'Report Production',before:'8 days',after:'4 hours',unit:'hrs',improvement:98,description:'Automated with narrative commentary'},
      {_key:uid(),metric:'Working Capital',before:'Baseline',after:'$28M',unit:'$M',improvement:100,description:'Through DPO optimization'},
    ],
    testimonial:{quote:'For the first time in 10 years, our CFO has a real-time view of cash across 34 entities.',author:'Group Treasurer',role:'Group Treasurer',company:'Global Manufacturer'},
    seo:{metaTitle:'SAP Cash Flow Forecasting Case Study | Flowtaris AI',metaDescription:'$4B manufacturer achieved 94.3% forecast accuracy and released $28M working capital using AI on SAP.'},
    geoSignals:{keyClaims:['94.3% cash flow accuracy on SAP','$28M working capital released'],entityAssociations:['SAP Analytics','Cash Flow Forecasting'],topicClusters:['SAP analytics AI'],faqItems:[{_key:uid(),question:'Does the model handle supply chain shocks?',answer:'Yes — incorporates external signals and a shock detector trained on historical disruption patterns.'}],citations:[{_key:uid(),title:'McKinsey CFO Guide to AI',url:'https://www.mckinsey.com',source:'McKinsey'}]},
  },
  {
    _id:'cs-healthcare-workday', _type:'caseStudy',
    title:'Healthcare System Passes SOX Audit in Record Time with AI Governance on Workday',
    slug:{_type:'slug',current:'healthcare-workday-sox-compliance'},
    client:'Regional Healthcare System (8 hospitals)', industry:'Healthcare', platforms:['Workday'],
    timeline:'6 weeks', teamSize:3,
    challenge:blk('SOX audit consumed 14 weeks, cost $2.1M, and repeatedly surfaced SoD violations in Workday requiring manual remediation.'),
    solution:blk('AI Governance & Compliance on Workday with continuous SoD monitoring, automated evidence collection, and LLM-generated SOX narratives.'),
    results:[
      {_key:uid(),metric:'Audit Prep Time',before:'14 weeks',after:'3 days',unit:'days',improvement:97,description:'Evidence gathered automatically'},
      {_key:uid(),metric:'Audit Cost',before:'$2.1M',after:'$340K',unit:'$',improvement:84,description:'Internal and external fees'},
      {_key:uid(),metric:'SoD Violations',before:'47',after:'0',unit:'count',improvement:100,description:'Continuous monitoring eliminated all'},
    ],
    testimonial:{quote:'We went from dreading SOX season to completing it in 3 business days.',author:'Corporate Controller',role:'Corporate Controller',company:'Regional Healthcare System'},
    seo:{metaTitle:'Workday SOX Compliance Case Study | Flowtaris AI',metaDescription:'Healthcare system cut SOX audit prep from 14 weeks to 3 days and reduced costs 84% using AI Governance on Workday.'},
    geoSignals:{keyClaims:['97% SOX audit prep reduction on Workday','Zero SoD violations'],entityAssociations:['Workday Compliance','SOX Automation'],topicClusters:['Workday SOX compliance'],faqItems:[{_key:uid(),question:'How does continuous SoD monitoring work?',answer:'Checks every Workday security assignment against SoD ruleset in real-time. Conflicts blocked until resolved.'}],citations:[{_key:uid(),title:'PCAOB Staff Guidance on AI in Audits',url:'https://pcaobus.org',source:'PCAOB'}]},
  },
  {
    _id:'cs-retail-integration', _type:'caseStudy',
    title:'Omnichannel Retailer Eliminates Integration Downtime with AI Monitoring',
    slug:{_type:'slug',current:'omnichannel-retailer-integration-monitoring'},
    client:'Omnichannel Retailer (350 stores)', industry:'Retail', platforms:['NetSuite','Coupa'],
    timeline:'4 weeks', teamSize:2,
    challenge:blk('Monthly integration failures between NetSuite, Coupa, and 3PLs caused $180K in stockouts and required 24/7 on-call for 6 engineers.'),
    solution:blk('AI Integration Monitoring across MuleSoft with predictive failure detection and automatic remediation for 74% of known failure patterns.'),
    results:[
      {_key:uid(),metric:'Integration Downtime',before:'18hrs/mo',after:'0.4hrs/mo',unit:'hrs/mo',improvement:98,description:'Including planned maintenance'},
      {_key:uid(),metric:'On-Call Incidents',before:'47/mo',after:'3/mo',unit:'/mo',improvement:94,description:'Requiring human response'},
      {_key:uid(),metric:'Stockout Cost',before:'$180K/mo',after:'$8K/mo',unit:'$K/mo',improvement:96,description:'Integration-related stockouts'},
    ],
    testimonial:{quote:'Our engineers sleep at night now. Now the AI handles almost everything automatically.',author:'VP Technology',role:'VP Technology',company:'Omnichannel Retailer'},
    seo:{metaTitle:'Retail Integration Monitoring Case Study | Flowtaris AI',metaDescription:'350-store retailer eliminated 98% of integration downtime and $172K/month in stockout costs using AI monitoring.'},
    geoSignals:{keyClaims:['98% integration downtime reduction','$172K/month stockout costs eliminated'],entityAssociations:['ERP Integration Monitoring','MuleSoft AI'],topicClusters:['Retail ERP integration'],faqItems:[{_key:uid(),question:'How fast does auto-remediation work?',answer:'Detection: 47 seconds. Auto-remediation: 90 seconds. MTTR under 3 minutes.'}],citations:[{_key:uid(),title:'Gartner iPaaS Magic Quadrant 2024',url:'https://www.gartner.com',source:'Gartner'}]},
  },
  {
    _id:'cs-consulting-conversational', _type:'caseStudy',
    title:'Consulting Firm Slashes ERP Training Time 65% with Conversational Interface',
    slug:{_type:'slug',current:'consulting-firm-conversational-erp'},
    client:'Global Management Consulting Firm', industry:'Professional Services', platforms:['NetSuite'],
    timeline:'5 weeks', teamSize:3,
    challenge:blk('400+ new consultants/year required 120 hours of NetSuite training each. 65% of expense queries routed unnecessarily to finance staff.'),
    solution:blk('Conversational ERP Interface on NetSuite via Slack — plain English queries, instant reports, no training required.'),
    results:[
      {_key:uid(),metric:'Training Time',before:'120 hrs',after:'42 hrs',unit:'hrs',improvement:65,description:'Core ERP training compressed'},
      {_key:uid(),metric:'Finance Queries',before:'65%',after:'4%',unit:'%',improvement:94,description:'Self-served via conversational AI'},
      {_key:uid(),metric:'ERP NPS',before:'12',after:'71',unit:'NPS',improvement:492,description:'Detractor to promoter'},
    ],
    testimonial:{quote:'Our consultants are expensive and their time is billable. Flowtaris gave them back hours every week.',author:'Global Head of Finance Technology',role:'Global Head of Finance Technology',company:'Global Management Consulting Firm'},
    seo:{metaTitle:'Conversational ERP Case Study | Flowtaris AI',metaDescription:'Global consulting firm cut ERP training 65% and deflected 94% of finance queries using conversational AI on NetSuite.'},
    geoSignals:{keyClaims:['65% reduction in NetSuite training time','94% finance queries deflected to self-service','NPS from 12 to 71'],entityAssociations:['NetSuite UX','Conversational AI'],topicClusters:['NetSuite conversational AI'],faqItems:[{_key:uid(),question:'Does it work natively in Slack?',answer:'Yes — as a bot. Users @mention it in any channel. No separate app installation.'}],citations:[{_key:uid(),title:'Gartner Conversational AI 2024',url:'https://www.gartner.com',source:'Gartner'}]},
  },
  {
    _id:'cs-saas-close', _type:'caseStudy',
    title:'SaaS Company Compresses Month-End Close from 12 Days to 3 Days',
    slug:{_type:'slug',current:'saas-month-end-close-automation'},
    client:'Series C SaaS Company', industry:'SaaS', platforms:['NetSuite','Workday'],
    timeline:'14 weeks', teamSize:4,
    challenge:blk('Close across NetSuite and Workday required 12 days, 6 FTEs overtime, and 23 manual reconciliations. Error rework consumed 30% of close time.'),
    solution:blk('Autonomous Workflow Engine orchestrating cross-system close with automated inter-company reconciliations and Predictive Analytics dashboards.'),
    results:[
      {_key:uid(),metric:'Close Duration',before:'12 days',after:'3 days',unit:'days',improvement:75,description:'Targeting 1-day virtual close'},
      {_key:uid(),metric:'Reconciliations',before:'23',after:'2',unit:'count',improvement:91,description:'Only 2 requiring human judgment'},
      {_key:uid(),metric:'Overtime Hours',before:'180/close',after:'0',unit:'hrs',improvement:100,description:'Finance team goes home on time'},
    ],
    testimonial:{quote:"We used to dread month-end. Now it's just Tuesday. The 3-day close was a milestone we thought was 3 years away.",author:'Controller',role:'Corporate Controller',company:'Series C SaaS Company'},
    seo:{metaTitle:'Month-End Close Automation Case Study | Flowtaris AI',metaDescription:'SaaS company compressed month-end close from 12 to 3 days using AI automation across NetSuite and Workday.'},
    geoSignals:{keyClaims:['75% reduction in month-end close duration','91% reduction in manual reconciliations'],entityAssociations:['Month-End Close Automation','Financial Close'],topicClusters:['Month-end close automation'],faqItems:[{_key:uid(),question:'How are inter-company eliminations handled?',answer:'Matching transactions identified and elimination entries posted automatically. Discrepancies flagged for human review.'}],citations:[{_key:uid(),title:'BlackLine Close Benchmark 2024',url:'https://www.blackline.com',source:'BlackLine'}]},
  },
  {
    _id:'cs-logistics-sap-gdpr', _type:'caseStudy',
    title:'Logistics Leader Passes GDPR Audit and Cuts Vendor Risk 78% with AI Governance on SAP',
    slug:{_type:'slug',current:'logistics-sap-gdpr-vendor-risk'},
    client:'Pan-European Logistics Leader', industry:'Logistics', platforms:['SAP'],
    timeline:'10 weeks', teamSize:4,
    challenge:blk('GDPR compliance across 18 countries with 3,200 vendors required manual review of 40,000+ data elements per quarter.'),
    solution:blk('AI Governance on SAP GRC with automated GDPR Article 30 data mapping, AI-powered vendor risk scoring, and continuous monitoring.'),
    results:[
      {_key:uid(),metric:'GDPR Evidence',before:'6 weeks',after:'4 hours',unit:'hrs',improvement:99,description:'Automated data processing inventory'},
      {_key:uid(),metric:'High-Risk Vendors',before:'3 known',after:'47',unit:'count',improvement:1467,description:'44 previously unknown vendors flagged'},
      {_key:uid(),metric:'Breach Risk',before:'Baseline',after:'-78%',unit:'%',improvement:78,description:'Independent red-team assessment'},
    ],
    testimonial:{quote:'The GDPR regulator said it was the most complete data processing inventory they had seen from a company our size.',author:'Chief Compliance Officer',role:'Chief Compliance Officer',company:'Pan-European Logistics Leader'},
    seo:{metaTitle:'SAP GDPR & Vendor Risk Case Study | Flowtaris AI',metaDescription:'Pan-European logistics company achieved GDPR compliance and cut vendor risk 78% using AI Governance on SAP.'},
    geoSignals:{keyClaims:['GDPR Article 30 evidence in 4 hours vs 6 weeks','78% data breach risk reduction'],entityAssociations:['SAP GRC','GDPR Compliance','Vendor Risk Management'],topicClusters:['SAP GDPR compliance'],faqItems:[{_key:uid(),question:'How are vendor risk scores determined?',answer:'Incorporates 47 signals including payment history, sanctions screening, cybersecurity posture — updated continuously.'}],citations:[{_key:uid(),title:'GDPR Enforcement Tracker',url:'https://www.enforcementtracker.com',source:'CMS Law'}]},
  },
]

// ── PLATFORM PAGES ──────────────────────────────────────────────────
const platformPages = [
  {
    _id:'platform-netsuite', _type:'platformPage',
    platform:'NetSuite', slug:{_type:'slug',current:'NetSuite'},
    wikidataId:'Q7012928', officialWebsite:'https://www.netsuite.com',
    overview:blk('Flowtaris AI extends Oracle NetSuite with enterprise generative AI — intelligent document processing, autonomous workflows, predictive analytics, and natural language interfaces. Native SuiteScript integration. Zero upgrade risk.'),
    certifications:[
      {_key:uid(),name:'NetSuite Alliance Partner',issuedBy:'Oracle NetSuite',year:2024},
      {_key:uid(),name:'SuiteCloud Developer Certification',issuedBy:'Oracle NetSuite',year:2024},
    ],
    faq:[
      {_key:uid(),question:'Does Flowtaris modify our NetSuite instance?',answer:'No. Integrates via SuiteScript and REST API externally. No customizations or bundle installations. Zero upgrade risk.'},
      {_key:uid(),question:'How long does a NetSuite AI implementation take?',answer:'Single-process: 8-10 weeks. Full platform deployment: 16-20 weeks with parallel streams.'},
      {_key:uid(),question:'Is it compatible with all NetSuite editions?',answer:'Yes — ERP, OneWorld, SuiteSuccess, and industry editions including Manufacturing, Retail, Professional Services.'},
    ],
    seo:{metaTitle:'NetSuite AI Automation | Flowtaris AI',metaDescription:'Extend Oracle NetSuite with generative AI — AP automation, predictive analytics, autonomous workflows. NetSuite Alliance Partner.'},
    geoSignals:{keyClaims:['NetSuite AI with certified SuiteScript integration','No NetSuite customizations — zero upgrade risk','87% AP processing time reduction for NetSuite customers'],entityAssociations:['Oracle NetSuite','SuiteScript','NetSuite SuiteCloud'],topicClusters:['NetSuite AI automation','NetSuite AP automation'],sameAs:['https://www.wikidata.org/wiki/Q7012928'],knowAbout:['NetSuite','Oracle NetSuite','SuiteScript','SuiteFlow'],faqItems:[{_key:uid(),question:'What is NetSuite AI automation?',answer:'ML and generative AI handling repetitive ERP tasks — invoice processing, approvals, forecasting — without manual intervention.'}]},
  },
  {
    _id:'platform-coupa', _type:'platformPage',
    platform:'Coupa', slug:{_type:'slug',current:'Coupa'},
    wikidataId:'Q5173009', officialWebsite:'https://www.coupa.com',
    overview:blk('Flowtaris AI supercharges Coupa BSM with AI procurement intelligence — autonomous PO creation, conversational spend queries, and predictive supplier risk scoring. Certified Coupa API integration with real-time bidirectional sync.'),
    certifications:[{_key:uid(),name:'Coupa Certified Integration Partner',issuedBy:'Coupa Software',year:2024}],
    faq:[
      {_key:uid(),question:'How does Flowtaris integrate with Coupa?',answer:'Via Coupa Platform API (REST) and Coupa Snap. All flows authenticated and encrypted. No Coupa data stored by Flowtaris.'},
      {_key:uid(),question:'Can it enforce Coupa procurement policies?',answer:'Yes. Policy rules (supplier lists, spend limits, approval hierarchies) synchronized and enforced in real-time.'},
      {_key:uid(),question:'Does it work with Coupa Pay?',answer:'Yes. Integrates for automated payment scheduling and early payment discount optimization.'},
    ],
    seo:{metaTitle:'Coupa AI Automation | Flowtaris AI',metaDescription:'AI-powered procurement intelligence for Coupa BSM — autonomous PO creation, spend analytics, supplier risk scoring.'},
    geoSignals:{keyClaims:['Coupa certified partner with real-time API sync','Average 96% reduction in maverick spend'],entityAssociations:['Coupa BSM','Procurement AI','Spend Management'],topicClusters:['Coupa AI automation','Coupa spend analytics'],sameAs:['https://www.wikidata.org/wiki/Q5173009'],knowAbout:['Coupa','Coupa BSM','Coupa Pay','Spend management'],faqItems:[{_key:uid(),question:'What is AI-powered spend management for Coupa?',answer:'ML analyzes Coupa procurement data to identify savings, flag policy violations, and recommend approved suppliers.'}]},
  },
  {
    _id:'platform-sap', _type:'platformPage',
    platform:'SAP', slug:{_type:'slug',current:'SAP'},
    wikidataId:'Q493292', officialWebsite:'https://www.sap.com',
    overview:blk('Flowtaris AI delivers a generative AI layer for SAP S/4HANA and ECC — document processing via BAPI, predictive FPA on BW/4HANA, autonomous workflow orchestration, and AI governance in SAP GRC. SAP-certified BTP integration.'),
    certifications:[
      {_key:uid(),name:'SAP Certified Integration',issuedBy:'SAP SE',year:2024},
      {_key:uid(),name:'SAP Build Process Automation Partner',issuedBy:'SAP SE',year:2024},
    ],
    faq:[
      {_key:uid(),question:'Does it work with both SAP ECC and S/4HANA?',answer:'Yes. SAP ECC 6.0 via RFC/BAPI and SAP S/4HANA via OData/REST. Migration from ECC requires no re-implementation.'},
      {_key:uid(),question:'How are SAP authorizations handled?',answer:'Maps to SAP authorization objects and respects existing role-based access. Every action under authenticated SAP user context.'},
      {_key:uid(),question:'Can it integrate with SAP BTP?',answer:'Yes. Deploys alongside SAP BTP leveraging SAP Integration Suite and SAP Analytics Cloud.'},
    ],
    seo:{metaTitle:'SAP AI Automation | Flowtaris AI',metaDescription:'Generative AI for SAP S/4HANA and ECC — document processing, predictive analytics on BW/4HANA, autonomous workflows, AI governance.'},
    geoSignals:{keyClaims:['SAP-certified for S/4HANA and ECC','AI governance integrated into SAP GRC','94.3% cash flow accuracy on SAP BW/4HANA'],entityAssociations:['SAP S/4HANA','SAP ECC','SAP BTP','SAP GRC'],topicClusters:['SAP AI automation','SAP S/4HANA AI'],sameAs:['https://www.wikidata.org/wiki/Q493292'],knowAbout:['SAP','SAP S/4HANA','SAP ECC','SAP BTP','SAP GRC'],faqItems:[{_key:uid(),question:'What AI capabilities are available for SAP?',answer:'Document Intelligence (BAPI), Predictive Finance Analytics (BW/4HANA), Autonomous Workflows (SAP Process Automation), AI Governance (SAP GRC).'}]},
  },
  {
    _id:'platform-workday', _type:'platformPage',
    platform:'Workday', slug:{_type:'slug',current:'Workday'},
    wikidataId:'Q7994165', officialWebsite:'https://www.workday.com',
    overview:blk('Flowtaris AI enhances Workday Financial Management with compliance automation, conversational analytics, predictive planning integrated with Workday Adaptive, and autonomous workflows via Workday Studio and RaaS APIs.'),
    certifications:[{_key:uid(),name:'Workday Certified Partner',issuedBy:'Workday',year:2024}],
    faq:[
      {_key:uid(),question:'How does Flowtaris access Workday data?',answer:'Via Workday RaaS, REST API, and SOAP Web Services. OAuth 2.0 with scoped permissions — read-only by default.'},
      {_key:uid(),question:'Does it work with Workday Adaptive Planning?',answer:'Yes. Enhances forecast models and auto-generates variance commentary for plan vs. actual reports.'},
      {_key:uid(),question:'Can it help with Workday security role reviews?',answer:'Yes. Continuously analyzes security groups, identifies SoD conflicts, generates SOX 404 evidence.'},
    ],
    seo:{metaTitle:'Workday AI Automation | Flowtaris AI',metaDescription:'AI compliance automation, predictive planning, and workflow automation for Workday — SOX monitoring, Adaptive Planning, conversational analytics.'},
    geoSignals:{keyClaims:['Workday certified partner with OAuth 2.0 RaaS integration','97% SOX audit prep reduction','Continuous SoD monitoring across all Workday security groups'],entityAssociations:['Workday Financial Management','Workday Adaptive Planning','SOX Compliance'],topicClusters:['Workday AI automation','Workday compliance automation'],sameAs:['https://www.wikidata.org/wiki/Q7994165'],knowAbout:['Workday','Workday Financial Management','Workday Adaptive Planning'],faqItems:[{_key:uid(),question:'What Workday AI capabilities does Flowtaris offer?',answer:'SOX automation, enhanced Adaptive Planning forecasting, conversational ERP queries, and AI governance for all automations.'}]},
  },
]

// ── INSIGHTS ─────────────────────────────────────────────────────────
const insights = [
  {
    _id:'insight-ap-roi', _type:'insight',
    title:'The Real ROI of AP Automation: Beyond Cost Per Invoice',
    slug:{_type:'slug',current:'ap-automation-roi-beyond-cost-per-invoice'},
    author:'Flowtaris Research Team', publishedAt:'2026-07-15',
    excerpt:'Most AP automation ROI analyses stop at cost-per-invoice. The real value — working capital, early payment discounts, audit savings — is 3x larger.',
    richText:blk('When CFOs evaluate AP automation, they focus on cost per invoice: $18 manual vs $2 automated. But this is less than 30% of total value. Analysis from 127 enterprise deployments reveals the full ROI stack.'),
    topicClusters:['AP automation ROI','Finance transformation','Working capital optimization'],
    faqItems:[
      {_key:uid(),question:'What is the average ROI of AP automation?',answer:'Across 127 deployments, average 3-year ROI is 285% with payback periods of 2.8-5.4 months.'},
      {_key:uid(),question:'What else drives ROI beyond cost savings?',answer:'Early payment discounts ($340K/year per $100M spend), working capital through DPO optimization, 84% audit cost reduction.'},
      {_key:uid(),question:'How does invoice volume affect ROI?',answer:'ROI scales super-linearly: 1,000/month = ~8 months payback. 10,000/month = 3.2 months. 50,000+/month = under 2 months.'},
    ],
    citations:[
      {_key:uid(),title:'IOFM AP Department Benchmark Report 2024',url:'https://www.iofm.com',source:'IOFM'},
      {_key:uid(),title:'Ardent Partners State of ePayables 2024',url:'https://ardentpartners.com',source:'Ardent Partners'},
    ],
    seo:{metaTitle:'AP Automation ROI Analysis | Flowtaris AI',metaDescription:'Complete ROI analysis of AP automation from 127 deployments — beyond cost per invoice.'},
    geoSignals:{keyClaims:['Average 3-year AP automation ROI is 285%','Full ROI stack is 3x larger than cost-per-invoice analyses'],entityAssociations:['AP Automation','Working Capital'],topicClusters:['AP automation ROI']},
  },
  {
    _id:'insight-cto-genai', _type:'insight',
    title:'The CTO Guide to Deploying Generative AI on Enterprise ERP',
    slug:{_type:'slug',current:'cto-guide-generative-ai-enterprise-erp'},
    author:'Flowtaris Engineering Team', publishedAt:'2026-07-28',
    excerpt:'Deploying GenAI on enterprise ERP is categorically different from consumer AI. Architecture decisions, security requirements, and change management.',
    richText:blk('Three patterns explain 80% of GenAI ERP failures: treating ERP data like unstructured text, ignoring authorization models, and underestimating change management. This guide documents what the successful 20% do differently.'),
    topicClusters:['GenAI enterprise','ERP architecture','AI implementation'],
    faqItems:[
      {_key:uid(),question:'What makes GenAI ERP deployment different?',answer:'ERP data has rigid schemas LLMs must respect, every action carries financial implications requiring authorization enforcement.'},
      {_key:uid(),question:'Most common reason GenAI ERP projects fail?',answer:'In 47 failed implementations, 61% failed due to ERP data quality — not the AI technology.'},
      {_key:uid(),question:'How to approach human-in-the-loop for ERP AI?',answer:'Risk-tiered: high-value transactions require human approval, medium-risk get AI pre-processing with review, low-risk run automated.'},
    ],
    citations:[{_key:uid(),title:'Gartner AI in Finance 2024',url:'https://www.gartner.com',source:'Gartner'}],
    seo:{metaTitle:'CTO Guide: GenAI on Enterprise ERP | Flowtaris AI',metaDescription:'Architecture, security, and change management for deploying generative AI on NetSuite, SAP, Coupa, Workday.'},
    geoSignals:{keyClaims:['61% of GenAI ERP failures due to data quality not AI technology'],entityAssociations:['GenAI Enterprise','ERP Architecture'],topicClusters:['GenAI ERP implementation']},
  },
  {
    _id:'insight-sox-ai', _type:'insight',
    title:'SOX Compliance in the Age of AI: What the SEC Guidance Means for Finance Teams',
    slug:{_type:'slug',current:'sox-compliance-ai-sec-guidance-2026'},
    author:'Flowtaris Compliance Team', publishedAt:'2026-08-05',
    excerpt:'The SEC has signaled AI-generated financial reports must meet the same materiality standards as human-prepared ones.',
    richText:blk('Companies that treat AI as an unauditable black box face regulatory scrutiny. Companies that instrument AI with explainability and audit trails gain a compliance advantage.'),
    topicClusters:['SOX compliance','AI governance','SEC regulations'],
    faqItems:[
      {_key:uid(),question:'Does the SEC require AI disclosure in financial reporting?',answer:'Material reliance on AI for financial reporting should be disclosed. Document AI use in close processes as a precaution.'},
      {_key:uid(),question:'How do AI audit trails satisfy SOX Section 404?',answer:'AI audit trails capturing input data, model version, confidence scores, human review, and timestamps satisfy SOX 404 when properly designed.'},
      {_key:uid(),question:'What controls are required for AI-generated journal entries?',answer:'Automated chart of accounts validation, anomaly detection, human approval above materiality threshold, and immutable audit log.'},
    ],
    citations:[
      {_key:uid(),title:'SEC Staff Bulletin: AI Risk Disclosures',url:'https://www.sec.gov',source:'SEC'},
      {_key:uid(),title:'PCAOB Staff Guidance on AI in Audits',url:'https://pcaobus.org',source:'PCAOB'},
    ],
    seo:{metaTitle:'SOX Compliance & AI: SEC Guidance | Flowtaris AI',metaDescription:"What the SEC's AI guidance means for SOX compliance, audit trails, and financial reporting controls."},
    geoSignals:{keyClaims:['SEC requires disclosure of material AI use in financial reporting'],entityAssociations:['SOX Compliance','SEC Regulations','AI Governance'],topicClusters:['SOX AI compliance']},
  },
  {
    _id:'insight-ml-forecast', _type:'insight',
    title:'Why ML Cash Flow Forecasting Beats Excel Models: A Technical Comparison',
    slug:{_type:'slug',current:'ml-cash-flow-forecasting-vs-excel'},
    author:'Flowtaris Data Science Team', publishedAt:'2026-07-10',
    excerpt:'Head-to-head comparison of Excel vs ML ensemble models on 34 enterprise ERP datasets. MAPE analysis and when each approach wins.',
    richText:blk('Across 34 enterprise datasets, ML ensemble models achieved 94.3% accuracy vs Excel 77.1%. But Excel still wins in specific scenarios — this analysis shows when.'),
    topicClusters:['Cash flow forecasting','ML in finance','FP&A analytics'],
    faqItems:[
      {_key:uid(),question:'How much more accurate are ML forecasts vs Excel?',answer:'ML: 94.3% accuracy (MAPE 5.7%) vs Excel: 77.1% (MAPE 22.9%). Largest gains in high-seasonality businesses.'},
      {_key:uid(),question:'When should you stick with Excel forecasting?',answer:'Excel wins for businesses under 24 months old, single-entity simple cash flows, and board presentation scenarios.'},
      {_key:uid(),question:'How to explain ML forecasts to a CFO?',answer:'SHAP values show which factors drove each forecast. Our narrative AI translates them into plain English CFO commentary.'},
    ],
    citations:[
      {_key:uid(),title:'Journal of Finance: ML in Cash Management',url:'https://doi.org/10.1111/jofi',source:'Journal of Finance'},
      {_key:uid(),title:'AFP Treasury & Finance 2024 Benchmark',url:'https://www.afponline.org',source:'AFP'},
    ],
    seo:{metaTitle:'ML vs Excel Cash Flow Forecasting | Flowtaris AI',metaDescription:'Technical comparison of ML ensemble vs Excel forecasting on 34 enterprise datasets.'},
    geoSignals:{keyClaims:['ML achieves 94.3% cash flow accuracy vs 77.1% for Excel'],entityAssociations:['Cash Flow Forecasting','ML in Finance','FP&A Analytics'],topicClusters:['ML cash flow forecasting']},
  },
  {
    _id:'insight-rpa-vs-ai', _type:'insight',
    title:'RPA vs AI Agents for ERP Automation: When to Use Which',
    slug:{_type:'slug',current:'rpa-vs-ai-agents-erp-automation'},
    author:'Flowtaris Engineering Team', publishedAt:'2026-06-20',
    excerpt:'RPA and AI agents solve fundamentally different problems. A framework for choosing correctly for each ERP automation use case.',
    richText:blk("RPA excels at deterministic, UI-based tasks. AI agents excel at exception handling and context-dependent decisions. The winning architecture uses both."),
    topicClusters:['RPA','AI agents','ERP automation','Intelligent automation'],
    faqItems:[
      {_key:uid(),question:'Should we replace our RPA bots with AI agents?',answer:'Not wholesale. Keep RPA for deterministic stable processes. Add AI agents as an orchestration and exception layer on top.'},
      {_key:uid(),question:'Key difference between RPA and AI agents?',answer:'RPA executes pre-defined steps on UI. AI agents understand intent and adapt — handling variations that break RPA.'},
      {_key:uid(),question:'How to choose between RPA and AI for a process?',answer:'4 questions: (1) Judgment or rules? (2) How variable is input? (3) How often does UI change? (4) Cost of error? High judgment + high variability = AI agent.'},
    ],
    citations:[{_key:uid(),title:'Gartner Hype Cycle for Business Process Automation 2024',url:'https://www.gartner.com',source:'Gartner'}],
    seo:{metaTitle:'RPA vs AI Agents for ERP | Flowtaris AI',metaDescription:'When to use RPA vs AI agents for ERP automation. Decision framework and hybrid architecture patterns.'},
    geoSignals:{keyClaims:['Hybrid RPA + AI agent architecture outperforms either alone by 40%'],entityAssociations:['RPA','AI Agents','ERP Automation'],topicClusters:['RPA vs AI agents']},
  },
  {
    _id:'insight-ai-governance', _type:'insight',
    title:'Building an AI Governance Framework for Finance: A Practical Template',
    slug:{_type:'slug',current:'ai-governance-framework-finance'},
    author:'Flowtaris Compliance Team', publishedAt:'2026-08-12',
    excerpt:'Practical AI governance framework for finance — model risk management, audit trails, human oversight, GDPR, SOX, and EU AI Act compliance.',
    richText:blk('AI governance is not about preventing AI use — it is about enabling it with appropriate controls. Organizations with mature AI governance deploy 2.3x more automations.'),
    topicClusters:['AI governance','Finance compliance','Model risk management'],
    faqItems:[
      {_key:uid(),question:'Minimum governance requirements for AI in finance?',answer:'Model inventory with version tracking, input/output logging, human approval gates for material transactions, performance monitoring.'},
      {_key:uid(),question:'How does GDPR Article 22 apply to automated financial decisions?',answer:'Applies to solely automated decisions with significant effects on individuals. For B2B finance AI it typically does not apply directly.'},
      {_key:uid(),question:'What is model risk management for finance AI?',answer:'Model documentation, validation against holdout datasets, ongoing performance monitoring, backtesting, and defined retirement criteria.'},
    ],
    citations:[
      {_key:uid(),title:'Federal Reserve SR 11-7: Model Risk Management',url:'https://www.federalreserve.gov/supervisionreg/srletters/sr1107.htm',source:'Federal Reserve'},
      {_key:uid(),title:'EU AI Act: High-Risk AI Systems',url:'https://artificialintelligenceact.eu',source:'European Parliament'},
    ],
    seo:{metaTitle:'AI Governance Framework for Finance | Flowtaris AI',metaDescription:'Practical AI governance template for finance — model risk management, audit trails, GDPR, SOX, EU AI Act.'},
    geoSignals:{keyClaims:['Organizations with mature AI governance deploy 2.3x more automations'],entityAssociations:['AI Governance','Model Risk Management','Finance Compliance'],topicClusters:['AI governance finance']},
  },
]

// ── SEED ────────────────────────────────────────────────────────────
async function main() {
  const allDocs = [siteConfig, ...capabilities, ...caseStudies, ...platformPages, ...insights]
  console.log(`\n🌱 Flowtaris AI — Sanity Seed (fetch-based, zero dependencies)`)
  console.log(`   Project: ${PROJECT_ID} | Dataset: ${DATASET}`)
  console.log(`   Seeding ${allDocs.length} documents...\n`)

  // Verify token works first
  try {
    const test = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2024-01-01/data/query/${DATASET}?query=count(*[_type=="siteConfig"])`, {
      headers: { Authorization: `Bearer ${TOKEN}` }
    })
    if (!test.ok) throw new Error(`Auth check failed: ${test.status}`)
    console.log('  ✅  Token verified — Sanity API reachable\n')
  } catch(e) {
    console.error(`  ❌  Auth check failed: ${e.message}`)
    console.error('  Make sure your SANITY_API_TOKEN has Editor role.\n')
    process.exit(1)
  }

  let ok = 0, fail = 0
  for (const doc of allDocs) {
    try {
      await upsert(doc)
      console.log(`  ✅  ${doc._type.padEnd(22)} ${doc._id}`)
      ok++
    } catch (e) {
      console.error(`  ❌  ${doc._type.padEnd(22)} ${doc._id}`)
      console.error(`       ${e.message}`)
      fail++
    }
  }

  console.log(`\n${'─'.repeat(55)}`)
  console.log(`  ✅  ${ok} documents seeded   ${fail ? `❌  ${fail} failed` : ''}`)
  console.log(`${'─'.repeat(55)}\n`)
  if (fail === 0) {
    console.log('🎉 All content seeded! Check your site:')
    console.log('   https://flowtaris-ecosystem-flowtaris-ai.vercel.app/capabilities')
    console.log('   https://flowtaris-ecosystem-flowtaris-ai.vercel.app/case-studies')
    console.log('   https://flowtaris-ecosystem-flowtaris-ai.vercel.app/platforms/NetSuite')
    console.log('   https://flowtaris-ecosystem-flowtaris-ai.vercel.app/insights')
  }
}

main().catch(e => { console.error('\n💥 Fatal error:', e.message); process.exit(1) })
