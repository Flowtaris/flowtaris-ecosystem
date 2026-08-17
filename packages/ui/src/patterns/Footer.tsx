// @flowtaris/ui - Footer Pattern
// Site footer with navigation columns, social links, and legal

'use client'

import React, { forwardRef } from 'react'
import { cn } from '../utils'
import {
  Twitter,
  Linkedin,
  Github,
  Mail,
  Globe,
  ArrowUpRight,
} from 'lucide-react'

// ============================================
// Types
// ============================================

export interface FooterLink {
  label: string
  href?: string
  onClick?: () => void
  external?: boolean
}

export interface FooterColumn {
  title: string
  links: FooterLink[]
}

export interface FooterSocialLink {
  href: string
  icon: React.ReactNode
  label: string
}

export interface FooterProps {
  /** Brand/logo */
  brand?: React.ReactNode
  /** Brand description */
  description?: string
  /** Navigation columns */
  columns?: FooterColumn[]
  /** Social links */
  socialLinks?: FooterSocialLink[]
  /** Copyright text */
  copyright?: string
  /** Legal links */
  legalLinks?: FooterLink[]
  /** Show back to top button */
  showBackToTop?: boolean
  /** Newsletter signup */
  newsletter?: {
    title: string
    description: string
    placeholder: string
    buttonLabel: string
    onSubmit: (email: string) => void
  }
  /** Variant */
  variant?: 'default' | 'minimal' | 'bordered'
  /** CSS class */
  className?: string
  /** Inline style */
  style?: React.CSSProperties
}

// ============================================
// Default Social Links
// ============================================

const DEFAULT_SOCIAL_LINKS: FooterSocialLink[] = [
  {
    href: 'https://twitter.com',
    icon: <Twitter className="h-5 w-5" aria-hidden="true" />,
    label: 'Twitter',
  },
  {
    href: 'https://linkedin.com',
    icon: <Linkedin className="h-5 w-5" aria-hidden="true" />,
    label: 'LinkedIn',
  },
  {
    href: 'https://github.com',
    icon: <Github className="h-5 w-5" aria-hidden="true" />,
    label: 'GitHub',
  },
  {
    href: 'mailto:hello@example.com',
    icon: <Mail className="h-5 w-5" aria-hidden="true" />,
    label: 'Email',
  },
]

// ============================================
// Footer Pattern Component
// ============================================

