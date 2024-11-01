/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'rhythmix-green': '#1DB954',
        'rhythmix-black': '#121212',
        'rhythmix-gray': '#282828',
        'rhythmix-light-gray': '#B3B3B3',
        'wasabi': {
          50: '#f5f9f0',
          100: '#e7f4d9',
          200: '#d2e9b7',
          300: '#b3d88c',
          400: '#8ed553',
          500: '#7ac142',
          600: '#5a9f2f',
          700: '#477a26',
          800: '#3c6123',
          900: '#345321',
        },
      },
      backgroundColor: {
        'rhythmix-base': '#121212',
        'rhythmix-highlight': '#1A1A1A',
      },
      gradientColorStops: {
        'rhythmix-start': '#404040',
        'rhythmix-end': '#121212',
      },
      fontFamily: {
        'japanese': ['Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}