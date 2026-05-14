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
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
});
