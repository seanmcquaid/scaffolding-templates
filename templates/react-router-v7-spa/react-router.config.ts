import type { Config } from '@react-router/dev/config';

export default {
  future: {
    unstable_optimizeDeps: true,
  },
  splitRouteModules: true,
  ssr: false,
} satisfies Config;
