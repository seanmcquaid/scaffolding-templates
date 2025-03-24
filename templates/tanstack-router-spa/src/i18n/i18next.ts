import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import i18next from 'i18next';
import locales from './locales';

const languageDetector = new I18nextBrowserLanguageDetector();

languageDetector.addDetector({
  name: 'domain',

  lookup() {
    const host = window.location.host;
    if (host.includes('.ca')) {
      return 'en-CA';
    }
    return 'en-US';
  },

  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  },
});

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    detection: {
      order: [
        'querystring',
        'domain',
        'cookie',
        'localStorage',
        'navigator',
        'htmlTag',
      ],
    },
    debug: true,
    fallbackLng: 'en-US',
    load: 'currentOnly',
    keySeparator: '.',
    saveMissing: true,
    resources: locales,
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn('Missing Translation Key', lng, ns, key, fallbackValue);
    },
    missingInterpolationHandler: (text, value) => {
      console.warn('Missing Interpolation', text, value);
    },
  });

export default i18next;
