/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'custom_md': '800px',
        'custom_lg': '1024px',
      }
    },
  },
  plugins: [],
}

