import { render, screen } from '@testing-library/react';
import { Toaster } from '@/components/ui/Toaster';

vi.mock('@/hooks/useToast');

import { useToast } from '@/hooks/useToast';

const baseToastState = {
  dismiss: vi.fn(),
  toast: vi.fn(),
};

describe('Toaster', () => {
  beforeEach(() => {
    vi.mocked(useToast).mockReturnValue({
      ...baseToastState,
      toasts: [],
    });
  });

  it('renders without any toasts', () => {
    const { container } = render(<Toaster />);
    expect(container).toBeInTheDocument();
  });

  it('renders a toast with only title (no description)', () => {
    vi.mocked(useToast).mockReturnValue({
      ...baseToastState,
      toasts: [{ id: '1', open: true, title: 'Only Title' }],
    });
    render(<Toaster />);
    expect(screen.getByText('Only Title')).toBeInTheDocument();
    expect(screen.queryByText('Some description')).not.toBeInTheDocument();
  });

  it('renders a toast with only description (no title)', () => {
    vi.mocked(useToast).mockReturnValue({
      ...baseToastState,
      toasts: [{ id: '1', description: 'Only Description', open: true }],
    });
    render(<Toaster />);
    expect(screen.getByText('Only Description')).toBeInTheDocument();
  });

  it('renders a toast with both title and description', () => {
    vi.mocked(useToast).mockReturnValue({
      ...baseToastState,
      toasts: [
        {
          id: '1',
          description: 'Toast Description',
          open: true,
          title: 'Toast Title',
        },
      ],
    });
    render(<Toaster />);
    expect(screen.getByText('Toast Title')).toBeInTheDocument();
    expect(screen.getByText('Toast Description')).toBeInTheDocument();
  });
});
