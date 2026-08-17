import type { Meta, StoryObj } from '@storybook/react'
import { Header } from './Header'

const meta: Meta<typeof Header> = {
  title: 'Patterns/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Full-featured header/navigation with logo, navigation items, actions, and mobile responsive menu.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'transparent', 'solid', 'glass'] },
    position: { control: 'select', options: ['fixed', 'static', 'sticky'] },
  },
}

export default meta
type Story = StoryObj<typeof Header>

export const Default: Story = {
  args: {
    logo: {
      text: 'Flowtaris AI',
      href: '/',
    },
    navigation: [
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'Platforms', href: '/platforms' },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Insights', href: '/insights' },
    ],
    actions: [
      { label: 'Sign In', href: '/login', variant: 'ghost' },
      { label: 'Get Started', href: '/assessment', variant: 'primary' },
    ],
  },
}

export const Transparent: Story = {
  args: {
    ...Default.args,
    variant: 'transparent',
  },
}

export const Glass: Story = {
  args: {
    ...Default.args,
    variant: 'glass',
  },
}

export const Solid: Story = {
  args: {
    ...Default.args,
    variant: 'solid',
  },
}

export const WithDropdown: Story = {
  args: {
    logo: { text: 'Flowtaris AI', href: '/' },
    navigation: [
      { label: 'Capabilities', href: '/capabilities' },
      {
        label: 'Platforms',
        href: '/platforms',
        children: [
          { label: 'NetSuite', href: '/platforms/netsuite' },
          { label: 'Coupa', href: '/platforms/coupa' },
          { label: 'SAP', href: '/platforms/sap' },
          { label: 'Workday', href: '/platforms/workday' },
        ],
      },
      { label: 'Case Studies', href: '/case-studies' },
      { label: 'Insights', href: '/insights' },
    ],
    actions: [
      { label: 'Sign In', href: '/login', variant: 'ghost' },
      { label: 'Get Started', href: '/assessment', variant: 'primary' },
    ],
  },
}

export const Minimal: Story = {
  args: {
    logo: { text: 'Flowtaris', href: '/' },
    navigation: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
    ],
    actions: [
      { label: 'Get Started', href: '/signup', variant: 'primary' },
    ],
  },
}