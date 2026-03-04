/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#000000',
        card: '#f9fafb',
        'card-foreground': '#000000',
        primary: '#3b82f6',
        'primary-foreground': '#ffffff',
        secondary: '#e5e7eb',
        'secondary-foreground': '#000000',
        accent: '#10b981',
        destructive: '#ef4444',
      }
    },
  },
  plugins: [],
}
