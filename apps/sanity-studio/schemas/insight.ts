import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'insight',
  title: 'Insight / Blog Post',
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
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary for listings and SEO',
      validation: (Rule) => Rule.required().max(300),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },
        {
          type: 'object',
          name: 'codeBlock',
          title: 'Code Block',
          fields: [
            { name: 'code', type: 'text', title: 'Code', rows: 10 },
            { name: 'language', type: 'string', title: 'Language', options: { list: ['typescript', 'javascript', 'python', 'sql', 'json', 'yaml', 'bash'] } },
          ],
        },
        {
          type: 'object',
          name: 'callout',
          title: 'Callout Box',
          fields: [
            { name: 'type', type: 'string', title: 'Type', options: { list: ['info', 'warning', 'success', 'note'] } },
            { name: 'content', type: 'text', title: 'Content', rows: 3 },
          ],
        },
      ],
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        { name: 'alt', type: 'string', title: 'Alt Text' },
      ],
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
            { name: 'role', type: 'string', title: 'Role' },
            { name: 'avatar', type: 'image', title: 'Avatar', options: { hotspot: true } },
            { name: 'bio', type: 'text', title: 'Bio', rows: 2 },
            { name: 'linkedin', type: 'url', title: 'LinkedIn URL' },
            { name: 'twitter', type: 'url', title: 'Twitter URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: ['Product Updates', 'Technical Deep Dives', 'Customer Stories', 'Industry Trends', 'Research', 'Best Practices', 'Announcements'],
          },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'relatedPlatforms',
      title: 'Related Platforms',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformPage' }] }],
    }),
    defineField({
      name: 'relatedCapabilities',
      title: 'Related Capabilities',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'aiCapability' }] }],
    }),
    defineField({
      name: 'relatedCaseStudies',
      title: 'Related Case Studies',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Post',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'readTime',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated reading time',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Override',
      type: 'object',
      fields: [
        { name: 'title', type: 'string', title: 'Meta Title' },
        { name: 'description', type: 'text', title: 'Meta Description', rows: 3 },
        { name: 'ogImage', type: 'image', title: 'OG Image', options: { hotspot: true } },
        { name: 'noIndex', type: 'boolean', title: 'No Index', initialValue: false },
        { name: 'canonicalUrl', type: 'url', title: 'Canonical URL' },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'coverImage',
      authors: 'authors',
    },
    prepare({ title, subtitle, authors }) {
      const authorNames = authors?.map((a: any) => a?.name).join(', ') || ''
      const date = subtitle ? new Date(subtitle).toLocaleDateString() : ''
      return {
        title,
        subtitle: `${date} • ${authorNames}`,
      }
    },
  },
  orderings: [
    {
      title: 'Published Date, Newest',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Oldest',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
  ],
})