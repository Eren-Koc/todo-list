/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        'app-background': '#F0EFE9',
        'app-white': 'var(--background-color)',
        'app-border':'var(--border-color)',
        'app-black': 'var(--primary-text-color)',
        'app-blue':"var(--first-section-color)",
        'app-gray':'#A6A6A6',
        'app-light-blue':"var(--second-section-color)",

      },
    },
  },
  plugins: [],
}

