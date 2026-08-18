// @flowtaris/ui - IrisWindow Component
// Iris/aperture-style radial reveal with adjustable blades, rotation, and glow effects

'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { cn } from './utils'

export interface IrisWindowProps {
  /** Children to reveal through the iris */
  children: React.ReactNode
  /** Background content (behind the iris) */
  background?: React.ReactNode
  /** Iris aperture progress (0-1, 0 = closed, 1 = fully open) */
  aperture?: number
  /** Number of iris blades */
  blades?: number
  /** Blade curvature (0 = straight, 1 = fully curved) */
  curvature?: number
  /** Rotation of the entire iris (degrees) */
  rotation?: number
  /** Blade thickness ratio (0-0.5) */
  bladeThickness?: number
  /** Enable animated aperture changes */
  animated?: boolean
  /** Animation duration (ms) */
  duration?: number
  /** Animation easing */
  easing?: string
  /** Auto-rotate the iris */
  autoRotate?: boolean
  /** Auto-rotation speed (degrees per second) */
  rotationSpeed?: number
  /** Enable glow effect at blade edges */
  glow?: boolean
  /** Glow color */
  glowColor?: string
  /** Glow intensity (0-1) */
  glowIntensity?: number
  /** Glow blur radius */
  glowBlur?: number
  /** Center the iris */
  centered?: boolean
  /** Iris position X (0-1, relative to container) */
  positionX?: number
  /** Iris position Y (0-1, relative to container) */
  positionY?: number
  /** Container width */
  width?: string | number
  /** Container height */
  height?: string | number
  /** Border radius of container */
  borderRadius?: string | number
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Callback on aperture change */
  onApertureChange?: (aperture: number) => void
  /** Callback on rotation change */
  onRotationChange?: (rotation: number) => void
  /** ARIA label */
  ariaLabel?: string
  /** Internal: centered */
  _centered?: boolean
  /** Internal: position X */
  _positionX?: number
  /** Internal: position Y */
  _positionY?: number
}

export interface IrisWindowRef {
  /** Current aperture (0-1) */
  aperture: number
  /** Current rotation (degrees) */
  rotation: number
  /** Set aperture directly */
  setAperture: (aperture: number) => void
  /** Set rotation directly */
  setRotation: (rotation: number) => void
  /** Open the iris fully */
  open: () => void
  /** Close the iris fully */
  close: () => void
  /** Toggle iris state */
  toggle: () => void
  /** Start auto-rotation */
  startRotation: () => void
  /** Stop auto-rotation */
  stopRotation: () => void
}

/**
 * Generate SVG path for a single iris blade
 */
const generateBladePath = (
  index: number,
  totalBlades: number,
  aperture: number,
  curvature: number,
  rotation: number,
  bladeThickness: number,
  size: number,
  centerX: number,
  centerY: number
): string => {
  const angleStep = (2 * Math.PI) / totalBlades
  const baseAngle = index * angleStep + (rotation * Math.PI / 180)

  // Aperture affects the inner radius
  const maxInnerRadius = size * 0.4
  const innerRadius = maxInnerRadius * (1 - aperture)
  const outerRadius = size * 0.7

  // Calculate blade vertices
  const halfAngle = angleStep / 2
  const curvatureOffset = curvature * size * 0.15

  // Inner vertices
  const innerAngle1 = baseAngle - halfAngle
  const innerAngle2 = baseAngle + halfAngle

  const innerX1 = centerX + innerRadius * Math.cos(innerAngle1)
  const innerY1 = centerY + innerRadius * Math.sin(innerAngle1)
  const innerX2 = centerX + innerRadius * Math.cos(innerAngle2)
  const innerY2 = centerY + innerRadius * Math.sin(innerAngle2)

  // Outer vertices
  const outerAngle1 = baseAngle - halfAngle
  const outerAngle2 = baseAngle + halfAngle

  const outerX1 = centerX + outerRadius * Math.cos(outerAngle1)
  const outerY1 = centerY + outerRadius * Math.sin(outerAngle1)
  const outerX2 = centerX + outerRadius * Math.cos(outerAngle2)
  const outerY2 = centerY + outerRadius * Math.sin(outerAngle2)

  // Control points for curved blades
  const ctrlAngle = baseAngle
  const ctrlRadius = (innerRadius + outerRadius) / 2 + curvatureOffset
  const ctrlX = centerX + ctrlRadius * Math.cos(ctrlAngle)
  const ctrlY = centerY + ctrlRadius * Math.sin(ctrlAngle)

  if (curvature > 0) {
    // Curved blade using quadratic Bezier
    return [
      `M ${innerX1} ${innerY1}`,
      `Q ${ctrlX} ${ctrlY} ${outerX1} ${outerY1}`,
      `L ${outerX2} ${outerY2}`,
      `Q ${ctrlX} ${ctrlY} ${innerX2} ${innerY2}`,
      'Z',
    ].join(' ')
  } else {
    // Straight blade
    return [
      `M ${innerX1} ${innerY1}`,
      `L ${outerX1} ${outerY1}`,
      `L ${outerX2} ${outerY2}`,
      `L ${innerX2} ${innerY2}`,
      'Z',
    ].join(' ')
  }
}

