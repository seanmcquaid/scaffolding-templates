import type { TOptions } from 'i18next';
import setAcceptLanguageHeaders from './setAcceptLanguageHeaders.server';
import i18next from './i18next.server';
import type LocaleKeys from '@/types/LocaleKeys';

const getAppFixedT = async (request: Request) => {
  setAcceptLanguageHeaders(request);
  const t = await i18next.getFixedT(request);

  return {
    t: (key: LocaleKeys, options?: TOptions) => t(key, options ?? {}),
  };
};

export default getAppFixedT;
