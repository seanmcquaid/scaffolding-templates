import { render } from '@/utils/testing/reactNativeTestingLibraryUtils';
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
