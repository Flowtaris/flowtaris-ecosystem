// @repo/ui - Card Stories
import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, CardAction } from '../card'

const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible card component with header, title, description, content, footer, and action slots.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'elevated', 'outlined', 'ghost'],
      description: 'Card style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Card padding size',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
  },
}

export default meta
type Story = StoryObj<typeof Card>

// Default
export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here to provide context.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-md text-neutral-600 dark:text-neutral-400">
          This is the card content area. You can put any content here including text, images, forms, or other components.
        </p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <button className="text-brand-cyan-600 hover:underline">Learn more</button>
        </CardAction>
      </CardFooter>
    </Card>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
      <Card variant="default" className="h-64">
        <CardContent className="flex flex-col items-center justify-center text-center p-4">
          <h3 className="font-semibold mb-2">Default</h3>
          <p className="text-sm text-neutral-500">Subtle shadow</p>
        </CardContent>
      </Card>
      <Card variant="bordered" className="h-64">
        <CardContent className="flex flex-col items-center justify-center text-center p-4">
          <h3 className="font-semibold mb-2">Bordered</h3>
          <p className="text-sm text-neutral-500">Visible border</p>
        </CardContent>
      </Card>
      <Card variant="elevated" className="h-64">
        <CardContent className="flex flex-col items-center justify-center text-center p-4">
          <h3 className="font-semibold mb-2">Elevated</h3>
          <p className="text-sm text-neutral-500">Stronger shadow</p>
        </CardContent>
      </Card>
      <Card variant="outlined" className="h-64">
        <CardContent className="flex flex-col items-center justify-center text-center p-4">
          <h3 className="font-semibold mb-2">Outlined</h3>
          <p className="text-sm text-neutral-500">Border + shadow</p>
        </CardContent>
      </Card>
      <Card variant="ghost" className="h-64">
        <CardContent className="flex flex-col items-center justify-center text-center p-4">
          <h3 className="font-semibold mb-2">Ghost</h3>
          <p className="text-sm text-neutral-500">Minimal style</p>
        </CardContent>
      </Card>
    </div>
  ),
}

// With Image
export const WithImage: Story = {
  render: () => (
    <Card variant="elevated" className="w-80 overflow-hidden">
      <div className="h-48 bg-gradient-to-br from-brand-cyan-500 to-brand-cyan-700" />
      <CardHeader className="p-6">
        <CardTitle>Dashboard Analytics</CardTitle>
        <CardDescription>Track your key metrics and performance indicators in real-time.</CardDescription>
      </CardHeader>
      <CardContent className="px-6 pb-4">
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">Total Users</span>
            <span className="font-semibold">24,581</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">Revenue</span>
            <span className="font-semibold text-brand-cyan-600">$127,430</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neutral-600 dark:text-neutral-400">Conversion</span>
            <span className="font-semibold">3.24%</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-6 pb-6 flex justify-end">
        <button className="text-sm font-medium text-brand-cyan-600 hover:text-brand-cyan-700">
          View Report →
        </button>
      </CardFooter>
    </Card>
  ),
}

// Interactive/Hoverable
export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} variant="bordered" hoverable className="h-56 cursor-pointer">
          <CardContent className="flex flex-col items-center justify-center text-center h-full p-6">
            <div className="w-12 h-12 rounded-xl bg-brand-cyan-100 dark:bg-brand-cyan-900/30 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-brand-cyan-600 dark:text-brand-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold mb-1">Feature {i}</h3>
            <p className="text-sm text-neutral-500">Hover to see the effect with elevated shadow and border highlight.</p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
}

// Complex Content
export const ComplexContent: Story = {
  render: () => (
    <Card variant="elevated" className="w-96">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>AI-Powered Analytics Platform</CardDescription>
          </div>
          <span className="mt-1 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
            Active
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-neutral-600 dark:text-neutral-400">Progress</span>
            <span className="font-medium">68%</span>
          </div>
          <div className="h-2 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div className="h-full bg-brand-cyan-500 rounded-full transition-all duration-300" style={{ width: '68%' }} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
            <p className="text-2xl font-bold text-brand-cyan-600 dark:text-brand-cyan-400">12</p>
            <p className="text-xs text-neutral-500">Tasks Done</p>
          </div>
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
            <p className="text-2xl font-bold text-brand-cyan-600 dark:text-brand-cyan-400">5</p>
            <p className="text-xs text-neutral-500">In Progress</p>
          </div>
          <div className="p-3 bg-neutral-50 dark:bg-neutral-900/50 rounded-lg">
            <p className="text-2xl font-bold text-brand-cyan-600 dark:text-brand-cyan-400">3</p>
            <p className="text-xs text-neutral-500">Pending</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 ml-2" />
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 ml-2" />
          <span className="text-sm text-neutral-500">+4</span>
        </div>
        <button className="text-sm font-medium text-brand-cyan-600 hover:text-brand-cyan-700">
          View Details →
        </button>
      </CardFooter>
    </Card>
  ),
}

// Dark Mode
export const DarkMode: Story = {
  render: () => (
    <Card variant="elevated" className="w-80">
      <CardHeader>
        <CardTitle>Dark Mode Card</CardTitle>
        <CardDescription>Cards work beautifully in dark mode too.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-body-md">This card uses the elevated variant which looks great on dark backgrounds.</p>
      </CardContent>
      <CardFooter>
        <CardAction>
          <button className="text-brand-cyan-400 hover:text-brand-cyan-300">Action</button>
        </CardAction>
      </CardFooter>
    </Card>
  ),
  decorators: [
    (Story) => (
      <div className="dark p-8">
        <Story />
      </div>
    ),
  ],
}