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

  it('renders with the correct type attribute', () => {
    const { container } = render(<Input type="password" id="password" />);
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders with a custom className applied to the wrapper div', () => {
    render(<Input className="custom-class" />);
    expect(screen.getByRole('textbox').closest('div')).toHaveClass(
      'custom-class',
    );
  });

  it('renders with both label and errorMessage', () => {
    render(
      <Input
        id="username"
        label="Username"
        errorMessage="This field is required"
      />,
    );
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('renders with additional HTML input attributes', () => {
    render(<Input placeholder="Enter text" id="search" />);
    expect(screen.getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Enter text',
    );
  });
});
