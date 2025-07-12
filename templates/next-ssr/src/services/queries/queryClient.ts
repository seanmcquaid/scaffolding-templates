import { QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      gcTime: 300000, // 5 minutes (formerly cacheTime)
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors (client errors)
        if (error && typeof error === 'object' && 'status' in error) {
          const statusCode = (error as { status?: unknown }).status;
          if (
            typeof statusCode === 'number' &&
            statusCode >= 400 &&
            statusCode < 500
          ) {
            return false;
          }
        }
        // Retry up to 3 times for other errors
        return failureCount < 3;
      },
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
      // Network resilience - handle offline scenarios
      refetchOnReconnect: true,
      refetchOnWindowFocus: false, // Avoid excessive refetches
    },
    mutations: {
      retry: 1, // Retry failed mutations once
    },
  },
});

export default queryClient;
