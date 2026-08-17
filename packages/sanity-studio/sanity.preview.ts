// @flowtaris/sanity-studio - Preview Configuration
import { definePreviewConfig } from 'sanity/preview'

export const previewConfig = definePreviewConfig({
  origin: 'https://flowtaris-ai.sanity.studio',
  previewSecret: process.env.SANITY_PREVIEW_SECRET,
  previewUrls: [
    { title: 'Home', url: '/' },
    { title: 'Capabilities', url: '/capabilities' },
    { title: 'Case Studies', url: '/case-studies' },
    { title: 'Insights', url: '/insights' },
    { title: 'Platforms', url: '/platforms' },
    { title: 'Assessment', url: '/assessment' },
    { title: 'ROI Calculator', url: '/roi-calculator' },
    { title: 'Cost of Inaction', url: '/cost-of-inaction' },
    { title: 'Innovation Lab', url: '/innovation-lab' },
    { title: 'About', url: '/about' },
    { title: 'Contact', url: '/contact' },
  ],
})