// app/routes/__root.tsx
import type { QueryClient } from '@tanstack/react-query';
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
  useNavigate,
} from '@tanstack/react-router';
import { createServerFn, Meta, Scripts } from '@tanstack/start';
import { lazy, type ReactNode } from 'react';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import useAppTranslation from '@/hooks/useAppTranslation';
import getLanguageFromReferer from '@/i18n/getLanguageFromReferer';
import '@/i18n/i18next';
import appCss from '@/styles/index.css?url';

const NotFoundPage = () => {
  const { t } = useAppTranslation();
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate({ to: '/' });
  };

  return (
    <PageWrapper>
      <h1>{t('NotFoundPage.notFound')}</h1>
      <p>{t('NotFoundPage.pleaseTryADifferentRoute')}</p>
      <Button onClick={handleOnClick}>{t('NotFoundPage.home')}</Button>
    </PageWrapper>
  );
};

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : lazy(() =>
        // Lazy load in development
        import('@tanstack/react-query-devtools').then(res => ({
          default: res.ReactQueryDevtools,
        })),
      );

const getHeadersFromVinxi = createServerFn({ method: 'GET' }).handler(
  async () => {
    const langFromReferer = await getLanguageFromReferer();

    return langFromReferer;
  },
);

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  loader: () => getHeadersFromVinxi(),
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const lang = Route.useLoaderData();
  return (
    <html lang={lang}>
      <head>
        <Meta />
      </head>
      <body>
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
