// @flowtaris/ui - Layout Components
// Foundational layout primitives with design token integration

'use client'

import React, { forwardRef } from 'react'
import { cn } from './utils'

// ============================================
// Container
// ============================================

export interface ContainerProps {
  /** Maximum width constraint */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  /** Center container horizontally */
  center?: boolean
  /** Additional padding */
  padded?: boolean
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Render as element */
  as?: React.ElementType
  /** Children */
  children?: React.ReactNode
}

const CONTAINER_SIZES = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  full: 'max-w-full',
} as const

/**
 * Container - Responsive fixed-width container with size variants
 */
const _Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = '2xl',
      center = true,
      padded = false,
      className,
      style,
      as: Component = 'div',
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          center && 'mx-auto',
          padded && 'px-4 sm:px-6 lg:px-8',
          CONTAINER_SIZES[size],
          className
        )}
        style={style}
        {...props}
      />
    )
  }
)

_Container.displayName = 'Container'

// ============================================
// Stack
// ============================================

export interface StackProps {
  /** Stack direction */
  direction?: 'vertical' | 'horizontal'
  /** Gap between items (supports design token values or raw numbers for px) */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | number
  /** Alignment */
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
  /** Justification (horizontal only) */
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  /** Should items wrap (horizontal only) */
  wrap?: boolean
  /** Divider between items */
  divider?: React.ReactNode
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Render as element */
  as?: React.ElementType
  /** Children */
  children: React.ReactNode
}

const GAP_SIZES = {
  none: 'gap-0',
  xs: 'gap-1',
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
  xl: 'gap-8',
  '2xl': 'gap-12',
  '3xl': 'gap-16',
} as const

const ALIGN_MAP = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const

const JUSTIFY_MAP = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const

/**
 * Stack - Flexible stack layout with consistent spacing
 */
const _Stack = forwardRef<HTMLDivElement, StackProps>(
  (
    {
      direction = 'vertical',
      gap = 'md',
      align = 'stretch',
      justify,
      wrap = false,
      divider,
      className,
      style,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    const childrenArray = React.Children.toArray(children).filter(
      (child): child is React.ReactElement => React.isValidElement(child)
    )

    const childrenWithDividers =
      divider && childrenArray.length > 1
        ? childrenArray.flatMap((child, index) => [
            child,
            index < childrenArray.length - 1 ? (
              <div
                key={`divider-${index}`}
                className={cn(
                  'flex-shrink-0',
                  direction === 'vertical' ? 'w-full' : 'h-full'
                )}
                aria-hidden="true"
              >
                {divider}
              </div>
            ) : null,
          ]).filter(Boolean)
        : childrenArray

    const gapClass = typeof gap === 'number' ? `gap-[${gap}px]` : GAP_SIZES[gap]

    return (
      <Component
        ref={ref}
        className={cn(
          'flex',
          direction === 'vertical' ? 'flex-col' : 'flex-row',
          gapClass,
          ALIGN_MAP[align],
          justify && JUSTIFY_MAP[justify],
          wrap && 'flex-wrap',
          className
        )}
        style={style}
        {...props}
      >
        {childrenWithDividers}
      </Component>
    )
  }
)

_Stack.displayName = 'Stack'

// ============================================
// Inline (horizontal stack)
// ============================================

export interface InlineProps extends Omit<StackProps, 'direction'> {
  /** Children */
  children: React.ReactNode
}

/**
 * Inline - Horizontal stack with inline-flex display
 */
const _Inline = forwardRef<HTMLDivElement, InlineProps>(
  (
    { children, gap = 'md', align = 'center', justify, wrap = true, divider, className, style, as: Component = 'div', ...props },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        as={Component}
        direction="horizontal"
        gap={gap}
        align={align}
        justify={justify}
        wrap={wrap}
        divider={divider}
        className={cn('inline-flex', className)}
        style={style}
        {...props}
      >
        {children}
      </Stack>
    )
  }
)

_Inline.displayName = 'Inline'

// ============================================
// Grid
// ============================================

export interface GridProps {
  /** Number of columns (fixed) or responsive column config */
  columns?: 1 | 2 | 3 | 4 | 5 | 6 | 12 | 'auto' | {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  /** Columns at breakpoints (alias for columns) */
  cols?: {
    base?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    '2xl'?: number
  }
  /** Gap between items */
  gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
  /** Row gap override */
  rowGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
  /** Column gap override */
  colGap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | number
  /** Auto-fit columns */
  autoFit?: boolean
  /** Minimum column width for auto-fit */
  minColWidth?: string
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Render as element */
  as?: React.ElementType
  /** Children */
  children: React.ReactNode
}

const GRID_COLUMNS = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  12: 'grid-cols-12',
  auto: 'grid-cols-auto',
} as const

