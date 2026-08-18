// @flowtaris/ui - Overlay Components
// Overlay, dialog, and popover primitives with design token integration

'use client'

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from './utils'
import { X } from 'lucide-react'

// ============================================
// Live Region - Screen reader announcements
// ============================================

/**
 * LiveRegion - Accessible live region for screen reader announcements
 * Use for dynamic content updates that need to be announced
 */
export interface LiveRegionProps {
  /** Announcement message */
  message: string
  /** Politeness level */
  politeness?: 'polite' | 'assertive' | 'off'
  /** ARIA atomic */
  atomic?: boolean
  /** Clear message after announcement (ms) */
  clearAfter?: number
}

let liveRegionId = 0

export const LiveRegion: React.FC<LiveRegionProps> = ({
  message,
  politeness = 'polite',
  atomic = true,
  clearAfter = 1000,
}) => {
  const idRef = useRef(`live-region-${liveRegionId++}`)
  const [announce, setAnnounce] = useState('')

  useEffect(() => {
    if (!message) return

    setAnnounce(message)
    const timer = setTimeout(() => {
      setAnnounce('')
    }, clearAfter)

    return () => clearTimeout(timer)
  }, [message, clearAfter])

  if (!announce) return null

  return (
    <div
      id={idRef.current}
      role="status"
      aria-live={politeness}
      aria-atomic={atomic}
      className="sr-only"
      aria-hidden="false"
    >
      {announce}
    </div>
  )
}

/**
 * Hook for announcing messages to screen readers
 */
export function useAnnouncer() {
  const [message, setMessage] = useState('')
  const politenessRef = useRef<'polite' | 'assertive'>('polite')

  const announce = useCallback((msg: string, polite: 'polite' | 'assertive' = 'polite') => {
    politenessRef.current = polite
    setMessage('')
    // Force re-render by clearing then setting
    setTimeout(() => setMessage(msg), 0)
  }, [])

  return (
    <>
      <LiveRegion message={message} politeness={politenessRef.current} />
      {announce as (msg: string, polite?: 'polite' | 'assertive') => void}
    </>
  )
}

// ============================================
// Focus Trap Hook
// ============================================

/**
 * Focus trap hook for accessible modals/drawers
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !ref.current) return

    const element = ref.current
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    element.addEventListener('keydown', handleKeyDown)
    firstElement?.focus()

    return () => {
      element.removeEventListener('keydown', handleKeyDown)
    }
  }, [ref, enabled])
}

// ============================================
// Portal
// ============================================

/**
 * Portal - Renders children in a different DOM node
 */
export interface PortalProps {
  /** Children to portal */
  children: React.ReactNode
  /** Target container */
  container?: HTMLElement | null
  /** Disable portal */
  disabled?: boolean
}

export function Portal({ children, container, disabled = false }: PortalProps) {
  const [mounted, setMounted] = useState(false)
  const portalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setMounted(true)
    if (!container) {
      portalRef.current = document.createElement('div')
      document.body.appendChild(portalRef.current)
    }
    return () => {
      if (portalRef.current && !container) {
        document.body.removeChild(portalRef.current)
      }
    }
  }, [container])

  if (disabled || !mounted) return null

  const target = container || portalRef.current
  if (!target) return null

  return createPortal(children, target)
}

// ============================================
// Dialog (Enhanced Modal)
// ============================================

export interface DialogProps {
  /** Is open */
  open: boolean
  /** On close */
  onClose: () => void
  /** Title */
  title?: React.ReactNode
  /** Description */
  description?: React.ReactNode
  /** Children */
  children: React.ReactNode
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  /** Close on overlay click */
  closeOnOverlayClick?: boolean
  /** Close on Escape */
  closeOnEscape?: boolean
  /** Show close button */
  showCloseButton?: boolean
  /** CSS class */
  className?: string
  /** Custom close button label */
  closeLabel?: string
}

const DIALOG_SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
} as const

/**
 * Dialog - Accessible modal dialog with focus management
 */
