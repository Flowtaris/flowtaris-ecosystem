// @flowtaris/inaction-engine - Cost of inaction calculation

export interface InactionInputs {
  annualVolume: number
  avgManualHoursPerUnit: number
  hourlyCost: number
  errorRate: number
  platform: string
  useCase: string
  competitivePressure: 'low' | 'medium' | 'high'
  complianceRequirements: 'none' | 'basic' | 'strict'
  monthsDelay: number
}

export interface InactionOutputs {
  monthlyLeakage: number
  annualRisk: number
  competitiveGap: number
  costOfDelay: number
  threeYearProjectedLoss: number
}

// Risk factors
const COMPETITIVE_PRESSURE_MULTIPLIERS: Record<string, number> = {
  low: 0.5,
  medium: 1.0,
  high: 1.5,
}

const COMPLIANCE_RISK_MULTIPLIERS: Record<string, number> = {
  none: 0,
  basic: 0.1,
  strict: 0.25,
}

// Base leakage rate (percentage of addressable cost lost per month)
const _BASE_LEAKAGE_RATE = 0.08 // 8% per month

export function calculateInaction(inputs: InactionInputs): InactionOutputs {
  // Reuse ROI calculation for base numbers
  const {
    annualSavings,
    implementationCost: _implementationCost,
  } = calculateBaseROI(inputs)

  // Monthly leakage = what you lose each month by not automating
  const monthlyLeakage = annualSavings / 12

  // Annual risk = compliance risk + operational risk
  const complianceRisk = annualSavings * (COMPLIANCE_RISK_MULTIPLIERS[inputs.complianceRequirements] ?? 0)
  const competitiveRisk = annualSavings * (COMPETITIVE_PRESSURE_MULTIPLIERS[inputs.competitivePressure] ?? 1) * 0.3
  const annualRisk = complianceRisk + competitiveRisk

  // Competitive gap over 3 years (compounded)
  const yearlyGap = annualSavings * (COMPETITIVE_PRESSURE_MULTIPLIERS[inputs.competitivePressure] ?? 1) * 0.2
  const competitiveGap = yearlyGap * 3 * 1.15 // Compounded

  // Cost of specific delay
  const costOfDelay = monthlyLeakage * inputs.monthsDelay

  // 3-year projected loss if never implemented
  const threeYearProjectedLoss = annualSavings * 3 + competitiveGap + complianceRisk * 3

  return {
    monthlyLeakage: Math.round(monthlyLeakage),
    annualRisk: Math.round(annualRisk),
    competitiveGap: Math.round(competitiveGap),
    costOfDelay: Math.round(costOfDelay),
    threeYearProjectedLoss: Math.round(threeYearProjectedLoss),
  }
}

function calculateBaseROI(inputs: InactionInputs) {
  const PLATFORM_MULTIPLIERS: Record<string, number> = {
    NetSuite: 1.0,
    Coupa: 1.15,
    SAP: 1.25,
    Workday: 1.05,
    Default: 1.0,
  }

  const USE_CASE_MULTIPLIERS: Record<string, number> = {
    'ap-automation': 1.3,
    'po-matching': 1.2,
    'expense-processing': 1.1,
    'contract-review': 1.4,
    'compliance-check': 1.15,
    Default: 1.0,
  }

  const platformMultiplier = (PLATFORM_MULTIPLIERS[inputs.platform as keyof typeof PLATFORM_MULTIPLIERS] ?? PLATFORM_MULTIPLIERS.Default) as number
  const useCaseMultiplier = (USE_CASE_MULTIPLIERS[inputs.useCase as keyof typeof USE_CASE_MULTIPLIERS] ?? USE_CASE_MULTIPLIERS.Default) as number

  const annualManualHours = inputs.annualVolume * inputs.avgManualHoursPerUnit
  const annualManualCost = annualManualHours * inputs.hourlyCost
  const annualErrorCost =
    inputs.annualVolume *
    inputs.errorRate *
    inputs.avgManualHoursPerUnit *
    inputs.hourlyCost *
    3

  const totalAddressableCost = annualManualCost + annualErrorCost
  const automationRate = Math.min(0.75 * useCaseMultiplier, 0.9)
  const annualSavings = totalAddressableCost * automationRate * platformMultiplier

  const estimatedUsers = Math.max(1, Math.ceil(inputs.annualVolume / 10000))
  const implementationCost = 50000 + estimatedUsers * 2000

  return { annualSavings, implementationCost }
}

// Break-even analysis
export function breakEvenAnalysis(inputs: InactionInputs) {
  const outputs = calculateInaction(inputs)
  const { implementationCost } = calculateBaseROI(inputs)

  return {
    monthsToBreakEven: Math.ceil(implementationCost / outputs.monthlyLeakage),
    breakEvenDate: new Date(Date.now() + Math.ceil(implementationCost / outputs.monthlyLeakage) * 30 * 24 * 60 * 60 * 1000),
    monthlyLeakage: outputs.monthlyLeakage,
  }
}

// Risk narrative for presentation
export function generateRiskNarrative(inputs: InactionInputs, outputs: InactionOutputs): string {
  const narratives: string[] = []

  if (inputs.complianceRequirements !== 'none') {
    narratives.push(
      `With ${inputs.complianceRequirements} compliance requirements, you face $${outputs.annualRisk.toLocaleString()}/year in regulatory exposure.`
    )
  }

  if (inputs.competitivePressure === 'high') {
    narratives.push(
      `High competitive pressure means a ${inputs.monthsDelay}-month delay costs $${outputs.costOfDelay.toLocaleString()} in lost market position.`
    )
  }

  narratives.push(
    `Every month of inaction leaks $${outputs.monthlyLeakage.toLocaleString()} in addressable costs.`
  )

  return narratives.join(' ')
}