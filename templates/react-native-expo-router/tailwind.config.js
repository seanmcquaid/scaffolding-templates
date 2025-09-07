/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007AFF',
          dark: '#0056CC',
        },
        secondary: '#5856D6',
        background: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
        },
        surface: {
          DEFAULT: '#F2F2F7',
          dark: '#1C1C1E',
        },
        text: {
          DEFAULT: '#000000',
          dark: '#FFFFFF',
          secondary: '#8E8E93',
        },
        border: {
          DEFAULT: '#C6C6C8',
          dark: '#38383A',
        },
        gray: {
          300: '#d1d5db',
          600: '#6b7280',
          700: '#374151',
          800: '#1f2937',
        },
        error: '#FF3B30',
        success: '#34C759',
        warning: '#FF9500',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        xxl: '48px',
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      fontSize: {
        'h1': ['32px', { lineHeight: '40px', fontWeight: 'bold' }],
        'h2': ['24px', { lineHeight: '32px', fontWeight: 'bold' }],
        'h3': ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '24px' }],
        'caption': ['14px', { lineHeight: '20px' }],
        'small': ['12px', { lineHeight: '16px' }],
      },
      lineHeight: {
        '5.5': '22px',
      },
    },
  },
  plugins: [],
};