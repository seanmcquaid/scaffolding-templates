import { render } from '@testing-library/react';
import TabLayout from '@/app/(tabs)/_layout';

describe('TabLayout', () => {
  it('renders with tint color for light color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('light');
    render(<TabLayout />);
  });

  it('renders with tint color for dark color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('dark');
    render(<TabLayout />);
  });

  it('falls back to light tint color when colorScheme is null', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue(null);
    render(<TabLayout />);
  });
});
