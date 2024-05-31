import type { Tables } from './supabase';

export type IHabit = Tables<'habits'>;

export type HabitData = Pick<Tables<'habit_data'>, 'completed' | 'date'> & { id?: string };
export type HabitDataWithValue = Omit<HabitData, 'id'> & { value?: number };
