import Backend from 'i18next-fs-backend/cjs';
import { RemixI18Next } from 'remix-i18next/server';
import config from './i18nConfig';

const i18next = new RemixI18Next({
  detection: {
    supportedLanguages: config.supportedLngs,
    fallbackLanguage: config.fallbackLng,
  },
  i18next: {
    ...config,
    backend: { loadPath: './locales/{{lng}}.ts' },
  },
  plugins: [Backend],
});

export default i18next;
