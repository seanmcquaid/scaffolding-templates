import { z } from 'zod';
import Constants from 'expo-constants';

const clientEnvSchema = z.object({
  EXPO_PUBLIC_API_URL: z.string().url(),
  EXPO_PUBLIC_APP_NAME: z.string().optional(),
});

export const clientEnv = clientEnvSchema.parse({
  EXPO_PUBLIC_API_URL:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL ||
    process.env.EXPO_PUBLIC_API_URL,
  EXPO_PUBLIC_APP_NAME:
    Constants.expoConfig?.extra?.EXPO_PUBLIC_APP_NAME ||
    process.env.EXPO_PUBLIC_APP_NAME,
});
