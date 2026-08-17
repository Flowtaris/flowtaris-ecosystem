// @flowtaris/ui - Composed Select Components
// Radix-style select with design token integration

'use client'

import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useCallback,
  useId,
  createContext,
  useContext,
} from 'react'
import { createPortal } from 'react-dom'
import { cn } from './utils'
import { ChevronDown, Check } from 'lucide-react'
import { Portal } from './overlay'

// ============================================
// Context
// ============================================

interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  disabled: boolean
  open: boolean
  onOpenChange: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
  contentRef: React.RefObject<HTMLDivElement | null>
  name: string
  placeholder?: string
}

const SelectContext = createContext<SelectContextValue | null>(null)

function useSelectContext() {
  const context = useContext(SelectContext)
  if (!context) {
    throw new Error('Select components must be used within a Select component')
  }
  return context
}

// ============================================
// Select Root
// ============================================

export interface SelectProps {
  /** Default value (uncontrolled) */
  defaultValue?: string
  /** Controlled value */
  value?: string
  /** On value change */
  onValueChange?: (value: string) => void
  /** Disabled state */
  disabled?: boolean
  /** Required */
  required?: boolean
  /** Name attribute */
  name?: string
  /** Placeholder */
  placeholder?: string
  /** Children (SelectTrigger, SelectContent) */
  children: React.ReactNode
  /** CSS class */
  className?: string
}

/**
 * Select - Root component for composed select
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      defaultValue = '',
      value: controlledValue,
      onValueChange,
      disabled = false,
      required = false,
      name = '',
      placeholder,
      children,
      className,
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue)
    const [open, setOpen] = useState(false)
    const triggerRef = useRef<HTMLButtonElement>(null)
    const contentRef = useRef<HTMLDivElement>(null)
    const selectId = useId()

    const isControlled = controlledValue !== undefined
    const value = isControlled ? controlledValue : uncontrolledValue

    const handleValueChange = useCallback(
      (newValue: string) => {
        if (!isControlled) setUncontrolledValue(newValue)
        onValueChange?.(newValue)
        setOpen(false)
      },
      [isControlled, onValueChange]
    )

    const handleOpenChange = useCallback((newOpen: boolean) => {
      setOpen(newOpen)
    }, [])

    const contextValue: SelectContextValue = {
      value,
      onValueChange: handleValueChange,
      disabled,
      open,
      onOpenChange: handleOpenChange,
      triggerRef,
      contentRef,
      name,
      placeholder,
    }

    return (
      <SelectContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn('relative inline-block w-full', className)}
          id={selectId}
        >
          {children}
          {/* Hidden native select for form submission */}
          <select
            name={name}
            value={value}
            onChange={(e) => handleValueChange(e.target.value)}
            disabled={disabled}
            required={required}
            className="hidden"
            tabIndex={-1}
            aria-hidden="true"
          >
            <option value="">Select...</option>
            {/* Options will be rendered by SelectContent but we need them here for form submission */}
          </select>
        </div>
      </SelectContext.Provider>
    )
  }
)

Select.displayName = 'Select'

// ============================================
// Select Trigger
// ============================================

export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Custom children render */
  children?: React.ReactNode
}

export interface SelectValueProps {
  /** Placeholder when no value */
  placeholder?: string
  /** Custom children render */
  children?: (value: string) => React.ReactNode
}

export const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ children, className, ...props }, ref) => {
    const { value, onValueChange, disabled, open, onOpenChange, triggerRef, placeholder, name } =
      useSelectContext()

    const handleClick = () => {
      if (!disabled) onOpenChange(!open)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        onOpenChange(true)
      } else if (e.key === 'Escape' || e.key === 'ArrowUp') {
        e.preventDefault()
        onOpenChange(false)
      }
    }

    // Find the selected option label from children (if passed)
    // This is a bit tricky - we'll use a placeholder for now
    const displayValue = value || placeholder || 'Select...'

    return (
      <button
        ref={(el) => {
          triggerRef.current = el
          if (typeof ref === 'function') ref(el)
          else if (ref) ref.current = el
        }}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? 'select-content' : undefined}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'relative w-full flex items-center justify-between',
          'bg-white dark:bg-neutral-900',
          'border border-neutral-300 dark:border-neutral-700',
          'rounded-radius-lg',
          'px-4 py-2.5 text-base',
          'text-brand-navy-900 dark:text-brand-white',
          'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
          'focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
          'transition-all duration-150',
          'hover:border-neutral-400 dark:hover:border-neutral-600',
          className
        )}
        {...props}
      >
        <span className={cn('truncate flex-1', value ? '' : 'text-neutral-400 dark:text-neutral-500')}>
          {children || displayValue}
        </span>
        <ChevronDown
          className={cn(
            'h-5 w-5 flex-shrink-0 text-neutral-500 dark:text-neutral-400',
            'transition-transform duration-150',
            open && 'rotate-180'
          )}
          aria-hidden="true"
        />
      </button>
    )
  }
)

SelectTrigger.displayName = 'SelectTrigger'

// ============================================
// Select Value
// ============================================

interface SelectValueComponentProps {
  /** Placeholder when no value */
  placeholder?: string
  /** Custom children render */
  children?: (value: string) => React.ReactNode
}

