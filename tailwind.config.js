/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        sellora: {
          primary: '#7C3AED', // Purple
          accent: '#F43F5E',  // Rose
          light: '#C084FC',   // Light purple
          pearl: '#FAFAFA',   // Light background
        },
      },
    },
  },
  plugins: [],
}

