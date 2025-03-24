import { defineConfig } from '@tanstack/start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths(),
      svgr(),
      checker({ typescript: true }),
    ],
  },
});
