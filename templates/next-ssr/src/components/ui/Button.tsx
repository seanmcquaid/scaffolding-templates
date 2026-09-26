'use client';

import type { VariantProps } from 'class-variance-authority';
import type * as React from 'react';
import {
  Button as ButtonPrimitive,
  Link as LinkPrimitive,
  type ButtonProps as ButtonPrimitiveProps,
  type LinkProps as LinkPrimitiveProps,
} from 'react-aria-components';

import buttonVariants from './buttonVariants';
import { cn } from '@/utils/styles';

type ButtonStyleProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonProps = Omit<ButtonPrimitiveProps, 'className'> &
  React.RefAttributes<HTMLButtonElement> &
  ButtonStyleProps;

type LinkButtonProps = Omit<LinkPrimitiveProps, 'className'> & ButtonStyleProps;

function Button({
  className,
  size = 'default',
  variant = 'default',
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-size={size}
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

function LinkButton({
  className,
  size = 'default',
  variant = 'default',
  ...props
}: LinkButtonProps) {
  return (
    <LinkPrimitive
      data-size={size}
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, LinkButton, buttonVariants };
