/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import TabLayout from '@/app/(tabs)/_layout';

describe('TabLayout', () => {
  it('renders without crashing with light color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('light');
    render(<TabLayout />);
  });

  it('renders without crashing with dark color scheme', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue('dark');
    render(<TabLayout />);
  });

  it('renders without crashing when colorScheme is null', () => {
    const { useColorScheme } = require('react-native');
    useColorScheme.mockReturnValue(null);
    render(<TabLayout />);
  });
});
