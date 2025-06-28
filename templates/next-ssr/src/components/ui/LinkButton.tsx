import type { VariantProps } from 'class-variance-authority';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { buttonVariants } from './Button';
import { cn } from '@/utils/styles';

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
