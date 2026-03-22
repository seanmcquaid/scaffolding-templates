import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('calls onPress when the button is pressed', () => {
    const handlePress = jest.fn();
    render(<Button onPress={handlePress}>Press me</Button>);
    fireEvent.press(screen.getByText('Press me'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when the button is disabled', () => {
    const handlePress = jest.fn();
    render(
      <Button disabled onPress={handlePress}>
        Disabled
      </Button>
    );
    fireEvent.press(screen.getByText('Disabled'));
    expect(handlePress).not.toHaveBeenCalled();
  });
});
