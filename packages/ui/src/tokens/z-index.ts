// @flowtaris/ui - Design Tokens: Z-Index
// Systematic z-index scale for layering, modals, tooltips, etc.
// Aligned with 6-layer parallax depth system

export const zIndex = {
  // ===== BASE LAYERS (matching parallax depth) =====
  // Negative z-index for background layers
  layer1: -10,   // Farthest background (stars, distant)
  layer2: -8,    // Deep background (nebula, gradients)
  layer3: -5,    // Mid background (particles, shapes)
  layer4: 0,     // Content layer (base)
  layer5: 10,    // Elevated (cards, sidebars)
  layer6: 50,    // Floating/Modal (tooltips, modals)

  // ===== SEMANTIC Z-INDEX SCALE =====
  // Use these named values for consistency
  semantic: {
    // Behind everything
    background: -20,
    // Base content
    content: 0,
    // Above content, below UI
    raised: 10,
    // Sticky headers, nav
    sticky: 100,
    // Dropdown menus, popovers
    dropdown: 200,
    // Mobile nav overlay
    mobileNav: 300,
    // Modal backdrops
    modalBackdrop: 400,
    // Modals, drawers
    modal: 500,
    // Tooltips, popovers (above modals)
    tooltip: 600,
    // Toast notifications
    toast: 700,
    // Cursor followers, custom cursors
    cursor: 800,
    // Loading overlays (global)
    loading: 900,
    // Highest - critical alerts
    alert: 1000,
  },

  // ===== COMPONENT-SPECIFIC Z-INDEX =====
  component: {
    // Header/Navigation
    header: 100,
    headerMobile: 300,
    navLink: 101,
    navDropdown: 200,
    mobileMenu: 300,
    mobileMenuBackdrop: 250,

    // Sidebar
    sidebar: 50,
    sidebarBackdrop: 40,
    sidebarMobile: 350,
    sidebarMobileBackdrop: 340,

    // Cards
    card: 10,
    cardHover: 20,
    cardExpanded: 60,

    // Buttons
    button: 1,
    buttonLoading: 5,
    buttonTooltip: 600,

    // Form elements
    input: 1,
    select: 1,
    selectOptions: 300,
    datePicker: 300,
    autocomplete: 300,

    // Modals
    modalBackdrop: 400,
    modal: 500,
    modalClose: 510,
    modalContent: 505,

    // Drawers/Sheets
    drawerBackdrop: 400,
    drawer: 500,
    drawerHandle: 510,

    // Popovers/Tooltips
    popper: 600,
    popperArrow: 601,
    tooltip: 600,
    tooltipArrow: 601,

    // Toasts
    toast: 700,
    toastContent: 701,

    // Tables
    tableHeader: 20,
    tableStickyColumn: 30,
    tableRowHover: 15,

    // Tabs
    tabList: 10,
    tabPanel: 5,
    tabIndicator: 11,

    // Accordion
    accordion: 10,
    accordionContent: 5,

    // Carousel/Slider
    carousel: 10,
    carouselSlide: 5,
    carouselControls: 20,
    carouselDots: 20,

    // Video Player
    videoPlayer: 10,
    videoControls: 20,
    videoFullscreen: 900,

    // Image Zoom/Lightbox
    lightboxBackdrop: 800,
    lightbox: 900,
    lightboxContent: 910,
    lightboxClose: 920,

    // Command Palette / Search
    commandPaletteBackdrop: 850,
    commandPalette: 900,
    commandPaletteResults: 901,

    // Onboarding/Tour
    tourBackdrop: 750,
    tourStep: 800,
    tourSpotlight: 790,

    // Cursor followers
    cursorFollower: 800,
    cursorTrail: 790,

    // Scroll progress indicator
    scrollProgress: 950,
  },

  // ===== PARALLAX SPECIFIC =====
  parallax: {
    // Background decorative elements
    decorative: -15,
    // Far background shapes
    far: -10,
    // Mid background
    mid: -5,
    // Content (text, images)
    content: 0,
    // Floating UI elements
    floating: 50,
    // Interactive hotspots
    hotspot: 60,
    // Cursor-following elements
    cursor: 800,
  },

  // ===== UTILITIES =====
  util: {
    // Hide visually but keep accessible
    hide: -9999,
    // Below everything
    bottom: -1000,
    // Above everything
    top: 9999,
    // Auto (let browser decide)
    auto: 'auto',
    // Initial
    initial: 0,
    // Inherit
    inherit: 'inherit',
  },

  // ===== CSS VARIABLE MAPPING =====
  // For use in CSS custom properties
  cssVars: {
    layer1: '--z-layer1',
    layer2: '--z-layer2',
    layer3: '--z-layer3',
    layer4: '--z-layer4',
    layer5: '--z-layer5',
    layer6: '--z-layer6',
    sticky: '--z-sticky',
    dropdown: '--z-dropdown',
    modal: '--z-modal',
    tooltip: '--z-tooltip',
    toast: '--z-toast',
  },
} as const

// ===== HELPER FUNCTIONS =====
export const zIndexUtils = {
  // Get semantic z-index by name
  get: (name: keyof typeof zIndex.semantic) => zIndex.semantic[name],
  // Get component z-index by name
  getComponent: (name: keyof typeof zIndex.component) => zIndex.component[name],
  // Get parallax z-index by layer
  getParallax: (layer: keyof typeof zIndex.parallax) => zIndex.parallax[layer],
  // Check if z-index is above another
  isAbove: (z1: number, z2: number) => z1 > z2,
  // Get next z-index above
  above: (z: number, step = 10) => z + step,
  // Get next z-index below
  below: (z: number, step = 10) => z - step,
} as const

export type ZIndexLayer = keyof typeof zIndex.semantic
export type ZIndexComponent = keyof typeof zIndex.component
export type ZIndexParallax = keyof typeof zIndex.parallax