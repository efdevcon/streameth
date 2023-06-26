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
          "primary": "#201F27",
          "base": "#33323b",
          "secondary": "#4b4a53",
          "tertiary": "#262628",
          "special": "#140437",
          "accent": "#f3907b",
          "main-text": "#ffffff",
          "secondary-text": "#7d7c83",
          "button": "#383838",
        },
    },
  },
  plugins: [],
}
