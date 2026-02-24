import '@testing-library/jest-dom/vitest';
import worker from '@/mocks/worker';

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

beforeAll(() => worker.start({ onUnhandledRequest: 'bypass' }));
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());
