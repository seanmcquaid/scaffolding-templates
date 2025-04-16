import { StartClient } from '@tanstack/react-start';
import { startTransition } from 'react';
/// <reference types="vinxi/types/client" />
import { hydrateRoot } from 'react-dom/client';
import { createRouter } from './router';
import prepareMsw from './utils/testing/prepareMsw.client';

const router = createRouter();

prepareMsw().then(() =>
  startTransition(() => {
    hydrateRoot(document, <StartClient router={router} />);
  }),
);
