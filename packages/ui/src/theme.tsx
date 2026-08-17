// @flowtaris/ui - Theme System
// Theme provider, dark/light mode, and design token integration

'use client'

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  forwardRef,
} from 'react'
import { cn } from './utils'

// ============================================
// Types
// ============================================

export type ThemeMode = 'light' | 'dark' | 'system'

export interface ThemeContextValue {
  /** Current resolved theme */
  theme: 'light' | 'dark'
  /** User preference (light/dark/system) */
  mode: ThemeMode
  /** Set user preference */
  setMode: (mode: ThemeMode) => void
  /** Toggle between light/dark */
  toggleTheme: () => void
  /** Resolved theme matches system */
  isSystem: boolean
  /** Forced theme (for SSR hydration) */
  forcedTheme?: 'light' | 'dark'
}

export interface ThemeProviderProps {
  /** Children */
  children: ReactNode
  /** Default theme mode */
  defaultMode?: ThemeMode
  /** Storage key for persistence */
  storageKey?: string
  /** Enable system theme detection */
  enableSystem?: boolean
  /** Disable CSS transitions during theme change */
  disableTransition?: boolean
  /** Attribute on HTML element */
  attribute?: 'class' | 'data-theme'
  /** Root element selector */
  rootSelector?: string
  /** Callback on theme change */
  onThemeChange?: (theme: 'light' | 'dark') => void
}

export interface ThemeToggleProps {
  /** Button size */
  size?: 'sm' | 'md' | 'lg'
  /** Show labels */
  showLabels?: boolean
  /** Custom labels */
  labels?: { light: string; dark: string; system: string }
  /** CSS class */
  className?: string
  /** Variant */
  variant?: 'button' | 'dropdown'
}

export interface CSSVariablesOptions {
  /** Prefix for CSS variables */
  prefix?: string
  /** Include color variables */
  colors?: boolean
  /** Include spacing variables */
  spacing?: boolean
  /** Include typography variables */
  typography?: boolean
  /** Include radius variables */
  radius?: boolean
  /** Include shadow variables */
  shadows?: boolean
}

// ============================================
// Theme Context
// ============================================

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

/**
 * useTheme - Access theme context
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

// ============================================
// Theme Provider
// ============================================

/**
 * ThemeProvider - Manages theme state and applies to document
 */
