// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/frontend/index.html',
    './apps/frontend/src/**/*.{ts,tsx,js,jsx}',
    // If you import components from Nx libs, include them:
    './libs/**/*.{ts,tsx,js,jsx,html}'
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Semantic color tokens - Design system colors (using names, not numbers)
        primary: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          darker: '#1d4ed8',
        },
        secondary: {
          light: '#818cf8',
          DEFAULT: '#6366f1',
          dark: '#4f46e5',
          darker: '#4338ca',
        },
        accent: {
          light: '#60a5fa',
          DEFAULT: '#3b82f6',
          dark: '#2563eb',
          darker: '#1d4ed8',
        },
        success: {
          light: '#4ade80',
          DEFAULT: '#22c55e',
          dark: '#16a34a',
          darker: '#15803d',
        },
        error: {
          light: '#f87171',
          DEFAULT: '#ef4444',
          dark: '#dc2626',
          darker: '#b91c1c',
        },
        warning: {
          light: '#facc15',
          DEFAULT: '#eab308',
          dark: '#ca8a04',
          darker: '#a16207',
        },
        info: {
          light: '#22d3ee',
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          darker: '#0e7490',
        },
        // Background colors - semantic neutral colors
        background: {
          lightest: '#ffffff',
          light: '#f9fafb',
          DEFAULT: '#f3f4f6',
          dark: '#171717',
          darker: '#0a0a0a',
        },
        // Text colors - semantic neutral colors
        text: {
          lightest: '#fafafa',
          light: '#111827',
          DEFAULT: '#6b7280',
          dark: '#a3a3a3',
          darker: '#737373',
        },
        // Border colors - semantic neutral colors
        border: {
          light: '#e5e7eb',
          DEFAULT: '#e5e7eb',
          dark: '#262626',
          darker: '#404040',
        },
      },
    },
  },
  plugins: [],
  // Force regeneration for development
  safelist: [
  ],
};
