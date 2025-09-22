import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCA from './locales/en-CA.json';
import enUS from './locales/en-US.json';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'en-CA': {
    translation: enCA,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  resources,
  lng: 'en-US',
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
