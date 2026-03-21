import React from 'react';

const StackComponent = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);
// Stack.Screen is not rendered in tests; a string placeholder satisfies
// component-tree serialization without needing a full component implementation.
StackComponent.Screen = 'Screen';

export const Stack = StackComponent;

export const Link = ({ href, children, style, ...props }: Record<string, unknown>) =>
  React.createElement(
    'a',
    { href, style, ...props } as React.AnchorHTMLAttributes<HTMLAnchorElement>,
    children as React.ReactNode
  );
