import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock react-native components
vi.mock('react-native', async () => {
  const RN = await vi.importActual('react-native');
  return {
    ...RN,
    StyleSheet: {
      create: (styles: Record<string, unknown>) => styles,
    },
  };
});
