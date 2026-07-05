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

const mockToast = {
  id: '1',
  transitionStatus: undefined as undefined,
} as Parameters<typeof Toast>[0]['toast'];

describe('Toast components', () => {
  it('applies the default variant CSS class to the toast element', () => {
    render(
      <ToastProvider>
        <Toast toast={mockToast}>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Default toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const title = screen.getByText('Default toast');
    const toastEl = title.closest('div');
    expect(toastEl?.className).toContain('bg-background');
  });

  it('applies the destructive variant CSS class to the toast element', () => {
    render(
      <ToastProvider>
        <Toast toast={mockToast} variant="destructive">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Error toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const title = screen.getByText('Error toast');
    const toastEl = title.closest('div');
    expect(toastEl?.className).toContain('destructive');
  });

  it('renders ToastTitle and ToastDescription with correct content', () => {
    render(
      <ToastProvider>
        <Toast toast={mockToast}>
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
        <Toast toast={mockToast}>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastAction>Undo</ToastAction>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    // Base UI sets aria-hidden on the close button when unfocused; query via DOM
    expect(
      document.querySelector('button[aria-label="Close"]'),
    ).toBeInTheDocument();
  });

  it('applies a custom className to ToastViewport', () => {
    render(
      <ToastProvider>
        <ToastViewport className="custom-viewport" />
      </ToastProvider>,
    );
    // ToastViewport renders inside a portal (outside the render container)
    expect(
      document.body.querySelector('.custom-viewport'),
    ).toBeInTheDocument();
  });

  it('applies a custom className to Toast', () => {
    render(
      <ToastProvider>
        <Toast toast={mockToast} className="custom-toast">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Custom styled toast</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    const title = screen.getByText('Custom styled toast');
    const toastEl = title.closest('div');
    expect(toastEl?.className).toContain('custom-toast');
  });
});
