import HomePage from '../page';
import { render, screen } from '@/utils/testing/reactTestingLibraryUtils';

vi.mock('@/i18n/getAppFixedT', () => ({
  default: () =>
    Promise.resolve({
      t: (key: string) => key,
      i18n: {},
    }),
}));

describe('HomePage', () => {
  it('renders the home page with navigation links', async () => {
    render(await HomePage());
    expect(screen.getByText('HomePage.title')).toBeInTheDocument();
    expect(screen.getByText('HomePage.subTitle')).toBeInTheDocument();
  });

  it('renders the react query navigation link', async () => {
    render(await HomePage());
    expect(
      screen.getByRole('link', { name: 'HomePage.reactQuery' }),
    ).toBeInTheDocument();
  });

  it('renders the react hook form navigation link', async () => {
    render(await HomePage());
    expect(
      screen.getByRole('link', { name: 'HomePage.reactHookFormZod' }),
    ).toBeInTheDocument();
  });

  it('renders the kitchen sink navigation link', async () => {
    render(await HomePage());
    expect(
      screen.getByRole('link', { name: 'HomePage.kitchenSink' }),
    ).toBeInTheDocument();
  });
});
