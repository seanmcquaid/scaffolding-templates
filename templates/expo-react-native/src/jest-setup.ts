import '@testing-library/jest-dom';
import { notifyManager } from '@tanstack/react-query';
import { act } from '@testing-library/react-native';
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

// Make React Query notifications run inside React Testing Library act()
// and avoid queued timer-based notifications in Jest workers.
notifyManager.setNotifyFunction((callback) => {
  act(callback);
});
notifyManager.setScheduler((callback) => {
  callback();
});

// Start MSW server once before all tests, reset handlers after each test,
// and close the server after all tests are complete.
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
