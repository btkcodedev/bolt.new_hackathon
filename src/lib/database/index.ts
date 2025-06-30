import { supabase } from './supabase';
import { mockDatabase, SavedQuote } from './mock';
import { env } from '@/config/env';
import { PrintJob, CostBreakdown, AIInsights } from '@/types';

// Database interface
export interface DatabaseService {
  quotes: {
    getAll(): Promise<{ data: SavedQuote[] | null; error: any }>;
    save(quote: {
      name: string;
      job_data: PrintJob;
      breakdown_data: CostBreakdown;
      insights_data: AIInsights;
      total_cost: number;
      status?: 'draft' | 'sent' | 'accepted' | 'rejected';
    }): Promise<{ data: SavedQuote[] | null; error: any }>;
    update(id: string, updates: Partial<SavedQuote>): Promise<{ data: SavedQuote[] | null; error: any }>;
    delete(id: string): Promise<{ data: any; error: any }>;
  };
  filamentPresets: {
    getAll(): Promise<{ data: any[] | null; error: any }>;
    save(preset: {
      name: string;
      cost_per_kg: number;
      density: number;
      print_temp: number;
      bed_temp: number;
      properties: string[];
      is_default?: boolean;
    }): Promise<{ data: any[] | null; error: any }>;
  };
}

// Create database service based on configuration
const createDatabaseService = (): DatabaseService => {
  const useSupabase = env.ENABLE_DATABASE && supabase;

  if (useSupabase) {
    return {
      quotes: {
        async getAll() {
          return await supabase!.from('quotes').select('*').order('created_at', { ascending: false });
        },
        async save(quote) {
          return await supabase!.from('quotes').insert([quote]).select();
        },
        async update(id, updates) {
          return await supabase!.from('quotes').update(updates).eq('id', id).select();
        },
        async delete(id) {
          return await supabase!.from('quotes').delete().eq('id', id);
        }
      },
      filamentPresets: {
        async getAll() {
          return await supabase!.from('filament_presets').select('*').order('name');
        },
        async save(preset) {
          return await supabase!.from('filament_presets').insert([preset]).select();
        }
      }
    };
  }

  // Use mock database
  return {
    quotes: {
      async getAll() {
        return mockDatabase.quotes.select();
      },
      async save(quote) {
        return mockDatabase.quotes.insert(quote);
      },
      async update(id, updates) {
        return mockDatabase.quotes.update(id, updates);
      },
      async delete(id) {
        return mockDatabase.quotes.delete(id);
      }
    },
    filamentPresets: {
      async getAll() {
        return mockDatabase.filament_presets.select();
      },
      async save(preset) {
        return mockDatabase.filament_presets.insert(preset);
      }
    }
  };
};

export const db = createDatabaseService();

// Export types
export type { SavedQuote };