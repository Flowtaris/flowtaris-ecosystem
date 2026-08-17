// @repo/ui - Pattern Components Stories
import type { Meta, StoryObj } from '@storybook/react'
import { HeroPattern, ScrollReveal, StaggeredReveal, StickySidebar, Header, Footer, BreadcrumbsPattern, CookieBanner } from '../patterns'

// HeroPattern Stories
const heroMeta: Meta<typeof HeroPattern> = {
  title: 'Patterns/HeroPattern',
  component: HeroPattern,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Configurable hero section with slots for headline, subheadline, CTAs, stats, and background layers. Integrates all 6 epic components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headline: { control: 'object', description: 'Headline configuration with SplitText' },
    subheadline: { control: 'object', description: 'Subheadline with ClipPathReveal' },
    cta: { control: 'object', description: 'CTA button group' },
    stats: { control: 'object', description: 'Statistics marquee' },
    irisWindow: { control: 'object', description: 'IrisWindow configuration' },
    floatingProduct: { control: 'object', description: 'FloatingProduct configuration' },
    backgroundLayers: { control: 'object', description: 'ParallaxLayers configuration' },
    scrollIndicator: { control: 'boolean', description: 'Show scroll indicator' },
    vignette: { control: 'boolean', description: 'Show vignette overlay' },
    noise: { control: 'boolean', description: 'Show noise texture' },
  },
}

export default heroMeta
type HeroStory = StoryObj<typeof HeroPattern>

export const DefaultHero: HeroStory = {
  args: {
    headline: {
      text: 'Design Intelligence<br />Reimagined',
      split: ['chars', 'words', 'lines'],
      className: 'text-display-xl text-gradient-brand text-balance',
    },
    subheadline: {
      text: 'Where generative AI meets precision design—crafting interfaces that think, adapt, and evolve.',
      shape: 'wave',
      className: 'text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance',
    },
    cta: {
      primary: { text: 'Get Started Free', variant: 'default', className: 'glass-strong' },
      secondary: { text: 'View Documentation', variant: 'outline', className: 'glass' },
    },
    stats: {
      items: [
        { label: '99.9%', value: 'Uptime' },
        { label: '50ms', value: 'Latency' },
        { label: '10K+', value: 'Components' },
        { label: '99', value: 'Lighthouse' },
      ],
    },
    irisWindow: {
      aperture: 1,
      blades: 8,
      curvature: 0.6,
      glow: true,
      glowColor: '#00b8db',
    },
    floatingProduct: {
      src: '/placeholder-product.svg',
      alt: 'Product showcase',
      autoRotate: true,
      draggable: true,
    },
    scrollIndicator: true,
    vignette: true,
    noise: true,
  },
}

export const MinimalHero: HeroStory = {
  args: {
    headline: {
      text: 'Simple Hero',
      split: ['words'],
      className: 'text-display-xl text-white text-center',
    },
    subheadline: {
      text: 'A minimal hero without epic components',
      className: 'text-headline-md text-neutral-400 text-center',
    },
    cta: {
      primary: { text: 'Get Started', variant: 'default' },
    },
    irisWindow: false,
    floatingProduct: false,
    stats: false,
    scrollIndicator: false,
    vignette: false,
    noise: false,
  },
}

// ScrollReveal Stories
const scrollRevealMeta: Meta<typeof ScrollReveal> = {
  title: 'Patterns/ScrollReveal',
  component: ScrollReveal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'IntersectionObserver wrapper for scroll-triggered animations. Supports multiple variants and stagger delays.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'scale-up', 'scale-down', 'slide-up', 'slide-down'],
      description: 'Animation variant',
    },
    delay: { control: 'number', description: 'Delay in ms' },
    duration: { control: 'number', description: 'Duration in ms' },
    threshold: { control: 'range', min: 0, max: 1, step: 0.1, description: 'Intersection threshold' },
    rootMargin: { control: 'text', description: 'Root margin for IntersectionObserver' },
    once: { control: 'boolean', description: 'Animate only once' },
  },
}

