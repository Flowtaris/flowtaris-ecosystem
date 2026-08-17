// @flowtaris/sanity-studio - Case Study Schema
import { defineField, defineType } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'metrics', title: 'Results & Metrics' },
    { name: 'technical', title: 'Technical Details' },
    { name: 'seo', title: 'SEO / GEO / AEO' },
  ],
  fields: [
    // Core Content
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(100),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Use "Global SaaS Decacorn" if confidential',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'clientLogo',
      title: 'Client Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          'SaaS', 'FinTech', 'Healthcare', 'Manufacturing', 'Retail',
          'Professional Services', 'Education', 'Real Estate', 'Logistics',
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms Involved',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: ['NetSuite', 'Coupa', 'SAP', 'Workday', 'Salesforce', 'Microsoft Dynamics', 'Oracle Cloud'],
      },
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),
    defineField({
      name: 'challenge',
      title: 'Challenge',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'solution',
      title: 'Solution',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'timeline',
      title: 'Project Timeline',
      type: 'string',
      description: 'e.g., "3 months", "Q1-Q2 2025"',
      group: 'content',
    }),
    defineField({
      name: 'teamSize',
      title: 'Team Size',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),

    // Results & Metrics
    defineField({
      name: 'results',
      title: 'Result Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric Name' },
            { name: 'before', type: 'string', title: 'Before Value' },
            { name: 'after', type: 'string', title: 'After Value' },
            { name: 'unit', type: 'string', title: 'Unit (%, hours, $, etc.)' },
            { name: 'improvement', type: 'number', title: 'Improvement %' },
            { name: 'description', type: 'text', title: 'Context Description', rows: 2 },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: 'metrics',
    }),
    defineField({
      name: 'testimonial',
      title: 'Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote', rows: 4 },
        { name: 'author', type: 'string', title: 'Author Name' },
        { name: 'role', type: 'string', title: 'Role/Title' },
        { name: 'company', type: 'string', title: 'Company' },
        { name: 'avatar', type: 'image', title: 'Avatar' },
      ],
      group: 'metrics',
    }),

    // Technical Details
    defineField({
      name: 'capabilities',
      title: 'Capabilities Used',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }],
      group: 'technical',
    }),
    defineField({
      name: 'architectureDiagram',
      title: 'Architecture Diagram',
      type: 'image',
      options: { hotspot: true },
      group: 'technical',
    }),
    defineField({
      name: 'technicalDetails',
      title: 'Technical Deep Dive',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'technical',
    }),

    // SEO / GEO / AEO
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title', validation: (Rule) => Rule.max(60) },
        { name: 'metaDescription', type: 'text', title: 'Meta Description', rows: 3, validation: (Rule) => Rule.max(160) },
        { name: 'ogImage', type: 'image', title: 'Open Graph Image' },
      ],
      group: 'seo',
    }),
    defineField({
      name: 'geoSignals',
      title: 'GEO / AEO Signals',
      type: 'object',
      fields: [
        { name: 'keyClaims', type: 'array', of: [{ type: 'string' }], title: 'Key Claims' },
        { name: 'citations', type: 'array', of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'url' }, { name: 'source', type: 'string' }] }], title: 'Citations' },
        { name: 'faqItems', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'answer', type: 'text' }] }], title: 'FAQ Items' },
        { name: 'entityAssociations', type: 'array', of: [{ type: 'string' }], title: 'Entity Associations' },
        { name: 'topicClusters', type: 'array', of: [{ type: 'string' }], title: 'Topic Clusters' },
        { name: 'answerTargets', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'targetAnswer', type: 'text' }] }], title: 'Answer Targets' }
      ],
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'client', media: 'clientLogo', industry: 'industry' },
    prepare({ title, subtitle, media, industry }) {
      return { title, subtitle: `${subtitle} • ${industry}`, media }
    }
  },
})