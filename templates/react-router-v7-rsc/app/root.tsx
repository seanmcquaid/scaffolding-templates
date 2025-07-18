import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useRouteError,
} from 'react-router';
import { useChangeLanguage } from 'remix-i18next/react';
import type { Route } from './+types/root';
import PageError from './components/app/PageError';
import LoadingOverlay from './components/ui/LoadingOverlay';
import { Toaster } from './components/ui/Toaster';
import clientEnv from './env.client';
import serverEnv from './env.server';
import useAppTranslation from './hooks/useAppTranslation';
import i18next from './i18n/i18next.server';
import setAcceptLanguageHeaders from './i18n/setAcceptLanguageHeaders.server';
import queryClient from './services/queries/queryClient';
import stylesheet from './styles/index.css?url';

export const links: Route.LinksFunction = () => [
  { href: stylesheet, rel: 'stylesheet' },
];

const clientLoggerMiddleware: Route.unstable_ClientMiddlewareFunction = async (
  { request },
  next,
) => {
  const start = performance.now();

  // Run the remaining middlewares and all route loaders
  await next();

  if (clientEnv.VITE_APP_ENVIRONMENT !== 'dev') {
    return;
  }

  const duration = performance.now() - start;
  console.log(`Navigated to ${request.url} (${duration}ms)`);
};

export const unstable_clientMiddleware = [clientLoggerMiddleware];

const serverLoggerMiddleware: Route.unstable_MiddlewareFunction = async (
  { request },
  next,
) => {
  const start = performance.now();

  // 👇 Grab the response here
  const res = await next();

  if (serverEnv.VITE_APP_ENVIRONMENT !== 'dev') {
    return res;
  }

  const duration = performance.now() - start;
  console.log(`Navigated to ${request.url} (${duration}ms)`);

  // 👇 And return it here (optional if you don't modify the response)
  return res;
};

export const unstable_middleware = [serverLoggerMiddleware];

export async function loader({ request }: Route.LoaderArgs) {
  setAcceptLanguageHeaders(request);
  const locale = await i18next.getLocale(request);
  return { locale };
}

export const Layout = ({ children }: PropsWithChildren) => {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useAppTranslation();
  const navigation = useNavigation();
  const isLoadingPage = navigation.state === 'loading';

  useChangeLanguage(locale);

  return (
    <html
      className="h-screen min-h-screen w-full overflow-auto"
      dir={i18n.dir()}
      lang={locale}
    >
      <head>
        <meta charSet="UTF-8" />
        <meta content="Vite App" name="description" />
        <meta content="width=device-width,initial-scale=1" name="viewport" />
        <link href="/favicon.ico" rel="icon" />
        <meta content="#ffffff" name="theme-color" />
        <meta
          content="no-cache, no-store, must-revalidate"
          httpEquiv="Cache-Control"
        />
        <meta content="no-cache" httpEquiv="Pragma" />
        <meta content="0" httpEquiv="Expires" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-screen min-h-screen w-full flex-col overflow-auto">
        <main className="flex-1">
          <QueryClientProvider client={queryClient}>
            <LoadingOverlay isLoading={isLoadingPage} />
            {children}
            <ReactQueryDevtools
              buttonPosition="top-right"
              initialIsOpen={false}
            />
            <Toaster />
          </QueryClientProvider>
        </main>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
};

export const ErrorBoundary = () => {
  const error = useRouteError();

  useEffect(() => {
    // Log to service of some sort
    console.error(error);
  }, [error]);

  return <PageError errorText="There was an app crash!" />;
};

export const HydrateFallback = () => {
  return <LoadingOverlay isLoading />;
};

const Root = () => {
  return <Outlet />;
};

export default Root;
