/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5ECE7B"
      },
      boxShadow: {
        'product': '0px 4px 35px 0px #A8ACB030;',
      }
    },
  },
  plugins: [],
}

