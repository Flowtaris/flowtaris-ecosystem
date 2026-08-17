// @flowtaris/ui - Form Validation
// Zod schema integration, useForm hook, validation messages

'use client'

import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
  FormEvent,
} from 'react'
import { z, ZodSchema, ZodError, ZodType, RefinementCtx } from 'zod'
import { cn } from './utils'

// ============================================
// Types
// ============================================

export interface FieldState<T = unknown> {
  /** Current field value */
  value: T
  /** Field error message */
  error?: string
  /** Whether field has been touched */
  touched: boolean
  /** Whether field is dirty (changed from initial) */
  dirty: boolean
  /** Whether field is currently validating */
  validating: boolean
}

export interface FormState<T extends Record<string, unknown>> {
  /** All field values */
  values: T
  /** All field errors */
  errors: Partial<Record<keyof T, string>>
  /** All touched fields */
  touched: Partial<Record<keyof T, boolean>>
  /** All dirty fields */
  dirty: Partial<Record<keyof T, boolean>>
  /** Whether form is submitting */
  isSubmitting: boolean
  /** Whether form is validating */
  isValidating: boolean
  /** Whether form is valid (no errors) */
  isValid: boolean
  /** Whether form has been submitted */
  submitted: boolean
  /** Submission count */
  submitCount: number
}

export interface FormFieldProps<T = unknown> {
  /** Field name (dot notation supported) */
  name: string
  /** Field value */
  value?: T
  /** On change handler */
  onChange?: (value: T) => void
  /** On blur handler */
  onBlur?: () => void
  /** Field error */
  error?: string
  /** Whether field is touched */
  touched?: boolean
  /** Whether field is disabled */
  disabled?: boolean
  /** Required indicator */
  required?: boolean
  /** Field label */
  label?: string
  /** Helper text */
  helperText?: string
  /** Placeholder */
  placeholder?: string
  /** CSS class */
  className?: string
}

export interface UseFormOptions<T extends Record<string, unknown>> {
  /** Initial form values */
  initialValues: T
  /** Validation schema (Zod) */
  schema?: ZodSchema<T>
  /** Validate on change */
  validateOnChange?: boolean
  /** Validate on blur */
  validateOnBlur?: boolean
  /** Validate on mount */
  validateOnMount?: boolean
  /** Debounce validation (ms) */
  validationDebounce?: number
  /** Called on successful submit */
  onSubmit?: (values: T, form: FormActions<T>) => Promise<void> | void
  /** Called on submit error */
  onError?: (errors: Partial<Record<keyof T, string>>, form: FormActions<T>) => void
}

