import type { Meta, StoryObj } from '@storybook/react'
import { CookieBanner } from './CookieBanner'

const meta: Meta<typeof CookieBanner> = {
  title: 'Patterns/CookieBanner',
  component: CookieBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Cookie consent banner with categorized preferences, granular control, and compliance-ready configuration.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: { control: 'select', options: ['bottom', 'top', 'bottom-left', 'bottom-right', 'floating'] },
    variant: { control: 'select', options: ['banner', 'modal', 'floating'] },
  },
}

export default meta
type Story = StoryObj<typeof CookieBanner>

const categories = [
  {
    id: 'necessary',
    name: 'Necessary',
    description: 'Required for the website to function properly. Cannot be disabled.',
    required: true,
    cookies: [
      { id: 'session', name: 'session_id', description: 'Maintains user session', duration: 'Session' },
      { id: 'csrf', name: 'csrf_token', description: 'Security token for forms', duration: '1 year' },
    ],
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Help us understand how visitors interact with our website.',
    required: false,
    cookies: [
      { id: 'ga', name: '_ga', description: 'Google Analytics identifier', duration: '2 years' },
      { id: 'ga4', name: '_ga_4', description: 'Google Analytics 4', duration: '2 years' },
    ],
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Used to deliver personalized advertisements.',
    required: false,
    cookies: [
      { id: 'fbp', name: '_fbp', description: 'Facebook Pixel', duration: '3 months' },
      { id: 'ads', name: 'ads_prefs', description: 'Ad preferences', duration: '1 year' },
    ],
  },
  {
    id: 'functional',
    name: 'Functional',
    description: 'Enable enhanced functionality and personalization.',
    required: false,
    cookies: [
      { id: 'lang', name: 'lang_pref', description: 'Language preference', duration: '1 year' },
      { id: 'theme', name: 'theme_pref', description: 'Theme preference', duration: '1 year' },
    ],
  },
]

export const Default: Story = {
  args: {
    categories,
    onAccept: (prefs) => console.log('Accepted:', prefs),
    onReject: () => console.log('Rejected all'),
    onSavePreferences: (prefs) => console.log('Saved preferences:', prefs),
    position: 'bottom',
    variant: 'banner',
    showPreferencesOnFirstVisit: true,
    brandName: 'Flowtaris AI',
    privacyPolicyUrl: '/privacy',
    cookiePolicyUrl: '/cookies',
  },
}

export const Floating: Story = {
  args: {
    ...Default.args,
    position: 'floating',
    variant: 'floating',
  },
}

export const Modal: Story = {
  args: {
    ...Default.args,
    variant: 'modal',
  },
}

export const TopBanner: Story = {
  args: {
    ...Default.args,
    position: 'top',
  },
}

export const BottomLeft: Story = {
  args: {
    ...Default.args,
    position: 'bottom-left',
  },
}

export const BottomRight: Story = {
  args: {
    ...Default.args,
    position: 'bottom-right',
  },
}

export const MinimalCategories: Story = {
  args: {
    categories: [
      {
        id: 'necessary',
        name: 'Necessary',
        description: 'Required for the website to function.',
        required: true,
        cookies: [{ id: 'session', name: 'session_id', description: 'Session cookie', duration: 'Session' }],
      },
      {
        id: 'analytics',
        name: 'Analytics',
        description: 'Help us improve the site.',
        required: false,
        cookies: [{ id: 'ga', name: '_ga', description: 'Analytics', duration: '2 years' }],
      },
    ],
    onAccept: (prefs) => console.log('Accepted:', prefs),
    onReject: () => console.log('Rejected'),
    onSavePreferences: (prefs) => console.log('Saved:', prefs),
    position: 'bottom',
    variant: 'banner',
    brandName: 'Flowtaris',
  },
}

export const CustomBranding: Story = {
  args: {
    ...Default.args,
    brandName: 'My Company',
    privacyPolicyUrl: 'https://example.com/privacy',
    cookiePolicyUrl: 'https://example.com/cookies',
  },
}

export const PreAccepted: Story = {
  args: {
    ...Default.args,
    // Simulate user already accepted
    initialPreferences: {
      necessary: true,
      analytics: true,
      marketing: false,
      functional: true,
    },
  },
}