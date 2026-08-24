// @flowtaris/ui - Hero Pattern
// Configurable cinematic hero section using Epic Core Components

'use client'

import React, { forwardRef, useEffect, useRef, useCallback } from 'react'
import { cn } from '../utils'
import {
  ParallaxLayers,
  ParallaxLayerProps,
  SplitText,
  useSplitTextAnimation,
  SplitTextRef,
  ScrollTimeline,
  TimelineTrack,
  FloatingProduct,
  ClipPathReveal,
  ClipPathText,
  IrisWindow,
  type IrisWindowProps,
  type FloatingProductProps,
} from '../index'

// ============================================
// Types
// ============================================

export interface HeroLayerConfig extends Omit<ParallaxLayerProps, 'children'> {
  /** Layer content */
  children: React.ReactNode
}

export interface HeroStatsConfig {
  label: string
  value: string
}

/** Alternative stats config used by some pages */
export interface HeroStatsItemConfig {
  items: Array<{ label: string; value: string }>
}

export interface HeroCTAConfig {
  label: string
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'tertiary' | 'default' | 'outline'
  icon?: React.ReactNode
  clipPathShape?: 'polygon-4' | 'polygon-6' | 'wave' | 'circle' | 'ellipse'
  delay?: number
  className?: string
}

export interface IrisWindowConfig {
  aperture?: number
  blades?: number
  curvature?: number
  glow?: boolean
  glowColor?: string
  glowIntensity?: number
  glowBlur?: number
  autoRotate?: boolean
  rotationSpeed?: number
  width?: string | number
  height?: string | number
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
}

export interface FloatingProductConfig extends Omit<FloatingProductProps, 'src' | 'alt'> {
  src: string
  alt: string
  className?: string
}

export interface HeroHeadlineConfig {
  text: string | React.ReactNode
  split?: ('chars' | 'words' | 'lines')[]
  className?: string
  scrollTrigger?: { start: number; end: number }
  /** Animate on mount (default: true) */
  animateOnMount?: boolean
}

export interface HeroSubheadlineConfig {
  text: string | React.ReactNode
  shape?: 'wave' | 'polygon-4' | 'polygon-6' | 'circle' | 'ellipse' | 'polygon-3' | 'polygon-5' | 'polygon-8'
  scrollTrigger?: boolean
  triggerStart?: string
  triggerEnd?: string
  delay?: number
  duration?: number
  easing?: string
  className?: string
}

export interface HeroScrollIndicatorConfig {
  show?: boolean
  text?: string
  triggerStart?: number
  triggerEnd?: number
}

/** Accept boolean for simpler usage */
export type HeroScrollIndicator = HeroScrollIndicatorConfig | boolean

export interface HeroVignetteConfig {
  show?: boolean
  intensity?: number
}

/** Accept boolean for simpler usage */
export type HeroVignette = HeroVignetteConfig | boolean

export interface HeroNoiseConfig {
  show?: boolean
  opacity?: number
}

/** Accept boolean for simpler usage */
export type HeroNoise = HeroNoiseConfig | boolean

export interface HeroPatternProps {
  /** Hero layers for parallax (depth 1-6) */
  layers?: HeroLayerConfig[]
  /** Iris window configuration */
  irisWindow?: IrisWindowConfig
  /** Floating product configuration */
  floatingProduct?: FloatingProductConfig
  /** Headline configuration */
  headline?: HeroHeadlineConfig
  /** Subheadline configuration */
  subheadline?: HeroSubheadlineConfig
  /** CTA buttons (array format) */
  ctas?: HeroCTAConfig[]
  /** CTA buttons (object format with primary/secondary) */
  cta?: {
    primary?: HeroCTAConfig
    secondary?: HeroCTAConfig
  }
  /** Stats marquee */
  stats?: HeroStatsConfig[] | HeroStatsItemConfig
  /** Scroll indicator */
  scrollIndicator?: HeroScrollIndicator
  /** Vignette overlay */
  vignette?: HeroVignette
  /** Noise texture */
  noise?: HeroNoise
  /** Parallax container height */
  height?: string
  /** Parallax container width */
  width?: string
  /** Perspective for parallax */
  perspective?: number
  /** Minimum height */
  minHeight?: string
  /** Custom className */
  className?: string
  /** Custom style */
  style?: React.CSSProperties
  /** ID for aria-labelledby */
  id?: string
  /** Background variant */
  backgroundVariant?: 'default' | 'dark' | 'gradient'
  /** Enable scroll listeners */
  enableScrollTracking?: boolean
  /** Content alignment */
  contentAlign?: 'center' | 'left' | 'right'
}

