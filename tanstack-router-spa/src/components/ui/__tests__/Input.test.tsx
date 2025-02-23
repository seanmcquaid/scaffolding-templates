import { Input } from '@/components/ui/Input';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

describe('Input', () => {
  it('Displays error message if provided', () => {
    render(<Input errorMessage="This is an error" />);
    expect(screen.getByText('This is an error')).toBeInTheDocument();
  });
});
