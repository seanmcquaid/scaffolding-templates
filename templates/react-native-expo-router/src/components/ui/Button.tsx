import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Text, TouchableOpacity, type TouchableOpacityProps } from 'react-native';

import { cn } from '@/src/utils/styles';

const buttonVariants = cva(
  'flex-row items-center justify-center rounded-md px-4 py-2 font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-blue-600 active:bg-blue-700',
        destructive: 'bg-red-600 active:bg-red-700',
        outline: 'border border-gray-300 bg-transparent active:bg-gray-100',
        secondary: 'bg-gray-200 active:bg-gray-300',
        ghost: 'bg-transparent active:bg-gray-100',
        link: 'bg-transparent underline-offset-4 active:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
      disabled: {
        true: 'opacity-50 pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const buttonTextVariants = cva('text-sm font-medium text-center', {
  variants: {
    variant: {
      default: 'text-white',
      destructive: 'text-white',
      outline: 'text-gray-900',
      secondary: 'text-gray-900',
      ghost: 'text-gray-900',
      link: 'text-blue-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ButtonProps
  extends Omit<TouchableOpacityProps, 'disabled'>,
    VariantProps<typeof buttonVariants> {
  title: string;
  disabled?: boolean;
}

const Button = React.forwardRef<React.ComponentRef<typeof TouchableOpacity>, ButtonProps>(
  ({ className, variant, size, title, disabled, ...props }, ref) => {
    return (
      <TouchableOpacity
        className={cn(buttonVariants({ variant, size, disabled, className }))}
        ref={ref}
        disabled={disabled}
        {...props}>
        <Text className={cn(buttonTextVariants({ variant }))}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
