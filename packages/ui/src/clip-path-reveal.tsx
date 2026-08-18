// @flowtaris/ui - ClipPathReveal Component
// Clip-path based reveal animations with multiple shapes and scroll-triggered transitions

'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { cn } from './utils'

export type ClipPathShape =
  | 'circle'
  | 'ellipse'
  | 'polygon'
  | 'inset'
  | 'polygon-3'
  | 'polygon-4'
  | 'polygon-5'
  | 'polygon-6'
  | 'polygon-8'
  | 'star'
  | 'heart'
  | 'wave'
  | 'chevron'
  | 'custom'

export interface ClipPathRevealProps {
  /** Children to reveal */
  children: React.ReactNode
  /** Clip path shape */
  shape?: ClipPathShape
  /** Custom clip path (when shape is 'custom') */
  customPath?: string
  /** Animation progress (0-1) */
  progress?: number
  /** Trigger reveal on scroll */
  scrollTrigger?: boolean
  /** Scroll container */
  scrollContainer?: HTMLElement | null
  /** Start offset for scroll trigger */
  triggerStart?: string | number
  /** End offset for scroll trigger */
  triggerEnd?: string | number
  /** Animation duration (ms) */
  duration?: number
  /** Animation easing */
  easing?: string
  /** Delay before starting (ms) */
  delay?: number
  /** Whether to animate on mount */
  animateOnMount?: boolean
  /** Whether to reverse on unmount/scroll away */
  reverse?: boolean
  /** Disable animation (show content immediately) */
  disabled?: boolean
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Callback on progress change */
  onProgress?: (progress: number) => void
  /** Callback when animation completes */
  onComplete?: () => void
  /** Callback when animation starts */
  onStart?: () => void
  /** Internal: shape */
  _shape?: ClipPathShape
  /** Internal: scroll trigger */
  _scrollTrigger?: boolean
  /** Internal: animate on mount */
  _animateOnMount?: boolean
  /** Internal: reverse */
  _reverse?: boolean
}

export interface ClipPathRevealRef {
  /** Current progress (0-1) */
  progress: number
  /** Whether animation is running */
  isAnimating: boolean
  /** Start animation */
  start: () => void
  /** Stop animation */
  stop: () => void
  /** Reset to initial state */
  reset: () => void
  /** Set progress directly */
  setProgress: (progress: number) => void
}

/**
 * Predefined clip path shapes
 */
