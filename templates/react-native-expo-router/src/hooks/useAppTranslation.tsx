import { useTranslation } from 'react-i18next';

/**
 * Custom hook for app translations
 * Provides type-safe translation keys and consistent i18n interface
 */
const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    t,
    i18n,
  };
};

export default useAppTranslation;
