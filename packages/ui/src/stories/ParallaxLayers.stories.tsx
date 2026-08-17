// @repo/ui - ParallaxLayers Stories
import type { Meta, StoryObj } from '@storybook/react'
import { ParallaxLayers, ParallaxLayer } from '../parallax-layers'

const meta: Meta<typeof ParallaxLayers> = {
  title: 'Epic/ParallaxLayers',
  component: ParallaxLayers,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '6-layer depth system with GSAP ScrollTrigger. Each layer moves at different speeds (0.10x to 1.20x) creating a cinematic parallax effect.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text', description: 'Container height' },
    width: { control: 'text', description: 'Container width' },
    perspective: { control: 'number', description: 'CSS perspective value' },
    layers: { control: 'object', description: 'Array of layer configurations' },
  },
}

export default meta
type Story = StoryObj<typeof ParallaxLayers>

// Default Hero Parallax
export const HeroParallax: Story = {
  render: () => (
    <ParallaxLayers
      height="100vh"
      width="100%"
      perspective={1000}
      layers={[
        {
          depth: 1,
          speed: 0.05,
          scale: true,
          children: (
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-cyan-500/10 blur-[150px]" />
              <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-brand-amber-500/10 blur-[200px]" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-navy-500/10 blur-[100px]" />
            </div>
          ),
        },
        {
          depth: 2,
          speed: 0.15,
          scale: true,
          children: (
            <div className="absolute inset-0" aria-hidden="true">
              <div className="absolute top-20 left-20 w-96 h-96 border border-brand-cyan-500/20 rounded-full" />
              <div className="absolute bottom-20 right-20 w-72 h-72 border border-brand-amber-500/20 rounded-full" />
              <div className="absolute top-1/2 right-20 w-48 h-48 border border-brand-navy-500/20 rounded-lg rotate-45" />
            </div>
          ),
        },
        {
          depth: 3,
          speed: 0.3,
          children: (
            <div className="absolute inset-0" aria-hidden="true">
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1920 1080" preserveAspectRatio="none">
                <defs>
                  <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>
          ),
        },
        {
          depth: 4,
          speed: 0.5,
          children: (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
              <h1 className="text-display-xl text-gradient-brand text-center mb-8">ParallaxLayers Demo</h1>
              <p className="text-headline-md text-neutral-300 text-center max-w-2xl">
                Scroll to see the 6-layer depth system in action. Each layer moves at a different speed.
              </p>
            </div>
          ),
        },
        {
          depth: 5,
          speed: 0.8,
          children: (
            <div className="absolute inset-0 opacity-50" aria-hidden="true">
              <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-brand-navy-900/50 via-transparent to-transparent" />
            </div>
          ),
        },
        {
          depth: 6,
          speed: 1.1,
          children: (
            <div className="relative z-20 pointer-events-none" aria-hidden="true">
              <div className="fixed top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-surface-layer4/80 to-transparent" />
            </div>
          ),
        },
      ]}
    />
  ),
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
}

// Reduced Motion Fallback
export const ReducedMotion: Story = {
  render: () => (
    <ParallaxLayers
      height="100vh"
      width="100%"
      perspective={1000}
      layers={[
        {
          depth: 1,
          speed: 0.05,
          scale: true,
          children: <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-900 via-brand-navy-800 to-brand-navy-900" />,
        },
        {
          depth: 4,
          speed: 0.5,
          children: (
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20">
              <h1 className="text-display-xl text-gradient-brand text-center mb-8">Reduced Motion Mode</h1>
              <p className="text-headline-md text-neutral-300 text-center max-w-2xl">
                With prefers-reduced-motion, all parallax movement is disabled. Layers render statically.
              </p>
            </div>
          ),
        },
      ]}
    />
  ),
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
}

// Shallow Parallax (Card/Section level)
export const ShallowParallax: Story = {
  render: () => (
    <div className="h-[500px] relative">
      <ParallaxLayers
        height="100%"
        width="100%"
        perspective={500}
        layers={[
          {
            depth: 1,
            speed: 0.1,
            children: <div className="absolute inset-0 bg-gradient-to-br from-brand-cyan-500/10 to-brand-amber-500/10" />,
          },
          {
            depth: 2,
            speed: 0.3,
            children: <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />,
          },
          {
            depth: 3,
            speed: 0.5,
            children: (
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="glass-strong p-12 rounded-2xl max-w-md text-center">
                  <h3 className="text-headline-lg text-brand-navy-900 dark:text-brand-white mb-4">Shallow Parallax</h3>
                  <p className="text-body-md text-neutral-500 dark:text-neutral-400">
                    Subtle depth for cards and sections. Lower perspective, fewer layers.
                  </p>
                </div>
              </div>
            ),
          },
        ]}
      />
    </div>
  ),
}