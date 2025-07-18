import type * as React from 'react';

import { cn } from '@/utils/styles';

export interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  errorMessage?: string;
}

const Input = ({
  className,
  type,
  errorMessage,
  label,
  ...props
}: InputProps) => {
  return (
    <div className={className}>
      <label htmlFor={props.id}>
        {label}
        <input
          className={cn(
            'border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
          )}
          type={type}
          {...props}
        />
      </label>
      {!!errorMessage && <em className="text-red-500">{errorMessage}</em>}
    </div>
  );
};
Input.displayName = 'Input';

export { Input };
