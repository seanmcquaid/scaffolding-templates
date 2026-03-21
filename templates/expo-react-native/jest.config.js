module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(.pnpm/(until-async|ky)|until-async|ky|(jest-)?react-native|@react-native(-community)?|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))',
  ],
  testEnvironmentOptions: {
    customExportConditions: ['node', 'require', 'default'],
  },
  setupFiles: [],
  setupFilesAfterEnv: ['<rootDir>/src/jest-polyfills.ts', '<rootDir>/src/jest-setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/.expo/'],
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
    '^@/env$': '<rootDir>/src/utils/testing/mocks/env.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^react-native$': '<rootDir>/src/utils/testing/mocks/react-native.tsx',
    '^expo-router$': '<rootDir>/src/utils/testing/mocks/expo-router.tsx',
    '^@react-navigation/native$':
      '<rootDir>/src/utils/testing/mocks/react-navigation-native.tsx',
    '^expo-status-bar$': '<rootDir>/src/utils/testing/mocks/expo-status-bar.ts',
    '^react-native-reanimated$':
      '<rootDir>/src/utils/testing/mocks/react-native-reanimated.ts',
    '^react-i18next$': '<rootDir>/src/utils/testing/mocks/react-i18next.ts',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

