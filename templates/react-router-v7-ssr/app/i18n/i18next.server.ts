import { initReactI18next } from 'react-i18next';
import { createI18nextMiddleware } from 'remix-i18next';
import config from './i18nConfig';

export const [i18nextMiddleware, getLocale, getInstance] =
  createI18nextMiddleware({
    detection: {
      supportedLanguages: config.supportedLngs,
      fallbackLanguage: config.fallbackLng as string,
      order: ['custom', 'header'],
      findLocale({ request }) {
        const url = new URL(request.url);
        if (url.hostname.endsWith('.ca')) {
          return Promise.resolve('en-CA');
        }
        return Promise.resolve(null);
      },
    },
    i18next: config,
    plugins: [initReactI18next],
  });