const RESPONSIVE_COLUMNS = {
  sm: { 1: 'sm:grid-cols-1', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-3', 4: 'sm:grid-cols-4', 5: 'sm:grid-cols-5', 6: 'sm:grid-cols-6', 12: 'sm:grid-cols-12' },
  md: { 1: 'md:grid-cols-1', 2: 'md:grid-cols-2', 3: 'md:grid-cols-3', 4: 'md:grid-cols-4', 5: 'md:grid-cols-5', 6: 'md:grid-cols-6', 12: 'md:grid-cols-12' },
  lg: { 1: 'lg:grid-cols-1', 2: 'lg:grid-cols-2', 3: 'lg:grid-cols-3', 4: 'lg:grid-cols-4', 5: 'lg:grid-cols-5', 6: 'lg:grid-cols-6', 12: 'lg:grid-cols-12' },
  xl: { 1: 'xl:grid-cols-1', 2: 'xl:grid-cols-2', 3: 'xl:grid-cols-3', 4: 'xl:grid-cols-4', 5: 'xl:grid-cols-5', 6: 'xl:grid-cols-6', 12: 'xl:grid-cols-12' },
  '2xl': { 1: '2xl:grid-cols-1', 2: '2xl:grid-cols-2', 3: '2xl:grid-cols-3', 4: '2xl:grid-cols-4', 5: '2xl:grid-cols-5', 6: '2xl:grid-cols-6', 12: '2xl:grid-cols-12' },
} as const

/**
 * Grid - Responsive grid layout with design token spacing
 */
const _Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      columns,
      cols,
      gap = 'md',
      rowGap,
      colGap,
      autoFit = false,
      minColWidth = '280px',
      className,
      style,
      as: Component = 'div',
      children,
      ...props
    },
    ref
  ) => {
    const gridTemplateColumns = autoFit
      ? `repeat(auto-fit, minmax(${minColWidth}, 1fr))`
      : undefined

    const getResponsiveClass = (breakpoint: string, cols: number) => {
      const map = RESPONSIVE_COLUMNS[breakpoint as keyof typeof RESPONSIVE_COLUMNS]
      if (map) {
        return map[cols as keyof typeof map]
      }
      return undefined
    }

    const gapClass = typeof gap === 'number' ? `gap-[${gap}px]` : GAP_SIZES[gap]
    const rowGapClass = typeof rowGap === 'number' ? `grid-row-[${rowGap}px]` : rowGap && `grid-row-${GAP_SIZES[rowGap].replace('gap-', '')}`
    const colGapClass = typeof colGap === 'number' ? `grid-col-[${colGap}px]` : colGap && `grid-col-${GAP_SIZES[colGap].replace('gap-', '')}`

    // Handle columns as number/string or responsive object
    const fixedColumns = typeof columns === 'number' || typeof columns === 'string' ? columns : undefined
    const responsiveCols = typeof columns === 'object' && columns !== null ? columns : cols

    return (
      <Component
        ref={ref}
        className={cn(
          'grid',
          fixedColumns && GRID_COLUMNS[fixedColumns as keyof typeof GRID_COLUMNS],
          responsiveCols?.base && `grid-cols-${responsiveCols.base}`,
          responsiveCols?.sm && getResponsiveClass('sm', responsiveCols.sm!),
          responsiveCols?.md && getResponsiveClass('md', responsiveCols.md!),
          responsiveCols?.lg && getResponsiveClass('lg', responsiveCols.lg!),
          responsiveCols?.xl && getResponsiveClass('xl', responsiveCols.xl!),
          responsiveCols?.['2xl'] && getResponsiveClass('2xl', responsiveCols['2xl']!),
          gapClass,
          rowGapClass,
          colGapClass,
          className
        )}
        style={{
          ...style,
          ...(gridTemplateColumns ? { gridTemplateColumns } : {}),
        }}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

_Grid.displayName = 'Grid'

// ============================================
// Section
// ============================================

export interface SectionProps {
  /** Vertical padding size */
  py?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  /** Horizontal padding size */
  px?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Background variant */
  variant?: 'default' | 'muted' | 'bordered' | 'glass'
  /** Full viewport height */
  fullHeight?: boolean
  /** Minimum height */
  minHeight?: string
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
  /** Render as element */
  as?: React.ElementType
  /** Children */
  children: React.ReactNode
}

const PY_SIZES = {
  none: 'py-0',
  xs: 'py-4',
  sm: 'py-8',
  md: 'py-16',
  lg: 'py-24',
  xl: 'py-32',
  '2xl': 'py-48',
  '3xl': 'py-64',
} as const

const PX_SIZES = {
  none: 'px-0',
  xs: 'px-2',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
  xl: 'px-12',
  '2xl': 'px-16',
} as const

const VARIANT_STYLES = {
  default: '',
  muted: 'bg-neutral-50 dark:bg-neutral-900/50',
  bordered: 'border-y border-neutral-200 dark:border-neutral-800',
  glass: 'glass',
} as const

/**
 * Section - Page section with consistent vertical rhythm
 */
const _Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    {
      py = 'lg',
      px = 'md',
      variant = 'default',
      fullHeight = false,
      minHeight,
      className,
      style,
      as: Component = 'section',
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        ref={ref}
        className={cn(
          'w-full',
          PY_SIZES[py],
          PX_SIZES[px],
          VARIANT_STYLES[variant],
          fullHeight && 'min-h-screen flex items-center justify-center',
          minHeight && 'min-h-[var(--section-min-height)]',
          className
        )}
        style={{
          ...style,
          ...(minHeight ? { '--section-min-height': minHeight } : {}),
        }}
        {...props}
      >
        <_Container>{children}</_Container>
      </Component>
    )
  }
)