const SHAPE_PATHS: Record<ClipPathShape, (progress: number) => string> = {
  circle: (progress) => `circle(${progress * 100}% at 50% 50%)`,
  ellipse: (progress) => `ellipse(${progress * 70}% ${progress * 70}% at 50% 50%)`,

  // Triangle
  'polygon-3': (progress) => {
    const size = progress * 100
    return `polygon(50% ${100 - size}%, ${100 - size * 0.866}% ${100 + size * 0.5}%, ${size * 0.866}% ${100 + size * 0.5}%)`
  },

  // Square
  'polygon-4': (progress) => {
    const size = progress * 50
    return `polygon(${50 - size}% ${50 - size}%, ${50 + size}% ${50 - size}%, ${50 + size}% ${50 + size}%, ${50 - size}% ${50 + size}%)`
  },

  // Pentagon
  'polygon-5': (progress) => {
    const size = progress * 50
    const points = []
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI / 5) - Math.PI / 2
      const x = 50 + size * Math.cos(angle)
      const y = 50 + size * Math.sin(angle)
      points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
  },

  // Hexagon
  'polygon-6': (progress) => {
    const size = progress * 50
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (i * 2 * Math.PI / 6) - Math.PI / 6
      const x = 50 + size * Math.cos(angle)
      const y = 50 + size * Math.sin(angle)
      points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
  },

  // Octagon
  'polygon-8': (progress) => {
    const size = progress * 50
    const points = []
    for (let i = 0; i < 8; i++) {
      const angle = (i * 2 * Math.PI / 8)
      const x = 50 + size * Math.cos(angle)
      const y = 50 + size * Math.sin(angle)
      points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
  },

  // Star
  star: (progress) => {
    const outer = progress * 50
    const inner = outer * 0.4
    const points = []
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI / 5) - Math.PI / 2
      const radius = i % 2 === 0 ? outer : inner
      const x = 50 + radius * Math.cos(angle)
      const y = 50 + radius * Math.sin(angle)
      points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
  },

  // Heart
  heart: (progress) => {
    const size = progress * 50
    const points = []
    const steps = 20
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * 2 * Math.PI
      const x = 50 + size * 0.5 * (16 * Math.pow(Math.sin(t), 3)) / 16
      const y = 50 - size * 0.5 * (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) / 16
      points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
  },

  // Wave
  wave: (progress) => {
    const amplitude = progress * 30
    const points = ['0% 100%']
    const steps = 20
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 100
      const y = 100 - progress * 100 + amplitude * Math.sin((i / steps) * 4 * Math.PI)
      points.push(`${x}% ${y}%`)
    }
    points.push('100% 100%')
    return `polygon(${points.join(', ')})`
  },

  // Chevron
  chevron: (progress) => {
    const size = progress * 50
    const width = size
    const height = size * 0.6
    return `polygon(
      ${50 - width}% ${50 - height}%,
      50% 50%,
      ${50 - width}% ${50 + height}%,
      ${50 - width * 0.6}% ${50 + height}%,
      50% 50%,
      ${50 - width * 0.6}% ${50 - height}%,
      ${50 + width * 0.6}% ${50 - height}%,
      50% 50%,
      ${50 + width * 0.6}% ${50 + height}%,
      ${50 + width}% ${50 + height}%,
      50% 50%,
      ${50 + width}% ${50 - height}%
    )`
  },

  // Inset (box reveal)
  inset: (progress) => {
    const inset = (1 - progress) * 50
    return `inset(${inset}% ${inset}% ${inset}% ${inset}% round ${progress * 24}px)`
  },

  // Polygon (generic 6-point)
  polygon: (progress) => {
    const size = progress * 50
    const points = []
    for (let i = 0; i < 6; i++) {
      const angle = (i * 2 * Math.PI / 6) - Math.PI / 6
      const x = 50 + size * Math.cos(angle)
      const y = 50 + size * Math.sin(angle)
      points.push(`${x}% ${y}%`)
    }
    return `polygon(${points.join(', ')})`
  },

  // Custom - handled separately
  custom: () => 'inset(0 0 0 0)',
}

/**
 * Easing functions
 */
const EASING_FUNCTIONS: Record<string, (t: number) => number> = {
  linear: t => t,
  ease: t => t * t * (3 - 2 * t),
  'ease-in': t => t * t,
  'ease-out': t => 1 - (1 - t) * (1 - t),
  'ease-in-out': t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
  'cubic-bezier(0.25, 0.1, 0.25, 1)': t => {
    // Approximate cinematic easing
    return t * t * t * (t * (6 * t - 15) + 10)
  },
  'cubic-bezier(0.05, 0.7, 0.1, 1)': t => {
    // Approximate epic easing
    return 1 - Math.pow(1 - t, 4)
  },
}

/**
 * ClipPathReveal Component
 */
