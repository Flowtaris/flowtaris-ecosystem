import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'roiConfig',
  title: 'ROI Calculator Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Calculator Title',
      type: 'string',
      initialValue: 'ROI Calculator',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Shown above the calculator form',
    }),
    defineField({
      name: 'sections',
      title: 'Input Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'id',
              title: 'Section ID',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Section Description',
              type: 'text',
              rows: 2,
            }),
            defineField({
              name: 'icon',
              title: 'Icon (Lucide name)',
              type: 'string',
            }),
            defineField({
              name: 'inputs',
              title: 'Inputs',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'id',
                      title: 'Input ID',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'type',
                      title: 'Input Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Slider', value: 'slider' },
                          { title: 'Number Input', value: 'number' },
                          { title: 'Select', value: 'select' },
                          { title: 'Currency', value: 'currency' },
                          { title: 'Percentage', value: 'percentage' },
                        ],
                      },
                      initialValue: 'slider',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'min',
                      title: 'Minimum Value',
                      type: 'number',
                    }),
                    defineField({
                      name: 'max',
                      title: 'Maximum Value',
                      type: 'number',
                    }),
                    defineField({
                      name: 'step',
                      title: 'Step',
                      type: 'number',
                      initialValue: 1,
                    }),
                    defineField({
                      name: 'defaultValue',
                      title: 'Default Value',
                      type: 'number',
                    }),
                    defineField({
                      name: 'unit',
                      title: 'Unit Suffix',
                      type: 'string',
                      description: 'e.g., "FTE", "hrs/month", "$", "%"',
                    }),
                    defineField({
                      name: 'prefix',
                      title: 'Prefix',
                      type: 'string',
                      description: 'e.g., "$", "€", "£"',
                    }),
                    defineField({
                      name: 'options',
                      title: 'Options (for select type)',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            { name: 'value', type: 'number', title: 'Value', validation: (Rule) => Rule.required() },
                            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
                          ],
                        },
                      ],
                    }),
                    defineField({
                      name: 'helpText',
                      title: 'Help Text',
                      type: 'string',
                    }),
                    defineField({
                      name: 'category',
                      title: 'Category',
                      type: 'string',
                      description: 'Used for grouping results (e.g., volume, cost, time, quality)',
                    }),
                  ],
                },
              ],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'calculation',
      title: 'Calculation Logic',
      type: 'object',
      fields: [
        defineField({
          name: 'formula',
          title: 'Formula Description',
          type: 'text',
          rows: 6,
          description: 'Human-readable description of how ROI is calculated',
        }),
        defineField({
          name: 'assumptions',
          title: 'Key Assumptions',
          type: 'array',
          of: [{ type: 'string' }],
        }),
        defineField({
          name: 'defaultCurrency',
          title: 'Default Currency',
          type: 'string',
          initialValue: 'USD',
          options: {
            list: ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY'],
          },
        }),
        defineField({
          name: 'timeHorizonMonths',
          title: 'Default Time Horizon (Months)',
          type: 'number',
          initialValue: 12,
        }),
        defineField({
          name: 'discountRate',
          title: 'Discount Rate (%)',
          type: 'number',
          initialValue: 10,
        }),
        defineField({
          name: 'taxRate',
          title: 'Corporate Tax Rate (%)',
          type: 'number',
          initialValue: 21,
        }),
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'metrics',
          title: 'Output Metrics',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'id', type: 'string', title: 'Metric ID', validation: (Rule) => Rule.required() },
                { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
                { name: 'format', type: 'string', title: 'Format', options: { list: ['currency', 'number', 'percentage', 'months', 'times'] }, initialValue: 'currency' },
                { name: 'description', type: 'string', title: 'Description' },
                { name: 'highlight', type: 'boolean', title: 'Highlight as Primary', initialValue: false },
                { name: 'color', type: 'string', title: 'Color (hex or CSS var)' },
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: 'breakdownCategories',
          title: 'Breakdown Categories',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'id', type: 'string', title: 'Category ID', validation: (Rule) => Rule.required() },
                { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
                { name: 'color', type: 'string', title: 'Color' },
                { name: 'inputIds', type: 'array', of: [{ type: 'string' }], title: 'Input IDs to Include' },
              ],
            },
          ],
        }),
        defineField({
          name: 'benchmarks',
          title: 'Industry Benchmarks',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'industry', type: 'string', title: 'Industry', validation: (Rule) => Rule.required() },
                { name: 'metrics', type: 'object', title: 'Benchmark Metrics' },
              ],
            },
          ],
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get Detailed Analysis',
        }),
        defineField({
          name: 'ctaHref',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/contact',
        }),
        defineField({
          name: 'downloadEnabled',
          title: 'Enable PDF Download',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'shareEnabled',
          title: 'Enable Sharing',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'emailCapture',
      title: 'Email Capture Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'enabled',
          title: 'Enabled',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Download Your Full ROI Report',
        }),
        defineField({
          name: 'description',
          title: 'Description',
          type: 'text',
          rows: 2,
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
          initialValue: 'Email My Report',
        }),
        defineField({
          name: 'privacyText',
          title: 'Privacy Text',
          type: 'string',
          initialValue: 'We respect your privacy. Unsubscribe anytime.',
        }),
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
    defineField({
      name: 'isActive',
      title: 'Active Calculator',
      type: 'boolean',
      initialValue: true,
      description: 'Only one calculator can be active at a time',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      isActive: 'isActive',
    },
    prepare({ title, slug, isActive }) {
      return {
        title,
        subtitle: `${slug} • ${isActive ? '🟢 Active' : '⚪ Inactive'}`,
      }
    },
  },
})