// @flowtaris/ui - Form Components
// Accessible form primitives with design token integration

'use client'

import React, { forwardRef, useId, useRef, useEffect } from 'react'
import { cn } from './utils'

// ============================================
// Label
// ============================================

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  /** Required indicator */
  required?: boolean
  /** Optional indicator */
  optional?: boolean
  /** Help text */
  helpText?: React.ReactNode
  /** Error message */
  error?: string
}

const _Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, required, optional, helpText, error, className, htmlFor, ...props }, ref) => {
    const labelId = useId()
    const helpId = useId()
    const errorId = useId()

    return (
      <label
        ref={ref}
        id={labelId}
        htmlFor={htmlFor}
        className={cn('block text-sm font-medium text-brand-navy-900 dark:text-brand-white mb-1.5', className)}
        {...props}
      >
        {children}
        {required && (
          <span className="ml-1 text-brand-red-500" aria-hidden="true">*</span>
        )}
        {optional && (
          <span className="ml-1 text-neutral-500 dark:text-neutral-400">(optional)</span>
        )}
        {helpText && (
          <span id={helpId} className="ml-2 text-xs text-neutral-500 dark:text-neutral-400">
            {helpText}
          </span>
        )}
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-brand-red-500" role="alert">
            {error}
          </p>
        )}
      </label>
    )
  }
)

_Label.displayName = 'Label'

// ============================================
// Input
// ============================================

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string
  /** Help text */
  helpText?: React.ReactNode
  /** Error message */
  error?: string
  /** Input variant */
  variant?: 'default' | 'filled' | 'outlined' | 'flushed'
  /** Input size */
  size?: 'sm' | 'md' | 'lg'
  /** Show clear button */
  clearable?: boolean
  /** Left element */
  leftElement?: React.ReactNode
  /** Right element */
  rightElement?: React.ReactNode
  /** Loading state */
  loading?: boolean
  /** Clear handler */
  onClear?: () => void
}

const _Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helpText,
      error,
      variant = 'outlined',
      size = 'md',
      clearable = false,
      leftElement,
      rightElement,
      loading = false,
      className,
      id,
      disabled,
      required,
      onChange,
      onClear,
      value,
      type = 'text',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id || generatedId
    const inputRef = useRef<HTMLInputElement>(null)
    const combinedRef = (node: HTMLInputElement | null) => {
      inputRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    const isFilled = (value !== undefined && value !== '') || (inputRef.current?.value ?? '') !== ''

    const handleClear = () => {
      onClear?.()
      onChange?.({ target: { value: '', name: '' } } as React.ChangeEvent<HTMLInputElement>)
      inputRef.current?.focus()
    }

    const variantStyles = {
      default: 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
      filled: 'bg-neutral-100 dark:bg-neutral-800 border-transparent',
      outlined: 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
      flushed: 'bg-transparent border-none border-b border-neutral-300 dark:border-neutral-700 rounded-none',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-base',
      lg: 'px-5 py-3.5 text-lg',
    }

    const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950'

    const errorStyles = error ? 'border-brand-red-500 focus-visible:ring-brand-red-500' : ''

    // Determine aria-describedby
    const describedBy = [
      helpText && `${inputId}-help`,
      error && `${inputId}-error`,
    ].filter(Boolean).join(' ') || undefined

    return (
      <div className="w-full">
        {label && (
          <Label htmlFor={inputId} required={required} helpText={helpText} error={error}>
            {label}
          </Label>
        )}
        <div className="relative">
          {leftElement && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
              {leftElement}
            </div>
          )}
          <input
            ref={combinedRef}
            id={inputId}
            type={type}
            disabled={disabled || loading}
            required={required}
            value={value}
            onChange={onChange}
            className={cn(
              'w-full transition-colors duration-150',
              'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'read-only:bg-neutral-50 dark:read-only:bg-neutral-800/50',
              variantStyles[variant],
              sizeStyles[size],
              focusStyles,
              errorStyles,
              leftElement && size === 'sm' && 'pl-9',
              leftElement && size === 'md' && 'pl-11',
              leftElement && size === 'lg' && 'pl-13',
              rightElement && !clearable && size === 'sm' && 'pr-9',
              rightElement && !clearable && size === 'md' && 'pr-11',
              rightElement && !clearable && size === 'lg' && 'pr-13',
              (clearable || rightElement) && size === 'sm' && 'pr-9',
              (clearable || rightElement) && size === 'md' && 'pr-11',
              (clearable || rightElement) && size === 'lg' && 'pr-13',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            aria-busy={loading}
            {...props}
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="animate-spin h-4 w-4 text-brand-cyan-500" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          )}
          {clearable && isFilled && !disabled && !loading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors"
              aria-label="Clear input"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          )}
          {rightElement && !clearable && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 dark:text-neutral-400 pointer-events-none">
              {rightElement}
            </div>
          )}
        </div>
        {helpText && !error && (
          <p id={`${inputId}-help`} className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            {helpText}
          </p>
        )}
      </div>
    )
  }
)

