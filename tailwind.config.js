module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      black: '#000000',
      white: '#FFFFFF',
      grey: {
        default: '#b7b7b7',
      },
      cream: {
        default: '#faf395',
      }
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1600px',
    },
    fontSize: {
      'xs': '.75rem',
      'sm': '.875rem',
      'base': '1rem',
      'lg': '1.125rem',
      'xl': '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5.625rem',
    },
    extend: {
      fontFamily: {
        sans: ['Founders Grotesk','Helvetica','Arial','sans-serif'],
        display: ['Bon Vivant','Georgia','Times','Times New Roman','serif']
      },
    }
  },
  plugins: [
    require('tailwindcss-transition')({
      standard: 'all .3s ease',
      transitions: { 'slow': 'all 0.7s ease' }
    })
  ],
  corePlugins: {
    container: false
  }
}