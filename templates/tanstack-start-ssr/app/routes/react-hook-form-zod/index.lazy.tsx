import { createLazyFileRoute } from '@tanstack/react-router';
import { FormEvent } from 'react';
import { z } from 'zod';
import PageWrapper from '@/components/app/PageWrapper';
import { useAppForm } from '@/hooks/form';
import type { Field } from '@tanstack/react-form';

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

export const ReactHookFormZodPage = () => {
  const form = useAppForm({
    defaultValues: {
      confirmPassword: '',
      password: '',
      username: '',
    },
    validators: {
      onChange: formDataSchema,
    },
  });

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    form.handleSubmit();
  };

  return (
    <PageWrapper>
      <form className="w-full" onSubmit={handleSubmit}>
        <form.AppField
          children={(field: Field<string>) => (
            <field.TextField autoComplete="username" label="Username" />
          )}
          name="username"
        />
        <form.AppField
          children={(field: Field<string>) => (
            <field.TextField
              autoComplete="new-password"
              className="mt-4"
              label="Password"
              type="password"
            />
          )}
          name="password"
        />
        <form.AppField
          children={(field: Field<string>) => (
            <field.TextField
              autoComplete="new-password"
              className="mt-4"
              label="Confirm Password"
              type="password"
            />
          )}
          name="confirmPassword"
        />
        <form.AppForm>
          <form.SubmitButton>Submit</form.SubmitButton>
        </form.AppForm>
      </form>
    </PageWrapper>
  );
};

export const Route = createLazyFileRoute('/react-hook-form-zod/')({
  component: ReactHookFormZodPage,
});