export const SelectValue = forwardRef<HTMLSpanElement, SelectValueComponentProps>(
  ({ placeholder, children }, _ref) => {
    const { value } = useSelectContext()
    const displayValue = value || placeholder || 'Select...'

    return (
      <span
        className={cn(
          'truncate block',
          value ? 'text-brand-navy-900 dark:text-brand-white' : 'text-neutral-400 dark:text-neutral-500'
        )}
      >
        {children ? children(displayValue) : displayValue}
      </span>
    )
  }
)

SelectValue.displayName = 'SelectValue'

// ============================================
// Select Content
// ============================================

export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Position */
  position?: 'bottom' | 'top'
}

export const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  ({ children, className, position = 'bottom', ...props }, ref) => {
    const { open, onOpenChange, disabled, contentRef, value, onValueChange, name } = useSelectContext()

    useEffect(() => {
      if (!open) return

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onOpenChange(false)
        }
      }

      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }, [open, onOpenChange])

    useEffect(() => {
      if (!open) return

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current &&
          !contentRef.current.contains(e.target as Node) &&
          contentRef.current !== e.target &&
          !(ref as React.RefObject<HTMLDivElement | null>)?.current?.contains(e.target as Node)
        ) {
          onOpenChange(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [open, onOpenChange, ref, contentRef])

    if (!open) return null

    return createPortal(
      <div
        ref={(el) => {
          contentRef.current = el
          if (typeof ref === 'function') ref(el)
          else if (ref) ref.current = el
        }}
        id="select-content"
        role="listbox"
        aria-label={name}
        className={cn(
          'absolute z-50 min-w-full max-h-60',
          'bg-white dark:bg-neutral-950',
          'border border-neutral-200 dark:border-neutral-800',
          'rounded-radius-lg shadow-lg',
          'overflow-auto py-1',
          'animate-fade-in',
          position === 'bottom' && 'top-full left-0 right-0 mt-1',
          position === 'top' && 'bottom-full left-0 right-0 mb-1',
          className
        )}
        {...props}
      >
        {children}
      </div>,
      document.body
    )
  }
)

SelectContent.displayName = 'SelectContent'

// ============================================
// Select Item
// ============================================

export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The value of this item */
  value: string
  /** Disabled state */
  disabled?: boolean
}

export const SelectItem = forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ value, disabled = false, children, className, ...props }, ref) => {
    const { value: currentValue, onValueChange, onOpenChange, disabled: selectDisabled } =
      useSelectContext()

    const isSelected = currentValue === value
    const isDisabled = disabled || selectDisabled

    const handleClick = () => {
      if (!isDisabled) {
        onValueChange(value)
        onOpenChange(false)
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleClick()
      }
    }

    return (
      <button
        ref={ref}
        type="button"
        role="option"
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full flex items-center justify-between px-3 py-2 text-sm',
          'text-brand-navy-900 dark:text-brand-white',
          'hover:bg-neutral-100 dark:hover:bg-neutral-800',
          'focus:bg-neutral-100 dark:focus:bg-neutral-800',
          'focus-visible:outline-none',
          isDisabled && 'opacity-50 cursor-not-allowed',
          isSelected && 'bg-brand-cyan-50 dark:bg-brand-cyan-900/20 text-brand-cyan-700 dark:text-brand-cyan-300',
          className
        )}
        {...props}
      >
        <span className="flex-1 truncate">{children}</span>
        {isSelected && <Check className="h-4 w-4 flex-shrink-0 text-brand-cyan-500" aria-hidden="true" />}
      </button>
    )
  }
)

SelectItem.displayName = 'SelectItem'

// ============================================
// Select Separator
// ============================================

export const SelectSeparator = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      role="separator"
      className={cn('h-px bg-neutral-200 dark:bg-neutral-800 my-1', className)}
      {...props}
    />
  )
)

SelectSeparator.displayName = 'SelectSeparator'

// ============================================
// Select Group
// ============================================

export interface SelectGroupProps {
  /** Group label */
  label: string
  /** Children */
  children: React.ReactNode
}

export const SelectGroup: React.FC<SelectGroupProps> = ({ label, children }) => (
  <div className="py-1">
    <div className="px-3 py-1.5 text-xs font-medium text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
      {label}
    </div>
    {children}
  </div>
)

SelectGroup.displayName = 'SelectGroup'

// ============================================
// Select Scroll Up/Down (for virtualization hints)
// ============================================

interface SelectScrollUpButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectScrollUpButton = forwardRef<HTMLButtonElement, SelectScrollUpButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'w-full flex items-center justify-center px-3 py-2',
        'text-xs text-neutral-500 dark:text-neutral-400',
        'bg-white/95 dark:bg-neutral-950/95',
        'border-b border-neutral-200 dark:border-neutral-800',
        'backdrop-blur-sm',
        className
      )}
      {...props}
    >
      ↑ More options
    </button>
  )
)

SelectScrollUpButton.displayName = 'SelectScrollUpButton'

interface SelectScrollDownButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectScrollDownButton = forwardRef<HTMLButtonElement, SelectScrollDownButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        'w-full flex items-center justify-center px-3 py-2',
        'text-xs text-neutral-500 dark:text-neutral-400',
        'bg-white/95 dark:bg-neutral-950/95',
        'border-t border-neutral-200 dark:border-neutral-800',
        'backdrop-blur-sm',
        className
      )}
      {...props}
    >
      More options ↓
    </button>
  )
)

SelectScrollDownButton.displayName = 'SelectScrollDownButton'