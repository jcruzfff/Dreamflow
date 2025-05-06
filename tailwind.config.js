/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-helvetica)'],
        mono: ['var(--font-geist-mono)'],
      },
      screens: {
        'xs': '480px',
        'xl2': '1100px',
      },
      colors: {
        dreamflow: {
          'gold': '#F3CD83',
          'gold-dark': '#CEA14B',
          'gray-dark': '#111111',
          'gray-medium': '#1F1F1F',
          'gray-light': '#86868B',
          'text-secondary': '#B2B2B2',
          'text-primary': '#FFFFFF',
        }
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [],
} 