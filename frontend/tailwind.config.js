/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          50: '#eef8ff',
          100: '#d9eeff',
          200: '#bce0ff',
          300: '#8eccff',
          400: '#59adff',
          500: '#3188ff',
          600: '#1a66f5',
          700: '#1450e1',
          800: '#1742b6',
          900: '#193b8f',
        },
        surface: {
          DEFAULT: '#f6f8fc',
          dark: '#0f1419',
        },
      },
      boxShadow: {
        card: '0 4px 24px -4px rgba(15, 20, 25, 0.08)',
        'card-dark': '0 4px 24px -4px rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [],
};
