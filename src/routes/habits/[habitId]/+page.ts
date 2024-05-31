import type { HabitData, IHabit } from '$lib/types/Habit';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	depends('supabase:db:habits');
	depends('supabase:db:habit_data');
	const res = await fetch(`/habits/${params.habitId}`);
	const data: { habits: IHabit[]; habitData: HabitData[] } = await res.json();

	if (!data) {
		error(500, {
			message: 'Habit not found',
		});
	}

	return { habit: data.habits[0], habitData: data.habitData };
};