export interface FormActions<T extends Record<string, unknown>> {
  /** Get field state */
  getFieldState: (name: keyof T) => FieldState
  /** Set field value */
  setFieldValue: (name: keyof T, value: unknown) => void
  /** Set field error */
  setFieldError: (name: keyof T, error: string | undefined) => void
  /** Set field touched */
  setFieldTouched: (name: keyof T, touched?: boolean) => void
  /** Validate single field */
  validateField: (name: keyof T) => Promise<string | undefined>
  /** Validate all fields */
  validateForm: () => Promise<Partial<Record<keyof T, string>>>
  /** Reset form to initial values */
  resetForm: (values?: Partial<T>) => void
  /** Submit form */
  submitForm: (event?: FormEvent) => Promise<void>
  /** Set multiple values */
  setValues: (values: Partial<T>) => void
  /** Set multiple errors */
  setErrors: (errors: Partial<Record<keyof T, string>>) => void
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Flatten Zod error to field error map
 */
function flattenZodError<T extends Record<string, unknown>>(
  error: ZodError<T>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {}

  for (const issue of error.issues) {
    const path = issue.path.join('.') as keyof T
    if (!errors[path] || issue.code === 'custom') {
      errors[path] = issue.message
    }
  }

  return errors
}

/**
 * Get error for specific field from Zod error
 */
function getFieldError<T extends Record<string, unknown>>(
  error: ZodError<T> | undefined,
  fieldName: string
): string | undefined {
  if (!error) return undefined
  const issue = error.issues.find((i) => i.path.join('.') === fieldName)
  return issue?.message
}

/**
 * Create field validator from Zod schema
 */
function createFieldValidator<T extends Record<string, unknown>>(
  schema: ZodSchema<T>,
  fieldName: string
) {
  return async (value: unknown): Promise<string | undefined> => {
    try {
      // Create a partial schema for just this field
      const result = await schema.safeParseAsync({ [fieldName]: value } as T)
      if (!result.success) {
        return getFieldError(result.error, fieldName)
      }
      return undefined
    } catch {
      return undefined
    }
  }
}

// ============================================
// useForm Hook
// ============================================

/**
 * useForm - React hook for form state management with Zod validation
 */
function useForm<T extends Record<string, unknown>>(
  options: UseFormOptions<T>
): FormState<T> & FormActions<T> {
  const {
    initialValues,
    schema,
    validateOnChange = true,
    validateOnBlur = true,
    validateOnMount = false,
    validationDebounce = 300,
    onSubmit,
    onError,
  } = options

  // Form state
  const [values, setValuesState] = useState<T>(initialValues)
  const [errors, setErrorsState] = useState<Partial<Record<keyof T, string>>>({})
  const [touched, setTouchedState] = useState<Partial<Record<keyof T, boolean>>>({})
  const [dirty, setDirtyState] = useState<Partial<Record<keyof T, boolean>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValidating, setIsValidating] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitCount, setSubmitCount] = useState(0)

  // Refs for debouncing and avoiding circular deps
  const validationTimeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})
  const initialValuesRef = useRef(initialValues)
  const valuesRef = useRef(values)
  valuesRef.current = values

  // Refs for actions that call each other
  const validateFieldRef = useRef<((name: keyof T) => Promise<string | undefined>) | null>(null)
  const actionsRef = useRef<FormActions<T> | null>(null)

  // Update refs when values change
  useEffect(() => {
    initialValuesRef.current = initialValues
  }, [initialValues])

  // Compute isValid
  const isValid = useMemo(() => {
    return Object.keys(errors).length === 0
  }, [errors])

  // Get field state
  const getFieldState = useCallback(
    (name: keyof T): FieldState => ({
      value: values[name],
      error: errors[name],
      touched: !!touched[name],
      dirty: !!dirty[name],
      validating: false,
    }),
    [values, errors, touched, dirty]
  )

  // Set field error
  const setFieldError = useCallback(
    (name: keyof T, error: string | undefined) => {
      setErrorsState((prev) => {
        const next = { ...prev }
        if (error) {
          next[name] = error
        } else {
          delete next[name]
        }
        return next
      })
    },
    []
  )

  // Validate single field (defined early via ref)
  const validateField = useCallback(
    async (name: keyof T): Promise<string | undefined> => {
      if (!schema) return undefined

      setIsValidating(true)
      try {
        const currentValues = valuesRef.current
        const result = await schema.safeParseAsync(currentValues)

        if (!result.success) {
          const error = getFieldError(result.error, name as string)
          setFieldError(name, error)
          return error
        } else {
          setFieldError(name, undefined)
          return undefined
        }
      } catch {
        setFieldError(name, undefined)
        return undefined
      } finally {
        setIsValidating(false)
      }
    },
    [schema, setFieldError]
  )

  // Store validateField in ref for use in other callbacks
  useEffect(() => {
    validateFieldRef.current = validateField
  }, [validateField])

  // Set field value
  const setFieldValue = useCallback(
    (name: keyof T, value: unknown) => {
      setValuesState((prev) => ({ ...prev, [name]: value }))

      // Mark as dirty
      setDirtyState((prev) => ({
        ...prev,
        [name]: value !== initialValuesRef.current[name],
      }))

      // Validate on change
      if (validateOnChange && schema) {
        const key = name as string
        if (validationTimeouts.current[key]) {
          clearTimeout(validationTimeouts.current[key])
        }

        validationTimeouts.current[key] = setTimeout(() => {
          validateFieldRef.current?.(name)
        }, validationDebounce)
      }
    },
    [schema, validateOnChange, validationDebounce]
  )

  // Set field touched
  const setFieldTouched = useCallback(
    (name: keyof T, touchedValue = true) => {
      setTouchedState((prev) => ({ ...prev, [name]: touchedValue }))

      // Validate on blur
      if (validateOnBlur && schema && touchedValue) {
        validateFieldRef.current?.(name)
      }
    },
    [schema, validateOnBlur]
  )

  // Validate all fields
  const validateForm = useCallback(async (): Promise<Partial<Record<keyof T, string>>> => {
    if (!schema) return {}

    setIsValidating(true)
    try {
      const result = await schema.safeParseAsync(valuesRef.current)
      if (!result.success) {
        const newErrors = flattenZodError(result.error)
        setErrorsState(newErrors)
        return newErrors
      } else {
        setErrorsState({})
        return {}
      }
    } finally {
      setIsValidating(false)
    }
  }, [schema])

  // Reset form
  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      const resetValues = (newValues ? { ...initialValuesRef.current, ...newValues } : initialValuesRef.current) as T
      setValuesState(resetValues)
      setErrorsState({})
      setTouchedState({})
      setDirtyState({})
      setSubmitted(false)
      setSubmitCount(0)
    },
    []
  )

  // Set multiple values
  const setValues = useCallback((newValues: Partial<T>) => {
    setValuesState((prev) => ({ ...prev, ...newValues }))

    // Update dirty state
    setDirtyState((prev) => {
      const next = { ...prev }
      for (const key of Object.keys(newValues) as (keyof T)[]) {
        next[key] = newValues[key] !== initialValuesRef.current[key]
      }
      return next
    })
  }, [])

  // Set multiple errors
  const setErrors = useCallback((newErrors: Partial<Record<keyof T, string>>) => {
    setErrorsState(newErrors)
  }, [])

  // Submit form (will be completed after actions is created)
  const submitForm = useCallback(
    async (event?: FormEvent) => {
      event?.preventDefault()

      // Mark all fields as touched
      const allTouched = Object.keys(valuesRef.current).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {} as Record<keyof T, boolean>
      )
      setTouchedState(allTouched)

      // Validate
      const validationErrors = await validateForm()

      if (Object.keys(validationErrors).length > 0) {
        onError?.(validationErrors, actionsRef.current!)
        return
      }

      // Submit
      setIsSubmitting(true)
      setSubmitted(true)
      setSubmitCount((c) => c + 1)

      try {
        if (onSubmit) {
          await onSubmit(valuesRef.current, actionsRef.current!)
        }
      } catch (error) {
        console.error('Form submission error:', error)
      } finally {
        setIsSubmitting(false)
      }
    },
    [validateForm, onSubmit, onError]
  )

  // Actions object - created with useMemo to avoid recreation
  useMemo(() => {
    const a: FormActions<T> = {
      getFieldState,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      validateField,
      validateForm,
      resetForm,
      submitForm,
      setValues,
      setErrors,
    }
    actionsRef.current = a
  }, [
    getFieldState,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    submitForm,
    setValues,
    setErrors,
  ])

  // Validate on mount
  useEffect(() => {
    if (validateOnMount && schema) {
      validateForm()
    }
  }, [validateOnMount, schema, validateForm])

  // Cleanup timeouts
  useEffect(() => {
    const timeouts = validationTimeouts.current
    return () => {
      Object.values(timeouts).forEach(clearTimeout)
    }
  }, [])

  return {
    values,
    errors,
    touched,
    dirty,
    isSubmitting,
    isValidating,
    isValid,
    submitted,
    submitCount,
    getFieldState,
    setFieldValue,
    setFieldError,
    setFieldTouched,
    validateField,
    validateForm,
    resetForm,
    submitForm,
    setValues,
    setErrors,
  }
}

