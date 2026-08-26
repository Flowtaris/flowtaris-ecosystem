// @flowtaris/assessment-engine - Rule-based recommendation engine

export interface AssessmentAnswers {
  erp: string
  painPoints: string[]
  volume: {
    invoicesPerMonth: number
    employees: number
    transactions: number
    poLines: number
  }
  currentState: string
  techMaturity: string
  urgency: string
}

export interface Recommendation {
  capability: string
  category: 'quick-win' | 'strategic' | 'innovation'
  timeline: string
  description: string
  projectedImpact: string
  capabilitySlug: string
  estimatedSavings: number       // Annual $ savings from this recommendation
  estimatedPaybackMonths: number // Payback period in months
  savingsBreakdown: {
    laborSavings: number
    errorReduction: number
    complianceSavings: number
  }
}

export interface ScoreBreakdown {
  volumeScore: number
  urgencyScore: number
  painScore: number
  maturityScore: number
  stateScore: number
}

export interface AssessmentResult {
  leadScore: number
  tier: 'enterprise' | 'mid-market' | 'growth'
  recommendations: Recommendation[]
  summary: string
  totalEstimatedSavings: number
  scoreBreakdown: ScoreBreakdown
}

// Scoring weights
const WEIGHTS = {
  volume: 0.3,
  urgency: 0.25,
  painPoints: 0.2,
  techMaturity: 0.15,
  currentState: 0.1,
}

// ERP platform multipliers
const ERP_MULTIPLIERS: Record<string, number> = {
  NetSuite: 1.0,
  Coupa: 1.1,
  SAP: 1.2,
  Workday: 1.0,
  Multiple: 1.15,
}

// ERP-specific hourly rates (avg fully-loaded cost of finance staff on that platform)
const ERP_HOURLY_RATES: Record<string, number> = {
  NetSuite: 55,
  Coupa: 65,
  SAP: 72,
  Workday: 60,
  Multiple: 62,
}

// Urgency scores
const URGENCY_SCORES: Record<string, number> = {
  Exploring: 10,
  'Budget Approved': 30,
  'Board Mandate': 50,
  'Audit-Driven': 40,
}

// Tech maturity scores
const MATURITY_SCORES: Record<string, number> = {
  Legacy: 30,
  Modern: 10,
  Hybrid: 20,
  'AI Pilot': 40,
}

// Current state scores
const STATE_SCORES: Record<string, number> = {
  Manual: 30,
  Partial: 20,
  iPaaS: 10,
  Custom: 15,
  "Don't know": 25,
}

// Pain point scores (each)
const PAIN_POINT_SCORE = 5

// Automation rates per current state (how much Flowtaris can automate)
const AUTOMATION_RATES: Record<string, number> = {
  Manual: 0.82,
  Partial: 0.65,
  iPaaS: 0.45,
  Custom: 0.50,
  "Don't know": 0.72,
}

// Volume scoring
function calculateVolumeScore(volume: AssessmentAnswers['volume']): number {
  const totalVolume =
    volume.invoicesPerMonth +
    volume.transactions +
    volume.poLines
  if (totalVolume > 10000) return 30
  if (totalVolume > 5000) return 25
  if (totalVolume > 1000) return 20
  if (totalVolume > 100) return 15
  return 10
}

// Calculate company tier
function calculateTier(volume: AssessmentAnswers['volume']): 'enterprise' | 'mid-market' | 'growth' {
  const totalVolume = volume.invoicesPerMonth + volume.transactions + volume.poLines
  if (totalVolume > 8000 || volume.employees > 25) return 'enterprise'
  if (totalVolume > 1500 || volume.employees > 8) return 'mid-market'
  return 'growth'
}

// Capability mapping based on answers
const CAPABILITY_MAPPING: Record<string, string[]> = {
  // ERP-specific
  NetSuite: ['genai-doc-intelligence', 'predictive-analytics', 'autonomous-workflow'],
  Coupa: ['genai-doc-intelligence', 'conversational-erp', 'integration-monitoring'],
  SAP: ['autonomous-workflow', 'ai-governance', 'predictive-analytics'],
  Workday: ['conversational-erp', 'predictive-analytics', 'ai-governance'],
  Multiple: ['integration-monitoring', 'autonomous-workflow', 'ai-governance'],
  // Pain point specific
  'Manual data entry': ['genai-doc-intelligence', 'autonomous-workflow'],
  'Invoice processing delays': ['genai-doc-intelligence', 'predictive-analytics'],
  'Integration Failures': ['integration-monitoring', 'autonomous-workflow'],
  'Compliance risks': ['ai-governance', 'integration-monitoring'],
  'Slow decision making': ['predictive-analytics', 'conversational-erp'],
  'High error rates': ['genai-doc-intelligence', 'autonomous-workflow'],
}

