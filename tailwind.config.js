/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        'background': {
          'primary': '#ffffff',
          'secondary': '#f8fafc',
          'tertiary': '#f1f5f9',
        },
        'text': {
          'primary': '#1e293b',
          'secondary': '#334155',
          'muted': '#475569',
        },
        'accent': {
          'primary': '#3b82f6',
          'secondary': '#2563eb',
          'hover': '#60a5fa',
          'light': '#dbeafe',
        },
        'border': {
          'default': '#e2e8f0',
          'light': '#cbd5e1',
        },
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
