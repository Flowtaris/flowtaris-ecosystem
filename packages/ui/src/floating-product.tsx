// @flowtaris/ui - FloatingProduct Component
// 3D floating product showcase with mouse parallax, auto-rotation, and gesture support

'use client'

import React, { useEffect, useRef, useState, useMemo, useCallback, forwardRef, useImperativeHandle } from 'react'
import { cn } from './utils'

export interface FloatingProductProps {
  /** Product image source */
  src: string
  /** Alt text for accessibility */
  alt?: string
  /** Additional image sources for 360 degree rotation */
  frames?: string[]
  /** Enable mouse parallax effect */
  mouseParallax?: boolean
  /** Parallax strength (0-1) */
  parallaxStrength?: number
  /** Enable auto-rotation */
  autoRotate?: boolean
  /** Auto-rotation speed (degrees per second) */
  rotationSpeed?: number
  /** Pause rotation on hover */
  pauseOnHover?: boolean
  /** Enable touch/drag rotation */
  draggable?: boolean
  /** Damping for smooth motion */
  damping?: number
  /** Container width */
  width?: string | number
  /** Container height */
  height?: string | number
  /** Border radius */
  borderRadius?: string | number
  /** Box shadow */
  shadow?: boolean
  /** Shadow intensity */
  shadowIntensity?: number
  /** Background color */
  background?: string
  /** Additional CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Callback on rotation change */
  onRotationChange?: (rotation: { x: number; y: number }) => void
  /** Callback on load */
  onLoad?: () => void
  /** Callback on error */
  onError?: (error: Error) => void
  /** Loading placeholder */
  placeholder?: React.ReactNode
  /** Show loading spinner */
  showSpinner?: boolean
  /** ARIA label */
  ariaLabel?: string
  /** Internal: mouse parallax */
  _mouseParallax?: boolean
  /** Internal: auto rotate */
  _autoRotate?: boolean
  /** Internal: pause on hover */
  _pauseOnHover?: boolean
  /** Internal: draggable */
  _draggable?: boolean
}

export interface FloatingProductRef {
  /** Current rotation */
  rotation: { x: number; y: number }
  /** Set rotation directly */
  setRotation: (rotation: { x: number; y: number }) => void
  /** Reset to initial position */
  reset: () => void
  /** Start auto-rotation */
  startAutoRotate: () => void
  /** Stop auto-rotation */
  stopAutoRotate: () => void
  /** Toggle auto-rotation */
  toggleAutoRotate: () => void
}

/**
 * FloatingProduct Component - 3D floating product showcase
 */
