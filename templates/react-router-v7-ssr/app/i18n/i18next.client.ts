import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { getInitialNamespaces } from 'remix-i18next/client';
import config from './i18nConfig';

i18next
  .use(initReactI18next)
  .use(I18nextBrowserLanguageDetector)
  .use(Backend)
  .init({
    ...config,
    ns: getInitialNamespaces(),
    backend: { loadPath: './locales/{{lng}}.ts' },
    detection: {
      order: ['htmlTag'],
      caches: [],
    },
  });

export default i18next;
