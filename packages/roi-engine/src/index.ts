// @flowtaris/roi-engine - ROI calculation logic

export interface ROIInputs {
  annualVolume: number
  avgManualHoursPerUnit: number
  hourlyCost: number
  errorRate: number
  platform: string
  useCase: string
  // New deep domain pain point fields
  attritionRate?: number
  avgRecruitmentCost?: number
  complianceFinesPerYear?: number
}

export interface ROIOutputs {
  annualSavings: number
  paybackMonths: number
  fteFreed: number
  implementationCost: number
  netAnnualBenefit: number
  threeYearROI: number
  attritionSavings: number
  complianceSavings: number
}

// Platform multipliers from Sanity config (defaults)
const PLATFORM_MULTIPLIERS: Record<string, number> = {
  NetSuite: 1.0,
  Coupa: 1.15,
  SAP: 1.25,
  Workday: 1.05,
  Default: 1.0,
}

// Use case multipliers
const USE_CASE_MULTIPLIERS: Record<string, number> = {
  'ap-automation': 1.3,
  'po-matching': 1.2,
  'expense-processing': 1.1,
  'contract-review': 1.4,
  'compliance-check': 1.15,
  Default: 1.0,
}

// Assumptions
const ASSUMPTIONS = {
  implementationBaseCost: 50000,
  implementationPerUser: 2000,
  errorCostMultiplier: 3, // Error costs 3x manual processing
  monthsPerYear: 12,
  workingHoursPerMonth: 160,
  fteHoursPerYear: 1920,
}

export function calculateROI(inputs: ROIInputs): ROIOutputs {
  const platformMultiplier = (PLATFORM_MULTIPLIERS[inputs.platform as keyof typeof PLATFORM_MULTIPLIERS] ?? PLATFORM_MULTIPLIERS.Default) as number
  const useCaseMultiplier = (USE_CASE_MULTIPLIERS[inputs.useCase as keyof typeof USE_CASE_MULTIPLIERS] ?? USE_CASE_MULTIPLIERS.Default) as number

  // Base calculations
  const annualManualHours = (inputs.annualVolume || 0) * (inputs.avgManualHoursPerUnit || 0)
  const annualManualCost = annualManualHours * (inputs.hourlyCost || 0)

  // Error costs
  const annualErrorCost =
    (inputs.annualVolume || 0) *
    (inputs.errorRate || 0) *
    (inputs.avgManualHoursPerUnit || 0) *
    (inputs.hourlyCost || 0) *
    ASSUMPTIONS.errorCostMultiplier

  const totalAddressableCost = annualManualCost + annualErrorCost

  // AI automation rate
  const automationRate = 0.75 * useCaseMultiplier
  const cappedAutomationRate = Math.min(automationRate, 0.9)

  // Core savings
  const coreAnnualSavings = totalAddressableCost * cappedAutomationRate * platformMultiplier

  const fteFreed = annualManualHours * cappedAutomationRate / ASSUMPTIONS.fteHoursPerYear

  // Deeper Domain Pain Point Calculations
  
  // 1. Attrition Savings: AI reduces burnout. Assume 30% reduction in attrition for freed FTEs.
  const attritionRate = inputs.attritionRate ?? 0.15 // Default 15%
  const avgRecruitmentCost = inputs.avgRecruitmentCost ?? 25000 // Default 25k per hire
  const attritionSavings = fteFreed * attritionRate * 0.3 * avgRecruitmentCost

  // 2. Compliance Savings: AI standardizes processes and reduces compliance fines
  const complianceFines = inputs.complianceFinesPerYear ?? 0
  const complianceSavings = complianceFines * cappedAutomationRate // If we automate 80%, we assume an 80% reduction in fines

  // Total Annual Savings
  const totalAnnualSavings = coreAnnualSavings + attritionSavings + complianceSavings

  // Implementation cost
  const estimatedUsers = Math.max(1, Math.ceil((inputs.annualVolume || 0) / 10000))
  const implementationCost =
    ASSUMPTIONS.implementationBaseCost + estimatedUsers * ASSUMPTIONS.implementationPerUser

  // Payback
  const paybackMonths = totalAnnualSavings > 0 ? (implementationCost / totalAnnualSavings) * ASSUMPTIONS.monthsPerYear : 0

  // Net annual benefit (year 1 includes implementation cost)
  const netAnnualBenefit = totalAnnualSavings - implementationCost / 3 // Amortized over 3 years

  // 3-year ROI
  const threeYearSavings = totalAnnualSavings * 3
  const threeYearROI = implementationCost > 0 ? ((threeYearSavings - implementationCost) / implementationCost) * 100 : 0

  return {
    annualSavings: Math.round(totalAnnualSavings),
    paybackMonths: Math.round(paybackMonths * 10) / 10,
    fteFreed: Math.round(fteFreed * 10) / 10,
    implementationCost: Math.round(implementationCost),
    netAnnualBenefit: Math.round(netAnnualBenefit),
    threeYearROI: Math.round(threeYearROI),
    attritionSavings: Math.round(attritionSavings),
    complianceSavings: Math.round(complianceSavings),
  }
}

// Get benchmarks for comparison
export function getBenchmarks(_platform: string, _useCase: string) {
  return {
    industryAveragePayback: 8,
    topQuartilePayback: 4,
    averageAutomationRate: 0.65,
    averageFteFreed: 2.5,
  }
}

// Sensitivity analysis
export function sensitivityAnalysis(inputs: ROIInputs) {
  const _base = calculateROI(inputs)

  const scenarios = [
    { name: 'Conservative', volumeMult: 0.8, rateMult: 0.85 },
    { name: 'Expected', volumeMult: 1.0, rateMult: 1.0 },
    { name: 'Optimistic', volumeMult: 1.2, rateMult: 1.15 },
  ]

  return scenarios.map((s) => {
    const adjustedInputs = {
      ...inputs,
      annualVolume: Math.round((inputs.annualVolume || 0) * s.volumeMult),
    }
    const result = calculateROI(adjustedInputs)
    return {
      scenario: s.name,
      annualSavings: Math.round(result.annualSavings * s.rateMult),
      paybackMonths: Math.round((result.paybackMonths / s.rateMult) * 10) / 10,
    }
  })
}