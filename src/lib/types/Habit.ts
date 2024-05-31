import type { Tables } from './supabase';

export type HabitData = Pick<Tables<'habit_data'>, 'id' | 'completed' | 'date'>;

export type IHabit = Tables<'habits'>;
