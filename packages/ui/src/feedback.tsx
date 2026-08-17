// @flowtaris/ui - Feedback Components
// Notification and feedback primitives with design token integration

'use client'

import React, { forwardRef, useEffect, useRef, useState, useId, createContext, useContext, useCallback } from 'react'
import {cn} from './utils'

// ============================================
// Alert
// ============================================

export interface AlertProps {
  /** Alert variant */
  variant?: 'info' | 'success' | 'warning' | 'error' | 'neutral'
  /** Title */
  title?: React.ReactNode
  /** Description */
  description?: React.ReactNode
  /** Dismissible */
  dismissible?: boolean
  /** On dismiss */
  onDismiss?: () => void
  /** Icon */
  icon?: React.ReactNode
  /** CSS class */
  className?: string
  /** Role */
  role?: 'alert' | 'status'
}

const ALERT_STYLES = {
  info: 'bg-brand-cyan-500/10 border-brand-cyan-500/30 text-brand-cyan-900 dark:text-brand-cyan-100',
  success: 'bg-brand-green-500/10 border-brand-green-500/30 text-brand-green-900 dark:text-brand-green-100',
  warning: 'bg-brand-amber-500/10 border-brand-amber-500/30 text-brand-amber-900 dark:text-brand-amber-100',
  error: 'bg-brand-red-500/10 border-brand-red-500/30 text-brand-red-900 dark:text-brand-red-100',
  neutral: 'bg-neutral-100 dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100',
} as const

const ICONS = {
  info: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
  success: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  neutral: (
    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
}

/**
 * Alert - Contextual feedback message
 */
const _Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      description,
      dismissible = false,
      onDismiss,
      icon: customIcon,
      className,
      role = 'alert',
      ...props
    },
    ref
  ) => {
    const defaultIcon = ICONS[variant]

    return (
      <div
        ref={ref}
        role={role}
        className={cn(
          'flex gap-3 p-4 rounded-lg border',
          ALERT_STYLES[variant],
          className
        )}
        {...props}
      >
        {customIcon ?? defaultIcon}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="text-sm font-semibold">{title}</h4>
          )}
          {description && (
            <p className={cn('mt-1 text-sm', title && 'text-current/80')}>
              {description}
            </p>
          )}
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              'flex-shrink-0 p-1 rounded transition-colors',
              'hover:bg-current/10',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current'
            )}
            aria-label="Dismiss"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

_Alert.displayName = 'Alert'

// ============================================
// Progress
// ============================================

export interface ProgressProps {
  /** Progress value (0-100) */
  value: number
  /** Maximum value */
  max?: number
  /** Label */
  label?: React.ReactNode
  /** Show value label */
  showValue?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Variant */
  variant?: 'default' | 'success' | 'warning' | 'error'
  /** Indeterminate */
  indeterminate?: boolean
  /** CSS class */
  className?: string
}

const SIZE_STYLES = {
  sm: 'h-1.5',
  md: 'h-2.5',
  lg: 'h-4',
} as const

const VARIANT_STYLES = {
  default: 'bg-brand-cyan-500',
  success: 'bg-brand-green-500',
  warning: 'bg-brand-amber-500',
  error: 'bg-brand-red-500',
} as const

/**
 * Progress - Progress indicator bar
 */
const _Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      label,
      showValue = false,
      size = 'md',
      variant = 'default',
      indeterminate = false,
      className,
      ...props
    },
    ref
  ) => {
    const percentage = indeterminate ? undefined : Math.min(100, Math.max(0, (value / max) * 100))

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {(label || showValue) && (
          <div className="flex justify-between text-sm mb-1.5">
            {label && <span className="font-medium text-brand-navy-900 dark:text-brand-white">{label}</span>}
            {showValue && !indeterminate && (
              <span className="text-neutral-500 dark:text-neutral-400 tabular-nums">
                {Math.round(percentage || 0)}%
              </span>
            )}
            {showValue && indeterminate && (
              <span className="text-neutral-500 dark:text-neutral-400">Loading...</span>
            )}
          </div>
        )}
        <div
          className={cn(
            'w-full bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden',
            SIZE_STYLES[size]
          )}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : Math.round(percentage || 0)}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={typeof label === 'string' ? label : undefined}
        >
          {indeterminate ? (
            <div
              className={cn(
                'h-full bg-gradient-to-r from-transparent via-current to-transparent animate-[shimmer_2s_infinite]',
                VARIANT_STYLES[variant]
              )}
              style={{ width: '100%' }}
            />
          ) : (
            <div
              className={cn(
                'h-full transition-all duration-300 ease-out',
                VARIANT_STYLES[variant],
                'rounded-full'
              )}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </div>
    )
  }
)