// ============================================
// Field Component Helpers
// ============================================

export interface UseFieldOptions<T = unknown> {
  /** Field name */
  name: string
  /** Form actions from useForm */
  form: FormActions<Record<string, unknown>>
  /** Initial value */
  initialValue?: T
  /** Validate on blur */
  validateOnBlur?: boolean
}

/**
 * useField - Hook for individual field management
 */
function useField<T = unknown>(options: UseFieldOptions<T>) {
  const { name, form, initialValue, validateOnBlur = true } = options
  const [localValue, setLocalValue] = useState<T | undefined>(initialValue)
  const [localError, setLocalError] = useState<string | undefined>()
  const [localTouched, setLocalTouched] = useState(false)

  // Sync with form
  const value = localValue ?? (form.getFieldState(name).value as T)
  const error = localError ?? form.getFieldState(name).error
  const touched = localTouched || form.getFieldState(name).touched

  const handleChange = useCallback(
    (newValue: T) => {
      setLocalValue(newValue)
      form.setFieldValue(name, newValue)
    },
    [form, name]
  )

  const handleBlur = useCallback(() => {
    setLocalTouched(true)
    form.setFieldTouched(name, true)
    if (validateOnBlur) {
      form.validateField(name)
    }
  }, [form, name, validateOnBlur])

  const handleFocus = useCallback(() => {
    // Could track focus state if needed
  }, [])

  return {
    value,
    error,
    touched,
    onChange: handleChange,
    onBlur: handleBlur,
    onFocus: handleFocus,
    setValue: handleChange,
    setError: setLocalError,
  }
}

