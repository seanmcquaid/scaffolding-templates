import ErrorBoundary from '../error';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('ErrorBoundary', () => {
  it('renders the error page with the crash error text', () => {
    render(<ErrorBoundary />);
    expect(screen.getByText('There was an app crash!')).toBeInTheDocument();
  });
});
