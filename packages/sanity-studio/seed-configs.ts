// Sanity Config Seed Script
// Run with: npx sanity exec seed-configs.ts --with-user-token

import { SanityClient } from 'next-sanity'

interface SeedDoc {
  _type: string
  _id?: string
  [key: string]: any
}

export const assessmentConfig: SeedDoc = {
  _id: 'assessmentConfig',
  _type: 'assessmentConfig',
  questions: [
    {
      id: 'erp-platform',
      step: 1,
      title: 'ERP Platform',
      description: 'Which ERP platform(s) do you currently use?',
      type: 'radio',
      options: [
        { value: 'NetSuite', label: 'NetSuite', description: 'Oracle NetSuite ERP', icon: 'building' },
        { value: 'Coupa', label: 'Coupa', description: 'Coupa Business Spend Management', icon: 'cpu' },
        { value: 'SAP', label: 'SAP', description: 'SAP S/4HANA or ECC', icon: 'database' },
        { value: 'Workday', label: 'Workday', description: 'Workday Financial Management', icon: 'server' },
        { value: 'Multiple', label: 'Multiple Platforms', description: 'More than one ERP system', icon: 'network' },
      ],
      validation: { required: true },
    },
    {
      id: 'pain-points',
      step: 2,
      title: 'Pain Points',
      description: 'What are your top 3 operational pain points? (Select up to 3)',
      type: 'checkbox',
      options: [
        { value: 'Manual data entry', label: 'Manual Invoice/PO Processing', description: 'High volume of manual data entry', icon: 'file', weight: 25 },
        { value: 'Invoice processing delays', label: 'Cash Flow Visibility', description: 'Poor forecasting and visibility', icon: 'dollar-sign', weight: 20 },
        { value: 'Integration Failures', label: 'Integration Failures', description: 'Frequent iPaaS/API breakages', icon: 'link', weight: 20 },
        { value: 'Compliance risks', label: 'Compliance & Audit Risk', description: 'Regulatory pressure and audit findings', icon: 'shield', weight: 15 },
        { value: 'Slow decision making', label: 'Slow Financial Close', description: 'Month-end close takes too long', icon: 'clock', weight: 10 },
        { value: 'High error rates', label: 'Vendor Disputes', description: 'Payment delays and dispute resolution', icon: 'alert-triangle', weight: 10 },
      ],
      validation: { required: true, maxSelections: 3 },
    },
    {
      id: 'volume-metrics',
      step: 3,
      title: 'Volume Metrics',
      description: 'Help us calculate your potential ROI with approximate volumes',
      type: 'number',
      fields: [
        { id: 'invoicesPerMonth', label: 'Invoices/Month', placeholder: 'e.g., 5000', min: 0 },
        { id: 'employees', label: 'Finance Team Size (FTE)', placeholder: 'e.g., 15', min: 1 },
        { id: 'transactions', label: 'Transactions/Month', placeholder: 'e.g., 25000', min: 0 },
        { id: 'poLines', label: 'PO Lines/Month', placeholder: 'e.g., 3000', min: 0 },
      ],
      validation: { required: true, min: 0 },
    },
    {
      id: 'current-state',
      step: 4,
      title: 'Current State',
      description: 'How are you currently handling these processes?',
      type: 'radio',
      options: [
        { value: 'Manual', label: 'Fully Manual', description: 'Spreadsheets, email, paper-based', icon: 'layout' },
        { value: 'Partial', label: 'Partial Automation', description: 'Some OCR/RPA but lots of exceptions', icon: 'zap' },
        { value: 'iPaaS', label: 'iPaaS Integration', description: 'MuleSoft, Boomi, Celigo, etc.', icon: 'network' },
        { value: 'Custom', label: 'Custom Development', description: 'In-house built solutions', icon: 'code' },
        { value: "Don't know", label: "Don't Know", description: 'Not sure about current tech stack', icon: 'search' },
      ],
      validation: { required: true },
    },
    {
      id: 'tech-maturity',
      step: 5,
      title: 'Tech Maturity',
      description: "How would you describe your organization's technology maturity?",
      type: 'radio',
      options: [
        { value: 'Legacy', label: 'Legacy Systems', description: 'On-premise, older ERP versions', icon: 'layout' },
        { value: 'Modern', label: 'Modern Cloud', description: 'Cloud-native, recent implementations', icon: 'zap' },
        { value: 'Hybrid', label: 'Hybrid', description: 'Mix of legacy and cloud systems', icon: 'network' },
        { value: 'AI Pilot', label: 'AI Pilot Active', description: 'Already running AI/ML experiments', icon: 'cpu' },
      ],
      validation: { required: true },
    },
    {
      id: 'urgency',
      step: 6,
      title: 'Urgency',
      description: "What's driving your evaluation timeline?",
      type: 'radio',
      options: [
        { value: 'Exploring', label: 'Exploring Options', description: 'Early research phase', icon: 'search' },
        { value: 'Budget Approved', label: 'Budget Approved', description: 'Funding secured for this year', icon: 'check' },
        { value: 'Board Mandate', label: 'Board Mandate', description: 'Strategic directive from leadership', icon: 'target' },
        { value: 'Audit-Driven', label: 'Audit/Compliance Driven', description: 'Regulatory or audit requirement', icon: 'clipboard' },
      ],
      validation: { required: true },
    },
  ],
  recommendationRules: [
    {
      id: 'rule-1',
      name: 'High Volume Quick Win',
      category: 'quick-win',
      conditions: [
        { questionId: 'volume-metrics', operator: 'greaterThan', value: '10000' },
        { questionId: 'pain-points', operator: 'contains', value: 'Manual data entry' },
      ],
      capabilityRefs: [{ _ref: 'genai-doc-intelligence' }],
      priority: 90,
    },
    {
      id: 'rule-2',
      name: 'Compliance Strategic',
      category: 'strategic',
      conditions: [
        { questionId: 'pain-points', operator: 'contains', value: 'Compliance risks' },
        { questionId: 'urgency', operator: 'equals', value: 'Audit-Driven' },
      ],
      capabilityRefs: [{ _ref: 'ai-governance' }],
      priority: 85,
    },
    {
      id: 'rule-3',
      name: 'Integration Innovation',
      category: 'innovation',
      conditions: [
        { questionId: 'pain-points', operator: 'contains', value: 'Integration Failures' },
        { questionId: 'tech-maturity', operator: 'equals', value: 'AI Pilot' },
      ],
      capabilityRefs: [{ _ref: 'integration-monitoring' }],
      priority: 80,
    },
    {
      id: 'rule-4',
      name: 'SAP Autonomous Workflow',
      category: 'strategic',
      conditions: [
        { questionId: 'erp-platform', operator: 'equals', value: 'SAP' },
      ],
      capabilityRefs: [{ _ref: 'autonomous-workflow' }],
      priority: 75,
    },
    {
      id: 'rule-5',
      name: 'NetSuite Predictive Analytics',
      category: 'quick-win',
      conditions: [
        { questionId: 'erp-platform', operator: 'equals', value: 'NetSuite' },
      ],
      capabilityRefs: [{ _ref: 'predictive-analytics' }],
      priority: 70,
    },
    {
      id: 'rule-6',
      name: 'Coupa Conversational ERP',
      category: 'quick-win',
      conditions: [
        { questionId: 'erp-platform', operator: 'equals', value: 'Coupa' },
      ],
      capabilityRefs: [{ _ref: 'conversational-erp' }],
      priority: 70,
    },
    {
      id: 'rule-7',
      name: 'Workday AI Governance',
      category: 'strategic',
      conditions: [
        { questionId: 'erp-platform', operator: 'equals', value: 'Workday' },
      ],
      capabilityRefs: [{ _ref: 'ai-governance' }],
      priority: 70,
    },
  ],
  capabilityMapping: {
    erpMapping: {
      NetSuite: [{ _ref: 'genai-doc-intelligence' }, { _ref: 'predictive-analytics' }, { _ref: 'autonomous-workflow' }],
      Coupa: [{ _ref: 'genai-doc-intelligence' }, { _ref: 'conversational-erp' }, { _ref: 'integration-monitoring' }],
      SAP: [{ _ref: 'autonomous-workflow' }, { _ref: 'ai-governance' }, { _ref: 'predictive-analytics' }],
      Workday: [{ _ref: 'conversational-erp' }, { _ref: 'predictive-analytics' }, { _ref: 'ai-governance' }],
      Multiple: [{ _ref: 'integration-monitoring' }, { _ref: 'genai-doc-intelligence' }, { _ref: 'ai-governance' }],
    },
    painPointMapping: {
      'Manual data entry': [{ _ref: 'genai-doc-intelligence' }, { _ref: 'autonomous-workflow' }],
      'Invoice processing delays': [{ _ref: 'genai-doc-intelligence' }, { _ref: 'predictive-analytics' }],
      'Compliance risks': [{ _ref: 'ai-governance' }, { _ref: 'integration-monitoring' }],
      'Integration Failures': [{ _ref: 'integration-monitoring' }, { _ref: 'conversational-erp' }],
      'Slow decision making': [{ _ref: 'predictive-analytics' }, { _ref: 'conversational-erp' }],
      'High error rates': [{ _ref: 'genai-doc-intelligence' }, { _ref: 'autonomous-workflow' }],
    },
    volumeMapping: {
      high: [{ _ref: 'autonomous-workflow' }, { _ref: 'predictive-analytics' }],
      medium: [{ _ref: 'genai-doc-intelligence' }, { _ref: 'conversational-erp' }],
      low: [{ _ref: 'integration-monitoring' }, { _ref: 'ai-governance' }],
    },
  },
  scoringWeights: {
    erpPlatform: 10,
    painPoints: 20,
    volume: 30,
    currentState: 10,
    techMaturity: 15,
    urgency: 15,
  },
  seo: {
    metaTitle: 'AI Readiness Assessment | Flowtaris AI',
    metaDescription: 'Free 3-minute diagnostic → Personalized roadmap with Quick Wins (0-3mo), Strategic initiatives (3-9mo), and Innovation opportunities (9-18mo).',
  },
  geoSignals: {
    keyClaims: [
      'Free AI readiness assessment in 3 minutes',
      'Personalized roadmap with Quick Wins, Strategic, and Innovation columns',
      'Tailored to your ERP platform, volume, and urgency',
    ],
    faqItems: [
      { question: 'How long does the assessment take?', answer: 'The assessment takes approximately 3 minutes to complete.' },
      { question: 'Is my data saved?', answer: 'Your answers are saved locally in your browser until you choose to submit them.' },
      { question: 'What do I get after completing?', answer: 'A personalized AI automation roadmap with capabilities across Quick Wins (0-3mo), Strategic (3-9mo), and Innovation (9-18mo) timelines.' },
    ],
    entityAssociations: ['AI automation', 'ERP', 'Digital transformation', 'Finance technology'],
    topicClusters: ['AI in finance', 'ERP automation', 'AP automation', 'Compliance automation'],
  },
}

