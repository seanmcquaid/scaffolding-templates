import { toast as sonnerToast } from 'sonner';

type ToastInput = {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

export const toast = (input: ToastInput) => {
  const { title = '', description, variant } = input;
  if (variant === 'destructive') {
    return sonnerToast.error(title, { description });
  }
  return sonnerToast(title, { description });
};

export const useToast = () => ({
  dismiss: sonnerToast.dismiss,
  toast,
});
