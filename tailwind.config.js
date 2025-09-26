/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",
    "./src/**/*.{js,ts,jsx,tsx,vue,html}",
    "./pages/**/*.html"
  ],
  theme: {
    extend: {
      // Sakura Brand Colors - Exact match from original
      colors: {
        sakura: {
          primary: '#1e2a3b',
          'primary-light': '#2d3f5a',
          'primary-dark': '#0f1419',
          secondary: '#5b8bf5',
          'secondary-light': '#7ba5ff',
          accent: '#10b981',
          'accent-light': '#34d399',
          warning: '#f59e0b',
          danger: '#ef4444',
          success: '#10b981',
          purple: '#8b5cf6',
          'purple-light': '#a78bfa',
          pink: '#ec4899',
          'pink-light': '#f472b6',

          // Ultra Soft Neutrals
          white: '#ffffff',
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a'
          }
        }
      },

      // Typography - Exact fonts from original
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Poppins', 'system-ui', 'sans-serif']
      },

      // Spacing system
      spacing: {
        '18': '4.5rem',
        '88': '22rem'
      },

      // Border radius - Modern rounded corners
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.25rem',
        '4xl': '1.75rem',
        '5xl': '2rem',
        '6xl': '2.5rem'
      },

      // Box shadows - Subtle modern shadows
      boxShadow: {
        'subtle': '0 1px 2px 0 rgb(0 0 0 / 0.02)',
        'soft': '0 2px 4px 0 rgb(0 0 0 / 0.03), 0 1px 2px 0 rgb(0 0 0 / 0.02)',
        'medium': '0 4px 8px -2px rgb(0 0 0 / 0.04), 0 2px 4px -1px rgb(0 0 0 / 0.03)',
        'elevated': '0 10px 20px -5px rgb(0 0 0 / 0.06), 0 4px 8px -2px rgb(0 0 0 / 0.04)',
        'high': '0 20px 30px -10px rgb(0 0 0 / 0.08), 0 8px 12px -4px rgb(0 0 0 / 0.05)'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}