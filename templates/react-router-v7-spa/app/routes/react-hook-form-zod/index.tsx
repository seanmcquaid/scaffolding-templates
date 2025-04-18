import { useForm } from '@tanstack/react-form';
import { FormEvent } from 'react';
import { z } from 'zod';
import PageWrapper from '@/components/app/PageWrapper';
import { Input } from '@/components/ui/Input';

const formDataSchema = z
  .object({
    confirmPassword: z.string().min(3).max(10, {
      message: 'Password must be between 3 and 10 characters',
    }),
    password: z.string().min(3).max(10, {
      message: 'Password must be between 3 and 10 characters',
    }),
    username: z.string().email({
      message: 'Please enter a valid email',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ReactHookFormZodPage = () => {
  const form = useForm({
    defaultValues: {
      confirmPassword: '',
      password: '',
      username: '',
    },
    validators: {
      onBlur: formDataSchema,
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation()
    form.handleSubmit();
  };

  return (
    <PageWrapper>
      <form className="w-full" onSubmit={handleSubmit}>
        <form.Field
          children={field => (
            <Input
              autoComplete="username"
              errorMessage={field.state.meta.isTouched ? field.state.meta.errors.map(error => error?.message).join(', ') : ''}
              id={field.name}
              label="Username"
              name={field.name}
              onBlur={field.handleBlur}
              onChange={event => field.handleChange(event.target.value)}
              value={field.state.value}
            />
          )}
          name="username"
        />
        <form.Field
          children={field => (
            <Input
              autoComplete="new-password"
              className="mt-4"
              errorMessage={field.state.meta.isTouched ? field.state.meta.errors.map(error => error?.message).join(', ') : ''}
              id={field.name}
              label="Password"
              onBlur={field.handleBlur}
              onChange={event => field.handleChange(event.target.value)}
              type="password"
              value={field.state.value}
            />
          )}
          name="password"
        />
        <form.Field
          children={field => (
            <Input
              autoComplete="new-password"
              className="mt-4"
              errorMessage={field.state.meta.isTouched ? field.state.meta.errors.map(error => error?.message).join(', ') : ''}
              id={field.name}
              label="Confirm Password"
              onBlur={field.handleBlur}
              onChange={event => field.handleChange(event.target.value)}
              type="password"
              value={field.state.value}
            />
          )}
          name="confirmPassword"
        />
      </form>
    </PageWrapper>
  );
};

export default ReactHookFormZodPage;
