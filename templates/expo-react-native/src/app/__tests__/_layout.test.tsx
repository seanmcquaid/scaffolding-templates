import { render } from '@testing-library/react-native';
import RootLayout from '../_layout';

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => ({
  DarkTheme: {},
  DefaultTheme: {},
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  QueryClient: jest.fn(() => ({})),
  QueryClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock i18n client
jest.mock('@/i18n/i18next.client', () => ({}));

describe('RootLayout', () => {
  it('renders root layout', () => {
    const result = render(<RootLayout />);
    expect(result).toBeTruthy();
  });

  it('exports unstable_settings', () => {
    const { unstable_settings } = require('../_layout');
    expect(unstable_settings).toBeDefined();
    expect(unstable_settings.anchor).toBe('(tabs)');
  });
});
