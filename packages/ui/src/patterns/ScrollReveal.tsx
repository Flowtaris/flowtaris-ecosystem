// @flowtaris/ui - ScrollReveal Pattern
// IntersectionObserver-based scroll reveal animations with design token integration

'use client'

import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { cn } from '../utils'

// ============================================
// Types
// ============================================

export type ScrollRevealVariant =
  | 'fade'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale'
  | 'scale-up'
  | 'flip-x'
  | 'flip-y'
  | 'blur'
  | 'rotate'

export interface ScrollRevealProps {
  /** Animation variant */
  variant?: ScrollRevealVariant
  /** Delay before animation starts (ms) */
  delay?: number
  /** Animation duration (ms) */
  duration?: number
  /** Easing function */
  easing?: string
  /** Trigger once (don't reverse on scroll out) */
  once?: boolean
  /** Root margin for IntersectionObserver */
  rootMargin?: string
  /** Threshold for triggering */
  threshold?: number | number[]
  /** Disable animation (reduced motion respect) */
  disabled?: boolean
  /** Children to animate */
  children: React.ReactNode
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Called when element enters viewport */
  onReveal?: () => void
  /** Called when element leaves viewport (if !once) */
  onHide?: () => void
  /** Render as element */
  as?: React.ElementType
  /** ARIA role */
  role?: string
}

const VARIANT_STYLES: Record<ScrollRevealVariant, { initial: string; animate: string }> = {
  fade: { initial: 'opacity-0', animate: 'opacity-100' },
  'fade-up': { initial: 'opacity-0 translate-y-8', animate: 'opacity-100 translate-y-0' },
  'fade-down': { initial: 'opacity-0 -translate-y-8', animate: 'opacity-100 translate-y-0' },
  'fade-left': { initial: 'opacity-0 translate-x-8', animate: 'opacity-100 translate-x-0' },
  'fade-right': { initial: 'opacity-0 -translate-x-8', animate: 'opacity-100 translate-x-0' },
  'slide-up': { initial: 'translate-y-10', animate: 'translate-y-0' },
  'slide-down': { initial: '-translate-y-10', animate: 'translate-y-0' },
  'slide-left': { initial: 'translate-x-10', animate: 'translate-x-0' },
  'slide-right': { initial: '-translate-x-10', animate: 'translate-x-0' },
  scale: { initial: 'opacity-0 scale-95', animate: 'opacity-100 scale-100' },
  'scale-up': { initial: 'opacity-0 scale-105', animate: 'opacity-100 scale-100' },
  'flip-x': { initial: 'opacity-0 rotate-x-90', animate: 'opacity-100 rotate-x-0' },
  'flip-y': { initial: 'opacity-0 rotate-y-90', animate: 'opacity-100 rotate-y-0' },
  blur: { initial: 'opacity-0 blur-md', animate: 'opacity-100 blur-0' },
  rotate: { initial: 'opacity-0 rotate-12', animate: 'opacity-100 rotate-0' },
}

// ============================================
// ScrollReveal Component
// ============================================

const _ScrollReveal = forwardRef<HTMLDivElement, ScrollRevealProps>(
  (
    {
      variant = 'fade-up',
      delay = 0,
      duration = 600,
      easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
      once = true,
      rootMargin = '0px 0px -10% 0px',
      threshold = 0.1,
      disabled = false,
      children,
      className,
      style,
      onReveal,
      onHide,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    const elementRef = useRef<HTMLDivElement>(null)
    const [isVisible, setIsVisible] = useState(false)
    const [hasAnimated, setHasAnimated] = useState(false)
    const observerRef = useRef<IntersectionObserver | null>(null)

    // Respect reduced motion
    const prefersReducedMotion = typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false

    const effectiveDisabled = disabled || prefersReducedMotion

    useEffect(() => {
      if (effectiveDisabled || !elementRef.current) {
        setIsVisible(true)
        setHasAnimated(true)
        return
      }

      const element = elementRef.current

      observerRef.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            setHasAnimated(true)
            onReveal?.()
          } else if (!once && hasAnimated) {
            setIsVisible(false)
            onHide?.()
          }
        },
        { rootMargin, threshold }
      )

      observerRef.current.observe(element)

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect()
        }
      }
    }, [effectiveDisabled, once, rootMargin, threshold, onReveal, onHide, hasAnimated])

    // Handle delay
    const [shouldAnimate, setShouldAnimate] = useState(false)

    useEffect(() => {
      if (isVisible && !effectiveDisabled) {
        const timer = setTimeout(() => setShouldAnimate(true), delay)
        return () => clearTimeout(timer)
      } else {
        setShouldAnimate(false)
      }
    }, [isVisible, delay, effectiveDisabled])

    const { initial, animate } = VARIANT_STYLES[variant]

    const transitionStyle: React.CSSProperties = {
      transitionDuration: `${duration}ms`,
      transitionTimingFunction: easing,
      transitionProperty: 'opacity, transform, filter',
      willChange: 'opacity, transform, filter',
      ...style,
    }

    const computedClassName = cn(
      'transition-all',
      shouldAnimate ? animate : initial,
      className
    )

    return (
      <Component
        ref={(el: HTMLDivElement | null) => {
          elementRef.current = el
          if (typeof ref === 'function') ref(el)
          else if (ref) ref.current = el
        }}
        className={computedClassName}
        style={transitionStyle}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

_ScrollReveal.displayName = 'ScrollReveal'

// ============================================
// Staggered ScrollReveal Wrapper
// ============================================

export interface StaggeredRevealProps {
  /** Children elements to stagger */
  children: React.ReactElement | React.ReactElement[]
  /** Stagger delay between items (ms) */
  staggerDelay?: number
  /** Base variant for all children */
  variant?: ScrollRevealVariant
  /** Base duration for all children */
  duration?: number
  /** Base easing for all children */
  easing?: string
  /** Trigger once */
  once?: boolean
  /** Root margin */
  rootMargin?: string
  /** Threshold */
  threshold?: number | number[]
  /** Disable animations */
  disabled?: boolean
  /** Container props */
  containerProps?: React.HTMLAttributes<HTMLDivElement>
}

/**
 * StaggeredReveal - Wraps multiple children with staggered reveal animations
 */
export const StaggeredReveal: React.FC<StaggeredRevealProps> = ({
  children,
  staggerDelay = 100,
  variant = 'fade-up',
  duration = 600,
  easing = 'cubic-bezier(0.4, 0, 0.2, 1)',
  once = true,
  rootMargin = '0px 0px -10% 0px',
  threshold = 0.1,
  disabled = false,
  containerProps,
}) => {
  const childrenArray = React.Children.toArray(children).filter(
    (child): child is React.ReactElement => React.isValidElement(child)
  )

  return (
    <div {...containerProps} role="list">
      {childrenArray.map((child, index) => (
        <_ScrollReveal
          key={child.key ?? index}
          variant={variant}
          delay={index * staggerDelay}
          duration={duration}
          easing={easing}
          once={once}
          rootMargin={rootMargin}
          threshold={threshold}
          disabled={disabled}
          as="div"
          role="listitem"
        >
          {child}
        </_ScrollReveal>
      ))}
    </div>
  )
}

StaggeredReveal.displayName = 'StaggeredReveal'

// ============================================
// Exports
// ============================================

export const ScrollReveal = _ScrollReveal