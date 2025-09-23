// Mock ky before importing anything else
jest.mock('ky', () => ({
  __esModule: true,
  default: {
    create: jest.fn(() => ({
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn(),
      delete: jest.fn(),
    })),
  },
}));

import { apiClient } from '@/services/apiClient';

// Simple unit test to verify API client can be imported
describe('API Client', () => {
  it('can be imported and has expected methods', () => {
    expect(apiClient).toBeDefined();
    expect(apiClient.get).toBeDefined();
    expect(apiClient.post).toBeDefined();
    expect(apiClient.put).toBeDefined();
    expect(apiClient.delete).toBeDefined();
  });
});
