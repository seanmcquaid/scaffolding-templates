import '@testing-library/jest-dom/vitest';
import 'cross-fetch/polyfill';
import server from '@/mocks/server';

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (i18nKey: string) => i18nKey,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
