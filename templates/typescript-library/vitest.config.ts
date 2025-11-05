import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    isolate: true,
    environment: 'jsdom',
    globals: true,
  },
});
