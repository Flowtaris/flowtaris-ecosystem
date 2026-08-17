import type { Meta, StoryObj } from '@storybook/react'
import { FloatingProduct } from './floating-product'

const meta: Meta<typeof FloatingProduct> = {
  title: 'Epic/FloatingProduct',
  component: FloatingProduct,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '3D floating product showcase with mouse parallax, auto-rotation, draggable 360° view, and frame interpolation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    mouseParallax: { control: 'boolean' },
    autoRotate: { control: 'boolean' },
    draggable: { control: 'boolean' },
    rotationSpeed: { control: 'number', min: 0, max: 50 },
    parallaxStrength: { control: 'number', min: 0, max: 1 },
    damping: { control: 'number', min: 0, max: 1 },
    pauseOnHover: { control: 'boolean' },
    width: { control: 'number' },
    height: { control: 'number' },
    borderRadius: { control: 'text' },
    shadow: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof FloatingProduct>

const placeholderSrc = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiByeD0iMjQiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCIgeTE9IjAiIHgyPSI0MDAiIHkyPSI0MDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwYjhkYiIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwODkxYjIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4='

export const Default: Story = {
  args: {
    src: placeholderSrc,
    alt: 'Product showcase',
    width: 480,
    height: 480,
    borderRadius: '24px',
    shadow: true,
    shadowIntensity: 1.2,
    mouseParallax: true,
    parallaxStrength: 0.2,
    autoRotate: true,
    rotationSpeed: 8,
    pauseOnHover: true,
    draggable: true,
    damping: 0.15,
    background: 'linear-gradient(135deg, var(--surface-layer1) 0%, var(--surface-layer2) 100%)',
  },
}

export const NoAutoRotate: Story = {
  args: {
    ...Default.args,
    autoRotate: false,
    rotationSpeed: 0,
  },
}

export const NoParallax: Story = {
  args: {
    ...Default.args,
    mouseParallax: false,
  },
}

export const NotDraggable: Story = {
  args: {
    ...Default.args,
    draggable: false,
  },
}

export const WithFrames: Story = {
  args: {
    ...Default.args,
    src: placeholderSrc,
    frames: [placeholderSrc, placeholderSrc, placeholderSrc, placeholderSrc],
  },
}

export const SmallSize: Story = {
  args: {
    ...Default.args,
    width: 320,
    height: 320,
    borderRadius: '16px',
  },
}

export const LargeSize: Story = {
  args: {
    ...Default.args,
    width: 640,
    height: 640,
    borderRadius: '32px',
  },
}

export const HighDamping: Story = {
  args: {
    ...Default.args,
    damping: 0.3,
  },
}

export const LowDamping: Story = {
  args: {
    ...Default.args,
    damping: 0.05,
  },
}

export const WithRotationIndicator: Story = {
  render: () => (
    <div className="relative w-[500px] h-[500px]">
      <FloatingProduct
        {...Default.args}
        width={450}
        height={450}
        showRotationIndicator={true}
        rotationIndicatorColor="#00b8db"
      />
    </div>
  ),
}

export const DarkBackground: Story = {
  args: {
    ...Default.args,
    background: 'linear-gradient(135deg, #051022 0%, #0a0f1a 100%)',
  },
}