import { reducer, toast, useToast } from '@/hooks/useToast';
import { renderHook, act } from '@/utils/testing/reactTestingLibraryUtils';

describe('useToast', () => {
  describe('reducer', () => {
    it('ADD_TOAST adds a toast to the state', () => {
      const initialState = { toasts: [] };
      const newToast = { id: '1', title: 'Test toast', open: true };

      const result = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: newToast,
      });

      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0]).toEqual(newToast);
    });

    it('ADD_TOAST respects TOAST_LIMIT and keeps only the latest toast', () => {
      const existingToast = { id: '1', title: 'Existing toast', open: true };
      const initialState = { toasts: [existingToast] };
      const newToast = { id: '2', title: 'New toast', open: true };

      const result = reducer(initialState, {
        type: 'ADD_TOAST',
        toast: newToast,
      });

      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0]).toEqual(newToast);
    });

    it('UPDATE_TOAST updates a toast by id', () => {
      const existingToast = { id: '1', title: 'Original title', open: true };
      const initialState = { toasts: [existingToast] };

      const result = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated title' },
      });

      expect(result.toasts[0].title).toBe('Updated title');
    });

    it('UPDATE_TOAST does not update toasts with a different id', () => {
      const existingToast = { id: '1', title: 'Original title', open: true };
      const initialState = { toasts: [existingToast] };

      const result = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '2', title: 'Updated title' },
      });

      expect(result.toasts[0].title).toBe('Original title');
    });

    it('DISMISS_TOAST with a toastId closes the specific toast', () => {
      const existingToast = { id: '1', title: 'Test toast', open: true };
      const initialState = { toasts: [existingToast] };

      const result = reducer(initialState, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });

      expect(result.toasts[0].open).toBe(false);
    });

    it('DISMISS_TOAST without a toastId closes all toasts', () => {
      const initialState = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true },
        ],
      };

      const result = reducer(initialState, {
        type: 'DISMISS_TOAST',
      });

      expect(result.toasts.every(t => t.open === false)).toBe(true);
    });

    it('REMOVE_TOAST with a toastId removes the specific toast', () => {
      const initialState = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true },
        ],
      };

      const result = reducer(initialState, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });

      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0].id).toBe('2');
    });

    it('REMOVE_TOAST without a toastId removes all toasts', () => {
      const initialState = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true },
        ],
      };

      const result = reducer(initialState, {
        type: 'REMOVE_TOAST',
      });

      expect(result.toasts).toHaveLength(0);
    });
  });

  describe('useToast hook', () => {
    it('returns empty toasts array initially', () => {
      const { result } = renderHook(() => useToast());
      expect(result.current.toasts).toBeDefined();
    });

    it('provides dismiss and toast functions', () => {
      const { result } = renderHook(() => useToast());
      expect(typeof result.current.dismiss).toBe('function');
      expect(typeof result.current.toast).toBe('function');
    });

    it('adds a toast to the state when toast is called', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'Hello from hook' });
      });

      expect(result.current.toasts.length).toBeGreaterThan(0);
    });

    it('dismisses a toast by id when dismiss is called', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'Dismissible toast' });
      });

      const toastId = result.current.toasts[0]?.id;

      act(() => {
        result.current.dismiss(toastId);
      });

      expect(result.current.toasts[0]?.open).toBe(false);
    });

    it('dismisses all toasts when dismiss is called without an id', () => {
      const { result } = renderHook(() => useToast());

      act(() => {
        result.current.toast({ title: 'Toast to dismiss' });
      });

      act(() => {
        result.current.dismiss();
      });

      expect(result.current.toasts.every(t => t.open === false)).toBe(true);
    });
  });

  describe('toast function', () => {
    it('returns id, update, and dismiss functions', () => {
      let toastResult: ReturnType<typeof toast>;

      act(() => {
        toastResult = toast({ title: 'Test toast' });
      });

      expect(toastResult!.id).toBeDefined();
      expect(typeof toastResult!.update).toBe('function');
      expect(typeof toastResult!.dismiss).toBe('function');
    });

    it('dismiss function from toast return value dismisses the toast', () => {
      const { result } = renderHook(() => useToast());

      let toastResult: ReturnType<typeof toast>;

      act(() => {
        toastResult = result.current.toast({ title: 'Toast to dismiss' });
      });

      act(() => {
        toastResult!.dismiss();
      });

      expect(result.current.toasts[0]?.open).toBe(false);
    });

    it('update function from toast return value updates the toast', () => {
      const { result } = renderHook(() => useToast());

      let toastResult: ReturnType<typeof toast>;

      act(() => {
        toastResult = result.current.toast({ title: 'Original title' });
      });

      act(() => {
        toastResult!.update({ id: toastResult!.id, title: 'Updated title' });
      });

      expect(result.current.toasts[0]?.title).toBe('Updated title');
    });
  });
});

describe('addToRemoveQueue', () => {
  it('dismissing the same toast twice does not add it to queue twice', () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast to dismiss twice' });
    });

    const toastId = result.current.toasts[0]?.id;

    act(() => {
      result.current.dismiss(toastId);
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0]?.open).toBe(false);
  });
});

describe('setTimeout callback in addToRemoveQueue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('removes toast from state after the remove delay', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Timed toast' });
    });

    const toastId = result.current.toasts[0]?.id;

    act(() => {
      result.current.dismiss(toastId);
    });

    expect(result.current.toasts[0]?.open).toBe(false);

    act(() => {
      vi.advanceTimersByTime(1000001);
    });

    expect(result.current.toasts.find(t => t.id === toastId)).toBeUndefined();
  });
});
