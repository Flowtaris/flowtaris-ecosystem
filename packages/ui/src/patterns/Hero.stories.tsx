import type { Meta, StoryObj } from '@storybook/react'
import { HeroPattern } from '../patterns/Hero'
import { Zap, DollarSign, CheckCircle, TrendingUp, Shield, CPU } from 'lucide-react'

const meta: Meta<typeof HeroPattern> = {
  title: 'Patterns/HeroPattern',
  component: HeroPattern,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Configurable cinematic hero section showcasing all 6 Epic Core Components: ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal, IrisWindow.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'text' },
    perspective: { control: 'number', min: 500, max: 2000 },
    backgroundVariant: { control: 'select', options: ['default', 'dark', 'gradient'] },
    contentAlign: { control: 'select', options: ['center', 'left', 'right'] },
    enableScrollTracking: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof HeroPattern>

export const Default: Story = {
  args: {
    headline: {
      text: 'Design Intelligence<br />Reimagined',
      animateOnMount: true,
    },
    subheadline: {
      text: 'Where generative AI meets precision design—crafting interfaces that think, adapt, and evolve.',
      shape: 'wave',
    },
    ctas: [
      { label: 'Get Started Free', variant: 'primary', href: '/assessment' },
      { label: 'View Documentation', variant: 'secondary', href: '/docs' },
    ],
    stats: [
      { label: '99.9%', value: 'Uptime' },
      { label: '50ms', value: 'Latency' },
      { label: '10K+', value: 'Components' },
      { label: '99', value: 'Lighthouse' },
      { label: 'TypeScript', value: 'Native' },
      { label: 'WCAG AAA', value: 'Accessible' },
    ],
    scrollIndicator: { show: true },
    vignette: { show: true, intensity: 0.3 },
    noise: { show: true, opacity: 0.03 },
    height: '80vh',
    minHeight: '600px',
  },
}

export const Minimal: Story = {
  args: {
    headline: {
      text: 'Minimal Hero',
      animateOnMount: true,
    },
    subheadline: {
      text: 'A simpler hero without product showcase or iris window.',
      shape: 'polygon-4',
    },
    ctas: [
      { label: 'Get Started', variant: 'primary', href: '/signup' },
    ],
    stats: [],
    floatingProduct: undefined,
    irisWindow: undefined,
    scrollIndicator: { show: false },
    vignette: { show: true, intensity: 0.2 },
    noise: { show: true, opacity: 0.02 },
    height: '60vh',
    minHeight: '500px',
  },
}

export const WithIrisWindow: Story = {
  args: {
    headline: {
      text: 'Iris Window<br />Showcase',
      animateOnMount: true,
    },
    subheadline: {
      text: 'Cinematic aperture reveal with customizable blades, curvature, and glow effects.',
      shape: 'iris',
    },
    ctas: [
      { label: 'Explore Features', variant: 'primary', href: '/features' },
      { label: 'View Docs', variant: 'secondary', href: '/docs' },
    ],
    stats: [
      { label: '8', value: 'Blades' },
      { label: '0.6', value: 'Curvature' },
      { label: '500ms', value: 'Animation' },
    ],
    irisWindow: {
      aperture: 1,
      blades: 8,
      curvature: 0.6,
      glow: true,
      glowColor: '#00b8db',
      glowIntensity: 0.6,
      glowBlur: 16,
      autoRotate: true,
      rotationSpeed: 8,
      children: (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-gradient-brand text-display-md font-display">IRIS</div>
          </div>
        </div>
      ),
    },
    floatingProduct: undefined,
    vignette: { show: true, intensity: 0.4 },
    noise: { show: true, opacity: 0.04 },
    height: '90vh',
    minHeight: '700px',
  },
}

