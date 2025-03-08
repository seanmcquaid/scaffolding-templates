import { render, screen } from '@testing-library/react';
import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay', () => {
  it('renders when isLoading is true', () => {
    render(<LoadingOverlay isLoading={true} />);

    const overlay = screen.getByTestId('loading-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).not.toHaveClass('hidden');
    expect(overlay).toHaveClass('fixed');
  });

  it('does not render when isLoading is false', () => {
    render(<LoadingOverlay isLoading={false} />);

    const overlay = screen.getByTestId('loading-overlay');
    expect(overlay).toBeInTheDocument();
    expect(overlay).toHaveClass('hidden');
  });

  it('applies custom class names', () => {
    render(<LoadingOverlay isLoading={true} className="custom-class" />);

    const overlay = screen.getByTestId('loading-overlay');
    expect(overlay).toHaveClass('custom-class');
  });

  it('renders a loading spinner', () => {
    render(<LoadingOverlay isLoading={true} />);

    const overlay = screen.getByTestId('loading-overlay');
    const spinner = overlay.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
