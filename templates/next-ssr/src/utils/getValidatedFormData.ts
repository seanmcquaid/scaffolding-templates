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

  if ((schema as unknown)._def.type === 'pipe') {
    const typedSchema = schema as unknown;
    const inputSchema = (typedSchema as unknown)._def.in;
    schemaKeys.push(...Object.keys((inputSchema as unknown)._def.shape));
  } else {
    schemaKeys.push(...Object.keys((schema as unknown)._def.shape));
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
      (acc: Record<string, string>, error: Record<string, unknown>) => ({
        ...acc,
        [error.path[0] as string]: error.message,
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
