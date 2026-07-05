import * as React from 'react';
import { Toast } from '@base-ui/react/toast';

// Global manager for use outside React components (e.g. route actions, event handlers)
export const toastManager = Toast.createToastManager();

type ToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive';
};

export const toast = (options: ToastOptions) => {
  const id = toastManager.add({
    title: options.title,
    description: options.description,
    data: { variant: options.variant },
  });

  return {
    id,
    dismiss: () => toastManager.close(id),
    update: (updates: Partial<ToastOptions & { id?: string }>) => {
      toastManager.update(id, {
        title: updates.title,
        description: updates.description,
        data: { variant: updates.variant },
      });
    },
  };
};

export const useToast = () => {
  const manager = Toast.useToastManager();

  const addToast = React.useCallback(
    (options: ToastOptions) => {
      const id = manager.add({
        title: options.title,
        description: options.description,
        data: { variant: options.variant },
      });

      return {
        id,
        dismiss: () => manager.close(id),
        update: (updates: Partial<ToastOptions & { id?: string }>) => {
          manager.update(id, {
            title: updates.title,
            description: updates.description,
            data: { variant: updates.variant },
          });
        },
      };
    },
    [manager],
  );

  return {
    toasts: manager.toasts,
    toast: addToast,
    dismiss: (id?: string) => manager.close(id),
  };
};
