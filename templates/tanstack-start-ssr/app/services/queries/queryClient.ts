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
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

export default queryClient;