// ============================================
// Default Configurations
// ============================================

const DEFAULT_LAYERS: HeroLayerConfig[] = [
  {
    depth: 1,
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
    depth: 2,
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
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-32 pb-20" />
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
]

// ============================================
// Hero Pattern Component
// ============================================

const _HeroPattern = forwardRef<HTMLElement, HeroPatternProps>(
  (
    {
      layers = DEFAULT_LAYERS,
      irisWindow,
      floatingProduct,
      headline,
      subheadline,
      ctas = [],
      cta,
      stats = [],
      scrollIndicator = true,
      vignette = true,
      noise = true,
      height = '100vh',
      width = '100%',
      perspective = 1000,
      minHeight = '100vh',
      className,
      style,
      id = 'hero',
      backgroundVariant = 'default',
      enableScrollTracking = true,
      contentAlign = 'center',
      ...props
    },
    ref
  ) => {
    const splitTextRef = useRef<SplitTextRef | null>(null)
    const splitTextApi = useSplitTextAnimation(splitTextRef)

    // Trigger text animations on mount — delay ensures SplitText DOM split is complete
    useEffect(() => {
      if (!headline) return
      const timer = setTimeout(() => {
        splitTextApi.animateIn({ type: 'words', stagger: 60, duration: 900 })
        splitTextApi.animateIn({ type: 'lines', stagger: 80, duration: 900 })
      }, 600)
      return () => clearTimeout(timer)
    }, [splitTextApi, headline])

    // Scroll tracking for parallax sync
    const handleScroll = useCallback(() => {
      // Scroll progress tracked via ScrollTimeline components
    }, [])

    useEffect(() => {
      if (!enableScrollTracking) return
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [handleScroll, enableScrollTracking])

    // Build depth-4 layer content dynamically
    const depth4Layer = layers.find((l) => l.depth === 4) as HeroLayerConfig | undefined
    const dynamicDepth4Children = depth4Layer ? (
      <>
        {/* Iris Window */}
        {irisWindow && (
          <IrisWindow
            aperture={irisWindow.aperture ?? 1}
            blades={irisWindow.blades ?? 8}
            curvature={irisWindow.curvature ?? 0.6}
            glow={irisWindow.glow ?? true}
            glowColor={irisWindow.glowColor ?? '#00b8db'}
            glowIntensity={irisWindow.glowIntensity ?? 0.5}
            glowBlur={irisWindow.glowBlur ?? 12}
            autoRotate={irisWindow.autoRotate ?? true}
            rotationSpeed={irisWindow.rotationSpeed ?? 5}
            width={irisWindow.width ?? '100%'}
            height={irisWindow.height ?? '100%'}
            className={cn('mx-auto mb-12', irisWindow.className)}
            style={{ aspectRatio: '1 / 1', maxWidth: 600, maxHeight: 600, ...irisWindow.style }}
            aria-label="Hero aperture reveal"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center p-8">{irisWindow.children}</div>
            </div>
          </IrisWindow>
        )}

        {/* Floating Product */}
        {floatingProduct && (
          <FloatingProduct
            src={floatingProduct.src}
            alt={floatingProduct.alt}
            frames={floatingProduct.frames}
            mouseParallax={floatingProduct.mouseParallax ?? true}
            parallaxStrength={floatingProduct.parallaxStrength ?? 0.2}
            autoRotate={floatingProduct.autoRotate ?? true}
            rotationSpeed={floatingProduct.rotationSpeed ?? 8}
            pauseOnHover={floatingProduct.pauseOnHover ?? true}
            draggable={floatingProduct.draggable ?? true}
            damping={floatingProduct.damping ?? 0.15}
            width={floatingProduct.width ?? 480}
            height={floatingProduct.height ?? 480}
            borderRadius={floatingProduct.borderRadius ?? '24px'}
            shadow={floatingProduct.shadow ?? true}
            shadowIntensity={floatingProduct.shadowIntensity ?? 1.2}
            background={floatingProduct.background}
            className={cn('mx-auto mb-16', floatingProduct.className)}
            ariaLabel={floatingProduct.ariaLabel ?? 'Product showcase'}
          />
        )}

        {/* Headline with SplitText */}
        {headline && (
          <div className={cn('w-full max-w-5xl mx-auto text-center mb-8', contentAlign === 'left' && 'text-left', contentAlign === 'right' && 'text-right')}>
            {headline.scrollTrigger ? (
              <ScrollTimeline start="top bottom" end="bottom top">
                <TimelineTrack start={headline.scrollTrigger.start} end={headline.scrollTrigger.end}>
                  <SplitText
                    ref={splitTextRef}
                    split={headline.split ?? ['chars', 'words', 'lines']}
                    as="h1"
                    id={`${id}-title`}
                    className={cn('text-display-xl text-gradient-brand text-balance', headline.className)}
                    ariaLabel={headline.text as string}
                  >
                    {headline.text}
                  </SplitText>
                </TimelineTrack>
              </ScrollTimeline>
            ) : (
              <SplitText
                ref={splitTextRef}
                split={headline.split ?? ['chars', 'words', 'lines']}
                as="h1"
                id={`${id}-title`}
                className={cn('text-display-xl text-gradient-brand text-balance', headline.className)}
                ariaLabel={headline.text as string}
              >
                {headline.text}
              </SplitText>
            )}
          </div>
        )}

        {/* Subheadline with ClipPathReveal */}
        {subheadline && (
          <div className={cn('w-full max-w-3xl mx-auto mb-12', contentAlign === 'left' && 'text-left', contentAlign === 'right' && 'text-right')}>
            <ClipPathReveal
              shape={subheadline.shape ?? 'wave'}
              scrollTrigger={subheadline.scrollTrigger ?? true}
              triggerStart={subheadline.triggerStart ?? 'top 80%'}
              triggerEnd={subheadline.triggerEnd ?? 'bottom 20%'}
              delay={subheadline.delay ?? 0}
              duration={subheadline.duration ?? 1200}
              easing={subheadline.easing ?? 'cubic-bezier(0.25, 0.1, 0.25, 1)'}
              className={cn('text-headline-lg text-neutral-300 dark:text-neutral-400 text-balance', subheadline.className)}
              style={{ maxWidth: '600px', margin: '0 auto', ...(contentAlign === 'left' ? { marginLeft: 0 } : contentAlign === 'right' ? { marginRight: 0 } : {}) }}
            >
              <p className="leading-relaxed">{subheadline.text}</p>
            </ClipPathReveal>
          </div>
        )}

        {/* CTA Buttons */}
        {ctas.length > 0 && (
          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-6 mb-20', contentAlign === 'left' && 'justify-start', contentAlign === 'right' && 'justify-end')}>
            {ctas.map((cta, index) => (
              <ClipPathReveal
                key={index}
                shape={cta.clipPathShape ?? 'polygon-4'}
                scrollTrigger={true}
                triggerStart="top 85%"
                triggerEnd="bottom 15%"
                delay={cta.delay ?? index * 200}
                duration={800}
                className="inline-block"
              >
                {cta.href ? (
                  <a
                    href={cta.href}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-body-lg font-semibold transition-all duration-300 focus-ring',
                      cta.variant === 'primary' && 'glass-strong text-brand-navy-900 dark:text-brand-white hover:bg-white/90',
                      cta.variant === 'secondary' && 'glass text-white/90 border border-white/20 hover:bg-white/10',
                      cta.variant === 'tertiary' && 'glass text-white/90 border border-white/30 hover:bg-white/10',
                    )}
                    onClick={cta.onClick}
                  >
                    {cta.icon && <span aria-hidden="true">{cta.icon}</span>}
                    {cta.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-body-lg font-semibold transition-all duration-300 focus-ring',
                      cta.variant === 'primary' && 'glass-strong text-brand-navy-900 dark:text-brand-white hover:bg-white/90',
                      cta.variant === 'secondary' && 'glass text-white/90 border border-white/20 hover:bg-white/10',
                      cta.variant === 'tertiary' && 'glass text-white/90 border border-white/30 hover:bg-white/10',
                    )}
                    onClick={cta.onClick}
                  >
                    {cta.icon && <span aria-hidden="true">{cta.icon}</span>}
                    {cta.label}
                  </button>
                )}
              </ClipPathReveal>
            ))}
          </div>
        )}

        {/* CTA Buttons (object format with primary/secondary) */}
        {cta && (
          <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-6 mb-20', contentAlign === 'left' && 'justify-start', contentAlign === 'right' && 'justify-end')}>
            {cta.primary && (
              <ClipPathReveal
                shape={cta.primary.clipPathShape ?? 'polygon-4'}
                scrollTrigger={true}
                triggerStart="top 85%"
                triggerEnd="bottom 15%"
                delay={cta.primary.delay ?? 0}
                duration={800}
                className="inline-block"
              >
                {cta.primary.href ? (
                  <a
                    href={cta.primary.href}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-body-lg font-semibold transition-all duration-300 focus-ring',
                      cta.primary.variant === 'primary' && 'glass-strong text-brand-navy-900 dark:text-brand-white hover:bg-white/90',
                      cta.primary.variant === 'secondary' && 'glass text-white/90 border border-white/20 hover:bg-white/10',
                      cta.primary.variant === 'tertiary' && 'glass text-white/90 border border-white/30 hover:bg-white/10',
                      cta.primary.className,
                    )}
                    onClick={cta.primary.onClick}
                  >
                    {cta.primary.icon && <span aria-hidden="true">{cta.primary.icon}</span>}
                    {cta.primary.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-body-lg font-semibold transition-all duration-300 focus-ring',
                      cta.primary.variant === 'primary' && 'glass-strong text-brand-navy-900 dark:text-brand-white hover:bg-white/90',
                      cta.primary.variant === 'secondary' && 'glass text-white/90 border border-white/20 hover:bg-white/10',
                      cta.primary.variant === 'tertiary' && 'glass text-white/90 border border-white/30 hover:bg-white/10',
                      cta.primary.className,
                    )}
                    onClick={cta.primary.onClick}
                  >
                    {cta.primary.icon && <span aria-hidden="true">{cta.primary.icon}</span>}
                    {cta.primary.label}
                  </button>
                )}
              </ClipPathReveal>
            )}
            {cta.secondary && (
              <ClipPathReveal
                shape={cta.secondary.clipPathShape ?? 'polygon-4'}
                scrollTrigger={true}
                triggerStart="top 85%"
                triggerEnd="bottom 15%"
                delay={cta.secondary.delay ?? 100}
                duration={800}
                className="inline-block"
              >
                {cta.secondary.href ? (
                  <a
                    href={cta.secondary.href}
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-body-lg font-semibold transition-all duration-300 focus-ring',
                      cta.secondary.variant === 'primary' && 'glass-strong text-brand-navy-900 dark:text-brand-white hover:bg-white/90',
                      cta.secondary.variant === 'secondary' && 'glass text-white/90 border border-white/20 hover:bg-white/10',
                      cta.secondary.variant === 'tertiary' && 'glass text-white/90 border border-white/30 hover:bg-white/10',
                      cta.secondary.className,
                    )}
                    onClick={cta.secondary.onClick}
                  >
                    {cta.secondary.icon && <span aria-hidden="true">{cta.secondary.icon}</span>}
                    {cta.secondary.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={cn(
                      'inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full text-body-lg font-semibold transition-all duration-300 focus-ring',
                      cta.secondary.variant === 'primary' && 'glass-strong text-brand-navy-900 dark:text-brand-white hover:bg-white/90',
                      cta.secondary.variant === 'secondary' && 'glass text-white/90 border border-white/20 hover:bg-white/10',
                      cta.secondary.variant === 'tertiary' && 'glass text-white/90 border border-white/30 hover:bg-white/10',
                      cta.secondary.className,
                    )}
                    onClick={cta.secondary.onClick}
                  >
                    {cta.secondary.icon && <span aria-hidden="true">{cta.secondary.icon}</span>}
                    {cta.secondary.label}
                  </button>
                )}
              </ClipPathReveal>
            )}
          </div>
        )}

        {/* Stats Marquee */}
        {(() => {
          const isItemConfig = (s: unknown): s is HeroStatsItemConfig =>
            Array.isArray(s) && s.length > 0 && 'items' in s[0]
          const statsItems = isItemConfig(stats)
            ? stats.items
            : (stats as HeroStatsConfig[])
          return statsItems.length > 0 ? (
            <ScrollTimeline start="top bottom" end="bottom top">
              <TimelineTrack start={0.4} end={1} ease="linear">
                <div className="overflow-hidden w-full mt-16" data-timeline-track>
                  <div className="flex animate-[marquee_30s_linear_infinite]" style={{ width: 'max-content' }}>
                    {[
                      ...statsItems,
                      ...statsItems,
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
          ) : null
        })()}

        {/* Scroll Indicator */}
        {(typeof scrollIndicator === 'object' && scrollIndicator.show) && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
            <ScrollTimeline start="top bottom" end="bottom top">
              <TimelineTrack start={scrollIndicator.triggerStart ?? 0.8} end={scrollIndicator.triggerEnd ?? 1}>
                <div className="flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400" data-timeline-progress>
                  {scrollIndicator.text && (
                    <ClipPathText split="chars" stagger={40} progress={1} className="text-overline text-brand-cyan-500">
                      {scrollIndicator.text}
                    </ClipPathText>
                  )}
                  <svg className="w-6 h-6 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                    <path d="M12 5v14M19 12l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </TimelineTrack>
            </ScrollTimeline>
          </div>
        )}
      </>
    ) : (
      (depth4Layer && 'children' in depth4Layer) ? (depth4Layer as HeroLayerConfig).children : null
    )

    // Merge layers with dynamic depth-4
    const mergedLayers = layers.map((layer) =>
      layer.depth === 4 ? { ...layer, children: dynamicDepth4Children } : layer
    )

    return (
      <section
        ref={ref}
        id={id}
        className={cn('relative w-full overflow-hidden', `min-h-[${minHeight}]`, className)}
        style={style}
        aria-labelledby={`${id}-title`}
        {...props}
      >
        {/* Parallax Background Layers */}
        <ParallaxLayers
          layers={mergedLayers}
          height={height}
          width={width}
          perspective={perspective}
          className="relative"
        />

        {/* Noise Texture Overlay */}
        {(typeof noise === 'object' && noise.show) && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: noise.opacity ?? 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Vignette */}
        {(typeof vignette === 'object' && vignette.show) && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow: `inset 0 0 200px rgba(0,0,0,${vignette.intensity ?? 0.3})`,
            }}
            aria-hidden="true"
          />
        )}
      </section>
    )
  }
)

_HeroPattern.displayName = 'HeroPattern'

export const HeroPattern = _HeroPattern