import type { z } from 'zod';

type SchemaType =
  | z.ZodObject<z.ZodRawShape>
  | z.ZodTransform<z.ZodObject<z.ZodRawShape>, unknown>;

const getValidatedFormData = <T extends SchemaType>({
  schema,
  formData,
}: {
  formData: FormData;
  schema: T;
}) => {
  const schemaKeys: string[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((schema as any)._def.type === 'pipe') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedSchema = schema as any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputSchema = typedSchema._def.in as any;
    schemaKeys.push(...Object.keys(inputSchema._def.shape));
  } else {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schemaKeys.push(...Object.keys((schema as any)._def.shape));
  }

  const formDataFromSchema = schemaKeys.reduce(
    (acc, key) => ({
      ...acc,
      [key]: formData.get(key) ?? '',
    }),
    {} as {
      [Key in keyof z.infer<T>]: string;
    },
  );

  const validatedFormData = schema.safeParse(formDataFromSchema);

  if (!validatedFormData.success) {
    const errors = validatedFormData.error.issues.reduce(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (acc: any, error: any) => ({
        ...acc,
        [error.path[0]]: error.message,
      }),
      {} as {
        [Key in keyof z.infer<T>]: string;
      },
    );
    return { defaultValues: formDataFromSchema, errors };
  } else {
    return {
      data: validatedFormData.data as z.infer<T>,
      defaultValues: validatedFormData.data as z.infer<T>,
    };
  }
};

export default getValidatedFormData;
