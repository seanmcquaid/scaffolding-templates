import '@testing-library/jest-dom';
import 'react-native-gesture-handler/jestSetup';
import { vi } from 'vitest';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: () => Promise.resolve(),
      },
      t: (i18nKey: string) => i18nKey, // Returns the key for validation
    };
  },
}));

// Mock expo-router
vi.mock('expo-router', () => ({
  Stack: ({ children }: { children: React.ReactNode }) => children,
  Tabs: ({ children }: { children: React.ReactNode }) => children,
  Link: ({ children, ..._props }: { children: React.ReactNode } & Record<string, unknown>) =>
    children,
  useRouter: () => ({
    push: vi.fn(),
    back: vi.fn(),
    replace: vi.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock expo modules
vi.mock('expo-status-bar', () => ({
  StatusBar: () => null,
}));

vi.mock('@expo/vector-icons', () => ({
  Ionicons: () => null,
}));

// Mock react-native components
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native');
  return {
    ...RN,
    useColorScheme: () => 'light',
  };
});