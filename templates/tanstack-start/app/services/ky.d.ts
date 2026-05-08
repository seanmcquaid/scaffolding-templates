import type { ZodType } from 'zod';

declare module 'ky' {
  export interface Options {
    validationSchema?: ZodType;
  }

  export interface NormalizedOptions {
    validationSchema?: ZodType;
  }

  export interface HTTPError<T = unknown> {
    responseData?: T;
  }
}
