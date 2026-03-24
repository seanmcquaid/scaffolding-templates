import { createRoutesStub } from 'react-router';
import HomePage from '..';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

const RouteStub = createRoutesStub([{ Component: HomePage, path: '/' }]);

describe('HomePage', () => {
  it('Renders the page title', () => {
    render(<RouteStub />);
    expect(screen.getByText('HomePage.title')).toBeInTheDocument();
  });

  it('Renders the sub-title', () => {
    render(<RouteStub />);
    expect(screen.getByText('HomePage.subTitle')).toBeInTheDocument();
  });

  it('Renders the react query link', () => {
    render(<RouteStub />);
    expect(screen.getByText('HomePage.reactQuery')).toBeInTheDocument();
  });

  it('Renders the react hook form zod link', () => {
    render(<RouteStub />);
    expect(screen.getByText('HomePage.reactHookFormZod')).toBeInTheDocument();
  });

  it('Renders the kitchen sink link', () => {
    render(<RouteStub />);
    expect(screen.getByText('HomePage.kitchenSink')).toBeInTheDocument();
  });

  it('Re-renders correctly with the same props', () => {
    const { rerender } = render(<RouteStub />);
    expect(screen.getByText('HomePage.title')).toBeInTheDocument();
    rerender(<RouteStub />);
    expect(screen.getByText('HomePage.title')).toBeInTheDocument();
  });
});
