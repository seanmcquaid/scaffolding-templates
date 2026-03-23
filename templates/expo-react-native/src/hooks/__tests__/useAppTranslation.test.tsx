import { renderHook } from '@testing-library/react-native';
import useAppTranslation from '@/hooks/useAppTranslation';

describe('useAppTranslation', () => {
  it('returns translation function and i18n instance', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current).toHaveProperty('t');
    expect(result.current).toHaveProperty('i18n');
    expect(typeof result.current.t).toBe('function');
    expect(typeof result.current.i18n).toBe('object');
  });

  it('translation function returns the i18n key', () => {
    const { result } = renderHook(() => useAppTranslation());

    const translatedText = result.current.t('HomePage.title');
    expect(translatedText).toBe('HomePage.title');
  });

  it('i18n has changeLanguage method', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.i18n).toHaveProperty('changeLanguage');
    expect(typeof result.current.i18n.changeLanguage).toBe('function');
  });
});
