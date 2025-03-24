/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/start';
import { startTransition } from 'react';
import { createRouter } from './router';
import prepareMsw from './utils/testing/prepareMsw.client';

const router = createRouter();

prepareMsw().then(() =>
  startTransition(() => {
    hydrateRoot(document, <StartClient router={router} />);
  }),
);