export const FloatingProduct = forwardRef<FloatingProductRef, FloatingProductProps>(
  (
    {
      src,
      alt = '',
      frames,
      mouseParallax = true,
      parallaxStrength = 0.15,
      autoRotate = true,
      rotationSpeed = 10,
      pauseOnHover = true,
      draggable = true,
      damping = 0.1,
      width = 400,
      height = 400,
      borderRadius = '24px',
      shadow = true,
      shadowIntensity = 1,
      background = 'transparent',
      className,
      style,
      onRotationChange,
      onLoad,
      onError,
      placeholder,
      showSpinner = true,
      ariaLabel,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)
    const animationRef = useRef<number | undefined>(undefined)
    const isHoveringRef = useRef(false)
    const isDraggingRef = useRef(false)
    const dragStartRef = useRef({ x: 0, y: 0 })
    const rotationRef = useRef({ x: 0, y: 0 })
    const targetRotationRef = useRef({ x: 0, y: 0 })
    const velocityRef = useRef({ x: 0, y: 0 })
    const autoRotateRef = useRef(autoRotate)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState<Error | null>(null)
    const [currentFrame, setCurrentFrame] = useState(0)

    // Reduced motion support - must be declared before use in callbacks
    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }, [])

    // Keep autoRotate ref in sync
    useEffect(() => {
      autoRotateRef.current = autoRotate
    }, [autoRotate])

    // Mouse move handler for parallax
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      if (!mouseParallax || isDraggingRef.current || prefersReducedMotion) return

      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const deltaX = (e.clientX - centerX) / (rect.width / 2)
      const deltaY = (e.clientY - centerY) / (rect.height / 2)

      targetRotationRef.current = {
        x: -deltaY * 30 * parallaxStrength,
        y: deltaX * 30 * parallaxStrength,
      }
    }, [mouseParallax, parallaxStrength, prefersReducedMotion])

    // Mouse leave - reset to center or continue auto-rotate
    const handleMouseLeave = useCallback(() => {
      isHoveringRef.current = false
      if (!autoRotateRef.current) {
        targetRotationRef.current = { x: 0, y: 0 }
      }
    }, [])

    // Mouse enter - pause auto-rotate
    const handleMouseEnter = useCallback(() => {
      isHoveringRef.current = true
    }, [])

    // Touch/Drag handlers
    const handleDragStart = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!draggable) return

      isDraggingRef.current = true
      let clientX: number, clientY: number
      if ('touches' in e) {
        clientX = e.touches[0]?.clientX ?? 0
        clientY = e.touches[0]?.clientY ?? 0
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      dragStartRef.current = { x: clientX, y: clientY }
      velocityRef.current = { x: 0, y: 0 }

      // Pause auto-rotate during drag
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }, [draggable])

    const handleDragMove = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return

      e.preventDefault()
      let clientX: number, clientY: number
      if ('touches' in e) {
        clientX = e.touches[0]?.clientX ?? 0
        clientY = e.touches[0]?.clientY ?? 0
      } else {
        clientX = e.clientX
        clientY = e.clientY
      }

      const deltaX = clientX - dragStartRef.current.x
      const deltaY = clientY - dragStartRef.current.y

      // Update velocity for momentum
      velocityRef.current = {
        x: deltaX * 0.1,
        y: deltaY * 0.1,
      }

      targetRotationRef.current = {
        x: rotationRef.current.x - deltaY * 0.5,
        y: rotationRef.current.y + deltaX * 0.5,
      }
    }, [])

    // Animation loop for smooth rotation and damping
    const startAnimationLoop = useCallback(() => {
      const animate = () => {
        // Auto-rotate
        if (autoRotateRef.current && !isHoveringRef.current && !isDraggingRef.current && pauseOnHover) {
          targetRotationRef.current.y += rotationSpeed / 60
        }

        // Apply damping
        rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * damping
        rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * damping

        // Apply momentum from drag
        if (Math.abs(velocityRef.current.x) > 0.01 || Math.abs(velocityRef.current.y) > 0.01) {
          rotationRef.current.y += velocityRef.current.x
          rotationRef.current.x += velocityRef.current.y
          velocityRef.current.x *= 0.95
          velocityRef.current.y *= 0.95
        }

        // Update frame for 360 degree views
        if (frames && frames.length > 1) {
          const frameIndex = Math.floor(
            ((rotationRef.current.y % 360) + 360) / 360 * frames.length
          ) % frames.length
          if (frameIndex !== currentFrame) {
            setCurrentFrame(frameIndex)
          }
        }

        // Trigger callback
        onRotationChange?.({ ...rotationRef.current })

        animationRef.current = requestAnimationFrame(animate)
      }

      animate()
    }, [pauseOnHover, rotationSpeed, damping, frames, currentFrame, onRotationChange])

    const handleDragEnd = useCallback(() => {
      if (!isDraggingRef.current) return

      isDraggingRef.current = false

      // Apply momentum
      if (autoRotateRef.current) {
        startAnimationLoop()
      }
    }, [startAnimationLoop])

    // Start animation loop (disabled for reduced motion)
    useEffect(() => {
      if (prefersReducedMotion) return

      startAnimationLoop()
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current)
        }
      }
    }, [startAnimationLoop, prefersReducedMotion])

    // Image load handlers
    const handleLoad = useCallback(() => {
      setLoaded(true)
      setError(null)
      onLoad?.()
    }, [onLoad])

    const handleError = useCallback((_e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const err = new Error('Failed to load image')
      setError(err)
      onError?.(err)
    }, [onError])

    // Expose ref methods using useImperativeHandle
    useImperativeHandle(ref, () => ({
      get rotation() { return rotationRef.current },
      setRotation: (rot: { x: number; y: number }) => {
        targetRotationRef.current = rot
      },
      reset: () => {
        targetRotationRef.current = { x: 0, y: 0 }
        velocityRef.current = { x: 0, y: 0 }
      },
      startAutoRotate: () => {
        autoRotateRef.current = true
      },
      stopAutoRotate: () => {
        autoRotateRef.current = false
      },
      toggleAutoRotate: () => {
        autoRotateRef.current = !autoRotateRef.current
      },
    }), [])

    // Compute styles
    const containerStyle = useMemo<React.CSSProperties>(() => ({
      width,
      height,
      borderRadius,
      background,
      overflow: 'hidden',
      position: 'relative',
      cursor: draggable && !prefersReducedMotion ? 'grab' : 'default',
      ...style,
    }), [width, height, borderRadius, background, draggable, prefersReducedMotion, style])

    const imageStyle = useMemo<React.CSSProperties>(() => ({
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transform: `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`,
      transformStyle: 'preserve-3d',
      transition: 'transform 0.1s linear',
      willChange: 'transform',
      ...(shadow && {
        boxShadow: `
          0 4px 6px -1px rgba(0, 0, 0, ${0.1 * shadowIntensity}),
          0 2px 4px -1px rgba(0, 0, 0, ${0.06 * shadowIntensity}),
          0 0 0 1px rgba(0, 0, 0, ${0.05 * shadowIntensity})
        `,
      }),
    }), [shadow, shadowIntensity])

    const shadowStyle = useMemo<React.CSSProperties>(() => {
      if (!shadow) return {}

      const shadowY = Math.abs(rotationRef.current.x) * 0.3 + 10
      const shadowBlur = 20 + Math.abs(rotationRef.current.x) * 0.5

      return {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: `translateX(-50%) translateY(${shadowY}px) rotateX(90deg)`,
        width: '80%',
        height: '40%',
        borderRadius: '50%',
        background: `radial-gradient(ellipse, rgba(0,0,0,${0.15 * shadowIntensity}) 0%, transparent 70%)`,
        filter: `blur(${shadowBlur}px)`,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        pointerEvents: 'none',
        zIndex: -1,
      }
    }, [shadow, shadowIntensity, loaded])

    // Current image source (for 360 degree frames)
    const currentSrc = frames && frames.length > 0 ? frames[currentFrame] : src

    return (
      <div>
        <style>{`
          @keyframes floating-product-spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
        <div
          ref={containerRef}
          className={cn('floating-product', className)}
          style={containerStyle}
          onMouseMove={(e) => {
            handleMouseMove(e)
            handleDragMove(e)
          }}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart as React.TouchEventHandler<HTMLDivElement>}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd as React.TouchEventHandler<HTMLDivElement>}
          onTouchMove={handleDragMove as React.TouchEventHandler<HTMLDivElement>}
          role="img"
          aria-label={ariaLabel || alt}
          data-loaded={loaded}
          data-rotating={autoRotate && !isHoveringRef.current}
        >
          {/* Drop shadow */}
          {shadow && <div className="floating-product-shadow" style={shadowStyle} aria-hidden="true" />}

          {/* Product image */}
          {!error && (
            <>
              {frames && frames.length > 1 ? (
                <img
                  ref={imageRef}
                  src={currentSrc}
                  alt={alt}
                  style={imageStyle}
                  onLoad={handleLoad}
                  onError={handleError}
                  loading="eager"
                  draggable={false}
                />
              ) : (
                <img
                  ref={imageRef}
                  src={src}
                  alt={alt}
                  style={imageStyle}
                  onLoad={handleLoad}
                  onError={handleError}
                  loading="eager"
                  draggable={false}
                />
              )}

              {/* Loading state */}
              {!loaded && showSpinner && (
                <div
                  className="floating-product-loader"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)',
                    borderRadius,
                  }}
                  aria-hidden="true"
                >
                  <div
                    className="floating-product-spinner"
                    style={{
                      width: 40,
                      height: 40,
                      border: '3px solid rgba(255,255,255,0.3)',
                      borderTopColor: 'white',
                      borderRadius: '50%',
                      animation: 'floating-product-spin 1s linear infinite',
                    }}
                  />
                </div>
              )}

              {/* Placeholder */}
              {!loaded && placeholder && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {placeholder}
                </div>
              )}
            </>
          )}

          {/* Error state */}
          {error && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.5)',
                borderRadius,
                color: 'white',
                fontSize: 14,
                padding: 20,
                textAlign: 'center',
              }}
            >
              Failed to load image
            </div>
          )}

          {/* Rotation indicator */}
          <div
            className="floating-product-rotation-indicator"
            style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              opacity: 0.6,
              fontSize: 11,
              color: 'white',
              pointerEvents: 'none',
              fontFamily: 'monospace',
            }}
            aria-hidden="true"
          >
            X: {rotationRef.current.x.toFixed(1)}deg Y: {rotationRef.current.y.toFixed(1)}deg
          </div>
        </div>
      </div>
    )
  }
)

FloatingProduct.displayName = 'FloatingProduct'

/**
 * Hook for controlling floating product
 */
export function useFloatingProduct(ref: React.RefObject<FloatingProductRef | null>) {
  const rotateTo = useCallback((x: number, y: number) => {
    ref.current?.setRotation({ x, y })
  }, [ref])

  const reset = useCallback(() => {
    ref.current?.reset()
  }, [ref])

  return { rotateTo, reset }
}

export default FloatingProduct