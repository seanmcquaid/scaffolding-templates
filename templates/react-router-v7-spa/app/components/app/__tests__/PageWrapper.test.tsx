import { createRoutesStub } from 'react-router';
import PageWrapper from '@/components/app/PageWrapper';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageWrapper', () => {
  it('Displays loading spinner when isLoading is true', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: () => <PageWrapper isLoading />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
  it('Displays error message when isError is true', () => {
    const RoutesStub = createRoutesStub([
      {
        Component: () => (
          <PageWrapper errorText="Error" errorTitleText="Error title" isError />
        ),
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Error title')).toBeInTheDocument();
  });
  it('Displays children when isLoading and isError are false', () => {
    const RoutesStub = createRoutesStub([
      {
        // eslint-disable-next-line i18next/no-literal-string
        Component: () => <PageWrapper>Children</PageWrapper>,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
