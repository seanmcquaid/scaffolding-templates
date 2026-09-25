import { renderHook } from '@testing-library/react';
import useOnUnmount from '@/hooks/useOnUnmount';

describe('useOnUnmount', () => {
  it('calls the passed in function when the component unmounts', () => {
    const fn = vi.fn();

    const result = renderHook(() =>
      useOnUnmount((): void => {
        fn();
      }),
    );
    result.unmount();

    expect(fn).toHaveBeenCalledWith();
  });
});
