import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:          '#1A2580',
        'navy-deep':   '#0D1445',
        accent:        '#5A72ED',
        'accent-mid':  '#3D52C4',
        'blue-light':  '#6B7FEE',
        'blue-soft':   '#8B9CF0',
        'pure-black':  '#050916',
        'blue-base':   '#F0F4FF',
        'blue-border': '#C7D4FF',
        'blue-subtle': '#E0E8FF',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body:    ['var(--font-body)',    'sans-serif'],
      },
      animation: {
        'float':            'float 4s ease-in-out infinite',
        'reveal-up':        'revealUp 0.65s ease-out forwards',
        'shimmer':          'shimmer 2.5s linear infinite',
        'marquee':          'marquee 55s linear infinite',
        'marquee-reverse':  'marqueeReverse 55s linear infinite',
        'glow-pulse':       'glowPulse 4s ease-in-out infinite',
        'tilt-enter':       'tiltEnter 0.4s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        revealUp: {
          from: { opacity: '0', transform: 'translateY(24px)', filter: 'blur(4px)' },
          to:   { opacity: '1', transform: 'translateY(0)',    filter: 'blur(0)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        marqueeReverse: {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
          '50%':      { opacity: '0.9', transform: 'scale(1.12)' },
        },
        tiltEnter: {
          from: { opacity: '0', transform: 'perspective(600px) rotateY(8deg) translateY(20px)' },
          to:   { opacity: '1', transform: 'perspective(600px) rotateY(0deg) translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
