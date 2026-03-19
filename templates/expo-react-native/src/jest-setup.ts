import '@testing-library/jest-dom';
import type React from 'react';
import server from '@/mocks/server';

// Mock i18next for tests
jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        changeLanguage: jest.fn(),
      },
    };
  },
  initReactI18next: {
    type: '3rdParty',
    init: jest.fn(),
  },
}));

// Mock expo-router
jest.mock('expo-router', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMock = require('react');
  const TabsComponent = ({ children }: { children: React.ReactNode }) =>
    ReactMock.createElement(ReactMock.Fragment, null, children);
  TabsComponent.Screen = ({
    options,
  }: {
    name: string;
    options?: {
      tabBarIcon?: (props: { color: string; focused: boolean }) => React.ReactNode;
      title?: string;
      headerShown?: boolean;
      presentation?: string;
    };
  }) => {
    if (options?.tabBarIcon) {
      options.tabBarIcon({ color: '#000', focused: false });
    }
    return null;
  };
  const StackComponent = ({ children }: { children: React.ReactNode }) =>
    ReactMock.createElement(ReactMock.Fragment, null, children);
  StackComponent.Screen = 'Screen';

  return {
    Stack: StackComponent,
    Tabs: TabsComponent,
    Link: ({ href, children, style, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('a', { href, style, ...props }, children),
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
  };
});

// Mock react-native components and utilities
jest.mock('react-native', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMock = require('react');
  return {
    StyleSheet: {
      create: (styles: Record<string, unknown>) => styles,
    },
    Platform: {
      select: (obj: Record<string, unknown>) => obj.default || obj.ios || obj.android,
    },
    useColorScheme: jest.fn(() => 'light'),
    Text: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('span', props, children),
    View: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('div', props, children),
    ScrollView: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('div', props, children),
    TouchableOpacity: ({ children, onPress, disabled, ...props }: Record<string, unknown>) =>
      ReactMock.createElement(
        'button',
        { onClick: disabled ? undefined : onPress, disabled, ...props },
        children
      ),
    TextInput: ({ onChangeText, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('input', {
        onChange: (e: { target: { value: string } }) => {
          if (typeof onChangeText === 'function') {
            onChangeText(e.target.value);
          }
        },
        ...props,
      }),
    ActivityIndicator: (props: Record<string, unknown>) =>
      ReactMock.createElement('div', { 'data-testid': 'activity-indicator', ...props }),
    Switch: ({ value, onValueChange, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('input', {
        type: 'checkbox',
        checked: value as boolean,
        onChange: (e: { target: { checked: boolean } }) => {
          if (typeof onValueChange === 'function') {
            onValueChange(e.target.checked);
          }
        },
        ...props,
      }),
    Alert: {
      alert: jest.fn(),
    },
  };
});

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMock = require('react');
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) =>
      ReactMock.createElement(ReactMock.Fragment, null, children),
    DarkTheme: { dark: true, colors: {} },
    DefaultTheme: { dark: false, colors: {} },
  };
});

// Mock expo-status-bar
jest.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

// Mock react-native-reanimated
jest.mock('react-native-reanimated', () => ({}));

// Mock @/env to provide valid environment variables
jest.mock('@/env', () => ({
  __esModule: true,
  default: {
    EXPO_PUBLIC_API_URL: 'https://jsonplaceholder.typicode.com',
    EXPO_PUBLIC_APP_NAME: 'expo-react-native',
    EXPO_PUBLIC_APP_VERSION: '0.0.0',
  },
}));

// Start MSW server once before all tests, reset handlers after each test,
// and close the server after all tests are complete.
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
