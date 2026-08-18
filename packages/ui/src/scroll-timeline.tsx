// @flowtaris/ui - ScrollTimeline Component
// Scroll-driven animations with timeline scrubbing and progress tracking

'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback, forwardRef, useImperativeHandle, createContext, useContext } from 'react'
import { cn } from './utils'

export interface ScrollTimelineProps {
  /** Children to render */
  children: React.ReactNode
  /** Scroll container (default: window) */
  container?: HTMLElement | null
  /** Start offset (px or %) */
  start?: string | number
  /** End offset (px or %) */
  end?: string | number
  /** Axis to track */
  axis?: 'x' | 'y'
  /** Whether timeline is horizontal */
  horizontal?: boolean
  /** Disable timeline (e.g., for reduced motion) */
  disabled?: boolean
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Callback on progress change (0-1) */
  onProgress?: (progress: number) => void
  /** Callback on enter */
  onEnter?: () => void
  /** Callback on leave */
  onLeave?: () => void
  /** Internal: axis */
  _axis?: 'x' | 'y'
}

export interface ScrollTimelineRef {
  /** Current progress (0-1) */
  progress: number
  /** Whether in viewport */
  isInView: boolean
  /** Scroll direction */
  direction: 'up' | 'down' | 'left' | 'right' | null
  /** Current scroll position */
  scrollPosition: number
  /** Refresh timeline calculations */
  refresh: () => void
}

