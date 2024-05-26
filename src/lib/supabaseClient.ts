import { createClient } from '@supabase/supabase-js';
import { VITE_SB_PROJECT_URL, VITE_SB_ANON_KEY } from '$env/static/private';
import type { Database, Tables } from './types/supabase';

export const supabase = createClient<Database>(VITE_SB_PROJECT_URL, VITE_SB_ANON_KEY);

let habits: Tables<'habits'>[];
