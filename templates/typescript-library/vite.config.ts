import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    pool: 'threads',
    environment: 'jsdom',
    globals: true,
  },
});
