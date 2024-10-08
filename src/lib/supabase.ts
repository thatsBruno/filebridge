import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseKey : string = import.meta.env.VITE_SUPABASE_KEY as string
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase