// @flowtaris/ui - Design Tokens: Typography
// Fluid type scale using clamp() for responsive headlines
// Font families: Space Grotesk (display) + Inter (body), JetBrains Mono (code)

export const typography = {
  // ===== FONT FAMILIES =====
  fontFamily: {
    // Display/Headlines - Space Grotesk (geometric, tech-forward)
    display: [
      'Space Grotesk',
      'ui-sans-serif',
      'system-ui',
      'sans-serif',
    ].join(','),
    // Body/UI - Inter (excellent readability, variable font)
    body: [
      'Inter',
      'ui-sans-serif',
      'system-ui',
      'sans-serif',
    ].join(','),
    // Mono - JetBrains Mono (code, data, technical)
    mono: [
      'JetBrains Mono',
      'ui-monospace',
      'SFMono-Regular',
      'Menlo',
      'Monaco',
      'Consolas',
      'monospace',
    ].join(','),
    // Fallback for when variable fonts not loaded
    fallback: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },

  // ===== FONT WEIGHTS =====
  fontWeight: {
    thin: 100,
    extralight: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // ===== LINE HEIGHTS =====
  lineHeight: {
    none: 1,
    tight: 1.1,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },

  // ===== LETTER SPACING =====
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // ===== FONT SIZES (static rem values) =====
  fontSize: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
    '5xl': '3rem',    // 48px
    '6xl': '3.75rem', // 60px
    '7xl': '4.5rem',  // 72px
    '8xl': '6rem',    // 96px
    '9xl': '8rem',    // 128px
  },

  // ===== FLUID TYPE SCALE (clamp-based) =====
  // Scales smoothly between mobile and desktop
  fluid: {
    // Display sizes - for hero headlines, major sections
    display: {
      xxs: 'clamp(1.5rem, 3vw, 2.5rem)',    // 24px - 40px
      xs: 'clamp(2rem, 4vw, 3.5rem)',       // 32px - 56px
      sm: 'clamp(2.5rem, 5vw, 4.5rem)',     // 40px - 72px
      md: 'clamp(3rem, 6vw, 5.5rem)',       // 48px - 88px
      lg: 'clamp(3.5rem, 8vw, 7rem)',       // 56px - 112px
      xl: 'clamp(4rem, 10vw, 8.5rem)',      // 64px - 136px
      '2xl': 'clamp(5rem, 12vw, 10rem)',    // 80px - 160px
      '3xl': 'clamp(6rem, 15vw, 12rem)',    // 96px - 192px
    },
    // Headline sizes - for section headers, card titles
    headline: {
      xs: 'clamp(1.125rem, 2vw, 1.5rem)',   // 18px - 24px
      sm: 'clamp(1.25rem, 2.5vw, 1.75rem)', // 20px - 28px
      md: 'clamp(1.5rem, 3vw, 2.25rem)',    // 24px - 36px
      lg: 'clamp(1.75rem, 3.5vw, 2.5rem)',  // 28px - 40px
      xl: 'clamp(2rem, 4vw, 3rem)',         // 32px - 48px
      '2xl': 'clamp(2.5rem, 5vw, 3.5rem)',  // 40px - 56px
    },
    // Body sizes - for paragraphs, UI text
    body: {
      xs: 'clamp(0.75rem, 1vw, 0.875rem)',  // 12px - 14px
      sm: 'clamp(0.875rem, 1.25vw, 1rem)',  // 14px - 16px
      md: 'clamp(1rem, 1.5vw, 1.125rem)',   // 16px - 18px
      lg: 'clamp(1.125rem, 1.75vw, 1.25rem)', // 18px - 20px
      xl: 'clamp(1.25rem, 2vw, 1.375rem)',  // 20px - 22px
    },
    // UI sizes - for buttons, inputs, labels
    ui: {
      xs: '0.75rem',    // 12px - fixed small labels
      sm: '0.875rem',   // 14px - fixed small text
      md: '1rem',       // 16px - default UI
      lg: '1.125rem',   // 18px - large UI
    },
    // Caption/meta
    caption: {
      xs: 'clamp(0.625rem, 0.8vw, 0.75rem)', // 10px - 12px
      sm: 'clamp(0.75rem, 1vw, 0.875rem)',   // 12px - 14px
    },
  },

  // ===== TYPOGRAPHY PRESETS (composable style objects) =====
  // Use these for consistent text styling across components
  presets: {
    // ===== DISPLAY / HERO =====
    display: {
      xxs: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
      },
      xs: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
      },
      sm: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.025em',
      },
      md: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 6vw, 5.5rem)',
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
      },
      lg: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3.5rem, 8vw, 7rem)',
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
      },
      xl: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(4rem, 10vw, 8.5rem)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.04em',
      },
      '2xl': {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(5rem, 12vw, 10rem)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.04em',
      },
    },

    // ===== HEADLINES =====
    headline: {
      xs: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      sm: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
      },
      md: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '-0.015em',
      },
      lg: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
        fontWeight: 600,
        lineHeight: 1.25,
        letterSpacing: '-0.015em',
      },
      xl: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3rem)',
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: '-0.02em',
      },
    },

    // ===== BODY TEXT =====
    body: {
      xs: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0',
      },
      sm: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.875rem, 1.25vw, 1rem)',
        fontWeight: 400,
        lineHeight: 1.6,
        letterSpacing: '0',
      },
      md: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1rem, 1.5vw, 1.125rem)',
        fontWeight: 400,
        lineHeight: 1.65,
        letterSpacing: '0',
      },
      lg: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1.125rem, 1.75vw, 1.25rem)',
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: '0',
      },
      xl: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(1.25rem, 2vw, 1.375rem)',
        fontWeight: 400,
        lineHeight: 1.7,
        letterSpacing: '0',
      },
    },

    // ===== UI TEXT (buttons, inputs, labels) =====
    ui: {
      xs: {
        fontFamily: 'var(--font-body)',
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.025em',
        textTransform: 'uppercase' as const,
      },
      sm: {
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
      md: {
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0',
      },
      lg: {
        fontFamily: 'var(--font-body)',
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
    },

    // ===== LINKS =====
    link: {
      sm: {
        fontFamily: 'var(--font-body)',
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0',
      },
      md: {
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: '0',
      },
      lg: {
        fontFamily: 'var(--font-body)',
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '-0.01em',
      },
    },

    // ===== CAPTION / META =====
    caption: {
      xs: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.625rem, 0.8vw, 0.75rem)',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.025em',
        textTransform: 'uppercase' as const,
      },
      sm: {
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.75rem, 1vw, 0.875rem)',
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: '0.01em',
      },
    },

    // ===== CODE / MONO =====
    code: {
      xs: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      sm: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      md: {
        fontFamily: 'var(--font-mono)',
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
      lg: {
        fontFamily: 'var(--font-mono)',
        fontSize: '1.125rem',
        fontWeight: 400,
        lineHeight: 1.6,
      },
    },

    // ===== NUMBERS / DATA (tabular figures) =====
    number: {
      sm: {
        fontFamily: 'var(--font-mono)',
        fontSize: '0.875rem',
        fontWeight: 600,
        lineHeight: 1.4,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      md: {
        fontFamily: 'var(--font-mono)',
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.4,
        fontVariantNumeric: 'tabular-nums' as const,
      },
      lg: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2rem, 4vw, 3.5rem)',
        fontWeight: 700,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums' as const,
      },
      xl: {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(3rem, 6vw, 5rem)',
        fontWeight: 700,
        lineHeight: 1.05,
        letterSpacing: '-0.03em',
        fontVariantNumeric: 'tabular-nums' as const,
      },
      '2xl': {
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(4rem, 8vw, 7rem)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.04em',
        fontVariantNumeric: 'tabular-nums' as const,
      },
    },
  },
} as const

// CSS Variable names for font families (set in globals.css)
export const fontCssVars = {
  display: '--font-display',
  body: '--font-body',
  mono: '--font-mono',
} as const

export type FontFamily = keyof typeof typography.fontFamily
export type FontWeight = keyof typeof typography.fontWeight
export type FluidDisplaySize = keyof typeof typography.fluid.display
export type FluidHeadlineSize = keyof typeof typography.fluid.headline
export type FluidBodySize = keyof typeof typography.fluid.body
export type PresetCategory = keyof typeof typography.presets