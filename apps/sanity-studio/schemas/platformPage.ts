import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'platformPage',
  title: 'Platform Page',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Platform Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['ERP', 'BSM', 'ERP/HCM', 'Hybrid'],
      },
    }),
    defineField({
      name: 'maturity',
      title: 'Maturity Level',
      type: 'string',
      options: {
        list: [
          { title: 'Production Ready', value: 'production' },
          { title: 'Pilot / Beta', value: 'pilot' },
          { title: 'Beta', value: 'beta' },
          { title: 'Research / Alpha', value: 'research' },
        ],
      },
      initialValue: 'production',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logoEmoji',
      title: 'Logo Emoji',
      type: 'string',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Capability Name', validation: (Rule) => Rule.required() },
            { name: 'status', type: 'string', title: 'Status', options: { list: ['production', 'pilot', 'beta', 'research'] }, initialValue: 'production' },
            { name: 'description', type: 'text', title: 'Description', rows: 2 },
            { name: 'metrics', type: 'array', of: [{ type: 'string' }], title: 'Key Metrics' },
          ],
        },
      ],
    }),
    defineField({
      name: 'integrations',
      title: 'Integrations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Integration Name', validation: (Rule) => Rule.required() },
            { name: 'type', type: 'string', title: 'Type', options: { list: ['native', 'partner'] } },
            { name: 'description', type: 'string', title: 'Description' },
          ],
        },
      ],
    }),
    defineField({
      name: 'certifications',
      title: 'Certifications',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),
    defineField({
      name: 'demoUrl',
      title: 'Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'docsUrl',
      title: 'Documentation URL',
      type: 'url',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'object',
      fields: [
        { name: 'automationRate', type: 'string', title: 'Automation Rate' },
        { name: 'processingTime', type: 'string', title: 'Processing Time' },
        { name: 'accuracy', type: 'string', title: 'Accuracy' },
        { name: 'savings', type: 'string', title: 'Annual Savings' },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'q', type: 'string', title: 'Question', validation: (Rule) => Rule.required() },
            { name: 'a', type: 'text', title: 'Answer', rows: 3, validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'architecture',
      title: 'Technical Architecture',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'layer', type: 'string', title: 'Layer', validation: (Rule) => Rule.required() },
            { name: 'tech', type: 'string', title: 'Technology', validation: (Rule) => Rule.required() },
            { name: 'detail', type: 'text', title: 'Details', rows: 2, validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO Override',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description', rows: 3 },
        { name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'logoEmoji',
      maturity: 'maturity',
    },
    prepare({ title, subtitle, maturity }) {
      const maturityLabels: Record<string, string> = {
        production: '🟢 Production',
        pilot: '🟡 Pilot',
        beta: '🔵 Beta',
        research: '🟣 Research',
      }
      return {
        title,
        subtitle: `${subtitle} • ${maturityLabels[maturity] || maturity}`,
      }
    },
  },
})