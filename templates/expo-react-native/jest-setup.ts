import '@testing-library/jest-dom';
import React from 'react';

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
  const React = require('react');
  return {
    StyleSheet: {
      create: (styles: any) => styles,
    },
    Platform: {
      select: (obj: any) => obj.default || obj.ios || obj.android,
    },
    useColorScheme: jest.fn(() => 'light'),
    Text: ({ children, ...props }: any) => React.createElement('Text', props, children),
    View: ({ children, ...props }: any) => React.createElement('View', props, children),
  };
});

// Mock @expo/vector-icons/MaterialIcons
jest.mock('@expo/vector-icons/MaterialIcons', () => {
  const React = require('react');
  return {
    __esModule: true,
    default: ({ children, ...props }: any) => React.createElement('MaterialIcons', props, children),
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
