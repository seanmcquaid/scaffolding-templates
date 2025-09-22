const config = require('@acme/eslint-config');

module.exports = [
  ...config,
  {
    ignores: [
      'expo-plugins/**',
    ],
  },
];