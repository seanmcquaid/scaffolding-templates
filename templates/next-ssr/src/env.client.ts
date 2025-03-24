import { z } from 'zod';

const clientEnvSchema = z.object({
  NEXT_PUBLIC_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
});

const clientEnv = clientEnvSchema.parse(process.env);

export default clientEnv;
