/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#FF007C',
        secondary: '#54595F',
        terciary: '#2F1D57',
        text: '#7A7A7A',
        accent: '#61CE70',
        'accent-dark': '#10C300',
      },
      fontFamily: {
        sans: ['Montserrat Alternates', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
