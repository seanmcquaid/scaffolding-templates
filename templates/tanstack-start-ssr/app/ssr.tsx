import { getRouterManifest } from '@tanstack/react-start/router-manifest';
// app/ssr.tsx
/// <reference types="vinxi/types/server" />
import {
  createStartHandler,
  defaultStreamHandler,
} from '@tanstack/react-start/server';
import { createRouter } from './router';
import prepareMsw from './utils/testing/prepareMsw.server';

prepareMsw();

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
