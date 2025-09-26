import type { RenderResult } from '@testing-library/react-native';
import { render as rtlRender, renderHook as rtlRenderHook } from '@testing-library/react-native';
import type { PropsWithChildren, ReactElement } from 'react';

const Wrapper = ({ children }: PropsWithChildren) => <>{children}</>;

const renderHook = <T,>(fn: () => T) => {
  return rtlRenderHook(fn, { wrapper: Wrapper });
};

const render = (ui: ReactElement): RenderResult => {
  return rtlRender(ui, { wrapper: Wrapper });
};

// re-export everything
export * from '@testing-library/react-native';
// override render method
export { render, renderHook };
