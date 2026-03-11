import { createRoutesStub } from 'react-router';
import NotFoundPage from '..';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('NotFoundPage', () => {
  it('renders a link back to the home page', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: NotFoundPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('NotFoundPage.home')).toBeInTheDocument();
  });
  it('re-renders without errors', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: NotFoundPage,
        path: '/',
      },
    ]);
    const { rerender } = render(<RoutesStub />);
    rerender(<RoutesStub />);
    expect(screen.getByText('NotFoundPage.home')).toBeInTheDocument();
  });
});
