import type { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import type LocaleKeys from '@/types/LocaleKeys';

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    t: (key: LocaleKeys, options?: TOptions) => t(key, options ?? {}),
    i18n,
  };
};

export default useAppTranslation;
