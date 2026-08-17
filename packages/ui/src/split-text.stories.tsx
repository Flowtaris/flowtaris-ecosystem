import type { Meta, StoryObj } from '@storybook/react'
import { SplitText } from './split-text'
import { useSplitTextAnimation } from './split-text'
import { useRef } from 'react'

const meta: Meta<typeof SplitText> = {
  title: 'Epic/SplitText',
  component: SplitText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Text splitting animation component supporting char/word/line splitting with stagger animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    split: {
      control: 'object',
      description: 'Split types to apply',
    },
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'p', 'span', 'div'],
      description: 'HTML element to render',
    },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SplitText>

export const CharSplit: Story = {
  args: {
    split: ['chars'],
    as: 'h1',
    className: 'text-display-lg text-gradient-brand text-center',
    children: 'Character Split',
  },
}

export const WordSplit: Story = {
  args: {
    split: ['words'],
    as: 'h1',
    className: 'text-display-lg text-gradient-brand text-center',
    children: 'Word Split Animation',
  },
}

export const LineSplit: Story = {
  args: {
    split: ['lines'],
    as: 'h1',
    className: 'text-display-lg text-gradient-brand text-center',
    children: 'Line\nSplit\nAnimation',
  },
}

export const AllSplits: Story = {
  args: {
    split: ['chars', 'words', 'lines'],
    as: 'h1',
    className: 'text-display-lg text-gradient-brand text-center',
    children: 'All Splits Together',
  },
}

export const WithAnimateIn: Story = {
  render: () => {
    const ref = useRef<any>(null)
    const api = useSplitTextAnimation(ref)

    return (
      <div className="space-y-8">
        <SplitText
          ref={ref}
          split={['chars', 'words']}
          as="h1"
          className="text-display-lg text-gradient-brand text-center"
        >
          Animated Text
        </SplitText>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => api.animateIn({ type: 'chars', stagger: 30, duration: 800 })}
            className="px-4 py-2 bg-brand-cyan-600 text-white rounded hover:bg-brand-cyan-700"
          >
            Animate Chars
          </button>
          <button
            onClick={() => api.animateIn({ type: 'words', stagger: 50, duration: 1000 })}
            className="px-4 py-2 bg-brand-cyan-600 text-white rounded hover:bg-brand-cyan-700"
          >
            Animate Words
          </button>
          <button
            onClick={() => api.animateOut({ type: 'chars', stagger: 20, duration: 500 })}
            className="px-4 py-2 bg-neutral-700 text-white rounded hover:bg-neutral-600"
          >
            Animate Out
          </button>
        </div>
      </div>
    )
  },
}

export const AsParagraph: Story = {
  args: {
    split: ['words'],
    as: 'p',
    className: 'text-headline-md text-neutral-300 text-center max-w-xl',
    children: 'This paragraph demonstrates word-level splitting for body text animations.',
  },
}

export const GradientText: Story = {
  args: {
    split: ['chars'],
    as: 'h1',
    className: 'text-display-xl text-gradient-brand text-center',
    children: 'GRADIENT TEXT',
  },
}