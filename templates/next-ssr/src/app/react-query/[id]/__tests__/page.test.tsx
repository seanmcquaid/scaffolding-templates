import { useParams } from 'next/navigation';
import type { MockedFunction } from 'vitest';
import ReactQueryPostPage from '../page';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

vi.mock('next/navigation', async () => {
  return {
    ...(await vi.importActual('next-router-mock')),
    useParams: vi.fn(),
  };
});

const mockUseParams = useParams as MockedFunction<typeof useParams>;

describe('ReactQueryPostPage', () => {
  it('should render successfully', async () => {
    mockUseParams.mockReturnValue({ id: '1' });
    render(<ReactQueryPostPage />);
    await waitFor(() => {
      expect(screen.getByTestId('postHeader')).toBeInTheDocument();
    });
  });
});
