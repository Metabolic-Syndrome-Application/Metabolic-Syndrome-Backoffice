import type { Config } from 'tailwindcss';
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-ibm)', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'default-blue': '#2F4EF1',
        'dark-blue': '#1438F3',
        'light-blue': '#C9E1FD',
        'default-gray': '#7B7B7B',
        'light-gray': '#E3E3E3',
        'default-yellow': '#FFC556',
        'dark-yellow': '#EE9E03',
        'light-yellow': '#FFE58A',
        'default-green': '#42884B',
        'dark-green': '#27532D',
        'light-green': '#A5D1B0',
        'default-red': '#FB6262',
        'dark-red': '#8A0E0E',
        'light-red': '#FFA1A1',
        'default-orange': '#FC825D',
      },
      boxShadow: {
        'default-shadow': '0px 16px 40px 0px rgba(112, 144, 182, 0.20)',
        'light-shadow':
          'rgb(239, 240, 244) 0px -1px 0px inset, rgb(239, 240, 244) 0px 1px 0px inset',
      },

      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: '0.99',
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: '0.4',
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
} satisfies Config;
