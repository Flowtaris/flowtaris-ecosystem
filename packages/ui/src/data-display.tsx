// @flowtaris/ui - Data Display Components
// Data presentation primitives with design token integration

'use client'

import React, {
  forwardRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from 'react'
import { cn } from './utils'
import { ChevronUp, ChevronDown, Filter, ChevronLeft, ChevronRight } from 'lucide-react'

// ============================================
// Badge
// ============================================

export interface BadgeProps {
  /** Content */
  children: React.ReactNode
  /** Variant */
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'neutral' | 'outline' | 'ghost'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Pill style */
  pill?: boolean
  /** Dot indicator */
  dot?: boolean
  /** Dot color */
  dotColor?: string
  /** Clickable */
  clickable?: boolean
  /** On click */
  onClick?: () => void
  /** Disabled state */
  disabled?: boolean
  /** CSS class */
  className?: string
}

const BADGE_VARIANTS = {
  default: 'bg-brand-cyan-100 text-brand-cyan-800 dark:bg-brand-cyan-900/30 dark:text-brand-cyan-200',
  success: 'bg-brand-green-100 text-brand-green-800 dark:bg-brand-green-900/30 dark:text-brand-green-200',
  warning: 'bg-brand-amber-100 text-brand-amber-800 dark:bg-brand-amber-900/30 dark:text-brand-amber-200',
  error: 'bg-brand-red-100 text-brand-red-800 dark:bg-brand-red-900/30 dark:text-brand-red-200',
  info: 'bg-brand-navy-100 text-brand-navy-800 dark:bg-brand-navy-900/30 dark:text-brand-navy-200',
  neutral: 'bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200',
  outline: 'bg-transparent border border-current text-current',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-layer5 hover:text-text-primary transition-colors duration-150',
} as const

const BADGE_SIZES = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
} as const

/**
 * Badge - Status indicator label
 */
const _Badge = forwardRef<HTMLButtonElement, BadgeProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      pill = false,
      dot = false,
      dotColor,
      clickable = false,
      onClick,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const isButton = clickable || onClick
    const Component = isButton ? 'button' : 'span'

    return (
      <Component
        ref={ref}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium',
          'transition-colors duration-150',
          BADGE_VARIANTS[variant],
          BADGE_SIZES[size],
          pill && 'rounded-full',
          !pill && 'rounded-lg',
          clickable && 'cursor-pointer hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...(!isButton ? props : {})}
      >
        {dot && (
          <span
            className={cn('w-1.5 h-1.5 rounded-full', 'flex-shrink-0')}
            style={{ backgroundColor: dotColor || 'currentColor' }}
            aria-hidden="true"
          />
        )}
        {children}
      </Component>
    )
  }
)

_Badge.displayName = 'Badge'

export const Badge = _Badge

// ============================================
// Tag
// ============================================

export interface TagProps extends BadgeProps {
  /** Removable */
  removable?: boolean
  /** On remove */
  onRemove?: () => void
  /** Remove label */
  removeLabel?: string
}

/**
 * Tag - Removable label
 */
const _Tag = forwardRef<HTMLButtonElement, TagProps>(
  (
    {
      children,
      variant = 'default',
      size = 'md',
      pill = true,
      removable = false,
      onRemove,
      removeLabel = 'Remove tag',
      clickable = false,
      onClick,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <Badge
        ref={ref}
        variant={variant}
        size={size}
        pill={pill}
        clickable={clickable}
        onClick={onClick}
        className={cn('flex items-center gap-1', removable && 'pr-1', className)}
        {...props}
      >
        {children}
        {removable && (
          <button
            type="button"
            onClick={onRemove}
            className={cn(
              'flex items-center justify-center w-5 h-5 rounded',
              'hover:bg-current/20 transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current'
            )}
            aria-label={removeLabel}
          >
            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </Badge>
    )
  }
)

_Tag.displayName = 'Tag'

export const Tag = _Tag

// ============================================
// Avatar
// ============================================

export interface AvatarProps {
  /** Image source */
  src?: string
  /** Alt text */
  alt?: string
  /** Fallback name/initials */
  name?: string
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Shape */
  shape?: 'circle' | 'square'
  /** Status badge */
  status?: 'online' | 'offline' | 'busy' | 'away'
  /** Status position */
  statusPosition?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  /** Border */
  bordered?: boolean
  /** CSS class */
  className?: string
  /** On click */
  onClick?: () => void
}

const AVATAR_SIZES = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-24 h-24 text-xl',
} as const

const STATUS_SIZES = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
  '2xl': 'w-5 h-5',
} as const

const STATUS_COLORS = {
  online: 'bg-brand-green-500',
  offline: 'bg-neutral-500',
  busy: 'bg-brand-red-500',
  away: 'bg-brand-amber-500',
} as const

const STATUS_POSITIONS = {
  'bottom-right': 'bottom-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'top-right': 'top-0 right-0',
  'top-left': 'top-0 left-0',
} as const

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

