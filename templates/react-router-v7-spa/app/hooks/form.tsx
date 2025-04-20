import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

const SubmitButton = ({ children }: PropsWithChildren) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={state => ({
        isDirty: state.isDirty,
        isSubmitting: state.isSubmitting,
        isValid: state.isValid,
      })}
    >
      {({ isSubmitting, isValid, isDirty }) => (
        <Button disabled={!isValid || !isDirty || isSubmitting} type="submit">
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};

interface TextFieldProps {
  label?: string;
  defaultValue?: string;
  className?: string;
}

const TextField = ({
  label,
  defaultValue,
  className,
}: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <Input
      className={className}
      defaultValue={defaultValue}
      label={label}
      errorMessage={field.state.meta.errors.map(error => error?.message).join(', ')}
      id={field.name}
      value={field.state.value}
      onChange={event => field.handleChange(event.target.value)}
      onBlur={field.handleBlur}
    />
  );
};

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
  },
  fieldContext,
  formComponents: {
    SubmitButton,
  },
  formContext,
});
