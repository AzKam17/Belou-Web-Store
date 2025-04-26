module.exports = {
  plugins: [
    require('tw-animate-css'),
  ],
  theme: {
    extend: {
      animation: {
        'fadeOutUp': 'fadeOutUp 0.5s ease forwards',
        'fadeInUp': 'fadeInUp 0.5s ease forwards',
      },
    },
  },
}