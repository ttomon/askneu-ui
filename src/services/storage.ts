
// Lightweight storage service for offline capability using localStorage
// This can be expanded to include IndexedDB for more complex data storage needs

interface StorageService {
  get: <T>(key: string, defaultValue?: T) => T | null;
  set: <T>(key: string, value: T) => void;
  remove: (key: string) => void;
  clear: () => void;
}

/**
 * Simple storage service that uses localStorage
 * Can be extended to use IndexedDB for larger data needs
 */
const storage: StorageService = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue || null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item from storage: ${key}`, error);
      return defaultValue || null;
    }
  },

  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item in storage: ${key}`, error);
    }
  },

  remove: (key: string): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item from storage: ${key}`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing storage', error);
    }
  }
};

export default storage;