/**
 * Generate complete iris SVG
 */
const generateIrisSVG = (
  blades: number,
  aperture: number,
  curvature: number,
  rotation: number,
  bladeThickness: number,
  size: number,
  glow: boolean,
  glowColor: string,
  glowIntensity: number,
  glowBlur: number
): string => {
  const centerX = size / 2
  const centerY = size / 2

  const bladePaths = Array.from({ length: blades }, (_, i) =>
    generateBladePath(i, blades, aperture, curvature, rotation, bladeThickness, size, centerX, centerY)
  )

  const filterId = `iris-glow-${blades}-${aperture}`

  return `
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      ${glow ? `
        <defs>
          <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="${glowBlur}" result="blur"/>
            <feFlood flood-color="${glowColor}" flood-opacity="${glowIntensity}" result="glowColor"/>
            <feComposite in="glowColor" in2="blur" operator="in" result="glow"/>
            <feComposite in="SourceGraphic" in2="glow" operator="over"/>
          </filter>
        </defs>
      ` : ''}
      <g ${glow ? `filter="url(#${filterId})"` : ''}>
        ${bladePaths.map((path, i) => `
          <path
            d="${path}"
            fill="currentColor"
            stroke="none"
            style="mix-blend-mode: multiply;"
            data-blade="${i}"
          />
        `).join('')}
      </g>
      <!-- Central aperture hole -->
      <circle
        cx="${centerX}"
        cy="${centerY}"
        r="${size * 0.4 * (1 - aperture)}"
        fill="transparent"
        stroke="none"
      />
    </svg>
  `
}

/**
 * IrisWindow Component
 */
