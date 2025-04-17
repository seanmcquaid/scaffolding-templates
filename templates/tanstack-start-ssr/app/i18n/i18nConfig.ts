import type { InitOptions } from 'i18next';
import locales from './locales';

const i18nConfig = {
  fallbackLng: 'en-US',
  keySeparator: '.',
  load: 'currentOnly',
  missingInterpolationHandler: (text, value) => {
    console.warn('Missing Interpolation', text, value);
  },
  missingKeyHandler: (lng, ns, key, fallbackValue) => {
    console.warn('Missing Translation Key', lng, ns, key, fallbackValue);
  },
  react: { useSuspense: false },
  resources: locales,
  saveMissing: true,
  supportedLngs: ['en-US', 'en-CA'],
} satisfies InitOptions;

export default i18nConfig;
