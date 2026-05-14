import type { InitOptions } from 'i18next';
import locales from './locales';

const i18nConfig = {
  fallbackLng: 'en-US',
  keySeparator: '.',
  load: 'currentOnly',
  react: { useSuspense: false },
  resources: locales,
  saveMissing: true,
  supportedLngs: ['en-US', 'en-CA'],
} satisfies InitOptions;

export default i18nConfig;
