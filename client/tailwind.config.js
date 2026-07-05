
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCF8',
          100: '#FAF5E6',
          200: '#F5E9C7',
          300: '#EDD69F',
          400: '#E4BF70',
          500: '#D8A448',
          600: '#CA8732',
          700: '#A1682C',
          800: '#82542C',
          900: '#6B4629',
        },
        onyx: {
          50: '#F6F6F7',
          100: '#EDEEF0',
          200: '#D8DADD',
          300: '#B9BCC2',
          400: '#9397A0',
          500: '#737782',
          600: '#5A5D68',
          700: '#494C55',
          800: '#3E4047',
          900: '#1A1B1F',
        }
      }
    },
  },
  plugins: [],
}
