import { act } from '@testing-library/react';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import { toast } from '@/hooks/useToast';

describe('Toast (Sonner) integration', () => {
  afterEach(() => {
    // Dismiss all toasts between tests
    act(() => {
      toast({ title: '' });
    });
  });

  it('renders a toast with a title', async () => {
    render(<></>);
    act(() => {
      toast({ title: 'Test title' });
    });
    await waitFor(() => {
      expect(screen.getByText('Test title')).toBeInTheDocument();
    });
  });

  it('renders a toast with a title and description', async () => {
    render(<></>);
    act(() => {
      toast({ title: 'Title text', description: 'Description text' });
    });
    await waitFor(() => {
      expect(screen.getByText('Title text')).toBeInTheDocument();
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });

  it('renders a destructive toast variant', async () => {
    render(<></>);
    act(() => {
      toast({ title: 'Error toast', variant: 'destructive' });
    });
    await waitFor(() => {
      expect(screen.getByText('Error toast')).toBeInTheDocument();
    });
  });

  it('renders a toast with only a description', async () => {
    render(<></>);
    act(() => {
      toast({ description: 'Only description' });
    });
    await waitFor(() => {
      expect(screen.getByText('Only description')).toBeInTheDocument();
    });
  });
});
