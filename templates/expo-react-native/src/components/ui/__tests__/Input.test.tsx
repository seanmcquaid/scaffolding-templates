import { render, screen, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('displays the label when the label prop is provided', () => {
    render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeTruthy();
  });

  it('does not display a label when the label prop is omitted', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.queryByText('Email Address')).toBeNull();
  });

  it('displays the error message when the errorMessage prop is provided', () => {
    render(<Input errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('does not display an error message when the errorMessage prop is omitted', () => {
    render(<Input label="Name" />);
    expect(screen.queryByText('This field is required')).toBeNull();
  });

  it('fires onChangeText when the user types', () => {
    const handleChange = jest.fn();
    render(<Input onChangeText={handleChange} placeholder="Type here" />);
    fireEvent.changeText(screen.getByPlaceholderText('Type here'), 'hello');
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('reflects the controlled value', () => {
    render(<Input value="test value" onChangeText={jest.fn()} placeholder="Type here" />);
    expect(screen.getByDisplayValue('test value')).toBeTruthy();
  });
});
