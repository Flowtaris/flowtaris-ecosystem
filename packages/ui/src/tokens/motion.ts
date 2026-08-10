// @flowtaris/ui - Design Tokens: Motion
// Cinematic animation system - durations, easings, spring configs
// Designed for GSAP 3.12+ and Framer Motion 11

export const motion = {
  // ===== DURATIONS (ms) =====
  duration: {
    instant: 0,
    fastest: 50,
    faster: 100,
    fast: 150,
    normal: 200,
    slow: 300,
    slower: 400,
    slowest: 500,
    cinematic: 800,
    epic: 1200,
    monumental: 2000,
  },

  // ===== EASING FUNCTIONS =====
  // CSS cubic-bezier strings for CSS transitions
  // GSAP uses the same names via "power1.out", "expo.out", etc.
  easing: {
    // Standard CSS easings
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',

    // Custom brand easings (cubic-bezier)
    // "Cinematic" - slow start, fast middle, slow end
    cinematic: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    // "Epic" - fast start, slow dramatic end
    epic: 'cubic-bezier(0.05, 0.7, 0.1, 1)',
    // "Smooth" - gentle acceleration/deceleration
    smooth: 'cubic-bezier(0.33, 0, 0.67, 1)',
    // "Sharp" - quick, decisive
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    // "Bounce" - subtle overshoot
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    // "Elastic" - spring-like
    elastic: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',

    // Exponential family (GSAP-style names)
    expo: {
      in: 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
      out: 'cubic-bezier(0.19, 1, 0.22, 1)',
      inOut: 'cubic-bezier(1, 0, 0, 1)',
    },
    // Circ family
    circ: {
      in: 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
      out: 'cubic-bezier(0.075, 0.82, 0.165, 1)',
      inOut: 'cubic-bezier(0.785, 0.135, 0.15, 0.86)',
    },
    // Back family (overshoot)
    back: {
      out: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      in: 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
      inOut: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
  },

  // ===== GSAP-SPECIFIC EASINGS (mapped to GSAP names) =====
  gsapEasing: {
    // Power
    'power1.in': 'power1.in',
    'power1.out': 'power1.out',
    'power1.inOut': 'power1.inOut',
    'power2.in': 'power2.in',
    'power2.out': 'power2.out',
    'power2.inOut': 'power2.inOut',
    'power3.in': 'power3.in',
    'power3.out': 'power3.out',
    'power3.inOut': 'power3.inOut',
    'power4.in': 'power4.in',
    'power4.out': 'power4.out',
    'power4.inOut': 'power4.inOut',
    // Expo
    'expo.in': 'expo.in',
    'expo.out': 'expo.out',
    'expo.inOut': 'expo.inOut',
    // Circ
    'circ.in': 'circ.in',
    'circ.out': 'circ.out',
    'circ.inOut': 'circ.inOut',
    // Back
    'back.out': 'back.out(1.7)',
    'back.in': 'back.in(1.7)',
    'back.inOut': 'back.inOut(1.7)',
    // Elastic
    'elastic.out': 'elastic.out(1, 0.3)',
    'elastic.in': 'elastic.in(1, 0.3)',
    'elastic.inOut': 'elastic.inOut(1, 0.3)',
    // Bounce
    'bounce.out': 'bounce.out',
    'bounce.in': 'bounce.in',
    'bounce.inOut': 'bounce.inOut',
    // Custom
    'cinematic': 'expo.out',
    'epic': 'power3.out',
    'smooth': 'power2.out',
    'sharp': 'power4.out',
  },

  // ===== FRAMER MOTION TRANSITION PRESETS =====
  framerTransition: {
    // Quick UI interactions
    ui: {
      fast: { duration: 0.15, ease: 'easeOut' },
      normal: { duration: 0.2, ease: 'easeOut' },
      slow: { duration: 0.3, ease: 'easeOut' },
    },
    // Cinematic page transitions
    page: {
      enter: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      exit: { duration: 0.4, ease: [0.4, 0, 1, 1] },
    },
    // Modal/overlay
    modal: {
      enter: { duration: 0.35, ease: [0.33, 0, 0.67, 1] },
      exit: { duration: 0.25, ease: [0.4, 0, 1, 1] },
    },
    // Scroll-triggered reveals
    reveal: {
      fast: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
      normal: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
      slow: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
      epic: { duration: 1.6, ease: [0.05, 0.7, 0.1, 1] },
    },
    // Stagger for lists/grids
    stagger: {
      fast: 0.05,
      normal: 0.08,
      slow: 0.12,
      cinematic: 0.15,
    },
    // Spring configs for Framer Motion
    spring: {
      gentle: { type: 'spring', stiffness: 120, damping: 14 },
      smooth: { type: 'spring', stiffness: 180, damping: 18 },
      snappy: { type: 'spring', stiffness: 260, damping: 20 },
      bouncy: { type: 'spring', stiffness: 300, damping: 15 },
      cinematic: { type: 'spring', stiffness: 100, damping: 12, mass: 1.5 },
    },
  },

  // ===== GSAP TIMELINE DEFAULTS =====
  gsapDefaults: {
    // Default ease for all GSAP tweens
    defaultEase: 'power2.out',
    // Default duration
    defaultDuration: 0.8,
    // Force3D for GPU acceleration
    force3D: true,
    // Overwrite management
    overwrite: 'auto',
  },

  // ===== PARALLAX LAYER SPEEDS (6-layer depth system) =====
  // Used by ParallaxLayers component
  parallax: {
    // Layer 1 - Farthest (background stars, distant shapes)
    layer1: { speed: 0.10, zIndex: -10 },
    // Layer 2 - Deep background (nebula, gradients)
    layer2: { speed: 0.25, zIndex: -8 },
    // Layer 3 - Mid background (floating particles, subtle shapes)
    layer3: { speed: 0.50, zIndex: -5 },
    // Layer 4 - Content layer (base - text, main content)
    layer4: { speed: 1.00, zIndex: 0 },
    // Layer 5 - Elevated (cards, sidebars)
    layer5: { speed: 1.10, zIndex: 10 },
    // Layer 6 - Floating/Modal (tooltips, modals, cursor followers)
    layer6: { speed: 1.20, zIndex: 50 },
  },

  // ===== SCROLL-TRIGGER DEFAULTS =====
  scrollTrigger: {
    // Default trigger settings
    default: {
      toggleActions: 'play none none reverse',
      scrub: 1,
      start: 'top 80%',
      end: 'bottom 20%',
    },
    // Reveal on scroll
    reveal: {
      toggleActions: 'play none none none',
      scrub: false,
      start: 'top 85%',
      end: 'bottom 15%',
    },
    // Pin section
    pin: {
      pin: true,
      pinSpacing: true,
      scrub: 1,
      start: 'top top',
      end: '+=100%',
    },
    // Parallax
    parallax: {
      scrub: 1,
      start: 'top bottom',
      end: 'bottom top',
    },
  },

  // ===== REDUCED MOTION =====
  // Respects prefers-reduced-motion
  reducedMotion: {
    // Multiply all durations by this factor
    durationMultiplier: 0.01,
    // Disable parallax
    disableParallax: true,
    // Disable complex easings
    simplifyEasing: true,
    // Use instant transitions
    instantTransitions: true,
  },
} as const

// ===== SEMANTIC MOTION ALIASES =====
export const motionPresets = {
  // Entrance animations
  entrance: {
    fade: { opacity: [0, 1], duration: 0.5, ease: 'easeOut' },
    slideUp: { y: [30, 0], opacity: [0, 1], duration: 0.6, ease: 'expo.out' },
    slideDown: { y: [-30, 0], opacity: [0, 1], duration: 0.6, ease: 'expo.out' },
    slideLeft: { x: [30, 0], opacity: [0, 1], duration: 0.6, ease: 'expo.out' },
    slideRight: { x: [-30, 0], opacity: [0, 1], duration: 0.6, ease: 'expo.out' },
    scaleUp: { scale: [0.9, 1], opacity: [0, 1], duration: 0.5, ease: 'back.out(1.7)' },
    rotateIn: { rotate: [-12, 0], opacity: [0, 1], duration: 0.7, ease: 'expo.out' },
  },
  // Exit animations
  exit: {
    fade: { opacity: [1, 0], duration: 0.3, ease: 'easeIn' },
    slideUp: { y: [0, -30], opacity: [1, 0], duration: 0.4, ease: 'easeIn' },
    slideDown: { y: [0, 30], opacity: [1, 0], duration: 0.4, ease: 'easeIn' },
    scaleDown: { scale: [1, 0.9], opacity: [1, 0], duration: 0.3, ease: 'easeIn' },
  },
  // Hover/tap interactions
  interaction: {
    hover: { scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } },
    tap: { scale: 0.98, transition: { duration: 0.1, ease: 'easeIn' } },
    focus: { boxShadow: '0 0 0 3px rgba(0,184,219,0.4)', transition: { duration: 0.15 } },
  },
  // Loading states
  loading: {
    pulse: { opacity: [0.5, 1, 0.5], duration: 1.5, ease: 'easeInOut', repeat: Infinity },
    spin: { rotate: [0, 360], duration: 1, ease: 'linear', repeat: Infinity },
    shimmer: { backgroundPosition: ['-200% 0', '200% 0'], duration: 1.5, ease: 'easeInOut', repeat: Infinity },
  },
} as const

export type Duration = keyof typeof motion.duration
export type Easing = keyof typeof motion.easing
export type ParallaxLayer = keyof typeof motion.parallax