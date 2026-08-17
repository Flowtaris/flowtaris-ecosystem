// @flowtaris/ui - Header Pattern
// Site header with navigation, actions, and responsive mobile menu

'use client'

import React, { forwardRef, useState, useEffect, useRef } from 'react'
import { cn } from '../utils'
import { Menu, X, Sun, Moon, ChevronDown } from 'lucide-react'
import { ThemeToggle } from '../theme'

// ============================================
// Types
// ============================================

export interface HeaderNavItem {
  label: string
  href?: string
  onClick?: () => void
  children?: HeaderNavItem[]
  disabled?: boolean
}

export interface HeaderAction {
  label?: string
  href?: string
  onClick?: () => void
  icon?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  children?: React.ReactNode
}

export interface HeaderProps {
  /** Logo/brand component */
  logo?: React.ReactNode
  /** Navigation items */
  navItems?: HeaderNavItem[]
  /** Right side actions */
  actions?: HeaderAction[]
  /** Show theme toggle */
  showThemeToggle?: boolean
  /** Variant */
  variant?: 'default' | 'transparent' | 'bordered' | 'glass' | 'solid'
  /** Fixed position */
  fixed?: boolean
  /** Hide on scroll down, show on scroll up */
  hideOnScroll?: boolean
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

// ============================================
// Header Pattern Component
// ============================================

const _Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      logo,
      navItems = [],
      actions = [],
      showThemeToggle = true,
      variant = 'default',
      fixed = true,
      hideOnScroll = false,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [hidden, setHidden] = useState(false)
    const lastScrollY = useRef(0)

    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY
        setScrolled(currentScrollY > 10)

        if (hideOnScroll && !mobileMenuOpen) {
          if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
            setHidden(true)
          } else {
            setHidden(false)
          }
        }
        lastScrollY.current = currentScrollY
      }

      window.addEventListener('scroll', handleScroll, { passive: true })
      return () => window.removeEventListener('scroll', handleScroll)
    }, [hideOnScroll, mobileMenuOpen])

    const HEADER_VARIANTS = {
      default: 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md',
      transparent: 'bg-transparent',
      bordered: 'bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800',
      glass: 'glass',
      solid: 'bg-white dark:bg-neutral-950 shadow-sm',
    } as const

    return (
      <header
        ref={ref}
        className={cn(
          'w-full z-40 transition-all duration-300 ease-out',
          fixed ? 'fixed top-0 left-0' : 'relative',
          HEADER_VARIANTS[variant],
          scrolled && !variant.includes('transparent') && 'shadow-sm',
          hidden && '-translate-y-full',
          className
        )}
        style={style}
        role="banner"
        {...props}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left: Logo + Desktop Navigation */}
          <div className="flex items-center gap-8 lg:gap-12 flex-1 min-w-0">
            {logo && (
              <div className="flex-shrink-0" aria-label="Brand">
                <a href="/" className="flex items-center" aria-label="Go to homepage">
                  {logo}
                </a>
              </div>
            )}

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-1 lg:flex-1 lg:justify-center" aria-label="Main navigation">
              {navItems.map((item, index) => (
                <HeaderNavItemComponent key={index} item={item} />
              ))}
            </nav>
          </div>

          {/* Right: Actions + Theme Toggle + Mobile Menu Button */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Desktop Actions */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              {actions.map((action, index) => (
                <HeaderActionComponent key={index} action={action} />
              ))}
            </div>

            {/* Theme Toggle */}
            {showThemeToggle && (
              <div className="hidden lg:flex">
                <ThemeToggle />
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500"
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
              {navItems.map((item, index) => (
                <HeaderNavItemComponent key={index} item={item} mobile={true} />
              ))}

              {/* Mobile Actions */}
              {(actions.length > 0 || showThemeToggle) && (
                <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
                  {actions.map((action, index) => (
                    <HeaderActionComponent key={index} action={action} mobile={true} />
                  ))}
                  {showThemeToggle && (
                    <div className="flex justify-center pt-2">
                      <ThemeToggle />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Mobile Overlay */}
        {mobileMenuOpen && fixed && (
          <div
            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </header>
    )
  }
)

_Header.displayName = 'Header'

// ============================================
// Sub-components
// ============================================

const HeaderNavItemComponent = ({
  item,
  mobile = false,
}: {
  item: HeaderNavItem
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
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
    item.disabled && 'opacity-50 cursor-not-allowed',
    mobile ? 'w-full py-3 text-base' : ''
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
            className={cn('h-4 w-4 transition-transform', subMenuOpen && 'rotate-180', mobile && 'ml-auto')}
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
              mobile && 'static w-full border-none shadow-none bg-transparent dark:bg-transparent mt-2 pl-4 border-l-2 border-neutral-200 dark:border-neutral-700'
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
                  mobile && 'px-4 py-2.5 text-base',
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

const HeaderActionComponent = ({
  action,
  mobile = false,
}: {
  action: HeaderAction
  mobile?: boolean
}) => {
  const baseStyles = cn(
    'inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
    mobile && 'w-full justify-start px-4 py-3 text-base'
  )

  const variantStyles = {
    primary: cn(
      'bg-brand-cyan-600 text-white hover:bg-brand-cyan-700',
      'focus-visible:ring-brand-cyan-500'
    ),
    secondary: cn(
      'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-200',
      'border border-neutral-300 dark:border-neutral-700',
      'hover:bg-neutral-50 dark:hover:bg-neutral-800',
      'focus-visible:ring-neutral-500'
    ),
    ghost: cn(
      'text-neutral-600 dark:text-neutral-400',
      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
      'hover:text-neutral-900 dark:hover:text-neutral-100',
      'focus-visible:ring-neutral-500'
    ),
  }

  if (action.href) {
    return (
      <a
        href={action.href}
        className={cn(baseStyles, variantStyles[action.variant ?? 'primary'])}
        onClick={action.onClick}
      >
        {action.icon && <span className="h-4 w-4" aria-hidden="true">{action.icon}</span>}
        {action.label ?? action.children}
      </a>
    )
  }

  return (
    <button
      type="button"
      className={cn(baseStyles, variantStyles[action.variant ?? 'primary'])}
      onClick={action.onClick}
    >
      {action.icon && <span className="h-4 w-4" aria-hidden="true">{action.icon}</span>}
      {action.label ?? action.children}
    </button>
  )
}

export const Header = _Header