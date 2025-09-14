import * as React from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { cn } from '@/src/utils/styles';

export interface InputProps extends TextInputProps {}

const Input = React.forwardRef<TextInput, InputProps>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      className={cn(
        'flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
