import { QueryClientProvider } from '@tanstack/react-query';
import type { RenderResult } from '@testing-library/react-native';
import {
  render as rntlRender,
  renderHook as rntlRenderHook,
} from '@testing-library/react-native';
import type { PropsWithChildren, ReactElement } from 'react';
import queryClient from '@/services/queries/queryClient';

type WrapperProps = PropsWithChildren;

const Wrapper = ({ children }: WrapperProps) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const renderHook = <T,>(fn: () => T) => {
  return rntlRenderHook(fn, {
    wrapper: Wrapper,
  });
};

const render = (ui: ReactElement): RenderResult => {
  return rntlRender(ui, {
    wrapper: Wrapper,
  });
};

// re-export everything
export * from '@testing-library/react-native';
// override render method
export { render, renderHook };
