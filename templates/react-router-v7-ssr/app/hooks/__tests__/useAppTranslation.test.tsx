import { renderHook } from '@testing-library/react';
import useAppTranslation from '@/hooks/useAppTranslation';

describe('useAppTranslation', () => {
  it('Returns a t function and i18n object', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(typeof result.current.t).toBe('function');
    expect(result.current.i18n).toBeDefined();
  });

  it('t function returns the translation key', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title')).toBe('HomePage.title');
  });

  it('t function accepts and passes through options', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title', { count: 1 })).toBe(
      'HomePage.title',
    );
  });
});
