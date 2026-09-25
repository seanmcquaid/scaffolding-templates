import { QueryClient } from '@tanstack/react-query';

/**
 * Global QueryClient instance for TanStack Query v5.
 *
 * Configuration follows best practices:
 * - staleTime: 60 seconds (1 minute) - data is considered fresh for this duration
 * - Queries will not refetch automatically during this window
 * - Override per-query when different behavior is needed
 *
 * @see https://tanstack.com/query/v5/docs/framework/react/guides/important-defaults
 * @see docs/adrs/ADR-011-tanstack-query-best-practices.md
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data is considered fresh for 1 minute
      staleTime: 60000,
      // Other recommended v5 defaults can be added here:
      // gcTime: 300000, // 5 minutes (garbage collection)
      // retry: 1, // Retry failed requests once
      // refetchOnWindowFocus: false, // Disable for SPAs
    },
  },
});

export default queryClient;
