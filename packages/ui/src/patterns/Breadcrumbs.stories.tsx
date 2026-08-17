import type { Meta, StoryObj } from '@storybook/react'
import { BreadcrumbsPattern } from './Breadcrumbs'

const meta: Meta<typeof BreadcrumbsPattern> = {
  title: 'Patterns/BreadcrumbsPattern',
  component: BreadcrumbsPattern,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Breadcrumb navigation pattern with separators, truncation, and accessibility support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    separator: { control: 'select', options: ['chevron', 'slash', 'arrow', 'dot'] },
    maxItems: { control: 'number', min: 3, max: 10 },
    variant: { control: 'select', options: ['default', 'compact', 'minimal'] },
  },
}

export default meta
type Story = StoryObj<typeof BreadcrumbsPattern>

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Predictive Analytics', href: '/capabilities/predictive-analytics-engine' },
    ],
  },
}

export const Compact: Story = {
  args: {
    variant: 'compact',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Predictive Analytics', href: '/capabilities/predictive-analytics-engine' },
    ],
    separator: 'chevron',
  },
}

export const WithTruncation: Story = {
  args: {
    maxItems: 3,
    items: [
      { label: 'Home', href: '/' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Machine Learning', href: '/capabilities/category/ml' },
      { label: 'Predictive Analytics', href: '/capabilities/predictive-analytics-engine' },
      { label: 'Deep Dive', href: '/capabilities/predictive-analytics-engine/deep-dive' },
    ],
  },
}

export const Minimal: Story = {
  args: {
    variant: 'minimal',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Features', href: '/features' },
      { label: 'Button', href: '/components/button' },
    ],
    separator: 'slash',
  },
}

export const DeepNesting: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Platforms', href: '/platforms' },
      { label: 'NetSuite', href: '/platforms/netsuite' },
      { label: 'Integration Guide', href: '/platforms/netsuite/integration' },
      { label: 'Authentication', href: '/platforms/netsuite/integration/auth' },
      { label: 'OAuth Setup', href: '/platforms/netsuite/integration/auth/oauth' },
    ],
    maxItems: 4,
  },
}

export const RootOnly: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }],
  },
}