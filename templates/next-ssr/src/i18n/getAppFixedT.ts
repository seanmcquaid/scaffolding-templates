import type LocaleKeys from '@/types/LocaleKeys';
import { createInstance } from 'i18next';
import type { TOptions } from 'i18next';
import I18NextHttpBackend from 'i18next-http-backend';
import getLanguageFromReferer from './getLanguageFromReferer';
import i18nConfig from './i18nConfig';

const initI18next = async () => {
  const i18nInstance = createInstance();
  await i18nInstance.use(I18NextHttpBackend).init({
    ...i18nConfig,
    backend: { loadPath: './locales/{{lng}}.ts' },
  });
  return i18nInstance;
};

const getAppFixedT = async () => {
  const i18n = await initI18next();
  const lang = await getLanguageFromReferer();
  const t = i18n.getFixedT(lang);

  return {
    t: (key: LocaleKeys, options?: TOptions) => t(key, options ?? {}),
    i18n,
  };
};

export default getAppFixedT;
