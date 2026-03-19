import { createApiClient, apiClient } from '@/services/createApiClient';

describe('createApiClient', () => {
  it('exports createApiClient function', () => {
    expect(typeof createApiClient).toBe('function');
  });

  it('exports default apiClient instance', () => {
    expect(apiClient).toBeDefined();
  });

  it('creates an API client with expected methods', () => {
    const client = createApiClient();

    expect(client).toBeDefined();
    expect(typeof client.get).toBe('function');
    expect(typeof client.post).toBe('function');
    expect(typeof client.put).toBe('function');
    expect(typeof client.delete).toBe('function');
  });
});
