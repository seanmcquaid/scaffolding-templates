import useAppTranslation from '@/hooks/useAppTranslation';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';

describe('useAppTranslation', () => {
  it('returns a translation function', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title')).toBe('HomePage.title');
  });

  it('passes options to the translation function', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title', { count: 1 })).toBe(
      'HomePage.title',
    );
  });

  it('returns i18n instance', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.i18n).toBeDefined();
  });

  it('re-renders correctly', () => {
    const { result, rerender } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title')).toBe('HomePage.title');
    rerender();
    expect(result.current.t('HomePage.title')).toBe('HomePage.title');
  });
});
