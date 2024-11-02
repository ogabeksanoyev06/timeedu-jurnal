/** @type {import('tailwindcss').Config} */
export default {
  content: ['./components/**/*.{js,vue,ts}', './layouts/**/*.vue', './pages/**/*.vue', './plugins/**/*.{js,ts}', './nuxt.config.{js,ts}', './app.vue', './error.vue'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1480px',
        },
      },
      colors: {
        dark: '#020105',
        primary: '#8959C6',
        secondary: '#33346C',
        neutral: '#5D5D5F',
        deepBlue: '#001935',

        gray: {
          1: '#F5F5F7',
          2: '#F3EAFF',
          3: '#D9E3EE',
          4: '#EBEBEB',
          5: '#C2C2C3',
          6: '#9A999B',
        },

        accent: {
          1: '#64658F',
          2: '#9E9FC2',
        },
      },
      boxShadow: {
        card: '0px 12px 48px -12px rgba(1, 20, 50, 0.20)',
        dropdown: '0px 6px 24px 0px rgba(9, 10, 37, 0.12)',
        section: '0 4px 20px rgba(0,0,0,.15)!important',
        header: '0 4px 20px 0 #7D848D1A,0 3px 6px 0 #7D848D0F',
      },
      lineHeight: {
        110: '110%',
        130: '130%',
        140: '140%',
        150: '150%',
      },
    },
  },
  plugins: [],
}
