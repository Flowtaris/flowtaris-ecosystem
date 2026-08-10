// @flowtaris/ui - Design Tokens: Breakpoints
// Responsive breakpoints with fluid typography and spacing
// Mobile-first approach with container queries support

// ===== BREAKPOINT VALUES (px) =====
// Mobile-first: min-width queries
export const breakpointValues = {
  // Extra small mobile
  xs: 320,
  // Small mobile
  sm: 480,
  // Mobile landscape / small tablet
  md: 640,
  // Tablet portrait
  lg: 768,
  // Tablet landscape / small desktop
  xl: 1024,
  // Desktop
  '2xl': 1280,
  // Large desktop
  '3xl': 1440,
  // Extra large desktop / 4K
  '4xl': 1920,
  // Ultra wide
  '5xl': 2560,
} as const

export type Breakpoint = keyof typeof breakpointValues

// ===== CSS MEDIA QUERIES =====
// Ready-to-use media query strings
export const breakpointMedia = {
  // Min-width (mobile-first)
  xs: '@media (min-width: 320px)',
  sm: '@media (min-width: 480px)',
  md: '@media (min-width: 640px)',
  lg: '@media (min-width: 768px)',
  xl: '@media (min-width: 1024px)',
  '2xl': '@media (min-width: 1280px)',
  '3xl': '@media (min-width: 1440px)',
  '4xl': '@media (min-width: 1920px)',
  '5xl': '@media (min-width: 2560px)',

  // Max-width (desktop-first, for overrides)
  maxXs: '@media (max-width: 319px)',
  maxSm: '@media (max-width: 479px)',
  maxMd: '@media (max-width: 639px)',
  maxLg: '@media (max-width: 767px)',
  maxXl: '@media (max-width: 1023px)',
  max2xl: '@media (max-width: 1279px)',
  max3xl: '@media (max-width: 1439px)',
  max4xl: '@media (max-width: 1919px)',

  // Range queries
  onlySm: '@media (min-width: 480px) and (max-width: 639px)',
  onlyMd: '@media (min-width: 640px) and (max-width: 767px)',
  onlyLg: '@media (min-width: 768px) and (max-width: 1023px)',
  onlyXl: '@media (min-width: 1024px) and (max-width: 1279px)',
  only2xl: '@media (min-width: 1280px) and (max-width: 1439px)',
  only3xl: '@media (min-width: 1440px) and (max-width: 1919px)',
  only4xl: '@media (min-width: 1920px) and (max-width: 2559px)',

  // Common combinations
  mobile: '@media (max-width: 767px)',
  tablet: '@media (min-width: 768px) and (max-width: 1023px)',
  desktop: '@media (min-width: 1024px)',
  wide: '@media (min-width: 1440px)',
  ultraWide: '@media (min-width: 1920px)',

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
  // Container query breakpoints (based on container width)
  xs: '@container (min-width: 320px)',
  sm: '@container (min-width: 480px)',
  md: '@container (min-width: 640px)',
  lg: '@container (min-width: 768px)',
  xl: '@container (min-width: 1024px)',
  '2xl': '@container (min-width: 1280px)',
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
  steps: [320, 480, 640, 768, 1024, 1280, 1440, 1920],
} as const

// ===== CONTAINER MAX WIDTHS =====
// Max-width for content containers at each breakpoint
export const containerMaxWidth = {
  xs: '100%',
  sm: '440px',
  md: '600px',
  lg: '728px',
  xl: '984px',
  '2xl': '1240px',
  '3xl': '1380px',
  '4xl': '1600px',
  '5xl': '2000px',
} as const

// ===== GRID BREAKPOINTS =====
// Column counts for grid layouts at each breakpoint
export const gridColumns = {
  xs: 1,
  sm: 2,
  md: 2,
  lg: 3,
  xl: 4,
  '2xl': 4,
  '3xl': 5,
  '4xl': 6,
  '5xl': 6,
} as const

// ===== SPACING BREAKPOINTS =====
// Section spacing at each breakpoint
export const sectionSpacing = {
  xs: '3rem',   // 48px
  sm: '4rem',   // 64px
  md: '5rem',   // 80px
  lg: '6rem',   // 96px
  xl: '7rem',   // 112px
  '2xl': '8rem', // 128px
  '3xl': '9rem', // 144px
  '4xl': '10rem', // 160px
} as const

// ===== ICON SIZES PER BREAKPOINT =====
export const iconSize = {
  xs: '1.25rem',  // 20px
  sm: '1.5rem',   // 24px
  md: '1.75rem',  // 28px
  lg: '2rem',     // 32px
  xl: '2.25rem',  // 36px
  '2xl': '2.5rem', // 40px
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
    if (index === 0) return '@media (max-width: 319px)'
    const prevKey = keys[index - 1]
    const prevValue = breakpointValues[prevKey as Breakpoint]
    return `@media (max-width: ${(prevValue ?? 320) - 1}px)`
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
  xs: '320px',
  sm: '480px',
  md: '640px',
  lg: '768px',
  xl: '1024px',
  '2xl': '1280px',
  '3xl': '1440px',
  '4xl': '1920px',
  '5xl': '2560px',
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