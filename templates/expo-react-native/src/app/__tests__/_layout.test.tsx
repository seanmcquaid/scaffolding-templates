/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import RootLayout, { unstable_settings } from '@/app/_layout';

jest.mock('@/i18n/i18next.client', () => ({}));

describe('RootLayout', () => {
  it('renders without crashing with light color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('light');
    render(<RootLayout />);
  });

  it('renders without crashing with dark color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('dark');
    render(<RootLayout />);
  });

  it('renders without crashing when colorScheme is null', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue(null);
    render(<RootLayout />);
  });

  it('exports unstable_settings with correct anchor', () => {
    expect(unstable_settings).toEqual({ anchor: '(tabs)' });
  });
});