export const ClipPathReveal = forwardRef<ClipPathRevealRef, ClipPathRevealProps>(
  (
    {
      children,
      shape = 'circle',
      customPath,
      progress: controlledProgress,
      scrollTrigger = false,
      scrollContainer = null,
      triggerStart = 'top bottom',
      triggerEnd = 'bottom top',
      duration = 1000,
      easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      delay = 0,
      animateOnMount = true,
      reverse = false,
      disabled = false,
      className,
      style,
      onProgress,
      onComplete,
      onStart,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const startTimeRef = useRef<number | undefined>(undefined)
    const [internalProgress, setInternalProgress] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    // Reduced motion support
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])

    const effectiveDisabled = disabled || prefersReducedMotion

    // Get clip path for current progress
    const getClipPath = useMemo(() => {
      return (progress: number) => {
        if (shape === 'custom' && customPath) {
          return progress < 1 ? `inset(${(1 - progress) * 50}% ${(1 - progress) * 50}% ${(1 - progress) * 50}% ${(1 - progress) * 50}%)` : customPath
        }
        const shapeFn = SHAPE_PATHS[shape] || SHAPE_PATHS.circle
        return shapeFn(progress)
      }
    }, [shape, customPath])

    // Animation loop
    const animate = useCallback((timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current - delay
      let progress = Math.max(0, Math.min(1, elapsed / duration))

      // Apply easing
      const easingFn = EASING_FUNCTIONS[easing] ?? EASING_FUNCTIONS['ease'] ?? ((t: number) => t)
      progress = easingFn(progress)

      setInternalProgress(progress)
      onProgress?.(progress)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
        onComplete?.()
      }
    }, [duration, delay, easing, onProgress, onComplete])

    // Start animation
    const startAnimation = useCallback(() => {
      if (hasStarted && !reverse) return

      setHasStarted(true)
      setIsAnimating(true)
      startTimeRef.current = undefined
      animationRef.current = requestAnimationFrame(animate)
      onStart?.()
    }, [hasStarted, reverse, animate, onStart])

    // Scroll trigger logic
    useEffect(() => {
      if (!scrollTrigger || effectiveDisabled) return

      const container = scrollContainer ?? (typeof window !== 'undefined' ? window : null)
      const element = containerRef.current
      if (!container || !element) return

      const parseOffset = (offset: string | number, containerHeight: number, _elementHeight: number) => {
        if (typeof offset === 'number') return offset
        const str = offset.toString().trim()
        if (str.endsWith('%')) return (parseFloat(str) / 100) * containerHeight
        if (str.endsWith('px')) return parseFloat(str)
        const positions: Record<string, number> = {
          top: 0, center: containerHeight / 2, bottom: containerHeight,
          start: 0, middle: containerHeight / 2, end: containerHeight,
        }
        const parts = str.split(' ')
        const startPos = parts[0] ?? ''
        const endPos = parts[1] ?? ''
        return (positions[startPos] ?? 0) - (positions[endPos] ?? 0)
      }

      const handleScroll = () => {
        let containerHeight: number
        let elementTop: number
        let elementHeight: number

        if (container === window) {
          containerHeight = window.innerHeight
          const rect = element.getBoundingClientRect()
          elementTop = rect.top + window.scrollY
          elementHeight = rect.height
        } else {
          const containerEl = container as HTMLElement
          containerHeight = containerEl.clientHeight
          elementTop = element.offsetTop
          elementHeight = element.offsetHeight
          const containerRect = containerEl.getBoundingClientRect()
          elementTop -= containerRect.top + containerEl.scrollTop
        }

        const startOffset = parseOffset(triggerStart, containerHeight, elementHeight)
        const endOffset = parseOffset(triggerEnd, containerHeight, elementHeight)

        const scrollTop = container === window
          ? window.scrollY
          : (container as HTMLElement).scrollTop

        const startScroll = elementTop - startOffset
        const endScroll = elementTop + elementHeight - endOffset
        const totalScroll = endScroll - startScroll

        let scrollProgress = 0
        if (totalScroll !== 0) {
          scrollProgress = (scrollTop - startScroll) / totalScroll
        }
        scrollProgress = Math.max(0, Math.min(1, scrollProgress))

        if (reverse) {
          setInternalProgress(scrollProgress)
          onProgress?.(scrollProgress)
        } else if (scrollProgress > 0 && !hasStarted) {
          startAnimation()
        } else if (scrollProgress <= 0 && hasStarted) {
          setInternalProgress(0)
          setHasStarted(false)
        }
      }

      handleScroll()
      container.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })

      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }, [scrollTrigger, scrollContainer, triggerStart, triggerEnd, reverse, hasStarted, startAnimation, onProgress, effectiveDisabled])

    // Auto-start on mount
    useEffect(() => {
      if (animateOnMount && !scrollTrigger && !hasStarted && !effectiveDisabled) {
        const timer = setTimeout(() => {
          startAnimation()
        }, delay)
        return () => clearTimeout(timer)
      }
    }, [animateOnMount, scrollTrigger, hasStarted, delay, startAnimation, effectiveDisabled])

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [])

    // Handle disabled or reduced motion - skip animation and show full content
    const effectiveProgress = effectiveDisabled ? 1 : (controlledProgress ?? internalProgress)

    // Expose ref methods using useImperativeHandle
    useImperativeHandle(ref, () => ({
      get progress() { return controlledProgress ?? internalProgress },
      get isAnimating() { return isAnimating && !effectiveDisabled },
      start: () => {
        if (!animateOnMount && !hasStarted && !effectiveDisabled) {
          startAnimation()
        }
      },
      stop: () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = undefined
        }
        setIsAnimating(false)
      },
      reset: () => {
        setInternalProgress(0)
        setHasStarted(false)
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
          animationRef.current = undefined
        }
        setIsAnimating(false)
      },
      setProgress: (p: number) => {
        setInternalProgress(Math.max(0, Math.min(1, p)))
      },
    }), [controlledProgress, internalProgress, isAnimating, animateOnMount, hasStarted, startAnimation, effectiveDisabled])

    // Compute clip path
    const currentProgress = effectiveProgress
    const clipPath = getClipPath(currentProgress)

    const containerStyle = useMemo<React.CSSProperties>(() => ({
      position: 'relative',
      overflow: 'hidden',
      clipPath,
      ...style,
    }), [clipPath, style])

    return (
      <div
        ref={containerRef}
        className={cn('clip-path-reveal', className)}
        style={containerStyle}
        data-progress={currentProgress.toFixed(3)}
        data-shape={shape}
        data-animating={isAnimating}
        data-reduced-motion={prefersReducedMotion}
      >
        {children}
      </div>
    )
  }
)

