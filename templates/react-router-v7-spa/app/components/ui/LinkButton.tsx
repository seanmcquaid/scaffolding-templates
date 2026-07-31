import type { VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { LinkProps } from 'react-router';
import { Link } from 'react-router';
import { buttonVariants } from './Button';
import { cn } from '@/utils/styles';

type LinkButtonProps = LinkProps &
  VariantProps<typeof buttonVariants> & {
    children: ReactNode;
    className?: string;
  };

const LinkButton = ({
  children,
  className,
  size = 'default',
  variant = 'default',
  ...props
}: LinkButtonProps) => (
  <Link
    {...props}
    className={cn(buttonVariants({ className, size, variant }))}
    data-size={size}
    data-slot="button"
    data-variant={variant}
  >
    {children}
  </Link>
);

export default LinkButton;
