import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    pool: 'threads',
    coverage: {
      exclude: [
        'app/utils/testing',
        'app/i18n',
        'app/env.ts',
        'app/types',
        'app/styles',
        'app/client.tsx',
        'app/router.tsx',
        'app/routeTree.gen.ts',
      ],
      include: ['app/**/*.ts', 'app/**/*.tsx'],
      provider: 'istanbul',
      reporter: ['lcov', 'json-summary'],
    },
    environment: 'happy-dom',
    exclude: ['playwright', 'node_modules'],
    globals: true,
    setupFiles: ['./app/utils/testing/setupTests.ts'],
  },
});