_Input.displayName = 'Input'

// ============================================
// Textarea
// ============================================

export interface TextareaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'minRows'> {
  /** Label text */
  label?: string
  /** Help text */
  helpText?: React.ReactNode
  /** Error message */
  error?: string
  /** Variant */
  variant?: 'default' | 'filled' | 'outlined' | 'flushed'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Show character count */
  showCount?: boolean
  /** Max length */
  maxLength?: number
  /** Min rows */
  minRows?: number
}

const _Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helpText,
      error,
      variant = 'outlined',
      size = 'md',
      showCount = false,
      maxLength,
      minRows = 3,
      className,
      id,
      disabled,
      required,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const textareaId = useId()
    const idToUse = id || textareaId
    const describedBy = [
      helpText && `${idToUse}-help`,
      error && `${idToUse}-error`,
    ].filter(Boolean).join(' ') || undefined

    const variantStyles = {
      default: 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
      filled: 'bg-neutral-100 dark:bg-neutral-800 border-transparent',
      outlined: 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
      flushed: 'bg-transparent border-none border-b border-neutral-300 dark:border-neutral-700 rounded-none',
    }

    const sizeStyles = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    }

    const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950'
    const errorStyles = error ? 'border-brand-red-500 focus-visible:ring-brand-red-500' : ''

    return (
      <div className="w-full">
        {label && <Label htmlFor={idToUse} required={required} helpText={helpText} error={error}>{label}</Label>}
        <div className="relative">
          <textarea
            ref={ref}
            id={textareaId}
            disabled={disabled}
            required={required}
            value={value}
            onChange={onChange}
            rows={minRows}
            className={cn(
              'w-full resize-y transition-colors duration-150',
              'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variantStyles[variant],
              sizeStyles[size],
              focusStyles,
              errorStyles,
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            maxLength={maxLength}
            {...props}
          />
        </div>
        <div className="flex justify-between mt-1.5">
          {helpText && !error && (
            <p id={`${textareaId}-help`} className="text-sm text-neutral-500 dark:text-neutral-400">
              {helpText}
            </p>
          )}
          {showCount && maxLength && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400" aria-live="polite">
              {typeof value === 'string' ? value.length : 0} / {maxLength}
            </p>
          )}
          {error && (
            <p id={`${textareaId}-error`} className="text-sm text-brand-red-500" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)

_Textarea.displayName = 'Textarea'

// ============================================
// Select
// ============================================

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Label text */
  label?: string
  /** Help text */
  helpText?: React.ReactNode
  /** Error message */
  error?: string
  /** Placeholder */
  placeholder?: string
  /** Options */
  options: SelectOption[]
  /** Variant */
  variant?: 'default' | 'filled' | 'outlined' | 'flushed'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Clearable */
  clearable?: boolean
  /** Left element */
  leftElement?: React.ReactNode
  /** Clear handler */
  onClear?: () => void
}

const _Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      helpText,
      error,
      placeholder,
      options,
      variant = 'outlined',
      size = 'md',
      clearable = false,
      leftElement,
      className,
      id,
      disabled,
      required,
      value,
      onChange,
      onClear,
      ...props
    },
    ref
  ) => {
    const selectId = useId()
    const idToUse = id || selectId
    const describedBy = [
      helpText && `${idToUse}-help`,
      error && `${idToUse}-error`,
    ].filter(Boolean).join(' ') || undefined

    const hasValue = value !== undefined && value !== ''

    const variantStyles = {
      default: 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
      filled: 'bg-neutral-100 dark:bg-neutral-800 border-transparent',
      outlined: 'bg-white dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700',
      flushed: 'bg-transparent border-none border-b border-neutral-300 dark:border-neutral-700 rounded-none',
    }

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm pr-8',
      md: 'px-4 py-2.5 text-base pr-10',
      lg: 'px-5 py-3.5 text-lg pr-12',
    }

    const focusStyles = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950'
    const errorStyles = error ? 'border-brand-red-500 focus-visible:ring-brand-red-500' : ''

    const handleClear = () => {
      onClear?.()
      onChange?.({ target: { value: '', name: '' } } as React.ChangeEvent<HTMLSelectElement>)
    }

    return (
      <div className="w-full">
        {label && <Label htmlFor={idToUse} required={required} helpText={helpText} error={error}>{label}</Label>}
        <div className="relative">
          {leftElement && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
              {leftElement}
            </div>
          )}
          <select
            ref={ref}
            id={idToUse}
            disabled={disabled}
            required={required}
            value={value}
            onChange={onChange}
            className={cn(
              'w-full appearance-none transition-colors duration-150',
              'bg-white dark:bg-neutral-900',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              variantStyles[variant],
              sizeStyles[size],
              focusStyles,
              errorStyles,
              leftElement && size === 'sm' && 'pl-9',
              leftElement && size === 'md' && 'pl-11',
              leftElement && size === 'lg' && 'pl-13',
              clearable && 'pr-10',
              className
            )}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={describedBy}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500 dark:text-neutral-400">
            <svg className={cn('w-4 h-4', clearable && hasValue && 'hidden')} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
          {clearable && hasValue && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors z-10"
              aria-label="Clear selection"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
              </svg>
            </button>
          )}
        </div>
        {helpText && !error && (
          <p id={`${idToUse}-help`} className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">
            {helpText}
          </p>
        )}
        {error && (
          <p id={`${idToUse}-error`} className="mt-1.5 text-sm text-brand-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    )
  }
)

