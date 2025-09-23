import { describe, it, expect } from 'vitest';
import { apiClient } from '@/services/apiClient';

// Simple unit test to verify API client can be imported
describe('API Client', () => {
  it('can be imported and configured correctly', () => {
    expect(apiClient).toBeDefined();
    expect(apiClient.create).toBeDefined();
  });
});
