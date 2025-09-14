import { renderHook } from '@testing-library/react';

import { useAppTranslation } from './useAppTranslation';

describe('useAppTranslation', () => {
  it('returns translation function', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.t).toBeDefined();
    expect(typeof result.current.t).toBe('function');
    expect(result.current.i18n).toBeDefined();
  });

  it('translates navigation keys correctly', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.t('navigation.home')).toBe('Home');
    expect(result.current.t('navigation.explore')).toBe('Explore');
  });

  it('translates home keys correctly', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.t('home.welcome')).toBe('Welcome!');
    expect(result.current.t('home.step1.title')).toBe('Step 1: Try it');
  });
});
