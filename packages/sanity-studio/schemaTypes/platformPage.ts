// @flowtaris/sanity-studio - Platform Page Schema
import { defineField, defineType } from 'sanity'

export const platformPage = defineType({
  name: 'platformPage',
  title: 'Platform Page',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'capabilities', title: 'Capabilities & Integrations' },
    { name: 'seo', title: 'SEO / GEO / AEO' },
  ],
  fields: [
    // Core Content
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          { title: 'NetSuite', value: 'NetSuite' },
          { title: 'Coupa', value: 'Coupa' },
          { title: 'SAP', value: 'SAP' },
          { title: 'Workday', value: 'Workday' },
          { title: 'Salesforce', value: 'Salesforce' },
          { title: 'Microsoft Dynamics', value: 'Microsoft Dynamics' },
          { title: 'Oracle Cloud', value: 'Oracle Cloud' },
        ],
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'platform', maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'overview',
      title: 'Platform Overview',
      type: 'array',
      of: [{ type: 'block' }],
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
      name: 'logo',
      title: 'Platform Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
    }),
    defineField({
      name: 'wikidataId',
      title: 'Wikidata ID',
      type: 'string',
      description: 'e.g., Q1234567 for sameAs schema.org',
      group: 'content',
    }),
    defineField({
      name: 'officialWebsite',
      title: 'Official Website',
      type: 'url',
      group: 'content',
    }),

    // Capabilities & Integrations
    defineField({
      name: 'capabilities',
      title: 'Supported Capabilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }],
      group: 'capabilities',
    }),
    defineField({
      name: 'integrations',
      title: 'Key Integrations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Integration Name' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'logo', type: 'image', title: 'Logo' },
            { name: 'url', type: 'url', title: 'Integration URL' },
            { name: 'category', type: 'string', title: 'Category' },
          ],
        },
      ],
      group: 'capabilities',
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications & Partnerships',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Certification Name' },
            { name: 'issuedBy', type: 'string', title: 'Issued By' },
            { name: 'year', type: 'number', title: 'Year' },
            { name: 'logo', type: 'image', title: 'Logo' },
            { name: 'url', type: 'url', title: 'Verification URL' },
          ],
        },
      ],
      group: 'capabilities',
    }),

    // FAQ
    defineField({
      name: 'faq',
      title: 'Frequently Asked Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() },
            { name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (Rule) => Rule.required() },
          ],
        },
      ],
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
        { name: 'answerTargets', type: 'array', of: [{ type: 'object', fields: [{ name: 'question', type: 'string' }, { name: 'targetAnswer', type: 'text' }] }], title: 'Answer Targets' },
        { name: 'knowAbout', type: 'array', of: [{ type: 'string' }], title: 'KnowAbout Entities (schema.org)' },
        { name: 'sameAs', type: 'array', of: [{ type: 'url' }], title: 'SameAs URLs (Wikidata, Wikipedia, etc.)' },
      ],
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'platform', media: 'logo' },
    prepare({ title, media }) {
      return { title, media }
    }
  },
})