// Custom client wrapper to avoid runtime issues when environment
// variables are missing in some environments.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://nedbeepcfcyzqbkhkyzu.supabase.co';
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5lZGJlZXBjZmN5enFia2hreXp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMxODgwMjMsImV4cCI6MjA3ODc2NDAyM30.4Cp7dVlKMjh2X_vYkFDZXojX92GKB5_gQ4NVTREgCbs';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});

export default supabase;
