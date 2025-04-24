'use server';
import formDataSchema from './formDataSchema';
import {
  ServerValidateError,
  createServerValidate,
} from '@tanstack/react-form/nextjs'
import formOpts from './formOpts';

const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: formDataSchema
})

export const submitName = async (_state: unknown, formData: FormData) => {
  try {
    await serverValidate(formData)
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }
};
