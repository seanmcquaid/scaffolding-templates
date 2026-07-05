import { toast, useToast } from '@/hooks/useToast';
import {
  renderHook,
  act,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';

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

  it('adds a toast to the state when toast is called', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Hello from hook' });
    });
    await waitFor(() =>
      expect(result.current.toasts.length).toBeGreaterThan(0),
    );
  });

  it('dismisses a toast by id when dismiss is called', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Dismissible toast' });
    });
    await waitFor(() => expect(result.current.toasts).toHaveLength(1));

    const toastId = result.current.toasts[0]?.id;

    act(() => {
      result.current.dismiss(toastId);
    });
    await waitFor(() =>
      expect(
        result.current.toasts.find(t => t.id === toastId),
      ).toBeUndefined(),
    );
  });

  it('dismisses all toasts when dismiss is called without an id', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast to dismiss' });
    });
    await waitFor(() => expect(result.current.toasts).toHaveLength(1));

    act(() => {
      result.current.dismiss();
    });
    await waitFor(() => expect(result.current.toasts).toHaveLength(0));
  });
});

describe('toast function', () => {
  it('returns id, update, and dismiss functions', () => {
    const toastResult = toast({ title: 'Test toast' });

    expect(toastResult.id).toBeDefined();
    expect(typeof toastResult.update).toBe('function');
    expect(typeof toastResult.dismiss).toBe('function');
  });

  it('dismiss function from toast return value dismisses the toast', async () => {
    const { result } = renderHook(() => useToast());

    let toastResult!: ReturnType<typeof result.current.toast>;
    act(() => {
      toastResult = result.current.toast({ title: 'Toast to dismiss' });
    });
    await waitFor(() => expect(result.current.toasts).toHaveLength(1));

    act(() => {
      toastResult.dismiss();
    });
    await waitFor(() =>
      expect(
        result.current.toasts.find(t => t.id === toastResult.id),
      ).toBeUndefined(),
    );
  });

  it('update function from toast return value updates the toast', async () => {
    const { result } = renderHook(() => useToast());

    let toastResult!: ReturnType<typeof result.current.toast>;
    act(() => {
      toastResult = result.current.toast({ title: 'Original title' });
    });
    await waitFor(() => expect(result.current.toasts).toHaveLength(1));

    act(() => {
      toastResult.update({ id: toastResult.id, title: 'Updated title' });
    });
    await waitFor(() =>
      expect(result.current.toasts[0]?.title).toBe('Updated title'),
    );
  });
});

describe('dismissing same toast multiple times', () => {
  it('dismissing the same toast twice does not cause errors', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      result.current.toast({ title: 'Toast to dismiss twice' });
    });
    await waitFor(() => expect(result.current.toasts).toHaveLength(1));

    const toastId = result.current.toasts[0]?.id;

    act(() => {
      result.current.dismiss(toastId);
      result.current.dismiss(toastId);
    });
    await waitFor(() =>
      expect(
        result.current.toasts.find(t => t.id === toastId),
      ).toBeUndefined(),
    );
  });
});
