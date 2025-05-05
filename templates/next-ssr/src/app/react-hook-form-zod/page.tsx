'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PageWrapper from '@/components/app/PageWrapper';
import { Input } from '@/components/ui/Input';

const formDataSchema = z
  .object({
    confirmPassword: z
      .string()
      .min(3, {
        message: 'Password must be between 3 and 10 characters',
      })
      .max(10, {
        message: 'Password must be between 3 and 10 characters',
      }),
    password: z
      .string()
      .min(3, {
        message: 'Password must be between 3 and 10 characters',
      })
      .max(10, {
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

type FormData = z.infer<typeof formDataSchema>;

const resolver = zodResolver(formDataSchema);

const ReactHookFormZod = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
    resolver,
  });
  return (
    <PageWrapper>
      <form>
        <Input
          autoComplete="username"
          className="m-4"
          errorMessage={errors?.username?.message}
          label="Username"
          {...register('username')}
        />
        <Input
          autoComplete="new-password"
          className="m-4"
          errorMessage={errors?.password?.message}
          label="Password"
          type="password"
          {...register('password')}
        />
        <Input
          autoComplete="new-password"
          className="m-4"
          errorMessage={errors?.confirmPassword?.message}
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
        />
      </form>
    </PageWrapper>
  );
};

export default ReactHookFormZod;
