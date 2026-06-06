/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2d6a4f',
        secondary: '#52b788',
        danger: '#e63946'
      }
    }
  },
  plugins: []
}