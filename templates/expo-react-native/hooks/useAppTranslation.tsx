import { useTranslation } from 'react-i18next';
import type enUS from '@/i18n/locales/en-US';

type TranslationKeys = typeof enUS;

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    t: t as (key: string, options?: Record<string, string | number>) => string,
    i18n,
  };
};

export default useAppTranslation;
