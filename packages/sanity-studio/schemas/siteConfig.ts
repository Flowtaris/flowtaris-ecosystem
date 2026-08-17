// @flowtaris/sanity-studio - Site Config Schema
import { defineField, defineType } from 'sanity'
import { singletonAction } from './actions/singletonAction'

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  __experimental_actions: [singletonAction, 'discardChanges', 'restore'],
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'social', title: 'Social Links' },
    { name: 'schema', title: 'Schema.org' },
    { name: 'defaults', title: 'Defaults' },
  ],
  fields: [
    // General
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'Flowtaris AI',
      group: 'general',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
      initialValue: 'https://flowtaris.ai',
      group: 'general',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Where generative AI meets precision design',
      group: 'general',
    }),
    defineField({
      name: 'description',
      title: 'Default Description',
      type: 'text',
      rows: 3,
      initialValue: 'AI & Innovation platform for enterprise ERP automation. Capabilities, case studies, interactive tools, and innovation lab.',
      group: 'general',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),
    defineField({
      name: 'defaultOgImage',
      title: 'Default Open Graph Image',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
    }),

    // Navigation
    defineField({
      name: 'mainNavigation',
      title: 'Main Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
            { name: 'href', type: 'string', title: 'Href', validation: (Rule) => Rule.required() },
            { name: 'children', type: 'array', of: [{ type: 'object', fields: [
              { name: 'label', type: 'string', title: 'Label' },
              { name: 'href', type: 'string', title: 'Href' },
              { name: 'description', type: 'string', title: 'Description' },
            ]}], title: 'Mega Menu Items' },
          ],
        },
      ],
      group: 'navigation',
    }),
    defineField({
      name: 'ctaButtons',
      title: 'Header CTA Buttons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Href' },
            { name: 'variant', type: 'string', title: 'Variant', options: { list: ['default', 'outline', 'ghost'] } },
          ],
        },
      ],
      group: 'navigation',
    }),

    // Footer
    defineField({
      name: 'footerColumns',
      title: 'Footer Columns',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Column Title' },
            { name: 'links', type: 'array', of: [{ type: 'object', fields: [
              { name: 'label', type: 'string', title: 'Label' },
              { name: 'href', type: 'string', title: 'Href' },
            ]}], title: 'Links' },
          ],
        },
      ],
      group: 'footer',
    }),
    defineField({
      name: 'footerLegal',
      title: 'Legal Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Href' },
          ],
        },
      ],
      group: 'footer',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2026 Flowtaris. All rights reserved.',
      group: 'footer',
    }),

    // Social Links
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform', options: {
              list: ['twitter', 'linkedin', 'github', 'youtube', 'facebook', 'instagram'],
            }},
            { name: 'url', type: 'url', title: 'URL', validation: (Rule) => Rule.required() },
            { name: 'label', type: 'string', title: 'Accessibility Label' },
          ],
        },
      ],
      group: 'social',
    }),

    // Schema.org
    defineField({
      name: 'organization',
      title: 'Organization Schema',
      type: 'object',
      fields: [
        { name: 'name', type: 'string', title: 'Name', validation: (Rule) => Rule.required() },
        { name: 'url', type: 'url', title: 'URL' },
        { name: 'logo', type: 'image', title: 'Logo' },
        { name: 'sameAs', type: 'array', of: [{ type: 'url' }], title: 'SameAs URLs' },
        { name: 'knowAbout', type: 'array', of: [{ type: 'string' }], title: 'KnowAbout Entities' },
        { name: 'contactPoint', type: 'object', fields: [
          { name: 'telephone', type: 'string', title: 'Telephone' },
          { name: 'contactType', type: 'string', title: 'Contact Type' },
          { name: 'availableLanguage', type: 'array', of: [{ type: 'string' }], title: 'Available Languages' },
        ], title: 'Contact Point' },
      ],
      group: 'schema',
    }),

    // Defaults
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Default Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Default Meta Description', rows: 3 },
        { name: 'twitterCard', type: 'string', title: 'Default Twitter Card', options: { list: ['summary', 'summary_large_image'] } },
      ],
      group: 'defaults',
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics Configuration',
      type: 'object',
      fields: [
        { name: 'ga4MeasurementId', type: 'string', title: 'GA4 Measurement ID' },
        { name: 'gtmId', type: 'string', title: 'GTM Container ID' },
      ],
      group: 'defaults',
    }),
  ],
})