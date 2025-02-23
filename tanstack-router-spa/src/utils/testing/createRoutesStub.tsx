import {
  createBrowserHistory,
  createRootRoute,
  createRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router';
import type { JSX } from 'react';

interface RouteStub {
  path: string;
  component: () => JSX.Element;
  loader?: () => unknown;
  params?: string;
}

const createRoutesStub = (
  routeStubs: RouteStub[],
  args?: {
    initialPath?: string;
  },
) => {
  const rootRoute = createRootRoute();
  const history = createBrowserHistory();
  history.push(args?.initialPath ?? '/');

  const routes = routeStubs.map(({ path, component, loader }) =>
    createRoute({
      getParentRoute: () => rootRoute,
      path,
      component,
      loader,
      params: {
        parse: params => params,
        stringify: params => params,
      },
    }),
  );
  const routeTree = rootRoute.addChildren(routes);
  const router = createRouter({
    routeTree,
    history,
  });

  return () => <RouterProvider router={router as never} />;
};

export default createRoutesStub;
