/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useColorScheme } from '../useColorScheme';

// The mock is already set up in jest-setup.ts
describe('useColorScheme', () => {
  it('returns the native color scheme', () => {
    const { result } = renderHook(() => useColorScheme());
    // Based on the mock in jest-setup.ts, it returns 'light'
    expect(result.current).toBe('light');
  });

  it('is defined and returns a value', () => {
    const { result } = renderHook(() => useColorScheme());
    expect(result.current).toBeDefined();
  });
});
