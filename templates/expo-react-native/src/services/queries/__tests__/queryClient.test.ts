import queryClient from '@/services/queries/queryClient';

describe('queryClient', () => {
  it('exports a QueryClient instance', () => {
    expect(queryClient).toBeDefined();
  });

  it('has a getDefaultOptions method', () => {
    expect(typeof queryClient.getDefaultOptions).toBe('function');
  });

  it('has queries staleTime configured to 5 minutes', () => {
    const options = queryClient.getDefaultOptions();
    expect(options.queries?.staleTime).toBe(1000 * 60 * 5);
  });

  it('has queries retry configured to 1', () => {
    const options = queryClient.getDefaultOptions();
    expect(options.queries?.retry).toBe(1);
  });
});
