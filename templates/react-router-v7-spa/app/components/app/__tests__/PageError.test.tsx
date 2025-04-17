import { createRoutesStub } from 'react-router';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import PageError from '../PageError';

describe('PageError', () => {
  describe('Title text', () => {
    it('Displays custom title if provided', () => {
      const RouteStub = createRoutesStub([
        { Component: () => <PageError titleText="Custom title" />, path: '/' },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('Custom title')).toBeInTheDocument();
    });
    it('Displays default title if custom title is not provided', () => {
      const RouteStub = createRoutesStub([
        { Component: () => <PageError />, path: '/' },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('PageError.title')).toBeInTheDocument();
    });
  });
  it('Displays error text if provided', () => {
    const RouteStub = createRoutesStub([
      { Component: () => <PageError errorText="Error message" />, path: '/' },
    ]);
    render(<RouteStub />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
