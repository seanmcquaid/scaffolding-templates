import { renderHook, waitFor } from '@/utils/testing/reactTestingLibraryUtils';
import useUserPreferences from '@/hooks/useUserPreferences';

describe('useUserPreferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

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

    result.current.toggleEditMode();
    await waitFor(() => expect(result.current.isEditMode).toBe(true));

    result.current.toggleEditMode();
    await waitFor(() => expect(result.current.isEditMode).toBe(false));
  });

  it('updates theme when updateTheme is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    result.current.updateTheme('dark');
    await waitFor(() => expect(result.current.preferences.theme).toBe('dark'));
  });

  it('updates language when updateLanguage is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    result.current.updateLanguage('fr');
    await waitFor(() => expect(result.current.preferences.language).toBe('fr'));
  });

  it('toggles notifications when toggleNotifications is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    result.current.toggleNotifications();
    await waitFor(() =>
      expect(result.current.preferences.notifications).toBe(false),
    );

    result.current.toggleNotifications();
    await waitFor(() =>
      expect(result.current.preferences.notifications).toBe(true),
    );
  });

  it('toggles autoSave when toggleAutoSave is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    result.current.toggleAutoSave();
    await waitFor(() =>
      expect(result.current.preferences.autoSave).toBe(false),
    );

    result.current.toggleAutoSave();
    await waitFor(() => expect(result.current.preferences.autoSave).toBe(true));
  });

  it('resets preferences to defaults when resetToDefaults is called', async () => {
    const { result } = renderHook(() => useUserPreferences());

    result.current.updateTheme('dark');
    result.current.updateLanguage('es');
    result.current.toggleNotifications();
    result.current.toggleAutoSave();
    await waitFor(() => expect(result.current.preferences.theme).toBe('dark'));

    result.current.resetToDefaults();
    await waitFor(() =>
      expect(result.current.preferences).toEqual({
        theme: 'system',
        language: 'en',
        notifications: true,
        autoSave: true,
      }),
    );
  });
});
