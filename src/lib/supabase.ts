import { createClient } from '@supabase/supabase-js';

// Supabase configuration
// Get these from your Supabase project dashboard
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key-here'
};

export const supabase = createClient(
  supabaseConfig.url,
  supabaseConfig.anonKey
);
