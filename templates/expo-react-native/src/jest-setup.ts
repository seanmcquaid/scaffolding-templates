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
jest.mock('expo-router', () => ({
  Stack: {
    Screen: 'Screen',
  },
  Tabs: ({ children }: { children: React.ReactNode }) => children,
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

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
      ReactMock.createElement('Text', props, children),
    View: ({ children, ...props }: Record<string, unknown>) =>
      ReactMock.createElement('View', props, children),
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
