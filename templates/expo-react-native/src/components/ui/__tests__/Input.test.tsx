import { render, screen, fireEvent } from '@testing-library/react-native';
import { Input } from '@/components/ui/Input';

describe('Input', () => {
  it('displays the label when the label prop is provided', async () => {
    await render(<Input label="Email Address" />);
    expect(screen.getByText('Email Address')).toBeTruthy();
  });

  it('does not display a label when the label prop is omitted', async () => {
    await render(<Input placeholder="Enter text" />);
    expect(screen.queryByText('Email Address')).toBeNull();
  });

  it('displays the error message when the errorMessage prop is provided', async () => {
    await render(<Input errorMessage="This field is required" />);
    expect(screen.getByText('This field is required')).toBeTruthy();
  });

  it('does not display an error message when the errorMessage prop is omitted', async () => {
    await render(<Input label="Name" />);
    expect(screen.queryByText('This field is required')).toBeNull();
  });

  it('fires onChangeText when the user types', async () => {
    const handleChange = jest.fn();
    await render(<Input onChangeText={handleChange} placeholder="Type here" />);
    await fireEvent.changeText(screen.getByPlaceholderText('Type here'), 'hello');
    expect(handleChange).toHaveBeenCalledWith('hello');
  });

  it('reflects the controlled value', async () => {
    await render(<Input value="test value" onChangeText={jest.fn()} placeholder="Type here" />);
    expect(screen.getByDisplayValue('test value')).toBeTruthy();
  });
});
