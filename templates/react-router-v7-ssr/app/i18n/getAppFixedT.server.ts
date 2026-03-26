import type { TOptions } from 'i18next';
import i18next from './i18next.server';
import setAcceptLanguageHeaders from './setAcceptLanguageHeaders.server';
import type LocaleKeys from '@/types/LocaleKeys';

type AppTOptions = Omit<TOptions, 'context'> & { context?: string };

const getAppFixedT = async (request: Request) => {
  setAcceptLanguageHeaders(request);
  const t = await i18next.getFixedT(request);

  return {
    t: (key: LocaleKeys, options?: AppTOptions) => t(key, options),
  };
};

export default getAppFixedT;
