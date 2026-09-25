import { toast, useToast } from '@/hooks/useToast';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';

describe('useToast hook', () => {
  it('provides dismiss and toast functions', () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.dismiss).toBe('function');
    expect(typeof result.current.toast).toBe('function');
  });
});

describe('toast function', () => {
  it('is callable with a title', () => {
    expect(() => toast({ title: 'Test toast' })).not.toThrow();
  });

  it('is callable with a title and description', () => {
    expect(() =>
      toast({ title: 'Title', description: 'Description' }),
    ).not.toThrow();
  });

  it('is callable with the destructive variant', () => {
    expect(() =>
      toast({ title: 'Error toast', variant: 'destructive' }),
    ).not.toThrow();
  });

  it('is callable with only a description', () => {
    expect(() => toast({ description: 'Only description' })).not.toThrow();
  });
});