const COLOR_CLASSES = [
  'bg-brand-cyan-500',
  'bg-brand-green-500',
  'bg-brand-amber-500',
  'bg-brand-red-500',
  'bg-brand-navy-500',
  'bg-brand-purple-500',
  'bg-brand-pink-500',
  'bg-brand-orange-500',
]

function getColorFromName(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  const index = Math.abs(hash) % COLOR_CLASSES.length
  return COLOR_CLASSES[index]!
}

/**
 * Avatar - User/profile image with fallback
 */
const _Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = 'md',
      shape = 'circle',
      status,
      statusPosition = 'bottom-right',
      bordered = false,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const showImage = src && !name
    const showFallback = !src || name

    const borderColor = bordered ? 'border-2 border-white dark:border-neutral-950' : ''

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'relative inline-flex items-center justify-center overflow-hidden',
          'bg-neutral-200 dark:bg-neutral-800',
          AVATAR_SIZES[size],
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          borderColor,
          onClick && 'cursor-pointer',
          className
        )}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
        {showFallback && name && (
          <span className={cn('font-medium text-white select-none', getColorFromName(name))}>
            {getInitials(name)}
          </span>
        )}
        {showFallback && !name && (
          <svg className={cn('w-1/2 h-1/2 text-neutral-400 dark:text-neutral-500')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="12" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
        {status && (
          <span
            className={cn(
              'absolute rounded-full border-2 border-white dark:border-neutral-950',
              STATUS_SIZES[size],
              STATUS_COLORS[status],
              STATUS_POSITIONS[statusPosition]
            )}
            aria-label={`Status: ${status}`}
          />
        )}
      </div>
    )
  }
)

_Avatar.displayName = 'Avatar'

export const Avatar = _Avatar

// ============================================
// AvatarGroup
// ============================================

export interface AvatarGroupProps {
  /** Avatars */
  avatars: Array<AvatarProps>
  /** Max visible */
  max?: number
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  /** Spacing overlap */
  _overlap?: number
  /** CSS class */
  className?: string
}

/**
 * AvatarGroup - Stacked avatar group
 */
const _AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 5,
  size = 'md',
  _overlap = 8,
  className,
}) => {
  const visibleAvatars = avatars.slice(0, max)
  const remainingCount = avatars.length - max

  return (
    <div className={cn('flex -space-x-0', className)} role="group" aria-label={`${avatars.length} people`}>
      {visibleAvatars.map((avatar, index) => (
        <div key={index} className="relative z-[auto]" style={{ zIndex: max - index }}>
          <Avatar {...avatar} size={size} bordered={true} />
        </div>
      ))}
      {remainingCount > 0 && (
        <div className={cn(
          'flex items-center justify-center',
          'bg-neutral-200 dark:bg-neutral-800',
          'border-2 border-white dark:border-neutral-950',
          AVATAR_SIZES[size],
          'rounded-full',
          'font-medium text-sm text-neutral-600 dark:text-neutral-400'
        )} style={{ zIndex: 0 }}>
          +{remainingCount}
        </div>
      )}
    </div>
  )
}

_AvatarGroup.displayName = 'AvatarGroup'

export const AvatarGroup = _AvatarGroup

// ============================================
// Stat / KPI
// ============================================

export interface StatProps {
  /** Label */
  label: string
  /** Value */
  value: string | number
  /** Change indicator */
  change?: {
    value: number
    label?: string
    positive?: boolean
  }
  /** Icon */
  icon?: React.ReactNode
  /** Variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** CSS class */
  className?: string
}

const STAT_VARIANTS = {
  default: '',
  primary: 'text-brand-cyan-500',
  success: 'text-brand-green-500',
  warning: 'text-brand-amber-500',
  error: 'text-brand-red-500',
} as const

const STAT_SIZES = {
  sm: { value: 'text-2xl', label: 'text-xs', icon: 'w-5 h-5' },
  md: { value: 'text-3xl', label: 'text-sm', icon: 'w-6 h-6' },
  lg: { value: 'text-4xl', label: 'text-base', icon: 'w-8 h-8' },
} as const

/**
 * Stat - Key metric display
 */
