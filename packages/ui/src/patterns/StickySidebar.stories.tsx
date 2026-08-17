import type { Meta, StoryObj } from '@storybook/react'
import { StickySidebar } from '../patterns/StickySidebar'

const meta: Meta<typeof StickySidebar> = {
  title: 'Patterns/StickySidebar',
  component: StickySidebar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sticky sidebar with scroll spy, active section highlighting, collapsible nested items, progress indicator, and responsive mobile drawer behavior.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    offsetTop: { control: 'number', min: 0, max: 200, step: 8 },
    offsetBottom: { control: 'number', min: 0, max: 200, step: 8 },
    showProgress: { control: 'boolean' },
    collapseOnMobile: { control: 'boolean' },
    collapsible: { control: 'boolean' },
    mobileBreakpoint: { control: 'number', min: 600, max: 1400, step: 100 },
  },
}

export default meta
type Story = StoryObj<typeof StickySidebar>

const sampleItems = [
  { id: '1', label: 'Getting Started', href: '#getting-started' },
  { id: '2', label: 'Installation', href: '#installation' },
  { id: '3', label: 'Quick Start', href: '#quick-start' },
  {
    id: '4',
    label: 'Core Concepts',
    children: [
      { id: '4-1', label: 'Design Tokens', href: '#design-tokens' },
      { id: '4-2', label: 'Color System', href: '#color-system' },
      { id: '4-3', label: 'Typography', href: '#typography' },
      { id: '4-4', label: 'Spacing', href: '#spacing' },
    ],
  },
  {
    id: '5',
    label: 'Components',
    children: [
      { id: '5-1', label: 'Primitives', href: '#primitives' },
      { id: '5-2', label: 'Button', href: '#button' },
      { id: '5-3', label: 'Card', href: '#card' },
      { id: '5-4', label: 'Form', href: '#form' },
    ],
  },
  {
    id: '6',
    label: 'Epic Components',
    children: [
      { id: '6-1', label: 'ParallaxLayers', href: '#parallax-layers' },
      { id: '6-2', label: 'SplitText', href: '#split-text' },
      { id: '6-3', label: 'FloatingProduct', href: '#floating-product' },
      { id: '6-4', label: 'IrisWindow', href: '#iris-window' },
    ],
  },
  { id: '7', label: 'Patterns', href: '#patterns' },
  { id: '8', label: 'Layout', href: '#layout' },
  { id: '9', label: 'Navigation', href: '#navigation' },
  { id: '10', label: 'Forms', href: '#forms' },
  { id: '11', label: 'Feedback', href: '#feedback' },
  { id: '12', label: 'Overlay', href: '#overlay' },
  { id: '13', label: 'Data Display', href: '#data-display' },
]

export const Default: Story = {
  args: {
    items: sampleItems,
    showProgress: true,
    collapsible: true,
    defaultExpanded: ['4', '5', '6'],
    offsetTop: 100,
    offsetBottom: 100,
  },
}

export const NoProgress: Story = {
  args: {
    ...Default.args,
    showProgress: false,
  },
}

export const NotCollapsible: Story = {
  args: {
    ...Default.args,
    collapsible: false,
  },
}

export const AllCollapsed: Story = {
  args: {
    ...Default.args,
    defaultExpanded: [],
  },
}

export const AllExpanded: Story = {
  args: {
    ...Default.args,
    defaultExpanded: ['4', '5', '6'],
  },
}

export const SimpleItems: Story = {
  args: {
    items: [
      { id: 'a', label: 'Introduction', href: '#intro' },
      { id: 'b', label: 'Features', href: '#features' },
      { id: 'c', label: 'Pricing', href: '#pricing' },
      { id: 'd', label: 'Documentation', href: '#docs' },
      { id: 'e', label: 'Community', href: '#community' },
      { id: 'f', label: 'Changelog', href: '#changelog' },
    ],
    showProgress: true,
    offsetTop: 80,
    offsetBottom: 80,
  },
}

export const DeepNesting: Story = {
  args: {
    items: [
      {
        id: 'level1',
        label: 'Level 1',
        children: [
          {
            id: 'level1-1',
            label: 'Level 1.1',
            children: [
              { id: 'level1-1-1', label: 'Level 1.1.1', href: '#l111' },
              { id: 'level1-1-2', label: 'Level 1.1.2', href: '#l112' },
            ],
          },
          {
            id: 'level1-2',
            label: 'Level 1.2',
            children: [
              { id: 'level1-2-1', label: 'Level 1.2.1', href: '#l121' },
            ],
          },
        ],
      },
      { id: 'level2', label: 'Level 2', href: '#level2' },
    ],
    showProgress: false,
    collapsible: true,
    defaultExpanded: ['level1'],
  },
}

export const MobileDrawer: Story = {
  args: {
    ...Default.args,
    collapseOnMobile: true,
    mobileBreakpoint: 1024,
  },
}

export const AlwaysExpanded: Story = {
  args: {
    ...Default.args,
    collapseOnMobile: false,
  },
}

