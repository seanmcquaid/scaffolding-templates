import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const useChangeLanguage = (lang: string) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);
};

export default useChangeLanguage;