const _Footer = forwardRef<HTMLDivElement, FooterProps>(
  (
    {
      brand,
      description,
      columns = [],
      socialLinks = DEFAULT_SOCIAL_LINKS,
      copyright = `© ${new Date().getFullYear()} Flowtaris. All rights reserved.`,
      legalLinks = [],
      showBackToTop = true,
      newsletter,
      variant = 'default',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const VARIANT_STYLES = {
      default: 'bg-neutral-50 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800',
      minimal: 'bg-transparent',
      bordered: 'bg-white dark:bg-neutral-950 border-t-2 border-brand-cyan-500',
    } as const

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
      <footer
        ref={ref}
        className={cn('w-full', VARIANT_STYLES[variant], className)}
        style={style}
        role="contentinfo"
        {...props}
      >
        {/* Main Footer Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Brand Column */}
            {(brand || description || newsletter) && (
              <div className="lg:col-span-12 lg:col-start-1 lg:col-end-5 xl:col-span-4 xl:col-end-5">
                {brand && (
                  <div className="mb-6" aria-label="Brand">
                    <a href="/" className="flex items-center" aria-label="Go to homepage">
                      {brand}
                    </a>
                  </div>
                )}
                {description && (
                  <p className="text-body-md text-neutral-600 dark:text-neutral-400 mb-8 max-w-xs">
                    {description}
                  </p>
                )}

                {/* Social Links */}
                {socialLinks.length > 0 && (
                  <div className="flex items-center gap-4 mb-8" role="list" aria-label="Social links">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.href}
                        className={cn(
                          'flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200',
                          'text-neutral-500 hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400',
                          'bg-neutral-100 dark:bg-neutral-800',
                          'hover:bg-brand-cyan-50 dark:hover:bg-brand-cyan-900/30',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500'
                        )}
                        aria-label={social.label}
                        target={social.href.startsWith('http') ? '_blank' : undefined}
                        rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                )}

                {/* Newsletter */}
                {newsletter && (
                  <form onSubmit={(e) => { e.preventDefault(); const form = e.target as HTMLFormElement; const emailInput = form.elements.namedItem('email') as HTMLInputElement; newsletter.onSubmit(emailInput.value) }} className="space-y-3" aria-label="Newsletter signup">
                    <div>
                      <h3 className="text-heading-sm font-semibold text-neutral-900 dark:text-white mb-1">
                        {newsletter.title}
                      </h3>
                      <p className="text-body-sm text-neutral-500 dark:text-neutral-400">
                        {newsletter.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <input
                        name="email"
                        type="email"
                        placeholder={newsletter.placeholder}
                        className={cn(
                          'flex-1 px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700',
                          'bg-white dark:bg-neutral-900',
                          'text-neutral-900 dark:text-white',
                          'placeholder:text-neutral-400 dark:placeholder:text-neutral-500',
                          'focus:outline-none focus:ring-2 focus:ring-brand-cyan-500 focus:border-transparent',
                          'transition-colors'
                        )}
                        required
                        aria-label="Email address"
                      />
                      <button
                        type="submit"
                        className={cn(
                          'px-6 py-2.5 rounded-lg font-medium text-sm',
                          'bg-brand-cyan-600 text-white hover:bg-brand-cyan-700',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
                          'transition-colors',
                          'whitespace-nowrap'
                        )}
                      >
                        {newsletter.buttonLabel}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}

            {/* Navigation Columns */}
            {columns.length > 0 && (
              <div className={cn(
                'lg:col-span-12 lg:col-start-5 lg:col-end-13',
                'grid grid-cols-2 gap-8 lg:grid-cols-4'
              )} role="navigation" aria-label="Footer navigation">
                {columns.map((column, colIndex) => (
                  <div key={colIndex} className="space-y-4">
                    <h4 className="text-heading-sm font-semibold text-neutral-900 dark:text-white">
                      {column.title}
                    </h4>
                    <ul className="space-y-3" role="list">
                      {column.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            onClick={(e) => {
                              if (link.onClick) {
                                e.preventDefault()
                                link.onClick()
                              }
                            }}
                            target={link.external || link.href?.startsWith('http') ? '_blank' : undefined}
                            rel={link.external || link.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className={cn(
                              'text-body-sm text-neutral-600 dark:text-neutral-400',
                              'hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400',
                              'transition-colors',
                              'flex items-center gap-1.5'
                            )}
                          >
                            {link.label}
                            {link.external && (
                              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="my-12 border-t border-neutral-200 dark:border-neutral-800" aria-hidden="true" />

          {/* Bottom Bar */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400 text-center lg:text-left">
              {copyright}
            </p>

            {/* Legal Links */}
            {legalLinks.length > 0 && (
              <nav className="flex flex-wrap items-center justify-center lg:justify-end gap-6" aria-label="Legal links">
                {legalLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      if (link.onClick) {
                        e.preventDefault()
                        link.onClick()
                      }
                    }}
                    className={cn(
                      'text-body-sm text-neutral-500 dark:text-neutral-400',
                      'hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400',
                      'transition-colors'
                    )}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Back to Top */}
            {showBackToTop && (
              <button
                type="button"
                onClick={scrollToTop}
                className={cn(
                  'fixed bottom-6 right-6 z-40 lg:static lg:bottom-auto lg:right-auto lg:z-auto',
                  'p-2 rounded-full transition-all duration-200',
                  'bg-brand-cyan-600 text-white',
                  'hover:bg-brand-cyan-700 hover:shadow-lg',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500 focus-visible:ring-offset-2',
                  'shadow-lg'
                )}
                aria-label="Back to top"
              >
                <Globe className="h-5 w-5 rotate-90" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </footer>
    )
  }
)

_Footer.displayName = 'Footer'

export const Footer = _Footer