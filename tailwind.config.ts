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
        bg: '#06060c',
        card: 'rgba(255, 255, 255, 0.03)',
        glass: 'rgba(255, 255, 255, 0.05)',
        primary: '#7c3aed',
        'primary-light': '#a78bfa',
        'primary-dark': '#5b21b6',
        'primary-glow': 'rgba(124, 58, 237, 0.25)',
        gold: '#f59e0b',
        success: '#10b981',
        danger: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'float': 'float 5s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'morph': 'morph 8s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