_Progress.displayName = 'Progress'

// ============================================
// Spinner
// ============================================

export interface SpinnerProps {
  /** Size */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Color variant */
  variant?: 'default' | 'brand' | 'inverse'
  /** Label for screen readers */
  label?: string
  /** CSS class */
  className?: string
}

const SPINNER_SIZES = {
  sm: 'w-4 h-4 border-[2px]',
  md: 'w-6 h-6 border-[2px]',
  lg: 'w-8 h-8 border-[3px]',
  xl: 'w-12 h-12 border-[4px]',
} as const

const SPINNER_VARIANTS = {
  default: 'border-neutral-300 dark:border-neutral-700 border-t-brand-cyan-500',
  brand: 'border-brand-cyan-100 dark:border-brand-cyan-900 border-t-brand-cyan-500',
  inverse: 'border-white/30 border-t-white',
} as const

/**
 * Spinner - Loading indicator
 */
const _Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  variant = 'default',
  label = 'Loading',
  className,
}) => {
  return (
    <svg
      className={cn(SPINNER_SIZES[size], SPINNER_VARIANTS[variant], 'rounded-full animate-spin', className)}
      viewBox="0 0 100 100"
      role="status"
      aria-label={label}
      aria-busy="true"
    >
      <circle cx="50" cy="50" r="45" fill="none" strokeWidth="4" />
    </svg>
  )
}

// ============================================
// Skeleton
// ============================================

export interface SkeletonProps {
  /** Variant */
  variant?: 'text' | 'circular' | 'rectangular'
  /** Width */
  width?: string | number
  /** Height */
  height?: string | number
  /** Animation */
  animation?: 'pulse' | 'wave' | 'none'
  /** CSS class */
  className?: string
}

const VARIANT_STYLES_SKELETON = {
  text: 'h-4 rounded',
  circular: 'rounded-full',
  rectangular: 'rounded-lg',
} as const

const ANIMATION_STYLES = {
  pulse: 'animate-pulse',
  wave: 'animate-[shimmer_2s_infinite] bg-gradient-to-r from-neutral-200 via-neutral-300 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800 bg-[length:200%_100%]',
  none: '',
} as const

/**
 * Skeleton - Loading placeholder
 */
const _Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width = '100%',
  height,
  animation = 'pulse',
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-neutral-200 dark:bg-neutral-800',
        VARIANT_STYLES_SKELETON[variant],
        ANIMATION_STYLES[animation],
        className
      )}
      style={{ width, height }}
      aria-hidden="true"
    />
  )
}

// ============================================
// Toast Context & Provider
// ============================================

export interface Toast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  duration?: number
  action?: React.ReactNode
  dismissible?: boolean
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => string
  removeToast: (id: string) => void
  clearToasts: () => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export const useToasts = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToasts must be used within a ToastProvider')
  }
  return context
}

export interface ToastProviderProps {
  children: React.ReactNode
  /** Default duration */
  defaultDuration?: number
  /** Max toasts */
  maxToasts?: number
  /** Position */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center'
  /** CSS class */
  className?: string
}

const POSITION_STYLES = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
} as const

/**
 * ToastProvider - Toast notification container
 */
