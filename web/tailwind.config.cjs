/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: 'Inter, sans-serif',
      },
      backgroundImage: {
        galaxy: 'url("/assets/background-galaxy.png")',
      },
    },
  },
  plugins: [],
}
