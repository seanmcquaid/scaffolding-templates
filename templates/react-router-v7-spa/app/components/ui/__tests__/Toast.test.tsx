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
  it('renders Toast with default variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open>
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Test title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(container).toBeTruthy();
  });

  it('renders Toast with destructive variant', () => {
    const { container } = render(
      <ToastProvider>
        <Toast open variant="destructive">
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <ToastTitle>Error title</ToastTitle>
        </Toast>
        <ToastViewport />
      </ToastProvider>,
    );
    expect(container).toBeTruthy();
  });

  it('renders ToastTitle and ToastDescription', () => {
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

  it('renders ToastAction and ToastClose', () => {
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
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });
});
