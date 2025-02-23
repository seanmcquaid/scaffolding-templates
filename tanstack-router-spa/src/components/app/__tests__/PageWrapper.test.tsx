import createRoutesStub from '@/utils/testing/createRoutesStub';
import PageWrapper from '@/components/app/PageWrapper';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageWrapper', () => {
  it('Displays loading spinner when isLoading is true', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        component: () => <PageWrapper isLoading />,
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
  it('Displays error message when isError is true', () => {
    const RoutesStub = createRoutesStub([
      {
        path: '/',
        component: () => (
          <PageWrapper isError errorText="Error" errorTitleText="Error title" />
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
        // eslint-disable-next-line i18next/no-literal-string
        component: () => <PageWrapper>Children</PageWrapper>,
      },
    ]);
    render(<RoutesStub />);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
