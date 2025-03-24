import { z } from 'zod';

const serverEnvSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z.coerce.boolean().optional(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const serverEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
