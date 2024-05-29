// export interface IHabit {
// 	id: string;
// 	name: string;
// 	data: HabitData[];
// 	startDate: Date;
// 	description?: string;
// }

import type { Tables } from './supabase';

export type IHabit = Tables<'habits'>;

export type HabitData = {
	date: Date;
	value?: number;
	completed: boolean;
	trend: string;
};
