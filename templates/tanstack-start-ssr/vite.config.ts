import tailwindcss from '@tailwindcss/vite';
import { tanstackStart } from '@tanstack/react-start/plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tanstackStart({
      srcDirectory: './app',
      router: {
        routeFileIgnorePattern: '.*\\.test\\.tsx',
      },
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
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
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
    environment: 'happy-dom',
    exclude: ['playwright', 'node_modules'],
    globals: true,
    setupFiles: ['./app/utils/testing/setupTests.ts'],
  },
});
