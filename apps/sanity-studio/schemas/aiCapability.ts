import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'aiCapability',
  title: 'AI Capability',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Capability Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: ['Document Intelligence', 'Workflow Automation', 'Analytics & Forecasting', 'Governance & Compliance', 'Integration & Monitoring'],
      },
      validation: (Rule) => Rule.required(),
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
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji or Lucide name)',
      type: 'string',
    }),
    defineField({
      name: 'keyMetrics',
      title: 'Key Metrics',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
            { name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() },
          ],
        },
      ],
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'supportedPlatforms',
      title: 'Supported Platforms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformPage' }] }],
    }),
    defineField({
      name: 'timeline',
      title: 'Implementation Timeline',
      type: 'string',
    }),
    defineField({
      name: 'prerequisites',
      title: 'Prerequisites',
      type: 'array',
      of: [{ type: 'string' }],
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
      name: 'relatedCapabilities',
      title: 'Related Capabilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }],
    }),
    defineField({
      name: 'caseStudies',
      title: 'Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
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
      media: 'icon',
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