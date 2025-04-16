import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from '@tanstack/react-start/config';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsConfigPaths from 'vite-tsconfig-paths';

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
