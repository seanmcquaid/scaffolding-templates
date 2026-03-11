import { Input } from '@/components/ui/Input';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Input', () => {
  it('Displays error message if provided', () => {
    render(<Input errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });
  it('Does not render an error message when errorMessage is not provided', () => {
    render(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.queryByText('This is an error')).not.toBeInTheDocument();
  });
  it('Renders with a label when label prop is provided', () => {
    render(<Input label="Email" id="email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
  it('Re-renders without errors', () => {
    const { rerender } = render(<Input />);
    rerender(<Input />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
