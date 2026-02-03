import queryClient from '../queryClient';

describe('queryClient', () => {
  it('is defined', () => {
    expect(queryClient).toBeDefined();
  });

  it('is a QueryClient instance', () => {
    expect(queryClient.constructor.name).toBe('QueryClient');
  });

  it('has default options configured', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions).toBeDefined();
  });

  it('has queries default options', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions.queries).toBeDefined();
  });

  it('configures staleTime', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions.queries?.staleTime).toBe(1000 * 60 * 5); // 5 minutes
  });

  it('configures retry', () => {
    const defaultOptions = queryClient.getDefaultOptions();
    expect(defaultOptions.queries?.retry).toBe(1);
  });

  it('has cache methods', () => {
    expect(typeof queryClient.clear).toBe('function');
    expect(typeof queryClient.invalidateQueries).toBe('function');
    expect(typeof queryClient.getQueryData).toBe('function');
    expect(typeof queryClient.setQueryData).toBe('function');
  });
});
