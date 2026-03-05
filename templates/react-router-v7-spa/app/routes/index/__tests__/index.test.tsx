import { createRoutesStub } from 'react-router';
import HomePage from '..';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('HomePage', () => {
  it('renders the page title', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: HomePage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('HomePage.title')).toBeInTheDocument();
  });

  it('renders the page subtitle', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: HomePage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('HomePage.subTitle')).toBeInTheDocument();
  });

  it('renders link buttons for each route', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: HomePage,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('HomePage.reactQuery')).toBeInTheDocument();
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeInTheDocument();
    expect(screen.getByText('HomePage.kitchenSink')).toBeInTheDocument();
  });
});