export const roiConfig: SeedDoc = {
  _id: 'roiConfig',
  _type: 'roiConfig',
  assumptions: {
    avgHourlyCost: 45,
    workingDaysPerYear: 250,
    hoursPerDay: 8,
    implementationWeeks: 12,
    implementationCostPerWeek: 15000,
    discountRate: 10,
    platformMultipliers: {
      NetSuite: 1.2,
      Coupa: 1.15,
      SAP: 1.25,
      Workday: 1.1,
      Salesforce: 1.05,
      'Microsoft Dynamics': 1.1,
      'Oracle Cloud': 1.15,
    },
    useCaseMultipliers: [
      {
        id: 'ap-automation',
        name: 'AP Automation (Invoice Processing)',
        automationRate: 85,
        errorReduction: 95,
        timeSavings: 90,
        description: 'End-to-end invoice capture, matching, and posting',
      },
      {
        id: 'po-matching',
        name: 'PO Matching & Reconciliation',
        automationRate: 80,
        errorReduction: 92,
        timeSavings: 85,
        description: 'Automated 2/3-way matching with exception handling',
      },
      {
        id: 'cash-forecasting',
        name: 'Cash Flow Forecasting',
        automationRate: 70,
        errorReduction: 60,
        timeSavings: 80,
        description: 'AI-powered cash position and forecasting',
      },
      {
        id: 'expense-audit',
        name: 'Expense Audit & Compliance',
        automationRate: 75,
        errorReduction: 88,
        timeSavings: 70,
        description: 'Automated policy enforcement and receipt validation',
      },
      {
        id: 'vendor-onboarding',
        name: 'Vendor Onboarding',
        automationRate: 65,
        errorReduction: 80,
        timeSavings: 75,
        description: 'Streamlined vendor registration and compliance checks',
      },
    ],
  },
  formulas: {
    annualManualHours: 'annualVolume * avgManualHoursPerUnit * workingDaysPerYear',
    annualManualCost: 'annualManualHours * avgHourlyCost',
    automatedHours: 'annualManualHours * (1 - automationRate/100)',
    annualSavings: '(annualManualHours - automatedHours) * avgHourlyCost * platformMultiplier',
    implementationCost: 'implementationWeeks * implementationCostPerWeek',
    paybackMonths: 'implementationCost / (annualSavings / 12)',
    fteFreed: 'annualSavings / (avgHourlyCost * hoursPerDay * workingDaysPerYear)',
    npv3Year: 'sum(annualSavings * platformMultiplier / (1 + discountRate/100)^year, year=1..3) - implementationCost',
    roiPercent: '(annualSavings * 3 - implementationCost) / implementationCost * 100',
  },
  benchmarks: [
    {
      industry: 'SaaS',
      avgAutomationRate: 78,
      avgPaybackMonths: 4.2,
      avgRoi: 285,
      source: 'Flowtaris Benchmark Report 2024',
      year: 2024,
    },
    {
      industry: 'FinTech',
      avgAutomationRate: 82,
      avgPaybackMonths: 3.5,
      avgRoi: 320,
      source: 'Flowtaris Benchmark Report 2024',
      year: 2024,
    },
    {
      industry: 'Manufacturing',
      avgAutomationRate: 72,
      avgPaybackMonths: 5.1,
      avgRoi: 240,
      source: 'Flowtaris Benchmark Report 2024',
      year: 2024,
    },
    {
      industry: 'Healthcare',
      avgAutomationRate: 68,
      avgPaybackMonths: 5.8,
      avgRoi: 215,
      source: 'Flowtaris Benchmark Report 2024',
      year: 2024,
    },
    {
      industry: 'Professional Services',
      avgAutomationRate: 75,
      avgPaybackMonths: 4.5,
      avgRoi: 265,
      source: 'Flowtaris Benchmark Report 2024',
      year: 2024,
    },
  ],
  sensitivityRanges: {
    volumeVariance: 20,
    costVariance: 15,
    automationVariance: 10,
  },
  seo: {
    metaTitle: 'ROI Calculator | Flowtaris AI',
    metaDescription: 'Calculate your AI automation ROI with live sliders. Real-time projections for annual savings, payback period, and FTE freed.',
  },
  geoSignals: {
    keyClaims: [
      'Average 3.2-month payback on AI automation',
      '85% automation rate achievable for AP processing',
      '12 FTE typically freed per $10M volume',
    ],
    faqItems: [
      { question: 'What inputs drive the ROI calculation?', answer: 'Annual volume, manual minutes per invoice, hourly cost, error rate, current automation level, ERP platform, and use case.' },
      { question: 'How is the payback period calculated?', answer: 'Implementation cost divided by monthly savings (annual savings / 12). Typical implementation is 12 weeks.' },
      { question: 'Can I adjust the assumptions?', answer: 'Yes, the calculator uses industry-standard assumptions that can be customized via Sanity CMS.' },
    ],
    entityAssociations: ['ROI calculator', 'AI automation', 'Finance transformation', 'ERP optimization'],
    topicClusters: ['AP automation ROI', 'Finance AI business case', 'Automation payback'],
  },
}

