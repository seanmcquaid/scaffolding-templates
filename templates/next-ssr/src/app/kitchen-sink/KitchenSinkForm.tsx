'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { submitName } from './actions';
import formDataSchema from './formDataSchema';

const KitchenSinkForm = () => {
  const {
    register,
    formState: { errors },
  } = useForm<z.infer<typeof formDataSchema>>({
    mode: 'onChange',
    resolver: zodResolver(formDataSchema),
  });
  const [formState, formAction] = useActionState(submitName, {
    name: '',
  });

  return (
    <form action={formAction}>
      <Input
        className="m-4"
        errorMessage={errors?.name?.message || formState?.name}
        label="Name"
        {...register('name')}
      />
      <Button type="submit">{'Submit'}</Button>
    </form>
  );
};

export default KitchenSinkForm;
