/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Refined Luxury Palette — surgical upgrade
        background: '#fbf8f2',
        surface: '#FFFFFF',
        accent: '#f6f1e8',
        primary: '#111111',
        text: {
          primary: '#2b2b2b',
          secondary: '#5c5c5c',
        },
        success: {
          gold: '#caa25d',
        },
        border: {
          light: '#E7E1D6',
        },
        error: '#B00020',

        'andy-black': '#111111',
        'andy-charcoal': '#1b1b1b',
        'andy-ivory': '#fbf8f2',
        'andy-gold': '#caa25d',
        'andy-bronze': '#9f7b43',
        'andy-green': '#173126',
        'andy-wine': '#4B1E25',
        'andy-stone': '#E7E1D6',
        'andy-smoke': '#D7D6D2',
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.2' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.5' }],
        lg: ['1.125rem', { lineHeight: '1.5' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.5' }],
        '3xl': ['2rem', { lineHeight: '1.5' }],
        '4xl': ['2.5rem', { lineHeight: '1.1' }],
        '5xl': ['3.5rem', { lineHeight: '1.05' }],
        '6xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        'container-mobile': '16px',
        'container-tablet': '24px',
        'container-desktop': '32px',
        'gap-sm': '8px',
        'gap-md': '16px',
        'gap-lg': '24px',
        'gap-xl': '48px',
        'gap-2xl': '64px',
        'gap-3xl': '96px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
        pill: '9999px',
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(0,0,0,0.04)',
        medium: '0 4px 16px rgba(0,0,0,0.06)',
        large: '0 8px 24px rgba(0,0,0,0.08)',
        premium: '0 12px 40px rgba(17,17,17,0.10)',
        'gold-soft': '0 4px 20px rgba(202,162,93,0.15)',
        richer: '0 14px 35px rgba(0,0,0,0.06)',
      },
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        marquee: 'marquee 62s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
      },
    },
  },
  plugins: [],
};
