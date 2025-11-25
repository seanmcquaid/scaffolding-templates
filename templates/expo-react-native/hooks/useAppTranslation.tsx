import { useTranslation } from 'react-i18next';

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    t: t as (key: string, options?: Record<string, string | number>) => string,
    i18n,
  };
};

export default useAppTranslation;
