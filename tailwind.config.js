/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ff1493', // Deep pink
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
        },
        accent: {
          500: '#e11d48', // Rose red
        }
      },
      animation: {
        'slide-left': 'slideLeft 0.5s ease-out',
        'slide-right': 'slideRight 0.5s ease-out',
        'bounce': 'bounce 1s infinite',
      },
      boxShadow: {
        'pink': '0 4px 14px 0 rgba(219, 39, 119, 0.15)',
      },
    },
  },
  plugins: [],
};