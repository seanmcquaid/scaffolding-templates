import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      navigation: {
        home: 'Home',
        explore: 'Explore',
      },
      home: {
        welcome: 'Welcome!',
        step1: {
          title: 'Step 1: Try it',
          description:
            'Edit src/app/(tabs)/index.tsx to see changes. Press cmd+d (iOS) or cmd+m (Android) to open developer tools.',
        },
        step2: {
          title: 'Step 2: Explore',
          description:
            "Tap the Explore tab to learn more about what's included in this starter app.",
        },
        step3: {
          title: 'Step 3: Get a fresh start',
          description: "When you're ready, run npm run reset-project to get a fresh start.",
        },
      },
      explore: {
        title: 'Explore',
        description: 'This app includes example code to help you get started.',
        fileStructure: {
          title: 'File-based routing',
          description: 'This app has two screens:',
          configuration: 'and',
          learnMore: 'Learn more',
        },
        android: {
          title: 'Android',
          description: 'Try it on your phone: download the Expo Go app and scan the QR code above.',
        },
        ios: {
          title: 'iOS',
          description: 'Try it on your phone: download the Expo Go app and scan the QR code above.',
        },
        web: {
          title: 'Web',
          description:
            'Open this app in your web browser by pressing w in the terminal running this project.',
        },
      },
      notFound: {
        title: 'Oops!',
        heading: "This screen doesn't exist.",
        homeLink: 'Go to home screen!',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: Localization.getLocales()[0]?.languageCode || 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