ClipPathReveal.displayName = 'ClipPathReveal'

/**
 * ClipPathText - Text reveal with clip path
 */
export interface ClipPathTextProps {
  /** Text content */
  children: React.ReactNode
  /** Clip path shape */
  shape?: ClipPathShape
  /** Custom clip path */
  customPath?: string
  /** Animation progress (0-1) */
  progress?: number
  /** Stagger delay between lines/words/chars */
  stagger?: number
  /** Split type */
  split?: 'lines' | 'words' | 'chars'
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Internal: shape */
  _shape?: ClipPathShape
  /** Internal: stagger */
  _stagger?: number
  /** Internal: split */
  _split?: 'lines' | 'words' | 'chars'
  /** Internal: custom path */
  _customPath?: string
}

/**
 * Text reveal with per-character clip path animation
 */
export const ClipPathText = forwardRef<HTMLDivElement, ClipPathTextProps>(
  (
    { children, shape = 'inset', _customPath, progress = 1, stagger = 50, split = 'lines', className, style },
    _ref
  ) => {
    const textRef = useRef<HTMLDivElement>(null)
    const [splitElements, setSplitElements] = useState<HTMLElement[]>([])

    // Split text on mount
    useEffect(() => {
      const element = textRef.current
      if (!element) return

      const text = element.textContent || ''
      element.innerHTML = ''

      const elements: HTMLElement[] = []

      if (split === 'chars') {
        Array.from(text).forEach((char, index) => {
          const span = document.createElement('span')
          span.textContent = char
          span.style.display = 'inline-block'
          span.style.clipPath = 'inset(0 100% 0 0)'
          span.style.transition = `clip-path 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * stagger}ms`
          elements.push(span)
          element.appendChild(span)
        })
      } else if (split === 'words') {
        text.split(/(\s+)/).forEach((word, index) => {
          const span = document.createElement('span')
          span.textContent = word
          span.style.display = 'inline-block'
          if (word.trim()) {
            span.style.clipPath = 'inset(0 100% 0 0)'
            span.style.transition = `clip-path 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * stagger}ms`
          }
          elements.push(span)
          element.appendChild(span)
        })
      } else {
        // Split by lines (approximate)
        const lines = text.split('\n')
        lines.forEach((line, index) => {
          const span = document.createElement('div')
          span.textContent = line
          span.style.clipPath = 'inset(0 100% 0 0)'
          span.style.transition = `clip-path 0.6s cubic-bezier(0.25, 0.1, 0.25, 1) ${index * stagger}ms`
          elements.push(span)
          element.appendChild(span)
        })
      }

      setSplitElements(elements)
    }, [children, split, stagger])

    // Animate on progress change
    useEffect(() => {
      const shapeFn = SHAPE_PATHS[shape] || SHAPE_PATHS.inset

      splitElements.forEach((el, index) => {
        const delay = index * stagger
        setTimeout(() => {
          el.style.clipPath = shapeFn(progress)
        }, delay)
      })
    }, [progress, shape, stagger, splitElements])

    return (
      <div ref={textRef} className={cn('clip-path-text', className)} style={style} />
    )
  }
)

ClipPathText.displayName = 'ClipPathText'

export default ClipPathReveal