export const inactionConfig: SeedDoc = {
  _id: 'inactionConfig',
  _type: 'inactionConfig',
  riskModels: [
    {
      id: 'revenue-leakage',
      name: 'Revenue Leakage Model',
      description: 'Monthly cost of manual processing inefficiencies and error rework',
      category: 'revenue-leakage',
      baseRate: 8,
      multipliers: {
        industry: 1.0,
        companySize: 1.0,
        currentMaturity: 1.0,
        regulatoryPressure: 1.0,
        competitiveIntensity: 1.0,
      },
    },
    {
      id: 'compliance-risk',
      name: 'Compliance Risk Model',
      description: 'Annual regulatory exposure from manual processes',
      category: 'compliance-risk',
      baseRate: 5,
      multipliers: {
        industry: 1.5,
        companySize: 1.2,
        currentMaturity: 1.3,
        regulatoryPressure: 2.0,
        competitiveIntensity: 1.0,
      },
    },
    {
      id: 'competitive-gap',
      name: 'Competitive Gap Model',
      description: '3-year revenue impact from falling behind automation adoption',
      category: 'competitive-gap',
      baseRate: 12,
      multipliers: {
        industry: 1.2,
        companySize: 1.1,
        currentMaturity: 1.5,
        regulatoryPressure: 1.0,
        competitiveIntensity: 2.0,
      },
    },
    {
      id: 'operational-risk',
      name: 'Operational Risk Model',
      description: 'Risk of process breakdowns, key-person dependency, and scaling limits',
      category: 'operational-risk',
      baseRate: 6,
      multipliers: {
        industry: 1.0,
        companySize: 1.3,
        currentMaturity: 1.4,
        regulatoryPressure: 1.0,
        competitiveIntensity: 1.2,
      },
    },
    {
      id: 'talent-risk',
      name: 'Talent Risk Model',
      description: 'Cost of attracting/retaining finance talent in manual environments',
      category: 'talent-risk',
      baseRate: 4,
      multipliers: {
        industry: 1.1,
        companySize: 1.2,
        currentMaturity: 1.5,
        regulatoryPressure: 1.0,
        competitiveIntensity: 1.3,
      },
    },
  ],
  formulas: {
    monthlyRevenueLeakage: 'annualVolume * avgValue * errorRate * leakageMultiplier / 12',
    annualComplianceRisk: 'baseFine * violationProbability * regulatoryMultiplier',
    competitiveGap: 'sum(yearlyRevenueLoss * competitiveIntensity, year=1..3)',
    costOfDelay: 'monthlyLeakage * monthsDelay + competitiveGap * 0.5',
    breakEvenMonths: 'implementationCost / monthlySavings',
    riskNarrative: 'Template: "With {compliance} compliance requirements, you face ${annualRisk}/year in regulatory exposure. High competitive pressure means {monthsDelay}-month delay costs ${costOfDelay} in lost market position. Every month of inaction leaks ${monthlyLeakage} in addressable costs."',
  },
  industryMultipliers: {
    SaaS: 1.2,
    FinTech: 1.4,
    Healthcare: 1.6,
    Manufacturing: 1.1,
    Retail: 1.0,
    'Professional Services': 1.15,
  },
  sizeMultipliers: {
    small: 0.8,
    medium: 1.0,
    large: 1.3,
    enterprise: 1.5,
  },
  maturityMultipliers: {
    legacy: 1.5,
    modern: 0.8,
    hybrid: 1.1,
    aiPilot: 0.6,
  },
  regulatoryPressure: {
    low: 0.5,
    medium: 1.0,
    high: 2.0,
  },
  competitiveIntensity: {
    low: 0.5,
    medium: 1.0,
    high: 1.8,
  },
  seo: {
    metaTitle: 'Cost of Inaction Calculator | Flowtaris AI',
    metaDescription: 'Calculate the cost of waiting. Monthly revenue leakage, annual compliance risk, 3-year competitive gap, and cost of 6-month delay.',
  },
  geoSignals: {
    keyClaims: [
      'Average company loses $2.1M/year to manual AP processes',
      '6-month delay costs 3.2x more than immediate implementation',
      'Competitive gap widens 18% per quarter of inaction',
    ],
    faqItems: [
      { question: 'What does "cost of inaction" mean?', answer: 'The financial impact of delaying automation — including monthly revenue leakage, compliance risk exposure, competitive disadvantage, and the compounding cost of delay.' },
      { question: 'How is competitive gap calculated?', answer: 'Based on industry benchmarks for automation adoption rates, modeled over 3 years with competitive intensity multipliers.' },
      { question: 'Can I adjust the risk parameters?', answer: 'Yes, competitive pressure, compliance requirements, and delay period are all adjustable inputs.' },
    ],
    entityAssociations: ['Cost of delay', 'Risk analysis', 'Finance automation', 'Business case'],
    topicClusters: ['Automation business case', 'Risk quantification', 'Finance transformation'],
  },
}

export async function seedConfigs(client: SanityClient) {
  const docs = [assessmentConfig, roiConfig, inactionConfig]

  for (const doc of docs) {
    const { _id, ...rest } = doc
    try {
      await client.createOrReplace(doc)
      console.log(`✅ Created/Updated: ${_id}`)
    } catch (error) {
      console.error(`❌ Failed to create ${_id}:`, error)
    }
  }

  console.log('🎉 Seeding complete!')
}

// For direct execution
if (require.main === module) {
  const { createClient } = require('next-sanity')
  const client = createClient({
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET || process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

  await seedConfigs(client as any)
  process.exit(0)
}