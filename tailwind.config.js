/** @type {import('tailwindcss').Config} */

const ADDITIONAL_COLORS = {
  pink: 'rgba(252,70,107,1)',
  blue: 'rgba(78,78,139,1)',
  aqua: 'rgba(64,207,215,1)',
};

module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: ADDITIONAL_COLORS,
      gradientColorStops: theme => ADDITIONAL_COLORS,
    },
  },
  plugins: [],
};
