'use client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { submitName } from './actions';
import formDataSchema from './formDataSchema';

const KitchenSinkForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    mode: 'onChange',
  });
  const [formState, formAction] = useActionState(submitName, {
    name: '',
  });

  return (
    <form action={formAction}>
      <Input
        className="m-4"
        label="Name"
        errorMessage={errors?.name?.message || formState?.name}
        {...register('name')}
      />
      <Button type="submit">{'Submit'}</Button>
    </form>
  );
};

export default KitchenSinkForm;
