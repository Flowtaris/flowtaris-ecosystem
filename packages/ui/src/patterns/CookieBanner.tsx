// @flowtaris/ui - CookieBanner Pattern
// GDPR/CCPA compliant cookie consent banner with preferences

'use client'

import React, { forwardRef, useState, useEffect, useCallback } from 'react'
import { cn } from '../utils'
import { Cookie, Shield, Database, Zap, X, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '../button'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../feedback'

// ============================================
// Types
// ============================================

export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'preferences' | 'functional'

export interface CookiePreferences {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  preferences: boolean
  functional: boolean
}

export interface CookieCategoryConfig {
  id: CookieCategory
  title: string
  description: string
  icon: React.ReactNode
  required?: boolean
  cookies?: Array<{
    name: string
    purpose: string
    expiry: string
  }>
}

export interface CookieBannerProps {
  /** Cookie banner title */
  title?: string
  /** Cookie banner description */
  description?: string
  /** Cookie categories configuration */
  categories?: CookieCategoryConfig[]
  /** Default preferences */
  defaultPreferences?: Partial<CookiePreferences>
  /** Storage key */
  storageKey?: string
  /** On preferences change */
  onPreferencesChange?: (preferences: CookiePreferences) => void
  /** On accept all */
  onAcceptAll?: () => void
  /** On reject all */
  onRejectAll?: () => void
  /** Show preferences by default */
  showPreferencesDefault?: boolean
  /** Position */
  position?: 'bottom' | 'top' | 'bottom-left' | 'bottom-right'
  /** Variant */
  variant?: 'banner' | 'modal' | 'floating'
  /** Custom className */
  className?: string
  /** Custom style */
  style?: React.CSSProperties
  /** Privacy policy link */
  privacyPolicyHref?: string
  /** Terms of service link */
  termsHref?: string
  /** Cookie policy link */
  cookiePolicyHref?: string
}

// ============================================
// Default Categories
// ============================================

const DEFAULT_CATEGORIES: CookieCategoryConfig[] = [
  {
    id: 'necessary',
    title: 'Necessary',
    description: 'Required for the website to function properly. These enable core functionality like security, network management, and accessibility.',
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
    required: true,
    cookies: [
      { name: 'session_id', purpose: 'Maintains user session', expiry: 'Session' },
      { name: 'csrf_token', purpose: 'Security protection', expiry: 'Session' },
      { name: 'cookie_consent', purpose: 'Stores consent preferences', expiry: '1 year' },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Help us understand how visitors interact with our website by collecting and reporting information anonymously.',
    icon: <Database className="h-5 w-5" aria-hidden="true" />,
    cookies: [
      { name: '_ga', purpose: 'Google Analytics tracking', expiry: '2 years' },
      { name: '_gid', purpose: 'Google Analytics session', expiry: '24 hours' },
      { name: '_gat', purpose: 'Google Analytics throttle', expiry: '1 minute' },
    ],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description: 'Used to track visitors across websites to display relevant and engaging advertisements.',
    icon: <Zap className="h-5 w-5" aria-hidden="true" />,
    cookies: [
      { name: '_fbp', purpose: 'Facebook Pixel tracking', expiry: '3 months' },
      { name: 'IDE', purpose: 'Google Ads tracking', expiry: '1 year' },
    ],
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Enable the website to remember information that changes how the site behaves or looks.',
    icon: <Cookie className="h-5 w-5" aria-hidden="true" />,
    cookies: [
      { name: 'theme', purpose: 'Dark/light mode preference', expiry: '1 year' },
      { name: 'locale', purpose: 'Language preference', expiry: '1 year' },
    ],
  },
  {
    id: 'functional',
    title: 'Functional',
    description: 'Enable enhanced functionality and personalization, such as live chat, video playback, and social sharing.',
    icon: <Database className="h-5 w-5" aria-hidden="true" />,
    cookies: [
      { name: 'chat_session', purpose: 'Live chat functionality', expiry: 'Session' },
    ],
  },
]

// ============================================
// CookieBanner Component
// ============================================

const _CookieBanner = forwardRef<HTMLDivElement, CookieBannerProps>(
  (
    {
      title = 'We Value Your Privacy',
      description = 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.',
      categories = DEFAULT_CATEGORIES,
      defaultPreferences = {},
      storageKey = 'cookie-consent',
      onPreferencesChange,
      onAcceptAll,
      onRejectAll,
      showPreferencesDefault = false,
      position = 'bottom',
      variant = 'banner',
      className,
      style,
      privacyPolicyHref = '/privacy',
      termsHref = '/terms',
      cookiePolicyHref = '/cookies',
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(true)
    const [showPreferences, setShowPreferences] = useState(showPreferencesDefault)
    const [preferences, setPreferences] = useState<CookiePreferences>(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          try {
            return JSON.parse(stored)
          } catch {
            // Ignore parse errors
          }
        }
      }
      // Default: only necessary enabled
      return {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
        functional: false,
        ...defaultPreferences,
      }
    })
    const [hasConsented, setHasConsented] = useState(false)

    // Check if user has already consented
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(storageKey)
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            setPreferences(parsed)
            setHasConsented(true)
            setIsOpen(false)
          } catch {
            // Ignore
          }
        }
      }
    }, [storageKey])

    // Save preferences to localStorage
    const savePreferences = useCallback((newPrefs: CookiePreferences) => {
      setPreferences(newPrefs)
      localStorage.setItem(storageKey, JSON.stringify(newPrefs))
      onPreferencesChange?.(newPrefs)
    }, [storageKey, onPreferencesChange])

    const handleAcceptAll = () => {
      const allEnabled: CookiePreferences = {
        necessary: true,
        analytics: true,
        marketing: true,
        preferences: true,
        functional: true,
      }
      savePreferences(allEnabled)
      setHasConsented(true)
      setIsOpen(false)
      onAcceptAll?.()
    }

    const handleRejectAll = () => {
      const onlyNecessary: CookiePreferences = {
        necessary: true,
        analytics: false,
        marketing: false,
        preferences: false,
        functional: false,
      }
      savePreferences(onlyNecessary)
      setHasConsented(true)
      setIsOpen(false)
      onRejectAll?.()
    }

    const handleSavePreferences = () => {
      const newPrefs = { ...preferences, necessary: true }
      savePreferences(newPrefs)
      setHasConsented(true)
      setIsOpen(false)
      setShowPreferences(false)
    }

    const handleToggleCategory = (category: CookieCategory) => {
      if (category === 'necessary') return // Cannot disable necessary
      setPreferences((prev) => ({
        ...prev,
        [category]: !prev[category],
      }))
    }

    if (!isOpen && hasConsented) {
      return null
    }

    const POSITION_STYLES = {
      bottom: 'fixed bottom-0 left-0 right-0 z-50',
      top: 'fixed top-0 left-0 right-0 z-50',
      'bottom-left': 'fixed bottom-0 left-0 z-50 max-w-md',
      'bottom-right': 'fixed bottom-0 right-0 z-50 max-w-md',
    } as const

    const VARIANT_STYLES = {
      banner: 'w-full',
      modal: 'max-w-2xl mx-auto',
      floating: 'max-w-md',
    } as const

    if (variant === 'modal') {
      return (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-banner-title"
        >
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowPreferences(false)} aria-hidden="true" />
          <div
            ref={ref}
            className={cn(
              'relative w-full bg-white dark:bg-neutral-950 rounded-2xl shadow-2xl border border-neutral-200 dark:border-neutral-800',
              'animate-slide-up',
              VARIANT_STYLES[variant],
              className
            )}
            style={style}
          >
            <CookieBannerContent />
          </div>
        </div>
      )
    }

    return (
      <div
        ref={ref}
        className={cn(
          POSITION_STYLES[position],
          VARIANT_STYLES[variant],
          'animate-slide-up',
          className
        )}
        style={style}
        role="dialog"
        aria-modal={false}
        aria-labelledby="cookie-banner-title"
      >
        <div className={cn(
          'bg-white dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 shadow-2xl',
          variant === 'floating' && 'rounded-2xl border shadow-2xl m-4',
          variant === 'banner' && 'rounded-t-2xl'
        )}>
          <CookieBannerContent />
        </div>
      </div>
    )

    function CookieBannerContent() {
      return (
        <div className="p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-6">
            <div className="flex items-center gap-3 flex-1">
              <div className="w-12 h-12 rounded-xl bg-brand-cyan-100 dark:bg-brand-cyan-900/30 flex items-center justify-center">
                <Cookie className="h-6 w-6 text-brand-cyan-600 dark:text-brand-cyan-400" aria-hidden="true" />
              </div>
              <div>
                <h2 id="cookie-banner-title" className="text-heading-lg font-semibold text-neutral-900 dark:text-white">
                  {title}
                </h2>
                <p className="text-body-md text-neutral-600 dark:text-neutral-400 mt-1">
                  {description}
                </p>
              </div>
            </div>
            {variant !== 'modal' && (
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex-shrink-0 p-2 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Dismiss cookie banner"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            )}
          </div>

          {/* Main Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <Button
              onClick={handleAcceptAll}
              className="flex-1"
              size="lg"
            >
              Accept All
            </Button>
            <Button
              onClick={handleRejectAll}
              variant="outline"
              className="flex-1"
              size="lg"
            >
              Reject All
            </Button>
            <Button
              onClick={() => setShowPreferences(!showPreferences)}
              variant="ghost"
              className="flex-1 sm:flex-none"
              size="lg"
            >
              <span className="flex items-center justify-center gap-2">
                Preferences
                {showPreferences ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </span>
            </Button>
          </div>

          {/* Preferences Accordion */}
          <Accordion multiple className={cn('space-y-3', !showPreferences && 'hidden')}>
            {categories.map((category) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionTrigger className={cn(
                  'py-4',
                  category.required && 'bg-neutral-50 dark:bg-neutral-900/50'
                )}>
                  <div className="flex items-start gap-4 w-full">
                    <div className={cn(
                      'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                      category.id === 'necessary' && 'bg-brand-cyan-100 dark:bg-brand-cyan-900/30 text-brand-cyan-600 dark:text-brand-cyan-400',
                      category.id === 'analytics' && 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
                      category.id === 'marketing' && 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
                      category.id === 'preferences' && 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
                      category.id === 'functional' && 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
                    )} aria-hidden="true">
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-heading-sm font-medium text-neutral-900 dark:text-white">
                            {category.title}
                            {category.required && (
                              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                                Required
                              </span>
                            )}
                          </h3>
                          <p className="text-body-sm text-neutral-500 dark:text-neutral-400 mt-1">
                            {category.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleCategory(category.id)}
                          disabled={category.required}
                          className={cn(
                            'relative w-12 h-7 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
                            'flex-shrink-0',
                            preferences[category.id]
                              ? 'bg-brand-cyan-600'
                              : 'bg-neutral-300 dark:bg-neutral-700'
                          )}
                          role="switch"
                          aria-checked={preferences[category.id]}
                          aria-disabled={category.required}
                        >
                          <span className={cn(
                            'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-lg transform transition-transform',
                            preferences[category.id] ? 'translate-x-5' : 'translate-x-0.5'
                          )} aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="pb-4">
                  {category.cookies && category.cookies.length > 0 && (
                    <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800">
                      <p className="text-body-sm font-medium text-neutral-700 dark:text-neutral-300 mb-3">
                        Cookies in this category:
                      </p>
                      <div className="space-y-2 ml-10">
                        {category.cookies.map((cookie, index) => (
                          <div key={index} className="flex items-center justify-between gap-4 py-2 text-body-sm">
                            <div className="flex-1">
                              <span className="font-mono text-neutral-700 dark:text-neutral-300">{cookie.name}</span>
                              <p className="text-neutral-500 dark:text-neutral-400 mt-0.5">{cookie.purpose}</p>
                            </div>
                            <span className="text-xs text-neutral-400 dark:text-neutral-500 whitespace-nowrap">
                              Expires: {cookie.expiry}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}

            {/* Save Preferences Button */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Button
                onClick={handleSavePreferences}
                className="w-full sm:w-auto"
                size="lg"
              >
                Save Preferences
              </Button>
            </div>
          </Accordion>

          {/* Legal Links */}
          <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-body-sm text-neutral-500 dark:text-neutral-400 text-center">
              By accepting cookies, you agree to our{' '}
              <a href={privacyPolicyHref} className="underline hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400">
                Privacy Policy
              </a>{' '}
              ,{' '}
              <a href={termsHref} className="underline hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400">
                Terms of Service
              </a>{' '}
              , and{' '}
              <a href={cookiePolicyHref} className="underline hover:text-brand-cyan-600 dark:hover:text-brand-cyan-400">
                Cookie Policy
              </a>
              .
            </p>
          </div>
        </div>
      )
    }
  }
)

_CookieBanner.displayName = 'CookieBanner'

// ============================================
// Exports
// ============================================

export const CookieBanner = _CookieBanner