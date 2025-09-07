module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/app/setupTests.ts'],
  transform: {
    '^.+\\.(js|ts|tsx)$': ['babel-jest', { presets: ['babel-preset-expo'] }],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-.*|@react-native-.*|expo|expo-.*|@expo|@expo/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg))',
  ],
  collectCoverageFrom: [
    'app/**/*.{ts,tsx}',
    '!app/**/*.d.ts',
    '!app/__tests__/**',
    '!app/_layout.tsx',
    '!app/index.tsx',
    '!app/about.tsx',
    '!app/setupTests.ts',
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@/components/(.*)$': '<rootDir>/app/components/$1',
    '^@/hooks/(.*)$': '<rootDir>/app/hooks/$1',
    '^@/services/(.*)$': '<rootDir>/app/services/$1',
    '^@/types/(.*)$': '<rootDir>/app/types/$1',
    '^@/utils/(.*)$': '<rootDir>/app/utils/$1',
    '^@/constants/(.*)$': '<rootDir>/app/constants/$1',
  },
};
