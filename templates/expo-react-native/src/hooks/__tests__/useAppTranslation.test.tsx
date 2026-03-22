import { renderHook } from '@testing-library/react-native';
import useAppTranslation from '@/hooks/useAppTranslation';
import '@/i18n/i18next.client';

describe('useAppTranslation', () => {
  it('returns translation function and i18n instance', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current).toHaveProperty('t');
    expect(result.current).toHaveProperty('i18n');
    expect(typeof result.current.t).toBe('function');
    expect(typeof result.current.i18n).toBe('object');
  });

  it('translation function returns a translated string', () => {
    const { result } = renderHook(() => useAppTranslation());

    const translatedText = result.current.t('HomePage.title');
    expect(typeof translatedText).toBe('string');
  });

  it('i18n has changeLanguage method', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.i18n).toHaveProperty('changeLanguage');
    expect(typeof result.current.i18n.changeLanguage).toBe('function');
  });
});
