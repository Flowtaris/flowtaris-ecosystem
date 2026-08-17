// @flowtaris/ui - Navigation Components
// Navigation primitives with design token integration

'use client'

import React, { forwardRef, useState, useEffect } from 'react'
import { cn } from './utils'
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react'

// ============================================
// Navbar
// ============================================

export interface NavItem {
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  children?: NavItem[]
}

export interface NavbarProps {
  /** Logo/brand */
  brand?: React.ReactNode
  /** Navigation items */
  items?: NavItem[]
  /** Right side actions */
  actions?: React.ReactNode
  /** Variant */
  variant?: 'default' | 'transparent' | 'bordered' | 'glass'
  /** Fixed position */
  fixed?: boolean
  /** CSS class */
  className?: string
}

const NAVBAR_VARIANTS = {
  default: 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md',
  transparent: 'bg-transparent',
  bordered: 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800',
  glass: 'glass',
} as const

/**
 * Navbar - Top navigation bar with responsive mobile menu
 */
export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  (
    {
      brand,
      items = [],
      actions,
      variant = 'default',
      fixed = false,
      className,
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
      const handleScroll = () => {
        setScrolled(window.scrollY > 10)
      }
      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
      <nav
        ref={ref}
        className={cn(
          'w-full z-40 transition-all duration-200',
          fixed ? 'fixed top-0 left-0' : 'relative',
          NAVBAR_VARIANTS[variant],
          scrolled && fixed && 'shadow-sm',
          className
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <div className="flex items-center gap-8 lg:gap-12">
            {brand && (
              <div className="flex-shrink-0" aria-label="Brand">
                {brand}
              </div>
            )}

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {items.map((item, index) => (
                <NavItemComponent key={index} item={item} />
              ))}
            </div>
          </div>

          {/* Actions & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {actions && <div className="flex items-center gap-3">{actions}</div>}

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-menu"
            className={cn(
              'lg:hidden animate-slide-down',
              'bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800',
              fixed ? 'fixed top-16 left-0 right-0' : 'absolute top-full left-0 right-0'
            )}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-4 space-y-2">
              {items.map((item, index) => (
                <NavItemComponent key={index} item={item} mobile={true} />
              ))}
              {actions && (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  {actions}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    )
  }
)

Navbar.displayName = 'Navbar'

// NavItem sub-component
const NavItemComponent = ({
  item,
  mobile = false,
}: {
  item: NavItem
  mobile?: boolean
}) => {
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setSubMenuOpen(!subMenuOpen)
    } else if (item.onClick) {
      item.onClick()
    }
  }

  const baseStyles = cn(
    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
    item.disabled && 'opacity-50 cursor-not-allowed',
    mobile && 'w-full'
  )

  if (hasChildren) {
    return (
      <div className="relative" role="menuitem" aria-haspopup="true" aria-expanded={subMenuOpen}>
        <button
          type="button"
          className={baseStyles}
          onClick={handleClick}
          disabled={item.disabled}
          aria-expanded={subMenuOpen}
        >
          {item.label}
          <ChevronDown
            className={cn('h-4 w-4 transition-transform', subMenuOpen && 'rotate-180')}
            aria-hidden="true"
          />
        </button>
        {subMenuOpen && (
          <div
            className={cn(
              'absolute top-full left-0 mt-1 min-w-[200px] rounded-lg border border-neutral-200 dark:border-neutral-800',
              'bg-white dark:bg-neutral-950 shadow-lg',
              'py-1 animate-slide-down',
              'z-50',
              mobile && 'static w-full border-none shadow-none bg-transparent dark:bg-transparent'
            )}
            role="menu"
          >
            {item.children!.map((child, childIndex) => (
              <button
                key={childIndex}
                type="button"
                role="menuitem"
                className={cn(
                  'w-full px-3 py-2 text-left text-sm',
                  'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                  child.disabled && 'opacity-50 cursor-not-allowed'
                )}
                onClick={child.onClick}
                disabled={child.disabled}
              >
                {child.label}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <a
      href={item.href}
      className={baseStyles}
      onClick={(e) => {
        if (item.onClick) {
          e.preventDefault()
          item.onClick()
        }
      }}
      aria-disabled={item.disabled}
      tabIndex={item.disabled ? -1 : undefined}
    >
      {item.label}
    </a>
  )
}

// ============================================
// Tabs
// ============================================

export interface TabItem {
  value: string
  label: string
  icon?: React.ReactNode
  disabled?: boolean
  badge?: string | number
}

export interface TabsProps {
  /** Tab items */
  items: TabItem[]
  /** Active tab value */
  value: string
  /** On change handler */
  onChange: (value: string) => void
  /** Variant */
  variant?: 'default' | 'underline' | 'pills' | 'boxed'
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Full width */
  fullWidth?: boolean
  /** CSS class */
  className?: string
}

/**
 * Tabs - Accessible tab navigation
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      items,
      value,
      onChange,
      variant = 'default',
      orientation = 'horizontal',
      fullWidth = false,
      className,
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'w-full',
          orientation === 'vertical' && 'flex flex-col',
          className
        )}
        role="tablist"
        aria-orientation={orientation}
      >
        <div
          className={cn(
            'flex gap-1',
            orientation === 'vertical' && 'flex-col',
            variant === 'pills' && 'bg-neutral-100 dark:bg-neutral-900 p-1 rounded-lg',
            variant === 'boxed' && 'bg-neutral-100 dark:bg-neutral-900 rounded-lg',
            fullWidth && 'w-full'
          )}
        >
          {items.map((item, index) => (
            <button
              key={index}
              type="button"
              role="tab"
              aria-selected={value === item.value}
              aria-controls={`${item.value}-panel`}
              id={`${item.value}-tab`}
              tabIndex={value === item.value ? 0 : -1}
              disabled={item.disabled}
              onClick={() => !item.disabled && onChange(item.value)}
              className={cn(
                'relative flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
                item.disabled && 'opacity-50 cursor-not-allowed',
                fullWidth && 'flex-1',
                orientation === 'vertical' && 'justify-start',
                variant === 'default' && [
                  value === item.value
                    ? 'text-brand-cyan-600 dark:text-brand-cyan-400'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                ],
                variant === 'underline' && [
                  value === item.value
                    ? 'text-brand-cyan-600 dark:text-brand-cyan-400 border-b-2 border-brand-cyan-600 dark:border-brand-cyan-400'
                    : 'text-neutral-600 dark:text-neutral-400 border-b-2 border-transparent hover:border-neutral-300 dark:hover:border-neutral-700',
                ],
                variant === 'pills' && [
                  value === item.value
                    ? 'bg-white dark:bg-neutral-950 text-brand-cyan-600 dark:text-brand-cyan-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                ],
                variant === 'boxed' && [
                  value === item.value
                    ? 'bg-white dark:bg-neutral-950 text-brand-cyan-600 dark:text-brand-cyan-400 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100',
                ],
              )}
            >
              {item.icon && <span className="h-4 w-4" aria-hidden="true">{item.icon}</span>}
              {item.label}
              {item.badge && (
                <span className={cn(
                  'px-1.5 py-0.5 text-xs font-medium rounded-full',
                  variant === 'default' || variant === 'underline'
                    ? 'bg-brand-cyan-100 text-brand-cyan-800 dark:bg-brand-cyan-900/30 dark:text-brand-cyan-200'
                    : 'bg-neutral-200 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'
                )}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}

          {/* Underline indicator for 'underline' variant */}
          {variant === 'underline' && (
            <div
              className="absolute bottom-0 h-0.5 bg-brand-cyan-600 dark:bg-brand-cyan-400 transition-all duration-200"
              style={{
                width: `${100 / items.length}%`,
                transform: `translateX(${items.findIndex(t => t.value === value) * (100 / items.length)}%)`,
              }}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
    )
  }
)

Tabs.displayName = 'Tabs'

/**
 * TabPanel - Tab content panel
 */
export interface TabPanelProps {
  /** Tab value */
  value: string
  /** Children */
  children: React.ReactNode
  /** CSS class */
  className?: string
}

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className }, ref) => (
    <div
      ref={ref}
      id={`${value}-panel`}
      role="tabpanel"
      aria-labelledby={`${value}-tab`}
      className={cn('mt-4 animate-fade-in', className)}
      hidden={false}
    >
      {children}
    </div>
  )
)

