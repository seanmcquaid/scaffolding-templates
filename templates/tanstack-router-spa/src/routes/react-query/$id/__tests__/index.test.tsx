import createRoutesStub from '@/utils/testing/createRoutesStub';
import {
  render,
  screen,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import { ReactQueryPostPage } from '@/routes/react-query/$id/index.lazy';

describe('ReactQueryPostPage', () => {
  it('should render successfully', async () => {
    const RoutesStub = createRoutesStub(
      [
        {
          path: '/react-query/$id/',
          component: () => <ReactQueryPostPage />,
          params: '1',
        },
      ],
      {
        initialPath: '/react-query/$id/',
      },
    );
    render(<RoutesStub />);
    await waitFor(async () =>
      expect(
        await screen.findByRole('heading', {
          level: 1,
        }),
      ).toBeInTheDocument(),
    );
  });
});
