// @flowtaris/sanity-studio - AI Capability Schema
import { defineField, defineType } from 'sanity'

export const aiCapability = defineType({
  name: 'aiCapability',
  title: 'AI Capability',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'technical', title: 'Technical Details' },
    { name: 'metrics', title: 'Metrics & Proof' },
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'GenAI', value: 'genai' },
          { title: 'Machine Learning', value: 'ml' },
          { title: 'RPA', value: 'rpa' },
          { title: 'Document Processing', value: 'doc-processing' },
          { title: 'Workflow Automation', value: 'workflow' },
          { title: 'AI Governance', value: 'governance' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'array',
      of: [{ type: 'block' }, { type: 'image' }],
      group: 'content',
    }),
    defineField({
      name: 'platforms',
      title: 'Supported Platforms',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'NetSuite', 'Coupa', 'SAP', 'Workday', 'Salesforce',
          'Microsoft Dynamics', 'Oracle Cloud', 'QuickBooks', 'Xero',
        ],
      },
      validation: (Rule) => Rule.required().min(1),
      group: 'content',
    }),
    defineField({
      name: 'maturity',
      title: 'Maturity Level',
      type: 'string',
      options: {
        list: [
          { title: 'Production', value: 'production' },
          { title: 'Pilot', value: 'pilot' },
          { title: 'Research', value: 'research' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Lucide icon name or emoji',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),

    // Technical Details
    defineField({
      name: 'technicalDetails',
      title: 'Technical Architecture',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'component', type: 'string', title: 'Component' },
            { name: 'technology', type: 'string', title: 'Technology' },
            { name: 'description', type: 'text', title: 'Description', rows: 3 },
          ],
        },
      ],
      group: 'technical',
    }),
    defineField({
      name: 'integrations',
      title: 'Key Integrations',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'technical',
    }),
    defineField({
      name: 'demoVideo',
      title: 'Demo Video URL',
      type: 'url',
      group: 'technical',
    }),
    defineField({
      name: 'documentationUrl',
      title: 'Documentation URL',
      type: 'url',
      group: 'technical',
    }),

    // Metrics & Proof
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label (e.g., "Time Saved")' },
            { name: 'value', type: 'string', title: 'Value (e.g., "85%")' },
            { name: 'context', type: 'string', title: 'Context (e.g., "vs manual processing")' },
          ],
        },
      ],
      group: 'metrics',
    }),
    defineField({
      name: 'caseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      group: 'metrics',
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
        { name: 'twitterCard', type: 'string', title: 'Twitter Card', options: { list: ['summary', 'summary_large_image'] } },
      ],
      group: 'seo',
    }),
    defineField({
      name: 'geoSignals',
      title: 'GEO / AEO Signals',
      type: 'object',
      fields: [
        { name: 'keyClaims', type: 'array', of: [{ type: 'string' }], title: 'Key Claims (for AI citation)' },
        { name: 'citations', type: 'array', of: [{ type: 'object', fields: [{ name: 'title', type: 'string' }, { name: 'url', type: 'url' }, { name: 'source', type: 'string' }] }], title: 'Citations' },
        { name: 'faqItems', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'answer', type: 'text' }] }], title: 'FAQ Items' },
        { name: 'entityAssociations', type: 'array', of: [{ type: 'string' }], title: 'Entity Associations' },
        { name: 'topicClusters', type: 'array', of: [{ type: 'string' }], title: 'Topic Clusters' },
        { name: 'answerTargets', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'targetAnswer', type: 'text' }] }], title: 'Answer Targets (Featured Snippets)' }
      ],
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'image', maturity: 'maturity' },
    prepare({ title, subtitle, media, maturity }) {
      return { title, subtitle: `${subtitle} • ${maturity}`, media }
    }
  },
})