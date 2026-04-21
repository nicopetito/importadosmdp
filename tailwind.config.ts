import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
      },
      colors: {
        accent:       '#5A72ED',
        'accent-dark':'#3D52C4',
        navy:         '#1A2580',
        'navy-deep':  '#0D1445',
        'blue-base':  '#F0F4FF',
        'blue-light': '#E0E8FF',
        'blue-border':'#C7D4FF',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-20px)' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(28px)', filter: 'blur(6px)' },
          to:   { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0)' },
        },
      },
      animation: {
        'float':      'float 4s ease-in-out infinite',
        'reveal-up':  'revealUp 0.7s ease-out both',
        'reveal-up-1':'revealUp 0.7s 120ms ease-out both',
        'reveal-up-2':'revealUp 0.7s 240ms ease-out both',
        'reveal-up-3':'revealUp 0.7s 360ms ease-out both',
        'reveal-up-4':'revealUp 0.7s 480ms ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
