import type { TOptions } from 'i18next';
import type { RouterContextProvider } from 'react-router';
import type LocaleKeys from '@/types/LocaleKeys';
import { getInstance } from './i18next.server';

type AppTOptions = Omit<TOptions, 'context'> & { context?: string };

const getAppFixedT = (context: RouterContextProvider) => {
  const i18n = getInstance(context);

  return {
    t: (key: LocaleKeys, options?: AppTOptions) => i18n.t(key, options),
  };
};

export default getAppFixedT;