export function ThemeProvider({
  children,
  defaultMode = 'system',
  storageKey = 'flowtaris-theme',
  enableSystem = true,
  disableTransition = false,
  attribute = 'class',
  rootSelector = 'html',
  onThemeChange,
}: ThemeProviderProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode)
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)
  const [forceTheme, setForceTheme] = useState<'light' | 'dark' | undefined>()

  // Get system preference
  const getSystemTheme = useCallback((): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }, [])

  // Resolve theme based on mode
  const resolveTheme = useCallback(
    (currentMode: ThemeMode): 'light' | 'dark' => {
      if (currentMode === 'system') {
        return enableSystem ? getSystemTheme() : 'light'
      }
      return currentMode
    },
    [enableSystem, getSystemTheme]
  )

  // Apply theme to document
  const applyTheme = useCallback(
    (theme: 'light' | 'dark') => {
      if (typeof document === 'undefined') return

      const root = document.querySelector(rootSelector) as HTMLElement | null
      if (!root) return

      if (disableTransition) {
        root.style.setProperty('--theme-transition', 'none')
      }

      if (attribute === 'class') {
        root.classList.remove('light', 'dark')
        root.classList.add(theme)
      } else {
        root.setAttribute('data-theme', theme)
      }

      // Set color-scheme for native form controls
      root.style.colorScheme = theme

      // Restore transitions
      if (disableTransition) {
        requestAnimationFrame(() => {
          root.style.removeProperty('--theme-transition')
        })
      }
    },
    [attribute, rootSelector, disableTransition]
  )

  // Initialize from storage
  useEffect(() => {
    if (typeof window === 'undefined') return

    setMounted(true)

    // Read from localStorage
    try {
      const stored = window.localStorage.getItem(storageKey)
      if (stored && ['light', 'dark', 'system'].includes(stored)) {
        setMode(stored as ThemeMode)
      }
    } catch {
      // Ignore storage errors
    }

    // Apply initial theme
    const initialTheme = resolveTheme(mode)
    setResolvedTheme(initialTheme)
    applyTheme(initialTheme)
    if (forceTheme) setForceTheme(initialTheme)
  }, [storageKey, resolveTheme, applyTheme, mode, forceTheme])

  // Listen for system theme changes
  useEffect(() => {
    if (!enableSystem || typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (mode === 'system') {
        const newTheme = getSystemTheme()
        setResolvedTheme(newTheme)
        applyTheme(newTheme)
        onThemeChange?.(newTheme)
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [enableSystem, mode, getSystemTheme, applyTheme, onThemeChange])

  // Update theme when mode changes
  useEffect(() => {
    if (!mounted) return

    const newTheme = resolveTheme(mode)
    setResolvedTheme(newTheme)
    applyTheme(newTheme)
    onThemeChange?.(newTheme)

    // Persist to localStorage
    try {
      window.localStorage.setItem(storageKey, mode)
    } catch {
      // Ignore storage errors
    }
  }, [mode, mounted, resolveTheme, applyTheme, storageKey, onThemeChange])

  // Toggle theme
  const toggleTheme = useCallback(() => {
    setMode((current) =>
      current === 'light' ? 'dark' : current === 'dark' ? 'system' : 'light'
    )
  }, [])

  // Set mode with validation
  const setModeSafe = useCallback(
    (newMode: ThemeMode) => {
      if (['light', 'dark', 'system'].includes(newMode)) {
        setMode(newMode)
      }
    },
    []
  )

  // During SSR/hydration, avoid flash by rendering nothing until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{
          theme: resolvedTheme,
          mode,
          setMode: setModeSafe,
          toggleTheme,
          isSystem: mode === 'system',
          forcedTheme: forceTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: resolvedTheme,
        mode,
        setMode: setModeSafe,
        toggleTheme,
        isSystem: mode === 'system',
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

// ============================================
// Theme Toggle Button
// ============================================

/**
 * ThemeToggle - Button to cycle through theme modes
 */
export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      size = 'md',
      showLabels = false,
      labels = { light: 'Light', dark: 'Dark', system: 'System' },
      className,
      variant = 'button',
    },
    ref
  ) => {
    const { theme, mode, toggleTheme } = useTheme()

    const SIZE_CLASSES: Record<'sm' | 'md' | 'lg', string> = {
      sm: 'h-8 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-12 px-4 text-base',
    }

    if (variant === 'dropdown') {
      return (
        <div className="relative inline-block" role="group" aria-label="Theme selector">
          <button
            ref={ref}
            type="button"
            onClick={toggleTheme}
            className={cn(
              'inline-flex items-center gap-2 rounded-lg border border-neutral-300 dark:border-neutral-700',
              'bg-white dark:bg-neutral-900',
              'hover:bg-neutral-50 dark:hover:bg-neutral-800',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
              'transition-colors duration-150',
              SIZE_CLASSES[size],
              className
            )}
            aria-expanded={false}
            aria-haspopup="listbox"
          >
            <ThemeIcon theme={theme} size={size} />
            {showLabels && <span>{labels[mode]}</span>}
            <ChevronDownIcon size={size} />
          </button>
        </div>
      )
    }

    return (
      <button
        ref={ref}
        type="button"
        onClick={toggleTheme}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-lg',
          'border border-neutral-300 dark:border-neutral-700',
          'bg-white dark:bg-neutral-900',
          'hover:bg-neutral-50 dark:hover:bg-neutral-800',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan-500',
          'transition-colors duration-150',
          SIZE_CLASSES[size],
          className
        )}
        aria-label={`Current theme: ${labels[mode]}. Click to change.`}
        title={`Current: ${labels[mode]}`}
      >
        <ThemeIcon theme={theme} size={size} />
        {showLabels && <span>{labels[mode]}</span>}
      </button>
    )
  }
)

ThemeToggle.displayName = 'ThemeToggle'

