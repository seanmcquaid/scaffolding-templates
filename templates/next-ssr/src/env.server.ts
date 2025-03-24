import { z } from 'zod';

const serverEnvSchema = z.object({
  EXAMPLE_SECRET_KEY: z.string(),
});

const serverEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
