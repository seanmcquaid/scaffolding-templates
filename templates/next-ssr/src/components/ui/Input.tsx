'use client';

import type * as React from 'react';
import {
  composeRenderProps,
  Input as InputPrimitive,
} from 'react-aria-components';

import { cn } from '@/utils/styles';

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={composeRenderProps(className, value =>
        cn(
          'cn-input file:text-foreground placeholder:text-muted-foreground w-full min-w-0 outline-none file:inline-flex file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          value,
        ),
      )}
      {...props}
    />
  );
}

export { Input };
