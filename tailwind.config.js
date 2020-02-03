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
      },
      peach: {
        default: '#ffc3c3',
      },
      blue: {
        default: '#d5edeb',
      },
      lilac: {
        default: '#e4a6ff',
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
      'xl': '1.3125rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.5rem',
      '5xl': '3.125rem',
      '6xl': '4.25rem',
      '7xl': '5.625rem',
      '8xl': '7.5rem',
    },
    extend: {
      lineHeight: {
        'm': '1.6rem',
        'col': '3rem',
        'heading': '3.125rem',
      },
      fontFamily: {
        sans: ['Founders Grotesk','Helvetica','Arial','sans-serif'],
        display: ['Bon Vivant','Georgia','Times','Times New Roman','serif']
      },
      height: {
        '100': '20rem',
        '124': '30rem'
      }
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