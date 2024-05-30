import type { IHabit } from '$lib/types/Habit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, depends, data }) => {
	depends('supabase:db:habits');
	depends('supabase:db:habit_data');
	const res = await fetch(`/habits`);
	const habits: IHabit[] = await res.json();

	return { habits, habitForm: data.habitForm };
};
