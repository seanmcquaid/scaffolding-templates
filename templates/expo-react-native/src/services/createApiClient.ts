import ky from 'ky';
import env from '@/env';

export const createApiClient = () => {
  return ky.create({
    hooks: {
      afterResponse: [
        async (_, options, response) => {
          if (!response.ok || !options.validationSchema) {
            return response;
          }

          const data = await response.json();
          const validatedData = options.validationSchema.safeParse(data);

          if (!validatedData.success) {
            return new Response(
              JSON.stringify({
                validationErrors: validatedData.error,
              }),
              {
                status: 422,
                statusText: 'API Validation Error',
              }
            );
          }

          return new Response(JSON.stringify(validatedData.data));
        },
      ],
      beforeError: [
        async (error) => {
          try {
            const response = await error.response.json();
            error.responseData = response;
            return error;
          } catch {
            return error;
          }
        },
      ],
    },
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
