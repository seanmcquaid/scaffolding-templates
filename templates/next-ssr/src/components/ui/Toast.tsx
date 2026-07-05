'use client';
import { Toast } from '@base-ui/react/toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import type * as React from 'react';

import { cn } from '@/utils/styles';

const ToastProvider = Toast.Provider;

const ToastViewport = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Toast.Viewport>) => (
  <Toast.Portal>
    <Toast.Viewport
      className={cn(
        'fixed top-0 z-100 flex max-h-screen w-full flex-col-reverse p-4 sm:top-auto sm:right-0 sm:bottom-0 sm:flex-col md:max-w-[420px]',
        className,
      )}
      {...props}
    />
  </Toast.Portal>
);
ToastViewport.displayName = Toast.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swiping]:transition-none data-[starting-style]:animate-in data-[ending-style]:animate-out data-[ending-style]:fade-out-80 data-[ending-style]:slide-out-to-right-full data-[starting-style]:slide-in-from-top-full sm:data-[starting-style]:slide-in-from-bottom-full',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
  },
);

const ToastComponent = ({
  className,
  variant,
  toast,
  ...props
}: Toast.Root.Props & VariantProps<typeof toastVariants>) => (
  <Toast.Root
    toast={toast}
    className={cn(toastVariants({ variant }), className)}
    {...props}
  />
);
ToastComponent.displayName = Toast.Root.displayName;

const ToastAction = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Toast.Action>) => (
  <Toast.Action
    className={cn(
      'ring-offset-background hover:bg-secondary focus:ring-ring group-[.destructive]:border-muted/40 focus:group-[.destructive]:ring-destructive hover:group-[.destructive]:border-destructive/30 hover:group-[.destructive]:bg-destructive hover:group-[.destructive]:text-destructive-foreground inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none disabled:opacity-50',
      className,
    )}
    {...props}
  />
);
ToastAction.displayName = Toast.Action.displayName;

const ToastClose = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Toast.Close>) => (
  <Toast.Close
    aria-label="Close"
    className={cn(
      'text-foreground/50 hover:text-foreground absolute top-2 right-2 rounded-md p-1 opacity-0 transition-opacity group-hover:opacity-100 group-[.destructive]:text-red-300 hover:group-[.destructive]:text-red-50 focus:opacity-100 focus:ring-2 focus:outline-hidden focus:group-[.destructive]:ring-red-400 focus:group-[.destructive]:ring-offset-red-600',
      className,
    )}
    {...props}
  >
    <X className="h-4 w-4" aria-hidden="true" />
  </Toast.Close>
);
ToastClose.displayName = Toast.Close.displayName;

const ToastTitle = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Toast.Title>) => (
  <Toast.Title className={cn('text-sm font-semibold', className)} {...props} />
);
ToastTitle.displayName = Toast.Title.displayName;

const ToastDescription = ({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof Toast.Description>) => (
  <Toast.Description
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
);
ToastDescription.displayName = Toast.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof ToastComponent>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  ToastComponent as Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
