import { ReactQueryPostPage } from '@/routes/react-query/$id/index.lazy';
import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

describe('ReactQueryPostPage', () => {
  it('should render successfully', async () => {
    const RoutesStub = createRoutesStub(
      [
        {
          component: () => <ReactQueryPostPage />,
          params: '1',
          path: '/react-query/$id/',
        },
      ],
      {
        initialPath: '/react-query/$id/',
      },
    );
    render(<RoutesStub />);
    await waitFor(() =>
      expect(screen.getByTestId('postHeader')).toBeInTheDocument(),
    );
  });
});
