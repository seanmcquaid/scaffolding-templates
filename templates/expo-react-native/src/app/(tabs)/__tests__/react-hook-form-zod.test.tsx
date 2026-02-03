/**
 * @jest-environment jsdom
 */
import ReactHookFormZodScreen from '../react-hook-form-zod';

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    control: {},
    formState: { errors: {} },
    handleSubmit: jest.fn(),
  })),
  Controller: ({ children }: { children: () => React.ReactNode }) => children(),
}));

// Mock @hookform/resolvers/zod
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(() => ({})),
}));

describe('ReactHookFormZodScreen', () => {
  it('exports ReactHookFormZodScreen component', () => {
    expect(ReactHookFormZodScreen).toBeDefined();
    expect(typeof ReactHookFormZodScreen).toBe('function');
  });

  it('renders ReactHookFormZodScreen component', () => {
    const result = ReactHookFormZodScreen({});
    expect(result).toBeDefined();
  });
});
