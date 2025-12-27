import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary - Deep Navy Blue
        primary: {
          DEFAULT: "#1B2838",
          50: "#E8EBF0",
          100: "#D1D7E0",
          200: "#A3AFC1",
          300: "#7587A3",
          400: "#475F84",
          500: "#1B2838",
          600: "#18232F",
          700: "#141D27",
          800: "#10171F",
          900: "#0C1117",
          950: "#080B0F",
        },
        // Secondary - Warm Gold
        secondary: {
          DEFAULT: "#D4A74A",
          50: "#FCF8EF",
          100: "#F9F0D9",
          200: "#F2E0B3",
          300: "#EBD08D",
          400: "#E4C167",
          500: "#D4A74A",
          600: "#B8893A",
          700: "#976C2E",
          800: "#765022",
          900: "#553416",
          950: "#3A230F",
        },
        // Background variations
        background: {
          dark: "#1B2838",
          darker: "#0F1923",
          surface: "#243447",
          elevated: "#2D4156",
          light: "#F8F9FA",
        },
        // Gold accent for special use
        gold: {
          DEFAULT: "#D4A74A",
          light: "#E4C167",
          dark: "#B8893A",
        },
        // Navy alias
        navy: {
          DEFAULT: "#1B2838",
          light: "#243447",
          dark: "#0F1923",
        },
      },
      spacing: {
        'xs': '8px',
        'sm': '13px',
        'md': '21px',
        'lg': '34px',
        'xl': '55px',
        '2xl': '89px',
        '3xl': '144px',
      },
      fontSize: {
        'micro': ['12px', { lineHeight: '1.4' }],
        'small': ['14px', { lineHeight: '1.5' }],
        'body': ['17px', { lineHeight: '1.6' }],
        'lead': ['21px', { lineHeight: '1.5' }],
        'title': ['34px', { lineHeight: '1.2' }],
        'display': ['55px', { lineHeight: '1.15' }],
        'hero': ['72px', { lineHeight: '1.1' }],
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 2px 10px rgba(27, 40, 56, 0.08)",
        card: "0 4px 20px rgba(27, 40, 56, 0.12)",
        elevated: "0 8px 40px rgba(27, 40, 56, 0.16)",
        gold: "0 4px 20px rgba(212, 167, 74, 0.25)",
        "gold-glow": "0 0 60px rgba(212, 167, 74, 0.15)",
        "inner-gold": "inset 0 2px 4px rgba(212, 167, 74, 0.1)",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out",
        "fade-in-down": "fadeInDown 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "slide-in-right": "slideInRight 0.5s ease-out",
        "slide-in-left": "slideInLeft 0.5s ease-out",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-gold": "pulseGold 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeInDown: {
          "0%": { opacity: "0", transform: "translateY(-20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGold: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212, 167, 74, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(212, 167, 74, 0.5)" },
        },
      },
    },
  },
  plugins: [forms],
};

export default config;
