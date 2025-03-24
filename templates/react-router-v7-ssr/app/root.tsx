import {
  Outlet,
  Links,
  Meta,
  Scripts,
  useRouteError,
  useNavigation,
  useLoaderData,
  ScrollRestoration,
} from 'react-router';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { useEffect } from 'react';
import { useChangeLanguage } from 'remix-i18next/react';
import stylesheet from './styles/index.css?url';
import { Toaster } from './components/ui/Toaster';
import queryClient from './services/queries/queryClient';
import PageError from './components/app/PageError';
import useAppTranslation from './hooks/useAppTranslation';
import LoadingOverlay from './components/ui/LoadingOverlay';
import i18next from './i18n/i18next.server';
import setAcceptLanguageHeaders from './i18n/setAcceptLanguageHeaders.server';
import type { Route } from './+types/root';
import clientEnv from './env.client';
import serverEnv from './env.server';

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet },
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

export function Layout({ children }: PropsWithChildren) {
  const { locale } = useLoaderData<typeof loader>();
  const { i18n } = useAppTranslation();
  const navigation = useNavigation();
  const isLoadingPage = navigation.state === 'loading';

  useChangeLanguage(locale);

  return (
    <html
      lang={locale}
      dir={i18n.dir()}
      className="h-screen min-h-screen overflow-auto w-full"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta name="description" content="Vite App" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          httpEquiv="Cache-Control"
          content="no-cache, no-store, must-revalidate"
        />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        <Meta />
        <Links />
      </head>
      <body className="h-screen min-h-screen flex flex-col overflow-auto w-full">
        <main className="flex-1">
          <QueryClientProvider client={queryClient}>
            <LoadingOverlay isLoading={isLoadingPage} />
            {children}
            <ReactQueryDevtools
              initialIsOpen={false}
              buttonPosition="top-right"
            />
            <Toaster />
          </QueryClientProvider>
        </main>
        <Scripts />
        <ScrollRestoration />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  useEffect(() => {
    // Log to service of some sort
    console.error(error);
  }, [error]);

  return <PageError errorText="There was an app crash!" />;
}

export function HydrateFallback() {
  return <LoadingOverlay isLoading />;
}

const Root = () => {
  return <Outlet />;
};

export default Root;
