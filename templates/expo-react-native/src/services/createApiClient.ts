import ky from 'ky';
import env from '@/env';

export const createApiClient = () => {
  return ky.create({
    prefixUrl: env.EXPO_PUBLIC_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
    retry: {
      limit: 2,
      methods: ['get'],
      statusCodes: [408, 413, 429, 500, 502, 503, 504],
    },
  });
};

export const apiClient = createApiClient();
