// export interface IHabit {
// 	id: string;
// 	name: string;
// 	data: HabitData[];
// 	startDate: Date;
// 	description?: string;
// }

import type { Tables } from './supabase';

export type HabitData = {
	completed: boolean;
	date: string;
	value: number;
};

export type IHabit = Omit<Tables<'habits'>, 'data'> & {
	data: HabitData[];
};
