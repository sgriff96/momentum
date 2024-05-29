// export interface IHabit {
// 	id: string;
// 	name: string;
// 	data: HabitData[];
// 	startDate: Date;
// 	description?: string;
// }

import type { Tables } from './supabase';

export type HabitData = Tables<'habit_data'>;

export type IHabit = Tables<'habits'> & {
	habit_data: HabitData[];
};