function ToastProvider({
  children,
  defaultDuration = 5000,
  maxToasts = 5,
  position = 'top-right',
  className,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = { ...toast, id }

    setToasts((prev) => {
      const updated = [...prev, newToast]
      if (updated.length > maxToasts) {
        return updated.slice(-maxToasts)
      }
      return updated
    })

    if (toast.duration !== 0) {
      setTimeout(() => removeToast(id), toast.duration || defaultDuration)
    }

    return id
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const clearToasts = () => {
    setToasts([])
  }

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <div
        className={cn('fixed z-50 flex flex-col gap-2 pointer-events-none', POSITION_STYLES[position], className)}
        aria-live="polite"
        aria-label="Notifications"
      >
        {toasts.map((toast) => (
          <_Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// ============================================
// Toast Component
// ============================================

interface ToastProps extends Toast {
  onDismiss: () => void
}

const TOAST_VARIANTS = {
  default: 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-700',
  success: 'bg-white dark:bg-neutral-900 border-brand-green-500/30',
  warning: 'bg-white dark:bg-neutral-900 border-brand-amber-500/30',
  error: 'bg-white dark:bg-neutral-900 border-brand-red-500/30',
  info: 'bg-white dark:bg-neutral-900 border-brand-cyan-500/30',
} as const

const TOAST_ICONS = {
  default: null,
  success: (
    <svg className="w-5 h-5 text-brand-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5 text-brand-amber-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5 text-brand-red-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5 text-brand-cyan-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  ),
} as const

const _Toast = forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, variant = 'default', action, dismissible = true, onDismiss, ...props }, ref) => {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
      const currentTimeout = timeoutRef.current
      return () => {
        if (currentTimeout) clearTimeout(currentTimeout)
      }
    }, [])

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start gap-3 p-4 rounded-lg border shadow-lg min-w-[300px] max-w-md',
          'pointer-events-auto animate-slide-in-from-right',
          TOAST_VARIANTS[variant]
        )}
        role="alert"
        {...props}
      >
        {TOAST_ICONS[variant]}
        <div className="flex-1 min-w-0">
          {title && <p className="text-sm font-semibold text-brand-navy-900 dark:text-brand-white">{title}</p>}
          {description && <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{description}</p>}
          {action && <div className="mt-3">{action}</div>}
        </div>
        {dismissible && (
          <button
            onClick={onDismiss}
            className="flex-shrink-0 p-1 rounded text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500"
            aria-label="Dismiss notification"
          >
            <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
            </svg>
          </button>
        )}
      </div>
    )
  }
)

_Toast.displayName = 'Toast'

// ============================================
// useToast hook
// ============================================

function useToast() {
  const { addToast, removeToast, clearToasts } = useToasts()

  const toast = React.useCallback(
    (options: Omit<Toast, 'id'>) => addToast(options),
    [addToast]
  )

  return { toast, dismiss: removeToast, clear: clearToasts }
}

// ============================================
// Modal
// ============================================

interface ModalContextValue {
  isOpen: boolean
  close: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) throw new Error('useModal must be used within Modal')
  return context
}

export interface ModalProps {
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
}

const MODAL_SIZES = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-4xl',
} as const