export interface TimelineTrackProps {
  /** Children */
  children: React.ReactNode
  /** Track progress (0-1) - overrides parent timeline */
  progress?: number
  /** Start progress */
  start?: number
  /** End progress */
  end?: number
  /** Easing function */
  ease?: string | ((t: number) => number)
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

export interface TimelineTriggerProps {
  /** Children */
  children: React.ReactNode
  /** Trigger progress (0-1) */
  at?: number
  /** Range [start, end] */
  range?: [number, number]
  /** Whether to trigger once */
  once?: boolean
  /** Callback when triggered */
  onTrigger?: (progress: number) => void
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

/**
 * ScrollTimeline Context for nested components
 */
const ScrollTimelineContext = createContext<{
  progress: number
  isInView: boolean
  direction: ScrollTimelineRef['direction']
  scrollPosition: number
  registerTrack: (track: { start: number; end: number; ease?: string | ((t: number) => number) }) => number
} | null>(null)

/**
 * Main ScrollTimeline Component
 */
export const ScrollTimeline = forwardRef<ScrollTimelineRef, ScrollTimelineProps>(
  (
    {
      children,
      container = null,
      start = 'top bottom',
      end = 'bottom top',
      _axis = 'y',
      horizontal = false,
      disabled = false,
      className,
      style,
      onProgress,
      onEnter,
      onLeave,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [progress, setProgress] = useState(0)
    const [isInView, setIsInView] = useState(false)
    const [direction, setDirection] = useState<ScrollTimelineRef['direction']>(null)
    const [scrollPosition, setScrollPosition] = useState(0)
    const prevProgressRef = useRef(0)
    const tracksRef = useRef<Array<{ start: number; end: number; ease?: string | ((t: number) => number) }>>([])
    const animationFrameRef = useRef<number | undefined>(undefined)

    // Reduced motion support
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])

    const effectiveDisabled = disabled || prefersReducedMotion

    // Parse offset string (e.g., "top bottom", "100px", "50%")
    const parseOffset = useCallback((offset: string | number, containerHeight: number, _elementHeight: number): number => {
      if (typeof offset === 'number') return offset

      const str = offset.toString().trim()

      // Percentage
      if (str.endsWith('%')) {
        return (parseFloat(str) / 100) * containerHeight
      }

      // Pixels
      if (str.endsWith('px')) {
        return parseFloat(str)
      }

      // Keywords
      const parts = str.split(' ')
      const startPos = parts[0] ?? ''
      const endPos = parts[1] ?? ''
      const positions: Record<string, number> = {
        top: 0,
        center: containerHeight / 2,
        bottom: containerHeight,
        start: 0,
        middle: containerHeight / 2,
        end: containerHeight,
      }

      return (positions[startPos] ?? 0) - (positions[endPos] ?? 0)
    }, [])

    // Calculate progress
    const calculateProgress = useCallback(() => {
      const targetContainer = container ?? (typeof window !== 'undefined' ? window : null)
      const targetElement = containerRef.current

      if (!targetContainer || !targetElement) return

      let containerHeight: number
      let elementTop: number
      let elementHeight: number

      if (targetContainer === window) {
        containerHeight = window.innerHeight
        const rect = targetElement.getBoundingClientRect()
        elementTop = rect.top + window.scrollY
        elementHeight = rect.height
      } else {
        const containerEl = targetContainer as HTMLElement
        containerHeight = containerEl.clientHeight
        elementTop = targetElement.offsetTop
        elementHeight = targetElement.offsetHeight
        // Account for container scroll
        const containerRect = containerEl.getBoundingClientRect()
        elementTop -= containerRect.top + containerEl.scrollTop
      }

      const startOffset = parseOffset(start, containerHeight, elementHeight)
      const endOffset = parseOffset(end, containerHeight, elementHeight)

      const scrollTop = targetContainer === window
        ? window.scrollY
        : (targetContainer as HTMLElement).scrollTop

      const startScroll = elementTop - startOffset
      const endScroll = elementTop + elementHeight - endOffset
      const totalScroll = endScroll - startScroll

      let currentProgress = 0
      if (totalScroll !== 0) {
        currentProgress = (scrollTop - startScroll) / totalScroll
      }

      currentProgress = Math.max(0, Math.min(1, currentProgress))

      // Determine direction
      let currentDirection: ScrollTimelineRef['direction'] = null
      if (currentProgress > prevProgressRef.current) {
        currentDirection = horizontal ? 'left' : 'down'
      } else if (currentProgress < prevProgressRef.current) {
        currentDirection = horizontal ? 'right' : 'up'
      }

      // Check if in view
      const inView = currentProgress > 0 && currentProgress < 1

      // Update state
      setProgress(currentProgress)
      setDirection(currentDirection)
      setScrollPosition(scrollTop)

      if (inView !== isInView) {
        setIsInView(inView)
        if (inView) onEnter?.()
        else onLeave?.()
      }

      if (currentProgress !== prevProgressRef.current) {
        onProgress?.(currentProgress)
        prevProgressRef.current = currentProgress
      }
    }, [container, start, end, horizontal, parseOffset, onProgress, onEnter, onLeave, isInView])

    // Register a track for nested components
    const registerTrack = useCallback((track: { start: number; end: number; ease?: string | ((t: number) => number) }) => {
      tracksRef.current.push(track)
      return tracksRef.current.length - 1
    }, [])

    // Scroll handler
    useEffect(() => {
      if (effectiveDisabled) return

      const targetContainer = container ?? (typeof window !== 'undefined' ? window : null)
      if (!targetContainer) return

      const handleScroll = () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
        animationFrameRef.current = requestAnimationFrame(calculateProgress)
      }

      // Initial calculation
      calculateProgress()

      targetContainer.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', calculateProgress, { passive: true })

      return () => {
        targetContainer.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', calculateProgress)
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    }, [container, calculateProgress, effectiveDisabled])

    // Refresh method
    const refresh = useCallback(() => {
      calculateProgress()
    }, [calculateProgress])

    // Expose ref methods using useImperativeHandle
    useImperativeHandle(ref, () => ({
      progress,
      isInView,
      direction,
      scrollPosition,
      refresh,
    }), [progress, isInView, direction, scrollPosition, refresh])

    const contextValue = useMemo(() => ({
      progress,
      isInView,
      direction,
      scrollPosition,
      registerTrack,
    }), [progress, isInView, direction, scrollPosition, registerTrack])

    return (
      <ScrollTimelineContext.Provider value={contextValue}>
        <div
          ref={containerRef}
          className={cn('scroll-timeline', className)}
          style={style}
          data-progress={progress.toFixed(3)}
          data-in-view={isInView}
          data-direction={direction}
          data-reduced-motion={prefersReducedMotion}
        >
          {children}
        </div>
      </ScrollTimelineContext.Provider>
    )
  }
)

ScrollTimeline.displayName = 'ScrollTimeline'

/**
 * TimelineTrack - Maps timeline progress to animation progress
 */
export const TimelineTrack = forwardRef<HTMLDivElement, TimelineTrackProps>(
  (
    { children, progress: overrideProgress, start = 0, end = 1, ease, className, style },
    ref
  ) => {
    const context = useContext(ScrollTimelineContext)
    const [trackProgress, setTrackProgress] = useState(0)

    useEffect(() => {
      if (!context) return

      const parentProgress = overrideProgress ?? context.progress

      // Clamp to track range
      let localProgress = (parentProgress - start) / (end - start)
      localProgress = Math.max(0, Math.min(1, localProgress))

      // Apply easing
      if (ease) {
        if (typeof ease === 'function') {
          localProgress = ease(localProgress)
        } else {
          // CSS easing keywords
          const easingFunctions: Record<string, (t: number) => number> = {
            linear: t => t,
            ease: t => t * t * (3 - 2 * t),
            'ease-in': t => t * t,
            'ease-out': t => 1 - (1 - t) * (1 - t),
            'ease-in-out': t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
            'ease-out-in': t => t < 0.5 ? 0.5 * (1 - Math.pow(1 - 2 * t, 2)) : 0.5 * Math.pow(2 * t - 1, 2) + 0.5,
          }
          const fn = easingFunctions[ease] ?? easingFunctions.ease ?? ((t: number) => t)
          localProgress = fn(localProgress)
        }
      }

      setTrackProgress(localProgress)
    }, [context, overrideProgress, start, end, ease])

    // Render children with track progress as data attribute
    const childrenWithProgress = React.Children.map(children, child => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          'data-timeline-progress': trackProgress,
          'data-timeline-track': true,
        })
      }
      return child
    })

    return (
      <div
        ref={ref}
        className={cn('timeline-track', className)}
        style={style}
        data-track-progress={trackProgress.toFixed(3)}
      >
        {childrenWithProgress}
      </div>
    )
  }
)