export const CustomOffsets: Story = {
  args: {
    ...Default.args,
    offsetTop: 120,
    offsetBottom: 120,
  },
}

export const WithActiveId: Story = {
  args: {
    ...Default.args,
    activeId: '5-2',
    onItemClick: (id) => console.log('Item clicked:', id),
  },
}

export const DisabledItems: Story = {
  args: {
    items: [
      { id: '1', label: 'Available Item', href: '#item1' },
      { id: '2', label: 'Disabled Item', href: '#item2', disabled: true },
      { id: '3', label: 'Another Available', href: '#item3' },
      {
        id: '4',
        label: 'Section with disabled children',
        children: [
          { id: '4-1', label: 'Available child', href: '#child1' },
          { id: '4-2', label: 'Disabled child', href: '#child2', disabled: true },
          { id: '4-3', label: 'Another available', href: '#child3' },
        ],
      },
    ],
    showProgress: true,
    defaultExpanded: ['4'],
  },
}

// For proper Storybook rendering, we need content sections that match the hrefs
export const WithContentSections: Story = {
  render: () => (
    <div className="flex min-h-[800px]">
      <div className="w-72 flex-shrink-0">
        <StickySidebar
          items={sampleItems}
          showProgress={true}
          collapsible={true}
          defaultExpanded={['4', '5', '6']}
          offsetTop={100}
          offsetBottom={100}
        />
      </div>
      <div className="flex-1 p-8 space-y-20" style={{ minWidth: 0 }}>
        <section id="getting-started" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Getting Started</h2>
          <p className="text-body-lg text-neutral-400">Welcome to Flowtaris AI Design System</p>
        </section>
        <section id="installation" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Installation</h2>
          <p className="text-body-lg text-neutral-400">npm install @repo/ui</p>
        </section>
        <section id="quick-start" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Quick Start</h2>
          <p className="text-body-lg text-neutral-400">Import and use components</p>
        </section>
        <section id="design-tokens" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Design Tokens</h2>
          <p className="text-body-lg text-neutral-400">Colors, typography, spacing, motion, shadows, z-index, breakpoints</p>
        </section>
        <section id="color-system" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Color System</h2>
          <p className="text-body-lg text-neutral-400">CVD-safe, WCAG AA compliant palette</p>
        </section>
        <section id="typography" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Typography</h2>
          <p className="text-body-lg text-neutral-400">Fluid clamp, 3 font families</p>
        </section>
        <section id="spacing" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Spacing</h2>
          <p className="text-body-lg text-neutral-400">8px base scale system</p>
        </section>
        <section id="primitives" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Primitives</h2>
          <p className="text-body-lg text-neutral-400">Button, Input, Card, Code, Layout</p>
        </section>
        <section id="button" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Button</h2>
          <p className="text-body-lg text-neutral-400">6 variants, 4 sizes, loading, icons</p>
        </section>
        <section id="card" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Card</h2>
          <p className="text-body-lg text-neutral-400">CardHeader, CardTitle, CardContent, CardFooter</p>
        </section>
        <section id="form" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Form</h2>
          <p className="text-body-lg text-neutral-400">Label, Input, Textarea, Select, Checkbox, Radio, Switch</p>
        </section>
        <section id="parallax-layers" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">ParallaxLayers</h2>
          <p className="text-body-lg text-neutral-400">6 layers, perspective, reduced motion</p>
        </section>
        <section id="split-text" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">SplitText</h2>
          <p className="text-body-lg text-neutral-400">Character/word/line splitting with stagger</p>
        </section>
        <section id="floating-product" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">FloatingProduct</h2>
          <p className="text-body-lg text-neutral-400">3D showcase with parallax, drag, rotation</p>
        </section>
        <section id="iris-window" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">IrisWindow</h2>
          <p className="text-body-lg text-neutral-400">SVG aperture with blades, curvature, glow</p>
        </section>
        <section id="patterns" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Patterns</h2>
          <p className="text-body-lg text-neutral-400">Hero, ScrollReveal, StickySidebar</p>
        </section>
        <section id="layout" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Layout</h2>
          <p className="text-body-lg text-neutral-400">Container, Stack, Grid, Section</p>
        </section>
        <section id="navigation" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Navigation</h2>
          <p className="text-body-lg text-neutral-400">Navbar, Tabs, Breadcrumbs, Pagination</p>
        </section>
        <section id="forms" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Forms</h2>
          <p className="text-body-lg text-neutral-400">Complete form system with validation</p>
        </section>
        <section id="feedback" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Feedback</h2>
          <p className="text-body-lg text-neutral-400">Alert, Progress, Spinner, Toast, Modal</p>
        </section>
        <section id="overlay" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Overlay</h2>
          <p className="text-body-lg text-neutral-400">Portal, Dialog, Drawer, Popover, Dropdown</p>
        </section>
        <section id="data-display" className="h-64">
          <h2 className="text-display-sm text-gradient-brand mb-4">Data Display</h2>
          <p className="text-body-lg text-neutral-400">Badge, Tag, Avatar, Stat, Table, DataList</p>
        </section>
      </div>
    </div>
  ),
}