const _Modal = forwardRef<HTMLDivElement, ModalProps>(
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
      ...props
    },
    _ref
  ) => {
    const modalRef = useRef<HTMLDivElement>(null)
    const titleId = useId()
    const descriptionId = useId()

    // Focus management
    const previousActiveElement = useRef<HTMLElement | null>(null)

    useEffect(() => {
      if (open) {
        previousActiveElement.current = document.activeElement as HTMLElement
        document.body.style.overflow = 'hidden'
        // Focus modal
        setTimeout(() => modalRef.current?.focus(), 0)
      } else {
        document.body.style.overflow = ''
        previousActiveElement.current?.focus()
      }

      return () => {
        document.body.style.overflow = ''
      }
    }, [open])

    // Handle Escape key
    useEffect(() => {
      if (!open || !closeOnEscape) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, closeOnEscape, onClose])

    if (!open) return null

    return (
      <ModalContext.Provider value={{ isOpen: open, close: onClose }}>
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? titleId : undefined}
          aria-describedby={description ? descriptionId : undefined}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
            onClick={closeOnOverlayClick ? onClose : undefined}
            aria-hidden="true"
          />

          {/* Modal */}
          <div
            ref={modalRef}
            tabIndex={-1}
            className={cn(
              'relative w-full bg-white dark:bg-neutral-950 rounded-xl shadow-2xl',
              'animate-scale-in',
              MODAL_SIZES[size],
              className
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {(title || showCloseButton) && (
              <div className="flex items-start justify-between p-6 border-b border-neutral-200 dark:border-neutral-800">
                <div>
                  {title && <h2 id={titleId} className="text-lg font-semibold text-brand-navy-900 dark:text-brand-white">{title}</h2>}
                  {description && <p id={descriptionId} className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">{description}</p>}
                </div>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500"
                    aria-label="Close modal"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            <div className="p-6">{children}</div>
          </div>
        </div>
      </ModalContext.Provider>
    )
  }
)

_Modal.displayName = 'Modal'

// ============================================
// Tooltip
// ============================================

export interface TooltipProps {
  /** Content */
  content: React.ReactNode
  /** Children (trigger) */
  children: React.ReactElement
  /** Position */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** Delay show */
  delayShow?: number
  /** Delay hide */
  delayHide?: number
  /** CSS class */
  className?: string
}

const POSITION_MAP = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
  left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  right: 'left-full top-1/2 -translate-y-1/2 ml-2',
} as const

const ARROW_POSITION = {
  top: 'bottom-[-4px] left-1/2 -translate-x-1/2 border-t-current',
  bottom: 'top-[-4px] left-1/2 -translate-x-1/2 border-b-current',
  left: 'right-[-4px] top-1/2 -translate-y-1/2 border-r-current',
  right: 'left-[-4px] top-1/2 -translate-y-1/2 border-l-current',
} as const

const _Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      children,
      position = 'top',
      delayShow = 200,
      delayHide = 100,
      className,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false)
    const showTimeout = useRef<NodeJS.Timeout | null>(null)
    const hideTimeout = useRef<NodeJS.Timeout | null>(null)

    const show = () => {
      if (hideTimeout.current) clearTimeout(hideTimeout.current)
      showTimeout.current = setTimeout(() => setIsVisible(true), delayShow)
    }

    const hide = () => {
      if (showTimeout.current) clearTimeout(showTimeout.current)
      hideTimeout.current = setTimeout(() => setIsVisible(false), delayHide)
    }

    const childRef = useRef<HTMLElement>(null)

    const triggerProps = {
      onMouseEnter: show,
      onMouseLeave: hide,
      onFocus: show,
      onBlur: hide,
      ref: childRef,
    }

    const tooltipId = useId()

    const clonedChild = React.cloneElement(children, {
      ...triggerProps,
      'aria-describedby': isVisible ? tooltipId : undefined,
    } as Record<string, unknown>)

    return (
      <div ref={ref} className="inline-block relative" {...props}>
        {clonedChild}
        {isVisible && (
          <div
            id={tooltipId}
            role="tooltip"
            className={cn(
              'absolute z-50 px-3 py-2 text-sm text-white',
              'bg-neutral-900 dark:bg-neutral-100',
              'rounded-lg shadow-lg',
              'whitespace-nowrap',
              'animate-fade-in',
              POSITION_MAP[position],
              className
            )}
            style={{ transformOrigin: position === 'top' || position === 'bottom' ? 'center top' : 'center left' }}
          >
            {content}
            <div
              className={cn(
                'absolute w-0 h-0 border-4 border-transparent',
                ARROW_POSITION[position]
              )}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    )
  }
)

_Tooltip.displayName = 'Tooltip'

// ============================================
// Accordion
// ============================================

export interface AccordionProps {
  /** Accordion items */
  children: React.ReactNode
  /** Allow multiple open */
  multiple?: boolean
  /** Default open items (values) */
  defaultOpen?: string[]
  /** CSS class */
  className?: string
}

export interface AccordionItemProps {
  /** Item value/index */
  value: string
  /** Children */
  children: React.ReactNode
  /** CSS class */
  className?: string
  /** Disabled */
  disabled?: boolean
}

export interface AccordionTriggerProps {
  /** Children */
  children: React.ReactNode
  /** CSS class */
  className?: string
}

export interface AccordionContentProps {
  /** Children */
  children: React.ReactNode
  /** CSS class */
  className?: string
}

const AccordionContext = createContext<{
  openItems: string[]
  multiple: boolean
  toggleItem: (value: string) => void
} | null>(null)

const useAccordionContext = () => {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within Accordion')
  }
  return context
}

