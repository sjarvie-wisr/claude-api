import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './context/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#323F51',
        teal: '#62C4BB',
        'teal-dark': '#4aada4',
        'teal-light': '#e8f8f7',
        bg: '#f7f9fb',
        'code-bg': '#1e2a38',
      },
      fontFamily: {
        mono: ["'SF Mono'", 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
