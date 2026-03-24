import { act } from '@testing-library/react';
import { toast } from '@/hooks/useToast';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import { Toaster } from '@/components/ui/Toaster';

describe('Toaster', () => {
  it('renders toast with title via the wrapper Toaster', () => {
    // The test wrapper already includes a Toaster
    render(<div />);
    act(() => {
      toast({ title: 'Test Toast Title' });
    });
    expect(screen.getByText('Test Toast Title')).toBeInTheDocument();
  });

  it('renders toast with description', () => {
    render(<div />);
    act(() => {
      toast({ title: 'Test Title', description: 'Test Description' });
    });
    expect(screen.getByText('Test Description')).toBeInTheDocument();
  });

  it('renders Toaster component standalone', () => {
    const { rerender } = render(<Toaster />);
    rerender(<Toaster />);
    // Should render without crashing
    expect(document.body).toBeTruthy();
  });
});
