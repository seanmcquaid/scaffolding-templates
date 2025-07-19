'use server';
import formDataSchema from './formDataSchema';
import getValidatedFormData from '@/utils/getValidatedFormData';

type ActionState =
  | {
      [key: string]: string;
    }
  | undefined;

export const submitName = async (
  _state: ActionState,
  formData: FormData,
): Promise<ActionState> => {
  const result = getValidatedFormData({
    formData,
    schema: formDataSchema,
  });

  // Return errors if validation failed, undefined if successful
  return result.errors ? (result.errors as ActionState) : undefined;
};
