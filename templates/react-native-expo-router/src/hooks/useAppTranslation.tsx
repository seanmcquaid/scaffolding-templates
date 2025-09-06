import type { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import type LocaleKeys from '@/types/LocaleKeys';

/**
 * Custom hook for app translations
 * Provides type-safe translation keys and consistent i18n interface
 */
const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    i18n,
    t: (key: LocaleKeys, options?: TOptions) => t(key, options ?? {}),
  };
};

export default useAppTranslation;
