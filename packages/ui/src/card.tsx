// @flowtaris/ui - Card Component
// Flexible card system with sub-components

import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from './utils'

// ===== CARD PROPS =====
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'outlined' | 'ghost'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
  asChild?: boolean
}

export type CardVariant = NonNullable<CardProps['variant']>

// Sub-component props - using type aliases for extension
export type CardHeaderProps = HTMLAttributes<HTMLDivElement>
export type CardTitleProps = HTMLAttributes<HTMLHeadingElement>
export type CardDescriptionProps = HTMLAttributes<HTMLParagraphElement>
export type CardContentProps = HTMLAttributes<HTMLDivElement>
export type CardFooterProps = HTMLAttributes<HTMLDivElement>
export type CardActionProps = HTMLAttributes<HTMLDivElement>

// ===== VARIANT STYLES =====
const cardVariants: Record<CardVariant, string> = {
  default: `
    bg-surface-layer5
    border border-border-DEFAULT
    shadow-shadow-layer-3
  `,
  elevated: `
    bg-surface-layer5
    border border-border-subtle
    shadow-shadow-layer-4
    hover:shadow-shadow-layer-5
    transition-shadow duration-300 ease-out
  `,
  glass: `
    bg-surface-glass
    border border-border-DEFAULT
    backdrop-blur-lg
    shadow-shadow-layered-glass
  `,
  outlined: `
    bg-transparent
    border border-border-DEFAULT
    hover:border-border-strong
    transition-colors duration-200 ease-out
  `,
  ghost: `
    bg-transparent
    border-none
    hover:bg-surface-layer5
    transition-colors duration-200 ease-out
  `,
}

const paddingStyles: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

// ===== CARD =====
export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      variant = 'default',
      padding = 'md',
      hoverable = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Component = asChild ? 'div' : 'div'

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-radius-xl overflow-hidden',
          'transition-all duration-300 ease-out',
          cardVariants[variant],
          paddingStyles[padding],
          hoverable && 'hover:-translate-y-1 hover:shadow-shadow-layer-5',
          className
        )}
        {...props}
      >
        {children}
      </Component>
    )
  }
)
Card.displayName = 'Card'

// ===== CARD HEADER =====
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('border-b border-border-subtle pb-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardHeader.displayName = 'CardHeader'

// ===== CARD TITLE =====
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ children, className, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        'font-display font-semibold text-headline-md text-text-primary',
        'tracking-tight',
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
)
CardTitle.displayName = 'CardTitle'

// ===== CARD DESCRIPTION =====
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ children, className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn('text-body-md text-text-secondary mt-2', className)}
      {...props}
    >
      {children}
    </p>
  )
)
CardDescription.displayName = 'CardDescription'

// ===== CARD CONTENT =====
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('pt-4', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardContent.displayName = 'CardContent'

// ===== CARD FOOTER =====
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center gap-3 mt-4 pt-4 border-t border-border-subtle',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
CardFooter.displayName = 'CardFooter'

// ===== CARD ACTION (for action buttons/links) =====
export const CardAction = forwardRef<HTMLDivElement, CardActionProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </div>
  )
)
CardAction.displayName = 'CardAction'