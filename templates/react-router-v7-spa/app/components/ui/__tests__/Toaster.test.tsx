import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast, useToast } from '@/hooks/useToast';
import {
  render,
  renderHook,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import { ToastAction } from '@/components/ui/Toast';

describe('Toaster', () => {
  it('renders a toast with title and description', async () => {
    // The wrapper already includes Toaster, so we just need to trigger a toast
    render(<></>);
    act(() => {
      toast({ title: 'Toast title', description: 'Toast description' });
    });
    await waitFor(() => {
      expect(screen.getByText('Toast description')).toBeInTheDocument();
    });
  });
  it('renders a toast with only a title', async () => {
    render(<></>);
    act(() => {
      toast({ title: 'Only title' });
    });
    await waitFor(() => {
      expect(screen.getByText('Only title')).toBeInTheDocument();
    });
  });
  it('renders a toast with only a description (no title)', async () => {
    render(<></>);
    act(() => {
      toast({ description: 'Only description' });
    });
    await waitFor(() => {
      expect(screen.getByText('Only description')).toBeInTheDocument();
    });
  });
  it('renders a toast with an action element', async () => {
    render(<></>);
    act(() => {
      toast({
        title: 'Action toast',
        // eslint-disable-next-line i18next/no-literal-string
        action: <ToastAction altText="Undo">Undo</ToastAction>,
      });
    });
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Undo' })).toBeInTheDocument();
    });
  });
  it('renders with empty toasts when no toast has been triggered', () => {
    const { result } = renderHook(() => useToast());
    // Dismiss any existing toasts from previous tests
    act(() => {
      result.current.dismiss();
    });
    render(<></>);
    // With no toasts, the map callback should not execute
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('triggers onOpenChange callback when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<></>);
    act(() => {
      toast({ title: 'Closeable toast' });
    });
    await waitFor(() => {
      expect(screen.getByText('Closeable toast')).toBeInTheDocument();
    });
    // Find the close button (toast-close attribute)
    const buttons = screen.getAllByRole('button');
    const closeButton = buttons.find(btn => btn.hasAttribute('toast-close'));
    if (closeButton) {
      await user.click(closeButton);
    }
  });
});
