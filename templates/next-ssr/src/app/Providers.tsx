'use client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { Toaster } from '@/components/ui/Toaster';
import queryClient from '@/services/queries/queryClient';
import '@/i18n/i18next';
import useChangeLanguage from '@/hooks/useChangeLanguage';

interface ProvidersProps extends PropsWithChildren {
  lang: string;
}

const Providers = ({ children, lang }: ProvidersProps) => {
  useChangeLanguage(lang);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {children}
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
        <Toaster />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default Providers;
