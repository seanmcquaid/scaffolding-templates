import type { ButtonHTMLAttributes, ElementType, ReactElement } from 'react';
import { Button as ButtonPrimitive } from 'react-aria-components';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/styles';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-10 px-4 py-2',
        icon: 'h-10 w-10',
        lg: 'h-11 rounded-md px-8',
        sm: 'h-9 rounded-md px-3',
      },
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      },
    },
  },
);

type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
    render?: ReactElement;
  };

function Button({
  children,
  className,
  disabled,
  render,
  size = 'default',
  type = 'button',
  variant = 'default',
  ...props
}: ButtonProps) {
  const buttonClassName = cn(buttonVariants({ variant, size, className }));

  if (render) {
    const renderedProps =
      render.props as ButtonHTMLAttributes<HTMLAnchorElement> & {
        ['aria-disabled']?: boolean;
        ['data-disabled']?: string;
      };
    const RenderComponent = render.type as ElementType;

    return (
      <RenderComponent
        {...props}
        {...renderedProps}
        aria-disabled={
          disabled || renderedProps['aria-disabled'] ? true : undefined
        }
        className={cn(buttonClassName, renderedProps.className)}
        data-disabled={disabled ? '' : renderedProps['data-disabled']}
        data-slot="button"
        onClick={
          disabled ? undefined : (props.onClick ?? renderedProps.onClick)
        }
      >
        {children}
      </RenderComponent>
    );
  }

  const Primitive = ButtonPrimitive as unknown as ElementType;

  return (
    <Primitive
      {...props}
      className={buttonClassName}
      data-slot="button"
      disabled={disabled}
      isDisabled={disabled}
      type={type}
    >
      {children}
    </Primitive>
  );
}

export { Button, buttonVariants };
