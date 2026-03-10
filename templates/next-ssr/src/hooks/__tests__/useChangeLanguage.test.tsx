import { renderHook } from '@testing-library/react';
import useChangeLanguage from '@/hooks/useChangeLanguage';

const mockChangeLanguage = vi.fn();

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: {
      changeLanguage: mockChangeLanguage,
    },
    t: (i18nKey: string) => i18nKey,
  }),
}));

describe('useChangeLanguage', () => {
  it('calls changeLanguage with the provided lang on mount', () => {
    renderHook(() => useChangeLanguage('en-US'));
    expect(mockChangeLanguage).toHaveBeenCalledWith('en-US');
  });

  it('calls changeLanguage again when lang changes', () => {
    const { rerender } = renderHook(
      ({ lang }: { lang: string }) => useChangeLanguage(lang),
      {
        initialProps: { lang: 'en-US' },
      },
    );

    expect(mockChangeLanguage).toHaveBeenCalledWith('en-US');

    rerender({ lang: 'en-CA' });
    expect(mockChangeLanguage).toHaveBeenCalledWith('en-CA');
  });
});
