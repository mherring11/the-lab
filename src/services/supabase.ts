import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ohqsrhpdhikbjmyakybh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ocXNyaHBkaGlrYmpteWFreWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMxMTk3NjAsImV4cCI6MjA1ODY5NTc2MH0.YDJDwxjhwVEffsOoELm9rmNWo9lxzBTL6_TubJXI1uM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);