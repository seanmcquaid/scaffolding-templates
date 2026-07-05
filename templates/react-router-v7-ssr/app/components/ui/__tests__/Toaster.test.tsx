import { act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast, useToast } from '@/hooks/useToast';
import {
  render,
  renderHook,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

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
  it('closes a toast when the close button is clicked', async () => {
    const user = userEvent.setup();
    render(<></>);
    act(() => {
      toast({ title: 'Closeable toast' });
    });
    await waitFor(() => {
      expect(screen.getByText('Closeable toast')).toBeInTheDocument();
    });
    // Base UI sets aria-hidden on the close button when unfocused; query via DOM
    const closeButton = document.querySelector(
      'button[aria-label="Close"]',
    ) as HTMLElement;
    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton);
    await waitFor(() => {
      expect(screen.queryByText('Closeable toast')).not.toBeInTheDocument();
    });
  });
});
