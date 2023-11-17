/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'app-background': '#F0EFE9',
        'app-white': '#FFF',
        'app-border':'#EDEDED',
        'app-black': '#000',
        'app-blue':'#1577EA',
        'app-gray':'#A6A6A6',
        'app-light-blue':'#7BB4F8',

      },
    },
  },
  plugins: [],
}