const _Stat = forwardRef<HTMLDivElement, StatProps>(
  (
    {
      label,
      value,
      change,
      icon,
      variant = 'default',
      size = 'md',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-baseline gap-3',
          STAT_VARIANTS[variant],
          className
        )}
        {...props}
      >
        {icon && (
          <div className={cn('flex-shrink-0', STAT_SIZES[size].icon)}>
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <p className={cn('font-display font-bold tabular-nums', STAT_SIZES[size].value)}>
            {value}
          </p>
          <p className={cn('font-medium text-neutral-500 dark:text-neutral-400 truncate', STAT_SIZES[size].label)}>
            {label}
          </p>
          {change && (
            <div className="flex items-center gap-1 mt-1">
              <span className={cn(
                'text-xs font-medium',
                change.positive !== false ? 'text-brand-green-500' : 'text-brand-red-500'
              )}>
                {change.positive !== false ? '↑' : '↓'} {Math.abs(change.value)}%
              </span>
              {change.label && (
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  {change.label}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
)

_Stat.displayName = 'Stat'

export const Stat = _Stat

// ============================================
// BeforeAfterBar
// ============================================

export interface BeforeAfterBarProps {
  /** Before value */
  before: number
  /** After value */
  after: number
  /** Label for before */
  beforeLabel?: string
  /** Label for after */
  afterLabel?: string
  /** Unit suffix (e.g., '$', 'hrs', '%') */
  unit?: string
  /** Unit position */
  unitPosition?: 'prefix' | 'suffix'
  /** Format numbers */
  format?: (value: number) => string
  /** Bar variant */
  variant?: 'default' | 'savings' | 'reduction' | 'increase'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Show percentage change */
  showChange?: boolean
  /** CSS class */
  className?: string
}

const BAR_VARIANTS = {
  default: {
    before: 'bg-neutral-300 dark:bg-neutral-700',
    after: 'bg-brand-cyan-500',
    change: 'text-brand-cyan-500',
  },
  savings: {
    before: 'bg-brand-red-100 dark:bg-brand-red-900/30',
    after: 'bg-brand-green-500',
    change: 'text-brand-green-500',
  },
  reduction: {
    before: 'bg-brand-amber-100 dark:bg-brand-amber-900/30',
    after: 'bg-brand-amber-500',
    change: 'text-brand-amber-500',
  },
  increase: {
    before: 'bg-neutral-300 dark:bg-neutral-700',
    after: 'bg-brand-cyan-500',
    change: 'text-brand-cyan-500',
  },
} as const

const BAR_SIZES = {
  sm: { height: 'h-2', label: 'text-xs', value: 'text-sm', gap: 'gap-1' },
  md: { height: 'h-3', label: 'text-sm', value: 'text-base', gap: 'gap-2' },
  lg: { height: 'h-4', label: 'text-base', value: 'text-lg', gap: 'gap-3' },
} as const

/**
 * BeforeAfterBar - Visual comparison of before/after values
 */
const _BeforeAfterBar = forwardRef<HTMLDivElement, BeforeAfterBarProps>(
  (
    {
      before,
      after,
      beforeLabel = 'Before',
      afterLabel = 'After',
      unit = '',
      unitPosition = 'suffix',
      format = (v) => v.toLocaleString(),
      variant = 'default',
      size = 'md',
      showChange = true,
      className,
      ...props
    },
    ref
  ) => {
    const isReduction = after < before
    const isSavings = isReduction
    const changePercent = before !== 0 ? ((before - after) / before) * 100 : 0
    const changeValue = before - after

    const formatValue = (val: number) => {
      const formatted = format(val)
      return unitPosition === 'prefix' ? `${unit}${formatted}` : `${formatted}${unit}`
    }

    // Calculate bar widths (percentage of max)
    const maxVal = Math.max(before, after)
    const beforeWidth = maxVal > 0 ? (before / maxVal) * 100 : 0
    const afterWidth = maxVal > 0 ? (after / maxVal) * 100 : 0

    const variantStyles = BAR_VARIANTS[variant]
    const sizeStyles = BAR_SIZES[size]

    return (
      <div
        ref={ref}
        className={cn('space-y-4', className)}
        {...props}
      >
        {/* Before Bar */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className={cn('font-medium', sizeStyles.label)}>{beforeLabel}</span>
            <span className={cn('font-display font-bold tabular-nums', sizeStyles.value)}>
              {formatValue(before)}
            </span>
          </div>
          <div className="relative" style={{ height: sizeStyles.height }}>
            <div
              className={cn(
                'absolute inset-0 rounded-full overflow-hidden',
                variantStyles.before
              )}
              style={{ width: `${beforeWidth}%` }}
            />
          </div>
        </div>

        {/* After Bar */}
        <div className="space-y-1">
          <div className="flex justify-between">
            <span className={cn('font-medium', sizeStyles.label)}>{afterLabel}</span>
            <span className={cn('font-display font-bold tabular-nums', sizeStyles.value)}>
              {formatValue(after)}
            </span>
          </div>
          <div className="relative" style={{ height: sizeStyles.height }}>
            <div
              className={cn(
                'absolute inset-0 rounded-full overflow-hidden',
                variantStyles.after
              )}
              style={{ width: `${afterWidth}%` }}
            />
          </div>
        </div>

        {/* Change Indicator */}
        {showChange && (
          <div className={cn('flex items-center justify-between pt-2', sizeStyles.gap)}>
            <span className={cn('font-medium', sizeStyles.label)}>
              {isSavings ? 'Savings' : 'Change'}
            </span>
            <span className={cn(
              'font-display font-bold tabular-nums',
              sizeStyles.value,
              variantStyles.change
            )}>
              {isSavings ? '−' : '+'} {formatValue(Math.abs(changeValue))}{' '}
              <span className={cn('font-normal', sizeStyles.label)}>
                ({Math.abs(changePercent).toFixed(1)}%)
              </span>
            </span>
          </div>
        )}
      </div>
    )
  }
)

_BeforeAfterBar.displayName = 'BeforeAfterBar'

export const BeforeAfterBar = _BeforeAfterBar

// ============================================
// StatTile
// ============================================

export interface StatTileProps {
  /** Label */
  label: string
  /** Primary value */
  value: string | number
  /** Optional secondary value */
  secondaryValue?: string | number
  /** Secondary value label */
  secondaryLabel?: string
  /** Icon */
  icon?: React.ReactNode
  /** Icon background color */
  iconBg?: string
  /** Trend indicator */
  trend?: {
    value: number
    label?: string
    positive?: boolean
  }
  /** Variant */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'gradient'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** CSS class */
  className?: string
  /** On click */
  onClick?: () => void
}

const TILE_VARIANTS = {
  default: 'bg-white/5 dark:bg-neutral-950/50 border-white/10 dark:border-neutral-800',
  primary: 'bg-brand-cyan-500/10 border-brand-cyan-500/20',
  success: 'bg-brand-green-500/10 border-brand-green-500/20',
  warning: 'bg-brand-amber-500/10 border-brand-amber-500/20',
  error: 'bg-brand-red-500/10 border-brand-red-500/20',
  gradient: 'bg-gradient-to-br from-brand-cyan-500/10 to-brand-purple-500/10 border-brand-cyan-500/20',
} as const

const TILE_SIZES = {
  sm: { padding: 'p-4', icon: 'w-10 h-10', value: 'text-2xl', label: 'text-xs', secondary: 'text-xs' },
  md: { padding: 'p-6', icon: 'w-12 h-12', value: 'text-3xl', label: 'text-sm', secondary: 'text-sm' },
  lg: { padding: 'p-8', icon: 'w-16 h-16', value: 'text-4xl', label: 'text-base', secondary: 'text-base' },
} as const

/**
 * StatTile - Enhanced metric display with icon, trend, and secondary value
 */
const _StatTile = forwardRef<HTMLDivElement, StatTileProps>(
  (
    {
      label,
      value,
      secondaryValue,
      secondaryLabel,
      icon,
      iconBg,
      trend,
      variant = 'default',
      size = 'md',
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const sizeStyles = TILE_SIZES[size]

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={cn(
          'glass-strong rounded-2xl border',
          TILE_VARIANTS[variant],
          sizeStyles.padding,
          onClick && 'cursor-pointer hover:border-brand-cyan-500/50 transition-colors duration-200',
          className
        )}
        {...props}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className={cn('font-medium truncate', sizeStyles.label)}>
              {label}
            </p>
            <p className={cn('font-display font-bold tabular-nums mt-1', sizeStyles.value)}>
              {value}
            </p>
            {secondaryValue !== undefined && (
              <p className={cn('mt-2', sizeStyles.secondary)}>
                <span className="font-medium">{secondaryValue}</span>
                {secondaryLabel && <span className="text-neutral-400 ml-1">{secondaryLabel}</span>}
              </p>
            )}
            {trend && (
              <div className="flex items-center gap-1.5 mt-2">
                <span className={cn(
                  'text-xs font-medium',
                  trend.positive !== false ? 'text-brand-green-500' : 'text-brand-red-500'
                )}>
                  {trend.positive !== false ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
                {trend.label && (
                  <span className="text-xs text-neutral-500 dark:text-neutral-400">
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                'flex-shrink-0 rounded-xl flex items-center justify-center',
                sizeStyles.icon,
                iconBg || 'bg-brand-cyan-500/20'
              )}
              aria-hidden="true"
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    )
  }
)

_StatTile.displayName = 'StatTile'

export const StatTile = _StatTile

// ============================================
// Table
// ============================================

export interface Column<T> {
  /** Column key */
  key: string
  /** Header label */
  header: string
  /** Accessor key or function */
  accessor: keyof T | ((row: T) => React.ReactNode)
  /** Cell renderer */
  cell?: (value: unknown, row: T) => React.ReactNode
  /** Width */
  width?: string
  /** Alignment */
  align?: 'left' | 'center' | 'right'
  /** Sortable */
  sortable?: boolean
  /** Filterable */
  filterable?: boolean
  /** Filter type */
  filterType?: 'text' | 'select' | 'number' | 'date' | 'boolean'
  /** Filter options (for select) */
  filterOptions?: Array<{ label: string; value: string }>
  /** Hidden */
  hidden?: boolean
}

export interface SortConfig<T = unknown> {
  key: keyof T | ((row: T) => unknown)
  direction: 'asc' | 'desc'
}

export interface FilterConfig {
  key: string
  value: unknown
}

export interface PaginationConfig {
  page: number
  pageSize: number
}

export interface VirtualizationConfig {
  /** Enable virtualization */
  enabled: boolean
  /** Row height (for virtualization) */
  rowHeight?: number
  /** Buffer rows */
  overscan?: number
}

export interface TableProps<T> {
  /** Columns */
  columns: Column<T>[]
  /** Data rows */
  data: T[]
  /** Row key */
  rowKey: keyof T | ((row: T) => string)
  /** Empty state */
  emptyMessage?: string
  /** Loading state */
  loading?: boolean
  /** Striped rows */
  striped?: boolean
  /** Hoverable rows */
  hoverable?: boolean
  /** Bordered */
  bordered?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** On row click */
  onRowClick?: (row: T) => void
  /** Selected rows */
  selectedKeys?: Set<string>
  /** On selection change */
  onSelectionChange?: (keys: Set<string>) => void
  /** CSS class */
  className?: string

  // Enhanced features
  /** Enable sorting */
  sortable?: boolean
  /** Sort config */
  sortConfig?: SortConfig<T>
  /** On sort change */
  onSortChange?: (config: SortConfig<T>) => void
  /** Enable filtering */
  filterable?: boolean
  /** Filter config */
  filters?: Record<string, unknown>
  /** On filter change */
  onFilterChange?: (filters: Record<string, unknown>) => void
  /** Enable pagination */
  paginated?: boolean
  /** Pagination config */
  pagination?: PaginationConfig
  /** On pagination change */
  onPaginationChange?: (config: PaginationConfig) => void
  /** Page size options */
  pageSizeOptions?: number[]
  /** Virtualization config */
  virtualization?: VirtualizationConfig
  /** Show column visibility toggle */
  showColumnToggle?: boolean
  /** Footer renderer */
  footer?: () => React.ReactNode
  /** Toolbar renderer */
  toolbar?: () => React.ReactNode
}

const TABLE_SIZES = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
} as const

/**
 * Table - Data table with sorting, selection
 */
function TableComponent<T extends Record<string, unknown>>({
  columns,
  data,
  rowKey,
  emptyMessage = 'No data',
  loading = false,
  striped = false,
  hoverable = true,
  bordered = true,
  size = 'md',
  onRowClick,
  selectedKeys,
  onSelectionChange,
  className,

  // Enhanced features
  sortable = false,
  sortConfig,
  onSortChange,
  filterable = false,
  filters = {},
  onFilterChange,
  paginated = false,
  pagination,
  onPaginationChange,
  pageSizeOptions = [10, 25, 50, 100],
  virtualization,
  showColumnToggle = false,
  footer,
  toolbar,
}: TableProps<T>) {
  const getRowKey = (row: T) => (typeof rowKey === 'function' ? rowKey(row) : String(row[rowKey]))

  const handleSelectAll = (checked: boolean) => {
    if (!onSelectionChange) return
    if (checked) {
      onSelectionChange(new Set(data.map(getRowKey)))
    } else {
      onSelectionChange(new Set())
    }
  }

  const handleSelectRow = (key: string, checked: boolean) => {
    if (!onSelectionChange) return
    const newKeys = new Set(selectedKeys || [])
    if (checked) newKeys.add(key)
    else newKeys.delete(key)
    onSelectionChange(newKeys)
  }

  const isSelected = (row: T) => selectedKeys?.has(getRowKey(row))

  // Filter visible columns
  const visibleColumns = useMemo(
    () => columns.filter((col) => !col.hidden),
    [columns]
  )

  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortable || !sortConfig) return data
    return [...data].sort((a, b) => {
      const getValue = (row: T) => {
        if (typeof sortConfig.key === 'function') return sortConfig.key(row)
        return row[sortConfig.key as keyof T]
      }
      const aVal = getValue(a)
      const bVal = getValue(b)
      if (aVal == null && bVal == null) return 0
      if (aVal == null) return 1
      if (bVal == null) return -1
      const comparison = String(aVal).localeCompare(String(bVal), undefined, { numeric: true })
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortable, sortConfig])

  // Apply filtering
  const filteredData = useMemo(() => {
    if (!filterable || Object.keys(filters).length === 0) return sortedData
    return sortedData.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        if (value == null || value === '') return true
        const rowValue = row[key as keyof T]
        if (rowValue == null) return false
        const filterValue = String(value).toLowerCase()
        return String(rowValue).toLowerCase().includes(filterValue)
      })
    })
  }, [sortedData, filterable, filters])

  // Apply pagination
  const paginatedData = useMemo(() => {
    if (!paginated || !pagination) return filteredData
    const start = (pagination.page - 1) * pagination.pageSize
    return filteredData.slice(start, start + pagination.pageSize)
  }, [filteredData, paginated, pagination])

  // Virtualization
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const rowHeight = virtualization?.rowHeight || 48
  const overscan = virtualization?.overscan || 5

  const { visibleData, totalHeight, offsetY } = useMemo(() => {
    if (!virtualization?.enabled || !containerRef.current) {
      return { visibleData: paginatedData, totalHeight: 0, offsetY: 0 }
    }

    const containerHeight = containerRef.current.clientHeight
    const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight) - overscan)
    const visibleCount = Math.ceil(containerHeight / rowHeight) + overscan * 2
    const endIndex = Math.min(paginatedData.length, startIndex + visibleCount)

    return {
      visibleData: paginatedData.slice(startIndex, endIndex),
      totalHeight: paginatedData.length * rowHeight,
      offsetY: startIndex * rowHeight,
    }
  }, [paginatedData, scrollTop, rowHeight, overscan, virtualization?.enabled])

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }, [])

  const handleSort = (key: string) => {
    if (!onSortChange) return
    const currentDirection = sortConfig?.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSortChange({ key, direction: currentDirection })
  }

  const handleFilterChange = (key: string, value: unknown) => {
    if (!onFilterChange) return
    const newFilters = { ...filters }
    if (value == null || value === '') {
      delete newFilters[key]
    } else {
      newFilters[key] = value
    }
    onFilterChange(newFilters)
    if (onPaginationChange) onPaginationChange({ ...pagination!, page: 1 })
  }

  const handlePageChange = (page: number) => {
    if (!onPaginationChange || !pagination) return
    onPaginationChange({ ...pagination, page })
  }

  const handlePageSizeChange = (pageSize: number) => {
    if (!onPaginationChange || !pagination) return
    onPaginationChange({ ...pagination, pageSize, page: 1 })
  }

  if (loading) {
    return (
      <div className={cn('overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800', className)}>
        <div className="p-4">
          <div className="space-y-3" role="status" aria-label="Loading table">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-12 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
                <div className="flex-1 h-4 bg-neutral-200 dark:bg-neutral-700 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const totalPages = paginated && pagination ? Math.ceil(filteredData.length / pagination.pageSize) : 1

  return (
    <div className={cn('rounded-lg', bordered && 'border border-neutral-200 dark:border-neutral-800', className)}>
      {toolbar && (
        <div className="px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 flex-wrap">
          {toolbar()}
        </div>
      )}

      <div
        ref={containerRef}
        className="overflow-x-auto"
        onScroll={virtualization?.enabled ? handleScroll : undefined}
        style={virtualization?.enabled ? { maxHeight: '600px' } : undefined}
      >
        <table className="w-full" role="grid" style={virtualization?.enabled ? { height: totalHeight } : undefined}>
          <thead className="bg-neutral-50 dark:bg-neutral-900/50 sticky top-0 z-10">
            <tr>
              {selectedKeys !== undefined && onSelectionChange && (
                <th className="px-4 py-3 text-left" style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    checked={paginatedData.length > 0 && paginatedData.every(isSelected)}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 rounded border-neutral-300 text-brand-cyan-500 focus:ring-brand-cyan-500"
                    aria-label="Select all rows"
                  />
                </th>
              )}
              {visibleColumns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    'px-4 py-3 font-semibold text-neutral-600 dark:text-neutral-400',
                    TABLE_SIZES[size],
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.sortable && sortable && 'cursor-pointer select-none hover:text-brand-navy-900 dark:hover:text-brand-white',
                    column.filterable && filterable && 'pr-8',
                    column.width && `w-[${column.width}]`
                  )}
                  style={column.width ? { width: column.width, minWidth: column.width } : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    {column.header}
                    {column.sortable && sortable && (
                      <button
                        type="button"
                        onClick={() => handleSort(column.key)}
                        className="p-0.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded transition-colors"
                        aria-label={sortConfig?.key === column.key
                          ? `Sort ${sortConfig.direction === 'asc' ? 'descending' : 'ascending'}`
                          : 'Sort'}
                        aria-sort={sortConfig?.key === column.key ? (sortConfig.direction === 'asc' ? 'ascending' : 'descending') : 'none'}
                      >
                        {sortConfig?.key === column.key ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="h-4 w-4 text-brand-cyan-600 dark:text-brand-cyan-400" aria-hidden="true" />
                          ) : (
                            <ChevronDown className="h-4 w-4 text-brand-cyan-600 dark:text-brand-cyan-400" aria-hidden="true" />
                          )
                        ) : (
                          <svg className="h-4 w-4 text-neutral-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
                            <path d="M14.77 12.79a.75.75 0 01-1.06.02L10 8.832l-3.71 3.938a.75.75 0 11-1.08-1.04l4.25-4.5a.75.75 0 011.08 0l4.25 4.5a.75.75 0 01-.02 1.06z" />
                          </svg>
                        )}
                      </button>
                    )}
                    {column.filterable && filterable && (
                      <FilterMenu
                        column={column}
                        value={filters[column.key] as string}
                        onChange={(value) => handleFilterChange(column.key, value)}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800" style={virtualization?.enabled ? { transform: `translateY(${offsetY}px)` } : undefined}>
            {paginatedData.length === 0 ? (
              <tr>
                <td colSpan={visibleColumns.length + (selectedKeys !== undefined && onSelectionChange ? 1 : 0)} className="px-4 py-8 text-center text-neutral-500 dark:text-neutral-400">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              <>
                {virtualization?.enabled
                  ? visibleData.map((row) => renderRow(row))
                  : paginatedData.map((row) => renderRow(row))}
              </>
            )}
          </tbody>
        </table>
      </div>

      {footer && <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">{footer()}</div>}

      {paginated && pagination && (
        <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-4 flex-wrap">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Showing {((pagination.page - 1) * pagination.pageSize) + 1} to {Math.min(pagination.page * pagination.pageSize, filteredData.length)} of {filteredData.length}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={pagination.pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900"
              aria-label="Rows per page"
            >
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>{size} per page</option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => handlePageChange(1)}
              disabled={pagination.page === 1}
              className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="First page"
            >
              <ChevronLeft className="h-4 w-4" /><ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-2 text-sm font-medium">
              Page {pagination.page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === totalPages}
              className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => handlePageChange(totalPages)}
              disabled={pagination.page === totalPages}
              className="p-1.5 rounded border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Last page"
            >
              <ChevronRight className="h-4 w-4" /><ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {showColumnToggle && (
        <ColumnToggle columns={columns} />
      )}
    </div>
  )

  function renderRow(row: T) {
    const key = getRowKey(row)
    return (
      <tr
        key={key}
        className={cn(
          'transition-colors',
          striped && 'even:bg-neutral-50 dark:even:bg-neutral-900/50',
          hoverable && 'hover:bg-neutral-50 dark:hover:bg-neutral-900/50',
          onRowClick && 'cursor-pointer',
          isSelected(row) && 'bg-brand-cyan-50 dark:bg-brand-cyan-900/20'
        )}
        onClick={() => onRowClick?.(row)}
        tabIndex={onRowClick ? 0 : undefined}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onRowClick?.(row) }}
        role={onRowClick ? 'button' : undefined}
        aria-selected={isSelected(row)}
        style={virtualization?.enabled ? { height: rowHeight } : undefined}
      >
        {selectedKeys !== undefined && onSelectionChange && (
          <td className="px-4 py-3">
            <input
              type="checkbox"
              checked={isSelected(row)}
              onChange={(e) => { e.stopPropagation(); handleSelectRow(key, e.target.checked) }}
              className="w-4 h-4 rounded border-neutral-300 text-brand-cyan-500 focus:ring-brand-cyan-500"
              aria-label={`Select row ${key}`}
            />
          </td>
        )}
        {visibleColumns.map((column) => {
          const value = typeof column.accessor === 'function' ? column.accessor(row) : row[column.accessor]
          return (
            <td
              key={column.key}
              className={cn(
                'px-4 py-3',
                TABLE_SIZES[size],
                column.align === 'center' && 'text-center',
                column.align === 'right' && 'text-right'
              )}
            >
              {column.cell ? column.cell(value, row) : String(value ?? '')}
            </td>
          )
        })}
      </tr>
    )
  }
}

TableComponent.displayName = 'Table'

export const Table = TableComponent

// ============================================
// Filter Menu Component
// ============================================

interface FilterMenuProps<T> {
  column: Column<T>
  value: string
  onChange: (value: string) => void
}

function FilterMenu<T>({ column, value, onChange }: FilterMenuProps<T>) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          'p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors',
          value && 'text-brand-cyan-600 dark:text-brand-cyan-400'
        )}
        aria-label={`Filter ${column.header}`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        <Filter className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 top-full mt-1 min-w-[200px] rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg py-2 z-50 animate-slide-down"
          role="menu"
        >
          {column.filterType === 'select' && column.filterOptions && (
            <>
              <button
                type="button"
                onClick={() => onChange('')}
                className={cn('w-full px-3 py-2 text-left text-sm', value === '' ? 'bg-brand-cyan-50 dark:bg-brand-cyan-900/30 text-brand-cyan-600 dark:text-brand-cyan-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800')}
                role="menuitem"
              >
                Clear filter
              </button>
              <hr className="my-1 border-neutral-200 dark:border-neutral-800" />
              {column.filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => { onChange(opt.value); setOpen(false) }}
                  className={cn('w-full px-3 py-2 text-left text-sm', value === opt.value ? 'bg-brand-cyan-50 dark:bg-brand-cyan-900/30 text-brand-cyan-600 dark:text-brand-cyan-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800')}
                  role="menuitem"
                  aria-checked={value === opt.value}
                >
                  {opt.label}
                </button>
              ))}
            </>
          )}

          {column.filterType === 'text' && (
            <div className="p-2">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500"
                autoFocus
              />
            </div>
          )}

          {column.filterType === 'number' && (
            <div className="p-2 space-y-2">
              <input
                type="number"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Min"
                className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500"
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full px-2 py-1.5 text-sm border border-neutral-300 dark:border-neutral-700 rounded bg-white dark:bg-neutral-900 focus:outline-none focus:ring-2 focus:ring-brand-cyan-500"
              />
            </div>
          )}

          {column.filterType === 'boolean' && (
            <>
              <button
                type="button"
                onClick={() => { onChange('true'); setOpen(false) }}
                className={cn('w-full px-3 py-2 text-left text-sm', value === 'true' ? 'bg-brand-cyan-50 dark:bg-brand-cyan-900/30 text-brand-cyan-600 dark:text-brand-cyan-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800')}
                role="menuitem"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => { onChange('false'); setOpen(false) }}
                className={cn('w-full px-3 py-2 text-left text-sm', value === 'false' ? 'bg-brand-cyan-50 dark:bg-brand-cyan-900/30 text-brand-cyan-600 dark:text-brand-cyan-400' : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800')}
                role="menuitem"
              >
                No
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

// ============================================
// Column Toggle Component
// ============================================

interface ColumnToggleProps<T> {
  columns: Column<T>[]
}

function ColumnToggle<T>({ columns }: ColumnToggleProps<T>) {
  const [open, setOpen] = useState(false)
  const toggleRef = useRef<HTMLDivElement>(null)
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(
    useMemo(() => {
      const initial: Record<string, boolean> = {}
      columns.forEach((col) => { initial[col.key] = !col.hidden })
      return initial
    }, [columns])
  )

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleColumn = (key: string) => {
    setColumnVisibility((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div ref={toggleRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="px-3 py-1.5 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 flex items-center gap-1.5"
        aria-label="Toggle columns"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M7 3a1 1 0 011-1h4a1 1 0 011 1v2H7V3zm0 4a1 1 0 011-1h4a1 1 0 011 1v4H7V7zm-2 6a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1H8a1 1 0 01-1-1v-2zM3 9a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" />
        </svg>
        Columns
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-[180px] rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 shadow-lg py-2 z-50 animate-slide-down">
          {columns.map((column) => (
            <label key={column.key} className="flex items-center px-3 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer">
              <input
                type="checkbox"
                checked={columnVisibility[column.key] !== false}
                onChange={() => toggleColumn(column.key)}
                className="w-4 h-4 rounded border-neutral-300 text-brand-cyan-500 focus:ring-brand-cyan-500 mr-2"
              />
              {column.header}
            </label>
          ))}
        </div>
      )}
    </div>
  )
}

// ============================================
// DataList
// ============================================

export interface DataListItem {
  label: string
  value: React.ReactNode
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export interface DataListProps {
  /** Items */
  items: DataListItem[]
  /** Layout */
  layout?: 'vertical' | 'horizontal' | 'grid'
  /** Columns (grid) */
  _columns?: 1 | 2 | 3 | 4
  /** Divider */
  divider?: boolean
  /** CSS class */
  className?: string
}

/**
 * DataList - Key-value pair list
 */
const _DataList: React.FC<DataListProps> = ({
  items,
  layout = 'vertical',
  _columns = 2,
  divider = true,
  className,
}) => {
  if (layout === 'grid') {
    return (
      <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4', className)}>
        {items.map((item, index) => (
          <div key={index} className={cn('flex flex-col gap-1', divider && 'pb-4 border-b border-neutral-200 dark:border-neutral-800')}>
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-2">
              {item.prefix}
              {item.label}
            </dt>
            <dd className="text-base font-medium text-brand-navy-900 dark:text-brand-white flex items-center gap-2">
              {item.value}
              {item.suffix}
            </dd>
          </div>
        ))}
      </div>
    )
  }

  if (layout === 'horizontal') {
    return (
      <dl className={cn('flex flex-wrap gap-6', className)}>
        {items.map((item, index) => (
          <div key={index} className="flex items-baseline gap-2">
            <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400">{item.label}</dt>
            <dd className="text-base font-medium text-brand-navy-900 dark:text-brand-white">{item.value}</dd>
            {item.suffix && <span className="text-sm text-neutral-500 dark:text-neutral-400">{item.suffix}</span>}
          </div>
        ))}
      </dl>
    )
  }

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item, index) => (
        <div key={index} className={cn('flex items-center justify-between gap-4', divider && index < items.length - 1 && 'pb-3 border-b border-neutral-200 dark:border-neutral-800')}>
          <dt className="text-sm font-medium text-neutral-500 dark:text-neutral-400 flex items-center gap-2 flex-1">
            {item.prefix}
            {item.label}
          </dt>
          <dd className="text-base font-medium text-brand-navy-900 dark:text-brand-white text-right flex-shrink-0 flex items-center gap-2">
            {item.value}
            {item.suffix}
          </dd>
        </div>
      ))}
    </div>
  )
}

_DataList.displayName = 'DataList'

export const DataList = _DataList