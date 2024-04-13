/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: '#9900ff',
        'violet-medium': '#a50fff',
        'violet-light': '#ca6cff',
        'violet-bg': '#c084fc',
      },
    },
  },
  darkMode: 'selector',
  plugins: ['prettier-plugin-tailwindcss'],
}