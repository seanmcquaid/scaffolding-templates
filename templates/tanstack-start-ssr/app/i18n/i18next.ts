import i18next from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import locales from './locales';

const languageDetector = new I18nextBrowserLanguageDetector();

languageDetector.addDetector({
  cacheUserLanguage(lng) {
    localStorage.setItem('i18nextLng', lng);
  },

  lookup() {
    const host = window.location.host;
    if (host.includes('.ca')) {
      return 'en-CA';
    }
    return 'en-US';
  },

  name: 'domain',
});

i18next
  .use(initReactI18next)
  .use(languageDetector)
  .init({
    debug: true,
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
    fallbackLng: 'en-US',
    keySeparator: '.',
    load: 'currentOnly',
    missingInterpolationHandler: (text, value) => {
      console.warn('Missing Interpolation', text, value);
    },
    missingKeyHandler: (lng, ns, key, fallbackValue) => {
      console.warn('Missing Translation Key', lng, ns, key, fallbackValue);
    },
    resources: locales,
    saveMissing: true,
  });

export default i18next;
