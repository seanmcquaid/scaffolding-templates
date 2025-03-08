import { render, screen, fireEvent } from '@testing-library/react';
import PageError from '../PageError';

// Mock the router
const mockBack = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    back: mockBack,
  }),
}));

// Mock the translation hook
vi.mock('@/hooks/useAppTranslation', () => ({
  default: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'PageError.title': 'An error occurred',
        'PageError.goBack': 'Go Back',
      };
      return translations[key] || key;
    },
  }),
}));

describe('PageError', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default props using translations', () => {
    render(<PageError />);

    expect(screen.getByText('An error occurred')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('renders with custom title and error text', () => {
    render(
      <PageError titleText="Custom Error" errorText="Something went wrong" />,
    );

    expect(screen.getByText('Custom Error')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Go Back' })).toBeInTheDocument();
  });

  it('calls router.back when go back button is clicked', () => {
    render(<PageError />);

    const backButton = screen.getByRole('button', { name: 'Go Back' });
    fireEvent.click(backButton);

    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
