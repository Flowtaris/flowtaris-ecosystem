// @flowtaris/sanity-studio - ROI Config Schema
import { defineField, defineType } from 'sanity'

export const roiConfig = defineType({
  name: 'roiConfig',
  title: 'ROI Calculator Configuration',
  type: 'document',
  groups: [
    { name: 'assumptions', title: 'Assumptions', default: true },
    { name: 'formulas', title: 'Formulas' },
    { name: 'benchmarks', title: 'Benchmarks' },
    { name: 'seo', title: 'SEO / GEO / AEO' },
  ],
  fields: [
    // Assumptions
    defineField({
      name: 'assumptions',
      title: 'Global Assumptions',
      type: 'object',
      fields: [
        { name: 'avgHourlyCost', type: 'number', title: 'Avg Hourly Cost ($)', validation: (Rule) => Rule.required().min(0) },
        { name: 'workingDaysPerYear', type: 'number', title: 'Working Days/Year', validation: (Rule) => Rule.required().min(200).max(300) },
        { name: 'hoursPerDay', type: 'number', title: 'Hours/Day', validation: (Rule) => Rule.required().min(6).max(12) },
        { name: 'implementationWeeks', type: 'number', title: 'Implementation Weeks', validation: (Rule) => Rule.required().min(1).max(52) },
        { name: 'implementationCostPerWeek', type: 'number', title: 'Implementation Cost/Week ($)', validation: (Rule) => Rule.required().min(0) },
        { name: 'discountRate', type: 'number', title: 'Discount Rate (%)', description: 'For NPV calculations', validation: (Rule) => Rule.min(0).max(20) },
      ],
      group: 'assumptions',
    }),
    defineField({
      name: 'platformMultipliers',
      title: 'Platform Multipliers',
      type: 'object',
      fields: [
        { name: 'NetSuite', type: 'number', title: 'NetSuite', validation: (Rule) => Rule.required().min(0.5).max(3) },
        { name: 'Coupa', type: 'number', title: 'Coupa', validation: (Rule) => Rule.required().min(0.5).max(3) },
        { name: 'SAP', type: 'number', title: 'SAP', validation: (Rule) => Rule.required().min(0.5).max(3) },
        { name: 'Workday', type: 'number', title: 'Workday', validation: (Rule) => Rule.required().min(0.5).max(3) },
        { name: 'Salesforce', type: 'number', title: 'Salesforce', validation: (Rule) => Rule.required().min(0.5).max(3) },
        { name: 'Microsoft Dynamics', type: 'number', title: 'Microsoft Dynamics', validation: (Rule) => Rule.required().min(0.5).max(3) },
        { name: 'Oracle Cloud', type: 'number', title: 'Oracle Cloud', validation: (Rule) => Rule.required().min(0.5).max(3) },
      ],
      group: 'assumptions',
    }),
    defineField({
      name: 'useCaseMultipliers',
      title: 'Use Case Multipliers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Use Case ID' },
            { name: 'name', type: 'string', title: 'Use Case Name' },
            { name: 'automationRate', type: 'number', title: 'Automation Rate (%)', validation: (Rule) => Rule.required().min(0).max(100) },
            { name: 'errorReduction', type: 'number', title: 'Error Reduction (%)', validation: (Rule) => Rule.required().min(0).max(100) },
            { name: 'timeSavings', type: 'number', title: 'Time Savings (%)', validation: (Rule) => Rule.required().min(0).max(100) },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
          ],
        },
      ],
      group: 'assumptions',
    }),

    // Formulas
    defineField({
      name: 'formulas',
      title: 'Calculation Formulas',
      type: 'object',
      fields: [
        { name: 'annualManualHours', type: 'string', title: 'Annual Manual Hours Formula', description: 'e.g., "volume * hoursPerTransaction * workingDaysPerYear"' },
        { name: 'annualManualCost', type: 'string', title: 'Annual Manual Cost Formula', description: 'e.g., "annualManualHours * avgHourlyCost"' },
        { name: 'automatedHours', type: 'string', title: 'Automated Hours Formula', description: 'e.g., "annualManualHours * (1 - automationRate/100)"' },
        { name: 'annualSavings', type: 'string', title: 'Annual Savings Formula', description: 'e.g., "(annualManualHours - automatedHours) * avgHourlyCost * platformMultiplier"' },
        { name: 'implementationCost', type: 'string', title: 'Implementation Cost Formula', description: 'e.g., "implementationWeeks * implementationCostPerWeek"' },
        { name: 'paybackMonths', type: 'string', title: 'Payback Months Formula', description: 'e.g., "implementationCost / (annualSavings / 12)"' },
        { name: 'fteFreed', type: 'string', title: 'FTE Freed Formula', description: 'e.g., "annualSavings / (avgHourlyCost * hoursPerDay * workingDaysPerYear)"' },
        { name: 'npv', type: 'string', title: 'NPV Formula (3 years)', description: 'Net Present Value over 3 years' },
        { name: 'roi', type: 'string', title: 'ROI % Formula', description: 'e.g., "(annualSavings * 3 - implementationCost) / implementationCost * 100"' },
      ],
      group: 'formulas',
    }),

    // Benchmarks
    defineField({
      name: 'benchmarks',
      title: 'Industry Benchmarks',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'industry', type: 'string', title: 'Industry' },
            { name: 'avgAutomationRate', type: 'number', title: 'Avg Automation Rate (%)' },
            { name: 'avgPaybackMonths', type: 'number', title: 'Avg Payback (months)' },
            { name: 'avgRoi', type: 'number', title: 'Avg ROI (%)' },
            { name: 'source', type: 'string', title: 'Source' },
            { name: 'year', type: 'number', title: 'Year' },
          ],
        },
      ],
      group: 'benchmarks',
    }),
    defineField({
      name: 'sensitivityRanges',
      title: 'Sensitivity Analysis Ranges',
      type: 'object',
      fields: [
        { name: 'volumeVariance', type: 'number', title: 'Volume Variance (±%)', validation: (Rule) => Rule.min(0).max(50) },
        { name: 'costVariance', type: 'number', title: 'Cost Variance (±%)', validation: (Rule) => Rule.min(0).max(50) },
        { name: 'automationVariance', type: 'number', title: 'Automation Rate Variance (±%)', validation: (Rule) => Rule.min(0).max(20) },
      ],
      group: 'benchmarks',
    }),

    // SEO / GEO / AEO
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title', validation: (Rule) => Rule.max(60) },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3, validation: (Rule) => Rule.max(160) },
      ],
      group: 'seo',
    }),
    defineField({
      name: 'geoSignals',
      title: 'GEO / AEO Signals',
      type: 'object',
      fields: [
        { name: 'keyClaims', type: 'array', of: [{ type: 'string' }], title: 'Key Claims' },
        { name: 'faqItems', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'answer', type: 'text' }] }], title: 'FAQ Items' },
        { name: 'entityAssociations', type: 'array', of: [{ type: 'string' }], title: 'Entity Associations' },
        { name: 'topicClusters', type: 'array', of: [{ type: 'string' }], title: 'Topic Clusters' },
      ],
      group: 'seo',
    }),
  ],
})