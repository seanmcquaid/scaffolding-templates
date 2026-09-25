import { type RouteConfig } from '@react-router/dev/routes';
import { remixRoutesOptionAdapter } from '@react-router/remix-routes-option-adapter';
import { flatRoutes } from 'remix-flat-routes';

const routes: RouteConfig = remixRoutesOptionAdapter(defineRoutes =>
  flatRoutes('routes', defineRoutes),
);

export default routes;
