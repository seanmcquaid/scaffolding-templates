import { useId } from 'react';
import type * as React from 'react';
import {
  composeRenderProps,
  Input as InputPrimitive,
} from 'react-aria-components';

import { cn } from '@/utils/styles';

export interface InputProps extends Omit<
  React.ComponentProps<typeof InputPrimitive>,
  'children'
> {
  errorMessage?: string;
  label?: string;
  wrapperClassName?: string;
}

const Input = ({
  className,
  errorMessage,
  label,
  type,
  wrapperClassName,
  ...props
}: InputProps) => {
  const id = useId();
  const inputId = props.id ?? id;
  const input = (
    <InputPrimitive
      className={composeRenderProps(className, value =>
        cn(
          'cn-input border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring file:text-foreground flex h-10 w-full min-w-0 rounded-md border px-3 py-2 text-sm outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          value,
        ),
      )}
      data-slot="input"
      id={inputId}
      type={type}
      {...props}
    />
  );

  if (!label && !errorMessage && !wrapperClassName) {
    return input;
  }

  return (
    <div className={wrapperClassName}>
      {label ? (
        <label data-slot="label" htmlFor={inputId}>
          {label}
        </label>
      ) : null}
      {input}
      {errorMessage ? (
        <p className="text-red-500" data-slot="field-error" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};
Input.displayName = 'Input';

export { Input };
