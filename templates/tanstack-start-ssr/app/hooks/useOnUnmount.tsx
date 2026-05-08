import { useEffect, useRef } from 'react';

const useOnUnmount = (fn: () => void): void => {
  const ref = useRef(fn);
  useEffect(() => {
    const { current } = ref;
    return () => {
      current();
    };
  }, []);
};

export default useOnUnmount;
