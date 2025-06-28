// app/api.ts
import {
  createStartAPIHandler,
  defaultAPIFileRouteHandler,
} from '@tanstack/react-start/server-functions-server';

export default createStartAPIHandler(defaultAPIFileRouteHandler);
