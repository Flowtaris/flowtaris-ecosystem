// @flowtaris/ui - Design Tokens: Breakpoints
// Responsive breakpoints with fluid typography and spacing
// Mobile-first approach with container queries support

// ===== BREAKPOINT VALUES (px) =====
// Mobile-first: min-width queries
export const breakpointValues = {
  // Mobile
  sm: 640,
  // Tablet
  md: 768,
  // Desktop
  lg: 1024,
  // Wide desktop
  xl: 1280,
} as const

export type Breakpoint = keyof typeof breakpointValues

// ===== CSS MEDIA QUERIES =====
// Ready-to-use media query strings
export const breakpointMedia = {
  // Min-width (mobile-first)
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)',

  // Max-width (desktop-first, for overrides)
  maxSm: '@media (max-width: 639px)',
  maxMd: '@media (max-width: 767px)',
  maxLg: '@media (max-width: 1023px)',

  // Range queries
  onlySm: '@media (min-width: 640px) and (max-width: 767px)',
  onlyMd: '@media (min-width: 768px) and (max-width: 1023px)',
  onlyLg: '@media (min-width: 1024px) and (max-width: 1279px)',

  // Common combinations
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
  wide: '@media (min-width: 1280px)',

  // Touch/pointer capabilities
  hover: '@media (hover: hover) and (pointer: fine)',
  touch: '@media (hover: none) and (pointer: coarse)',
  coarse: '@media (pointer: coarse)',
  fine: '@media (pointer: fine)',

  // Reduced motion
  reducedMotion: '@media (prefers-reduced-motion: reduce)',
  noReducedMotion: '@media (prefers-reduced-motion: no-preference)',

  // Color scheme
  dark: '@media (prefers-color-scheme: dark)',
  light: '@media (prefers-color-scheme: light)',

  // High contrast
  highContrast: '@media (prefers-contrast: more)',
  forcedColors: '@media (forced-colors: active)',

  // Orientation
  portrait: '@media (orientation: portrait)',
  landscape: '@media (orientation: landscape)',

  // Print
  print: '@media print',
} as const

export type BreakpointMedia = keyof typeof breakpointMedia

// ===== CONTAINER QUERIES =====
// For component-level responsive design
export const containerQueries = {
  sm: '@container (min-width: 640px)',
  md: '@container (min-width: 768px)',
  lg: '@container (min-width: 1024px)',
  xl: '@container (min-width: 1280px)',
} as const

export type ContainerBreakpoint = keyof typeof containerQueries

// ===== FLUID TYPE BREAKPOINTS =====
// Used by fluid typography clamp() functions
export const fluidBreakpoints = {
  // Minimum viewport width for fluid scaling
  min: 320,
  // Maximum viewport width for fluid scaling
  max: 1920,
  // Breakpoints where fluid behavior changes
  steps: [640, 768, 1024, 1280],
} as const

// ===== CONTAINER MAX WIDTHS =====
// Max-width for content containers at each breakpoint
export const containerMaxWidth = {
  sm: '600px',
  md: '728px',
  lg: '984px',
  xl: '1240px',
} as const

// ===== GRID BREAKPOINTS =====
// Column counts for grid layouts at each breakpoint
export const gridColumns = {
  sm: 2,
  md: 3,
  lg: 4,
  xl: 4,
} as const

// ===== SPACING BREAKPOINTS =====
// Section spacing at each breakpoint
export const sectionSpacing = {
  sm: '4rem',   // 64px
  md: '5rem',   // 80px
  lg: '6rem',   // 96px
  xl: '7rem',   // 112px
} as const

// ===== ICON SIZES PER BREAKPOINT =====
export const iconSize = {
  sm: '1.5rem',   // 24px
  md: '1.75rem',  // 28px
  lg: '2rem',     // 32px
  xl: '2.25rem',  // 36px
} as const

// ===== TOUCH TARGET SIZES =====
// Minimum touch target sizes
export const touchTarget = {
  minimum: '44px',  // iOS HIG
  comfortable: '48px', // Material Design
  generous: '56px',
} as const

// ===== UTILITY FUNCTIONS =====
export const breakpointUtils = {
  // Get min-width media query
  up: (bp: Breakpoint) => `@media (min-width: ${breakpointValues[bp]}px)`,
  // Get max-width media query
  down: (bp: Breakpoint) => {
    const keys = Object.keys(breakpointValues) as Breakpoint[]
    const index = keys.indexOf(bp)
    if (index === 0) return '@media (max-width: 639px)'
    const prevKey = keys[index - 1]
    const prevValue = breakpointValues[prevKey as Breakpoint]
    return `@media (max-width: ${(prevValue ?? 640) - 1}px)`
  },
  // Get range media query
  between: (min: Breakpoint, max: Breakpoint) =>
    `@media (min-width: ${breakpointValues[min]}px) and (max-width: ${breakpointValues[max] - 1}px)`,
  // Get container query
  containerUp: (bp: ContainerBreakpoint) => containerQueries[bp],
  // Check if breakpoint is mobile
  isMobile: (bp: Breakpoint) => breakpointValues[bp] < 768,
  // Check if breakpoint is tablet
  isTablet: (bp: Breakpoint) => breakpointValues[bp] >= 768 && breakpointValues[bp] < 1024,
  // Check if breakpoint is desktop
  isDesktop: (bp: Breakpoint) => breakpointValues[bp] >= 1024,
  // Get container max width
  getContainerMaxWidth: (bp: keyof typeof containerMaxWidth) => containerMaxWidth[bp],
  // Get grid columns
  getGridColumns: (bp: keyof typeof gridColumns) => gridColumns[bp],
} as const

// ===== TAILWIND CONFIG COMPATIBLE EXPORT =====
// For direct use in tailwind.config.ts
export const tailwindBreakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
} as const

// ===== UNIFIED BREAKPOINTS OBJECT (for backwards compatibility) =====
export const breakpoints = {
  values: breakpointValues,
  media: breakpointMedia,
  container: containerQueries,
  fluid: fluidBreakpoints,
  containerMaxWidth,
  gridColumns,
  sectionSpacing,
  iconSize,
  touchTarget,
  utils: breakpointUtils,
} as const