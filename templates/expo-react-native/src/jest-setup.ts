import '@testing-library/jest-dom';
import server from '@/mocks/server';

jest.mock('@/i18n/i18next.client', () => ({ default: {} }));

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      i18n: {
        changeLanguage: () => Promise.resolve(),
      },
      t: (i18nKey: string) => i18nKey,
    };
  },
}));

// Start MSW server once before all tests, reset handlers after each test,
// and close the server after all tests are complete.
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
