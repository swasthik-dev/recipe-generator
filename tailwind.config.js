/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FFF3EE',
          100: '#FFE6DC',
          200: '#FFCDB9',
          300: '#FFA98A',
          400: '#FF8A64',
          500: '#FF6B35', // Primary orange
          600: '#E85529',
          700: '#C4401A',
          800: '#A33415',
          900: '#822C13',
        },
        secondary: {
          50: '#EEFAF3',
          100: '#DCF6E6',
          200: '#BDE9CF',
          300: '#8ED7AF',
          400: '#6CC992',
          500: '#4CB963', // Secondary green
          600: '#3DA352',
          700: '#2D7F3F',
          800: '#246631',
          900: '#1B4D26',
        },
        accent: {
          50: '#F9F5F1',
          100: '#F4ECE3',
          200: '#E4D3C0',
          300: '#D3BA9E',
          400: '#C09A75',
          500: '#A67C52', // Accent brown
          600: '#8D6641',
          700: '#714F31',
          800: '#573C25',
          900: '#3F2C1B',
        },
        neutral: {
          50: '#F9F9F9',
          100: '#F1F1F1',
          200: '#E1E1E1',
          300: '#C8C8C8',
          400: '#ABABAB',
          500: '#8E8E8E',
          600: '#6F6F6F',
          700: '#525252',
          800: '#393939',
          900: '#262626',
        },
        success: {
          100: '#DCFCE7',
          500: '#22C55E',
          700: '#15803D',
        },
        warning: {
          100: '#FEF9C3',
          500: '#EAB308',
          700: '#A16207',
        },
        error: {
          100: '#FEE2E2',
          500: '#EF4444',
          700: '#B91C1C',
        },
      },
      fontFamily: {
        sans: ['"Source Sans 3"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
        slideUp: 'slideUp 0.5s ease-out',
        slideDown: 'slideDown 0.3s ease-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'card': '0 4px 10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 10px 15px rgba(0, 0, 0, 0.06), 0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};