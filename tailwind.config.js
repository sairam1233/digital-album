/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans 3', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: {
          50: '#f5f7ff',
          100: '#ebf0fe',
          200: '#d6e0fd',
          300: '#b3c7fc',
          400: '#8aa6f9',
          500: '#6284f5',
          600: '#3a5eeb',
          700: '#2e4bd3',
          800: '#2941b5',
          900: '#1f3176',
        },
        accent: {
          50: '#fef4ee',
          100: '#fde7d8',
          200: '#faccb0',
          300: '#f7aa7e',
          400: '#f58149',
          500: '#f35d23',
          600: '#e44316',
          700: '#bd3315',
          800: '#972c19',
          900: '#7a2818',
        },
        neutral: {
          50: '#f9f9fa',
          100: '#f0f1f3',
          200: '#e4e6ea',
          300: '#d2d5dd',
          400: '#a9afc0',
          500: '#8891a7',
          600: '#6c768e',
          700: '#585f74',
          800: '#45495c',
          900: '#383b4a',
        },
      },
      boxShadow: {
        'book': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 -5px 15px -3px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'page-texture': "url('https://images.pexels.com/photos/5186869/pexels-photo-5186869.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }
    },
  },
  plugins: [],
};