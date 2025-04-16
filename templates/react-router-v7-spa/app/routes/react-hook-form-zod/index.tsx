import PageWrapper from '@/components/app/PageWrapper';
import { Input } from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formDataSchema = z
  .object({
    username: z.string().email({
      message: 'Please enter a valid email',
    }),
    password: z.string().min(3).max(10, {
      message: 'Password must be between 3 and 10 characters',
    }),
    confirmPassword: z.string().min(3).max(10, {
      message: 'Password must be between 3 and 10 characters',
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

const ReactHookFormZodPage = () => {
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

export default ReactHookFormZodPage;
