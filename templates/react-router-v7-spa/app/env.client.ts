import { z } from 'zod'

const envSchema = z.object({
  VITE_APP_ENVIRONMENT: z.enum(['dev', 'qa', 'staging', 'prod']),
  VITE_APP_MSW_ENABLED: z
    .enum(['true', 'false'])
    .transform(value => value === 'true'),
  MODE: z.enum(['development', 'test', 'production']),
})

const env = envSchema.parse(import.meta.env)

export default env
