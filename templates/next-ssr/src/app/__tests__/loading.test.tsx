import Loading from '../loading';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Loading', () => {
  it('renders the loading overlay', () => {
    render(<Loading />);
    expect(screen.getByTestId('loadingOverlay')).toBeInTheDocument();
  });
});
