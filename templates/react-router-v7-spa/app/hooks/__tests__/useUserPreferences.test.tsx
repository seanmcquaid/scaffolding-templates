import {
  act,
  renderHook,
  waitFor,
} from '@/utils/testing/reactTestingLibraryUtils';
import useUserPreferences from '@/hooks/useUserPreferences';

describe('useUserPreferences', () => {
  it('returns default preferences on initial render', () => {
    const { result } = renderHook(() => useUserPreferences());

    expect(result.current.preferences).toEqual({
      theme: 'system',
      language: 'en',
      notifications: true,
      autoSave: true,
    });
  });

  it('starts with isEditMode set to false', () => {
    const { result } = renderHook(() => useUserPreferences());

    expect(result.current.isEditMode).toBe(false);
  });

  it('toggles isEditMode when toggleEditMode is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleEditMode();
    });
    await waitFor(() => expect(result.current.isEditMode).toBe(true));

    act(() => {
      result.current.toggleEditMode();
    });
    await waitFor(() => expect(result.current.isEditMode).toBe(false));
  });

  it('updates theme when updateTheme is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateTheme('dark');
    });
    await waitFor(() => expect(result.current.preferences.theme).toBe('dark'));
  });

  it('updates language when updateLanguage is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateLanguage('fr');
    });
    await waitFor(() => expect(result.current.preferences.language).toBe('fr'));
  });

  it('toggles notifications when toggleNotifications is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleNotifications();
    });
    await waitFor(() =>
      expect(result.current.preferences.notifications).toBe(false),
    );

    act(() => {
      result.current.toggleNotifications();
    });
    await waitFor(() =>
      expect(result.current.preferences.notifications).toBe(true),
    );
  });

  it('toggles autoSave when toggleAutoSave is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleAutoSave();
    });
    await waitFor(() =>
      expect(result.current.preferences.autoSave).toBe(false),
    );

    act(() => {
      result.current.toggleAutoSave();
    });
    await waitFor(() => expect(result.current.preferences.autoSave).toBe(true));
  });

  it('resets preferences to defaults when resetToDefaults is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateTheme('dark');
      result.current.updateLanguage('es');
      result.current.toggleNotifications();
      result.current.toggleAutoSave();
    });
    await waitFor(() => expect(result.current.preferences.theme).toBe('dark'));

    act(() => {
      result.current.resetToDefaults();
    });
    await waitFor(() =>
      expect(result.current.preferences).toEqual({
        theme: 'system',
        language: 'en',
        notifications: true,
        autoSave: true,
      }),
    );
  });

  it('re-renders and returns stable references for callbacks', async () => {
    const { result, rerender } = renderHook(() => useUserPreferences());
    const initialUpdateTheme = result.current.updateTheme;

    rerender();

    await waitFor(() => {
      expect(result.current.updateTheme).toBe(initialUpdateTheme);
    });
  });
});
