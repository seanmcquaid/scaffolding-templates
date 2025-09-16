import type { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';

import '@/src/lib/i18n';

type TranslationKey =
  | 'navigation.home'
  | 'navigation.explore'
  | 'home.welcome'
  | 'home.step1.title'
  | 'home.step1.description'
  | 'home.step2.title'
  | 'home.step2.description'
  | 'home.step3.title'
  | 'home.step3.description'
  | 'home.step3.button'
  | 'explore.title'
  | 'explore.description'
  | 'explore.fileStructure.title'
  | 'explore.fileStructure.description'
  | 'explore.fileStructure.configuration'
  | 'explore.fileStructure.learnMore'
  | 'explore.android.title'
  | 'explore.android.description'
  | 'explore.ios.title'
  | 'explore.ios.description'
  | 'explore.web.title'
  | 'explore.web.description'
  | 'notFound.title'
  | 'notFound.heading'
  | 'notFound.homeLink';

interface TypedTFunction extends Omit<TFunction, 'call'> {
  (key: TranslationKey): string;
  (key: TranslationKey, options: object): string;
}

export interface AppTranslation {
  t: TypedTFunction;
  i18n: ReturnType<typeof useTranslation>['i18n'];
  ready: ReturnType<typeof useTranslation>['ready'];
}

export function useAppTranslation(): AppTranslation {
  const translation = useTranslation();

  return {
    t: translation.t as TypedTFunction,
    i18n: translation.i18n,
    ready: translation.ready,
  };
}
