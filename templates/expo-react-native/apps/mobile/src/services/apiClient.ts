import ky from 'ky';
import { clientEnv } from '../env';

export const apiClient = ky.create({
  prefixUrl: clientEnv.EXPO_PUBLIC_API_URL,
  timeout: 10000,
  retry: {
    limit: 2,
  },
  hooks: {
    beforeRequest: [
      request => {
        // Add authentication headers if available
        const token = ''; // Get from async storage or context
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      async (_, __, response) => {
        if (response.status === 401) {
          // Handle authentication errors
          // Clear stored tokens and redirect to login
        }
        return response;
      },
    ],
  },
});
