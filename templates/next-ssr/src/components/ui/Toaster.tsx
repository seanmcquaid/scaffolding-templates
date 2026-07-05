'use client';

import { Toast } from '@base-ui/react/toast';

import {
  Toast as ToastComponent,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/Toast';

export const Toaster = () => {
  const { toasts } = Toast.useToastManager();

  return (
    <>
      {toasts.map(toastItem => (
        <ToastComponent
          key={toastItem.id}
          toast={toastItem}
          variant={toastItem.data?.variant}
        >
          <div className="grid gap-1">
            {toastItem.title && <ToastTitle>{toastItem.title}</ToastTitle>}
            {toastItem.description && (
              <ToastDescription>{toastItem.description}</ToastDescription>
            )}
          </div>
          <ToastClose />
        </ToastComponent>
      ))}
      <ToastViewport />
    </>
  );
};
