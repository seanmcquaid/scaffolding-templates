import queryClient from '@/services/queries/queryClient';

describe('queryClient', () => {
  it('exports a QueryClient instance', () => {
    expect(queryClient).toBeDefined();
  });

  it('has the expected default staleTime of 5 minutes', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions.queries?.staleTime).toBe(1000 * 60 * 5);
  });

  it('has the expected retry count of 1', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions.queries?.retry).toBe(1);
  });
});
