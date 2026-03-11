import LoadingSpinner from '../LoadingSpinner';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('LoadingSpinner', () => {
  it('renders the loading spinner', () => {
    render(<LoadingSpinner />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
});
