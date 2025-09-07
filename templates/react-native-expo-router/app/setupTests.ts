import '@testing-library/jest-native/extend-expect';

// Mock React Native
jest.mock('react-native', () => ({
  StyleSheet: {
    create: jest.fn(styles => styles),
  },
  View: 'View',
  Text: 'Text',
  TextInput: 'TextInput',
  TouchableOpacity: 'TouchableOpacity',
  Pressable: 'Pressable',
  ScrollView: 'ScrollView',
  ActivityIndicator: 'ActivityIndicator',
  Modal: 'Modal',
  Platform: {
    OS: 'ios',
  },
  Dimensions: {
    get: jest.fn(() => ({ width: 375, height: 667 })),
  },
  Appearance: {
    getColorScheme: jest.fn(() => 'light'),
    addChangeListener: jest.fn(),
    removeChangeListener: jest.fn(),
  },
  DeviceEventEmitter: {
    addEventListener: jest.fn(),
    removeAllListeners: jest.fn(),
  },
  NativeEventEmitter: jest.fn(() => ({
    addListener: jest.fn(),
    removeAllListeners: jest.fn(),
  })),
  NativeModules: {},
}));

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
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
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  Link: ({ children }: { children: React.ReactNode }) => children,
  Slot: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaView: ({ children }: { children: React.ReactNode }) => children,
  useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
}));

// Mock @rn-primitives/portal
jest.mock('@rn-primitives/portal', () => ({
  PortalHost: () => null,
  Portal: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock NativeWind and CSS processing
jest.mock('nativewind', () => ({}));
jest.mock('react-native-css-interop', () => ({
  styled: jest.fn(() => jest.fn()),
}));

// Mock our utils module to avoid NativeWind issues in tests
jest.mock('@/utils/styles', () => ({
  cn: jest.fn((...inputs) => inputs.filter(Boolean).join(' ')),
}));
