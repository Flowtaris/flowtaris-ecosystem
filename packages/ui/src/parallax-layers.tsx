// @flowtaris/ui - ParallaxLayers Component
// 6-layer depth parallax system with configurable speeds and reduced motion support

'use client'

import React, { useEffect, useRef, useState, useMemo, forwardRef, useImperativeHandle } from 'react'
import { cn } from './utils'

export interface ParallaxLayerProps {
  /** Layer depth index (1-6) - determines parallax speed */
  depth: 1 | 2 | 3 | 4 | 5 | 6
  /** Custom speed multiplier (overrides depth-based speed) */
  speed?: number
  /** Layer content */
  children: React.ReactNode
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Z-index offset */
  zIndex?: number
  /** Whether this layer should scale with depth */
  scale?: boolean
  /** Transform origin for scaling */
  transformOrigin?: string
  /** Internal: speed multiplier */
  _speed?: number
}

export interface ParallaxLayersProps {
  /** Array of layer configurations */
  layers: Array<{
    depth: 1 | 2 | 3 | 4 | 5 | 6
    speed?: number
    scale?: boolean
    transformOrigin?: string
    children: React.ReactNode
    className?: string
    style?: React.CSSProperties
    zIndex?: number
  }>
  /** Container height */
  height?: string | number
  /** Container width */
  width?: string | number
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Disable parallax effect */
  disabled?: boolean
  /** Custom perspective value */
  perspective?: number
  /** Callback on scroll progress (0-1) */
  onScroll?: (progress: number) => void
  /** Internal: disabled flag */
  _disabled?: boolean
  /** Internal: perspective value */
  _perspective?: number
}

/**
 * Parallax speed multipliers for each depth layer
 * Layer 1 (background) = 0.10x, Layer 6 (foreground) = 1.20x
 */
const DEPTH_SPEEDS: Record<1 | 2 | 3 | 4 | 5 | 6, number> = {
  1: 0.10,
  2: 0.25,
  3: 0.50,
  4: 0.75,
  5: 1.00,
  6: 1.20,
}

/**
 * Default scale factors for each depth (for 3D perspective effect)
 */
const DEPTH_SCALES: Record<1 | 2 | 3 | 4 | 5 | 6, number> = {
  1: 1.4,
  2: 1.25,
  3: 1.15,
  4: 1.08,
  5: 1.03,
  6: 1.0,
}

/**
 * Single ParallaxLayer component
 */
export const ParallaxLayer = forwardRef<HTMLDivElement, ParallaxLayerProps>(
  (
    {
      depth,
      speed,
      children,
      className,
      style,
      zIndex = 0,
      scale = true,
      transformOrigin = 'center center',
    },
    ref
  ) => {
    const layerSpeed = speed ?? DEPTH_SPEEDS[depth]
    const layerScale = scale ? DEPTH_SCALES[depth] : 1
    const elementRef = useRef<HTMLDivElement>(null)
    const [transform, setTransform] = useState({ x: 0, y: 0 })

    // Expose DOM element via ref
    useImperativeHandle(ref, () => elementRef.current!, [])

    // Parallax transform effect
    useEffect(() => {
      const element = elementRef.current
      if (!element) return

      const handleScroll = () => {
        const rect = element.getBoundingClientRect()
        const viewportHeight = window.innerHeight

        // Calculate progress (0-1) based on element position in viewport
        const progress = 1 - (rect.bottom / (rect.height + viewportHeight))
        const clampedProgress = Math.max(0, Math.min(1, progress))

        // Calculate parallax offset
        const offset = (clampedProgress - 0.5) * 2 * layerSpeed * 100

        setTransform({ x: 0, y: offset })
      }

      // Initial calculation
      handleScroll()

      // Listen for scroll
      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [layerSpeed])

    const layerStyle: React.CSSProperties = useMemo(() => ({
      position: 'absolute',
      inset: 0,
      transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${layerScale})`,
      transformOrigin,
      willChange: 'transform',
      zIndex,
      ...style,
    }), [transform.x, transform.y, layerScale, transformOrigin, zIndex, style])

    return (
      <div
        ref={elementRef}
        className={cn('parallax-layer', className)}
        style={layerStyle}
        data-depth={depth}
        data-speed={layerSpeed}
      >
        {children}
      </div>
    )
  }
)

ParallaxLayer.displayName = 'ParallaxLayer'

/**
 * ParallaxLayers container component - manages 6-layer depth system
 */
export const ParallaxLayers: React.FC<ParallaxLayersProps> = (
  {
    layers,
    height = '100vh',
    width = '100%',
    className,
    style,
    disabled = false,
    perspective = 1000,
    onScroll,
  }
) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Track scroll progress for callback
  useEffect(() => {
    if (disabled) return

    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const viewportHeight = window.innerHeight

      const progress = 1 - (rect.bottom / (rect.height + viewportHeight))
      const clampedProgress = Math.max(0, Math.min(1, progress))

      onScroll?.(clampedProgress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [disabled, onScroll])

  // Reduced motion support
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }, [])

  const effectiveDisabled = disabled || prefersReducedMotion

  const containerStyle: React.CSSProperties = useMemo(() => ({
    position: 'relative',
    height,
    width,
    overflow: 'hidden',
    perspective: effectiveDisabled ? 'none' : `${perspective}px`,
    transformStyle: 'preserve-3d',
    ...style,
  }), [height, width, perspective, effectiveDisabled, style])

  return (
    <div
      ref={containerRef}
      className={cn('parallax-container', className)}
      style={containerStyle}
      data-parallax-enabled={!effectiveDisabled}
    >
      {layers.map((layer, index) => (
        <ParallaxLayer
          key={index}
          depth={layer.depth}
          speed={layer.speed}
          scale={layer.scale ?? true}
          transformOrigin={layer.transformOrigin}
          zIndex={layer.zIndex ?? index}
          className={layer.className}
          style={layer.style}
        >
          {layer.children}
        </ParallaxLayer>
      ))}
    </div>
  )
}

ParallaxLayers.displayName = 'ParallaxLayers'

/**
 * Hook for accessing parallax scroll progress
 */
export function useParallaxScroll() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrollTop / docHeight))
      setProgress(progress)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}

export default ParallaxLayers