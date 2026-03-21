import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { RenderResult } from '@testing-library/react';
import { render as rtlRender, renderHook as rtlRenderHook } from '@testing-library/react';
import { useState } from 'react';
import type { PropsWithChildren, ReactElement } from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

const Wrapper = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(createTestQueryClient);
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

const renderHook = <T,>(fn: () => T) => {
  return rtlRenderHook(fn, { wrapper: Wrapper });
};

const render = (ui: ReactElement): RenderResult => {
  return rtlRender(ui, { wrapper: Wrapper });
};

// re-export everything
export * from '@testing-library/react';
// override render method
export { render, renderHook };
