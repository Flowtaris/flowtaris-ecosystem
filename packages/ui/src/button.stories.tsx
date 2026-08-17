import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Versatile button component with 6 variants, 4 sizes, loading state, and icon support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'destructive', 'link'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    onClick: { action: 'clicked' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: { children: 'Primary Button', variant: 'primary' },
}

export const Secondary: Story = {
  args: { children: 'Secondary Button', variant: 'secondary' },
}

export const Tertiary: Story = {
  args: { children: 'Tertiary Button', variant: 'tertiary' },
}

export const Ghost: Story = {
  args: { children: 'Ghost Button', variant: 'ghost' },
}

export const Destructive: Story = {
  args: { children: 'Destructive Button', variant: 'destructive' },
}

export const Link: Story = {
  args: { children: 'Link Button', variant: 'link' },
}

export const Small: Story = {
  args: { children: 'Small Button', size: 'sm' },
}

export const Medium: Story = {
  args: { children: 'Medium Button', size: 'md' },
}

export const Large: Story = {
  args: { children: 'Large Button', size: 'lg' },
}

export const XLarge: Story = {
  args: { children: 'XLarge Button', size: 'xl' },
}

export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'primary',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    ),
    iconPosition: 'right',
  },
}

export const Loading: Story = {
  args: { children: 'Loading...', variant: 'primary', loading: true },
}

export const Disabled: Story = {
  args: { children: 'Disabled', variant: 'primary', disabled: true },
}

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="tertiary">Tertiary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">XLarge</Button>
    </div>
  ),
}