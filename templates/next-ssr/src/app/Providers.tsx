'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import type { PropsWithChildren } from 'react';
import useChangeLanguage from '@/hooks/useChangeLanguage';
import { Toaster } from '@/components/ui/Toaster';
import queryClient from '@/services/queries/queryClient';
import '@/i18n/i18next';

interface ProvidersProps extends PropsWithChildren {
  lang: string;
}

const Providers = ({ children, lang }: ProvidersProps) => {
  useChangeLanguage(lang);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryStreamedHydration>
        {children}
        <ReactQueryDevtools buttonPosition="top-right" initialIsOpen={false} />
        <Toaster />
      </ReactQueryStreamedHydration>
    </QueryClientProvider>
  );
};

export default Providers;
