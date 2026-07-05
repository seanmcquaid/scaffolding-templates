import type { QueryClient } from '@tanstack/react-query';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  createRootRouteWithContext,
  HeadContent,
  Outlet,
  Scripts,
  useNavigate,
} from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { Toaster } from '@/components/ui/Toaster';
import '@/i18n/i18next';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useAppTranslation from '@/hooks/useAppTranslation';
import appCss from '@/styles/index.css?url';

export const NotFoundPage = () => {
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

const TanStackRouterDevtoolsLazy =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-router-devtools').then(res => ({
          default: res.TanStackRouterDevtools,
        })),
      );

const ReactQueryDevtoolsLazy =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
        import('@tanstack/react-query-devtools').then(res => ({
          default: res.ReactQueryDevtools,
        })),
      );

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html className="h-screen min-h-screen w-full overflow-auto" lang="en">
      <head>
        <HeadContent />
        <link href={appCss} rel="stylesheet" />
      </head>
      <body className="flex h-screen min-h-screen w-full flex-col overflow-auto">
        <main className="flex-1">{children}</main>
        <Scripts />
      </body>
    </html>
  );
}

const Root = () => {
  const { queryClient } = Route.useRouteContext();

  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
          <TanStackRouterDevtoolsLazy position="bottom-right" />
          <ReactQueryDevtoolsLazy
            buttonPosition="top-right"
            initialIsOpen={false}
          />
          <Toaster />
        </Suspense>
      </QueryClientProvider>
    </RootDocument>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Root,
  head: () => ({
    meta: [
      { charSet: 'UTF-8' },
      { content: 'width=device-width, initial-scale=1', name: 'viewport' },
      { title: 'TanStack Start App' },
    ],
  }),
  notFoundComponent: NotFoundPage,
});
