import { z } from 'zod';

const envSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_NAME: z.string().optional(),
  EXPO_PUBLIC_APP_VERSION: z.string().optional(),
});

const env = envSchema.parse({
  EXPO_PUBLIC_API_URL: process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_NAME: process.env.EXPO_PUBLIC_APP_NAME,
  EXPO_PUBLIC_APP_VERSION: process.env.EXPO_PUBLIC_APP_VERSION,
});

export default env;
