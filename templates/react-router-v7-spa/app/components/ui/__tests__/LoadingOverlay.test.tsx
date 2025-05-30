import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import LoadingOverlay from '../LoadingOverlay';

describe('LoadingOverlay', () => {
  it('Displays the loading overlay when isLoading is true', () => {
    render(<LoadingOverlay isLoading={true} />);
    expect(screen.getByTestId('loadingOverlay')).toHaveClass('fixed');
  });
  it('Hides the loading overlay when isLoading is false', () => {
    render(<LoadingOverlay isLoading={false} />);
    expect(screen.getByTestId('loadingOverlay')).toHaveClass('hidden');
  });
});
