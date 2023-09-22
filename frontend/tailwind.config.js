// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        DEFAULT: '0.25rem', // Default border radius
        sm: '0.125rem',     // Small border radius
        md: '0.375rem',     // Medium border radius
        lg: '0.5rem',       // Large border radius
        xl: '1rem',         // Extra large border radius
      },
    },
  },
  plugins: [],
}
