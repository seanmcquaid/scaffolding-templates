import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('calls onPress when the button is pressed', async () => {
    const user = userEvent.setup();
    const handlePress = jest.fn();
    render(<Button onPress={handlePress}>Press me</Button>);
    await user.click(screen.getByText('Press me'));
    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when the button is disabled', async () => {
    const user = userEvent.setup();
    const handlePress = jest.fn();
    render(
      <Button disabled onPress={handlePress}>
        Disabled
      </Button>
    );
    await user.click(screen.getByText('Disabled'));
    expect(handlePress).not.toHaveBeenCalled();
  });

  it('renders as a disabled button element when the disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
