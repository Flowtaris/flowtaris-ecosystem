import type { Meta, StoryObj } from '@storybook/react'
import { Footer } from './Footer'

const meta: Meta<typeof Footer> = {
  title: 'Patterns/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Comprehensive footer with columns, social links, legal links, and newsletter signup.',
      },
    },
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {
  args: {
    logo: { text: 'Flowtaris AI', href: '/' },
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Capabilities', href: '/capabilities' },
          { label: 'Platforms', href: '/platforms' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Documentation', href: '/docs' },
          { label: 'Insights', href: '/insights' },
          { label: 'API Reference', href: '/api-docs' },
          { label: 'Changelog', href: '/changelog' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Careers', href: '/careers' },
          { label: 'Contact', href: '/contact' },
          { label: 'Press', href: '/press' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Privacy', href: '/privacy' },
          { label: 'Terms', href: '/terms' },
          { label: 'Security', href: '/security' },
          { label: 'Cookies', href: '/cookies' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'twitter', href: 'https://twitter.com/flowtaris', label: 'Twitter' },
      { platform: 'github', href: 'https://github.com/flowtaris', label: 'GitHub' },
      { platform: 'linkedin', href: 'https://linkedin.com/company/flowtaris', label: 'LinkedIn' },
      { platform: 'discord', href: 'https://discord.gg/flowtaris', label: 'Discord' },
    ],
    copyright: '© 2026 Flowtaris AI. All rights reserved.',
  },
}

export const Minimal: Story = {
  args: {
    logo: { text: 'Flowtaris', href: '/' },
    columns: [
      {
        title: 'Product',
        links: [
          { label: 'Features', href: '/features' },
          { label: 'Pricing', href: '/pricing' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    socialLinks: [
      { platform: 'twitter', href: 'https://twitter.com/flowtaris', label: 'Twitter' },
      { platform: 'github', href: 'https://github.com/flowtaris', label: 'GitHub' },
    ],
    copyright: '© 2024 Flowtaris. All rights reserved.',
  },
}

export const WithNewsletter: Story = {
  args: {
    ...Default.args,
    newsletter: {
      title: 'Stay Updated',
      description: 'Get the latest updates on AI-powered design tools.',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      action: '/api/newsletter',
    },
  },
}

export const DarkTheme: Story = {
  args: {
    ...Default.args,
  },
  decorators: [
    (Story) => (
      <div className="bg-brand-navy-950 min-h-screen">
        <Story />
      </div>
    ),
  ],
}