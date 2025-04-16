import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import PageWrapper from '../PageWrapper';

describe('PageWrapper', () => {
  it('Displays loading spinner when isLoading is true', () => {
    render(<PageWrapper isLoading />);
    expect(screen.getByTestId('loadingSpinner')).toBeInTheDocument();
  });
  it('Displays error message when isError is true', () => {
    render(
      <PageWrapper errorText="Error" errorTitleText="Error title" isError />,
    );
    expect(screen.getByText('Error')).toBeInTheDocument();
    expect(screen.getByText('Error title')).toBeInTheDocument();
  });
  it('Displays children when isLoading and isError are false', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<PageWrapper>Children</PageWrapper>);
    expect(screen.getByText('Children')).toBeInTheDocument();
  });
});