_Select.displayName = 'Select'

// ============================================
// Checkbox
// ============================================

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string
  /** Description */
  description?: string
  /** Error message */
  error?: string
  /** Indeterminate state */
  indeterminate?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Inline layout */
  inline?: boolean
}

const _Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, description, error, indeterminate = false, size = 'md', inline = false, className, id, disabled, required, ...props },
    ref
  ) => {
    const checkboxId = useId()
    const idToUse = id || checkboxId
    const checkboxRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (checkboxRef.current) {
        checkboxRef.current.indeterminate = indeterminate
      }
    }, [indeterminate])

    const combinedRef = (node: HTMLInputElement | null) => {
      checkboxRef.current = node
      if (typeof ref === 'function') ref(node)
      else if (ref) ref.current = node
    }

    const sizeStyles = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4.5 w-4.5',
      lg: 'h-5.5 w-5.5',
    }

    const labelSizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div className={cn(inline && 'flex items-start', 'relative')}>
        <input
          ref={combinedRef}
          type="checkbox"
          id={idToUse}
          disabled={disabled}
          required={required}
          className={cn(
            'appearance-none transition-colors duration-150',
            'bg-white dark:bg-neutral-900',
            'border-2 border-neutral-300 dark:border-neutral-700',
            'rounded-sm',
            'checked:bg-brand-cyan-500 checked:border-brand-cyan-500',
            'checked:after:content-[""] checked:after:block checked:after:w-3 checked:after:h-1.5 checked:after:border-solid checked:after:border-white checked:after:border-r-2 checked:after:border-b-2 checked:after:rotate-[-45deg] checked:after:mt-[-2px] checked:after:ml-[1px]',
            'indeterminate:bg-brand-cyan-500 indeterminate:border-brand-cyan-500',
            'indeterminate:after:content-[""] indeterminate:after:block indeterminate:after:w-2 indeterminate:after:h-0.5 indeterminate:after:bg-white indeterminate:after:mx-auto indeterminate:after:mt-1.5',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-brand-red-500 focus-visible:ring-brand-red-500',
            sizeStyles[size],
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${idToUse}-error` : undefined}
          {...props}
        />
        {(label || description) && (
          <label
            htmlFor={idToUse}
            className={cn(
              inline ? 'ml-3 mt-0.5' : 'ml-3 block',
              labelSizeStyles[size],
              'text-brand-navy-900 dark:text-brand-white',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {description && <span className={cn(inline ? 'ml-2' : 'block mt-0.5 text-sm text-neutral-500 dark:text-neutral-400')}>{description}</span>}
          </label>
        )}
        {error && (
          <p id={`${idToUse}-error`} className={cn('mt-1.5 text-sm text-brand-red-500', inline && 'ml-7')}>
            {error}
          </p>
        )}
      </div>
    )
  }
)

_Checkbox.displayName = 'Checkbox'

// ============================================
// Radio
// ============================================

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string
  /** Description */
  description?: string
  /** Error message */
  error?: string
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Inline layout */
  inline?: boolean
}

const _Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, description, error, size = 'md', inline = false, className, id, disabled, required, ...props }, ref) => {
    const radioId = useId()
    const idToUse = id || radioId

    const sizeStyles = {
      sm: 'h-3.5 w-3.5',
      md: 'h-4.5 w-4.5',
      lg: 'h-5.5 w-5.5',
    }

    const labelSizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div className={cn(inline && 'flex items-start', 'relative')}>
        <input
          ref={ref}
          type="radio"
          id={idToUse}
          disabled={disabled}
          required={required}
          className={cn(
            'appearance-none transition-colors duration-150',
            'bg-white dark:bg-neutral-900',
            'border-2 border-neutral-300 dark:border-neutral-700',
            'rounded-full',
            'checked:border-brand-cyan-500',
            'checked:after:content-[""] checked:after:block checked:after:w-full checked:after:h-full checked:after:bg-brand-cyan-500 checked:after:rounded-full',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-brand-red-500 focus-visible:ring-brand-red-500',
            sizeStyles[size],
            className
          )}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${idToUse}-error` : undefined}
          {...props}
        />
        {(label || description) && (
          <label
            htmlFor={idToUse}
            className={cn(
              inline ? 'ml-3 mt-0.5' : 'ml-3 block',
              labelSizeStyles[size],
              'text-brand-navy-900 dark:text-brand-white',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {description && <span className={cn(inline ? 'ml-2' : 'block mt-0.5 text-sm text-neutral-500 dark:text-neutral-400')}>{description}</span>}
          </label>
        )}
        {error && (
          <p id={`${idToUse}-error`} className={cn('mt-1.5 text-sm text-brand-red-500', inline && 'ml-7')}>
            {error}
          </p>
        )}
      </div>
    )
  }
)

