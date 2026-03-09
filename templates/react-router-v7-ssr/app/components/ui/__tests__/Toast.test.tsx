import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/Toast';

describe('Toast components', () => {
  it('applies the default variant CSS class to the toast element', () => {
    render(
      <ToastProvider>
        <Toast open>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Default toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const title = screen.getByText('Default toast');
    const toastEl = title.closest('[data-state]');
    expect(toastEl?.className).toContain('bg-background');
  });

  it('applies the destructive variant CSS class to the toast element', () => {
    render(
      <ToastProvider>
        <Toast open variant="destructive">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Error toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const title = screen.getByText('Error toast');
    const toastEl = title.closest('[data-state]');
    expect(toastEl?.className).toContain('destructive');
  });

  it('renders ToastTitle and ToastDescription with correct content', () => {
    render(
      <ToastProvider>
        <Toast open>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Title text</ToastTitle>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastDescription>Description text</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText('Title text')).toBeInTheDocument();
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('renders ToastAction and ToastClose as interactive elements', () => {
    render(
      <ToastProvider>
        <Toast open>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastAction altText="Undo action">Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    const allButtons = screen.getAllByRole('button');
    expect(allButtons.some(btn => btn.hasAttribute('toast-close'))).toBe(true);
  });
});
