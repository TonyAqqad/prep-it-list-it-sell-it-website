// Prep It List It Sell It - Brand Design System
// Professional Navy & Gold Aesthetic - Inspired by Logo

export const brand = {
  colors: {
    // Primary - Deep Navy Blue (trust, professionalism, reliability)
    primary: {
      DEFAULT: '#1B2838',
      50: '#E8EBF0',
      100: '#D1D7E0',
      200: '#A3AFC1',
      300: '#7587A3',
      400: '#475F84',
      500: '#1B2838',
      600: '#18232F',
      700: '#141D27',
      800: '#10171F',
      900: '#0C1117',
      950: '#080B0F',
    },
    // Secondary - Warm Gold (premium, quality, value)
    secondary: {
      DEFAULT: '#D4A74A',
      50: '#FCF8EF',
      100: '#F9F0D9',
      200: '#F2E0B3',
      300: '#EBD08D',
      400: '#E4C167',
      500: '#D4A74A',
      600: '#B8893A',
      700: '#976C2E',
      800: '#765022',
      900: '#553416',
      950: '#3A230F',
    },
    // Background palette - Navy variations
    background: {
      dark: '#1B2838',
      darker: '#0F1923',
      surface: '#243447',
      elevated: '#2D4156',
      light: '#F8F9FA',
    },
    // Text colors
    text: {
      primary: '#FFFFFF',
      secondary: '#B8C5D6',
      muted: '#7A8FA6',
      inverse: '#1B2838',
      gold: '#D4A74A',
    },
  },

  // Font configuration
  fonts: {
    display: ['Playfair Display', 'Georgia', 'serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
  },

  // Design tokens for the refined aesthetic
  design: {
    shadow: {
      DEFAULT: '0 4px 20px rgba(27, 40, 56, 0.15)',
      lg: '0 8px 40px rgba(27, 40, 56, 0.2)',
      gold: '0 4px 20px rgba(212, 167, 74, 0.25)',
      goldGlow: '0 0 60px rgba(212, 167, 74, 0.15)',
    },
    border: {
      width: '2px',
      gold: '2px solid #D4A74A',
      navy: '2px solid #1B2838',
    },
    radius: {
      sm: '4px',
      DEFAULT: '8px',
      lg: '12px',
      xl: '16px',
    },
  },

  // Animation tokens
  animation: {
    duration: {
      instant: '100ms',
      fast: '150ms',
      base: '250ms',
      slow: '350ms',
      slower: '500ms',
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    },
  },

  // Spacing
  spacing: {
    section: {
      sm: '4rem',
      md: '6rem',
      lg: '8rem',
    },
  },
} as const;

export type BrandColors = typeof brand.colors;
export type BrandDesign = typeof brand.design;
