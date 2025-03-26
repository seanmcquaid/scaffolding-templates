import { z } from 'zod';

const serverEnvSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
  NODE_ENV: z.enum(['development', 'test', 'production']),
});

const serverEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
