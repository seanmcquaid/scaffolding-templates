import { render, screen } from '@testing-library/react-native';
import ReactHookFormZodScreen from '../react-hook-form-zod';

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: {},
    formState: { errors: {} },
    handleSubmit: jest.fn(),
  })),
  Controller: ({ render: renderProp }: { render: (props: unknown) => React.ReactNode }) => {
    // Controller uses render prop pattern
    const mockFieldProps = {
      field: {
        onChange: jest.fn(),
        onBlur: jest.fn(),
        value: '',
        name: 'test',
      },
      fieldState: {},
      formState: {},
    };
    return renderProp(mockFieldProps);
  },
}));

// Mock @hookform/resolvers/zod
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => ({})),
}));

describe('ReactHookFormZodScreen', () => {
  it('renders react hook form screen title', () => {
    render(<ReactHookFormZodScreen />);
    expect(screen.getByText('ReactHookFormZodPage.title')).toBeTruthy();
  });
});
