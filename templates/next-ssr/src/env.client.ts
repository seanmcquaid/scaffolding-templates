import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
});

const env = envSchema.parse(process.env);

export default env;
