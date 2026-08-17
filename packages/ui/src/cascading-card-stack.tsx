'use client'

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ClipPathReveal } from './clip-path-reveal'
import { FloatingProduct } from './floating-product'
import { cn } from './utils'

gsap.registerPlugin(ScrollTrigger)

export interface CascadingCardStackProps {
  cards: CascadingCardData[]
  className?: string
  perspective?: number
  staggerDelay?: number
  itemHeight?: number
  gap?: number
}

export interface CascadingCardData {
  id: string
  title: string
  category: string
  platforms: string[]
  maturity: 'production' | 'pilot' | 'research'
  metric: string
  icon: string
  description: string
  href: string
  image?: string
}

const maturityStyles = {
  production: 'badge-success',
  pilot: 'badge-warning',
  research: 'badge-info',
} as const

export function CascadingCardStack({
  cards,
  className,
  perspective = 1000,
  staggerDelay = 100,
  itemHeight = 420,
  gap = 24,
}: CascadingCardStackProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  // Entrance animation with ScrollTrigger
  useEffect(() => {
    if (isReducedMotion) return

    const ctx = gsap.context(() => {
      gsap.set('.cascading-card', { opacity: 0, y: 60, rotationX: -15, scale: 0.95 })

      ScrollTrigger.batch('.cascading-card', {
        start: 'top 85%',
        onEnter: (elements) =>
          gsap.to(elements, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            duration: 0.8,
            stagger: staggerDelay / 1000,
            ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
            clearProps: 'all',
          }),
        once: true,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [isReducedMotion, staggerDelay])

  return (
    <div
      ref={containerRef}
      className={cn('relative', className)}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: 'center center',
      }}
      role="list"
      aria-label="AI Capabilities"
    >
      <div
        className="relative z-10"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: `${gap}px`,
          alignItems: 'stretch',
        }}
      >
        {cards.map((card, index) => (
          <CascadingCard
            key={card.id}
            card={card}
            index={index}
            staggerDelay={staggerDelay}
            itemHeight={itemHeight}
            isReducedMotion={isReducedMotion}
          />
        ))}
      </div>
    </div>
  )
}

interface CascadingCardComponentProps {
  card: CascadingCardData
  index: number
  staggerDelay: number
  itemHeight: number
  isReducedMotion: boolean
}

function CascadingCard({
  card,
  index,
  staggerDelay,
  itemHeight,
  isReducedMotion,
}: CascadingCardComponentProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const hoverAnimation = useCallback(() => {
    if (isReducedMotion) return

    const ctx = gsap.context(() => {
      const el = cardRef.current
      if (!el) return

      gsap.to(el, {
        y: isHovered ? -12 : 0,
        rotationX: isHovered ? 3 : 0,
        rotationY: isHovered ? -3 : 0,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? '0 32px 64px -12px rgba(0, 184, 219, 0.25), 0 0 0 1px rgba(0, 184, 219, 0.3)'
          : '0 8px 32px -8px rgba(0, 0, 0, 0.3)',
        duration: 0.4,
        ease: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      })

      // Elastic expand effect on the inner content
      const inner = el.querySelector('.cascading-card-inner')
      if (inner) {
        gsap.to(inner, {
          scale: isHovered ? 1.01 : 1,
          duration: 0.5,
          ease: 'elastic.out(1, 0.5)',
        })
      }
    }, cardRef)

    return () => ctx.revert()
  }, [isHovered, isReducedMotion])

  useEffect(() => {
    hoverAnimation()
  }, [hoverAnimation])

  const MaturityBadge = () => (
    <span
      className={`badge-badge ${maturityStyles[card.maturity]} text-body-xs px-3 py-1 flex-shrink-0`}
    >
      {card.maturity.charAt(0).toUpperCase() + card.maturity.slice(1)}
    </span>
  )

  return (
    <article
      ref={cardRef}
      className="cascading-card group interactive relative overflow-hidden"
      style={{
        minHeight: `${itemHeight}px`,
        transformStyle: 'preserve-3d',
        willChange: 'transform, box-shadow',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="listitem"
    >
      {/* ClipPathReveal entrance animation */}
      <ClipPathReveal
        shape="polygon-4"
        scrollTrigger={true}
        triggerStart="top 85%"
        triggerEnd="bottom 15%"
        delay={index * staggerDelay}
        duration={800}
        easing="cubic-bezier(0.25, 0.1, 0.25, 1)"
        className="absolute inset-0"
        disabled={isReducedMotion}
      >
        <div
          className="cascading-card-inner glass-card h-full flex flex-col relative z-10"
          style={{
            transformStyle: 'preserve-3d',
            transition: 'transform 0.3s ease-out',
          }}
        >
          {/* Top section - Icon + Maturity */}
          <div className="flex items-start justify-between gap-4 p-6 pb-0">
            <span className="text-4xl flex-shrink-0 animate-float" style={{ animationDelay: `${index * 100}ms` }}>
              {card.icon}
            </span>
            <MaturityBadge />
          </div>

          {/* Mid section - Content */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="mb-4">
              <span className="text-overline text-brand-cyan-500 tracking-widest uppercase">
                {card.category}
              </span>
              <h3 className="text-headline-lg text-white mt-2 text-balance">
                {card.title}
              </h3>
            </div>

            <p className="text-body-md text-neutral-400 mb-6 flex-1">
              {card.description}
            </p>

            {/* Platform badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {card.platforms.map((platform) => (
                <span key={platform} className="badge-badge badge-outline badge-ghost text-body-xs px-2 py-1">
                  {platform}
                </span>
              ))}
            </div>

            {/* Key metric */}
            <div className="flex items-center gap-2 text-number-lg text-brand-cyan-400 font-display tabular-nums mb-6">
              {card.metric}
            </div>
          </div>

          {/* Bottom section - CTA */}
          <div className="flex flex-wrap gap-2 p-6 pt-0 border-t border-white/10">
            <a href={card.href} className="flex-1">
              <button className="w-full glass-card px-4 py-3 rounded-xl text-body-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-300 focus-ring flex items-center justify-center gap-2">
                View Details
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </a>
            <a href={`/assessment?capability=${card.id}`} className="flex-1">
              <button className="w-full glass-strong px-4 py-3 rounded-xl text-body-sm font-medium text-brand-navy-900 dark:text-brand-white hover:bg-white/90 transition-all duration-300 focus-ring flex items-center justify-center gap-2">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Assess Fit
              </button>
            </a>
          </div>
        </div>
      </ClipPathReveal>

      {/* FloatingProduct-style elastic glow on hover */}
      {!isReducedMotion && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: 'inherit',
            boxShadow: '0 0 60px 20px rgba(0, 184, 219, 0.15)',
            animation: 'pulse-glow 2s ease-in-out infinite',
          }}
        />
      )}

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </article>
  )
}

export default CascadingCardStack