TabPanel.displayName = 'TabPanel'

// ============================================
// Breadcrumbs
// ============================================

export interface BreadcrumbItem {
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
}

export interface BreadcrumbsProps {
  /** Items */
  items: BreadcrumbItem[]
  /** Separator */
  separator?: React.ReactNode
  /** Max visible items before collapsing */
  maxItems?: number
  /** CSS class */
  className?: string
}

/**
 * Breadcrumbs - Navigation breadcrumb trail
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(
  (
    { items, separator = <ChevronRight className="h-4 w-4" />, maxItems = 5, className },
    ref
  ) => {
    type DisplayItem = BreadcrumbItem & { disabled?: boolean }
    const displayItems: DisplayItem[] = items.length > maxItems
      ? [...items.slice(0, 1), { label: '...', disabled: true }, ...items.slice(-maxItems + 2)]
      : items

    return (
      <nav
        ref={ref}
        className={cn('flex items-center gap-1.5 text-sm', className)}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1.5 flex-wrap">
          {displayItems.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {index > 0 && (
                <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">
                  {separator}
                </span>
              )}
              {item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault()
                      item.onClick()
                    }
                  }}
                  className={cn(
                    'flex items-center gap-1.5 px-2 py-1 rounded transition-colors',
                    index === displayItems.length - 1
                      ? 'text-brand-navy-900 dark:text-brand-white font-medium'
                      : 'text-neutral-500 dark:text-neutral-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400',
                    item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
                  )}
                  aria-current={index === displayItems.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'flex items-center gap-1.5 px-2 py-1',
                    index === displayItems.length - 1
                      ? 'text-brand-navy-900 dark:text-brand-white font-medium'
                      : 'text-neutral-500 dark:text-neutral-400'
                  )}
                  aria-current={index === displayItems.length - 1 ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

// ============================================
// Pagination
// ============================================

export interface PaginationProps {
  /** Current page (1-indexed) */
  page: number
  /** Total pages */
  totalPages: number
  /** On page change */
  onPageChange: (page: number) => void
  /** Show first/last buttons */
  showFirstLast?: boolean
  /** Show prev/next buttons */
  showPrevNext?: boolean
  /** Max visible page buttons */
  maxButtons?: number
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** CSS class */
  className?: string
}

