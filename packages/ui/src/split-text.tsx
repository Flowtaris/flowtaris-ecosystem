// @flowtaris/ui - SplitText Component
// Advanced text splitting for character, word, and line animation

'use client'

import React, { useEffect, useRef, useState, useCallback, useImperativeHandle, forwardRef } from 'react'
import { cn } from './utils'

export type SplitType = 'chars' | 'words' | 'lines'

export interface SplitTextProps {
  /** Text content to split */
  children: React.ReactNode
  /** Split type: chars, words, or lines */
  split?: SplitType | SplitType[]
  /** CSS class for the container */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Tag to render as */
  as?: React.ElementType
  /** Animation delay between splits (ms) */
  stagger?: number
  /** Initial animation state */
  animate?: boolean
  /** Animation duration (ms) */
  duration?: number
  /** Animation easing */
  easing?: string
  /** Custom class for each split element */
  splitClassName?: string
  /** Custom class for chars */
  charClassName?: string
  /** Custom class for words */
  wordClassName?: string
  /** Custom class for lines */
  lineClassName?: string
  /** Callback when split is complete */
  onSplit?: (elements: HTMLElement[]) => void
  /** ARIA label for accessibility */
  ariaLabel?: string
  /** HTML id attribute */
  id?: string
  /** Internal: stagger delay */
  _stagger?: number
  /** Internal: animate flag */
  _animate?: boolean
  /** Internal: duration */
  _duration?: number
  /** Internal: easing */
  _easing?: string
}

export interface SplitTextRef {
  /** Get all split elements */
  elements: () => HTMLElement[]
  /** Get elements by type */
  chars: () => HTMLElement[]
  words: () => HTMLElement[]
  lines: () => HTMLElement[]
  /** Re-split text (useful for dynamic content) */
  split: () => void
  /** Revert to original text */
  revert: () => void
}

interface SplitResult {
  chars: HTMLElement[]
  words: HTMLElement[]
  lines: HTMLElement[]
  all: HTMLElement[]
}

/**
 * SplitText Component - Splits text into characters, words, and/or lines
 * for granular animation control
 */
