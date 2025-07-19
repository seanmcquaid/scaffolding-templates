import type { z } from 'zod';

type SchemaType = z.ZodObject<z.ZodRawShape>;

const getValidatedFormData = <T extends SchemaType>({
  schema,
  formData,
}: {
  formData: FormData;
  schema: T;
}) => {
  const schemaKeys: string[] = [];
  schemaKeys.push(...Object.keys(schema.def.shape));

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
