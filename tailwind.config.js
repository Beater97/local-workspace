module.exports = {
  content: [
    './src/renderer/index.html',
    './src/renderer/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};
