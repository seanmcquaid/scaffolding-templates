import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      exclude: [
        'src/utils/testing',
        'src/i18n',
        'src/types',
        'src/constants',
        'src/assets',
        '**/*.test.{ts,tsx}',
        '**/node_modules/**',
        '**/build/**',
        '**/.expo/**'
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov'],
    },
    environment: 'jsdom',
    globals: true,
    include: [
      'src/**/*.test.tsx',
      'src/**/*.test.ts'
    ],
    mockReset: true,
    setupFiles: ['./src/utils/testing/setupTests.ts'],
  },
});