/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        'custom-pink': '#E876B0',
        "custom-sky": "#76e8c8",
        'custom-light-blue': '#eaf6ff',
      },
      backgroundImage: {
        'custom-gradient': 'radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(161,185,229,1) 86%, rgba(161,185,229,1) 86%, rgba(161,185,229,0.9529936974789917) 86%, rgba(148,187,233,1) 100%)',
      },
    },
  },
  plugins: [],
}

