// @flowtaris/ui - Utility Functions
// Class name merging and other utilities

import { type ClassValue } from 'clsx'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ===== CLASS NAME MERGER =====
// Combines clsx for conditional classes with tailwind-merge for deduplication
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

// ===== FORMATTERS =====
export function formatNumber(num: number, options?: Intl.NumberFormatOptions): string {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
    ...options,
  }).format(num)
}

export function formatCurrency(
  amount: number,
  currency = 'USD',
  options?: Intl.NumberFormatOptions
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 0,
    ...options,
  }).format(amount)
}

export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  return `${hours}h ${minutes}m`
}

// ===== ID GENERATORS =====
export function generateId(prefix = 'flowtaris'): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`
}

export function generateIds(count: number, prefix = 'flowtaris'): string[] {
  return Array.from({ length: count }, () => generateId(prefix))
}

// ===== DEBOUNCE / THROTTLE =====
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// ===== MEDIA QUERY HELPERS =====
export function matchesMedia(query: string): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia(query).matches
}

export function useMediaQuery(query: string): boolean {
  // This would be a React hook - placeholder for client-side usage
  // Actual implementation would use useEffect and useState
  return matchesMedia(query)
}

// ===== ANIMATION HELPERS =====
export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

export function easeOutExpo(t: number): number {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
}

export function staggerDelay(index: number, baseDelay = 0.1): number {
  return index * baseDelay
}

// ===== COLOR HELPERS =====
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return null
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')
}

export function withOpacity(color: string, opacity: number): string {
  const rgb = hexToRgb(color)
  if (!rgb) return color
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`
}

// ===== OBJECT HELPERS =====
export function omit<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const result = { ...obj }
  keys.forEach((key) => delete result[key])
  return result
}

export function pick<T extends Record<string, unknown>, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const result = {} as Pick<T, K>
  keys.forEach((key) => {
    if (key in obj) result[key] = obj[key]
  })
  return result
}

// ===== ARRAY HELPERS =====
export function unique<T>(arr: T[]): T[] {
  return [...new Set(arr)]
}

export function groupBy<T>(arr: T[], key: keyof T): Record<string, T[]> {
  return arr.reduce((acc, item) => {
    const group = String(item[key])
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, T[]>)
}

export function sortBy<T>(arr: T[], key: keyof T, direction: 'asc' | 'desc' = 'asc'): T[] {
  return [...arr].sort((a, b) => {
    const aVal = a[key]
    const bVal = b[key]
    if (aVal < bVal) return direction === 'asc' ? -1 : 1
    if (aVal > bVal) return direction === 'asc' ? 1 : -1
    return 0
  })
}

// ===== TYPE GUARDS =====
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined
}

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.length > 0
}

export function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    !(value instanceof Date) &&
    Object.prototype.toString.call(value) === '[object Object]'
  )
}

// ===== SSR HELPERS =====
export function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function isServer(): boolean {
  return !isBrowser()
}

// ===== STORAGE HELPERS =====
export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (isServer()) return defaultValue
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch {
    return defaultValue
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (isServer()) return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Silently fail
  }
}