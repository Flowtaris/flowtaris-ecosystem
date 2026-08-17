// @flowtaris/ui - Design Tokens: Spacing
// 8px base unit, exponential scale for consistent rhythm

export const spacing = {
  // Base unit: 8px
  base: 8,

  // Spacing scale (rem-based for fluid responsiveness)
  // 0.5rem = 8px, 1rem = 16px, 1.5rem = 24px, etc.
  0: '0',
  1: '0.5rem',    // 8px
  2: '1rem',      // 16px
  3: '1.5rem',    // 24px
  4: '2rem',      // 32px
  5: '2.5rem',    // 40px
  6: '3rem',      // 48px
  7: '3.5rem',    // 56px
  8: '4rem',      // 64px
  9: '4.5rem',    // 72px
  10: '5rem',     // 80px
  11: '5.5rem',   // 88px
  12: '6rem',     // 96px
  14: '7rem',     // 112px
  16: '8rem',     // 128px
  20: '10rem',    // 160px
  24: '12rem',    // 192px
  28: '14rem',    // 224px
  32: '16rem',    // 256px
  36: '18rem',    // 288px
  40: '20rem',    // 320px
  44: '22rem',    // 352px
  48: '24rem',    // 384px
  52: '26rem',    // 416px
  56: '28rem',    // 448px
  60: '30rem',    // 480px
  64: '32rem',    // 512px
  72: '36rem',    // 576px
  80: '40rem',    // 640px
  96: '48rem',    // 768px
} as const

// ===== SEMANTIC SPACING ALIASES =====
// Use these for consistent component spacing
export const space = {
  // Micro spacing (tight)
  xs: spacing[1],      // 8px
  sm: spacing[2],      // 16px
  md: spacing[4],      // 32px
  lg: spacing[6],      // 48px
  xl: spacing[8],      // 64px
  '2xl': spacing[12],  // 96px
  '3xl': spacing[16],  // 128px
  '4xl': spacing[24],  // 192px

  // Component-specific
  component: {
    gap: spacing[4],        // 32px - default gap between elements
    gapSm: spacing[2],      // 16px - tight gap
    gapLg: spacing[6],      // 48px - loose gap
    padding: spacing[6],    // 48px - default component padding
    paddingSm: spacing[4],  // 32px - tight padding
    paddingLg: spacing[8],  // 64px - loose padding
    radius: spacing[2],     // 16px - default border radius
    radiusSm: spacing[1],   // 8px - small radius
    radiusLg: spacing[3],   // 24px - large radius
    radiusXl: spacing[4],   // 32px - extra large radius
    radiusFull: '9999px',   // full rounded
  },

  // Layout
  layout: {
    containerPadding: spacing[6],   // 48px - container horizontal padding
    containerPaddingLg: spacing[8], // 64px - large container padding
    sectionGap: spacing[16],        // 128px - gap between sections
    sectionGapSm: spacing[12],      // 96px - small section gap
    sectionGapLg: spacing[24],      // 192px - large section gap
  },

  // Parallax layer offsets (for 6-layer depth system)
  parallax: {
    layer1: '0',           // Base - no offset
    layer2: spacing[2],    // 16px
    layer3: spacing[4],    // 32px
    layer4: spacing[6],    // 48px
    layer5: spacing[8],    // 64px
    layer6: spacing[10],   // 80px
  },
} as const

// ===== FLUID SPACING (clamp-based for responsive) =====
export const fluidSpacing = {
  // Clamp(min, preferred, max) - scales with viewport
  sectionY: 'clamp(4rem, 8vw, 8rem)',         // 64px - 128px
  sectionYSm: 'clamp(2rem, 5vw, 4rem)',       // 32px - 64px
  sectionYLg: 'clamp(6rem, 12vw, 12rem)',     // 96px - 192px
  containerX: 'clamp(2rem, 5vw, 3rem)',       // 32px - 48px
  containerXLg: 'clamp(3rem, 8vw, 6rem)',     // 48px - 96px
  heroY: 'clamp(6rem, 15vw, 16rem)',          // 96px - 256px
  headerY: 'clamp(2rem, 3vw, 2rem)',          // 32px - 32px
  cardGap: 'clamp(2rem, 3vw, 2rem)',          // 32px - 32px
  gridGap: 'clamp(1rem, 2vw, 1.5rem)',        // 16px - 24px
} as const

// ===== NEGATIVE SPACING (for overlaps, pull effects) =====
export const negativeSpacing = {
  sm: '-1rem',     // -16px
  md: '-2rem',     // -32px
  lg: '-3rem',     // -48px
  xl: '-4rem',     // -64px
  '2xl': '-6rem',  // -96px
  '3xl': '-8rem',  // -128px
} as const

export type SpacingScale = keyof typeof spacing
export type SemanticSpace = keyof typeof space