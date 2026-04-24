import { Input } from '@/components/ui/Input';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Input', () => {
  it('Displays error message if provided', () => {
    render(<Input errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });

  it('Does not display error message when not provided', () => {
    render(<Input placeholder="Enter value" />);
    expect(screen.queryByText('This is an error')).not.toBeInTheDocument();
  });

  it('Renders label when provided', () => {
    render(<Input id="test-input" label="My Label" />);
    expect(screen.getByLabelText('My Label')).toBeInTheDocument();
  });

  it('Renders with specified type', () => {
    const { container } = render(<Input type="password" />);
    expect(container.querySelector('input')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('Applies custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