// Capability-specific savings multipliers (as % of core annual labor cost)
const CAPABILITY_SAVINGS_MULTIPLIERS: Record<string, number> = {
  'genai-doc-intelligence': 0.42,    // Eliminates manual document processing
  'autonomous-workflow':    0.38,    // End-to-end automation, high labor savings
  'predictive-analytics':   0.22,    // Cash flow and working capital optimization
  'conversational-erp':     0.18,    // Reduces query/reporting overhead
  'integration-monitoring': 0.28,    // Prevents costly integration failures
  'ai-governance':          0.15,    // Compliance fine avoidance
}

// Compliance savings per pain point (annual risk exposure)
const COMPLIANCE_SAVINGS: Record<string, number> = {
  'Compliance risks': 45000,
  'High error rates': 18000,
  'Integration Failures': 25000,
}

// Base implementation costs (amortized over 3 years)
const BASE_IMPLEMENTATION_COST = 48000

export function calculateLeadScore(answers: AssessmentAnswers): { score: number; breakdown: ScoreBreakdown } {
  const volumeScore = calculateVolumeScore(answers.volume)
  const urgencyScore = URGENCY_SCORES[answers.urgency] || 10
  const maturityScore = MATURITY_SCORES[answers.techMaturity] || 10
  const stateScore = STATE_SCORES[answers.currentState] || 10
  const painScore = Math.min(answers.painPoints.length * PAIN_POINT_SCORE, 30)

  const erpMultiplier = ERP_MULTIPLIERS[answers.erp] || 1.0

  const rawScore =
    volumeScore * WEIGHTS.volume +
    urgencyScore * WEIGHTS.urgency +
    painScore * WEIGHTS.painPoints +
    maturityScore * WEIGHTS.techMaturity +
    stateScore * WEIGHTS.currentState

  const breakdown: ScoreBreakdown = {
    volumeScore: Math.round(volumeScore * WEIGHTS.volume),
    urgencyScore: Math.round(urgencyScore * WEIGHTS.urgency),
    painScore: Math.round(painScore * WEIGHTS.painPoints),
    maturityScore: Math.round(maturityScore * WEIGHTS.techMaturity),
    stateScore: Math.round(stateScore * WEIGHTS.currentState),
  }

  return {
    score: Math.round(rawScore * erpMultiplier),
    breakdown,
  }
}

