export default {
  darkMode: 'class',
  extract: {
    include: ['./index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules', '.git'],
  },
  plugins: [
    require('windicss/plugin/scroll-snap'),
  ],
}