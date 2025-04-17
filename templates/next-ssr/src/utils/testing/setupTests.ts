import '@testing-library/jest-dom/vitest';
import 'cross-fetch/polyfill';
import server from '@/mocks/server';

vi.mock('next/navigation', () => import('next-router-mock'));

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: () => Promise.resolve(),
      },
      t: (i18nKey: string) => i18nKey,
    };
  },
}));

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
