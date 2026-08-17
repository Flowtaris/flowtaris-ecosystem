import type { Meta, StoryObj } from '@storybook/react'
import { IrisWindow } from './iris-window'

const meta: Meta<typeof IrisWindow> = {
  title: 'Epic/IrisWindow',
  component: IrisWindow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'SVG-based iris aperture with 6-8 blades, curvature control, glow effects, auto-rotation, and mask clipping for cinematic reveals.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    aperture: { control: 'number', min: 0, max: 1, step: 0.01 },
    blades: { control: 'number', min: 3, max: 12, step: 1 },
    curvature: { control: 'number', min: 0, max: 1, step: 0.01 },
    glow: { control: 'boolean' },
    glowIntensity: { control: 'number', min: 0, max: 1, step: 0.01 },
    glowBlur: { control: 'number', min: 0, max: 50 },
    autoRotate: { control: 'boolean' },
    rotationSpeed: { control: 'number', min: 0, max: 30 },
    width: { control: 'text' },
    height: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof IrisWindow>

export const Default: Story = {
  args: {
    aperture: 1,
    blades: 8,
    curvature: 0.6,
    glow: true,
    glowColor: '#00b8db',
    glowIntensity: 0.5,
    glowBlur: 12,
    autoRotate: true,
    rotationSpeed: 5,
    width: '100%',
    height: '100%',
    style: { aspectRatio: '1 / 1', maxWidth: 400, maxHeight: 400 },
    children: (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-gradient-brand text-display-md font-display">FLOWTARIS</div>
        </div>
      </div>
    ),
  },
}

export const OpenAperture: Story = {
  args: {
    ...Default.args,
    aperture: 1,
  },
}

export const ClosedAperture: Story = {
  args: {
    ...Default.args,
    aperture: 0,
  },
}

export const HalfAperture: Story = {
  args: {
    ...Default.args,
    aperture: 0.5,
  },
}

export const SixBlades: Story = {
  args: {
    ...Default.args,
    blades: 6,
  },
}

export const TenBlades: Story = {
  args: {
    ...Default.args,
    blades: 10,
  },
}

export const TwelveBlades: Story = {
  args: {
    ...Default.args,
    blades: 12,
  },
}

export const NoCurvature: Story = {
  args: {
    ...Default.args,
    curvature: 0,
  },
}

export const HighCurvature: Story = {
  args: {
    ...Default.args,
    curvature: 1,
  },
}

export const NoGlow: Story = {
  args: {
    ...Default.args,
    glow: false,
  },
}

export const IntenseGlow: Story = {
  args: {
    ...Default.args,
    glowIntensity: 1,
    glowBlur: 24,
    glowColor: '#00b8db',
  },
}

export const AmberGlow: Story = {
  args: {
    ...Default.args,
    glowColor: '#f59e0b',
    glowIntensity: 0.7,
    glowBlur: 16,
  },
}

export const PinkGlow: Story = {
  args: {
    ...Default.args,
    glowColor: '#ec4899',
    glowIntensity: 0.6,
    glowBlur: 14,
  },
}

export const NoAutoRotate: Story = {
  args: {
    ...Default.args,
    autoRotate: false,
  },
}

export const FastRotation: Story = {
  args: {
    ...Default.args,
    rotationSpeed: 20,
  },
}

export const SlowRotation: Story = {
  args: {
    ...Default.args,
    rotationSpeed: 2,
  },
}

export const ReverseRotation: Story = {
  args: {
    ...Default.args,
    rotationSpeed: -8,
  },
}

export const SmallSize: Story = {
  args: {
    ...Default.args,
    width: 200,
    height: 200,
    style: { aspectRatio: '1 / 1' },
  },
}

export const Rectangular: Story = {
  args: {
    ...Default.args,
    width: '100%',
    height: 300,
    style: { borderRadius: '16px' },
  },
}

export const WithImage: Story = {
  args: {
    ...Default.args,
    children: (
      <div className="absolute inset-0">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiByeD0iMjQiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCIgeTE9IjAiIHgyPSI0MDAiIHkyPSI0MDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwYjhkYiIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwODkxYjIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4="
          alt="Sample image"
          className="w-full h-full object-cover"
        />
      </div>
    ),
  },
}