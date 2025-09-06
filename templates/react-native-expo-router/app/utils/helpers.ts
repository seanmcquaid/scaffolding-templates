/**
 * Utility function to format display text
 */
export const formatDisplayText = (text: string): string => {
  return text.trim().charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

/**
 * Utility function to safely parse JSON
 */
export const safeJsonParse = <T>(text: string, fallback: T): T => {
  try {
    return JSON.parse(text);
  } catch {
    return fallback;
  }
};

/**
 * Utility function to delay execution
 */
export const delay = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
