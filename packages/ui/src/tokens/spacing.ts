// @flowtaris/ui - Design Tokens: Spacing
// 4px base unit, exponential scale for consistent rhythm

export const spacing = {
  // Base unit: 4px
  base: 4,

  // Spacing scale (rem-based for fluid responsiveness)
  // 0.25rem = 4px, 0.5rem = 8px, 1rem = 16px, etc.
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  7: '1.75rem',   // 28px
  8: '2rem',      // 32px
  9: '2.25rem',   // 36px
  10: '2.5rem',   // 40px
  11: '2.75rem',  // 44px
  12: '3rem',     // 48px
  14: '3.5rem',   // 56px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  28: '7rem',     // 112px
  32: '8rem',     // 128px
  36: '9rem',     // 144px
  40: '10rem',    // 160px
  44: '11rem',    // 176px
  48: '12rem',    // 192px
  52: '13rem',    // 208px
  56: '14rem',    // 224px
  60: '15rem',    // 240px
  64: '16rem',    // 256px
  72: '18rem',    // 288px
  80: '20rem',    // 320px
  96: '24rem',    // 384px
} as const

// ===== SEMANTIC SPACING ALIASES =====
// Use these for consistent component spacing
export const space = {
  // Micro spacing (tight)
  xs: spacing[1],      // 4px
  sm: spacing[2],      // 8px
  md: spacing[4],      // 16px
  lg: spacing[6],      // 24px
  xl: spacing[8],      // 32px
  '2xl': spacing[12],  // 48px
  '3xl': spacing[16],  // 64px
  '4xl': spacing[24],  // 96px

  // Component-specific
  component: {
    gap: spacing[4],        // 16px - default gap between elements
    gapSm: spacing[2],      // 8px - tight gap
    gapLg: spacing[6],      // 24px - loose gap
    padding: spacing[6],    // 24px - default component padding
    paddingSm: spacing[4],  // 16px - tight padding
    paddingLg: spacing[8],  // 32px - loose padding
    radius: spacing[2],     // 8px - default border radius
    radiusSm: spacing[1],   // 4px - small radius
    radiusLg: spacing[3],   // 12px - large radius
    radiusXl: spacing[4],   // 16px - extra large radius
    radiusFull: '9999px',   // full rounded
  },

  // Layout
  layout: {
    containerPadding: spacing[6],   // 24px - container horizontal padding
    containerPaddingLg: spacing[8], // 32px - large container padding
    sectionGap: spacing[16],        // 64px - gap between sections
    sectionGapSm: spacing[12],      // 48px - small section gap
    sectionGapLg: spacing[24],      // 96px - large section gap
  },

  // Parallax layer offsets (for 6-layer depth system)
  parallax: {
    layer1: '0',           // Base - no offset
    layer2: spacing[2],    // 8px
    layer3: spacing[4],    // 16px
    layer4: spacing[6],    // 24px
    layer5: spacing[8],    // 32px
    layer6: spacing[10],   // 40px
  },
} as const

// ===== FLUID SPACING (clamp-based for responsive) =====
export const fluidSpacing = {
  // Clamp(min, preferred, max) - scales with viewport
  sectionY: 'clamp(3rem, 8vw, 8rem)',        // 48px - 128px
  sectionYSm: 'clamp(2rem, 5vw, 4rem)',      // 32px - 64px
  sectionYLg: 'clamp(4rem, 12vw, 12rem)',    // 64px - 192px
  containerX: 'clamp(1rem, 5vw, 3rem)',      // 16px - 48px
  containerXLg: 'clamp(2rem, 8vw, 6rem)',    // 32px - 96px
  heroY: 'clamp(4rem, 15vw, 16rem)',         // 64px - 256px
  headerY: 'clamp(1rem, 3vw, 2rem)',         // 16px - 32px
  cardGap: 'clamp(1rem, 3vw, 2rem)',         // 16px - 32px
  gridGap: 'clamp(0.75rem, 2vw, 1.5rem)',    // 12px - 24px
} as const

// ===== NEGATIVE SPACING (for overlaps, pull effects) =====
export const negativeSpacing = {
  sm: '-0.5rem',   // -8px
  md: '-1rem',     // -16px
  lg: '-1.5rem',   // -24px
  xl: '-2rem',     // -32px
  '2xl': '-3rem',  // -48px
  '3xl': '-4rem',  // -64px
} as const

export type SpacingScale = keyof typeof spacing
export type SemanticSpace = keyof typeof space