export const WithFloatingProduct: Story = {
  args: {
    headline: {
      text: 'Floating Product<br />Showcase',
      animateOnMount: true,
    },
    subheadline: {
      text: '3D product view with mouse parallax, auto-rotation, and draggable 360° interaction.',
      shape: 'polygon-6',
    },
    ctas: [
      { label: 'View Demo', variant: 'primary', href: '/demo' },
      { label: 'Try It', variant: 'secondary', href: '/try' },
    ],
    stats: [
      { label: '60fps', value: 'Smooth' },
      { label: '3D', value: 'Interactive' },
      { label: 'Drag', value: 'Enabled' },
    ],
    floatingProduct: {
      src: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiByeD0iMjQiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9ImdyYWRpZW50IiB4MT0iMCIgeTE9IjAiIHgyPSI0MDAiIHkyPSI0MDAiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzAwYjhkYiIvPgo8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwODkxYjIiLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4=',
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
    irisWindow: undefined,
    vignette: { show: true, intensity: 0.3 },
    noise: { show: true, opacity: 0.03 },
    height: '90vh',
    minHeight: '700px',
  },
}

export const FullFeatured: Story = {
  args: {
    headline: {
      text: 'Full Featured<br />Hero Experience',
      animateOnMount: true,
    },
    subheadline: {
      text: 'All epic components combined: Iris Window, Floating Product, SplitText headline, ClipPathReveal subheadline, animated CTAs, stats marquee, and scroll indicator.',
      shape: 'wave',
    },
    ctas: [
      { label: 'Get Started Free', variant: 'primary', href: '/assessment' },
      { label: 'Calculate ROI', variant: 'secondary', href: '/roi-calculator' },
      { label: 'View Docs', variant: 'tertiary', href: '/docs' },
    ],
    stats: [
      { label: '99.9%', value: 'Uptime' },
      { label: '50ms', value: 'Latency' },
      { label: '10K+', value: 'Components' },
      { label: '99', value: 'Lighthouse' },
      { label: 'TypeScript', value: 'Native' },
      { label: 'WCAG AAA', value: 'Accessible' },
    ],
    scrollIndicator: { show: true, text: 'EXPLORE' },
    vignette: { show: true, intensity: 0.35 },
    noise: { show: true, opacity: 0.035 },
    height: '100vh',
    minHeight: '800px',
    perspective: 1200,
    backgroundVariant: 'gradient',
  },
}

export const LeftAligned: Story = {
  args: {
    ...Default.args,
    contentAlign: 'left',
    headline: {
      text: 'Left Aligned<br />Content',
      animateOnMount: true,
    },
  },
}

export const RightAligned: Story = {
  args: {
    ...Default.args,
    contentAlign: 'right',
    headline: {
      text: 'Right Aligned<br />Content',
      animateOnMount: true,
    },
  },
}

export const DarkTheme: Story = {
  args: {
    ...Default.args,
    backgroundVariant: 'dark',
    vignette: { show: true, intensity: 0.5 },
    noise: { show: true, opacity: 0.05 },
  },
}

export const NoAnimations: Story = {
  args: {
    ...Default.args,
    headline: {
      ...Default.args.headline!,
      animateOnMount: false,
    },
    subheadline: {
      ...Default.args.subheadline!,
      scrollTrigger: false,
    },
    scrollIndicator: { show: false },
    vignette: { show: false },
    noise: { show: false },
    enableScrollTracking: false,
  },
}

export const CustomLayers: Story = {
  args: {
    ...Default.args,
    headline: {
      text: 'Custom Parallax<br />Layers',
      animateOnMount: true,
    },
    customLayers: [
      {
        depth: 1,
        speed: 0.02,
        scale: true,
        children: (
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand-cyan-500/5 blur-[200px] animate-float" style={{ animationDuration: '15s' }} />
          </div>
        ),
      },
      {
        depth: 2,
        speed: 0.1,
        children: (
          <div className="absolute inset-0" aria-hidden="true">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #00b8db 0%, transparent 70%)' }} />
          </div>
        ),
      },
      {
        depth: 3,
        speed: 0.4,
        children: (
          <div className="absolute inset-0" aria-hidden="true">
            <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1920 1080" preserveAspectRatio="none">
              <defs>
                <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
                  <circle cx="30" cy="30" r="1" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dots)" />
            </svg>
          </div>
        ),
      },
      {
        depth: 4,
        speed: 0.6,
        children: <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-20" />,
      },
      {
        depth: 5,
        speed: 0.9,
        children: (
          <div className="absolute inset-0 opacity-30" aria-hidden="true">
            <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-brand-navy-900/50 via-transparent to-transparent" />
          </div>
        ),
      },
      {
        depth: 6,
        speed: 1.2,
        children: (
          <div className="relative z-20 pointer-events-none" aria-hidden="true">
            <div className="fixed top-0 left-0 right-0 h-[150px] bg-gradient-to-b from-surface-layer4/90 to-transparent" />
          </div>
        ),
      },
    ],
  },
}