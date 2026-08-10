// @flowtaris/ui - Design Tokens: Main Export
// Unified theme object combining all tokens

export * from './colors'
export * from './spacing'
export * from './typography'
export * from './motion'
export * from './shadows'
export * from './z-index'
export * from './breakpoints'

// ===== UNIFIED THEME OBJECT =====
import { colors } from './colors'
import { spacing, space, fluidSpacing, negativeSpacing } from './spacing'
import { typography } from './typography'
import { motion, motionPresets } from './motion'
import { shadows } from './shadows'
import { zIndex } from './z-index'
import { breakpoints } from './breakpoints'

export const theme = {
  colors,
  spacing,
  space,
  fluidSpacing,
  negativeSpacing,
  typography,
  motion,
  motionPresets,
  shadows,
  zIndex,
  breakpoints,
} as const

// ===== CSS VARIABLE GENERATOR =====
// Generates CSS custom properties from theme for runtime theming
export function generateCssVariables(prefix = 'flowtaris'): Record<string, string> {
  const cssVars: Record<string, string> = {}

  // Colors
  Object.entries(colors.brand).forEach(([scale, values]) => {
    Object.entries(values).forEach(([shade, value]) => {
      cssVars[`--${prefix}-brand-${scale}-${shade}`] = value
    })
  })

  Object.entries(colors.semantic).forEach(([name, values]) => {
    Object.entries(values).forEach(([shade, value]) => {
      cssVars[`--${prefix}-semantic-${name}-${shade}`] = value
    })
  })

  Object.entries(colors.neutral).forEach(([shade, value]) => {
    cssVars[`--${prefix}-neutral-${shade}`] = value
  })

  Object.entries(colors.surface).forEach(([layer, value]) => {
    cssVars[`--${prefix}-surface-${layer}`] = value
  })

  Object.entries(colors.text).forEach(([name, value]) => {
    cssVars[`--${prefix}-text-${name}`] = value
  })

  Object.entries(colors.border).forEach(([name, value]) => {
    cssVars[`--${prefix}-border-${name}`] = value
  })

  // Data viz categorical
  colors.dataViz.categorical.forEach((color, index) => {
    cssVars[`--${prefix}-dataviz-categorical-${index}`] = color
  })

  // Spacing
  Object.entries(spacing).forEach(([key, value]) => {
    if (typeof value === 'string' || typeof value === 'number') {
      cssVars[`--${prefix}-space-${key}`] = String(value)
    }
  })

  // Typography
  Object.entries(typography.fontFamily).forEach(([name, value]) => {
    cssVars[`--${prefix}-font-${name}`] = value
  })

  Object.entries(typography.fontWeight).forEach(([name, value]) => {
    cssVars[`--${prefix}-font-weight-${name}`] = String(value)
  })

  Object.entries(typography.lineHeight).forEach(([name, value]) => {
    cssVars[`--${prefix}-line-height-${name}`] = String(value)
  })

  Object.entries(typography.letterSpacing).forEach(([name, value]) => {
    cssVars[`--${prefix}-letter-spacing-${name}`] = value
  })

  Object.entries(typography.fontSize).forEach(([name, value]) => {
    cssVars[`--${prefix}-font-size-${name}`] = value
  })

  // Motion
  Object.entries(motion.duration).forEach(([name, value]) => {
    cssVars[`--${prefix}-duration-${name}`] = `${value}ms`
  })

  Object.entries(motion.easing).forEach(([name, value]) => {
    if (typeof value === 'string') {
      cssVars[`--${prefix}-easing-${name}`] = value
    }
  })

  // Shadows
  Object.entries(shadows.layer).forEach(([layer, value]) => {
    cssVars[`--${prefix}-shadow-layer-${layer}`] = value
  })

  Object.entries(shadows.semantic).forEach(([name, value]) => {
    cssVars[`--${prefix}-shadow-${name}`] = value
  })

  // Z-index
  Object.entries(zIndex.semantic).forEach(([name, value]) => {
    cssVars[`--${prefix}-z-${name}`] = String(value)
  })

  // Breakpoints
  Object.entries(breakpoints.values).forEach(([name, value]) => {
    cssVars[`--${prefix}-bp-${name}`] = `${value}px`
  })

  return cssVars
}

// ===== CSS VARIABLES STRING (for injection) =====
export function generateCssVariablesString(prefix = 'flowtaris'): string {
  const vars = generateCssVariables(prefix)
  return Object.entries(vars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n')
}

// ===== THEME TYPES =====
export type Theme = typeof theme
export type Colors = typeof colors
export type Spacing = typeof spacing
export type Typography = typeof typography
export type Motion = typeof motion
export type Shadows = typeof shadows
export type ZIndex = typeof zIndex
export type Breakpoints = typeof breakpoints

// ===== DEFAULT EXPORT =====
export default theme