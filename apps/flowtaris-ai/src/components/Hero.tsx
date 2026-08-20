'use client'

import React, { useEffect, useRef, useCallback } from 'react'
import {
  ParallaxLayers,
  SplitText,
  useSplitTextAnimation,
  ScrollTimeline,
  TimelineTrack,
  FloatingProduct,
  ClipPathReveal,
  ClipPathText,
  IrisWindow,
  type SplitTextRef,
} from '@repo/ui'

/**
 * Hero Section - Cinematic landing experience showcasing all 6 Epic Core Components
 * Combines: ParallaxLayers, SplitText, ScrollTimeline, FloatingProduct, ClipPathReveal, IrisWindow
 */
export function Hero() {
  const splitTextRef = useRef<SplitTextRef | null>(null)
  const splitTextApi = useSplitTextAnimation(splitTextRef)
  // const [isAnimating, setIsAnimating] = useState(false)

  // Trigger text animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // setIsAnimating(true)
      splitTextApi.animateIn({ type: 'chars', stagger: 30, duration: 800 })
      splitTextApi.animateIn({ type: 'words', stagger: 50, duration: 1000 })
    }, 300)
    return () => clearTimeout(timer)
  }, [splitTextApi])

  // Track scroll for parallax sync
  const handleScroll = useCallback(() => {
    // Scroll progress tracked via ScrollTimeline components
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  // Hero content layers for ParallaxLayers
  const heroLayers = [
    {
      depth: 1 as const,
      speed: 0.05,
      scale: true,
      children: (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-brand-cyan-500/10 blur-[150px] animate-float" style={{ animationDuration: '8s' }} />
          <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full bg-brand-amber-500/10 blur-[200px] animate-float" style={{ animationDuration: '10s', animationDelay: '-2s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-navy-500/10 blur-[100px] animate-pulse-soft" />
        </div>
      ),
    },
    {
      depth: 2 as const,
      speed: 0.15,
      scale: true,
      children: (
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-20 left-20 w-96 h-96 border border-brand-cyan-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
          <div className="absolute bottom-20 right-20 w-72 h-72 border border-brand-amber-500/20 rounded-full animate-spin-slow" style={{ animationDuration: '40s', animationDirection: 'reverse' }} />
          <div className="absolute top-1/2 right-20 w-48 h-48 border border-brand-navy-500/20 rounded-lg rotate-45 animate-pulse-soft" />
        </div>
      ),
    },
    {
      depth: 3 as const,
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
      depth: 4 as const,
      speed: 0.5,
      children: (
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-20">
          {/* Iris Window Reveal */}
          <IrisWindow
            aperture={1}
            blades={8}
            curvature={0.6}
            glow={true}
            glowColor="#00b8db"
            glowIntensity={0.5}
            glowBlur={12}
            autoRotate={true}
            rotationSpeed={5}
            width="100%"
            height="100%"
            className="mx-auto mb-12"
            style={{ aspectRatio: '1 / 1', maxWidth: 600, maxHeight: 600 }}
            aria-label="Flowtaris AI - Cinematic aperture reveal"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">
                <ClipPathText
                  split="words"
                  stagger={80}
                  progress={1}
                  className="text-gradient-brand"
                >
                  FLOWTARIS AI
                </ClipPathText>
              </div>
            </div>
          </IrisWindow>

          {/* Floating Product Showcase */}
          <FloatingProduct
            src="/images/dashboard_main.png"
            alt="Flowtaris AI Product"
            frames={[
              '/images/dashboard_main.png',
              '/images/dashboard_analytics.png',
              '/images/dashboard_workflow.png',
              '/images/dashboard_compliance.png',
            ]}
            mouseParallax={true}
            parallaxStrength={0.2}
            autoRotate={true}
            rotationSpeed={8}
            pauseOnHover={true}
            draggable={true}
            damping={0.15}
            width={480}
            height={480}
            borderRadius="24px"
            shadow={true}
            shadowIntensity={1.2}
            background="linear-gradient(135deg, var(--surface-layer1) 0%, var(--surface-layer2) 100%)"
            className="mx-auto mb-16"
            ariaLabel="Flowtaris AI 3D product showcase - drag to rotate"
          />

          {/* Main Headline with SplitText */}
          <div className="w-full max-w-5xl mx-auto text-center mb-8">
            <ScrollTimeline start="top bottom" end="bottom top">
              <TimelineTrack start={0} end={0.3}>
                <SplitText
                  ref={splitTextRef}
                  split={['chars', 'words', 'lines']}
                  as="h1"
                  className="text-display-xl text-gradient-brand text-balance"
                  ariaLabel="Flowtaris AI - The future of intelligent design"
                >
                  Design Intelligence<br />Reimagined
                </SplitText>
              </TimelineTrack>
            </ScrollTimeline>
          </div>

          {/* Sub-headline with ClipPathReveal */}
          <div className="w-full max-w-3xl mx-auto mb-12">
            <ClipPathReveal
              shape="wave"
              scrollTrigger={true}
              triggerStart="top 80%"
              triggerEnd="bottom 20%"
              duration={1200}
              easing="cubic-bezier(0.25, 0.1, 0.25, 1)"
              className="text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance"
              style={{ maxWidth: '600px', margin: '0 auto' }}
            >
              <p className="leading-relaxed">
                Where generative AI meets precision design—crafting interfaces that think, adapt, and evolve.
              </p>
            </ClipPathReveal>
          </div>

          {/* CTA Buttons with scroll-triggered reveals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
            <ClipPathReveal
              shape="polygon-4"
              scrollTrigger={true}
              triggerStart="top 85%"
              triggerEnd="bottom 15%"
              delay={200}
              duration={800}
              className="inline-block"
            >
              <button className="glass-strong px-10 py-4 rounded-full text-body-lg font-semibold text-brand-navy-900 dark:text-brand-white hover:bg-white/90 transition-all duration-300 focus-ring">
                Get Started Free
              </button>
            </ClipPathReveal>

            <ClipPathReveal
              shape="polygon-4"
              scrollTrigger={true}
              triggerStart="top 85%"
              triggerEnd="bottom 15%"
              delay={400}
              duration={800}
              className="inline-block"
            >
              <button className="glass px-10 py-4 rounded-full text-body-lg font-semibold text-white/90 border border-white/20 hover:bg-white/10 transition-all duration-300 focus-ring">
                View Documentation
              </button>
            </ClipPathReveal>
          </div>

          {/* Stats Marquee with ScrollTimeline */}
          <ScrollTimeline start="top bottom" end="bottom top">
            <TimelineTrack start={0.4} end={1} ease="linear">
              <div className="overflow-hidden w-full mt-16" data-timeline-track>
                <div className="flex animate-[marquee_30s_linear_infinite]" style={{ width: 'max-content' }}>
                  {[
                    { label: '99.9%', value: 'Uptime' },
                    { label: '50ms', value: 'Latency' },
                    { label: '10K+', value: 'Components' },
                    { label: '99', value: 'Lighthouse' },
                    { label: 'TypeScript', value: 'Native' },
                    { label: 'WCAG AAA', value: 'Accessible' },
                    { label: '99.9%', value: 'Uptime' },
                    { label: '50ms', value: 'Latency' },
                    { label: '10K+', value: 'Components' },
                    { label: '99', value: 'Lighthouse' },
                    { label: 'TypeScript', value: 'Native' },
                    { label: 'WCAG AAA', value: 'Accessible' },
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-4 px-12 py-6 glass border-b border-white/10 min-w-[200px]">
                      <span className="text-number-lg text-gradient-cyan font-display tabular-nums">{stat.label}</span>
                      <span className="text-body-md text-neutral-400 uppercase tracking-wider">{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TimelineTrack>
          </ScrollTimeline>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
            <ScrollTimeline start="top bottom" end="bottom top">
              <TimelineTrack start={0.8} end={1}>
                <div className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400" data-timeline-progress>
                  <ClipPathText split="chars" stagger={40} progress={1} className="text-overline text-brand-cyan-500">
                    SCROLL
                  </ClipPathText>
                  <svg className="w-6 h-6 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </TimelineTrack>
            </ScrollTimeline>
          </div>
        </div>
      ),
    },
    {
      depth: 5 as const,
      speed: 0.8,
      children: (
        <div className="absolute inset-0 opacity-50" aria-hidden="true">
          <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-brand-navy-900/50 via-transparent to-transparent" />
        </div>
      ),
    },
    {
      depth: 6 as const,
      speed: 1.1,
      children: (
        <div className="relative z-20 pointer-events-none" aria-hidden="true">
          <div className="fixed top-0 left-0 right-0 h-[200px] bg-gradient-to-b from-surface-layer4/80 to-transparent" />
        </div>
      ),
    },
  ]

  return (
    <section className="relative w-full min-h-screen overflow-hidden" aria-labelledby="hero-title">
      {/* Parallax Background Layers */}
      <ParallaxLayers
        layers={heroLayers}
        height="100vh"
        width="100%"
        perspective={1000}
        className="relative"
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          boxShadow: 'inset 0 0 200px rgba(0,0,0,0.3)',
        }}
        aria-hidden="true"
      />
    </section>
  )
}

export default Hero