export const IrisWindow = forwardRef<IrisWindowRef, IrisWindowProps>(
  (
    {
      children,
      background,
      aperture = 0,
      blades = 6,
      curvature = 0.5,
      rotation = 0,
      bladeThickness = 0.08,
      animated = true,
      duration = 800,
      easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      autoRotate = false,
      rotationSpeed = 15,
      glow = true,
      glowColor = '#00b8db',
      glowIntensity = 0.6,
      glowBlur = 8,
      _centered = true,
      _positionX = 0.5,
      _positionY = 0.5,
      width = 400,
      height = 400,
      borderRadius = '50%',
      className,
      style,
      onApertureChange,
      onRotationChange,
      ariaLabel,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const rotationAnimationRef = useRef<number | undefined>(undefined)
    const [currentAperture, setCurrentAperture] = useState(aperture)
    const [currentRotation, setCurrentRotation] = useState(rotation)
    const [svgSize, setSvgSize] = useState(400)
    const targetApertureRef = useRef(aperture)
    const targetRotationRef = useRef(rotation)
    const autoRotateRef = useRef(autoRotate)
    const rotationSpeedRef = useRef(rotationSpeed)

    // Reduced motion support
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])

    const effectiveDisabled = prefersReducedMotion

    // Keep refs in sync with props
    useEffect(() => {
      autoRotateRef.current = autoRotate
    }, [autoRotate])

    useEffect(() => {
      rotationSpeedRef.current = rotationSpeed
    }, [rotationSpeed])

    // Update container size
    useEffect(() => {
      const container = containerRef.current
      if (container) {
        const rect = container.getBoundingClientRect()
        const size = Math.max(rect.width, rect.height) * 1.2
        setSvgSize(Math.ceil(size))
      }
    }, [])

    // Easing function
    const easingFn = useMemo(() => {
      if (typeof easing === 'string' && easing.startsWith('cubic-bezier')) {
        // Approximate cubic-bezier(0.25, 0.1, 0.25, 1)
        return (t: number) => t * t * t * (t * (6 * t - 15) + 10)
      }
      const easings: Record<string, (t: number) => number> = {
        linear: t => t,
        ease: t => t * t * (3 - 2 * t),
        'ease-in': t => t * t,
        'ease-out': t => 1 - (1 - t) * (1 - t),
        'ease-in-out': t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2,
      }
      return easings[easing] ?? easings.ease ?? ((t: number) => t)
    }, [easing])

    // Animate aperture
    const animateAperture = useCallback(() => {
      const start = currentAperture
      const target = targetApertureRef.current
      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        let progress = Math.min(1, elapsed / duration)
        progress = easingFn(progress)

        const value = start + (target - start) * progress
        setCurrentAperture(value)
        onApertureChange?.(value)

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        }
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      animationRef.current = requestAnimationFrame(animate)
    }, [currentAperture, duration, easingFn, onApertureChange])

    // Animate rotation
    const animateRotation = useCallback(() => {
      const start = currentRotation
      const target = targetRotationRef.current
      const startTime = performance.now()

      const animate = (now: number) => {
        const elapsed = now - startTime
        let progress = Math.min(1, elapsed / duration)
        progress = easingFn(progress)

        // Handle shortest rotation path
        let diff = target - start
        diff = ((diff + 180) % 360) - 180

        const value = start + diff * progress
        setCurrentRotation(value)
        onRotationChange?.(value)

        if (progress < 1) {
          rotationAnimationRef.current = requestAnimationFrame(animate)
        }
      }

      if (rotationAnimationRef.current) {
        cancelAnimationFrame(rotationAnimationRef.current)
      }
      rotationAnimationRef.current = requestAnimationFrame(animate)
    }, [currentRotation, duration, easingFn, onRotationChange])

    // Update when props change
    useEffect(() => {
      targetApertureRef.current = aperture
      if (effectiveDisabled) {
        setCurrentAperture(aperture)
        onApertureChange?.(aperture)
      } else if (animated) {
        animateAperture()
      } else {
        setCurrentAperture(aperture)
      }
    }, [aperture, animated, animateAperture, effectiveDisabled])

    useEffect(() => {
      targetRotationRef.current = rotation
      if (effectiveDisabled) {
        setCurrentRotation(rotation)
        onRotationChange?.(rotation)
      } else if (animated && !autoRotateRef.current) {
        animateRotation()
      } else if (!animated) {
        setCurrentRotation(rotation)
      }
    }, [rotation, animated, animateRotation, effectiveDisabled])

    // Auto-rotate effect
    useEffect(() => {
      if (!autoRotateRef.current || effectiveDisabled) return

      let lastTime = performance.now()

      const rotate = (now: number) => {
        const delta = (now - lastTime) / 1000
        lastTime = now

        targetRotationRef.current += rotationSpeedRef.current * delta
        setCurrentRotation(targetRotationRef.current)
        onRotationChange?.(targetRotationRef.current)

        rotationAnimationRef.current = requestAnimationFrame(rotate)
      }

      rotationAnimationRef.current = requestAnimationFrame(rotate)

      return () => {
        if (rotationAnimationRef.current) {
          cancelAnimationFrame(rotationAnimationRef.current)
        }
      }
    }, [onRotationChange, effectiveDisabled])

    // Generate iris SVG
    const irisSVG = useMemo(() => {
      return generateIrisSVG(
        blades,
        currentAperture,
        curvature,
        currentRotation,
        bladeThickness,
        svgSize,
        glow,
        glowColor,
        glowIntensity,
        glowBlur
      )
    }, [
      blades,
      currentAperture,
      curvature,
      currentRotation,
      bladeThickness,
      svgSize,
      glow,
      glowColor,
      glowIntensity,
      glowBlur,
    ])

    // Container styles
    const containerStyle = useMemo<React.CSSProperties>(() => ({
      width,
      height,
      borderRadius,
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }), [width, height, borderRadius, style])

    // Content wrapper (clipped by iris)
    const contentWrapperStyle: React.CSSProperties = {
      position: 'absolute',
      inset: 0,
      overflow: 'hidden',
    }

    // Content style
    const contentStyle: React.CSSProperties = {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }

    // Create mask image
    const maskImage = useMemo(() => `url("data:image/svg+xml;base64,${btoa(irisSVG)}")`, [irisSVG])

    // Expose ref methods using useImperativeHandle
    useImperativeHandle(ref, () => ({
      get aperture() { return currentAperture },
      get rotation() { return currentRotation },
      setAperture: (a: number) => {
        targetApertureRef.current = Math.max(0, Math.min(1, a))
        if (animated) {
          animateAperture()
        } else {
          setCurrentAperture(targetApertureRef.current)
        }
      },
      setRotation: (r: number) => {
        targetRotationRef.current = r
        if (animated) {
          animateRotation()
        } else {
          setCurrentRotation(targetRotationRef.current)
        }
      },
      open: () => {
        targetApertureRef.current = 1
        if (effectiveDisabled) setCurrentAperture(1)
        else if (animated) animateAperture()
        else setCurrentAperture(1)
      },
      close: () => {
        targetApertureRef.current = 0
        if (effectiveDisabled) setCurrentAperture(0)
        else if (animated) animateAperture()
        else setCurrentAperture(0)
      },
      toggle: () => {
        targetApertureRef.current = currentAperture > 0.5 ? 0 : 1
        if (effectiveDisabled) setCurrentAperture(targetApertureRef.current)
        else if (animated) animateAperture()
        else setCurrentAperture(targetApertureRef.current)
      },
      startRotation: () => {
        if (!effectiveDisabled) autoRotateRef.current = true
      },
      stopRotation: () => {
        autoRotateRef.current = false
      },
    }), [currentAperture, currentRotation, animated, animateAperture, animateRotation, effectiveDisabled])

    return (
      <div
        ref={containerRef}
        className={cn('iris-window', className)}
        style={containerStyle}
        role="img"
        aria-label={ariaLabel || 'Iris window reveal'}
        data-aperture={currentAperture.toFixed(2)}
        data-rotation={currentRotation.toFixed(1)}
        data-reduced-motion={prefersReducedMotion}
      >
        {/* Background layer */}
        {background && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {background}
          </div>
        )}

        {/* Content layer (foreground) - clipped by iris */}
        <div style={contentWrapperStyle}>
          <div
            style={{
              ...contentStyle,
              WebkitMaskImage: maskImage,
              maskImage: maskImage,
              WebkitMaskSize: 'cover',
              maskSize: 'cover',
              WebkitMaskPosition: 'center',
              maskPosition: 'center',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
            className="iris-window-content"
          >
            {children}
          </div>
        </div>
      </div>
    )
  }
)

IrisWindow.displayName = 'IrisWindow'

/**
 * Hook for controlling IrisWindow
 */
export function useIrisWindow(ref: React.RefObject<IrisWindowRef | null>) {
  const setAperture = useCallback((aperture: number) => {
    ref.current?.setAperture(aperture)
  }, [ref])

  const setRotation = useCallback((rotation: number) => {
    ref.current?.setRotation(rotation)
  }, [ref])

  const open = useCallback(() => {
    ref.current?.open()
  }, [ref])

  const close = useCallback(() => {
    ref.current?.close()
  }, [ref])

  const toggle = useCallback(() => {
    ref.current?.toggle()
  }, [ref])

  return {
    aperture: ref.current?.aperture ?? 0,
    rotation: ref.current?.rotation ?? 0,
    setAperture,
    setRotation,
    open,
    close,
    toggle,
  }
}

export default IrisWindow