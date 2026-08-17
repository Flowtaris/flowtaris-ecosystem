import type { Meta, StoryObj } from '@storybook/react'
import { ScrollTimeline, TimelineTrack, TimelineTrigger } from './scroll-timeline'

const meta: Meta<typeof ScrollTimeline> = {
  title: 'Epic/ScrollTimeline',
  component: ScrollTimeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Scroll-linked animation timeline with tracks and triggers for scroll-driven animations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    start: { control: 'text', description: 'Scroll start position' },
    end: { control: 'text', description: 'Scroll end position' },
  },
}

export default meta
type Story = StoryObj<typeof ScrollTimeline>

export const BasicTimeline: Story = {
  render: () => (
    <div style={{ height: '600px' }}>
      <ScrollTimeline start="top bottom" end="bottom top">
        <TimelineTrack start={0} end={1}>
          <div
            className="fixed top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-cyan-500 rounded-xl"
            style={{
              transform: 'translateX(-50%)',
              transition: 'transform 0.1s linear',
            }}
            data-timeline-progress
          />
        </TimelineTrack>
      </ScrollTimeline>
      <div className="space-y-20 h-[2000px]">
        <p className="text-center text-neutral-400">Scroll down to see the box animate</p>
        <div className="h-64" />
        <p className="text-center text-neutral-400">Keep scrolling...</p>
        <div className="h-64" />
        <p className="text-center text-neutral-400">Almost there...</p>
        <div className="h-64" />
        <p className="text-center text-neutral-400">Done!</p>
      </div>
    </div>
  ),
}

export const MultipleTracks: Story = {
  render: () => (
    <div style={{ height: '800px' }}>
      <ScrollTimeline start="top bottom" end="bottom top">
        <TimelineTrack start={0} end={0.5} ease="ease-out">
          <div className="fixed top-20 left-10 w-24 h-24 bg-brand-cyan-500 rounded-lg" data-timeline-progress />
        </TimelineTrack>
        <TimelineTrack start={0.3} end={0.8} ease="ease-in-out">
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-24 h-24 bg-brand-amber-500 rounded-lg rotate-45" data-timeline-progress />
        </TimelineTrack>
        <TimelineTrack start={0.5} end={1} ease="ease-in">
          <div className="fixed top-20 right-10 w-24 h-24 bg-brand-pink-500 rounded-lg" data-timeline-progress />
        </TimelineTrack>
      </ScrollTimeline>
      <div className="space-y-32 h-[3000px]">
        <p className="text-center text-neutral-400">Three elements with overlapping timelines</p>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="h-48" />
        ))}
      </div>
    </div>
  ),
}

export const TriggerBased: Story = {
  render: () => (
    <div style={{ height: '600px' }}>
      <ScrollTimeline start="top bottom" end="bottom top">
        <TimelineTrigger
          trigger="top 80%"
          enter={() => console.log('Enter')}
          leave={() => console.log('Leave')}
        >
          <div className="fixed top-20 left-1/2 -translate-x-1/2 w-32 h-32 bg-brand-cyan-500 rounded-xl" data-timeline-trigger />
        </TimelineTrigger>
      </ScrollTimeline>
      <div className="space-y-32 h-[2000px]">
        <p className="text-center text-neutral-400">Trigger at 80% viewport</p>
        <div className="h-64" />
        <p className="text-center text-neutral-400">Element appears when trigger hits</p>
        <div className="h-64" />
        <div className="h-64" />
      </div>
    </div>
  ),
}

export const ProgressIndicator: Story = {
  render: () => (
    <div style={{ height: '400px' }}>
      <ScrollTimeline start="top bottom" end="bottom top">
        <TimelineTrack start={0} end={1}>
          <div
            className="fixed top-0 left-0 w-full h-2 bg-neutral-800"
            data-timeline-progress
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              background: 'linear-gradient(90deg, #00b8db, #06b6d4)',
            }}
          />
        </TimelineTrack>
      </ScrollTimeline>
      <div className="space-y-20 h-[2000px] pt-8">
        <p className="px-4 text-neutral-400">Scroll progress indicator at top</p>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64" />
        ))}
      </div>
    </div>
  ),
}