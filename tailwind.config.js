/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./script.js"],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          cobalt: '#09318d',
          navy: '#050e24',
          surface: '#091a44',
          raised: '#0f245c',
          pink: '#fd91cc',
          pinkHover: '#fcafd7',
          white: '#ffffff',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        comic: ['Bangers', 'Impact', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
