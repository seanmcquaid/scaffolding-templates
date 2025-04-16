import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import { createRoutesStub } from 'react-router';
import PageWrapper from '../PageWrapper';

describe('PageWrapper', () => {
  it('Displays loading spinner when isLoading is true', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <PageWrapper isLoading />,
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
  it('Displays error message when isError is true', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => (
          <PageWrapper errorText="Error" errorTitleText="Error title" isError />
        ),
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Error title')).toBeInTheDocument();
  });
  it('Displays children when isLoading and isError are false', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        Component: () => <PageWrapper>Children</PageWrapper>,
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
