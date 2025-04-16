import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { PropsWithChildren } from 'react';
import { useEffect, useState } from 'react';
/* eslint-disable i18next/no-literal-string */
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigation,
  useRouteError,
} from 'react-router';
import type { Route } from './+types/root';
import PageError from './components/app/PageError';
import LoadingOverlay from './components/ui/LoadingOverlay';
import { Toaster } from './components/ui/Toaster';
import env from './env.client';
import queryClient from './services/queries/queryClient';
import stylesheet from './styles/index.css?url';

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

  if (env.VITE_APP_ENVIRONMENT !== 'dev') {
    return;
  }

  const duration = performance.now() - start;
  console.log(`Navigated to ${request.url} (${duration}ms)`);
};

export const unstable_clientMiddleware = [clientLoggerMiddleware];

export function Layout({ children }: PropsWithChildren) {
  const navigation = useNavigation();
  const isLoadingPage = navigation.state === 'loading';

  return (
    // biome-ignore lint/a11y/useHtmlLang: "This field is not used on the app since we handle the language via react-i18next"
    <html className="h-screen min-h-screen w-full overflow-auto">
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
      <body className="flex h-screen min-h-screen w-full flex-col overflow-auto">
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
        <noscript>
          Your browser does not support JavaScript or it is not enabled! Please
          re-enable JavaScript in order to use this site.
        </noscript>
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return <LoadingOverlay isLoading={isLoading} />;
}

const Root = () => {
  return <Outlet />;
};

export default Root;
