import { createRoutesStub } from 'react-router';
import ReactQueryPostPage from '..';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

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
