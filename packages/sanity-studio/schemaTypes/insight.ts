// @flowtaris/sanity-studio - Insight Schema
import { defineField, defineType } from 'sanity'

export const insight = defineType({
  name: 'insight',
  title: 'Insight / Article',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
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
      name: 'author',
      title: 'Author',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
        { name: 'role', type: 'string', title: 'Role/Title' },
        { name: 'avatar', type: 'image', title: 'Avatar' },
        { name: 'bio', type: 'text', title: 'Bio', rows: 3 },
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(300),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        { type: 'code' },
        { type: 'table' },
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'topicClusters',
      title: 'Topic Clusters',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          'ERP Automation', 'AI in Procurement', 'Document Intelligence',
          'Predictive Analytics', 'Workflow Automation', 'AI Governance',
          'Digital Transformation', 'Change Management',
        ],
      },
      group: 'content',
    }),
    defineField({
      name: 'relatedCapabilities',
      title: 'Related Capabilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }],
      group: 'content',
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
      group: 'content',
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
        { name: 'canonicalUrl', type: 'url', title: 'Canonical URL' },
        { name: 'noIndex', type: 'boolean', title: 'No Index' },
        { name: 'noFollow', type: 'boolean', title: 'No Follow' },
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
        { name: 'answerTargets', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'targetAnswer', type: 'text' }] }], title: 'Answer Targets (Featured Snippets)' },
        { name: 'speakable', type: 'object', fields: [
          { name: 'xpath', type: 'string', title: 'XPath to Speakable Content' },
          { name: 'cssSelector', type: 'string', title: 'CSS Selector for Speakable Content' },
        ], title: 'Speakable Markup' }
      ],
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'author.name', media: 'heroImage', date: 'publishedAt' },
    prepare({ title, subtitle, media, date }) {
      return { title, subtitle: `${subtitle} • ${date ? new Date(date).toLocaleDateString() : 'Draft'}`, media }
    }
  },
})