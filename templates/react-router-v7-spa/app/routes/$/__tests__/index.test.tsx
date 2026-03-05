import { createRoutesStub } from 'react-router';
import NotFoundPage from '..';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('NotFoundPage', () => {
  it('renders the not found heading', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: NotFoundPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('NotFoundPage.notFound')).toBeInTheDocument();
  });

  it('renders the message asking to try a different route', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: NotFoundPage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(
      screen.getByText('NotFoundPage.pleaseTryADifferentRoute'),
    ).toBeInTheDocument();
  });

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
});
