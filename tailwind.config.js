// ... existing code ...

module.exports = {
  // ... existing config ...
  plugins: [
    // ... other plugins ...
    require('tw-animate-css'),
  ],
  theme: {
    extend: {
      // ... existing extensions ...
      animation: {
        'fadeOutUp': 'fadeOutUp 0.5s ease forwards',
        'fadeInUp': 'fadeInUp 0.5s ease forwards',
      },
    },
  },
}