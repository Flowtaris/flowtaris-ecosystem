// @flowtaris/ui - Breadcrumbs Pattern
// Enhanced breadcrumbs with icons, dropdowns, and responsive collapse

'use client'

import React, { forwardRef } from 'react'
import { cn } from '../utils'
import { ChevronRight, Home, MoreHorizontal } from 'lucide-react'
import { DropdownMenu, type DropdownMenuItem } from '../overlay'

// ============================================
// Types
// ============================================

export interface BreadcrumbPatternItem {
  label: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  disabled?: boolean
  current?: boolean
  dropdownItems?: BreadcrumbPatternItem[]
}

interface InternalBreadcrumbItem {
  item: BreadcrumbPatternItem
  index: number
  originalIndex: number
}

interface DropdownBreadcrumbItem {
  ItemComponent: typeof DropdownBreadcrumb
  item: { label: string; dropdownItems: BreadcrumbPatternItem[] }
  index: number
  originalIndex: number
}

type DisplayBreadcrumbItem = InternalBreadcrumbItem | DropdownBreadcrumbItem

export interface BreadcrumbsPatternProps {
  /** Breadcrumb items */
  items: BreadcrumbPatternItem[]
  /** Separator */
  separator?: React.ReactNode
  /** Max visible items before collapsing */
  maxItems?: number
  /** Show home icon for first item */
  showHomeIcon?: boolean
  /** Variant */
  variant?: 'default' | 'minimal' | 'icons' | 'segments'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Collapse behavior */
  collapse?: 'ellipsis' | 'dropdown' | 'none'
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

// ============================================
// BreadcrumbsPattern Component
// ============================================

const _BreadcrumbsPattern = forwardRef<HTMLElement, BreadcrumbsPatternProps>(
  (
    {
      items,
      separator = <ChevronRight className="h-4 w-4 flex-shrink-0" />,
      maxItems = 5,
      showHomeIcon = true,
      variant = 'default',
      size = 'md',
      collapse = 'ellipsis',
      className,
      style,
    },
    ref
  ) => {
    const SIZE_CLASSES = {
      sm: 'text-xs gap-1.5 px-1.5 py-1',
      md: 'text-sm gap-2 px-2 py-1.5',
      lg: 'text-base gap-2.5 px-3 py-2',
    } as const

    const VARIANT_STYLES: Record<string, string> = {
      default: '',
      minimal: 'bg-transparent',
      icons: '',
      segments: 'bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1',
    } as const

    // Process items for display
    const getDisplayItems = (): DisplayBreadcrumbItem[] => {
      if (items.length <= maxItems || collapse === 'none') {
        return items.map((item, index) => ({ item, index, originalIndex: index }))
      }

      if (collapse === 'dropdown') {
        // Keep first, last, and collapse middle into dropdown
        const first = items[0]
        const last = items[items.length - 1]
        const middle = items.slice(1, -1)

        return [
          { item: first, index: 0, originalIndex: 0 },
          {
            ItemComponent: DropdownBreadcrumb,
            item: { label: `...${middle.length} more`, dropdownItems: middle },
            index: 1,
            originalIndex: -1,
          },
          { item: last, index: 2, originalIndex: items.length - 1 },
        ]
      }

      // Ellipsis collapse
      const visibleCount = maxItems - 1 // -1 for ellipsis
      const firstVisible = Math.floor(visibleCount / 2)
      const lastVisible = visibleCount - firstVisible

      const displayItems: DisplayBreadcrumbItem[] = [
        ...items.slice(0, firstVisible).map((item, index) => ({
          item,
          index,
          originalIndex: index,
        })),
        { item: { label: '...', disabled: true } as BreadcrumbPatternItem, index: firstVisible, originalIndex: -1 },
        ...items.slice(-lastVisible).map((item, index) => ({
          item,
          index: firstVisible + 1 + index,
          originalIndex: items.length - lastVisible + index,
        })),
      ]

      return displayItems
    }
    const displayItems = getDisplayItems()

    const renderBreadcrumbItem = (item: BreadcrumbPatternItem, index: number, isLast: boolean) => {
      const isFirst = index === 0
      const isCurrent = item.current ?? isLast
      const isDisabled = item.disabled

      const baseClasses = cn(
        'flex items-center gap-1.5 font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
        SIZE_CLASSES[size],
        isDisabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )

      const variantItemStyles = {
        default: cn(
          isCurrent
            ? 'text-brand-cyan-600 dark:text-brand-cyan-400'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400'
        ),
        minimal: cn(
          isCurrent
            ? 'text-neutral-900 dark:text-white font-semibold'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
        ),
        icons: cn(
          isCurrent
            ? 'text-brand-cyan-600 dark:text-brand-cyan-400'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400'
        ),
        segments: cn(
          'rounded-md px-3 py-1.5',
          isCurrent
            ? 'bg-brand-cyan-600 text-white dark:bg-brand-cyan-500'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
        ),
      } as const

      const content = item.href || item.onClick ? (
        <a
          href={item.href}
          onClick={(e) => {
            if (item.onClick) {
              e.preventDefault()
              item.onClick()
            }
          }}
          className={cn(baseClasses, variantItemStyles[variant])}
          aria-current={isCurrent ? 'page' : undefined}
          aria-disabled={isDisabled}
          tabIndex={isDisabled ? -1 : undefined}
        >
          {(showHomeIcon && isFirst && !item.icon) && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
          {item.icon && <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>}
          {item.label}
        </a>
      ) : (
        <span
          className={cn(baseClasses, variantItemStyles[variant])}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {(showHomeIcon && isFirst && !item.icon) && <Home className="h-3.5 w-3.5" aria-hidden="true" />}
          {item.icon && <span className="flex-shrink-0" aria-hidden="true">{item.icon}</span>}
          {item.label}
        </span>
      )

      return (
        <li key={index} className="flex items-center">
          {index > 0 && (
            <span className={cn('flex-shrink-0 text-neutral-400 dark:text-neutral-500', SIZE_CLASSES[size])} aria-hidden="true">
              {separator}
            </span>
          )}
          {content}
        </li>
      )
    }

    return (
      <nav
        ref={ref}
        className={cn('w-full overflow-x-auto', VARIANT_STYLES[variant], className)}
        style={style}
        aria-label="Breadcrumb"
      >
        <ol className={cn('flex items-center flex-wrap min-w-max', VARIANT_STYLES.segments && 'p-1')}>
          {displayItems.map((displayItem, displayIndex) => {
            const isLast = displayIndex === displayItems.length - 1

            // Check if this is a DropdownBreadcrumb item
            if ('ItemComponent' in displayItem && typeof displayItem.ItemComponent === 'function') {
              const DropdownItem = displayItem.ItemComponent
              return <DropdownItem key={displayIndex} {...displayItem.item} />
            }

            return renderBreadcrumbItem(displayItem.item, displayIndex, isLast)
          })}
        </ol>
      </nav>
    )
  }
)

_BreadcrumbsPattern.displayName = 'BreadcrumbsPattern'

// DropdownBreadcrumb sub-component
const DropdownBreadcrumb = ({
  label,
  dropdownItems = [],
}: BreadcrumbPatternItem & { dropdownItems: BreadcrumbPatternItem[] }) => {
  // Convert BreadcrumbPatternItem to DropdownMenuItem format
  const menuItems: DropdownMenuItem[] = dropdownItems.map((item) => ({
    label: item.label,
    onClick: item.onClick,
    href: item.href,
    icon: item.icon,
    disabled: item.disabled,
    divider: false,
    shortcut: undefined,
    danger: false,
  }))

  // Create a trigger button
  const trigger = (
    <button
      type="button"
      className="px-2 py-1.5 text-sm font-medium text-neutral-500 dark:text-neutral-400 cursor-default flex items-center gap-1.5"
      disabled
    >
      <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
      {label}
    </button>
  )

  return <DropdownMenu trigger={trigger} items={menuItems} />
}

// ============================================
// Exports
// ============================================

export const BreadcrumbsPattern = _BreadcrumbsPattern