_Radio.displayName = 'Radio'

// ============================================
// Radio Group
// ============================================

export interface RadioGroupProps {
  /** Options */
  options: Array<{ value: string; label: string; description?: string; disabled?: boolean }>
  /** Name attribute */
  name: string
  /** Current value */
  value?: string
  /** On change handler */
  onChange?: (value: string) => void
  /** Label for group */
  groupLabel?: string
  /** Error message */
  error?: string
  /** Inline layout */
  inline?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Orientation */
  orientation?: 'vertical' | 'horizontal'
  /** CSS class */
  className?: string
}

/**
 * RadioGroup - Group of radio buttons
 */
export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  name,
  value,
  onChange,
  groupLabel,
  error,
  inline = false,
  size = 'md',
  orientation = 'vertical',
  className,
}) => {
  return (
    <fieldset className={cn('w-full', className)}>
      {groupLabel && <legend className="text-sm font-medium text-brand-navy-900 dark:text-brand-white mb-3">{groupLabel}</legend>}
      <div className={cn(
        'space-y-3',
        inline && 'flex flex-wrap gap-6',
        orientation === 'horizontal' && 'flex flex-wrap gap-6',
      )} role="radiogroup" aria-label={groupLabel} aria-invalid={error ? 'true' : 'false'}>
        {options.map((option) => (
          <Radio
            key={option.value}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={() => onChange?.(option.value)}
            label={option.label}
            description={option.description}
            disabled={option.disabled}
            size={size}
            inline={inline}
            aria-label={option.label}
          />
        ))}
      </div>
      {error && <p className="mt-2 text-sm text-brand-red-500" role="alert">{error}</p>}
    </fieldset>
  )
}

