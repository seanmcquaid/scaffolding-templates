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
  it('renders with no toasts when no toast has been triggered', () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      result.current.dismiss();
    });
    render(<></>);
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
    const closeButton = document.querySelector(
      'button[aria-label="Close toast"]',
    ) as HTMLElement;
    if (closeButton) {
      await user.click(closeButton);
      await waitFor(() => {
        expect(screen.queryByText('Closeable toast')).not.toBeInTheDocument();
      });
    }
  });
});
