import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import config from './i18nConfig';

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .init({
    ...config,
    detection: {
      caches: [],
      order: ['htmlTag'],
    },
  });

export default i18next;
