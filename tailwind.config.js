/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
          "base": "#ffffff",
          "background": "#f5f5f5",
          "primary": "#f5f6fa",
          "accent": "#7983ff",
          "main-text": "#2b2b2b",
          "secondary-text": "#b1b0b4",
          "accent-text": "#3d5afe"
        },
        boxShadow: {
          '3xl': 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        },
    },
  },
  plugins: [],
}