const PAGINATION_SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
} as const

/**
 * Pagination - Page navigation component
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onPageChange,
      showFirstLast = true,
      showPrevNext = true,
      maxButtons = 5,
      size = 'md',
      className,
    },
    ref
  ) => {
    if (totalPages <= 1) return null

    const halfMax = Math.floor(maxButtons / 2)
    let startPage = Math.max(1, page - halfMax)
    const endPage = Math.min(totalPages, startPage + maxButtons - 1)

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    const handlePageClick = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
        onPageChange(newPage)
      }
    }

    const pageButton = (pageNum: number, isActive = false, label?: string) => (
      <button
        type="button"
        onClick={() => handlePageClick(pageNum)}
        className={cn(
          'flex items-center justify-center rounded-lg font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
          PAGINATION_SIZES[size],
          isActive
            ? 'bg-brand-cyan-600 text-white dark:bg-brand-cyan-500'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
        )}
        aria-label={label || `Page ${pageNum}`}
        aria-current={isActive ? 'page' : undefined}
      >
        {pageNum}
      </button>
    )

    const navButton = (icon: React.ReactNode, pageNum: number, label: string, disabled: boolean) => (
      <button
        type="button"
        onClick={() => handlePageClick(pageNum)}
        disabled={disabled}
        className={cn(
          'flex items-center justify-center rounded-lg font-medium transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
          PAGINATION_SIZES[size],
          disabled
            ? 'opacity-50 cursor-not-allowed text-neutral-400 dark:text-neutral-500'
            : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
        )}
        aria-label={label}
      >
        {icon}
      </button>
    )

    return (
      <nav
        ref={ref}
        className={cn('flex items-center justify-center gap-1', className)}
        aria-label="Pagination"
      >
        {showFirstLast && (
          <>
            {navButton(
              <ChevronLeft className="h-4 w-4" />,
              1,
              'First page',
              page === 1
            )}
            {navButton(
              <ChevronLeft className="h-4 w-4" />,
              page - 1,
              'Previous page',
              page === 1
            )}
          </>
        )}

        {showPrevNext && !showFirstLast && (
          navButton(<ChevronLeft className="h-4 w-4" />, page - 1, 'Previous page', page === 1)
        )}

        {startPage > 1 && pageButton(1)}
        {startPage > 2 && (
          <span className={cn('flex items-center justify-center', PAGINATION_SIZES[size])}>
            <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">…</span>
          </span>
        )}

        {pages.map((p) => pageButton(p, p === page))}

        {endPage < totalPages - 1 && (
          <span className={cn('flex items-center justify-center', PAGINATION_SIZES[size])}>
            <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">…</span>
          </span>
        )}
        {endPage < totalPages && pageButton(totalPages)}

        {showFirstLast && (
          <>
            {navButton(<ChevronRight className="h-4 w-4" />, page + 1, 'Next page', page === totalPages)}
            {navButton(<ChevronRight className="h-4 w-4" />, totalPages, 'Last page', page === totalPages)}
          </>
        )}

        {showPrevNext && !showFirstLast && (
          navButton(<ChevronRight className="h-4 w-4" />, page + 1, 'Next page', page === totalPages)
        )}
      </nav>
    )
  }
)

Pagination.displayName = 'Pagination'