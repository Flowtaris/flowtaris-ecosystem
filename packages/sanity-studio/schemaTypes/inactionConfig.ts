// @flowtaris/sanity-studio - Inaction Config Schema
import { defineField, defineType } from 'sanity'

export const inactionConfig = defineType({
  name: 'inactionConfig',
  title: 'Cost of Inaction Configuration',
  type: 'document',
  groups: [
    { name: 'models', title: 'Risk Models', default: true },
    { name: 'formulas', title: 'Formulas' },
    { name: 'seo', title: 'SEO / GEO / AEO' },
  ],
  fields: [
    // Risk Models
    defineField({
      name: 'riskModels',
      title: 'Risk Models',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Model ID', validation: (Rule) => Rule.required() },
            { name: 'name', type: 'string', title: 'Model Name', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
            { name: 'category', type: 'string', title: 'Category', options: {
              list: [
                { title: 'Revenue Leakage', value: 'revenue-leakage' },
                { title: 'Compliance Risk', value: 'compliance-risk' },
                { title: 'Competitive Gap', value: 'competitive-gap' },
                { title: 'Operational Risk', value: 'operational-risk' },
                { title: 'Talent Risk', value: 'talent-risk' },
              ],
            }, validation: (Rule) => Rule.required() },
            { name: 'baseRate', type: 'number', title: 'Base Rate (%)', validation: (Rule) => Rule.required().min(0).max(100) },
            { name: 'multipliers', type: 'object', fields: [
              { name: 'industry', type: 'number', title: 'Industry Multiplier' },
              { name: 'companySize', type: 'number', title: 'Company Size Multiplier' },
              { name: 'currentMaturity', type: 'number', title: 'Current Maturity Multiplier' },
              { name: 'regulatoryPressure', type: 'number', title: 'Regulatory Pressure Multiplier' },
              { name: 'competitiveIntensity', type: 'number', title: 'Competitive Intensity Multiplier' },
            ], title: 'Risk Multipliers' },
          ],
        },
      ],
      group: 'models',
    }),

    // Formulas
    defineField({
      name: 'formulas',
      title: 'Calculation Formulas',
      type: 'object',
      fields: [
        { name: 'monthlyRevenueLeakage', type: 'string', title: 'Monthly Revenue Leakage Formula', description: 'e.g., "annualVolume * avgValue * errorRate * leakageMultiplier / 12"' },
        { name: 'annualComplianceRisk', type: 'string', title: 'Annual Compliance Risk Formula', description: 'e.g., "baseFine * violationProbability * regulatoryMultiplier"' },
        { name: 'competitiveGap', type: 'string', title: '3-Year Competitive Gap Formula', description: 'e.g., "sum(yearlyRevenueLoss * competitiveIntensity)"' },
        { name: 'costOfDelay', type: 'string', title: 'Cost of 6-Month Delay Formula', description: 'e.g., "monthlyLeakage * 6 + competitiveGap * 0.5"' },
        { name: 'breakEvenMonths', type: 'string', title: 'Break-Even Months Formula', description: 'e.g., "implementationCost / monthlySavings"' },
        { name: 'riskNarrative', type: 'string', title: 'Risk Narrative Template', description: 'Template for generating risk narrative' },
      ],
      group: 'formulas',
    }),

    defineField({
      name: 'industryMultipliers',
      title: 'Industry Risk Multipliers',
      type: 'object',
      fields: [
        { name: 'SaaS', type: 'number', title: 'SaaS' },
        { name: 'FinTech', type: 'number', title: 'FinTech' },
        { name: 'Healthcare', type: 'number', title: 'Healthcare' },
        { name: 'Manufacturing', type: 'number', title: 'Manufacturing' },
        { name: 'Retail', type: 'number', title: 'Retail' },
        { name: 'Professional Services', type: 'number', title: 'Professional Services' },
      ],
      group: 'models',
    }),
    defineField({
      name: 'sizeMultipliers',
      title: 'Company Size Multipliers',
      type: 'object',
      fields: [
        { name: 'small', type: 'number', title: 'Small (1-100 employees)' },
        { name: 'medium', type: 'number', title: 'Medium (101-1000)' },
        { name: 'large', type: 'number', title: 'Large (1001-10000)' },
        { name: 'enterprise', type: 'number', title: 'Enterprise (10000+)' },
      ],
      group: 'models',
    }),
    defineField({
      name: 'maturityMultipliers',
      title: 'Tech Maturity Multipliers',
      type: 'object',
      fields: [
        { name: 'legacy', type: 'number', title: 'Legacy' },
        { name: 'modern', type: 'number', title: 'Modern' },
        { name: 'hybrid', type: 'number', title: 'Hybrid' },
        { name: 'aiPilot', type: 'number', title: 'AI Pilot' },
      ],
      group: 'models',
    }),
    defineField({
      name: 'regulatoryPressure',
      title: 'Regulatory Pressure Levels',
      type: 'object',
      fields: [
        { name: 'low', type: 'number', title: 'Low' },
        { name: 'medium', type: 'number', title: 'Medium' },
        { name: 'high', type: 'number', title: 'High' },
      ],
      group: 'models',
    }),
    defineField({
      name: 'competitiveIntensity',
      title: 'Competitive Intensity Levels',
      type: 'object',
      fields: [
        { name: 'low', type: 'number', title: 'Low' },
        { name: 'medium', type: 'number', title: 'Medium' },
        { name: 'high', type: 'number', title: 'High' },
      ],
      group: 'models',
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