export const ScrollRevealVariants: StoryObj<typeof ScrollReveal> = {
  render: () => (
    <div className="p-8 space-y-8 max-w-2xl">
      {[
        'fade-up', 'fade-down', 'fade-left', 'fade-right',
        'scale-up', 'scale-down', 'slide-up', 'slide-down'
      ].map((variant) => (
        <ScrollReveal key={variant} variant={variant as any} delay={100} className="glass-strong p-6 rounded-xl">
          <h4 className="text-headline-sm text-white capitalize">{variant.replace('-', ' ')}</h4>
          <p className="text-body-md text-neutral-400 mt-1">Scroll reveal variant</p>
        </ScrollReveal>
      ))}
    </div>
  ),
}

// StaggeredReveal Stories
const staggeredMeta: Meta<typeof StaggeredReveal> = {
  title: 'Patterns/StaggeredReveal',
  component: StaggeredReveal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Wrapper for staggering multiple ScrollReveal children with configurable delays.',
      },
    },
  },
  tags: ['autodocs'],
}

export const StaggeredCards: StoryObj<typeof StaggeredReveal> = {
  render: () => (
    <StaggeredReveal staggerDelay={150} variant="fade-up">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        {[
          { title: 'Design Tokens', desc: 'Colors, spacing, typography', icon: '🎨' },
          { title: 'Epic Components', desc: 'Parallax, SplitText, ScrollTimeline', icon: '⚡' },
          { title: 'TypeScript Strict', desc: 'Zero any, strict null checks', icon: '🔒' },
        ].map((card) => (
          <div key={card.title} className="glass-strong p-6 rounded-2xl">
            <div className="text-4xl mb-4">{card.icon}</div>
            <h4 className="text-headline-sm text-white mb-2">{card.title}</h4>
            <p className="text-body-md text-neutral-400">{card.desc}</p>
          </div>
        ))}
      </div>
    </StaggeredReveal>
  ),
}

// StickySidebar Stories
const stickySidebarMeta: Meta<typeof StickySidebar> = {
  title: 'Patterns/StickySidebar',
  component: StickySidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Sticky sidebar with scroll spy navigation. Highlights active section based on scroll position.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: 'object', description: 'Sidebar navigation items' },
    offsetTop: { control: 'number', description: 'Top offset from viewport' },
  },
}

export const DefaultSidebar: StoryObj<typeof StickySidebar> = {
  render: () => (
    <div className="flex gap-8 p-8 max-w-5xl h-[600px]">
      <StickySidebar
        items={[
          { id: 'section1', label: 'Overview', href: '#section1' },
          { id: 'section2', label: 'Features', href: '#section2' },
          { id: 'section3', label: 'Pricing', href: '#section3' },
          { id: 'section4', label: 'FAQ', href: '#section4' },
        ]}
        offsetTop={100}
      />
      <div className="flex-1 space-y-20 pr-8" style={{ maxHeight: '600px', overflow: 'auto' }}>
        <section id="section1" className="h-64">
          <h2 className="text-display-md text-gradient-brand mb-4">Overview</h2>
          <p className="text-body-lg text-neutral-400">Scroll to see sidebar highlight active section</p>
        </section>
        <section id="section2" className="h-64">
          <h2 className="text-display-md text-gradient-brand mb-4">Features</h2>
          <p className="text-body-lg text-neutral-400">The sidebar tracks your scroll position</p>
        </section>
        <section id="section3" className="h-64">
          <h2 className="text-display-md text-gradient-brand mb-4">Pricing</h2>
          <p className="text-body-lg text-neutral-400">Active section is highlighted in cyan</p>
        </section>
        <section id="section4" className="h-64">
          <h2 className="text-display-md text-gradient-brand mb-4">FAQ</h2>
          <p className="text-body-lg text-neutral-400">Click items to scroll to sections</p>
        </section>
      </div>
    </div>
  ),
}

// Header Stories
const headerMeta: Meta<typeof Header> = {
  title: 'Patterns/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Responsive header with mega-menu slot, theme toggle, and mobile drawer.',
      },
    },
  },
  tags: ['autodocs'],
}

