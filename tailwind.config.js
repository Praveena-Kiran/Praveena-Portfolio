/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas:  '#1B1915',
        ink:     '#E9E4D9',
        muted:   '#A09A8E',
        dim:     '#3D3A34',
        seam:    '#2C2924',
        accent:  '#C47A2C',
        surface: '#1A1815',
        lift:    '#222019',
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans:    ['Manrope', 'system-ui', 'sans-serif'],
        mono:    ["'JetBrains Mono'", 'ui-monospace', 'monospace'],
      },
      keyframes: {
        'blob-drift': {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':      { transform: 'translate(30px,-20px) scale(1.05)' },
          '66%':      { transform: 'translate(-20px,15px) scale(0.97)' },
        },
      },
      animation: {
        'blob-drift': 'blob-drift 18s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
