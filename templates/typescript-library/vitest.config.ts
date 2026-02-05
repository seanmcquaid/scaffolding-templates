import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'istanbul',
      reporter: ['lcov'],
    },
    pool: 'threads',
    environment: 'happy-dom',
    globals: true,
  },
});
