import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('calls onPress when the button is pressed', async () => {
    const handlePress = jest.fn();
    // eslint-disable-next-line i18next/no-literal-string
    await render(<Button onPress={handlePress}>Press me</Button>);
    await fireEvent.press(screen.getByText('Press me'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when the button is disabled', async () => {
    const handlePress = jest.fn();
    await render(
      // eslint-disable-next-line i18next/no-literal-string
      <Button disabled onPress={handlePress}>
        Disabled
      </Button>
    );
    await fireEvent.press(screen.getByText('Disabled'));
    expect(handlePress).not.toHaveBeenCalled();
  });
});
