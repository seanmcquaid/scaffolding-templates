import React from 'react';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children);

export const DarkTheme = { dark: true, colors: {} };

export const DefaultTheme = { dark: false, colors: {} };
