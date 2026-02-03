/**
 * @jest-environment jsdom
 */
// Import without executing the component
const kitchenSinkModule = require('../kitchen-sink');

// Mock postsService before importing the component
jest.mock('@/services/postsService', () => ({
  __esModule: true,
  default: {
    getPosts: jest.fn(() => Promise.resolve([])),
    getPost: jest.fn(() => Promise.resolve({})),
    deletePost: jest.fn(() => Promise.resolve()),
  },
}));

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

// Mock usehooks-ts
jest.mock('usehooks-ts', () => ({
  useLocalStorage: jest.fn(() => ['', jest.fn()]),
  useToggle: jest.fn(() => [false, jest.fn()]),
  useCounter: jest.fn(() => ({
    count: 0,
    increment: jest.fn(),
    decrement: jest.fn(),
    reset: jest.fn(),
    setCount: jest.fn(),
  })),
  useDebounceValue: jest.fn((value) => [value, jest.fn()]),
  useCopyToClipboard: jest.fn(() => ['', jest.fn()]),
}));

// Mock @tanstack/react-query
jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(() => ({
    data: [],
    isLoading: false,
    isError: false,
  })),
  queryOptions: jest.fn((options) => options),
}));

describe('KitchenSinkScreen', () => {
  it('exports KitchenSinkScreen component', () => {
    expect(kitchenSinkModule.default).toBeDefined();
    expect(typeof kitchenSinkModule.default).toBe('function');
  });
});
