/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vp: {
          primary: '#FF4757',
          secondary: '#2F3542',
          accent: '#FFA502',
          bg: '#FAFAF9',
          text: '#1A1A2E',
        },
      },
      fontFamily: {
        display: ['Syne', 'DM Sans', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      borderRadius: {
        vp: '12px',
      },
      boxShadow: {
        'vp-sm': '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06)',
        'vp-md': '0 4px 16px rgba(0,0,0,0.10)',
        'vp-lg': '0 8px 32px rgba(0,0,0,0.12)',
      },
      keyframes: {
        gridItemIn: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'grid-item': 'gridItemIn 360ms ease both',
      },
    },
  },
  plugins: [],
};
