// @flowtaris/ui - Slider Component
// Accessible range slider with design token integration

'use client'

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react'
import { cn } from './utils'

// ============================================
// Types
// ============================================

export interface SliderProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'min' | 'max' | 'step' | 'value' | 'onChange' | 'size' | 'defaultValue'> {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Current value (controlled) */
  value?: number | number[]
  /** Default value (uncontrolled) */
  defaultValue?: number | number[]
  /** On value change */
  onValueChange?: (value: number | number[]) => void
  /** Show value label */
  showValue?: boolean
  /** Value formatter */
  formatValue?: (value: number) => string
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Show marks */
  marks?: boolean | Array<{ value: number; label?: string }>
  /** Disabled */
  disabled?: boolean
  /** Orientation */
  vertical?: boolean
  /** Inverted */
  inverted?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Label */
  label?: string
  /** Help text */
  helpText?: React.ReactNode
  /** Error message */
  error?: string
  /** CSS class */
  className?: string
}

interface SliderThumbProps {
  index: number
  value: number
  min: number
  max: number
  step: number
  orientation: 'horizontal' | 'vertical'
  inverted: boolean
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  onValueChange: (value: number) => void
  formatValue?: (value: number) => string
  showValue: boolean
}

const SIZE_STYLES = {
  sm: { track: 'h-1', thumb: 'h-3.5 w-3.5', valueText: 'text-xs' },
  md: { track: 'h-1.5', thumb: 'h-5 w-5', valueText: 'text-sm' },
  lg: { track: 'h-2', thumb: 'h-6 w-6', valueText: 'text-base' },
} as const

// ============================================
// Slider Thumb
// ============================================

const SliderThumb = forwardRef<HTMLButtonElement, SliderThumbProps>(
  (
    {
      index,
      value,
      min,
      max,
      step,
      orientation,
      inverted,
      disabled,
      size,
      onValueChange,
      formatValue,
      showValue,
    },
    ref
  ) => {
    const thumbRef = useRef<HTMLButtonElement>(null)
    const combinedRef = (node: HTMLButtonElement | null) => {
      thumbRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    const percentage = ((value - min) / (max - min)) * 100
    const isVertical = orientation === 'vertical'
    const thumbSize = SIZE_STYLES[size].thumb

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return

      let newValue = value
      const multiplier = inverted ? -1 : 1

      if (isVertical) {
        if (e.key === 'ArrowUp') newValue = Math.min(max, value + step * multiplier)
        else if (e.key === 'ArrowDown') newValue = Math.max(min, value - step * multiplier)
        else if (e.key === 'PageUp') newValue = Math.min(max, value + step * 10 * multiplier)
        else if (e.key === 'PageDown') newValue = Math.max(min, value - step * 10 * multiplier)
        else if (e.key === 'Home') newValue = inverted ? max : min
        else if (e.key === 'End') newValue = inverted ? min : max
        else return
      } else {
        if (e.key === 'ArrowRight') newValue = Math.min(max, value + step * multiplier)
        else if (e.key === 'ArrowLeft') newValue = Math.max(min, value - step * multiplier)
        else if (e.key === 'PageUp') newValue = Math.min(max, value + step * 10 * multiplier)
        else if (e.key === 'PageDown') newValue = Math.max(min, value - step * 10 * multiplier)
        else if (e.key === 'Home') newValue = inverted ? max : min
        else if (e.key === 'End') newValue = inverted ? min : max
        else return
      }

      e.preventDefault()
      onValueChange(newValue)
    }

    const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return

      e.preventDefault()
      document.body.style.userSelect = 'none'

      const handleMouseMove = (moveEvent: MouseEvent | TouchEvent) => {
        const rect = thumbRef.current?.parentElement?.getBoundingClientRect()
        if (!rect) return

        let newPercentage: number
        if (isVertical) {
          const clientY = 'touches' in moveEvent ? moveEvent.touches[0].clientY : moveEvent.clientY
          const y = clientY - rect.top
          newPercentage = 100 - (y / rect.height) * 100
        } else {
          const clientX = 'touches' in moveEvent ? moveEvent.touches[0].clientX : moveEvent.clientX
          const x = clientX - rect.left
          newPercentage = (x / rect.width) * 100
        }

        newPercentage = Math.max(0, Math.min(100, newPercentage))
        let newValue = min + (newPercentage / 100) * (max - min)
        newValue = Math.round(newValue / step) * step
        newValue = Math.max(min, Math.min(max, newValue))
        onValueChange(newValue)
      }

      const handleMouseUp = () => {
        document.body.style.userSelect = ''
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        document.removeEventListener('touchmove', handleMouseMove)
        document.removeEventListener('touchend', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleMouseMove, { passive: false })
      document.addEventListener('touchend', handleMouseUp)
    }

    const thumbStyle: React.CSSProperties = isVertical
      ? { bottom: `${percentage}%`, transform: 'translateY(50%)' }
      : { left: `${percentage}%`, transform: 'translateX(-50%)' }

    if (inverted) {
      if (isVertical) {
        thumbStyle.bottom = `${100 - percentage}%`
      } else {
        thumbStyle.left = `${100 - percentage}%`
      }
    }

    return (
      <>
        <button
          ref={combinedRef}
          type="button"
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatValue ? formatValue(value) : String(value)}
          aria-orientation={orientation}
          aria-disabled={disabled}
          disabled={disabled}
          onKeyDown={handleKeyDown}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
          className={cn(
            'absolute flex items-center justify-center',
            'bg-white dark:bg-neutral-900',
            'border-2 border-brand-cyan-500',
            'rounded-full',
            'shadow-lg',
            'transition-all duration-150 ease-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
            'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
            'active:scale-110',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            thumbSize,
            showValue && 'relative'
          )}
          style={thumbStyle}
        >
          {showValue && (
            <span
              className={cn(
                'absolute whitespace-nowrap font-mono font-medium',
                'text-brand-cyan-600 dark:text-brand-cyan-400',
                SIZE_STYLES[size].valueText,
                isVertical
                  ? 'left-full ml-2 -translate-y-1/2 top-1/2'
                  : 'bottom-full mb-2 -translate-x-1/2 left-1/2'
              )}
              aria-hidden="true"
            >
              {formatValue ? formatValue(value) : value}
            </span>
          )}
        </button>
      </>
    )
  }
)

