import { act } from '@testing-library/react';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';
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

  it('toggles isEditMode when toggleEditMode is called', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleEditMode();
    });

    expect(result.current.isEditMode).toBe(true);

    act(() => {
      result.current.toggleEditMode();
    });

    expect(result.current.isEditMode).toBe(false);
  });

  it('updates theme when updateTheme is called', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateTheme('dark');
    });

    expect(result.current.preferences.theme).toBe('dark');
  });

  it('updates language when updateLanguage is called', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateLanguage('fr');
    });

    expect(result.current.preferences.language).toBe('fr');
  });

  it('toggles notifications when toggleNotifications is called', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleNotifications();
    });

    expect(result.current.preferences.notifications).toBe(false);

    act(() => {
      result.current.toggleNotifications();
    });

    expect(result.current.preferences.notifications).toBe(true);
  });

  it('toggles autoSave when toggleAutoSave is called', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.toggleAutoSave();
    });

    expect(result.current.preferences.autoSave).toBe(false);

    act(() => {
      result.current.toggleAutoSave();
    });

    expect(result.current.preferences.autoSave).toBe(true);
  });

  it('resets preferences to defaults when resetToDefaults is called', () => {
    const { result } = renderHook(() => useUserPreferences());

    act(() => {
      result.current.updateTheme('dark');
      result.current.updateLanguage('es');
      result.current.toggleNotifications();
      result.current.toggleAutoSave();
    });

    expect(result.current.preferences.theme).toBe('dark');

    act(() => {
      result.current.resetToDefaults();
    });

    expect(result.current.preferences).toEqual({
      theme: 'system',
      language: 'en',
      notifications: true,
      autoSave: true,
    });
  });
});
