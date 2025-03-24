import { z } from 'zod';

const clientEnvSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z.coerce.boolean().optional(),
  MODE: z.enum(['development', 'test', 'production']),
});

const clientEnv = clientEnvSchema.parse(import.meta.env);

export default clientEnv;
