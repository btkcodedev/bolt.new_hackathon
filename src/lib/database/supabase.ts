import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '@/config/env';

export interface Database {
  public: {
    Tables: {
      quotes: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          user_id?: string;
          name: string;
          job_data: any;
          breakdown_data: any;
          insights_data: any;
          total_cost: number;
          status: 'draft' | 'sent' | 'accepted' | 'rejected';
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          name: string;
          job_data: any;
          breakdown_data: any;
          insights_data: any;
          total_cost: number;
          status?: 'draft' | 'sent' | 'accepted' | 'rejected';
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          user_id?: string;
          name?: string;
          job_data?: any;
          breakdown_data?: any;
          insights_data?: any;
          total_cost?: number;
          status?: 'draft' | 'sent' | 'accepted' | 'rejected';
        };
      };
      filament_presets: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          cost_per_kg: number;
          density: number;
          print_temp: number;
          bed_temp: number;
          properties: string[];
          is_default: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          cost_per_kg: number;
          density: number;
          print_temp: number;
          bed_temp: number;
          properties: string[];
          is_default?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          cost_per_kg?: number;
          density?: number;
          print_temp?: number;
          bed_temp?: number;
          properties?: string[];
          is_default?: boolean;
        };
      };
    };
  };
}

let supabaseClient: SupabaseClient<Database> | null = null;

export const getSupabaseClient = (): SupabaseClient<Database> | null => {
  if (!env.ENABLE_DATABASE || !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    return null;
  }

  if (!supabaseClient) {
    supabaseClient = createClient<Database>(
      env.SUPABASE_URL,
      env.SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    );
  }

  return supabaseClient;
};

export const supabase = getSupabaseClient();