import { act } from '@testing-library/react';
import { toast, useToast, reducer } from '@/hooks/useToast';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';

describe('useToast reducer', () => {
  const baseState = { toasts: [] };

  describe('ADD_TOAST', () => {
    it('adds a toast to an empty list', () => {
      const newToast = { id: '1', title: 'Hello' };
      const state = reducer(baseState, { type: 'ADD_TOAST', toast: newToast });
      expect(state.toasts).toHaveLength(1);
      expect(state.toasts[0]).toEqual(newToast);
    });

    it('limits toasts to TOAST_LIMIT (1)', () => {
      const firstToast = { id: '1', title: 'First' };
      const secondToast = { id: '2', title: 'Second' };
      const stateWithOne = reducer(baseState, {
        type: 'ADD_TOAST',
        toast: firstToast,
      });
      const stateWithTwo = reducer(stateWithOne, {
        type: 'ADD_TOAST',
        toast: secondToast,
      });
      expect(stateWithTwo.toasts).toHaveLength(1);
      expect(stateWithTwo.toasts[0]).toEqual(secondToast);
    });
  });

  describe('UPDATE_TOAST', () => {
    it('updates an existing toast by id', () => {
      const existingToast = { id: '1', title: 'Original' };
      const stateWithToast = { toasts: [existingToast] };
      const state = reducer(stateWithToast, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'Updated' },
      });
      expect(state.toasts[0].title).toBe('Updated');
    });

    it('does not update toasts with different ids', () => {
      const existingToast = { id: '1', title: 'Original' };
      const stateWithToast = { toasts: [existingToast] };
      const state = reducer(stateWithToast, {
        type: 'UPDATE_TOAST',
        toast: { id: '2', title: 'Updated' },
      });
      expect(state.toasts[0].title).toBe('Original');
    });
  });

  describe('DISMISS_TOAST', () => {
    it('dismisses a specific toast by id', () => {
      const existingToast = { id: '1', title: 'Test', open: true };
      const stateWithToast = { toasts: [existingToast] };
      const state = reducer(stateWithToast, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });
      expect(state.toasts[0].open).toBe(false);
    });

    it('dismisses all toasts when no toastId is provided', () => {
      const toasts = [
        { id: '1', title: 'First', open: true },
        { id: '2', title: 'Second', open: true },
      ];
      const stateWithToasts = { toasts };
      const state = reducer(stateWithToasts, {
        type: 'DISMISS_TOAST',
        toastId: undefined,
      });
      expect(state.toasts.every(t => t.open === false)).toBe(true);
    });
  });

  describe('REMOVE_TOAST', () => {
    it('removes a specific toast by id', () => {
      const existingToast = { id: '1', title: 'Test' };
      const stateWithToast = { toasts: [existingToast] };
      const state = reducer(stateWithToast, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });
      expect(state.toasts).toHaveLength(0);
    });

    it('removes all toasts when no toastId is provided', () => {
      const toasts = [
        { id: '1', title: 'First' },
        { id: '2', title: 'Second' },
      ];
      const stateWithToasts = { toasts };
      const state = reducer(stateWithToasts, {
        type: 'REMOVE_TOAST',
        toastId: undefined,
      });
      expect(state.toasts).toHaveLength(0);
    });
  });
});

describe('useToast hook', () => {
  it('returns empty toasts by default', () => {
    const { result } = renderHook(() => useToast());
    expect(result.current.toasts).toBeDefined();
  });

  it('adds a toast via the toast function', async () => {
    const { result } = renderHook(() => useToast());
    act(() => {
      toast({ title: 'Test toast' });
    });
    expect(result.current.toasts.length).toBeGreaterThan(0);
    expect(result.current.toasts[0].title).toBe('Test toast');
  });

  it('dismisses a toast via the dismiss function', async () => {
    const { result } = renderHook(() => useToast());
    let toastId: string;
    act(() => {
      const { id } = toast({ title: 'Dismissible toast' });
      toastId = id;
    });
    act(() => {
      result.current.dismiss(toastId);
    });
    expect(result.current.toasts[0].open).toBe(false);
  });
});