// ============================================
// Validation Message Components
// ============================================

export interface ValidationMessageProps {
  /** Error message */
  message?: string
  /** Show when true */
  visible?: boolean
  /** CSS class */
  className?: string
}

/**
 * ValidationMessage - Display validation error message
 */
function ValidationMessage({
  message,
  visible = true,
  className,
}: ValidationMessageProps) {
  if (!message || !visible) return null

  return (
    <p
      className={cn(
        'mt-1.5 text-sm text-red-600 dark:text-red-400',
        'role="alert"',
        'animate-fade-in',
        className
      )}
      aria-live="polite"
    >
      {message}
    </p>
  )
}

export interface ValidationSummaryProps {
  /** Form errors */
  errors: Record<string, string | undefined>
  /** Title */
  title?: string
  /** CSS class */
  className?: string
}

/**
 * ValidationSummary - Display summary of all form errors
 */
function ValidationSummary({
  errors,
  title = 'Please fix the following errors:',
  className,
}: ValidationSummaryProps) {
  const errorEntries = Object.entries(errors).filter(([, v]) => v)

  if (errorEntries.length === 0) return null

  return (
    <div
      className={cn(
        'mb-4 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800',
        'animate-slide-down',
        className
      )}
      role="alert"
      aria-live="assertive"
    >
      <h3 className="mb-2 text-sm font-medium text-red-800 dark:text-red-200">
        {title}
      </h3>
      <ul className="list-disc pl-5 space-y-1 text-sm text-red-700 dark:text-red-300">
        {errorEntries.map(([field, message]) => (
          <li key={field}>
            <strong>{field}:</strong> {message}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================
// Form Component Wrapper
// ============================================

export interface FormProps<T extends Record<string, unknown>> {
  /** Form configuration */
  form: ReturnType<typeof useForm<T>>
  /** Children (can receive form via context) */
  children: React.ReactNode
  /** On submit handler (alternative to form.onSubmit) */
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void
  /** CSS class */
  className?: string
  /** Disable native validation */
  noValidate?: boolean
}

// Type for form context - use loose typing to avoid variance issues
type FormContextType = FormState<Record<string, unknown>> & FormActions<Record<string, unknown>>

const FormContext = React.createContext<FormContextType | null>(null)

/**
 * FormProvider - Provide form context to child components
 */
function FormProvider<T extends Record<string, unknown>>({
  form,
  children,
}: {
  form: FormState<T> & FormActions<T>
  children: React.ReactNode
}) {
  return (
    <FormContext.Provider value={form as FormContextType}>
      {children}
    </FormContext.Provider>
  )
}

/**
 * useFormContext - Access form from context
 */
function useFormContext<T extends Record<string, unknown>>() {
  const context = React.useContext(FormContext)
  if (!context) {
    throw new Error('useFormContext must be used within FormProvider')
  }
  return context as FormState<T> & FormActions<T>
}

/**
 * Form - Wrapper component with submit handling
 */
function Form<T extends Record<string, unknown>>({
  form,
  children,
  onSubmit,
  className,
  noValidate = true,
}: FormProps<T>) {
  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      form.submitForm(event)
      onSubmit?.(event)
    },
    [form, onSubmit]
  )

  return (
    <FormProvider form={form}>
      <form onSubmit={handleSubmit} className={className} noValidate={noValidate}>
        {children}
      </form>
    </FormProvider>
  )
}

// ============================================
// Common Validation Schemas (Zod v4 compatible)
// ============================================

/**
 * Common validation patterns
 */
const Validators = {
  /** Required field */
  required: (message = 'This field is required') =>
    z.string().min(1, { message }),

  /** Email validation */
  email: (message = 'Invalid email address') =>
    z.string().email({ message }).or(z.literal('')),

  /** URL validation */
  url: (message = 'Invalid URL') =>
    z.string().url({ message }).or(z.literal('')),

  /** Minimum length */
  minLength: (min: number, message?: string) =>
    z.string().min(min, { message: message || `Must be at least ${min} characters` }),

  /** Maximum length */
  maxLength: (max: number, message?: string) =>
    z.string().max(max, { message: message || `Must be no more than ${max} characters` }),

  /** Pattern match */
  pattern: (regex: RegExp, message = 'Invalid format') =>
    z.string().regex(regex, { message }),

  /** Numeric */
  numeric: (message = 'Must be a number') =>
    z.coerce.number({ message }),

  /** Integer */
  integer: (message = 'Must be an integer') =>
    z.coerce.number({ message }).int({ message }),

  /** Positive number */
  positive: (message = 'Must be positive') =>
    z.coerce.number({ message }).positive({ message }),

  /** Range */
  range: (min: number, max: number, message?: string) =>
    z.coerce
      .number({ message })
      .min(min, { message: message || `Must be at least ${min}` })
      .max(max, { message: message || `Must be at most ${max}` }),

  /** Boolean */
  boolean: () => z.boolean(),

  /** Date */
  date: (message = 'Invalid date') =>
    z.coerce.date({ message }),

  /** UUID */
  uuid: (message = 'Invalid UUID') =>
    z.string().uuid({ message }),

  /** Confirm field matches another */
  confirm: <T extends Record<string, unknown>>(
    fieldName: keyof T,
    message = 'Fields do not match'
  ) =>
    z.union([
      z.string().min(1, { message }),
      z.literal(''),
    ]).superRefine((val: string, ctx: RefinementCtx) => {
      const parent = (ctx as { parent?: T }).parent
      if (parent && val !== parent[fieldName] && val !== '') {
        ctx.addIssue({
          code: 'custom',
          message,
        })
      }
    }),
}

// ============================================
// Helper: createFormSchema
// ============================================

/**
 * Create a Zod schema from field definitions
 */
function createFormSchema<
  T extends Record<string, unknown>
>(
  fields: {
    [K in keyof T]?: ZodType<T[K]>
  }
) {
  return z.object(fields as Record<string, ZodType<unknown>>)
}

// ============================================
// Exports
// ============================================

export {
  useForm,
  useField,
  Form,
  FormProvider,
  useFormContext,
  ValidationMessage,
  ValidationSummary,
  Validators,
  createFormSchema,
  flattenZodError,
  getFieldError,
  createFieldValidator,
}