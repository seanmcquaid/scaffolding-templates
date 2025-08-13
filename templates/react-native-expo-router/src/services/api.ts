import ky from 'ky';
import { z } from 'zod';
import { clientEnv } from '@/env';

// Create the base API client
export const apiClient = ky.create({
  prefixUrl: clientEnv.EXPO_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  retry: {
    limit: 2,
    methods: ['get'],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
  },
  timeout: 10000,
});

// Example schema for API responses
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  website: z.string().optional(),
});

export type User = z.infer<typeof UserSchema>;

// Example API function
export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get('users').json();
  return z.array(UserSchema).parse(response);
};

export const getUser = async (id: number): Promise<User> => {
  const response = await apiClient.get(`users/${id}`).json();
  return UserSchema.parse(response);
};
