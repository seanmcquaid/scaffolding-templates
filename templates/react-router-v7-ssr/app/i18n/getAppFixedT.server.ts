import type { TOptions } from 'i18next';
import type LocaleKeys from '@/types/LocaleKeys';
import i18next from './i18next.server';
import setAcceptLanguageHeaders from './setAcceptLanguageHeaders.server';

const getAppFixedT = async (request: Request) => {
  setAcceptLanguageHeaders(request);
  const t = await i18next.getFixedT(request);

  return {
    t: (key: LocaleKeys, options?: TOptions) => t(key, options ?? {}),
  };
};

export default getAppFixedT;
