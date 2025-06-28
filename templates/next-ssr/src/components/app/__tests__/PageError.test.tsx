import PageError from '../PageError';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageError', () => {
  describe('Title text', () => {
    it('Displays custom title if provided', () => {
      render(<PageError titleText="Custom title" />);
      expect(screen.getByText('Custom title')).toBeInTheDocument();
    });
    it('Displays default title if custom title is not provided', () => {
      render(<PageError />);
      expect(screen.getByText('PageError.title')).toBeInTheDocument();
    });
  });
  it('Displays error text if provided', () => {
    render(<PageError errorText="Error message" />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
