import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'assessmentConfig',
  title: 'Assessment Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Assessment Title',
      type: 'string',
      initialValue: 'AI Readiness Assessment',
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
      description: 'Shown on the landing page before starting',
    }),
    defineField({
      name: 'introSteps',
      title: 'Introduction Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Step Title', validation: (Rule) => Rule.required() },
            { name: 'content', type: 'text', title: 'Content', rows: 3, validation: (Rule) => Rule.required() },
            { name: 'icon', type: 'string', title: 'Icon (Lucide name)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Assessment Sections',
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
              name: 'questions',
              title: 'Questions',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'id',
                      title: 'Question ID',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'text',
                      title: 'Question Text',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'type',
                      title: 'Question Type',
                      type: 'string',
                      options: {
                        list: [
                          { title: 'Single Choice', value: 'single' },
                          { title: 'Multiple Choice', value: 'multiple' },
                          { title: 'Scale (1-5)', value: 'scale' },
                          { title: 'Scale (1-10)', value: 'scale10' },
                          { title: 'Yes/No', value: 'boolean' },
                          { title: 'Text Input', value: 'text' },
                        ],
                      },
                      initialValue: 'single',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'required',
                      title: 'Required',
                      type: 'boolean',
                      initialValue: true,
                    }),
                    defineField({
                      name: 'options',
                      title: 'Options (for choice types)',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          fields: [
                            { name: 'value', type: 'string', title: 'Value', validation: (Rule) => Rule.required() },
                            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
                            { name: 'score', type: 'number', title: 'Score Weight' },
                            { name: 'description', type: 'string', title: 'Description' },
                          ],
                        },
                      ],
                    }),
                    defineField({
                      name: 'minLabel',
                      title: 'Min Label (for scales)',
                      type: 'string',
                    }),
                    defineField({
                      name: 'maxLabel',
                      title: 'Max Label (for scales)',
                      type: 'string',
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
                      description: 'Used for scoring breakdown (e.g., strategy, data, talent, technology, governance)',
                    }),
                    defineField({
                      name: 'weight',
                      title: 'Weight',
                      type: 'number',
                      initialValue: 1,
                      description: 'Relative importance in scoring',
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
      name: 'scoring',
      title: 'Scoring Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'maxScore',
          title: 'Maximum Possible Score',
          type: 'number',
          initialValue: 100,
        }),
        defineField({
          name: 'tiers',
          title: 'Maturity Tiers',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'name', type: 'string', title: 'Tier Name', validation: (Rule) => Rule.required() },
                { name: 'label', type: 'string', title: 'Display Label', validation: (Rule) => Rule.required() },
                { name: 'minScore', type: 'number', title: 'Min Score', validation: (Rule) => Rule.required() },
                { name: 'maxScore', type: 'number', title: 'Max Score', validation: (Rule) => Rule.required() },
                { name: 'color', type: 'string', title: 'Color (hex or CSS var)' },
                { name: 'icon', type: 'string', title: 'Icon (Lucide name)' },
                { name: 'description', type: 'text', title: 'Description', rows: 3 },
                { name: 'recommendations', type: 'array', of: [{ type: 'string' }], title: 'Recommendations' },
              ],
            },
          ],
          validation: (Rule) => Rule.required().min(2),
        }),
        defineField({
          name: 'categoryWeights',
          title: 'Category Weights',
          type: 'object',
          fields: [
            { name: 'strategy', type: 'number', title: 'Strategy Weight', initialValue: 1 },
            { name: 'data', type: 'number', title: 'Data Weight', initialValue: 1 },
            { name: 'talent', type: 'number', title: 'Talent Weight', initialValue: 1 },
            { name: 'technology', type: 'number', title: 'Technology Weight', initialValue: 1 },
            { name: 'governance', type: 'number', title: 'Governance Weight', initialValue: 1 },
          ],
        }),
      ],
    }),
    defineField({
      name: 'results',
      title: 'Results Page Configuration',
      type: 'object',
      fields: [
        defineField({
          name: 'headline',
          title: 'Headline',
          type: 'string',
          initialValue: 'Your AI Readiness Score',
        }),
        defineField({
          name: 'subHeadline',
          title: 'Sub-headline',
          type: 'string',
        }),
        defineField({
          name: 'showBenchmark',
          title: 'Show Industry Benchmark',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'benchmarkLabel',
          title: 'Benchmark Label',
          type: 'string',
          initialValue: 'Industry Average',
        }),
        defineField({
          name: 'showCategoryBreakdown',
          title: 'Show Category Breakdown',
          type: 'boolean',
          initialValue: true,
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
          initialValue: 'Get Your Custom Roadmap',
        }),
        defineField({
          name: 'ctaHref',
          title: 'CTA Link',
          type: 'string',
          initialValue: '/contact',
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
          initialValue: 'Get Your Detailed Report',
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
      title: 'Active Assessment',
      type: 'boolean',
      initialValue: true,
      description: 'Only one assessment can be active at a time',
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