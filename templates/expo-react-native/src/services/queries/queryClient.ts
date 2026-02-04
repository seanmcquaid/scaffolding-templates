import { QueryClient } from '@tanstack/react-query';

/**
 * Global QueryClient instance for TanStack Query v5.
 * 
 * Configuration follows best practices:
 * - staleTime: 5 minutes - data is considered fresh for this duration
 * - retry: 1 - retry failed requests once
 * - Queries will not refetch automatically during the stale time window
 * - Override per-query when different behavior is needed
 * 
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/important-defaults
 * @see docs/adrs/ADR-011-tanstack-query-best-practices.md
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      // Other recommended v5 defaults can be added here:
      // gcTime: 300000, // 5 minutes (garbage collection)
      // refetchOnWindowFocus: false, // Useful for mobile apps
    },
  },
});

export default queryClient;
