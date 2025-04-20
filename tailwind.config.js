/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'code-dark': '#2d2d2d',
        'code-light': '#f5f5f5',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
