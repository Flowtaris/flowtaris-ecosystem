// @flowtaris/ai - Tailwind CSS v4 Configuration
// Uses design tokens from @repo/ui

import { colors, spacing, typography, shadows, zIndex, tailwindBreakpoints } from '@repo/ui/tokens'

// Helper to convert token objects to Tailwind v4 theme format
const flattenColors = (obj: Record<string, unknown>, prefix = ''): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object' && value !== null) {
      Object.assign(result, flattenColors(value as Record<string, unknown>, `${prefix}${key}-`))
    } else {
      result[`${prefix}${key}`] = String(value)
    }
  }
  return result
}

const brandColors = flattenColors(colors.brand)
const semanticColors = flattenColors(colors.semantic)
const neutralColors = flattenColors(colors.neutral)
const surfaceColors = flattenColors({ surface: colors.surface })
const textColors = flattenColors({ text: colors.text })
const borderColors = flattenColors({ border: colors.border })

// Gradient tokens
const gradients = colors.gradients

const config = {
  theme: {
    // Colors
    colors: {
      ...brandColors,
      ...semanticColors,
      ...neutralColors,
      ...surfaceColors,
      ...textColors,
      ...borderColors,
      // Data visualization
      dataviz: {
        categorical: colors.dataViz.categorical.reduce((acc, color, i) => ({ ...acc, [i]: color }), {} as Record<string, string>),
        sequential: colors.dataViz.sequential,
        diverging: colors.dataViz.diverging,
      },
      // Gradients as custom utilities
      gradient: gradients,
    },

    // Spacing
    spacing: {
      ...Object.fromEntries(
        Object.entries(spacing).map(([k, v]) => [k, typeof v === 'number' ? `${v}px` : v])
      ),
      // Semantic spacing
      'space-xs': spacing[1],
      'space-sm': spacing[2],
      'space-md': spacing[4],
      'space-lg': spacing[6],
      'space-xl': spacing[8],
      'space-2xl': spacing[12],
      'space-3xl': spacing[16],
      'space-4xl': spacing[24],
    },

    // Typography
    fontFamily: {
      display: typography.fontFamily.display.split(',').map(f => f.trim().replace(/['"]/g, '')),
      body: typography.fontFamily.body.split(',').map(f => f.trim().replace(/['"]/g, '')),
      mono: typography.fontFamily.mono.split(',').map(f => f.trim().replace(/['"]/g, '')),
    },
    fontSize: typography.fontSize,
    fontWeight: typography.fontWeight,
    lineHeight: typography.lineHeight,
    letterSpacing: typography.letterSpacing,

    // Shadows
    boxShadow: {
      ...shadows.layer,
      ...shadows.semantic,
      ...shadows.glow.cyan,
      ...shadows.glow.amber,
      ...shadows.inner,
      ...shadows.layered,
      ...shadows.outline,
    },

    // Z-index
    zIndex: {
      ...zIndex.semantic,
      ...zIndex.component,
    },

    // Breakpoints
    screens: tailwindBreakpoints,

    // Animation durations
    transitionDuration: {
      instant: '0ms',
      fastest: '50ms',
      faster: '100ms',
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '400ms',
      slowest: '500ms',
      cinematic: '800ms',
      epic: '1200ms',
      monumental: '2000ms',
    },

    // Animation easing
    transitionTimingFunction: {
      linear: 'linear',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      cinematic: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      epic: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
      smooth: 'cubic-bezier(0.33, 0, 0.67, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      'expo-in': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
      'expo-in-out': 'cubic-bezier(1, 0, 0, 1)',
    },

    // Border radius
    borderRadius: {
      none: '0',
      sm: '4px',
      DEFAULT: '8px',
      md: '12px',
      lg: '16px',
      xl: '24px',
      '2xl': '32px',
      full: '9999px',
    },

    // Container max widths
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        sm: '2rem',
        lg: '2rem',
        xl: '2rem',
        '2xl': '3rem',
      },
      screens: {
        xs: '320px',
        sm: '440px',
        md: '600px',
        lg: '728px',
        xl: '984px',
        '2xl': '1240px',
        '3xl': '1380px',
        '4xl': '1600px',
        '5xl': '2000px',
      },
    },

    // Extend with custom utilities
    extend: {
      // Fluid typography using clamp()
      fontSize: {
        'display-xxs': 'clamp(1.5rem, 3vw, 2.5rem)',
        'display-xs': 'clamp(2rem, 4vw, 3.5rem)',
        'display-sm': 'clamp(2.5rem, 5vw, 4.5rem)',
        'display-md': 'clamp(3rem, 6vw, 5.5rem)',
        'display-lg': 'clamp(3.5rem, 8vw, 7rem)',
        'display-xl': 'clamp(4rem, 10vw, 8.5rem)',
        'display-2xl': 'clamp(5rem, 12vw, 10rem)',
        'display-3xl': 'clamp(6rem, 15vw, 12rem)',
        'headline-xs': 'clamp(1.125rem, 2vw, 1.5rem)',
        'headline-sm': 'clamp(1.25rem, 2.5vw, 1.75rem)',
        'headline-md': 'clamp(1.5rem, 3vw, 2.25rem)',
        'headline-lg': 'clamp(1.75rem, 3.5vw, 2.5rem)',
        'headline-xl': 'clamp(2rem, 4vw, 3rem)',
        'headline-2xl': 'clamp(2.5rem, 5vw, 3.5rem)',
        'body-xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'body-sm': 'clamp(0.875rem, 1.25vw, 1rem)',
        'body-md': 'clamp(1rem, 1.5vw, 1.125rem)',
        'body-lg': 'clamp(1.125rem, 1.75vw, 1.25rem)',
        'body-xl': 'clamp(1.25rem, 2vw, 1.375rem)',
        'number-lg': 'clamp(2rem, 4vw, 3.5rem)',
        'number-xl': 'clamp(3rem, 6vw, 5rem)',
        'number-2xl': 'clamp(4rem, 8vw, 7rem)',
      },

      // Fluid spacing
      spacing: {
        'section-y': 'clamp(3rem, 8vw, 8rem)',
        'section-y-sm': 'clamp(2rem, 5vw, 4rem)',
        'section-y-lg': 'clamp(4rem, 12vw, 12rem)',
        'container-x': 'clamp(1rem, 5vw, 3rem)',
        'container-x-lg': 'clamp(2rem, 8vw, 6rem)',
        'hero-y': 'clamp(4rem, 15vw, 16rem)',
        'header-y': 'clamp(1rem, 3vw, 2rem)',
        'card-gap': 'clamp(1rem, 3vw, 2rem)',
        'grid-gap': 'clamp(0.75rem, 2vw, 1.5rem)',
      },

      // Parallax layer transforms
      translate: {
        'parallax-1': 'var(--parallax-layer1, 0)',
        'parallax-2': 'var(--parallax-layer2, 0)',
        'parallax-3': 'var(--parallax-layer3, 0)',
        'parallax-4': 'var(--parallax-layer4, 0)',
        'parallax-5': 'var(--parallax-layer5, 0)',
        'parallax-6': 'var(--parallax-layer6, 0)',
      },

      // Gradient backgrounds
      backgroundImage: {
        'brand': 'linear-gradient(135deg, #00b8db 0%, #535b9f 100%)',
        'brand-reverse': 'linear-gradient(135deg, #535b9f 0%, #00b8db 100%)',
        'layer-1': 'linear-gradient(180deg, #05050a 0%, #0a0a12 100%)',
        'layer-2': 'linear-gradient(180deg, #0a0a12 0%, #12121f 100%)',
        'layer-3': 'linear-gradient(180deg, #12121f 0%, #1a1a2e 100%)',
        'layer-4': 'linear-gradient(180deg, #1a1a2e 0%, #22223a 100%)',
        'layer-5': 'linear-gradient(180deg, #22223a 0%, #2a2a4a 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%)',
        'glass-radial': 'radial-gradient(ellipse at center, rgba(0,184,219,0.15) 0%, transparent 70%)',
        'cyan-glow': 'radial-gradient(ellipse at center, rgba(0,184,219,0.3) 0%, transparent 70%)',
        'amber-glow': 'radial-gradient(ellipse at center, rgba(245,158,11,0.25) 0%, transparent 70%)',
        'hero-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(0,184,219,0.2) 0%, transparent 50%), radial-gradient(ellipse 60% 40% at 80% 100%, rgba(245,158,11,0.15) 0%, transparent 50%), radial-gradient(ellipse 100% 60% at 10% 80%, rgba(168,85,247,0.1) 0%, transparent 50%)',
      },

      // Text shadows
      textShadow: {
        subtle: '0 1px 2px rgba(0, 0, 0, 0.5)',
        DEFAULT: '0 2px 4px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(0, 0, 0, 0.4)',
        lg: '0 4px 8px rgba(0, 0, 0, 0.7), 0 8px 16px rgba(0, 0, 0, 0.5)',
        'glow-cyan': '0 0 8px rgba(0, 184, 219, 0.6), 0 0 16px rgba(0, 184, 219, 0.4)',
        'glow-amber': '0 0 8px rgba(245, 158, 11, 0.6), 0 0 16px rgba(245, 158, 11, 0.4)',
        none: 'none',
      },

      // Backdrop blur
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        '2xl': '40px',
        '3xl': '64px',
      },

      // Grid template columns
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(280px, 1fr))',
        '12': 'repeat(12, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },

      // Aspect ratios
      aspectRatio: {
        'hero': '16/9',
        'card': '4/3',
        'square': '1/1',
        'video': '16/9',
        'ultra-wide': '21/9',
      },
    },
  },

  plugins: [],
}

export default config