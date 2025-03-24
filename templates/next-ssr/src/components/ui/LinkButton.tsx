import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { LinkProps } from 'next/link';
import Link from 'next/link';
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
