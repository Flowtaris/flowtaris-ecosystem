import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteConfig',
  title: 'Site Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Flowtaris AI',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      initialValue: 'https://flowtaris.ai',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'navigation',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'href', type: 'string', title: 'Href' },
            { name: 'children', type: 'array', of: [{ type: 'string' }], title: 'Children (for dropdowns)' },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'twitter', type: 'url', title: 'Twitter/X' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'github', type: 'url', title: 'GitHub' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
      ],
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
    }),
    defineField({
      name: 'privacyPolicyUrl',
      title: 'Privacy Policy URL',
      type: 'url',
    }),
    defineField({
      name: 'termsOfServiceUrl',
      title: 'Terms of Service URL',
      type: 'url',
    }),
    defineField({
      name: 'cookiePolicyUrl',
      title: 'Cookie Policy URL',
      type: 'url',
    }),
    defineField({
      name: 'analytics',
      title: 'Analytics Configuration',
      type: 'object',
      fields: [
        { name: 'gaMeasurementId', type: 'string', title: 'GA4 Measurement ID' },
        { name: 'gtmContainerId', type: 'string', title: 'GTM Container ID' },
        { name: 'enableAnalytics', type: 'boolean', title: 'Enable Analytics', initialValue: true },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'Default SEO',
      type: 'object',
      fields: [
        { name: 'defaultTitle', type: 'string', title: 'Default Title' },
        { name: 'defaultDescription', type: 'text', title: 'Default Description', rows: 3 },
        { name: 'defaultOgImage', type: 'image', title: 'Default OG Image', options: { hotspot: true } },
        { name: 'twitterHandle', type: 'string', title: 'Twitter Handle' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Configuration',
        subtitle: 'Global settings',
      }
    },
  },
})