TimelineTrack.displayName = 'TimelineTrack'

/**
 * TimelineTrigger - Fires callback at specific progress
 */
export const TimelineTrigger = forwardRef<HTMLDivElement, TimelineTriggerProps>(
  (
    { children, at, range, once = false, onTrigger, className, style },
    ref
  ) => {
    const context = useContext(ScrollTimelineContext)
    const triggeredRef = useRef(false)

    useEffect(() => {
      if (!context || triggeredRef.current && once) return

      const checkTrigger = () => {
        const progress = context.progress

        let shouldTrigger = false

        if (at !== undefined) {
          // Trigger at specific point (with small threshold)
          shouldTrigger = Math.abs(progress - at) < 0.001
        } else if (range) {
          shouldTrigger = progress >= range[0] && progress <= range[1]
        }

        if (shouldTrigger && (!triggeredRef.current || !once)) {
          triggeredRef.current = true
          onTrigger?.(progress)
        } else if (!shouldTrigger && once && triggeredRef.current) {
          triggeredRef.current = false
        }
      }

      checkTrigger()
    }, [context, at, range, once, onTrigger])

    return (
      <div
        ref={ref}
        className={cn('timeline-trigger', className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

TimelineTrigger.displayName = 'TimelineTrigger'

/**
 * Hook for using scroll timeline in any component
 */
export function useScrollTimeline() {
  const context = useContext(ScrollTimelineContext)

  if (!context) {
    throw new Error('useScrollTimeline must be used within a ScrollTimeline provider')
  }

  return context
}

/**
 * Hook for creating scroll-linked animations
 */
export function useScrollAnimation(
  keyframes: Record<string, [number, number]>,
  _options?: {
    timeline?: 'root' | 'nearest'
    range?: [number, number]
  }
) {
  const context = useContext(ScrollTimelineContext)

  if (!context) {
    return { style: {} }
  }

  const progress = context.progress

  const style: Record<string, string | number> = {}

  Object.entries(keyframes).forEach(([property, [startValue, endValue]]) => {
    const value = startValue + (endValue - startValue) * progress
    style[property] = value
  })

  return { style, progress: context.progress }
}

export default ScrollTimeline