import '@testing-library/jest-dom';

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

// Mock react-native
jest.mock('react-native', () => ({
  StyleSheet: {
    create: (styles: any) => styles,
  },
  Platform: {
    select: (obj: any) => obj.default || obj.ios || obj.android,
  },
  useColorScheme: jest.fn(() => 'light'),
}));

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
