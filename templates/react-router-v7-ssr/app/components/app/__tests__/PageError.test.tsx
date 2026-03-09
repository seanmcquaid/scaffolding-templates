import userEvent from '@testing-library/user-event';
import { createRoutesStub } from 'react-router';
import PageError from '@/components/app/PageError';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

const mockNavigate = vi.fn();

vi.mock('react-router', async importOriginal => {
  const actual = await importOriginal<typeof import('react-router')>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('PageError', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  describe('Title text', () => {
    it('Displays custom title if provided', () => {
      const RouteStub = createRoutesStub([
        { Component: () => <PageError titleText="Custom title" />, path: '/' },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('Custom title')).toBeInTheDocument();
    });
    it('Displays default title if custom title is not provided', () => {
      const RouteStub = createRoutesStub([
        { Component: () => <PageError />, path: '/' },
      ]);
      render(<RouteStub />);
      expect(screen.getByText('PageError.title')).toBeInTheDocument();
    });
  });
  it('Displays error text if provided', () => {
    const RouteStub = createRoutesStub([
      { Component: () => <PageError errorText="Error message" />, path: '/' },
    ]);
    render(<RouteStub />);
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
  it('Does not display error paragraph when errorText is not provided', () => {
    const RouteStub = createRoutesStub([
      { Component: () => <PageError />, path: '/' },
    ]);
    render(<RouteStub />);
    expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
  });
  it('Navigates back when the go back button is clicked', async () => {
    const user = userEvent.setup();
    const RouteStub = createRoutesStub([
      { Component: () => <PageError />, path: '/' },
    ]);
    render(<RouteStub />);
    await user.click(screen.getByText('PageError.goBack'));
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
