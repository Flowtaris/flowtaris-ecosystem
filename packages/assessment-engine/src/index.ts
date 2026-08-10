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
}

export interface AssessmentResult {
  leadScore: number
  recommendations: Recommendation[]
  summary: string
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

// Capability mapping based on answers
const CAPABILITY_MAPPING: Record<string, string[]> = {
  // ERP-specific
  NetSuite: ['genai-doc-intelligence', 'predictive-analytics', 'autonomous-workflow'],
  Coupa: ['genai-doc-intelligence', 'conversational-erp', 'integration-monitoring'],
  SAP: ['autonomous-workflow', 'ai-governance', 'predictive-analytics'],
  Workday: ['conversational-erp', 'predictive-analytics', 'ai-governance'],
  // Pain point specific
  'Manual data entry': ['genai-doc-intelligence', 'autonomous-workflow'],
  'Invoice processing delays': ['genai-doc-intelligence', 'predictive-analytics'],
  'Compliance risks': ['ai-governance', 'integration-monitoring'],
  'Lack of visibility': ['predictive-analytics', 'integration-monitoring'],
  'High error rates': ['genai-doc-intelligence', 'autonomous-workflow'],
  'Slow decision making': ['predictive-analytics', 'conversational-erp'],
}

export function calculateLeadScore(answers: AssessmentAnswers): number {
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

  return Math.round(rawScore * erpMultiplier)
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

  // Convert to recommendations with categorization
  const allCapabilities = Array.from(matchedCapabilities)

  // Categorize based on urgency and maturity
  const isHighUrgency = ['Board Mandate', 'Audit-Driven', 'Budget Approved'].includes(answers.urgency)
  const isHighMaturity = ['AI Pilot', 'Hybrid'].includes(answers.techMaturity)

  return allCapabilities.slice(0, 6).map((capability, index) => {
    let category: Recommendation['category']
    let timeline: string
    let projectedImpact: string

    if (index < 2 && isHighUrgency) {
      category = 'quick-win'
      timeline = '0-3 months'
      projectedImpact = 'High - Immediate efficiency gains'
    } else if (index < 4 && (isHighUrgency || isHighMaturity)) {
      category = 'strategic'
      timeline = '3-9 months'
      projectedImpact = 'Medium-High - Transformational'
    } else {
      category = 'innovation'
      timeline = '9-18 months'
      projectedImpact = 'High - Competitive advantage'
    }

    return {
      capability: capability
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      category,
      timeline,
      description: getCapabilityDescription(capability),
      projectedImpact,
      capabilitySlug: capability,
    }
  })
}

function getCapabilityDescription(slug: string): string {
  const descriptions: Record<string, string> = {
    'genai-doc-intelligence': 'AI-powered document understanding for invoices, POs, contracts',
    'predictive-analytics': 'Forecast cash flow, detect anomalies, optimize working capital',
    'autonomous-workflow': 'End-to-end process automation with human-in-the-loop',
    'conversational-erp': 'Natural language interface for ERP queries and actions',
    'integration-monitoring': 'Real-time integration health, alerting, self-healing',
    'ai-governance': 'Policy enforcement, audit trails, model transparency',
  }
  return descriptions[slug] || 'Advanced AI capability for enterprise ERP'
}

export function runAssessment(answers: AssessmentAnswers): AssessmentResult {
  const leadScore = calculateLeadScore(answers)
  const recommendations = generateRecommendations(answers)
  const summary = generateSummary(answers, leadScore, recommendations)

  return {
    leadScore,
    recommendations,
    summary,
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

  return `Based on your ${answers.erp} environment with ${answers.volume.invoicesPerMonth.toLocaleString()} invoices/month,
  we identified ${recommendations.length} AI capabilities across ${quickWins} Quick Wins, ${strategic} Strategic
  initiatives, and ${innovation} Innovation opportunities. Your readiness score: ${leadScore}/100.`
}