_Section.displayName = 'Section'

// ============================================
// Divider
// ============================================

export interface DividerProps {
  /** Divider orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Divider length */
  length?: 'full' | 'auto' | string
  /** Divider variant */
  variant?: 'solid' | 'dashed' | 'dotted' | 'gradient'
  /** Color variant */
  color?: 'default' | 'muted' | 'brand' | 'transparent'
  /** Label in the middle */
  label?: React.ReactNode
  /** Label position */
  labelPosition?: 'start' | 'center' | 'end'
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

const ORIENTATION_STYLES = {
  horizontal: 'w-full h-px',
  vertical: 'h-full w-px',
} as const

const VARIANT_STYLES_DIVIDER = {
  solid: 'bg-current',
  dashed: 'bg-current border-t-[1px] border-dashed',
  dotted: 'bg-current border-t-[1px] border-dotted',
  gradient: 'bg-gradient-to-r from-transparent via-current to-transparent',
} as const

const COLOR_STYLES = {
  default: 'text-neutral-300 dark:text-neutral-700',
  muted: 'text-neutral-200 dark:text-neutral-800',
  brand: 'text-brand-cyan-500',
  transparent: 'text-transparent',
} as const

/**
 * Divider - Visual separator with optional label
 */
const _Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = 'horizontal',
      length = 'full',
      variant = 'solid',
      color = 'default',
      label,
      labelPosition = 'center',
      className,
      style,
      ...props
    },
    ref
  ) => {
    if (label) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-4',
            orientation === 'horizontal' ? 'w-full' : 'h-full flex-col',
            className
          )}
          style={style}
          {...props}
        >
          <div
            className={cn(
              'flex-1',
              ORIENTATION_STYLES[orientation],
              VARIANT_STYLES_DIVIDER[variant],
              COLOR_STYLES[color]
            )}
            aria-hidden="true"
          />
          <span className={cn('flex-shrink-0 px-3 text-sm text-neutral-500 dark:text-neutral-400', labelPosition === 'start' && 'ml-0', labelPosition === 'end' && 'mr-0')}>
            {label}
          </span>
          <div
            className={cn(
              'flex-1',
              ORIENTATION_STYLES[orientation],
              VARIANT_STYLES_DIVIDER[variant],
              COLOR_STYLES[color]
            )}
            aria-hidden="true"
          />
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          ORIENTATION_STYLES[orientation],
          length === 'full' && orientation === 'horizontal' && 'w-full',
          length === 'full' && orientation === 'vertical' && 'h-full',
          length !== 'full' && length !== 'auto' && `w-[${length}]`,
          length !== 'full' && length !== 'auto' && `h-[${length}]`,
          VARIANT_STYLES_DIVIDER[variant],
          COLOR_STYLES[color],
          className
        )}
        style={style}
        role="separator"
        aria-orientation={orientation}
        {...props}
      />
    )
  }
)

_Divider.displayName = 'Divider'

// ============================================
// Spacer
// ============================================

export interface SpacerProps {
  /** Space size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  /** Orientation */
  orientation?: 'vertical' | 'horizontal'
  /** CSS class */
  className?: string
}

/**
 * Spacer - Empty space for layout
 */
const _Spacer: React.FC<SpacerProps> = ({
  size = 'md',
  orientation = 'vertical',
  className,
}) => {
  const sizeMap = {
    xs: orientation === 'vertical' ? 'h-1' : 'w-1',
    sm: orientation === 'vertical' ? 'h-2' : 'w-2',
    md: orientation === 'vertical' ? 'h-4' : 'w-4',
    lg: orientation === 'vertical' ? 'h-6' : 'w-6',
    xl: orientation === 'vertical' ? 'h-8' : 'w-8',
    '2xl': orientation === 'vertical' ? 'h-12' : 'w-12',
    '3xl': orientation === 'vertical' ? 'h-16' : 'w-16',
  }

  return <div className={cn(sizeMap[size], className)} aria-hidden="true" />
}

_Spacer.displayName = 'Spacer'

// ============================================
// Exports
// ============================================

export const Container = _Container
export const Stack = _Stack
export const Inline = _Inline
export const Grid = _Grid
export const Section = _Section
export const Divider = _Divider
export const Spacer = _Spacer