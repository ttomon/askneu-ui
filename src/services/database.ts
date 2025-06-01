
// Simple mock database service for local storage only
import storage from './storage';

// Collection types
type Collection = 'posts' | 'users' | 'comments' | 'messages' | 'groups' | 'notifications';

/**
 * Simple local storage service (database functionality removed)
 */
const db = {
  // Find documents in a collection
  find: async <T>(collection: Collection, query?: any): Promise<T[]> => {
    try {
      const collectionData = storage.get<T[]>(collection, []) || [];
      
      if (!query) return collectionData;
      
      // Simple filtering for localStorage
      return collectionData.filter(item => {
        for (const key in query) {
          if (Object.prototype.hasOwnProperty.call(query, key)) {
            if ((item as any)[key] !== query[key]) return false;
          }
        }
        return true;
      });
    } catch (error) {
      console.error(`Error in find(${collection})`, error);
      return [];
    }
  },

  // Get a single document by ID
  getById: async <T>(collection: Collection, id: string): Promise<T | null> => {
    try {
      const collectionData = storage.get<T[]>(collection, []) || [];
      return collectionData.find(item => (item as any).id === id) || null;
    } catch (error) {
      console.error(`Error in getById(${collection}, ${id})`, error);
      return null;
    }
  },

  // Create a new document
  create: async <T extends { id?: string }>(collection: Collection, data: T): Promise<T> => {
    try {
      const newData = { 
        ...data,
        id: data.id || crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };

      const collectionData = storage.get<T[]>(collection, []) || [];
      storage.set(collection, [...collectionData, newData]);
      return newData as T;
    } catch (error) {
      console.error(`Error in create(${collection})`, error);
      throw error;
    }
  },

  // Update a document
  update: async <T extends { id: string }>(collection: Collection, id: string, updates: Partial<T>): Promise<T | null> => {
    try {
      const collectionData = storage.get<T[]>(collection, []) || [];
      const item = collectionData.find(item => (item as any).id === id);
      
      if (!item) return null;
      
      const updatedItem = { 
        ...item, 
        ...updates, 
        updatedAt: new Date().toISOString() 
      };
      
      const updatedCollection = collectionData.map(item => 
        (item as any).id === id ? updatedItem : item
      );
      
      storage.set(collection, updatedCollection);
      return updatedItem as T;
    } catch (error) {
      console.error(`Error in update(${collection}, ${id})`, error);
      return null;
    }
  },

  // Delete a document
  delete: async (collection: Collection, id: string): Promise<boolean> => {
    try {
      const collectionData = storage.get<any[]>(collection, []) || [];
      const filteredData = collectionData.filter(item => item.id !== id);
      storage.set(collection, filteredData);
      return true;
    } catch (error) {
      console.error(`Error in delete(${collection}, ${id})`, error);
      return false;
    }
  }
};

export default db;
