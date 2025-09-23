import '@testing-library/jest-dom';
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

// Mock react-native-gesture-handler
vi.mock('react-native-gesture-handler', () => ({
  GestureHandlerRootView: ({ children }: { children: React.ReactNode }) => children,
  PanGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  TapGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  FlingGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  ForceTouchGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  LongPressGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  PinchGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  RotationGestureHandler: ({ children }: { children: React.ReactNode }) => children,
  RawButton: ({ children }: { children: React.ReactNode }) => children,
  BaseButton: ({ children }: { children: React.ReactNode }) => children,
  RectButton: ({ children }: { children: React.ReactNode }) => children,
  BorderlessButton: ({ children }: { children: React.ReactNode }) => children,
  TouchableOpacity: ({ children }: { children: React.ReactNode }) => children,
  TouchableHighlight: ({ children }: { children: React.ReactNode }) => children,
  TouchableWithoutFeedback: ({ children }: { children: React.ReactNode }) => children,
  createNativeWrapper:
    () =>
    ({ children }: { children: React.ReactNode }) =>
      children,
  Swipeable: ({ children }: { children: React.ReactNode }) => children,
  DrawerLayout: ({ children }: { children: React.ReactNode }) => children,
  State: {},
  Directions: {},
}));

// Mock react-native components
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native');
  return {
    ...RN,
    useColorScheme: () => 'light',
  };
});
