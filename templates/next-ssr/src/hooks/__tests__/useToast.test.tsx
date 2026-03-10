import { act } from '@testing-library/react';
import { reducer, ToastActions, useToast, toast } from '@/hooks/useToast';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';

describe('reducer', () => {
  const baseState = { toasts: [] };

  const makeToast = (id: string) => ({
    id,
    title: `Toast ${id}`,
    open: true,
  });

  describe('ADD_TOAST', () => {
    it('adds a toast to an empty state', () => {
      const newToast = makeToast('1');
      const nextState = reducer(baseState, {
        type: ToastActions.ADD_TOAST,
        toast: newToast,
      });
      expect(nextState.toasts).toHaveLength(1);
      expect(nextState.toasts[0]).toEqual(newToast);
    });

    it('limits toasts to TOAST_LIMIT (1)', () => {
      const stateWithToast = { toasts: [makeToast('1')] };
      const nextState = reducer(stateWithToast, {
        type: ToastActions.ADD_TOAST,
        toast: makeToast('2'),
      });
      expect(nextState.toasts).toHaveLength(1);
      expect(nextState.toasts[0].id).toBe('2');
    });
  });

  describe('UPDATE_TOAST', () => {
    it('updates an existing toast by id', () => {
      const stateWithToast = { toasts: [makeToast('1')] };
      const nextState = reducer(stateWithToast, {
        type: ToastActions.UPDATE_TOAST,
        toast: { id: '1', title: 'Updated Title' },
      });
      expect(nextState.toasts[0].title).toBe('Updated Title');
    });

    it('does not modify a toast with a different id', () => {
      const stateWithToast = { toasts: [makeToast('1')] };
      const nextState = reducer(stateWithToast, {
        type: ToastActions.UPDATE_TOAST,
        toast: { id: '99', title: 'Updated Title' },
      });
      expect(nextState.toasts[0].title).toBe('Toast 1');
    });
  });

  describe('DISMISS_TOAST', () => {
    it('sets open to false for a specific toast', () => {
      const stateWithToast = { toasts: [makeToast('1')] };
      const nextState = reducer(stateWithToast, {
        type: ToastActions.DISMISS_TOAST,
        toastId: '1',
      });
      expect(nextState.toasts[0].open).toBe(false);
    });

    it('sets open to false for all toasts when no id is provided', () => {
      const stateWithToasts = {
        toasts: [makeToast('1'), makeToast('2')],
      };
      const nextState = reducer(stateWithToasts, {
        type: ToastActions.DISMISS_TOAST,
      });
      expect(nextState.toasts.every(t => t.open === false)).toBe(true);
    });
  });

  describe('REMOVE_TOAST', () => {
    it('removes a specific toast by id', () => {
      const stateWithToast = { toasts: [makeToast('1')] };
      const nextState = reducer(stateWithToast, {
        type: ToastActions.REMOVE_TOAST,
        toastId: '1',
      });
      expect(nextState.toasts).toHaveLength(0);
    });

    it('removes all toasts when no id is provided', () => {
      const stateWithToasts = {
        toasts: [makeToast('1'), makeToast('2')],
      };
      const nextState = reducer(stateWithToasts, {
        type: ToastActions.REMOVE_TOAST,
      });
      expect(nextState.toasts).toHaveLength(0);
    });
  });
});

describe('useToast', () => {
  it('returns a toast function and empty toasts array initially', () => {
    const { result } = renderHook(() => useToast());
    expect(typeof result.current.toast).toBe('function');
    expect(typeof result.current.dismiss).toBe('function');
  });

  it('adds a toast when toast() is called', async () => {
    const { result } = renderHook(() => useToast());

    act(() => {
      toast({ title: 'Hello Toast' });
    });

    expect(result.current.toasts.some(t => t.title === 'Hello Toast')).toBe(
      true,
    );
  });

  it('dismisses a toast when dismiss() is called with its id', async () => {
    const { result } = renderHook(() => useToast());

    let toastId: string;
    act(() => {
      const { id } = toast({ title: 'Dismiss Me' });
      toastId = id;
    });

    act(() => {
      result.current.dismiss(toastId);
    });

    const dismissedToast = result.current.toasts.find(t => t.id === toastId);
    expect(dismissedToast?.open).toBe(false);
  });
});