export const SplitText = forwardRef<SplitTextRef, SplitTextProps>(
  (
    {
      children,
      split = ['chars', 'words', 'lines'],
      className,
      style,
      as: Component = 'div',
      _stagger = 50,
      _animate = false,
      _duration = 800,
      _easing = 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      splitClassName,
      charClassName,
      wordClassName,
      lineClassName,
      onSplit,
      ariaLabel,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const originalHTMLRef = useRef<string>('')
    const splitDataRef = useRef<SplitResult>({ chars: [], words: [], lines: [], all: [] })
    const [isSplit, setIsSplit] = useState(false)

    const splitTypes = Array.isArray(split) ? split : [split]

    // Split text into elements
    const doSplit = useCallback(() => {
      const container = containerRef.current
      if (!container) return

      // Store original HTML for revert
      if (!originalHTMLRef.current) {
        originalHTMLRef.current = container.innerHTML
      }

      // Get text content
      const text = container.textContent || ''
      if (!text.trim()) return

      // Clear container
      container.innerHTML = ''

      const chars: HTMLElement[] = []
      const words: HTMLElement[] = []
      const lines: HTMLElement[] = []
      const all: HTMLElement[] = []

      // Split into lines first
      const linesText = text.split('\n')

      linesText.forEach((lineText, lineIndex) => {
        if (lineIndex > 0) {
          // Add line break
          const br = document.createElement('br')
          container.appendChild(br)
        }

        const lineWrapper = document.createElement('span')
        lineWrapper.className = cn('split-line', lineClassName, splitClassName)
        lineWrapper.style.display = 'inline-block'
        lineWrapper.style.whiteSpace = 'nowrap'
        container.appendChild(lineWrapper)

        const lineWords = lineText.split(/(\s+)/).filter(w => w.length > 0)

        lineWords.forEach((wordText, wordIndex) => {
          const isSpace = /^\s+$/.test(wordText)

          if (isSpace) {
            // Add space as text node
            lineWrapper.appendChild(document.createTextNode(wordText))
            return
          }

          const wordWrapper = document.createElement('span')
          wordWrapper.className = cn('split-word', wordClassName, splitClassName)
          wordWrapper.style.display = 'inline-block'
          lineWrapper.appendChild(wordWrapper)

          words.push(wordWrapper)
          all.push(wordWrapper)

          // Split word into characters
          const charArray = Array.from(wordText)

          charArray.forEach((char, charIndex) => {
            const charWrapper = document.createElement('span')
            charWrapper.className = cn('split-char', charClassName, splitClassName)
            charWrapper.style.display = 'inline-block'
            charWrapper.textContent = char
            charWrapper.dataset.charIndex = String(charIndex)
            charWrapper.dataset.wordIndex = String(wordIndex)
            charWrapper.dataset.lineIndex = String(lineIndex)
            wordWrapper.appendChild(charWrapper)

            chars.push(charWrapper)
            all.push(charWrapper)
          })
        })

        lines.push(lineWrapper)
        all.push(lineWrapper)
      })

      splitDataRef.current = { chars, words, lines, all }
      setIsSplit(true)
      onSplit?.(all)
    }, [charClassName, lineClassName, wordClassName, splitClassName, onSplit])

    // Revert to original text
    const revert = useCallback(() => {
      const container = containerRef.current
      if (!container || !originalHTMLRef.current) return

      container.innerHTML = originalHTMLRef.current
      splitDataRef.current = { chars: [], words: [], lines: [], all: [] }
      setIsSplit(false)
    }, [])

    // Initialize split on mount
    useEffect(() => {
      doSplit()
    }, [doSplit])

    // Expose ref methods using useImperativeHandle
    useImperativeHandle(ref, () => ({
      elements: () => splitDataRef.current.all,
      chars: () => splitDataRef.current.chars,
      words: () => splitDataRef.current.words,
      lines: () => splitDataRef.current.lines,
      split: doSplit,
      revert,
    }), [doSplit, revert])

    return (
      <Component
        ref={containerRef}
        className={cn('split-text', className)}
        style={style}
        aria-label={ariaLabel}
        data-split={isSplit ? 'true' : 'false'}
        data-split-types={splitTypes.join(',')}
      >
        {children}
      </Component>
    )
  }
)

SplitText.displayName = 'SplitText'

/**
 * Hook for creating staggered animations with SplitText
 */
export function useSplitTextAnimation(ref: React.RefObject<SplitTextRef | null>) {
  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false

  const animateIn = useCallback(async (options?: {
    type?: 'chars' | 'words' | 'lines'
    stagger?: number
    duration?: number
    easing?: string
    from?: Record<string, string | number>
    to?: Record<string, string | number>
    respectReducedMotion?: boolean
  }) => {
    const splitRef = ref.current
    if (!splitRef) return

    // Instant animation for reduced motion
    if (prefersReducedMotion && options?.respectReducedMotion !== false) {
      const elements = splitRef[options?.type || 'chars']()
      elements.forEach(el => {
        Object.assign(el.style, { opacity: 1, transform: 'none' })
      })
      return
    }

    const elements = splitRef[options?.type || 'chars']()
    const stagger = options?.stagger ?? 50
    const duration = options?.duration ?? 800
    const easing = options?.easing ?? 'cubic-bezier(0.25, 0.1, 0.25, 1)'

    const from = options?.from || { opacity: 0, transform: 'translateY(20px) rotateX(90deg)' }
    const to = options?.to || { opacity: 1, transform: 'translateY(0) rotateX(0)' }

    await Promise.all(
      elements.map((el, index) => {
        return new Promise<void>(resolve => {
          Object.assign(el.style, from)
          el.style.transition = `all ${duration}ms ${easing}`
          el.style.transitionDelay = `${index * stagger}ms`

          requestAnimationFrame(() => {
            Object.assign(el.style, to)
          })

          const handleTransitionEnd = () => {
            el.removeEventListener('transitionend', handleTransitionEnd)
            resolve()
          }
          el.addEventListener('transitionend', handleTransitionEnd)
        })
      })
    )
  }, [ref])

  const animateOut = useCallback(async (options?: {
    type?: 'chars' | 'words' | 'lines'
    stagger?: number
    duration?: number
    easing?: string
    to?: Record<string, string | number>
  }) => {
    const splitRef = ref.current
    if (!splitRef) return

    const elements = splitRef[options?.type || 'chars']()
    const stagger = options?.stagger ?? 30
    const duration = options?.duration ?? 400
    const easing = options?.easing ?? 'cubic-bezier(0.4, 0, 0.6, 1)'

    const to = options?.to || { opacity: 0, transform: 'translateY(-20px) rotateX(-90deg)' }

    await Promise.all(
      elements.map((el, index) => {
        return new Promise<void>(resolve => {
          el.style.transition = `all ${duration}ms ${easing}`
          el.style.transitionDelay = `${index * stagger}ms`

          requestAnimationFrame(() => {
            Object.assign(el.style, to)
          })

          const handleTransitionEnd = () => {
            el.removeEventListener('transitionend', handleTransitionEnd)
            resolve()
          }
          el.addEventListener('transitionend', handleTransitionEnd)
        })
      })
    )
  }, [ref])

  return { animateIn, animateOut }
}

export default SplitText