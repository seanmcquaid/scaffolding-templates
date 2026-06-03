import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.{test,spec}.ts'],
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov', 'json-summary'],
    },
    pool: 'threads',
    environment: 'happy-dom',
    globals: true,
  },
});
