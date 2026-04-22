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
        background: '#FAFAFA',
        surface: '#FFFFFF',
        accent: '#F5F5F5',
        primary: '#1A1A1A',
        text: {
          primary: '#0A0A0A',
          secondary: '#737373',
        },
        success: {
          gold: '#B8860B',
        },
        border: {
          light: '#E5E5E5',
        },
        error: '#DC2626',
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
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      spacing: {
        'container-mobile': '16px',
        'container-tablet': '24px',
        'container-desktop': '32px',
        'gap-sm': '8px',
        'gap-md': '16px',
        'gap-lg': '24px',
        'gap-xl': '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        pill: '9999px',
      },
      boxShadow: {
        subtle: '0 2px 8px rgba(0,0,0,0.04)',
        medium: '0 4px 16px rgba(0,0,0,0.06)',
        large: '0 8px 24px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
