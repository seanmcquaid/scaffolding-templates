import userEvent from '@testing-library/user-event';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders as a native button element by default', () => {
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button').tagName).toBe('BUTTON');
  });

  it('renders as the child element when asChild is true', () => {
    render(
      <Button asChild>
        {/* eslint-disable-next-line i18next/no-literal-string */}
        <a href="/test">Link button</a>
      </Button>,
    );
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(screen.getByRole('link').tagName).toBe('A');
  });

  it('calls onClick handler when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    // eslint-disable-next-line i18next/no-literal-string
    render(<Button onClick={handleClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(
      // eslint-disable-next-line i18next/no-literal-string
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>,
    );
    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
