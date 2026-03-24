import '@testing-library/jest-dom/vitest';
import 'cross-fetch/polyfill';
import server from '@/mocks/server';

vi.mock('@/i18n/i18next', () => ({ default: {} }));

// Use stable function references so React Compiler cache-hit branches are exercised
// on re-renders (Object.is equality checks will detect stable references)
const mockChangeLanguage = () => Promise.resolve();
const mockT = (i18nKey: string) => i18nKey;
const mockI18n = { changeLanguage: mockChangeLanguage };

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      i18n: mockI18n,
      t: mockT,
    };
  },
}));

// Mock window.matchMedia for useMediaQuery hook
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
