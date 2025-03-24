import type * as React from 'react';

import { cn } from '@/utils/styles';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorMessage?: string;
}

const Input = ({
  className,
  type,
  errorMessage,
  label,
  ...props
}: React.HTMLProps<HTMLInputElement> & InputProps) => {
  return (
    <div className={className}>
      <label htmlFor={props.id}>
        {label}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          )}
          {...props}
        />
      </label>
      {!!errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
Input.displayName = 'Input';

export { Input };