export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      children,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      className,
      closeLabel = 'Close dialog',
    },
    _ref
  ) => {
    const dialogRef = useRef<HTMLDivElement>(null)
    const titleId = useId()
    const descriptionId = useId()
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // Focus trap for accessibility
    useFocusTrap(dialogRef, open)

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement
        document.body.style.overflow = 'hidden'
        setTimeout(() => dialogRef.current?.focus(), 0)
      } else {
        document.body.style.overflow = ''
        previousActiveElement.current?.focus()
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onClose])

    if (!open) return null

    return createPortal(
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descriptionId : undefined}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Dialog */}
        <div
          ref={dialogRef}
          tabIndex={-1}
          className={cn(
            'relative w-full mx-4 bg-white dark:bg-neutral-950 rounded-xl shadow-2xl',
            'animate-scale-in',
            DIALOG_SIZES[size],
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
              <div>
                {title && (
                  <h2 id={titleId} className="text-lg font-semibold text-brand-navy-900 dark:text-brand-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descriptionId} className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500"
                  aria-label={closeLabel}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          <div className="p-6">{children}</div>
        </div>
      </div>,
      document.body
    )
  }
)

Dialog.displayName = 'Dialog'

// ============================================
// Drawer
// ============================================

export interface DrawerProps {
  /** Is open */
  open: boolean
  /** On close */
  onClose: () => void
  /** Side */
  side?: 'left' | 'right' | 'top' | 'bottom'
  /** Title */
  title?: React.ReactNode
  /** Description */
  description?: React.ReactNode
  /** Children */
  children: React.ReactNode
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'full'
  /** Close on overlay click */
  closeOnOverlayClick?: boolean
  /** Close on Escape */
  closeOnEscape?: boolean
  /** Show close button */
  showCloseButton?: boolean
  /** CSS class */
  className?: string
  /** Custom close button label */
  closeLabel?: string
}

const DRAWER_SIZES = {
  left: { sm: 'w-64', md: 'w-80', lg: 'w-96', full: 'w-full' },
  right: { sm: 'w-64', md: 'w-80', lg: 'w-96', full: 'w-full' },
  top: { sm: 'h-64', md: 'h-80', lg: 'h-96', full: 'h-full' },
  bottom: { sm: 'h-64', md: 'h-80', lg: 'h-96', full: 'h-full' },
}

const DRAWER_ANIMATIONS = {
  left: 'animate-slide-in-from-left',
  right: 'animate-slide-in-from-right',
  top: 'animate-slide-in-from-top',
  bottom: 'animate-slide-in-from-bottom',
}

/**
 * Drawer - Slide-over panel from screen edge
 */
export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onClose,
      side = 'right',
      title,
      description,
      children,
      size = 'md',
      closeOnOverlayClick = true,
      closeOnEscape = true,
      showCloseButton = true,
      className,
      closeLabel = 'Close drawer',
    },
    _ref
  ) => {
    const drawerRef = useRef<HTMLDivElement>(null)
    const titleId = useId()
    const descriptionId = useId()
    const previousActiveElement = useRef<HTMLElement | null>(null)

    // Focus trap for accessibility
    useFocusTrap(drawerRef, open)

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement
        document.body.style.overflow = 'hidden'
        setTimeout(() => drawerRef.current?.focus(), 0)
      } else {
        document.body.style.overflow = ''
        previousActiveElement.current?.focus()
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onClose])

    if (!open) return null

    const isVertical = side === 'left' || side === 'right'
    const drawerWidth = DRAWER_SIZES[side as keyof typeof DRAWER_SIZES][size]
    const animationClass = DRAWER_ANIMATIONS[side as keyof typeof DRAWER_ANIMATIONS]

    return createPortal(
      <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} aria-describedby={description ? descriptionId : undefined}>
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm animate-fade-in"
          onClick={closeOnOverlayClick ? onClose : undefined}
          aria-hidden="true"
        />

        {/* Drawer */}
        <div
          ref={drawerRef}
          tabIndex={-1}
          className={cn(
            'fixed flex flex-col bg-white dark:bg-neutral-950 shadow-2xl',
            isVertical ? 'h-full' : 'w-full',
            drawerWidth,
            animationClass,
            side === 'left' && 'top-0 left-0',
            side === 'right' && 'top-0 right-0',
            side === 'top' && 'top-0 left-0 right-0',
            side === 'bottom' && 'bottom-0 left-0 right-0',
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {(title || showCloseButton) && (
            <div className="flex items-start justify-between p-4 border-b border-neutral-200 dark:border-neutral-800 flex-shrink-0">
              <div>
                {title && (
                  <h2 id={titleId} className="text-lg font-semibold text-brand-navy-900 dark:text-brand-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p id={descriptionId} className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500"
                  aria-label={closeLabel}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              )}
            </div>
          )}

          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      </div>,
      document.body
    )
  }
)

Drawer.displayName = 'Drawer'

// ============================================
// Popover
// ============================================

export interface PopoverProps {
  /** Trigger element */
  children: React.ReactElement
  /** Content */
  content: React.ReactNode
  /** Position */
  position?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  /** Open state (controlled) */
  open?: boolean
  /** Default open state (uncontrolled) */
  defaultOpen?: boolean
  /** On open change */
  onOpenChange?: (open: boolean) => void
  /** Close on outside click */
  closeOnOutsideClick?: boolean
  /** Close on Escape */
  closeOnEscape?: boolean
  /** Offset from trigger */
  _offset?: number
  /** Show arrow */
  showArrow?: boolean
  /** CSS class for content */
  contentClassName?: string
  /** CSS class for trigger wrapper */
  wrapperClassName?: string
}

