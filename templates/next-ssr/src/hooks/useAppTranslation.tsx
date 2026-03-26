import type { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import type LocaleKeys from '@/types/LocaleKeys';

type AppTOptions = Omit<TOptions, 'context'> & { context?: string };

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    i18n,
    t: (key: LocaleKeys, options?: AppTOptions) => t(key, options),
  };
};

export default useAppTranslation;