// Theme Icon Component
function ThemeIcon({ theme, size }: { theme: 'light' | 'dark'; size: 'sm' | 'md' | 'lg' }) {
  const ICON_SIZES: Record<'sm' | 'md' | 'lg', string> = { sm: 'h-4 w-4', md: 'h-5 w-5', lg: 'h-6 w-6' }

  if (theme === 'dark') {
    return (
      <svg
        className={ICON_SIZES[size]}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    )
  }

  return (
    <svg
      className={ICON_SIZES[size]}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function ChevronDownIcon({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const ICON_SIZES: Record<'sm' | 'md' | 'lg', string> = { sm: 'h-3 w-3', md: 'h-4 w-4', lg: 'h-5 w-5' }
  return (
    <svg className={ICON_SIZES[size]} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
    </svg>
  )
}

// ============================================
// CSS Variables Hook
// ============================================

/**
 * useCSSVariables - Generate CSS custom properties from design tokens
 */
export function useCSSVariables(options: CSSVariablesOptions = {}) {
  const { theme: _theme } = useTheme()

  return useMemo(() => {
    const vars: Record<string, string> = {}
    const _prefix = options.prefix || '--'

    // Color tokens would be imported from your token system
    // This is a template - actual tokens come from @repo/ui/tokens
    if (options.colors !== false) {
      // These would be overridden by the actual token values from globals.css
      // The @theme directive in Tailwind handles this automatically
    }

    return vars
  }, [options])
}

// ============================================
// Theme-aware Style Helpers
// ============================================

/**
 * themeStyles - Conditional styles based on theme (pass theme explicitly)
 */
export function themeStyles<T extends Record<string, string>>(
  light: T,
  dark: T,
  theme: 'light' | 'dark'
): T {
  return theme === 'dark' ? dark : light
}

/**
 * createThemeStyles - Create theme-aware style object factory (pass theme explicitly)
 */
export function createThemeStyles<T extends Record<string, string>>(
  light: T,
  dark: T
): (theme: 'light' | 'dark') => T {
  return (theme: 'light' | 'dark') => (theme === 'dark' ? dark : light)
}

// ============================================
// Server-side Theme Detection (for Next.js)
// ============================================

/**
 * getThemeFromHeaders - Extract theme from request headers (Next.js middleware)
 */
export function getThemeFromHeaders(
  headers: Headers | Record<string, string>,
  storageKey = 'flowtaris-theme'
): ThemeMode {
  // Check cookie first
  const cookieHeader = headers instanceof Headers
    ? headers.get('cookie') || ''
    : (headers['cookie'] as string) || ''
  const themeCookie = cookieHeader
    .split(';')
    .map((c: string) => c.trim())
    .find((c: string) => c.startsWith(`${storageKey}=`))
  if (themeCookie) {
    const parts = themeCookie.split('=')
    const value = parts[1]
    if (value && ['light', 'dark', 'system'].includes(value)) {
      return value as ThemeMode
    }
  }

  // Check Accept-CH or Sec-CH-Prefers-Color-Scheme
  const colorScheme = headers instanceof Headers
    ? headers.get('sec-ch-prefers-color-scheme') || ''
    : (headers['sec-ch-prefers-color-scheme'] as string) || ''
  if (colorScheme === 'dark') return 'dark'
  if (colorScheme === 'light') return 'light'

  return 'system'
}

/**
 * ThemeScript - Client-side script for immediate theme application (prevents flash)
 * Place in <head> before any content
 */
export function ThemeScript({
  storageKey = 'flowtaris-theme',
  attribute = 'class',
  rootSelector = 'html',
}: {
  storageKey?: string
  attribute?: 'class' | 'data-theme'
  rootSelector?: string
}) {
  if (typeof window !== 'undefined') return null

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var theme = localStorage.getItem('${storageKey}') || 'system';
              var root = document.querySelector('${rootSelector}');
              if (!root) return;
              var resolved = theme;
              if (theme === 'system') {
                resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              if ('${attribute}' === 'class') {
                root.classList.remove('light', 'dark');
                root.classList.add(resolved);
              } else {
                root.setAttribute('data-theme', resolved);
              }
              root.style.colorScheme = resolved;
            } catch (e) {}
          })();
        `,
      }}
    />
  )
}