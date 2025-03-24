import { lazy, Suspense } from 'react';
import {
  Outlet,
  createRootRouteWithContext,
  useNavigate,
} from '@tanstack/react-router';
import type { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/Toaster';
import '@/i18n/i18next';
import PageWrapper from '@/components/app/PageWrapper';
import { Button } from '@/components/ui/Button';
import useAppTranslation from '@/hooks/useAppTranslation';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

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

const Root = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      <Toaster />
    </Suspense>
  );
};

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: Root,
  notFoundComponent: NotFoundPage,
});
