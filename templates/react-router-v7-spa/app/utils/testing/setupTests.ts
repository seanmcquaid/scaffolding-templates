import '@testing-library/jest-dom/vitest';
import 'cross-fetch/polyfill';
import server from '@/mocks/server';
import queryClient from '@/services/queries/queryClient';

// Stable mock references prevent React Compiler from always seeing changed deps,
// allowing both cache-miss and cache-hit branches to be exercised in tests.
const mockT = (i18nKey: string) => i18nKey;
const mockChangeLanguage = () => Promise.resolve();
const mockI18n = { changeLanguage: mockChangeLanguage };

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
    t: mockT,
  }),
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

beforeEach(() => {
  server.listen();
  queryClient.clear();
  queryClient.setDefaultOptions({ queries: { retry: false } });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