// ============================================
// Switch
// ============================================

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  /** Label text */
  label?: string
  /** Description */
  description?: string
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Inline layout */
  inline?: boolean
}

const _Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, description, size = 'md', inline = false, className, id, disabled, required, ...props }, ref) => {
    const switchId = useId()
    const idToUse = id || switchId

    const sizeStyles = {
      sm: { track: 'w-8 h-4.5', thumb: 'w-3.5 h-3.5 translate-x-0.5', checkedThumb: 'translate-x-4' },
      md: { track: 'w-11 h-6', thumb: 'w-5 h-5 translate-x-0.5', checkedThumb: 'translate-x-5' },
      lg: { track: 'w-14 h-7', thumb: 'w-6 h-6 translate-x-0.5', checkedThumb: 'translate-x-7' },
    }

    const labelSizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    }

    return (
      <div className={cn(inline && 'flex items-center', 'relative')}>
        <input
          ref={ref}
          type="checkbox"
          id={idToUse}
          disabled={disabled}
          required={required}
          role="switch"
          className={cn(
            'peer appearance-none',
            'bg-neutral-300 dark:bg-neutral-700',
            'rounded-full transition-colors duration-200',
            'checked:bg-brand-cyan-500',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-neutral-950',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeStyles[size].track,
            className
          )}
          aria-invalid={false}
          {...props}
        />
        <span className={cn(
          'pointer-events-none block bg-white dark:bg-neutral-300',
          'rounded-full shadow-sm transition-transform duration-200',
          'peer-checked:translate-x-full',
          sizeStyles[size].thumb,
        )} aria-hidden="true" />
        {(label || description) && (
          <label
            htmlFor={idToUse}
            className={cn(
              inline ? 'ml-3' : 'ml-3 block',
              labelSizeStyles[size],
              'text-brand-navy-900 dark:text-brand-white',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {label}
            {description && <span className={cn(inline ? 'ml-2' : 'block mt-0.5 text-sm text-neutral-500 dark:text-neutral-400')}>{description}</span>}
          </label>
        )}
      </div>
    )
  }
)

_Switch.displayName = 'Switch'

// ============================================
// Field (Wrapper for form field composition)
// ============================================

export interface FieldProps {
  /** Label */
  label?: string
  /** Help text */
  helpText?: React.ReactNode
  /** Error message */
  error?: string
  /** Required */
  required?: boolean
  /** Optional */
  optional?: boolean
  /** Children (input) */
  children: React.ReactNode
  /** CSS class */
  className?: string
}

/**
 * Field - Form field wrapper with label, help, error
 */
export const Field: React.FC<FieldProps> = ({
  label,
  helpText,
  error,
  required,
  optional,
  children,
  className,
}) => {
  return (
    <div className={cn('w-full', className)}>
      {label && <Label required={required} optional={optional} helpText={helpText} error={error}>{label}</Label>}
      <div>{children}</div>
      {helpText && !error && !label && (
        <p className="mt-1.5 text-sm text-neutral-500 dark:text-neutral-400">{helpText}</p>
      )}
      {error && !label && (
        <p className="mt-1.5 text-sm text-brand-red-500" role="alert">{error}</p>
      )}
    </div>
  )
}

Field.displayName = 'Field'

// ============================================
// Exports
// ============================================

export const Label = _Label
export const Input = _Input
export const Textarea = _Textarea
export const Select = _Select
export const Checkbox = _Checkbox
export const Radio = _Radio
export const Switch = _Switch

// Types already exported inline above