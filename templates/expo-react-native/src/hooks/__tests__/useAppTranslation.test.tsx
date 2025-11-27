/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import useAppTranslation from '@/hooks/useAppTranslation';

describe('useAppTranslation', () => {
  it('returns translation function and i18n instance', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current).toHaveProperty('t');
    expect(result.current).toHaveProperty('i18n');
    expect(typeof result.current.t).toBe('function');
    expect(typeof result.current.i18n).toBe('object');
  });

  it('translation function returns the key (mocked behavior)', () => {
    const { result } = renderHook(() => useAppTranslation());

    const translatedText = result.current.t('HomePage.title');
    expect(translatedText).toBe('HomePage.title');
  });

  it('translation function works with interpolation options', () => {
    const { result } = renderHook(() => useAppTranslation());

    const translatedText = result.current.t('HomePage.greeting', { name: 'User' });
    // In test environment, it just returns the key
    expect(translatedText).toBe('HomePage.greeting');
  });

  it('i18n has changeLanguage method', () => {
    const { result } = renderHook(() => useAppTranslation());

    expect(result.current.i18n).toHaveProperty('changeLanguage');
    expect(typeof result.current.i18n.changeLanguage).toBe('function');
  });
});
