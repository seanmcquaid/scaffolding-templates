const { transform: presetTransform } = require('jest-expo/jest-preset');

module.exports = {
  preset: 'jest-expo',
  setupFiles: ['<rootDir>/src/jest-polyfills.ts'],
  setupFilesAfterEnv: ['<rootDir>/src/jest-setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/.expo/'],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
  collectCoverageFrom: [
    'src/app/**/*.{ts,tsx}',
    'src/components/**/*.{ts,tsx}',
    'src/hooks/**/*.{ts,tsx}',
    'src/services/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/__tests__/**',
  ],
  coverageReporters: ['lcov', 'json-summary'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    ...presetTransform,
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm|react-native|@react-native|@react-native-community|expo|@expo|@expo-google-fonts|react-navigation|@react-navigation|@sentry/react-native|native-base|until-async|ky|zocker|@faker-js|rettime))',
  ],
};

