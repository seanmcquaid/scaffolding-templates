'use server';
import formDataSchema from './formDataSchema';
import getValidatedFormData from '@/utils/getValidatedFormData';

export const submitName = async (state: unknown, formData: FormData) => {
  const { errors } = getValidatedFormData({
    formData,
    schema: formDataSchema,
  });
  return errors;
};