export function generateRecommendations(answers: AssessmentAnswers): Recommendation[] {
  const matchedCapabilities = new Set<string>()

  // Add ERP-specific capabilities
  const erpCapabilities = CAPABILITY_MAPPING[answers.erp] || []
  erpCapabilities.forEach((c) => matchedCapabilities.add(c))

  // Add pain-point specific capabilities
  answers.painPoints.forEach((pain) => {
    const painCapabilities = CAPABILITY_MAPPING[pain] || []
    painCapabilities.forEach((c) => matchedCapabilities.add(c))
  })

  // Base financials from volume
  const hourlyRate = ERP_HOURLY_RATES[answers.erp] || 60
  const annualManualHours = (answers.volume.invoicesPerMonth * 12) * 0.25 // 15 min/invoice avg
    + (answers.volume.transactions * 12) * 0.05    // 3 min/transaction
    + (answers.volume.poLines * 12) * 0.08          // 5 min/PO line
  const annualLaborCost = annualManualHours * hourlyRate
  const automationRate = AUTOMATION_RATES[answers.currentState] || 0.70

  // Compliance exposure from pain points
  const totalComplianceSavings = answers.painPoints.reduce((sum, pain) => {
    return sum + (COMPLIANCE_SAVINGS[pain] || 0)
  }, 0)

  // Categorize
  const isHighUrgency = ['Board Mandate', 'Audit-Driven', 'Budget Approved'].includes(answers.urgency)
  const isHighMaturity = ['AI Pilot', 'Hybrid'].includes(answers.techMaturity)

  const allCapabilities = Array.from(matchedCapabilities)

  return allCapabilities.slice(0, 6).map((capability, index) => {
    let category: Recommendation['category']
    let timeline: string

    if (index < 2 && isHighUrgency) {
      category = 'quick-win'
      timeline = '0-3 months'
    } else if (index < 4 && (isHighUrgency || isHighMaturity)) {
      category = 'strategic'
      timeline = '3-9 months'
    } else {
      category = 'innovation'
      timeline = '9-18 months'
    }

    // Calculate estimated annual savings for this capability
    const savingsMultiplier = CAPABILITY_SAVINGS_MULTIPLIERS[capability] || 0.2
    const laborSavings = Math.round(annualLaborCost * automationRate * savingsMultiplier)
    const errorReduction = Math.round(laborSavings * 0.18) // Error rework: ~18% of labor savings
    const complianceSavings = capability === 'ai-governance' || capability === 'integration-monitoring'
      ? Math.round(totalComplianceSavings * 0.6)
      : 0

    const totalSavings = laborSavings + errorReduction + complianceSavings

    // Payback: simple implementation cost divided by monthly savings
    const monthlySavings = totalSavings / 12
    const implementationCost = BASE_IMPLEMENTATION_COST * (index === 0 ? 1.0 : 0.6)
    const paybackMonths = monthlySavings > 0 ? Math.round(implementationCost / monthlySavings) : 24

    return {
      capability: capability
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      category,
      timeline,
      description: getCapabilityDescription(capability),
      projectedImpact: totalSavings > 100000 ? 'Very High — Transformational' : totalSavings > 50000 ? 'High — Significant' : 'Medium — Measurable',
      capabilitySlug: capability,
      estimatedSavings: totalSavings,
      estimatedPaybackMonths: paybackMonths,
      savingsBreakdown: {
        laborSavings,
        errorReduction,
        complianceSavings,
      },
    }
  })
}

function getCapabilityDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'genai-doc-intelligence': 'AI-powered document understanding for invoices, POs, and contracts — eliminate manual data entry across all document types.',
    'predictive-analytics': 'Forecast cash flow, detect payment anomalies, and optimize working capital with ML models trained on your ERP data.',
    'autonomous-workflow': 'End-to-end process automation with human-in-the-loop escalation — handles exceptions intelligently without manual intervention.',
    'conversational-erp': 'Natural language interface for ERP queries, approvals, and reporting — your team gets answers in seconds, not hours.',
    'integration-monitoring': 'Real-time integration health monitoring with AI-driven alerting and self-healing capabilities — prevent costly system failures.',
    'ai-governance': 'Policy enforcement, immutable audit trails, and model transparency — meet compliance mandates with automated evidence packages.',
  }
  return descriptions[slug] || 'Advanced AI capability for enterprise ERP operations.'
}

export function runAssessment(answers: AssessmentAnswers): AssessmentResult {
  const { score: leadScore, breakdown: scoreBreakdown } = calculateLeadScore(answers)
  const recommendations = generateRecommendations(answers)
  const tier = calculateTier(answers.volume)
  const totalEstimatedSavings = recommendations.reduce((sum, r) => sum + r.estimatedSavings, 0)
  const summary = generateSummary(answers, leadScore, recommendations)

  return {
    leadScore,
    tier,
    recommendations,
    summary,
    totalEstimatedSavings,
    scoreBreakdown,
  }
}

function generateSummary(
  answers: AssessmentAnswers,
  leadScore: number,
  recommendations: Recommendation[]
): string {
  const quickWins = recommendations.filter((r) => r.category === 'quick-win').length
  const strategic = recommendations.filter((r) => r.category === 'strategic').length
  const innovation = recommendations.filter((r) => r.category === 'innovation').length

  return `Based on your ${answers.erp} environment processing ${answers.volume.invoicesPerMonth.toLocaleString()} invoices/month, we identified ${recommendations.length} AI automation opportunities: ${quickWins} Quick Wins, ${strategic} Strategic, and ${innovation} Innovation. Your AI Readiness Score is ${leadScore}/100.`
}