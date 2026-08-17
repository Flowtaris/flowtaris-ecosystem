import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      description: 'Use "Confidential" if anonymous',
    }),
    defineField({
      name: 'logo',
      title: 'Customer Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: ['SaaS', 'Healthcare', 'Manufacturing', 'Fintech', 'Retail', 'Financial Services', 'Technology', 'Other'],
      },
    }),
    defineField({
      name: 'size',
      title: 'Company Size',
      type: 'string',
      options: {
        list: ['Startup (1-50)', 'Growth (51-200)', 'Mid-Market (201-1000)', 'Enterprise (1001-5000)', 'Large Enterprise (5000+)'],
      },
    }),
    defineField({
      name: 'platforms',
      title: 'Platforms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformPage' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities Deployed',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'challenge',
      title: 'Business Challenge',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'solution',
      title: 'Solution Implemented',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Key Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'metric', type: 'string', title: 'Metric', validation: (Rule) => Rule.required() },
            { name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() },
            { name: 'description', type: 'string', title: 'Context' },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'timeline',
      title: 'Implementation Timeline',
      type: 'string',
    }),
    defineField({
      name: 'teamSize',
      title: 'Implementation Team Size',
      type: 'number',
    }),
    defineField({
      name: 'testimonial',
      title: 'Customer Testimonial',
      type: 'object',
      fields: [
        { name: 'quote', type: 'text', title: 'Quote', rows: 4 },
        { name: 'author', type: 'string', title: 'Author Name' },
        { name: 'role', type: 'string', title: 'Author Role' },
        { name: 'avatar', type: 'image', title: 'Author Avatar', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'metrics',
      title: 'Detailed Metrics',
      type: 'object',
      fields: [
        { name: 'automationRate', type: 'string', title: 'Automation Rate' },
        { name: 'processingTimeBefore', type: 'string', title: 'Processing Time Before' },
        { name: 'processingTimeAfter', type: 'string', title: 'Processing Time After' },
        { name: 'accuracyBefore', type: 'string', title: 'Accuracy Before' },
        { name: 'accuracyAfter', type: 'string', title: 'Accuracy After' },
        { name: 'costSavings', type: 'string', title: 'Annual Cost Savings' },
        { name: 'fteFreed', type: 'string', title: 'FTE Freed' },
        { name: 'roiMonths', type: 'number', title: 'ROI (Months)' },
        { name: 'errorReduction', type: 'string', title: 'Error Reduction %' },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured on Homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'date',
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
      title: 'title',
      subtitle: 'customerName',
      media: 'logo',
      platforms: 'platforms',
    },
    prepare({ title, subtitle, platforms }) {
      const platformNames = platforms?.map((p: any) => p?.name).join(', ') || ''
      return {
        title,
        subtitle: `${subtitle || 'Confidential'} • ${platformNames}`,
      }
    },
  },
})