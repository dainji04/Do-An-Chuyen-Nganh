/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'text-primary': '#1d1d1f',
        'text-secondary': '#6e6e73',
        'bg-primary': '#f5f5f7',
        'bg-secondary': '#ffffff',
        'bg-ternary': '#d2d2d7a3',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '2px 4px 12px #00000014',
      },
    },
  },
  plugins: [],
};
