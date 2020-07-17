/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      },
      inset: {
        ...defaultTheme.spacing
      },
      minHeight: {
        ...defaultTheme.spacing
      },
      colors: {
        gray: {
          '100': '#f7fafc',
          '200': '#edf2f7',
          '300': '#e2e8f0',
          '400': '#cbd5e0',
          '500': '#a0aec0',
          '600': '#718096',
          '700': '#4a5568',
          '800': '#2d3748',
          '900': '#1a202c'
        },
        orange: {
          '100': '#fffaf0',
          '200': '#feebc8',
          '300': '#fbd38d',
          '400': '#f6ad55',
          '500': '#ed8936',
          '600': '#dd6b20',
          '700': '#c05621',
          '800': '#9c4221',
          '900': '#7b341e'
        }
      },
      stroke: {
        gray: {
          ...defaultTheme.colors.gray
        },
        orange: {
          ...defaultTheme.colors.orange
        }
      }
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'disabled'],
    cursor: ['responsive', 'disabled'],
    padding: ['responsive', 'last'],
    borderWidth: ['responsive', 'last']
  },
  plugins: [require('@tailwindcss/ui')]
}
