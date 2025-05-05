import PageError from '@/components/app/PageError';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import { render, screen, waitFor } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageError', () => {
  describe('Title text', () => {
    it('Displays custom title if provided', async () => {
      const RouteStub = createRoutesStub([
        { component: () => <PageError titleText="Custom title" />, path: '/' },
      ]);
      render(<RouteStub />);
      await waitFor(() =>
        expect(screen.getByText('Custom title')).toBeInTheDocument(),
      );
    });
    it('Displays default title if custom title is not provided', async () => {
      const RouteStub = createRoutesStub([
        { component: () => <PageError />, path: '/' },
      ]);
      render(<RouteStub />);
      await waitFor(() =>
        expect(screen.getByText('PageError.title')).toBeInTheDocument(),
      );
    });
  });
  it('Displays error text if provided', async () => {
    const RouteStub = createRoutesStub([
      { component: () => <PageError errorText="Error message" />, path: '/' },
    ]);
    render(<RouteStub />);
    await waitFor(() =>
      expect(screen.getByText('Error message')).toBeInTheDocument(),
    );
  });
});
