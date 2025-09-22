const config = require('./packages/eslint-config');

module.exports = [
  ...config,
  {
    ignores: [
      'apps/**',
      'packages/**',
    ],
  },
];