import type { Tables } from './supabase';

export type IHabit = Tables<'habits'> & { habit_data: HabitData[] };
export type HabitData = Pick<Tables<'habit_data'>, 'completed' | 'date'> & { id?: string };
export type HabitDataWithValue = Omit<HabitData, 'id'> & { value?: number };
