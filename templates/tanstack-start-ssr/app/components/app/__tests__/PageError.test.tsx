import PageError from '@/components/app/PageError';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageError', () => {
  describe('Title text', () => {
    it('Displays custom title if provided', () => {
      const RouteStub = createRoutesStub([
        { component: () => <PageError titleText="Custom title" />, path: '/' },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('Custom title')).toBeInTheDocument();
    });
    it('Displays default title if custom title is not provided', () => {
      const RouteStub = createRoutesStub([
        { component: () => <PageError />, path: '/' },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('PageError.title')).toBeInTheDocument();
    });
  });
  it('Displays error text if provided', () => {
    const RouteStub = createRoutesStub([
      { component: () => <PageError errorText="Error message" />, path: '/' },
    ]);
    render(<RouteStub />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
