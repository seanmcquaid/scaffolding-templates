import { formOptions } from '@tanstack/react-form';
import formDataSchema from './formDataSchema';

const formOpts = formOptions({
  defaultValues: {
    name: '',
  },
  validators: {
    onChange: formDataSchema,
  },
});

export default formOpts;
