'use server';
import getValidatedFormData from '@/utils/getValidatedFormData';
import formDataSchema from './formDataSchema';

export const submitName = async (_state: unknown, formData: FormData) => {
  const { errors } = getValidatedFormData({
    formData,
    schema: formDataSchema,
  });
  return errors;
};
