/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DAA520', // Gold
          light: '#FFD700',
          dark: '#886B08',
        },
        accent: {
          DEFAULT: '#000000', // Black
          light: '#333333',
          dark: '#000000',
        },
      },
      fontFamily: {
        lato: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
