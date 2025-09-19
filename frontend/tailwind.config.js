/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          lime: '#32ff9c',
          violet: '#9b5fff',
          cyan: '#4dd0ff'
        }
      },
      fontFamily: {
        techno: ['"Orbitron"', 'sans-serif'],
        pixel: ['"Press Start 2P"', 'cursive']
      },
      backgroundImage: {
        'pixel-grid': 'linear-gradient(rgba(50,255,156,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(155,95,255,0.08) 1px, transparent 1px)'
      },
      animation: {
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-2%)' },
          '50%': { transform: 'translateY(2%)' }
        }
      }
    }
  },
  plugins: []
};
