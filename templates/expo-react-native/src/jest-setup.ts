import '@testing-library/jest-dom';
import server from '@/mocks/server';

// Start MSW server once before all tests, reset handlers after each test,
// and close the server after all tests are complete.
beforeAll(() => server.listen({ onUnhandledRequest: 'warn' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
