import { zodResolver } from '@hookform/resolvers/zod';
import { createLazyFileRoute } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import PageWrapper from '@/components/app/PageWrapper';
import { InputField } from '@/components/ui/InputField';

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
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'all',
    resolver: zodResolver(formDataSchema),
  });

  return (
    <PageWrapper>
      <form>
        <InputField
          autoComplete="username"
          wrapperClassName="m-4"
          errorMessage={errors?.username?.message}
          label="Username"
          {...register('username')}
        />
        <InputField
          autoComplete="new-password"
          wrapperClassName="m-4"
          errorMessage={errors?.password?.message}
          label="Password"
          type="password"
          {...register('password')}
        />
        <InputField
          autoComplete="new-password"
          wrapperClassName="m-4"
          errorMessage={errors?.confirmPassword?.message}
          label="Confirm Password"
          type="password"
          {...register('confirmPassword')}
        />
      </form>
    </PageWrapper>
  );
};

export const Route = createLazyFileRoute('/react-hook-form-zod/')({
  component: ReactHookFormZodPage,
});
