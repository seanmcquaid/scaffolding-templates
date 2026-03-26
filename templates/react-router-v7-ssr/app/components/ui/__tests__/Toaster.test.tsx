import { render, screen } from '@testing-library/react';
import { Toaster } from '@/components/ui/Toaster';
import { toast } from '@/hooks/useToast';

describe('Toaster', () => {
  it('renders without any toasts', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });

  it('renders a toast with only title (no description)', () => {
    toast({ title: 'Only Title' });
    render(<Toaster />);
    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText('Some description')).not.toBeInTheDocument();
  });

  it('renders a toast with only description (no title)', () => {
    toast({ description: 'Only Description' });
    render(<Toaster />);
    expect(screen.getByText('Only Description')).toBeInTheDocument();
  });

  it('renders a toast with both title and description', () => {
    toast({ title: 'Toast Title', description: 'Toast Description' });
    render(<Toaster />);
    expect(screen.getByText('Toast Title')).toBeInTheDocument();
    expect(screen.getByText('Toast Description')).toBeInTheDocument();
  });
});
