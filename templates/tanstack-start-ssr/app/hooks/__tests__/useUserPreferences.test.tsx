import { act } from '@testing-library/react';
import useUserPreferences from '@/hooks/useUserPreferences';
import { renderHook } from '@/utils/testing/reactTestingLibraryUtils';

describe('useUserPreferences', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns default preferences on first render', () => {
    const { result } = renderHook(() => useUserPreferences());
    expect(result.current.preferences.theme).toBe('system');
    expect(result.current.preferences.language).toBe('en');
    expect(result.current.preferences.notifications).toBe(true);
    expect(result.current.preferences.autoSave).toBe(true);
  });

  it('isEditMode is false by default', () => {
    const { result } = renderHook(() => useUserPreferences());
    expect(result.current.isEditMode).toBe(false);
  });

  it('toggleEditMode toggles the edit mode', () => {
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

  it('updateTheme updates the theme preference', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.updateTheme('dark');
    });
    expect(result.current.preferences.theme).toBe('dark');
  });

  it('updateLanguage updates the language preference', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.updateLanguage('es');
    });
    expect(result.current.preferences.language).toBe('es');
  });

  it('toggleNotifications toggles the notifications preference', () => {
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

  it('toggleAutoSave toggles the autoSave preference', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.toggleAutoSave();
    });
    expect(result.current.preferences.autoSave).toBe(false);
  });

  it('resetToDefaults resets all preferences to defaults', () => {
    const { result } = renderHook(() => useUserPreferences());
    act(() => {
      result.current.updateTheme('dark');
      result.current.updateLanguage('fr');
      result.current.toggleNotifications();
    });
    act(() => {
      result.current.resetToDefaults();
    });
    expect(result.current.preferences.theme).toBe('system');
    expect(result.current.preferences.language).toBe('en');
    expect(result.current.preferences.notifications).toBe(true);
    expect(result.current.preferences.autoSave).toBe(true);
  });
});
