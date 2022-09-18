/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"]
      },
      colors: {
        'orange': '#f6c887',
        'cream': '#fcf9ed',
        'purple': '#352e4e',
        'light-purple': '#665c84',
      },
    },
  },
  plugins: [],
}