import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';
import useAppTranslation from '@/hooks/useAppTranslation';

describe('useAppTranslation', () => {
  it('returns a translation function and i18n instance', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(typeof result.current.t).toBe('function');
    expect(result.current.i18n).toBeDefined();
  });

  it('t function returns the i18n key when called without options', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title')).toBe('HomePage.title');
  });

  it('t function passes options when provided', () => {
    const { result } = renderHook(() => useAppTranslation());
    expect(result.current.t('HomePage.title', { count: 1 })).toBe(
      'HomePage.title',
    );
  });
});
