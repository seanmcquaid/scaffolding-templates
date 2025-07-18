import type { Config } from '@react-router/dev/config';

declare module 'react-router' {
  interface Future {
    unstable_middleware: true; // 👈 Enable middleware types
  }
}

export default {
  future: {
    unstable_middleware: true,
    unstable_optimizeDeps: true,
    unstable_splitRouteModules: true,
    unstable_viteEnvironmentApi: true,
    // Note: React Router v7 does not yet have native RSC support
    // This is an experimental configuration for future RSC integration
  },
  ssr: true,
  // Experimental RSC configuration (not yet supported by React Router v7)
  // This serves as a placeholder for future RSC integration
  // experimental: {
  //   rsc: false, // Would enable React Server Components when supported
  // },
} satisfies Config;
