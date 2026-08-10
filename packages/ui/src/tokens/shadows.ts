// @flowtaris/ui - Design Tokens: Shadows
// Layered shadow system for 6-layer depth
// Includes glow effects for cyan/amber brand accents

export const shadows = {
  // ===== BASE SHADOW LAYERS (matching 6-layer depth) =====
  // Each layer gets progressively more elevated
  layer: {
    // Layer 1 - Base content (subtle)
    1: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
    // Layer 2 - Slightly elevated
    2: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
    // Layer 3 - Cards, default elevation
    3: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    // Layer 4 - Elevated cards, dropdowns
    4: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
    // Layer 5 - Modals, floating panels
    5: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    // Layer 6 - Highest elevation (tooltips, popovers)
    6: '0 35px 60px -15px rgba(0, 0, 0, 0.5)',
  },

  // ===== SEMANTIC SHADOWS =====
  // Named shadows for consistent usage
  semantic: {
    // Default card shadow
    card: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    // Card hover - elevated
    cardHover: '0 20px 25px -5px rgba(0, 0, 0, 0.35), 0 8px 10px -6px rgba(0, 0, 0, 0.25)',
    // Card pressed/active
    cardActive: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.2)',
    // Dropdown/popover
    dropdown: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.2)',
    // Modal overlay
    modal: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
    // Modal backdrop
    modalBackdrop: '0 0 0 9999px rgba(10, 10, 18, 0.8)',
    // Tooltip
    tooltip: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2)',
    // Input focus
    focus: '0 0 0 3px rgba(0, 184, 219, 0.4)',
    // Error focus
    focusError: '0 0 0 3px rgba(239, 68, 68, 0.4)',
    // Success focus
    focusSuccess: '0 0 0 3px rgba(34, 197, 94, 0.4)',
  },

  // ===== GLOW SHADOWS (Brand accent glows) =====
  // For interactive elements, CTAs, highlights
  glow: {
    // Cyan glow (primary brand)
    cyan: {
      sm: '0 0 8px rgba(0, 184, 219, 0.3), 0 0 16px rgba(0, 184, 219, 0.15)',
      md: '0 0 16px rgba(0, 184, 219, 0.4), 0 0 32px rgba(0, 184, 219, 0.2)',
      lg: '0 0 24px rgba(0, 184, 219, 0.5), 0 0 48px rgba(0, 184, 219, 0.25)',
      xl: '0 0 32px rgba(0, 184, 219, 0.6), 0 0 64px rgba(0, 184, 219, 0.3)',
      // Pulse animation version
      pulse: '0 0 16px rgba(0, 184, 219, 0.6), 0 0 32px rgba(0, 184, 219, 0.3)',
    },
    // Amber glow (secondary brand)
    amber: {
      sm: '0 0 8px rgba(245, 158, 11, 0.3), 0 0 16px rgba(245, 158, 11, 0.15)',
      md: '0 0 16px rgba(245, 158, 11, 0.4), 0 0 32px rgba(245, 158, 11, 0.2)',
      lg: '0 0 24px rgba(245, 158, 11, 0.5), 0 0 48px rgba(245, 158, 11, 0.25)',
      xl: '0 0 32px rgba(245, 158, 11, 0.6), 0 0 64px rgba(245, 158, 11, 0.3)',
    },
    // Green glow (success)
    green: {
      sm: '0 0 8px rgba(34, 197, 94, 0.3)',
      md: '0 0 16px rgba(34, 197, 94, 0.4)',
      lg: '0 0 24px rgba(34, 197, 94, 0.5)',
      xl: '0 0 32px rgba(34, 197, 94, 0.6), 0 0 64px rgba(34, 197, 94, 0.3)',
    },
    // Red glow (error)
    red: {
      sm: '0 0 8px rgba(239, 68, 68, 0.3)',
      md: '0 0 16px rgba(239, 68, 68, 0.4)',
      lg: '0 0 24px rgba(239, 68, 68, 0.5)',
      xl: '0 0 32px rgba(239, 68, 68, 0.6), 0 0 64px rgba(239, 68, 68, 0.3)',
    },
    // Purple glow (accent)
    purple: {
      sm: '0 0 8px rgba(168, 85, 247, 0.3)',
      md: '0 0 16px rgba(168, 85, 247, 0.4)',
      lg: '0 0 24px rgba(168, 85, 247, 0.5)',
      xl: '0 0 32px rgba(168, 85, 247, 0.6), 0 0 64px rgba(168, 85, 247, 0.3)',
    },
  },

  // ===== INNER SHADOWS (for pressed states, inputs) =====
  inner: {
    sm: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
    md: 'inset 0 4px 8px 0 rgba(0, 0, 0, 0.25)',
    lg: 'inset 0 8px 16px 0 rgba(0, 0, 0, 0.3)',
    // Input field
    input: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
    // Pressed button
    pressed: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)',
  },

  // ===== TEXT SHADOWS (for headlines on complex backgrounds) =====
  text: {
    // Subtle depth for headlines
    subtle: '0 1px 2px rgba(0, 0, 0, 0.5)',
    // Medium for better readability
    md: '0 2px 4px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.4)',
    // Strong for hero text
    lg: '0 4px 8px rgba(0, 0, 0, 0.7), 0 8px 16px rgba(0, 0, 0, 0.5)',
    // Glow text (cyan)
    glowCyan: '0 0 8px rgba(0, 184, 219, 0.6), 0 0 16px rgba(0, 184, 219, 0.4)',
    // Glow text (amber)
    glowAmber: '0 0 8px rgba(245, 158, 11, 0.6), 0 0 16px rgba(245, 158, 11, 0.4)',
  },

  // ===== LAYERED SHADOWS (multiple shadows combined) =====
  // For complex elevation effects
  layered: {
    // Floating card with glow
    floatingCyan: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 0 24px rgba(0, 184, 219, 0.15)',
    floatingAmber: '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.2), 0 0 24px rgba(245, 158, 11, 0.15)',
    // Elevated panel
    panel: '0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 1px rgba(255, 255, 255, 0.05), 0 0 0 1px rgba(255, 255, 255, 0.03)',
    // Glass morphism card
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.3), inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)',
    // Hero section depth
    hero: '0 0 100px -20px rgba(0, 184, 219, 0.15), 0 50px 100px -30px rgba(0, 0, 0, 0.5)',
  },

  // ===== OUTLINE SHADOWS (for focus-visible, selection) =====
  outline: {
    focus: '0 0 0 2px #1a1a2e, 0 0 0 4px rgba(0, 184, 219, 0.5)',
    focusError: '0 0 0 2px #1a1a2e, 0 0 0 4px rgba(239, 68, 68, 0.5)',
    focusSuccess: '0 0 0 2px #1a1a2e, 0 0 0 4px rgba(34, 197, 94, 0.5)',
    selected: '0 0 0 2px rgba(0, 184, 219, 0.8)',
  },

  // ===== NONE (reset) =====
  none: 'none',
} as const

// ===== SHADOW UTILITIES =====
export const shadowUtils = {
  // Get shadow for a specific layer (1-6)
  getLayer: (layer: 1 | 2 | 3 | 4 | 5 | 6) => shadows.layer[layer],
  // Get glow by color and size
  getGlow: (color: keyof typeof shadows.glow, size: 'sm' | 'md' | 'lg' | 'xl') =>
    shadows.glow[color]?.[size] || shadows.none,
  // Combine multiple shadows
  combine: (...shadowsList: string[]) => shadowsList.filter(Boolean).join(', '),
} as const

export type ShadowLayer = keyof typeof shadows.layer
export type ShadowGlowColor = keyof typeof shadows.glow
export type ShadowGlowSize = 'sm' | 'md' | 'lg' | 'xl'
export type SemanticShadow = keyof typeof shadows.semantic