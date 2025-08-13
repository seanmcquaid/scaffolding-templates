import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

import enUS from './locales/en-US.json';
import enCA from './locales/en-CA.json';

const resources = {
  'en-US': {
    translation: enUS,
  },
  'en-CA': {
    translation: enCA,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en-US',
  fallbackLng: 'en-US',
  keySeparator: '.',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
});

// Load saved language from AsyncStorage
AsyncStorage.getItem('language').then(savedLanguage => {
  if (savedLanguage && resources[savedLanguage as keyof typeof resources]) {
    i18n.changeLanguage(savedLanguage);
  }
});

// Save language changes to AsyncStorage
i18n.on('languageChanged', lng => {
  AsyncStorage.setItem('language', lng);
});

export default i18n;
