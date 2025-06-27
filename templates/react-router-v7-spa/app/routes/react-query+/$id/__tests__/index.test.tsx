import { createRoutesStub } from 'react-router';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import ReactQueryPostPage from '..';

describe('ReactQueryPostPage', () => {
  it('should render successfully', async () => {
    const RoutesStub = createRoutesStub([
      {
        // @ts-expect-error - mock params for testing
        Component: () => <ReactQueryPostPage params={{ id: '1' }} />,
        path: '/',
      },
    ]);
    render(<RoutesStub />);
    await waitFor(() => {
      expect(screen.getByTestId('postHeader')).toBeInTheDocument();
    });
  });
});
