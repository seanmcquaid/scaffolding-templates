import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    pool: 'threads',
    isolate: false,
    environment: 'jsdom',
    globals: true,
  },
});
