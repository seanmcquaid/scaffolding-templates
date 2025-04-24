'use client';
import { mergeForm, useTransform } from '@tanstack/react-form';
import { initialFormState } from '@tanstack/react-form/nextjs';
import { useActionState } from 'react';
import { useAppForm } from '@/hooks/form';
import { submitName } from './actions';
import formOpts from './formOpts';

const KitchenSinkForm = () => {
  const [formState, formAction] = useActionState(submitName, initialFormState);

  const form = useAppForm({
    ...formOpts,
    transform: useTransform(
      baseForm => mergeForm(baseForm, formState ?? {}),
      [formState],
    ),
  });

  return (
    <form action={formAction} onSubmit={() => form.handleSubmit()}>
      <form.AppField
        children={field => <field.TextField className="m-4" label="Name" />}
        name="name"
      />
      <form.AppForm>
        <form.SubmitButton>Submit</form.SubmitButton>
      </form.AppForm>
    </form>
  );
};

export default KitchenSinkForm;