const POPOVER_POSITIONS = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  'top-start': 'bottom-full left-0 mb-2',
  'top-end': 'bottom-full right-0 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  'bottom-start': 'top-full left-0 mt-2',
  'bottom-end': 'top-full right-0 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  'left-start': 'right-full top-0 mr-2',
  'left-end': 'right-full bottom-0 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  'right-start': 'left-full top-0 ml-2',
  'right-end': 'left-full bottom-0 ml-2',
} as const

const ARROW_POSITIONS = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-current',
  'top-start': 'bottom-[-4px] left-4 border-t-current',
  'top-end': 'bottom-[-4px] right-4 border-t-current',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-current',
  'bottom-start': 'top-[-4px] left-4 border-b-current',
  'bottom-end': 'top-[-4px] right-4 border-b-current',
  left: 'right-[-4px] top-1/2 -translate-y-1/2 border-r-current',
  'left-start': 'right-[-4px] top-4 border-r-current',
  'left-end': 'right-[-4px] bottom-4 border-r-current',
  right: 'left-[-4px] top-1/2 -translate-y-1/2 border-l-current',
  'right-start': 'left-[-4px] top-4 border-l-current',
  'right-end': 'left-[-4px] bottom-4 border-l-current',
} as const

/**
 * Popover - Floating panel anchored to a trigger element
 */
export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      content,
      position = 'bottom',
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      closeOnOutsideClick = true,
      closeOnEscape = true,
      _offset = 8,
      showArrow = true,
      contentClassName,
      wrapperClassName,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen)
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const popoverId = useId()

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen
    const setOpen = useCallback((value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value)
      onOpenChange?.(value)
    }, [isControlled, onOpenChange])

    const triggerProps = {
      onClick: () => setOpen(!open),
      onKeyDown: (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setOpen(!open)
        } else if (e.key === 'Escape') {
          setOpen(false)
        }
      },
      'aria-expanded': open,
      'aria-haspopup': 'dialog',
      'aria-controls': open ? popoverId : undefined,
      ref: setTriggerRef,
    }

    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') setOpen(false)
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, setOpen])

    useEffect(() => {
      if (!open || !closeOnOutsideClick) return

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          triggerRef &&
          !triggerRef.contains(e.target as Node)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, closeOnOutsideClick, setOpen, triggerRef])

    const clonedChild = React.cloneElement(children, triggerProps as Record<string, unknown>)

    return (
      <div ref={ref} className={cn('inline-block relative', wrapperClassName)}>
        {clonedChild}
        {open && createPortal(
          <div
            ref={contentRef}
            id={popoverId}
            role="dialog"
            className={cn(
              'absolute z-50 min-w-[200px] max-w-md',
              'bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800',
              'shadow-lg p-3 animate-fade-in',
              POPOVER_POSITIONS[position as keyof typeof POPOVER_POSITIONS],
              contentClassName
            )}
            style={{ transformOrigin: position.startsWith('top') || position.startsWith('bottom') ? 'center top' : 'center left' }}
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  'absolute w-0 h-0 border-4 border-transparent',
                  ARROW_POSITIONS[position as keyof typeof ARROW_POSITIONS]
                )}
                aria-hidden="true"
              />
            )}
          </div>,
          document.body
        )}
      </div>
    )
  }
)

Popover.displayName = 'Popover'

// ============================================
// Dropdown Menu
// ============================================

export interface DropdownMenuItem {
  label: string
  onClick?: () => void
  href?: string
  icon?: React.ReactNode
  disabled?: boolean
  divider?: boolean
  shortcut?: string
  danger?: boolean
}

export interface DropdownMenuProps {
  /** Trigger element */
  trigger: React.ReactElement
  /** Menu items */
  items: DropdownMenuItem[]
  /** Position */
  position?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  /** Open state (controlled) */
  open?: boolean
  /** On open change */
  onOpenChange?: (open: boolean) => void
  /** CSS class for menu */
  className?: string
  /** CSS class for trigger wrapper */
  wrapperClassName?: string
  /** Close on item click */
  closeOnSelect?: boolean
}

/**
 * DropdownMenu - Accessible dropdown menu component
 */
