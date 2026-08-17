// @flowtaris/sanity-studio - Assessment Config Schema
import { defineField, defineType } from 'sanity'

export const assessmentConfig = defineType({
  name: 'assessmentConfig',
  title: 'Assessment Configuration',
  type: 'document',
  groups: [
    { name: 'questions', title: 'Questions', default: true },
    { name: 'scoring', title: 'Scoring & Recommendations' },
    { name: 'seo', title: 'SEO / GEO / AEO' },
  ],
  fields: [
    // Questions
    defineField({
      name: 'questions',
      title: 'Assessment Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Question ID', validation: (Rule) => Rule.required() },
            { name: 'step', type: 'number', title: 'Step Number', validation: (Rule) => Rule.required().min(1).max(6) },
            { name: 'title', type: 'string', title: 'Question Title', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'text', title: 'Description/Help Text', rows: 2 },
            { name: 'type', type: 'string', title: 'Input Type', options: {
              list: [
                { title: 'Radio (Single Select)', value: 'radio' },
                { title: 'Checkbox (Multi Select)', value: 'checkbox' },
                { title: 'Number Input', value: 'number' },
                { title: 'Select Dropdown', value: 'select' },
              ],
            }, validation: (Rule) => Rule.required() },
            { name: 'options', type: 'array', of: [{
              type: 'object',
              fields: [
                { name: 'value', type: 'string', title: 'Value' },
                { name: 'label', type: 'string', title: 'Label' },
                { name: 'description', type: 'string', title: 'Description' },
                { name: 'icon', type: 'string', title: 'Icon (Lucide name)' },
                { name: 'weight', type: 'number', title: 'Scoring Weight', description: 'Used for lead scoring' },
              ],
            }], title: 'Options (for radio/checkbox/select)' },
            { name: 'validation', type: 'object', fields: [
              { name: 'required', type: 'boolean', title: 'Required' },
              { name: 'min', type: 'number', title: 'Min Value (for number)' },
              { name: 'max', type: 'number', title: 'Max Value (for number)' },
              { name: 'maxSelections', type: 'number', title: 'Max Selections (for checkbox)' },
            ], title: 'Validation Rules' },
            { name: 'dependsOn', type: 'object', fields: [
              { name: 'questionId', type: 'string', title: 'Depends On Question ID' },
              { name: 'value', type: 'string', title: 'Required Value' },
            ], title: 'Conditional Display' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().length(6),
      group: 'questions',
    }),

    // Scoring & Recommendations
    defineField({
      name: 'recommendationRules',
      title: 'Recommendation Rules',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'id', type: 'string', title: 'Rule ID', validation: (Rule) => Rule.required() },
            { name: 'name', type: 'string', title: 'Rule Name', validation: (Rule) => Rule.required() },
            { name: 'category', type: 'string', title: 'Category', options: {
              list: [
                { title: 'Quick Win (0-3 months)', value: 'quick-win' },
                { title: 'Strategic (3-9 months)', value: 'strategic' },
                { title: 'Innovation (9-18 months)', value: 'innovation' },
              ],
            }, validation: (Rule) => Rule.required() },
            { name: 'conditions', type: 'array', of: [{
              type: 'object',
              fields: [
                { name: 'questionId', type: 'string', title: 'Question ID' },
                { name: 'operator', type: 'string', title: 'Operator', options: {
                  list: ['equals', 'notEquals', 'contains', 'greaterThan', 'lessThan', 'in', 'notIn'],
                }},
                { name: 'value', type: 'string', title: 'Value' },
              ],
            }], title: 'Conditions (ALL must match)' },
            { name: 'capabilityRefs', type: 'array', of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }], title: 'Recommended Capabilities' },
            { name: 'customRecommendations', type: 'array', of: [{
              type: 'object',
              fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'description', type: 'text', title: 'Description' },
                { name: 'timeline', type: 'string', title: 'Timeline' },
                { name: 'projectedImpact', type: 'string', title: 'Projected Impact' },
              ],
            }], title: 'Custom Recommendations' },
            { name: 'priority', type: 'number', title: 'Priority (higher = first)', validation: (Rule) => Rule.min(0).max(100) },
          ],
        },
      ],
      group: 'scoring',
    }),
    defineField({
      name: 'capabilityMapping',
      title: 'Capability Mapping',
      type: 'object',
      fields: [
        { name: 'erpMapping', type: 'object', fields: [
          { name: 'NetSuite', type: 'array', of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }] },
          { name: 'Coupa', type: 'array', of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }] },
          { name: 'SAP', type: 'array', of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }] },
          { name: 'Workday', type: 'array', of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }] },
          { name: 'Multiple', type: 'array', of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }] },
        ], title: 'ERP Platform Mapping' },
        { name: 'painPointMapping', type: 'object', title: 'Pain Point to Capability Mapping' },
        { name: 'volumeMapping', type: 'object', title: 'Volume-Based Recommendations' },
      ],
      group: 'scoring',
    }),
    defineField({
      name: 'scoringWeights',
      title: 'Lead Scoring Weights',
      type: 'object',
      fields: [
        { name: 'erpPlatform', type: 'number', title: 'ERP Platform Weight', validation: (Rule) => Rule.min(0).max(100) },
        { name: 'painPoints', type: 'number', title: 'Pain Points Weight', validation: (Rule) => Rule.min(0).max(100) },
        { name: 'volume', type: 'number', title: 'Volume Weight', validation: (Rule) => Rule.min(0).max(100) },
        { name: 'currentState', type: 'number', title: 'Current State Weight', validation: (Rule) => Rule.min(0).max(100) },
        { name: 'techMaturity', type: 'number', title: 'Tech Maturity Weight', validation: (Rule) => Rule.min(0).max(100) },
        { name: 'urgency', type: 'number', title: 'Urgency Weight', validation: (Rule) => Rule.min(0).max(100) },
      ],
      group: 'scoring',
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