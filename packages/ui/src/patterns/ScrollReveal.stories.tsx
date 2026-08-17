import type { Meta, StoryObj } from '@storybook/react'
import { ScrollReveal, StaggeredReveal } from '../patterns/ScrollReveal'
import { Card, CardHeader, CardTitle, CardContent } from '../card'

const meta: Meta<typeof ScrollReveal> = {
  title: 'Patterns/ScrollReveal',
  component: ScrollReveal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'IntersectionObserver-based scroll reveal animations with 18 variants, stagger support, and reduced motion compliance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right', 'slide-up', 'slide-down', 'slide-left', 'slide-right', 'scale', 'scale-up', 'flip-x', 'flip-y', 'blur', 'rotate'],
    },
    delay: { control: 'number', min: 0, max: 2000, step: 50 },
    duration: { control: 'number', min: 100, max: 3000, step: 50 },
    once: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof ScrollReveal>

// Individual variants
const variants = [
  'fade', 'fade-up', 'fade-down', 'fade-left', 'fade-right',
  'slide-up', 'slide-down', 'slide-left', 'slide-right',
  'scale', 'scale-up', 'flip-x', 'flip-y', 'blur', 'rotate',
] as const

// Individual variant stories
export const Fade: Story = { args: { variant: 'fade', children: <DemoBox label="fade" /> } }
export const FadeUp: Story = { args: { variant: 'fade-up', children: <DemoBox label="fade-up" /> } }
export const FadeDown: Story = { args: { variant: 'fade-down', children: <DemoBox label="fade-down" /> } }
export const FadeLeft: Story = { args: { variant: 'fade-left', children: <DemoBox label="fade-left" /> } }
export const FadeRight: Story = { args: { variant: 'fade-right', children: <DemoBox label="fade-right" /> } }
export const SlideUp: Story = { args: { variant: 'slide-up', children: <DemoBox label="slide-up" /> } }
export const SlideDown: Story = { args: { variant: 'slide-down', children: <DemoBox label="slide-down" /> } }
export const SlideLeft: Story = { args: { variant: 'slide-left', children: <DemoBox label="slide-left" /> } }
export const SlideRight: Story = { args: { variant: 'slide-right', children: <DemoBox label="slide-right" /> } }
export const Scale: Story = { args: { variant: 'scale', children: <DemoBox label="scale" /> } }
export const ScaleUp: Story = { args: { variant: 'scale-up', children: <DemoBox label="scale-up" /> } }
export const FlipX: Story = { args: { variant: 'flip-x', children: <DemoBox label="flip-x" /> } }
export const FlipY: Story = { args: { variant: 'flip-y', children: <DemoBox label="flip-y" /> } }
export const Blur: Story = { args: { variant: 'blur', children: <DemoBox label="blur" /> } }
export const Rotate: Story = { args: { variant: 'rotate', children: <DemoBox label="rotate" /> } }

export const WithDelay: Story = {
  args: {
    variant: 'fade-up',
    delay: 500,
    children: (
      <div className="w-64 h-48 bg-brand-cyan-500/20 border border-brand-cyan-500 flex items-center justify-center rounded-xl">
        <span className="text-brand-cyan-400 font-mono text-sm">500ms delay</span>
      </div>
    ),
  },
}

export const LongDuration: Story = {
  args: {
    variant: 'fade-up',
    duration: 1500,
    children: (
      <div className="w-64 h-48 bg-brand-cyan-500/20 border border-brand-cyan-500 flex items-center justify-center rounded-xl">
        <span className="text-brand-cyan-400 font-mono text-sm">1500ms duration</span>
      </div>
    ),
  },
}

export const TriggerOnce: Story = {
  args: {
    variant: 'fade-up',
    once: true,
    children: (
      <div className="w-64 h-48 bg-brand-cyan-500/20 border border-brand-cyan-500 flex items-center justify-center rounded-xl">
        <span className="text-brand-cyan-400 font-mono text-sm">Once only</span>
      </div>
    ),
  },
}

export const Repeatable: Story = {
  args: {
    variant: 'fade-up',
    once: false,
    children: (
      <div className="w-64 h-48 bg-brand-cyan-500/20 border border-brand-cyan-500 flex items-center justify-center rounded-xl">
        <span className="text-brand-cyan-400 font-mono text-sm">Repeats on scroll</span>
      </div>
    ),
  },
}

export const Disabled: Story = {
  args: {
    variant: 'fade-up',
    disabled: true,
    children: (
      <div className="w-64 h-48 bg-neutral-700/20 border border-neutral-700 flex items-center justify-center rounded-xl">
        <span className="text-neutral-500 font-mono text-sm">Disabled / Reduced Motion</span>
      </div>
    ),
  },
}

// StaggeredReveal stories
export const StaggeredCards: Story = {
  render: () => (
    <StaggeredReveal
      variant="fade-up"
      staggerDelay={100}
      duration={600}
      containerProps={{ className: 'grid gap-4 md:grid-cols-3' }}
    >
      {['One', 'Two', 'Three', 'Four', 'Five', 'Six'].map((title, i) => (
        <Card key={i} className="glass hover:glass-strong transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-headline-sm">{title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-body-md text-neutral-400">
              Staggered reveal item {i + 1} with {i * 100}ms delay
            </p>
          </CardContent>
        </Card>
      ))}
    </StaggeredReveal>
  ),
}

export const StaggeredList: Story = {
  render: () => (
    <StaggeredReveal
      variant="slide-up"
      staggerDelay={80}
      duration={500}
      containerProps={{ className: 'space-y-3 max-w-md' }}
    >
      {['First item in the list', 'Second item follows', 'Third item appears', 'Fourth continues', 'Fifth completes'].map((text, i) => (
        <div
          key={i}
          className="flex items-center gap-3 p-4 glass rounded-xl group hover:glass-strong transition-all duration-300"
        >
          <div className="w-8 h-8 rounded-full bg-brand-cyan-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-brand-cyan-400 font-bold text-sm">{i + 1}</span>
          </div>
          <span className="text-body-md">{text}</span>
        </div>
      ))}
    </StaggeredReveal>
  ),
}

export const StaggeredSlow: Story = {
  render: () => (
    <StaggeredReveal
      variant="scale"
      staggerDelay={150}
      duration={800}
      containerProps={{ className: 'flex flex-wrap gap-4 justify-center' }}
    >
      {['A', 'B', 'C', 'D', 'E'].map((letter, i) => (
        <div
          key={i}
          className="w-24 h-24 rounded-xl bg-brand-cyan-500/20 border border-brand-cyan-500 flex items-center justify-center text-2xl font-display text-brand-cyan-400"
        >
          {letter}
        </div>
      ))}
    </StaggeredReveal>
  ),
}

export const AllVariantsGrid: Story = {
  render: () => (
    <StaggeredReveal
      variant="fade-up"
      staggerDelay={50}
      duration={500}
      containerProps={{ className: 'grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3' }}
    >
      {variants.map((variant) => (
        <div
          key={variant}
          className="aspect-square rounded-lg bg-brand-cyan-500/10 border border-brand-cyan-500/30 flex flex-col items-center justify-center p-2 text-center"
        >
          <div className="w-12 h-12 rounded bg-brand-cyan-500/20 mb-2 flex items-center justify-center">
            <span className="text-brand-cyan-400 font-mono text-xs">��</span>
          </div>
          <span className="text-body-xs text-brand-cyan-300 font-mono">{variant}</span>
        </div>
      ))}
    </StaggeredReveal>
  ),
}