
import { createClient } from '@supabase/supabase-js';
import storage from './storage';

// Configure with your own Supabase URL and key when deploying
// For now, using placeholders
const supabaseUrl = 'https://YOUR_SUPABASE_URL.supabase.co';
const supabaseKey = 'YOUR_SUPABASE_KEY';

// Initialize Supabase client (or use null for local-only mode)
const supabase = (supabaseUrl !== 'https://YOUR_SUPABASE_URL.supabase.co' && supabaseKey !== 'YOUR_SUPABASE_KEY') 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Collection types
type Collection = 'posts' | 'users' | 'comments' | 'messages' | 'groups' | 'notifications';

/**
 * Database service that handles both online (Supabase) and offline (localStorage) storage
 * Falls back to localStorage when offline or Supabase isn't configured
 */
const db = {
  // Find documents in a collection
  find: async <T>(collection: Collection, query?: any): Promise<T[]> => {
    try {
      // If supabase is configured and online, use it
      if (supabase && navigator.onLine) {
        let queryBuilder = supabase.from(collection).select('*');
        
        // Very basic query handling (expand as needed)
        if (query) {
          if (query.id) queryBuilder = queryBuilder.eq('id', query.id);
          // Add more conditions as needed
        }
        
        const { data, error } = await queryBuilder;
        if (error) throw error;
        return data as T[];
      } else {
        // Fall back to localStorage
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
      }
    } catch (error) {
      console.error(`Error in find(${collection})`, error);
      return [];
    }
  },

  // Get a single document by ID
  getById: async <T>(collection: Collection, id: string): Promise<T | null> => {
    try {
      // If supabase is configured and online, use it
      if (supabase && navigator.onLine) {
        const { data, error } = await supabase
          .from(collection)
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        return data as T;
      } else {
        // Fall back to localStorage
        const collectionData = storage.get<T[]>(collection, []) || [];
        return collectionData.find(item => (item as any).id === id) || null;
      }
    } catch (error) {
      console.error(`Error in getById(${collection}, ${id})`, error);
      return null;
    }
  },

  // Create a new document
  create: async <T extends { id?: string }>(collection: Collection, data: T): Promise<T> => {
    try {
      // Ensure the data has an ID
      const newData = { 
        ...data,
        id: data.id || crypto.randomUUID(),
        createdAt: new Date().toISOString()
      };

      // If supabase is configured and online, use it
      if (supabase && navigator.onLine) {
        const { data: created, error } = await supabase
          .from(collection)
          .insert([newData])
          .select()
          .single();
          
        if (error) throw error;
        
        // Also save locally for offline access
        const localData = storage.get<T[]>(collection, []) || [];
        storage.set(collection, [...localData, created]);
        
        return created as T;
      } else {
        // Store in localStorage
        const collectionData = storage.get<T[]>(collection, []) || [];
        storage.set(collection, [...collectionData, newData]);
        return newData as T;
      }
    } catch (error) {
      console.error(`Error in create(${collection})`, error);
      throw error;
    }
  },

  // Update a document
  update: async <T extends { id: string }>(collection: Collection, id: string, updates: Partial<T>): Promise<T | null> => {
    try {
      // If supabase is configured and online, use it
      if (supabase && navigator.onLine) {
        const { data, error } = await supabase
          .from(collection)
          .update({ ...updates, updatedAt: new Date().toISOString() })
          .eq('id', id)
          .select()
          .single();
          
        if (error) throw error;
        
        // Update locally too
        const localData = storage.get<T[]>(collection, []) || [];
        const updatedLocalData = localData.map(item => 
          (item as any).id === id ? { ...item, ...updates } : item
        );
        storage.set(collection, updatedLocalData);
        
        return data as T;
      } else {
        // Update in localStorage
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
      }
    } catch (error) {
      console.error(`Error in update(${collection}, ${id})`, error);
      return null;
    }
  },

  // Delete a document
  delete: async (collection: Collection, id: string): Promise<boolean> => {
    try {
      // If supabase is configured and online, use it
      if (supabase && navigator.onLine) {
        const { error } = await supabase
          .from(collection)
          .delete()
          .eq('id', id);
          
        if (error) throw error;
      }
      
      // Always delete locally regardless of online status
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
