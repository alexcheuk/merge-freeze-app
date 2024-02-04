const { nextui } = require('@nextui-org/react')

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {},
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          medium: 8,
        },
      },
      themes: {
        dark: {
          colors: {
            foreground: '#DDE6ED',
            background: '#27374D',
            primary: '#526D82',
          },
        },
      },
    }),
  ],
}
