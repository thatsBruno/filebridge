import { SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = `${process.env.SUPABASE_URL}`;
const anonKey = `${process.env.SUPABASE_ANON_KEY}`;

const supabase = new SupabaseClient(supabaseUrl, anonKey);

export default supabase;