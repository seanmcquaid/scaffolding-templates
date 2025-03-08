import type { Config } from '@react-router/dev/config';

declare module 'react-router' {
  interface Future {
    unstable_middleware: true; // 👈 Enable middleware types
  }
}

export default {
  ssr: false,
  future: {
    unstable_middleware: true,
    unstable_splitRouteModules: true,
  },
} satisfies Config;
