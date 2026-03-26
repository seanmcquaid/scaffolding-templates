import type { TOptions } from 'i18next';
import { useTranslation } from 'react-i18next';
import type enUSLocale from '@/i18n/locales/en-US';

type DotPrefix<T extends string> = T extends '' ? '' : `.${T}`;

type DotNestedKeys<T> = (
  T extends object
    ? {
        [K in Exclude<keyof T, symbol>]: `${K}${DotPrefix<
          DotNestedKeys<T[K]>
        >}`;
      }[Exclude<keyof T, symbol>]
    : ''
) extends infer D
  ? Extract<D, string>
  : never;

type LocaleKeys = DotNestedKeys<typeof enUSLocale>;

type AppTOptions = Omit<TOptions, 'context'> & { context?: string };

const useAppTranslation = () => {
  const { t, i18n } = useTranslation();

  return {
    i18n,
    t: (key: LocaleKeys, options?: AppTOptions) => t(key, options),
  };
};

export default useAppTranslation;