export const DefaultHeader: StoryObj<typeof Header> = {
  render: () => (
    <div className="min-h-screen">
      <Header
        logo={<span className="text-display-sm text-gradient-brand font-display">FLOWTARIS AI</span>}
        navigation={[
          { label: 'Capabilities', href: '/capabilities' },
          { label: 'Case Studies', href: '/case-studies' },
          { label: 'Platforms', href: '/platforms' },
          { label: 'Insights', href: '/insights' },
        ]}
        actions={[
          { label: 'Sign In', variant: 'ghost', href: '/signin' },
          { label: 'Get Started', variant: 'default', href: '/assessment' },
        ]}
      />
      <main className="flex-1 p-8">
        <h1 className="text-display-md text-white">Page Content</h1>
      </main>
    </div>
  ),
}

// Footer Stories
const footerMeta: Meta<typeof Footer> = {
  title: 'Patterns/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Comprehensive footer with navigation columns, social links, and legal links.',
      },
    },
  },
  tags: ['autodocs'],
}

export const DefaultFooter: StoryObj<typeof Footer> = {
  render: () => (
    <Footer
      brand={<span className="text-display-sm text-gradient-brand font-display">FLOWTARIS AI</span>}
      tagline="Where generative AI meets precision design"
      columns={[
        { title: 'Platform', links: [{ label: 'Capabilities', href: '/capabilities' }, { label: 'Case Studies', href: '/case-studies' }, { label: 'Pricing', href: '/pricing' }] },
        { title: 'Resources', links: [{ label: 'Documentation', href: '/docs' }, { label: 'Blog', href: '/insights' }, { label: 'Community', href: '/community' }] },
        { title: 'Company', links: [{ label: 'About', href: '/about' }, { label: 'Contact', href: '/contact' }, { label: 'Careers', href: '/careers' }] },
      ]}
      socialLinks={[
        { platform: 'twitter', href: 'https://twitter.com/flowtaris', label: 'Twitter' },
        { platform: 'github', href: 'https://github.com/flowtaris', label: 'GitHub' },
        { platform: 'linkedin', href: 'https://linkedin.com/company/flowtaris', label: 'LinkedIn' },
      ]}
      legalLinks={[
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
      ]}
      copyright="© 2026 Flowtaris. All rights reserved."
    />
  ),
}

// BreadcrumbsPattern Stories
const breadcrumbsMeta: Meta<typeof BreadcrumbsPattern> = {
  title: 'Patterns/BreadcrumbsPattern',
  component: BreadcrumbsPattern,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Breadcrumb navigation with separators and current page indicator.',
      },
    },
  },
  tags: ['autodocs'],
}

export const DefaultBreadcrumbs: StoryObj<typeof BreadcrumbsPattern> = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Capabilities', href: '/capabilities' },
      { label: 'GenAI Document Intelligence', href: '/capabilities/genai-doc-intelligence' },
    ],
    separator: '/',
  },
}

// CookieBanner Stories
const cookieBannerMeta: Meta<typeof CookieBanner> = {
  title: 'Patterns/CookieBanner',
  component: CookieBanner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'GDPR-compliant cookie consent banner with granular preferences.',
      },
    },
  },
  tags: ['autodocs'],
}

export const DefaultCookieBanner: StoryObj<typeof CookieBanner> = {
  render: () => (
    <div className="min-h-[300px] relative">
      <CookieBanner
        onAccept={() => console.log('Accepted all')}
        onReject={() => console.log('Rejected all')}
        onPreferences={() => console.log('Open preferences')}
        categories={[
          { id: 'necessary', name: 'Necessary', description: 'Required for site functionality', required: true },
          { id: 'analytics', name: 'Analytics', description: 'Help us understand site usage', required: false },
          { id: 'marketing', name: 'Marketing', description: 'Personalized advertising', required: false },
        ]}
      />
      <div className="p-8 text-center text-neutral-400">
        <p>Cookie banner appears at bottom of page</p>
      </div>
    </div>
  ),
}