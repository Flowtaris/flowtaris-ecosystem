// @repo/ui - SplitText Stories
import type { Meta, StoryObj } from '@storybook/react'
import { SplitText, useSplitTextAnimation } from '../split-text'
import { useEffect, useRef } from 'react'

const meta: Meta<typeof SplitText> = {
  title: 'Epic/SplitText',
  component: SplitText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text splitting animation component with char/word/line splitting. Supports stagger animations for cinematic text reveals.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    split: {
      control: 'select',
      options: [['chars'], ['words'], ['lines'], ['chars', 'words'], ['words', 'lines'], ['chars', 'words', 'lines']],
      description: 'Split text into characters, words, and/or lines',
    },
    as: { control: 'select', options: ['div', 'span', 'p', 'h1', 'h2', 'h3'], description: 'HTML element to render' },
    className: { control: 'text', description: 'Additional CSS classes' },
    ariaLabel: { control: 'text', description: 'Accessibility label for the split text' },
  },
}

export default meta
type Story = StoryObj<typeof SplitText>

// Basic Split Types
export const SplitTypes: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Characters</h4>
        <SplitText split={['chars']} as="h2" className="text-display-md text-gradient-brand">
          Character Split
        </SplitText>
      </div>
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Words</h4>
        <SplitText split={['words']} as="h2" className="text-display-md text-gradient-brand">
          Word Split Animation
        </SplitText>
      </div>
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Lines</h4>
        <SplitText split={['lines']} as="h2" className="text-display-md text-gradient-brand">
          Line Split<br />Multiple Lines
        </SplitText>
      </div>
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Chars + Words + Lines</h4>
        <SplitText split={['chars', 'words', 'lines']} as="h2" className="text-display-md text-gradient-brand">
          Full Split<br />All Levels
        </SplitText>
      </div>
    </div>
  ),
}

// Animated Reveal
export const AnimatedReveal: Story = {
  render: () => {
    const ref = useRef<ReturnType<typeof SplitText>['ref']>(null)
    const api = useSplitTextAnimation(ref)

    useEffect(() => {
      const timer = setTimeout(() => {
        api.animateIn({ type: 'chars', stagger: 30, duration: 800 })
        api.animateIn({ type: 'words', stagger: 50, duration: 1000 })
      }, 300)
      return () => clearTimeout(timer)
    }, [api])

    return (
      <div className="p-8 max-w-4xl">
        <SplitText
          ref={ref}
          split={['chars', 'words', 'lines']}
          as="h1"
          className="text-display-xl text-gradient-brand text-center leading-tight"
          ariaLabel="Animated headline reveal"
        >
          Design Intelligence<br />Reimagined
        </SplitText>
        <p className="text-center text-neutral-400 mt-6 text-body-lg">
          Animation triggers on mount. Refresh to replay.
        </p>
      </div>
    )
  },
}

// Stagger Options
export const StaggerOptions: Story = {
  render: () => (
    <div className="space-y-16 p-8 max-w-4xl">
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Fast Stagger (20ms)</h4>
        <SplitText split={['words']} as="h2" className="text-display-md text-white">
          Fast stagger creates urgency and energy
        </SplitText>
      </div>
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Medium Stagger (50ms)</h4>
        <SplitText split={['words']} as="h2" className="text-display-md text-white">
          Medium stagger feels natural and readable
        </SplitText>
      </div>
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Slow Stagger (100ms)</h4>
        <SplitText split={['words']} as="h2" className="text-display-md text-white">
          Slow stagger builds anticipation and drama
        </SplitText>
      </div>
      <div>
        <h4 className="text-body-sm text-neutral-500 mb-4">Character Stagger (15ms)</h4>
        <SplitText split={['chars']} as="h2" className="text-display-md text-gradient-cyan">
          Character level animation
        </SplitText>
      </div>
    </div>
  ),
}

// Different Elements
export const DifferentElements: Story = {
  render: () => (
    <div className="space-y-12 p-8">
      <SplitText split={['words']} as="h1" className="text-display-xl text-gradient-brand">
        H1 Heading
      </SplitText>
      <SplitText split={['words']} as="h2" className="text-display-lg text-white">
        H2 Subheading
      </SplitText>
      <SplitText split={['words']} as="h3" className="text-display-md text-neutral-300">
        H3 Section Title
      </SplitText>
      <SplitText split={['words']} as="p" className="text-headline-lg text-neutral-400">
        Paragraph text with word splitting
      </SplitText>
      <SplitText split={['chars']} as="span" className="text-body-lg text-brand-cyan-400">
        Span element
      </SplitText>
    </div>
  ),
}

// Dark Mode
export const DarkMode: Story = {
  render: () => (
    <div className="dark p-8 space-y-8">
      <SplitText split={['words']} as="h1" className="text-display-xl text-gradient-brand">
        Dark Mode SplitText
      </SplitText>
      <SplitText split={['chars', 'words']} as="h2" className="text-display-md text-brand-cyan-300">
        Works beautifully in dark mode
      </SplitText>
    </div>
  ),
}