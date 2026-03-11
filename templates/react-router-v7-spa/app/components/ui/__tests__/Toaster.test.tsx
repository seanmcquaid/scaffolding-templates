import { act } from '@testing-library/react';
import { toast } from '@/hooks/useToast';
import {
  render,
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
});
