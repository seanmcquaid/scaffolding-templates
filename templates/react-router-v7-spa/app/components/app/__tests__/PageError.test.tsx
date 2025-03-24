import { createRoutesStub } from 'react-router';
import PageError from '../PageError';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageError', () => {
  describe('Title text', () => {
    it('Displays custom title if provided', () => {
      const RouteStub = createRoutesStub([
        { path: '/', Component: () => <PageError titleText="Custom title" /> },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('Custom title')).toBeInTheDocument();
    });
    it('Displays default title if custom title is not provided', () => {
      const RouteStub = createRoutesStub([
        { path: '/', Component: () => <PageError /> },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('PageError.title')).toBeInTheDocument();
    });
  });
  it('Displays error text if provided', () => {
    const RouteStub = createRoutesStub([
      { path: '/', Component: () => <PageError errorText="Error message" /> },
    ]);
    render(<RouteStub />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
