import { HydratedRouter } from 'react-router/dom';
import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import prepareMsw from './utils/testing/prepareMsw.client';
import '@/i18n/i18next.client';

prepareMsw().then(() =>
  startTransition(() => {
    hydrateRoot(
      document,
      <StrictMode>
        <HydratedRouter />
      </StrictMode>,
    );
  }),
);
