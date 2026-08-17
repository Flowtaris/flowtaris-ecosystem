// @flowtaris/ui - StickySidebar Pattern
// Sticky positioning with scroll spy, active section highlighting, and responsive behavior

'use client'

import React, { forwardRef, useEffect, useRef, useState, useMemo } from 'react'
import { cn } from '../utils'
import { ChevronUp, ChevronDown, ChevronRight } from 'lucide-react'

// ============================================
// Types
// ============================================

export interface StickySidebarItem {
  id: string
  label: string
  href?: string
  onClick?: () => void
  disabled?: boolean
  children?: StickySidebarItem[]
  level?: number
}

export interface StickySidebarProps {
  /** Sidebar items with hierarchy */
  items: StickySidebarItem[]
  /** Active item ID */
  activeId?: string
  /** On item click */
  onItemClick?: (id: string) => void
  /** Sticky offset from top */
  offsetTop?: number
  /** Sticky offset from bottom */
  offsetBottom?: number
  /** Show scroll progress indicator */
  showProgress?: boolean
  /** Collapse on mobile */
  collapseOnMobile?: boolean
  /** Mobile breakpoint */
  mobileBreakpoint?: number
  /** Container className */
  containerClassName?: string
  /** List className */
  listClassName?: string
  /** Item className */
  itemClassName?: string
  /** Active item className */
  activeClassName?: string
  /** Show expand/collapse for nested items */
  collapsible?: boolean
  /** Default expanded items */
  defaultExpanded?: string[]
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

export interface StickySidebarInnerProps {
  items: StickySidebarItem[]
  activeId?: string
  onItemClick?: (id: string) => void
  level?: number
  collapsible?: boolean
  expandedIds?: Set<string>
  onToggleExpand?: (id: string) => void
  itemClassName?: string
  activeClassName?: string
}

// ============================================
// StickySidebarInner - Recursive Item Renderer
// ============================================

const StickySidebarInner: React.FC<StickySidebarInnerProps> = ({
  items,
  activeId,
  onItemClick,
  level = 0,
  collapsible = true,
  expandedIds = new Set(),
  onToggleExpand,
  itemClassName,
  activeClassName,
}) => {
  const isNested = level > 0

  return (
    <ul
      className={cn(
        'space-y-1',
        isNested && 'pl-4 border-l border-neutral-200 dark:border-neutral-800 ml-2',
        isNested && 'mt-1'
      )}
      role="list"
    >
      {items.map((item, index) => {
        const isActive = activeId === item.id
        const hasChildren = item.children && item.children.length > 0
        const isExpanded = expandedIds.has(item.id)

        return (
          <li key={item.id ?? index} className="group">
            <div className={cn('flex items-center gap-2', isNested ? 'pt-1' : '')}>
              {hasChildren && collapsible && (
                <button
                  type="button"
                  onClick={() => onToggleExpand?.(item.id)}
                  className={cn(
                    'flex items-center justify-center w-6 h-6 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200',
                    'transition-transform duration-200',
                    isExpanded && 'rotate-90'
                  )}
                  aria-expanded={isExpanded}
                  aria-controls={`${item.id}-children`}
                  aria-label={isExpanded ? `Collapse ${item.label}` : `Expand ${item.label}`}
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              )}

              {!hasChildren && <span className={cn('w-6', isNested ? 'ml-0' : '')} aria-hidden="true" />}

              {item.href || item.onClick ? (
                <a
                  href={item.href}
                  onClick={(e) => {
                    if (item.onClick) {
                      e.preventDefault()
                      item.onClick()
                    }
                    onItemClick?.(item.id)
                  }}
                  className={cn(
                    'flex-1 px-2 py-1.5 text-sm font-medium rounded transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
                    isActive
                      ? 'text-brand-cyan-600 dark:text-brand-cyan-400 bg-brand-cyan-50 dark:bg-brand-cyan-900/20'
                      : 'text-neutral-600 dark:text-neutral-400 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400 hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    item.disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
                    itemClassName,
                    activeClassName,
                    level > 0 && 'text-xs'
                  )}
                  aria-current={isActive ? 'location' : undefined}
                  aria-disabled={item.disabled}
                  tabIndex={item.disabled ? -1 : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    'flex-1 px-2 py-1.5 text-sm font-medium',
                    'text-neutral-500 dark:text-neutral-500',
                    itemClassName,
                    level > 0 && 'text-xs'
                  )}
                >
                  {item.label}
                </span>
              )}
            </div>

            {hasChildren && isExpanded && (
              <div
                id={`${item.id}-children`}
                role="group"
                aria-labelledby={`${item.id}-label`}
              >
                <StickySidebarInner
                  items={item.children!}
                  activeId={activeId}
                  onItemClick={onItemClick}
                  level={level + 1}
                  collapsible={collapsible}
                  expandedIds={expandedIds}
                  onToggleExpand={onToggleExpand}
                  itemClassName={itemClassName}
                  activeClassName={activeClassName}
                />
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}

// ============================================
// StickySidebar Component
// ============================================

const _StickySidebar = forwardRef<HTMLDivElement, StickySidebarProps>(
  (
    {
      items,
      activeId,
      onItemClick,
      offsetTop = 100,
      offsetBottom = 100,
      showProgress = false,
      collapseOnMobile = true,
      mobileBreakpoint = 1024,
      containerClassName,
      listClassName,
      itemClassName,
      activeClassName,
      collapsible = true,
      defaultExpanded = [],
      className,
      style,
      ...props
    },
    ref
  ) => {
    const sidebarRef = useRef<HTMLDivElement>(null)
    const [isStuck, setIsStuck] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [expandedIds, setExpandedIds] = useState<Set<string>>(
      new Set(defaultExpanded)
    )

    // Track mobile viewport
    useEffect(() => {
      const checkMobile = () => {
        const mobile = window.innerWidth < mobileBreakpoint
        setIsMobile(mobile)
        if (mobile && collapseOnMobile) {
          setIsCollapsed(true)
        }
      }

      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
    }, [mobileBreakpoint, collapseOnMobile])

    // Handle sticky positioning with IntersectionObserver
    useEffect(() => {
      if (isMobile || !sidebarRef.current) return

      const sentinelTop = document.createElement('div')
      sentinelTop.style.height = '1px'
      sentinelTop.style.position = 'absolute'
      sentinelTop.style.top = `${-offsetTop}px`
      sentinelTop.style.width = '100%'

      const sentinelBottom = document.createElement('div')
      sentinelBottom.style.height = '1px'
      sentinelBottom.style.position = 'absolute'
      sentinelBottom.style.bottom = `${-offsetBottom}px`
      sentinelBottom.style.width = '100%'

      const sidebar = sidebarRef.current
      sidebar.parentElement?.insertBefore(sentinelTop, sidebar)
      sidebar.parentElement?.appendChild(sentinelBottom)

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsStuck(!entry.isIntersecting)
        },
        { rootMargin: `${offsetTop}px 0px ${offsetBottom}px 0px`, threshold: 0 }
      )

      observer.observe(sentinelTop)

      return () => {
        observer.disconnect()
        sentinelTop.remove()
        sentinelBottom.remove()
      }
    }, [isMobile, offsetTop, offsetBottom])

    // Scroll spy - detect active section
    useEffect(() => {
      if (isMobile) return

      const sections = items
        .flatMap((item) => (item.href ? [item] : []))
        .concat(
          items.flatMap((item) => item.children?.flatMap((c) => (c.href ? [c] : [])) || [])
        )
        .filter((item): item is StickySidebarItem & { href: string } => Boolean(item.href))

      const elements = sections
        .map((item) => document.querySelector(item.href!))
        .filter((el): el is Element => el !== null)

      if (elements.length === 0) return

      const observer = new IntersectionObserver(
        (entries) => {
          const visibleEntries = entries
            .filter((entry) => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

          if (visibleEntries.length > 0) {
            const targetId = visibleEntries[0].target.id
            const matchingItem = sections.find(
              (item) => item.href === `#${targetId}`
            )
            if (matchingItem) {
              onItemClick?.(matchingItem.id)
            }
          }
        },
        {
          rootMargin: `-${offsetTop}px 0px -${window.innerHeight - offsetTop - offsetBottom}px 0px`,
          threshold: [0, 0.25, 0.5, 0.75, 1],
        }
      )

      elements.forEach((el) => observer.observe(el))

      return () => observer.disconnect()
    }, [items, offsetTop, offsetBottom, onItemClick, isMobile])

    // Calculate scroll progress
    const scrollProgress = useMemo(() => {
      if (isMobile || !sidebarRef.current) return 0

      const sidebar = sidebarRef.current
      const parent = sidebar.parentElement
      if (!parent) return 0

      const sidebarTop = sidebar.offsetTop
      const sidebarHeight = sidebar.offsetHeight
      const parentHeight = parent.offsetHeight
      const scrollY = window.scrollY

      const start = sidebarTop - offsetTop
      const end = start + parentHeight - sidebarHeight

      if (scrollY <= start) return 0
      if (scrollY >= end) return 1

      return (scrollY - start) / (end - start)
    }, [isMobile, offsetTop, offsetBottom])

    const handleToggleExpand = (id: string) => {
      setExpandedIds((prev) => {
        const next = new Set(prev)
        if (next.has(id)) {
          next.delete(id)
        } else {
          next.add(id)
        }
        return next
      })
    }

    const handleToggleCollapse = () => {
      setIsCollapsed(!isCollapsed)
    }

    if (isMobile && collapseOnMobile && isCollapsed) {
      return (
        <div
          ref={ref}
          className={cn(
            'fixed bottom-4 right-4 z-50',
            className
          )}
          style={style}
          {...props}
        >
          <button
            type="button"
            onClick={handleToggleCollapse}
            className={cn(
              'p-3 rounded-xl shadow-lg',
              'bg-white dark:bg-neutral-950',
              'border border-neutral-200 dark:border-neutral-800',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500'
            )}
            aria-label="Open sidebar"
            aria-expanded="false"
          >
            <ChevronUp className="h-6 w-6 text-brand-cyan-600 dark:text-brand-cyan-400" />
          </button>
        </div>
      )
    }

    return (
      <div
        ref={(el) => {
          sidebarRef.current = el
          if (typeof ref === 'function') ref(el)
          else if (ref) ref.current = el
        }}
        className={cn(
          'relative',
          isStuck && !isMobile && 'sticky',
          isStuck && !isMobile && `top-[${offsetTop}px]`,
          isMobile && collapseOnMobile && !isCollapsed && 'fixed inset-y-0 right-0 z-50 w-80 max-w-full',
          isMobile && collapseOnMobile && !isCollapsed && 'bg-white dark:bg-neutral-950 shadow-2xl border-l border-neutral-200 dark:border-neutral-800',
          'transition-all duration-300',
          className
        )}
        style={{
          ...style,
          ...(isStuck && !isMobile && { maxHeight: `calc(100vh - ${offsetTop + offsetBottom}px)`, overflow: 'auto' }),
        }}
        {...props}
      >
        {/* Progress Indicator */}
        {showProgress && !isMobile && (
          <div
            className="absolute left-0 top-0 h-full w-1 -ml-1"
            aria-hidden="true"
            role="progressbar"
            aria-valuenow={Math.round(scrollProgress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-brand-cyan-600 dark:bg-brand-cyan-400 transition-all duration-300 ease-out"
              style={{
                transformOrigin: 'bottom',
                transform: `scaleY(${scrollProgress})`,
              }}
            />
          </div>
        )}

        {/* Mobile Close Button */}
        {isMobile && collapseOnMobile && !isCollapsed && (
          <button
            type="button"
            onClick={handleToggleCollapse}
            className="absolute -top-12 right-0 p-2 rounded-lg bg-white dark:bg-neutral-950 shadow-lg border border-neutral-200 dark:border-neutral-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <ChevronDown className="h-5 w-5 text-brand-cyan-600 dark:text-brand-cyan-400" />
          </button>
        )}

        {/* Sidebar Content */}
        <nav
          className={cn(
            'p-4',
            isMobile && collapseOnMobile && !isCollapsed && 'h-full overflow-y-auto',
            containerClassName
          )}
          role="navigation"
          aria-label="Table of contents"
        >
          <StickySidebarInner
            items={items}
            activeId={activeId}
            onItemClick={onItemClick}
            collapsible={collapsible}
            expandedIds={expandedIds}
            onToggleExpand={handleToggleExpand}
            itemClassName={itemClassName}
            activeClassName={activeClassName}
          />
        </nav>

        {/* Mobile Overlay */}
        {isMobile && collapseOnMobile && !isCollapsed && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={handleToggleCollapse}
            aria-hidden="true"
          />
        )}
      </div>
    )
  }
)

_StickySidebar.displayName = 'StickySidebar'

export const StickySidebar = _StickySidebar