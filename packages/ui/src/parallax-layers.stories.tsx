import type { Meta, StoryObj } from '@storybook/react'
import { ParallaxLayers } from './parallax-layers'

const meta: Meta<typeof ParallaxLayers> = {
  title: 'Epic/ParallaxLayers',
  component: ParallaxLayers,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Multi-layer parallax scrolling with 6 depth layers, perspective support, and reduced motion compliance.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text', description: 'Container height' },
    width: { control: 'text', description: 'Container width' },
    perspective: { control: 'number', description: 'Perspective distance' },
    className: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof ParallaxLayers>

const createLayer = (depth: 1 | 2 | 3 | 4 | 5 | 6, speed: number, color: string, label: string) => ({
  depth,
  speed,
  scale: depth <= 2,
  children: (
    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
      <div
        className="rounded-xl p-8 text-white font-mono text-sm"
        style={{
          background: `linear-gradient(135deg, ${color} 0%, ${color}dd 100%)`,
          opacity: 0.9,
          boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        }}
      >
        Layer {depth} — {label} (speed: {speed}x)
      </div>
    </div>
  ),
})

export const Default: Story = {
  args: {
    height: '500px',
    width: '100%',
    perspective: 1000,
    layers: [
      createLayer(1, 0.05, '#00b8db', 'Far Background'),
      createLayer(2, 0.15, '#06b6d4', 'Background'),
      createLayer(3, 0.3, '#0891b2', 'Mid Background'),
      createLayer(4, 0.5, '#0e7490', 'Content Layer'),
      createLayer(5, 0.8, '#155e75', 'Foreground'),
      createLayer(6, 1.1, '#164e63', 'Near Foreground'),
    ],
  },
}

export const ShallowDepth: Story = {
  args: {
    height: '400px',
    width: '100%',
    perspective: 800,
    layers: [
      createLayer(1, 0.1, '#00b8db', 'Background'),
      createLayer(2, 0.3, '#06b6d4', 'Mid'),
      createLayer(3, 0.6, '#0891b2', 'Content'),
      createLayer(4, 1.0, '#0e7490', 'Foreground'),
    ],
  },
}

export const DramaticPerspective: Story = {
  args: {
    height: '600px',
    width: '100%',
    perspective: 2000,
    layers: [
      createLayer(1, 0.02, '#00b8db', 'Ultra Far'),
      createLayer(2, 0.1, '#06b6d4', 'Far'),
      createLayer(3, 0.25, '#0891b2', 'Mid Far'),
      createLayer(4, 0.5, '#0e7490', 'Content'),
      createLayer(5, 0.75, '#155e75', 'Near'),
      createLayer(6, 1.2, '#164e63', 'Ultra Near'),
    ],
  },
}

export const NoScale: Story = {
  args: {
    height: '400px',
    width: '100%',
    perspective: 1000,
    layers: [
      { ...createLayer(1, 0.1, '#00b8db', 'Background'), scale: false },
      { ...createLayer(2, 0.3, '#06b6d4', 'Mid Background'), scale: false },
      createLayer(3, 0.5, '#0891b2', 'Content'),
      { ...createLayer(4, 0.8, '#0e7490', 'Foreground'), scale: false },
    ],
  },
}