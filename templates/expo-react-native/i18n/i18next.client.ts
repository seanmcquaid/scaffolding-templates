import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import enUS from './locales/en-US';
import enCA from './locales/en-CA';

const resources = {
  'en-US': { translation: enUS },
  'en-CA': { translation: enCA },
} as const;

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
