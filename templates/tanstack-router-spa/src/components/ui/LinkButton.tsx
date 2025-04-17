import type { LinkProps } from '@tanstack/react-router';
import { Link } from '@tanstack/react-router';
import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import { cn } from '@/utils/styles';
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
        className: props.className,
        size: props.size,
        variant: props.variant,
      }),
    )}
  >
    {props.children}
  </Link>
);

export default LinkButton;
