import type { Config } from '@react-router/dev/config';

declare module 'react-router' {
  interface Future {
    unstable_middleware: true;
  }
}

export default {
  ssr: false,
  future: {
    unstable_middleware: true,
    // unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
    // unstable_viteEnvironmentApi: true,
  },
} satisfies Config;
