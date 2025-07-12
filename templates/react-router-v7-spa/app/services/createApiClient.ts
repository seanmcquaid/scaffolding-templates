import ky from 'ky';

const createApiClient = (baseUrl: string) => {
  return ky.create({
    hooks: {
      afterResponse: [
        async (_, options, response) => {
          // Development-friendly logging for debugging
          if (process.env.NODE_ENV === 'development') {
            console.log(
              `[API] ${response.status} ${response.statusText} - ${response.url}`,
            );
          }

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
              },
            );
          }

          return new Response(JSON.stringify(validatedData.data));
        },
      ],
      beforeError: [
        async error => {
          // Development-friendly error logging
          if (process.env.NODE_ENV === 'development') {
            console.error(
              `[API Error] ${error.response?.status} ${error.response?.statusText} - ${error.request?.url}`,
            );
          }

          try {
            const response = await error.response.json();
            error.responseData = response;
            return error;
          } catch {
            return error;
          }
        },
      ],
      beforeRequest: [
        request => {
          // Development-friendly request logging
          if (process.env.NODE_ENV === 'development') {
            console.log(`[API Request] ${request.method} ${request.url}`);
          }
        },
      ],
    },
    prefixUrl: baseUrl,
    retry: {
      limit: 2,
      methods: [
        'get',
        'put',
        'head',
        'delete',
        'options',
        'trace',
        'post',
        'patch',
      ],
      statusCodes: [401, 403, 500, 504],
    },
    timeout: 30000, // 30 second timeout for network resilience
  });
};

export default createApiClient;
