'use client';

import { useId } from 'react';
import type * as React from 'react';
import { Input } from './Input';
import { Label } from './Label';

export interface InputFieldProps extends React.ComponentProps<typeof Input> {
  errorMessage?: React.ReactNode;
  label?: React.ReactNode;
  wrapperClassName?: string;
}

const InputField = ({
  errorMessage,
  id,
  label,
  wrapperClassName,
  ...props
}: InputFieldProps) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const input = <Input id={inputId} {...props} />;

  if (!label && !errorMessage && !wrapperClassName) {
    return input;
  }

  return (
    <div className={wrapperClassName}>
      {label ? <Label htmlFor={inputId}>{label}</Label> : null}
      {input}
      {errorMessage ? (
        <p className="text-red-500" data-slot="field-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

export { InputField };
