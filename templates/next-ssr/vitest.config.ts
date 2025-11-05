import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    pool: 'threads',
    coverage: {
      exclude: [
        'src/setupTests.ts',
        'src/utils/testing',
        'src/i18n',
        'src/env.client.ts',
        'src/env.server.ts',
        'src/types',
        'src/router.ts',
        'src/assets',
        'src/styles',
        'src/app/not-found.tsx',
        'src/app/layout.tsx',
        'src/constants',
      ],
      include: ['src/**/*.ts', 'src/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov'],
    },
    environment: 'jsdom',
    globals: true,
    include: [
      'src/**/*.test.tsx',
      'src/**/*.test.ts',
      'src/**/*.test.js',
      'src/**/*.test.jsx',
    ],
    mockReset: true,
    setupFiles: ['./src/utils/testing/setupTests.ts'],
  },
});
