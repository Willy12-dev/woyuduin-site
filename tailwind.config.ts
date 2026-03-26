import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#08080f',
        card: 'rgba(255, 255, 255, 0.04)',
        glass: 'rgba(255, 255, 255, 0.06)',
        primary: '#7c3aed',
        'primary-light': '#a78bfa',
        'primary-dark': '#5b21b6',
        'primary-glow': 'rgba(124, 58, 237, 0.25)',
        gold: '#f59e0b',
        success: '#10b981',
        danger: '#ef4444',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
