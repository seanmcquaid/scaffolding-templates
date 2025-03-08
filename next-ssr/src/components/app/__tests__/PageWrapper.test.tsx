import { render, screen } from '@testing-library/react';
import PageWrapper from '../PageWrapper';

// Mock the PageError component
vi.mock('../PageError', () => ({
  default: ({
    errorText,
    titleText,
  }: {
    errorText?: string;
    titleText?: string;
  }) => (
    <div data-testid="page-error">
      {titleText && <div data-testid="error-title">{titleText}</div>}
      {errorText && <div data-testid="error-text">{errorText}</div>}
    </div>
  ),
}));

describe('PageWrapper', () => {
  it('renders children when not loading and no error', () => {
    render(
      <PageWrapper>
        <div data-testid="test-content">Test Content</div>
      </PageWrapper>,
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.queryByTestId('page-error')).not.toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument(); // No loading spinner
  });

  it('renders loading spinner when isLoading is true', () => {
    render(
      <PageWrapper isLoading>
        <div data-testid="test-content">Test Content</div>
      </PageWrapper>,
    );

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    expect(screen.getByRole('img')).toBeInTheDocument(); // Loading spinner
  });

  it('renders PageError when isError is true', () => {
    render(
      <PageWrapper isError errorText="Test Error" errorTitleText="Error Title">
        <div data-testid="test-content">Test Content</div>
      </PageWrapper>,
    );

    expect(screen.queryByTestId('test-content')).not.toBeInTheDocument();
    expect(screen.getByTestId('page-error')).toBeInTheDocument();
    expect(screen.getByTestId('error-title')).toHaveTextContent('Error Title');
    expect(screen.getByTestId('error-text')).toHaveTextContent('Test Error');
  });

  it('applies correct styling to wrapper', () => {
    render(
      <PageWrapper>
        <div>Test Content</div>
      </PageWrapper>,
    );

    const wrapper = screen.getByText('Test Content').parentElement;
    expect(wrapper).toHaveClass('flex');
    expect(wrapper).toHaveClass('h-full');
    expect(wrapper).toHaveClass('w-full');
    expect(wrapper).toHaveClass('flex-col');
    expect(wrapper).toHaveClass('p-8');
  });
});
