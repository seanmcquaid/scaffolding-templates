import { http, HttpResponse } from 'msw';
import { z } from 'zod';
import type { HTTPError } from 'ky';
import createApiClient from '@/services/createApiClient';
import server from '@/mocks/server';

describe('createApiClient', () => {
  it('Returns the unvalidated data if no validation schema is provided', async () => {
    server.use(
      http.get('https://api.example.com/example', () =>
        HttpResponse.json({ data: 'example' }),
      ),
    );
    const apiClient = createApiClient('https://api.example.com');
    const response = await apiClient.get('example').json();
    expect(response).toEqual({ data: 'example' });
  });
  describe('Validation schema is provided', () => {
    it('Throws an error if the returned data does not match the validation schema', async () => {
      server.use(
        http.get('https://api.example.com/example', () =>
          HttpResponse.json({ data: 'example' }),
        ),
      );
      const apiClient = createApiClient('https://api.example.com');
      try {
        await apiClient.get('example', {
          validationSchema: z.array(z.string()),
        });
      } catch (err) {
        const httpError = err as HTTPError;
        expect(httpError.response.status).toBe(422);
      }
    });
    it('Returns the data if it matches the validation schema', async () => {
      server.use(
        http.get('https://api.example.com/example', () =>
          HttpResponse.json(['example']),
        ),
      );
      const apiClient = createApiClient('https://api.example.com');
      const response = await apiClient
        .get('example', {
          validationSchema: z.array(z.string()),
        })
        .json();
      expect(response).toEqual(['example']);
    });
  });
});