export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      trigger,
      items,
      position = 'bottom-start',
      open: controlledOpen,
      onOpenChange,
      className,
      wrapperClassName,
      closeOnSelect = true,
    },
    ref
  ) => {
    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const [triggerRef, setTriggerRef] = useState<HTMLElement | null>(null)
    const menuRef = useRef<HTMLDivElement>(null)
    const menuId = useId()

    const isControlled = controlledOpen !== undefined
    const open = isControlled ? controlledOpen : uncontrolledOpen
    const setOpen = useCallback((value: boolean) => {
      if (!isControlled) setUncontrolledOpen(value)
      onOpenChange?.(value)
    }, [isControlled, onOpenChange])

    const handleTriggerClick = () => setOpen(!open)
    const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
      } else if (e.key === 'Escape') {
        setOpen(false)
      }
    }

    const triggerProps = {
      onClick: handleTriggerClick,
      onKeyDown: handleTriggerKeyDown,
      'aria-expanded': open,
      'aria-haspopup': 'menu',
      'aria-controls': open ? menuId : undefined,
      ref: setTriggerRef,
    }

    useEffect(() => {
      if (!open) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false)
          triggerRef?.focus()
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, setOpen, triggerRef])

    useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        if (
          menuRef.current &&
          !menuRef.current.contains(e.target as Node) &&
          triggerRef &&
          !triggerRef.contains(e.target as Node)
        ) {
          setOpen(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, setOpen, triggerRef])

    const clonedTrigger = React.cloneElement(trigger, triggerProps as Record<string, unknown>)

    return (
      <div ref={ref} className={cn('inline-block relative', wrapperClassName)}>
        {clonedTrigger}
        {open && createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="menu"
            className={cn(
              'absolute z-50 min-w-[180px] max-w-[280px]',
              'bg-white dark:bg-neutral-950 rounded-lg border border-neutral-200 dark:border-neutral-800',
              'shadow-lg py-1 animate-fade-in',
              position === 'bottom-start' && 'top-full left-0 mt-1',
              position === 'bottom-end' && 'top-full right-0 mt-1',
              position === 'top-start' && 'bottom-full left-0 mb-1',
              position === 'top-end' && 'bottom-full right-0 mb-1',
              position === 'left-start' && 'right-full top-0 mr-1',
              position === 'left-end' && 'right-full bottom-0 mr-1',
              position === 'right-start' && 'left-full top-0 ml-1',
              position === 'right-end' && 'left-full bottom-0 ml-1',
              className
            )}
            style={{ transformOrigin: position.startsWith('top') || position.startsWith('bottom') ? 'center top' : 'center left' }}
          >
            {items.map((item, index) => {
              if (item.divider) {
                return (
                  <div
                    key={index}
                    className="h-px bg-neutral-200 dark:bg-neutral-800 my-1"
                    role="separator"
                  />
                )
              }

              const handleClick = () => {
                item.onClick?.()
                if (closeOnSelect) setOpen(false)
              }

              if (item.href) {
                return (
                  <a
                    key={index}
                    href={item.href}
                    role="menuitem"
                    tabIndex={-1}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 px-3 py-2 text-sm',
                      'text-neutral-700 dark:text-neutral-300',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                      'focus:bg-neutral-100 dark:focus:bg-neutral-800',
                      'focus-visible:outline-none',
                      item.disabled && 'opacity-50 cursor-not-allowed',
                      item.danger && 'text-brand-red-600 dark:text-brand-red-400',
                      item.danger && 'hover:bg-brand-red-50 dark:hover:bg-brand-red-900/20'
                    )}
                    onClick={handleClick}
                    aria-disabled={item.disabled}
                  >
                    <span className="flex items-center gap-2 flex-1">
                      {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                      {item.label}
                    </span>
                    {item.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
                        {item.shortcut}
                      </kbd>
                    )}
                  </a>
                )
              }

              return (
                <button
                  key={index}
                  type="button"
                  role="menuitem"
                  tabIndex={-1}
                  disabled={item.disabled}
                  onClick={handleClick}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 px-3 py-2 text-sm',
                    'text-neutral-700 dark:text-neutral-300',
                    'hover:bg-neutral-100 dark:hover:bg-neutral-800',
                    'focus:bg-neutral-100 dark:focus:bg-neutral-800',
                    'focus-visible:outline-none',
                    item.disabled && 'opacity-50 cursor-not-allowed',
                    item.danger && 'text-brand-red-600 dark:text-brand-red-400',
                    item.danger && 'hover:bg-brand-red-50 dark:hover:bg-brand-red-900/20'
                  )}
                >
                  <span className="flex items-center gap-2 flex-1">
                    {item.icon && <span className="h-4 w-4">{item.icon}</span>}
                    {item.label}
                  </span>
                  {item.shortcut && (
                    <kbd className="px-1.5 py-0.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded">
                      {item.shortcut}
                    </kbd>
                  )}
                </button>
              )
            })}
          </div>,
          document.body
        )}
      </div>
    )
  }
)

DropdownMenu.displayName = 'DropdownMenu'