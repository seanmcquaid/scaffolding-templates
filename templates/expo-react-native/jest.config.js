/** @type {import('jest').Config} */
module.exports = {
  setupFilesAfterEnv: ['<rootDir>/src/utils/testing/setupTests.ts'],
  testMatch: [
    '<rootDir>/src/**/*.test.{ts,tsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/utils/testing/**',
    '!src/i18n/**',
    '!src/types/**',
    '!src/constants/**',
    '!src/assets/**',
    '!**/*.test.{ts,tsx}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/.expo/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
  transformIgnorePatterns: [
    'node_modules/(?!(ky|react-native|@react-native|@react-navigation|expo|@expo|react-native-gesture-handler|react-native-reanimated|react-native-web|@react-native-community|@expo/vector-icons)/)'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // Mock React Native modules
    '^react-native$': 'react-native-web',
  },
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript'
      ],
    }],
  },
};