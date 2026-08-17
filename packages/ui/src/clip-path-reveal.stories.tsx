import type { Meta, StoryObj } from '@storybook/react'
import { ClipPathReveal, ClipPathText } from './clip-path-reveal'

const meta: Meta<typeof ClipPathReveal> = {
  title: 'Epic/ClipPathReveal',
  component: ClipPathReveal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Clip-path based reveal animations with 13 built-in shapes, scroll-triggered or manual progress control.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    shape: {
      control: 'select',
      options: ['wave', 'circle', 'polygon-3', 'polygon-4', 'polygon-5', 'polygon-6', 'polygon-8', 'scallop', 'zigzag', 'burst', 'diagonal', 'iris', 'slot'],
    },
    scrollTrigger: { control: 'boolean' },
    duration: { control: 'number', min: 100, max: 3000 },
    progress: { control: 'number', min: 0, max: 1 },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ClipPathReveal>

export const Wave: Story = {
  args: {
    shape: 'wave',
    scrollTrigger: false,
    progress: 1,
    duration: 1200,
    className: 'text-headline-lg text-brand-white text-center p-8 max-w-xl',
    children: (
      <p className="leading-relaxed">
        Wave reveal animation creates a flowing organic entrance effect.
      </p>
    ),
  },
}

export const Circle: Story = {
  args: {
    shape: 'circle',
    scrollTrigger: false,
    progress: 1,
    duration: 1000,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: (
      <p className="leading-relaxed">Circle reveal expands from center outward.</p>
    ),
  },
}

export const Polygon4: Story = {
  args: {
    shape: 'polygon-4',
    scrollTrigger: false,
    progress: 1,
    duration: 800,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Diamond-shaped reveal with sharp corners.</p>,
  },
}

export const Polygon6: Story = {
  args: {
    shape: 'polygon-6',
    scrollTrigger: false,
    progress: 1,
    duration: 900,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Hexagon reveal with geometric precision.</p>,
  },
}

export const Polygon8: Story = {
  args: {
    shape: 'polygon-8',
    scrollTrigger: false,
    progress: 1,
    duration: 1000,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Octagon reveal for sophisticated transitions.</p>,
  },
}

export const Scallop: Story = {
  args: {
    shape: 'scallop',
    scrollTrigger: false,
    progress: 1,
    duration: 1100,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Scalloped wave edge for playful reveals.</p>,
  },
}

export const Zigzag: Story = {
  args: {
    shape: 'zigzag',
    scrollTrigger: false,
    progress: 1,
    duration: 1000,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Sharp zigzag pattern for dynamic entrances.</p>,
  },
}

export const Burst: Story = {
  args: {
    shape: 'burst',
    scrollTrigger: false,
    progress: 1,
    duration: 1200,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Radial burst from center point.</p>,
  },
}

export const Diagonal: Story = {
  args: {
    shape: 'diagonal',
    scrollTrigger: false,
    progress: 1,
    duration: 900,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Diagonal sweep across the content.</p>,
  },
}

export const Iris: Story = {
  args: {
    shape: 'iris',
    scrollTrigger: false,
    progress: 1,
    duration: 1500,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Multi-blade iris aperture opening.</p>,
  },
}

export const Slot: Story = {
  args: {
    shape: 'slot',
    scrollTrigger: false,
    progress: 1,
    duration: 1000,
    className: 'text-headline-lg text-brand-white text-center p-8',
    children: <p>Vertical slot machine style reveal.</p>,
  },
}

export const ScrollTriggered: Story = {
  render: () => (
    <div style={{ height: '1000px' }}>
      <div className="space-y-8 pt-20 pb-20 px-4">
        <p className="text-center text-neutral-400">Scroll down to trigger reveals</p>
        <ClipPathReveal
          shape="wave"
          scrollTrigger={true}
          triggerStart="top 80%"
          triggerEnd="bottom 20%"
          duration={1200}
          className="text-headline-lg text-brand-white text-center max-w-2xl mx-auto p-8 glass rounded-2xl"
        >
          <p>This reveals when scrolled into view (80% threshold)</p>
        </ClipPathReveal>
        <div className="h-48" />
        <ClipPathReveal
          shape="polygon-6"
          scrollTrigger={true}
          triggerStart="top 80%"
          triggerEnd="bottom 20%"
          delay={200}
          duration={1000}
          className="text-headline-lg text-brand-white text-center max-w-2xl mx-auto p-8 glass rounded-2xl"
        >
          <p>Delayed reveal with polygon-6 shape</p>
        </ClipPathReveal>
        <div className="h-48" />
        <ClipPathReveal
          shape="circle"
          scrollTrigger={true}
          triggerStart="top 80%"
          triggerEnd="bottom 20%"
          delay={400}
          duration={900}
          className="text-headline-lg text-brand-white text-center max-w-2xl mx-auto p-8 glass rounded-2xl"
        >
          <p>Circle reveal with longer delay</p>
        </ClipPathReveal>
      </div>
    </div>
  ),
}

export const ManualProgress: Story = {
  render: () => (
    <div className="space-y-8">
      <ClipPathReveal
        shape="wave"
        scrollTrigger={false}
        progress={0.5}
        duration={1200}
        className="text-headline-lg text-brand-white text-center p-8 glass rounded-2xl"
      >
        <p>50% progress - partial reveal</p>
      </ClipPathReveal>
      <ClipPathReveal
        shape="wave"
        scrollTrigger={false}
        progress={1}
        duration={1200}
        className="text-headline-lg text-brand-white text-center p-8 glass rounded-2xl"
      >
        <p>100% progress - fully revealed</p>
      </ClipPathReveal>
    </div>
  ),
}

export const AllShapes: Story = {
  render: () => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[
        'wave', 'circle', 'polygon-3', 'polygon-4',
        'polygon-5', 'polygon-6', 'polygon-8', 'scallop',
        'zigzag', 'burst', 'diagonal', 'iris', 'slot',
      ].map((shape) => (
        <ClipPathReveal
          key={shape}
          shape={shape as any}
          scrollTrigger={false}
          progress={1}
          duration={800}
          className="text-body-sm text-brand-white text-center p-6 glass rounded-xl min-h-[120px] flex items-center justify-center"
        >
          <p>{shape}</p>
        </ClipPathReveal>
      ))}
    </div>
  ),
}

// ClipPathText Stories
export const ClipPathTextWave: Story = {
  render: () => (
    <ClipPathText
      split="words"
      stagger={80}
      progress={1}
      className="text-display-lg text-gradient-brand text-center"
    >
      CLIP PATH TEXT
    </ClipPathText>
  ),
}

export const ClipPathTextChars: Story = {
  render: () => (
    <ClipPathText
      split="chars"
      stagger={30}
      progress={1}
      className="text-display-lg text-gradient-brand text-center"
    >
      CHARACTER SPLIT
    </ClipPathText>
  ),
}

export const ClipPathTextLines: Story = {
  render: () => (
    <ClipPathText
      split="lines"
      stagger={100}
      progress={1}
      className="text-display-lg text-gradient-brand text-center"
    >
      LINE ONE
      LINE TWO
      LINE THREE
    </ClipPathText>
  ),
}