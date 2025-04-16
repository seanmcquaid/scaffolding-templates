import { cn } from '@/utils/styles';
import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { buttonVariants } from './Button';

type LinkButtonProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    className?: string;
  };

const LinkButton = (props: LinkButtonProps) => (
  <Link
    {...props}
    className={cn(
      buttonVariants({
        variant: props.variant,
        size: props.size,
        className: props.className,
      }),
    )}
  >
    {props.children}
  </Link>
);

export default LinkButton;
