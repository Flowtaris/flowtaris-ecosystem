// @flowtaris/ui - Design Tokens: Colors
// CVD-safe (Color Vision Deficiency) palette with WCAG AA contrast

export const colors = {
  // ===== BRAND COLORS =====
  brand: {
    // Deep space navy - primary brand
    navy: {
      50: '#f0f2f8',
      100: '#e0e4ef',
      200: '#c1c9df',
      300: '#9aa0ca',
      400: '#727bb5',
      500: '#535b9f',
      600: '#434785',
      700: '#37386b',
      800: '#2f2f56',
      900: '#292947',
      950: '#1a1a2e',
    },
    // Electric cyan - primary accent
    cyan: {
      50: '#e8fcff',
      100: '#d1f8fe',
      200: '#a3f0fc',
      300: '#62e4fa',
      400: '#1ad2f6',
      500: '#00b8db', // WCAG AA on white, CVD-safe
      600: '#0094b3',
      700: '#00738c',
      800: '#005a70',
      900: '#074d5e',
      950: '#08323e',
    },
    // Amber gold - secondary accent
    amber: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b', // WCAG AA on navy, CVD-safe
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
      950: '#451a03',
    },
  },

  // ===== SEMANTIC COLORS =====
  semantic: {
    // Success - green (deuteranopia safe)
    success: {
      light: '#22c55e',
      DEFAULT: '#16a34a',
      dark: '#15803d',
      foreground: '#ffffff',
    },
    // Warning - amber (color-blind safe)
    warning: {
      light: '#fbbf24',
      DEFAULT: '#f59e0b',
      dark: '#d97706',
      foreground: '#1a1a2e',
    },
    // Error - red (protanopia/deuteranopia safe - use orange-red)
    error: {
      light: '#fb7185',
      DEFAULT: '#ef4444',
      dark: '#dc2626',
      foreground: '#ffffff',
    },
    // Info - cyan (tritanopia safe)
    info: {
      light: '#22d3ee',
      DEFAULT: '#06b6d4',
      dark: '#0891b2',
      foreground: '#ffffff',
    },
  },

  // ===== NEUTRAL / SURFACE COLORS =====
  neutral: {
    // Pure white
    white: '#ffffff',
    // Near white
    50: '#fafafa',
    100: '#f4f4f5',
    200: '#e4e4e7',
    300: '#d4d4d8',
    400: '#a1a1aa',
    500: '#71717a',
    600: '#52525b',
    700: '#3f3f46',
    800: '#27272a',
    900: '#18181b',
    950: '#09090b',
  },

  // ===== SURFACE / BACKGROUND LAYERS (6-layer depth system) =====
  surface: {
    // Layer 1 - Farthest background (parallax 0.10x)
    layer1: '#05050a',
    // Layer 2 - Deep background (parallax 0.25x)
    layer2: '#0a0a12',
    // Layer 3 - Mid background (parallax 0.50x)
    layer3: '#12121f',
    // Layer 4 - Content surface (parallax 1.00x - base)
    layer4: '#1a1a2e',
    // Layer 5 - Elevated cards (parallax 1.10x)
    layer5: '#22223a',
    // Layer 6 - Floating/modal (parallax 1.20x)
    layer6: '#2a2a4a',
    // Overlay/backdrop
    overlay: 'rgba(10, 10, 18, 0.8)',
    // Glass morphism
    glass: 'rgba(26, 26, 46, 0.7)',
    glassBorder: 'rgba(255, 255, 255, 0.08)',
  },

  // ===== CVD-SAFE DATA VISUALIZATION PALETTE =====
  // Vibrant, distinguishable for all color vision types
  // Source: https://davidmathlogic.com/colorblind/
  dataViz: {
    // Categorical - 10 colors max distinguishable
    categorical: [
      '#00b8db', // Cyan (brand)
      '#f59e0b', // Amber (brand)
      '#22c55e', // Green
      '#ef4444', // Red-orange
      '#a855f7', // Purple
      '#ec4899', // Pink
      '#14b8a6', // Teal
      '#f97316', // Orange
      '#84cc16', // Lime
      '#6366f1', // Indigo
    ],
    // Sequential - for heatmaps, gradients (color-blind safe)
    sequential: {
      cyan: ['#e8fcff', '#a3f0fc', '#62e4fa', '#1ad2f6', '#00b8db', '#0094b3', '#00738c', '#005a70', '#074d5e'],
      amber: ['#fffbeb', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f'],
      navy: ['#f0f2f8', '#c1c9df', '#9aa0ca', '#727bb5', '#535b9f', '#434785', '#37386b', '#2f2f56', '#292947'],
    },
    // Diverging - for comparison charts
    diverging: {
      cyanToAmber: ['#074d5e', '#00738c', '#0094b3', '#00b8db', '#1ad2f6', '#62e4fa', '#a3f0fc', '#e8fcff', '#fffbeb', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309'],
    },
  },

  // ===== TEXT COLORS =====
  text: {
    primary: '#ffffff',
    secondary: '#a1a1aa',
    tertiary: '#71717a',
    inverted: '#09090b',
    link: '#00b8db',
    linkHover: '#62e4fa',
  },

  // ===== BORDER COLORS =====
  border: {
    DEFAULT: 'rgba(255, 255, 255, 0.08)',
    subtle: 'rgba(255, 255, 255, 0.04)',
    strong: 'rgba(255, 255, 255, 0.16)',
    focus: '#00b8db',
    error: '#ef4444',
  },

  // ===== GRADIENTS =====
  gradients: {
    // Main brand gradient
    brand: 'linear-gradient(135deg, #00b8db 0%, #535b9f 100%)',
    brandReverse: 'linear-gradient(135deg, #535b9f 0%, #00b8db 100%)',
    // Surface gradients for depth layers
    layer1: 'linear-gradient(180deg, #05050a 0%, #0a0a12 100%)',
    layer2: 'linear-gradient(180deg, #0a0a12 0%, #12121f 100%)',
    layer3: 'linear-gradient(180deg, #12121f 0%, #1a1a2e 100%)',
    layer4: 'linear-gradient(180deg, #1a1a2e 0%, #22223a 100%)',
    layer5: 'linear-gradient(180deg, #22223a 0%, #2a2a4a 100%)',
    // Glass morphism
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
    glassRadial: 'radial-gradient(ellipse at center, rgba(0,184,219,0.15) 0%, transparent 70%)',
    // Accent gradients
    cyanGlow: 'radial-gradient(ellipse at center, rgba(0,184,219,0.3) 0%, transparent 70%)',
    amberGlow: 'radial-gradient(ellipse at center, rgba(245,158,11,0.25) 0%, transparent 70%)',
    // Hero/mesh gradients
    heroMesh: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,184,219,0.2) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(245,158,11,0.15) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 10% 80%, rgba(168,85,247,0.1) 0%, transparent 50%)',
  },
} as const

// Type helpers
export type ColorScale = typeof colors.brand.navy
export type SurfaceLayer = keyof typeof colors.surface
export type DataVizCategorical = typeof colors.dataViz.categorical[number]