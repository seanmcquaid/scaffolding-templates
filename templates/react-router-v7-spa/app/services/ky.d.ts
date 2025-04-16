import type { ZodFirstPartySchemaTypes } from 'zod';

declare module 'ky' {
  export interface Options {
    validationSchema?: ZodFirstPartySchemaTypes;
  }

  export interface NormalizedOptions {
    validationSchema?: ZodFirstPartySchemaTypes;
  }

  export interface HTTPError<T = unknown> {
    responseData?: T;
  }
}
