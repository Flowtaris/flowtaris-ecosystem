// @flowtaris/ui - Button Component
// Primary interactive element with multiple variants and sizes

import { forwardRef, type ButtonHTMLAttributes, type ReactNode, type AnchorHTMLAttributes } from 'react'
import { cn } from './utils'

// ===== VARIANTS =====
export type ButtonVariant =
  | 'primary'      // Main CTA - cyan gradient
  | 'secondary'    // Secondary action - outline
  | 'tertiary'     // Subtle action - ghost
  | 'destructive'  // Danger actions - red
  | 'glass'        // Glass morphism
  | 'minimal'      // Bare minimum
  | 'ghost'        // Ghost/transparent
  | 'outline'      // Outlined button

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  asChild?: boolean
  href?: string
}

// ===== VARIANT STYLES =====
const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    relative overflow-hidden
    bg-gradient-to-r from-brand-cyan-500 to-brand-navy-600
    text-white
    shadow-shadow-glow-cyan-sm
    hover:shadow-shadow-glow-cyan-md
    active:shadow-shadow-glow-cyan-sm
    transition-all duration-200 ease-out
  `,
  secondary: `
    border border-border-DEFAULT
    bg-transparent
    text-text-primary
    hover:bg-surface-layer5
    hover:border-border-strong
    active:bg-surface-layer3
    transition-all duration-150 ease-out
  `,
  tertiary: `
    bg-transparent
    text-text-secondary
    hover:bg-surface-layer5
    hover:text-text-primary
    active:bg-surface-layer3
    transition-all duration-150 ease-out
  `,
  destructive: `
    bg-semantic-error-DEFAULT
    text-white
    shadow-shadow-glow-red-sm
    hover:shadow-shadow-glow-red-md
    active:shadow-shadow-glow-red-sm
    transition-all duration-200 ease-out
  `,
  glass: `
    bg-surface-glass
    border border-border-DEFAULT
    backdrop-blur-md
    text-text-primary
    hover:bg-surface-glass-hover
    hover:border-border-strong
    transition-all duration-200 ease-out
  `,
  minimal: `
    bg-transparent
    text-text-tertiary
    hover:text-text-primary
    active:text-text-secondary
    transition-colors duration-150 ease-out
  `,
  ghost: `
    bg-transparent
    text-text-secondary
    hover:bg-surface-layer5
    hover:text-text-primary
    active:bg-surface-layer3
    transition-all duration-150 ease-out
  `,
  outline: `
    border border-border-DEFAULT
    bg-transparent
    text-text-primary
    hover:bg-surface-layer5
    hover:border-border-strong
    active:bg-surface-layer3
    transition-all duration-150 ease-out
  `,
}

const sizeStyles: Record<ButtonSize, string> = {
  xs: 'px-3 py-1.5 text-ui-xs gap-1.5',
  sm: 'px-4 py-2 text-ui-sm gap-2',
  md: 'px-6 py-3 text-ui-md gap-2.5',
  lg: 'px-8 py-4 text-ui-lg gap-3',
  xl: 'px-10 py-5 text-ui-lg gap-3',
  icon: 'p-3 text-ui-md',
}

const loadingStyles = 'relative overflow-hidden'

// ===== COMPONENT =====
function ButtonInner(
  {
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    asChild = false,
    href,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>
) {
  const isDisabled = disabled || isLoading
  const isAnchor = asChild && href

  const baseClassName = cn(
    'inline-flex items-center justify-center font-medium rounded-radius-lg',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2 focus-visible:ring-offset-surface-layer4',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'active:scale-[0.98] transition-transform duration-75 ease-out',
    'select-none',
    variantStyles[variant],
    sizeStyles[size],
    fullWidth && 'w-full',
    isLoading && loadingStyles,
    className
  )

  const loadingContent = (
    <>
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      <span className="sr-only">Loading...</span>
    </>
  )

  const labelContent = (
    <>
      {leftIcon && <span className="flex-shrink-0" aria-hidden="true">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0" aria-hidden="true">{rightIcon}</span>}
    </>
  )

  if (isAnchor) {
    // Filter out button-specific props for anchor
    const {
      type,
      form,
      formAction,
      formEncType,
      formMethod,
      formNoValidate,
      formTarget,
      name,
      value,
      ...anchorProps
    } = props as Record<string, unknown>

    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        className={baseClassName}
        href={href}
        aria-busy={isLoading}
        aria-disabled={isDisabled}
        {...anchorProps}
      >
        {isLoading ? loadingContent : labelContent}
      </a>
    )
  }

  // Default button element
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={baseClassName}
      disabled={isDisabled}
      aria-busy={isLoading}
      aria-disabled={isDisabled}
      type="button"
      {...props}
    >
      {isLoading ? loadingContent : labelContent}
    </button>
  )
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(ButtonInner)
Button.displayName = 'Button'

// ===== VARIANT EXPORTS (for external customization) =====
export const buttonVariants = {
  variant: variantStyles,
  size: sizeStyles,
} as const