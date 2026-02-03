import '@testing-library/jest-dom';
import type React from 'react';

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
  
  const TabsScreen = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) =>
    ReactMock.createElement('TabsScreen', props, children);
  
  const TabsComponent = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    ReactMock.createElement('Tabs', props, children);
  
  TabsComponent.Screen = TabsScreen;
  
  const StackScreen = ({ children, ...props }: { children?: React.ReactNode; [key: string]: unknown }) =>
    ReactMock.createElement('StackScreen', props, children);
  
  const StackComponent = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
    ReactMock.createElement('Stack', props, children);
  
  StackComponent.Screen = StackScreen;
  
  return {
    Stack: StackComponent,
    Tabs: TabsComponent,
    useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    }),
    useLocalSearchParams: () => ({}),
    Link: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) =>
      ReactMock.createElement('Link', props, children),
  };
});

// Mock react-native components and utilities
jest.mock('react-native', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMock = require('react');
  return {
    StyleSheet: {
      create: (styles: Record<string, unknown>) => styles,
      flatten: (style: unknown) => style || {},
    },
    Platform: {
      select: (obj: Record<string, unknown>) => obj.default || obj.ios || obj.android,
    },
    useColorScheme: jest.fn(() => 'light'),
    Text: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('Text', props, children),
    View: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('View', props, children),
    TouchableOpacity: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('TouchableOpacity', props, children),
    TextInput: ({ ...props }: Record<string, unknown>) =>
      ReactMock.createElement('TextInput', props),
    ScrollView: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('ScrollView', props, children),
    ActivityIndicator: ({ ...props }: Record<string, unknown>) =>
      ReactMock.createElement('ActivityIndicator', props),
    Switch: ({ ...props }: Record<string, unknown>) =>
      ReactMock.createElement('Switch', props),
    Alert: {
      alert: jest.fn(),
    },
  };
});

// Mock @expo/vector-icons/MaterialIcons
jest.mock('@expo/vector-icons/MaterialIcons', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const ReactMock = require('react');
  return {
    __esModule: true,
    default: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('MaterialIcons', props, children),
  };
});

// Mock ky
jest.mock('ky', () => {
  const mockCreate = jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    patch: jest.fn(),
  }));

  return {
    __esModule: true,
    default: {
      create: mockCreate,
    },
  };
});

// Mock expo virtual env
jest.mock('expo/virtual/env', () => ({
  env: {},
}));

// Mock env.client globally
jest.mock('@/env.client', () => ({
  clientEnv: {
    EXPO_PUBLIC_API_URL: 'https://api.example.com',
    EXPO_PUBLIC_APP_NAME: 'Expo React Native',
    EXPO_PUBLIC_APP_VERSION: '1.0.0',
  },
}));
