import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  tsr: {
    routeFileIgnorePattern: '.*\\.test\\.tsx',
  },
  vite: {
    plugins: [
      tailwindcss(),
      tsConfigPaths(),
      svgr(),
      checker({ typescript: true }),
    ],
  },
});
