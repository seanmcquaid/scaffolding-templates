import { createFormHook, createFormHookContexts, type FormState } from '@tanstack/react-form';
import type { PropsWithChildren } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, InputProps } from '@/components/ui/Input';

const { fieldContext, useFieldContext, formContext, useFormContext } =
  createFormHookContexts();

const SubmitButton = ({ children }: PropsWithChildren) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state: FormState) => ({
        isDirty: state.isDirty,
        isSubmitting: state.isSubmitting,
        isValid: state.isValid,
      })}
    >
      {({ isSubmitting, isValid, isDirty }: { isSubmitting: boolean; isValid: boolean; isDirty: boolean }) => (
        <Button disabled={!isValid || !isDirty || isSubmitting} type="submit">
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};

type TextFieldProps = Omit<
  InputProps,
  'value' | 'onChange' | 'onBlur' | 'errorMessage' | 'id' | 'name'
>;

const TextField = ({
  label,
  defaultValue,
  className,
  ...props
}: TextFieldProps) => {
  const field = useFieldContext<string>();

  return (
    <Input
      {...props}
      className={className}
      defaultValue={defaultValue}
      errorMessage={
        field.state.meta.isTouched
          ? field.state.meta.errors.map((error: { message: string }) => error?.message).join(', ')
          : ''
      }
      id={field.name}
      label={label}
      name={field.name}
      onBlur={field.handleBlur}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => field.handleChange(event.target.value)}
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