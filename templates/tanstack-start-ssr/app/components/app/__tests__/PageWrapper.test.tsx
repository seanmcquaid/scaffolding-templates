import PageWrapper from '@/components/app/PageWrapper';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import { render, screen, waitFor } from '@/utils/testing/reactTestingLibraryUtils';

describe('PageWrapper', () => {
  it('Displays loading spinner when isLoading is true', async () => {
    const RoutesStub = createRoutesStub([
      {
        component: () => <PageWrapper isLoading />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument());
  });
  it('Displays error message when isError is true', async () => {
    const RoutesStub = createRoutesStub([
      {
        component: () => (
          <PageWrapper errorText="Error" errorTitleText="Error title" isError />
        ),
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => expect(screen.getByText('Error')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Error title')).toBeInTheDocument());
  });
  it('Displays children when isLoading and isError are false', async () => {
    const RoutesStub = createRoutesStub([
      {
        component: () => <PageWrapper>Children</PageWrapper>,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => expect(screen.getByText('Children')).toBeInTheDocument());
  });
});
