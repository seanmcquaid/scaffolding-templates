import { reducer } from '@/hooks/useToast';

describe('useToast', () => {
  describe('reducer', () => {
    it('ADD_TOAST adds a toast to the state', () => {
      const initialState = { toasts: [] };
      const newToast = { id: '1', title: 'Test Toast' };
      const result = reducer(initialState, { type: 'ADD_TOAST', toast: newToast });
      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0]).toEqual(newToast);
    });

    it('ADD_TOAST respects the TOAST_LIMIT of 1', () => {
      const initialState = { toasts: [{ id: '1', title: 'Toast 1' }] };
      const newToast = { id: '2', title: 'Toast 2' };
      const result = reducer(initialState, { type: 'ADD_TOAST', toast: newToast });
      expect(result.toasts).toHaveLength(1);
      expect(result.toasts[0].id).toBe('2');
    });

    it('UPDATE_TOAST updates an existing toast by id', () => {
      const initialState = { toasts: [{ id: '1', title: 'Old Title' }] };
      const result = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '1', title: 'New Title' },
      });
      expect(result.toasts[0].title).toBe('New Title');
    });

    it('UPDATE_TOAST does not modify toasts with non-matching ids', () => {
      const initialState = { toasts: [{ id: '1', title: 'Old Title' }] };
      const result = reducer(initialState, {
        type: 'UPDATE_TOAST',
        toast: { id: '2', title: 'New Title' },
      });
      expect(result.toasts[0].title).toBe('Old Title');
    });

    it('DISMISS_TOAST with a toastId sets that toast to closed', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Toast', open: true }],
      };
      const result = reducer(initialState, {
        type: 'DISMISS_TOAST',
        toastId: '1',
      });
      expect(result.toasts[0].open).toBe(false);
    });

    it('DISMISS_TOAST without a toastId dismisses all toasts', () => {
      const initialState = {
        toasts: [
          { id: '1', title: 'Toast 1', open: true },
          { id: '2', title: 'Toast 2', open: true },
        ],
      };
      const result = reducer(initialState, { type: 'DISMISS_TOAST' });
      expect(result.toasts.every(t => t.open === false)).toBe(true);
    });

    it('REMOVE_TOAST with a toastId removes that toast', () => {
      const initialState = { toasts: [{ id: '1', title: 'Toast' }] };
      const result = reducer(initialState, {
        type: 'REMOVE_TOAST',
        toastId: '1',
      });
      expect(result.toasts).toHaveLength(0);
    });

    it('REMOVE_TOAST without a toastId removes all toasts', () => {
      const initialState = {
        toasts: [{ id: '1', title: 'Toast 1' }, { id: '2', title: 'Toast 2' }],
      };
      const result = reducer(initialState, { type: 'REMOVE_TOAST' });
      expect(result.toasts).toHaveLength(0);
    });
  });
});
