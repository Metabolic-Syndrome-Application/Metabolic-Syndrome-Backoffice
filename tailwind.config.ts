import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ibm: ['var(--font-ibm)'],
        // primary: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'default-blue': '#2F4EF1',
        'dark-blue': '#1438F3',
        'light-blue': '#C9E1FD',
        'soft-blue': '#E5F1FF',
        'default-gray': '#7B7B7B',
        'light-gray': '#E3E3E3',
        'dark-gray': '#484554',
        'form-gray': '#C4C4C4',
        'default-yellow': '#FFC556',
        'dark-yellow': '#EE9E03',
        'light-yellow': '#FFE58A',
        'soft-yellow': '#FFEFB9',
        'default-green': '#42884B',
        'dark-green': '#27532D',
        'light-green': '#A5D1B0',
        'soft-green': '#B6E8C2',
        'default-red': '#FB6262',
        'dark-red': '#8A0E0E',
        'light-red': '#FFA1A1',
        'soft-red': '#FFCECE',
        'default-orange': '#FC825D',
      },
      boxShadow: {
        'default-shadow': '0px 16px 40px 0px rgba(112, 144, 182, 0.20)',
        'light-shadow': '0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
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
