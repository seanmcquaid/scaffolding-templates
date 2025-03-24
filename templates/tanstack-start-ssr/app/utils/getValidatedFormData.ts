import { z } from 'zod';

type SchemaType =
  | z.ZodObject<z.ZodRawShape>
  | z.ZodEffects<z.ZodObject<z.ZodRawShape>>;

const getValidatedFormData = <T extends SchemaType>({
  schema,
  formData,
}: {
  formData: FormData;
  schema: T;
}) => {
  const schemaKeys: string[] = [];

  if (schema instanceof z.ZodEffects) {
    const typedSchema = schema as unknown as z.ZodEffects<
      z.Schema<z.ZodObjectDef>
    >;
    const def = typedSchema._def.schema._def as {
      shape: () => z.ZodRawShape;
    };
    schemaKeys.push(...Object.keys(def.shape()));
  } else {
    schemaKeys.push(...Object.keys(schema._def.shape()));
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
    const errors = validatedFormData.error.errors.reduce(
      (acc, error) => ({
        ...acc,
        [error.path[0]]: error.message,
      }),
      {} as {
        [Key in keyof z.infer<T>]: string;
      },
    );
    return { errors, defaultValues: formDataFromSchema };
  } else {
    return {
      data: validatedFormData.data as z.infer<T>,
      defaultValues: validatedFormData.data as z.infer<T>,
    };
  }
};

export default getValidatedFormData;
