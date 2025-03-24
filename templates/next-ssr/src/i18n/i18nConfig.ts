import type { InitOptions } from 'i18next';
import locales from './locales';

const i18nConfig = {
  fallbackLng: 'en-US',
  supportedLngs: ['en-US', 'en-CA'],
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
  react: { useSuspense: false },
} satisfies InitOptions;

export default i18nConfig;