SliderThumb.displayName = 'SliderThumb'

// ============================================
// Slider Track
// ============================================

interface SliderTrackProps {
  min: number
  max: number
  values: number[]
  orientation: 'horizontal' | 'vertical'
  inverted: boolean
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  marks?: boolean | Array<{ value: number; label?: string }>
  step: number
}

const SliderTrack: React.FC<SliderTrackProps> = ({
  min,
  max,
  values,
  orientation,
  inverted,
  disabled,
  size,
  marks,
  step,
}) => {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null)
  const isVertical = orientation === 'vertical'

  const getPercentage = (value: number) => ((value - min) / (max - min)) * 100
  const percentages = values.map(getPercentage)

  const trackStyle: React.CSSProperties = isVertical ? { height: '100%' } : { width: '100%' }
  const fillStyle: React.CSSProperties = isVertical
    ? {
        bottom: `${Math.min(...percentages)}%`,
        height: `${Math.max(...percentages) - Math.min(...percentages)}%`,
      }
    : {
        left: `${Math.min(...percentages)}%`,
        width: `${Math.max(...percentages) - Math.min(...percentages)}%`,
      }

  const marksArray = Array.isArray(marks) ? marks : marks ? generateDefaultMarks(min, max, step) : []

  useEffect(() => {
    setContainerRef(null) // reset to trigger re-render with new ref
  }, [])

  return (
    <div
      ref={setContainerRef}
      role="presentation"
      className={cn(
        'relative flex items-center justify-center',
        'bg-neutral-200 dark:bg-neutral-800',
        'rounded-full',
        'transition-colors duration-150',
        disabled && 'opacity-50',
        isVertical ? 'w-full h-full' : 'h-full w-full',
        SIZE_STYLES[size].track
      )}
      style={trackStyle}
    >
      {/* Track fill */}
      <div
        className={cn(
          'absolute bg-brand-cyan-500 rounded-full',
          'transition-all duration-150 ease-out',
          isVertical ? 'w-full left-0' : 'h-full bottom-0'
        )}
        style={fillStyle}
        aria-hidden="true"
      />

      {/* Marks */}
      {marksArray.length > 0 && (
        <>
          {marksArray.map((mark, index) => {
            const percentage = getPercentage(mark.value)
            const markStyle: React.CSSProperties = isVertical
              ? { bottom: `${percentage}%`, left: '50%', transform: 'translateX(-50%)' }
              : { left: `${percentage}%`, bottom: '50%', transform: 'translateY(50%)' }

            return (
              <div key={index} className="absolute" style={markStyle}>
                <div
                  className={cn(
                    'bg-neutral-400 dark:bg-neutral-600 rounded-full',
                    isVertical ? 'w-1 h-px' : 'w-px h-1'
                  )}
                  aria-hidden="true"
                />
                {mark.label && (
                  <span
                    className={cn(
                      'absolute text-xs text-neutral-500 dark:text-neutral-400 whitespace-nowrap',
                      isVertical ? 'left-full ml-2 -translate-y-1/2' : 'bottom-full mb-2 -translate-x-1/2'
                    )}
                    aria-hidden="true"
                  >
                    {mark.label}
                  </span>
                )}
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}

function generateDefaultMarks(min: number, max: number, step: number) {
  const marks: Array<{ value: number; label?: string }> = []
  const range = max - min
  const numMarks = Math.min(Math.max(Math.round(range / step), 3), 11)

  for (let i = 0; i <= numMarks; i++) {
    const value = min + (i / numMarks) * range
    const rounded = Math.round(value / step) * step
    if (rounded >= min && rounded <= max) {
      marks.push({ value: rounded, label: String(rounded) })
    }
  }
  return marks
}

// ============================================
// Slider Component
// ============================================

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      min = 0,
      max = 100,
      step = 1,
      value: controlledValue,
      defaultValue = min,
      onValueChange,
      showValue = false,
      formatValue,
      orientation = 'horizontal',
      marks = false,
      disabled = false,
      vertical: verticalProp,
      inverted = false,
      size = 'md',
      label,
      helpText,
      error,
      className,
      required,
      id,
      ...props
    },
    ref
  ) => {
    const isVertical = verticalProp || orientation === 'vertical'
    const sliderId = useId()
    const wrapperId = id || sliderId
    const trackRef = useRef<HTMLDivElement>(null)

    const [uncontrolledValue, setUncontrolledValue] = useState<number | number[]>(() => {
      if (Array.isArray(defaultValue)) return defaultValue.map((v) => Math.max(min, Math.min(max, v)))
      return Math.max(min, Math.min(max, defaultValue))
    })

    const isControlled = controlledValue !== undefined
    const values = isControlled ? controlledValue : uncontrolledValue
    const valuesArray = Array.isArray(values) ? values : [values]

    const handleValueChange = useCallback(
      (newValue: number, index = 0) => {
      let newValues: number[]
      if (Array.isArray(values)) {
        newValues = [...values]
        newValues[index] = newValue
        // Ensure range slider values stay in order
        if (newValues.length === 2) {
          newValues.sort((a, b) => a - b)
        }
      } else {
        newValues = [newValue]
      }

      if (!isControlled) setUncontrolledValue(newValues.length === 1 ? newValues[0] : newValues)
      onValueChange?.(newValues.length === 1 ? newValues[0] : newValues)
      },
      [values, isControlled, onValueChange]
    )

    const handleTrackClick = (e: React.MouseEvent) => {
      if (disabled) return

      const rect = trackRef.current?.getBoundingClientRect()
      if (!rect) return

      let percentage: number
      if (isVertical) {
        const y = e.clientY - rect.top
        percentage = 100 - (y / rect.height) * 100
      } else {
        const x = e.clientX - rect.left
        percentage = (x / rect.width) * 100
      }

      percentage = Math.max(0, Math.min(100, percentage))
      let newValue = min + (percentage / 100) * (max - min)
      newValue = Math.round(newValue / step) * step
      newValue = Math.max(min, Math.min(max, newValue))

      // For range slider, find closest thumb
      const index = valuesArray.length === 2
        ? Math.abs(valuesArray[0] - newValue) < Math.abs(valuesArray[1] - newValue)
          ? 0
          : 1
        : 0

      handleValueChange(newValue, index)
    }

    const labelId = `${wrapperId}-label`
    const helpId = `${wrapperId}-help`
    const errorId = `${wrapperId}-error`

    const describedBy = [
      helpText && !error && helpId,
      error && errorId,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div
        ref={ref}
        className={cn('w-full', className)}
        {...props}
      >
        {label && (
          <label
            id={labelId}
            htmlFor={wrapperId}
            className="block text-sm font-medium text-brand-navy-900 dark:text-brand-white mb-2"
          >
            {label}
          </label>
        )}

        <div
          ref={trackRef}
          role="slider"
          aria-orientation={orientation}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={valuesArray.length === 1 ? valuesArray[0] : undefined}
          aria-valuetext={formatValue ? formatValue(valuesArray[0]) : String(valuesArray[0])}
          aria-disabled={disabled}
          aria-describedby={describedBy}
          onClick={handleTrackClick}
          className="relative touch-none"
          style={isVertical ? { height: '200px' } : undefined}
        >
          <SliderTrack
            min={min}
            max={max}
            values={valuesArray}
            orientation={orientation}
            inverted={inverted}
            disabled={disabled}
            size={size}
            marks={marks}
            step={step}
          />

          {valuesArray.map((value, index) => (
            <SliderThumb
              key={index}
              index={index}
              value={value}
              min={min}
              max={max}
              step={step}
              orientation={orientation}
              inverted={inverted}
              disabled={disabled}
              size={size}
              onValueChange={handleValueChange}
              formatValue={formatValue}
              showValue={showValue}
            />
          ))}
        </div>

        {helpText && !error && (
          <p id={helpId} className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            {helpText}
          </p>
        )}
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-brand-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Slider.displayName = 'Slider'

// ============================================
// RangeSlider (convenience export)
// ============================================

export interface RangeSliderProps extends Omit<SliderProps, 'value' | 'defaultValue' | 'onValueChange'> {
  /** Current value (controlled) */
  value?: [number, number]
  /** Default value (uncontrolled) */
  defaultValue?: [number, number]
  /** On value change */
  onValueChange?: (value: [number, number]) => void
}

/**
 * RangeSlider - Slider with two thumbs for range selection
 */
export const RangeSlider: React.FC<RangeSliderProps> = ({
  value,
  defaultValue = [0, 100],
  onValueChange,
  ...props
}) => {
  const handleValueChange = (newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      onValueChange?.([newValue[0], newValue[1]])
    }
  }

  return <Slider value={value} defaultValue={defaultValue} onValueChange={handleValueChange} {...props} />
}

RangeSlider.displayName = 'RangeSlider'