import { createClient } from '@supabase/supabase-js';

// Next.js requires NEXT_PUBLIC_ prefix for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Check if the credentials are valid and NOT the placeholder strings
const isValidConfig = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('http') && 
  !supabaseUrl.includes('your_supabase_url_here');

// Only create the client if we have a valid config
export const supabase = isValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({ data: [], error: null }),
        upsert: () => Promise.resolve({ error: null }),
        insert: () => Promise.resolve({ error: null }),
        update: () => Promise.resolve({ error: null }),
        delete: () => Promise.resolve({ error: null }),
        eq: () => ({ 
          single: () => Promise.resolve({ data: null, error: null }),
          select: () => Promise.resolve({ data: [], error: null })
        }),
      })
    } as any;

if (!isValidConfig) {
  if (typeof window !== 'undefined') {
    console.warn('⚠️ Supabase connection failed. Using Local Storage mode. Please ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.');
  }
}
