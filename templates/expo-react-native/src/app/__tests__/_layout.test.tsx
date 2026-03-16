import { render } from '@testing-library/react';
import RootLayout, { unstable_settings } from '@/app/_layout';

jest.mock('@/i18n/i18next.client', () => ({}));

describe('RootLayout', () => {
  it('applies DefaultTheme when color scheme is light', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('light');
    render(<RootLayout />);
  });

  it('applies DarkTheme when color scheme is dark', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('dark');
    render(<RootLayout />);
  });

  it('defaults to light theme when colorScheme is null', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue(null);
    render(<RootLayout />);
  });

  it('exports unstable_settings with the correct anchor', () => {
    expect(unstable_settings).toEqual({ anchor: '(tabs)' });
  });
});
