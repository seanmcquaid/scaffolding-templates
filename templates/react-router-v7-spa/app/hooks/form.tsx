import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, InputProps } from '@/components/ui/Input';

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

const TextField = ({
  label,
  defaultValue,
  className,
  ...props
}: InputProps) => {
  const field = useFieldContext<string>();

  return (
    <Input
      {...props}
      className={className}
      defaultValue={defaultValue}
      errorMessage={
        field.state.meta.isTouched
          ? field.state.meta.errors.map(error => error?.message).join(', ')
          : ''
      }
      id={field.name}
      label={label}
      name={field.name}
      onBlur={field.handleBlur}
      onChange={event => field.handleChange(event.target.value)}
      value={field.state.value}
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
