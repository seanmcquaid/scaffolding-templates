import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('displays the label when the label prop is provided', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeInTheDocument();
  });

  it('does not display a label when the label prop is omitted', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.queryByText('Email Address')).not.toBeInTheDocument();
  });

  it('displays the error message when the errorMessage prop is provided', () => {
    render(<Input errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display an error message when the errorMessage prop is omitted', () => {
    render(<Input label="Name" />);
    expect(screen.queryByText('This field is required')).not.toBeInTheDocument();
  });

  it('fires onChangeText when the user types', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(<Input onChangeText={handleChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');
    expect(handleChange).toHaveBeenCalled();
  });

  it('reflects the controlled value', () => {
    render(<Input value="test value" onChangeText={jest.fn()} />);
    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });
});
