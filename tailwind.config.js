/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-purple': '#d5aaf9',
        'primary-cyan': '#40d0f2',
        'primary-green': '#32ca73',
        background: '#000000',
        foreground: '#FFFFFF',
        border: '#262626',
        ring: '#40d0f2',
        accent: '#1A1A1A',
        'accent-foreground': '#FFFFFF',
        input: '#262626',
      },
    },
  },
  plugins: [],
}

