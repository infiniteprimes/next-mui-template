/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './component/**/*.{js,ts,jsx,tsx}',
    './module/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      primary: '#064e3b',
      secondary: '#2196f3',
      warning: '#FFB300',
      error: '#ef5350',
      darkBackground: '#393939',
    },
    extend: {},
  },
  plugins: [],
  important: ['#__next', '.MuiDialog-root'],
}
