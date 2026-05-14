/* eslint-disable i18next/no-literal-string */
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import { Toaster } from '@/components/ui/Toaster';
import { useToast } from '@/hooks/useToast';

/**
 * Test component to trigger toast notifications
 */
const ToastTrigger = () => {
  const { toast } = useToast();

  return (
    <div>
      <button
        onClick={() =>
          toast({
            title: 'Success',
            description: 'This is a success toast',
          })
        }
      >
        Show Toast
      </button>
    </div>
  );
};

describe('Toaster Component', () => {
  it('renders without errors', () => {
    render(<Toaster />);
    // Should not throw
    expect(true).toBe(true);
  });

  it('displays a toast notification when triggered', async () => {
    render(<ToastTrigger />);

    const button = screen.getByText('Show Toast');
    await button.click();

    // Wait for the toast to appear
    await waitFor(() => {
      expect(screen.getByText('Success')).toBeInTheDocument();
    });
  });

  it('displays toast description when provided', async () => {
    render(<ToastTrigger />);

    const button = screen.getByText('Show Toast');
    await button.click();

    await waitFor(() => {
      expect(screen.getByText('This is a success toast')).toBeInTheDocument();
    });
  });

  it('renders the most recent toast when triggered rapidly', async () => {
    const MultiToastTrigger = () => {
      const { toast } = useToast();

      return (
        <div>
          <button
            onClick={() => {
              toast({ title: 'Toast 1' });
              toast({ title: 'Toast 2' });
            }}
          >
            Show Multiple Toasts
          </button>
        </div>
      );
    };

    render(<MultiToastTrigger />);

    const button = screen.getByText('Show Multiple Toasts');
    await button.click();

    await waitFor(() => {
      expect(screen.getByText('Toast 2')).toBeInTheDocument();
    });
  });
});