const _Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  ({ children, multiple = false, defaultOpen = [], className }, ref) => {
    const [openItems, setOpenItems] = useState<string[]>(defaultOpen)

    const toggleItem = useCallback((value: string) => {
      setOpenItems((prev) => {
        const isOpen = prev.includes(value)
        if (multiple) {
          return isOpen ? prev.filter((v) => v !== value) : [...prev, value]
        }
        return isOpen ? [] : [value]
      })
    }, [multiple])

    return (
      <AccordionContext.Provider value={{ openItems, multiple, toggleItem }}>
        <div ref={ref} className={cn('w-full', className)}>{children}</div>
      </AccordionContext.Provider>
    )
  }
)

_Accordion.displayName = 'Accordion'

const _AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, className, disabled }, ref) => {
    const { openItems, toggleItem } = useAccordionContext()
    const isOpen = openItems.includes(value)

    return (
      <div ref={ref} className={cn('border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden', className)}>
        {React.Children.map(children, (child) => {
          if (!React.isValidElement(child)) return child
          return React.cloneElement(child, { isOpen, disabled, value, toggleItem } as Record<string, unknown>)
        })}
      </div>
    )
  }
)

_AccordionItem.displayName = 'AccordionItem'

const _AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps & { isOpen?: boolean; disabled?: boolean; value?: string; toggleItem?: (value: string) => void }>(
  ({ children, className, isOpen, disabled, value, toggleItem }, ref) => {
    const ctx = useAccordionContext()
    const itemValue = value ?? ''
    const itemOpen = isOpen ?? false
    const itemDisabled = disabled ?? false

    return (
      <button
        ref={ref}
        type="button"
        onClick={() => !itemDisabled && ctx?.toggleItem(itemValue)}
        disabled={itemDisabled}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left',
          'bg-white dark:bg-neutral-950',
          'hover:bg-neutral-50 dark:hover:bg-neutral-900',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
          className
        )}
        aria-expanded={itemOpen}
        aria-controls={`${itemValue}-content`}
        id={`${itemValue}-trigger`}
      >
        <span className="font-medium text-brand-navy-900 dark:text-brand-white">{children}</span>
        <svg
          className={cn(
            'w-5 h-5 flex-shrink-0 text-neutral-400 transition-transform duration-200',
            itemOpen && 'rotate-180'
          )}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    )
  }
)

_AccordionTrigger.displayName = 'AccordionTrigger'

const _AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps & { isOpen?: boolean; value?: string }>(
  ({ children, className, isOpen, value }, ref) => {
    const ctx = useAccordionContext()
    const itemValue = value ?? ''
    const itemOpen = isOpen ?? false

    return (
      <div
        ref={ref}
        id={`${itemValue}-content`}
        role="region"
        aria-labelledby={`${itemValue}-trigger`}
        className={cn('overflow-hidden transition-all duration-200 ease-out', className)}
        style={{ maxHeight: itemOpen ? '500px' : '0', opacity: itemOpen ? 1 : 0 }}
      >
        <div className="px-4 pb-4 text-neutral-600 dark:text-neutral-400">{children}</div>
      </div>
    )
  }
)

_AccordionContent.displayName = 'AccordionContent'

// ============================================
// Exports
// ============================================

export { _Alert as Alert, _Progress as Progress, _Spinner as Spinner, _Skeleton as Skeleton, _Modal as Modal, _Tooltip as Tooltip, _Accordion as Accordion, _AccordionItem as AccordionItem, _AccordionTrigger as AccordionTrigger, _AccordionContent as AccordionContent, ToastProvider, useToast }