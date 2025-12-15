// =============================================================================
// Application Configuration
// =============================================================================

export const APP_CONFIG = {
  name: 'LANEGAP',
  description: 'League of Legends Midlane Coaching App',
  version: '1.0.0',
  author: 'LaneGap Team',

  // Patch version for Data Dragon
  patchVersion: process.env.NEXT_PUBLIC_PATCH_VERSION ?? '15.1.1',

  // URLs
  appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',

  // Default language
  defaultLanguage: 'en' as const,

  // Scrim mode default
  defaultScrimMode: false,
} as const

// =============================================================================
// UI Constants
// =============================================================================

export const UI_CONFIG = {
  // Champion icon sizes
  iconSizes: {
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
  },

  // Animation durations
  animations: {
    fast: 150,
    normal: 200,
    slow: 300,
  },

  // Breakpoints (matching Tailwind defaults)
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // Grid columns for champion grid
  championGridCols: {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 10,
  },
} as const

// =============================================================================
// Keyboard Shortcuts
// =============================================================================

export const KEYBOARD_SHORTCUTS = {
  search: '/',
  toggleScrimMode: 's',
  toggleLanguage: 'l',
  escape: 'Escape',
  enter: 'Enter',
  arrowUp: 'ArrowUp',
  arrowDown: 'ArrowDown',
  arrowLeft: 'ArrowLeft',
  arrowRight: 'ArrowRight',
} as const
