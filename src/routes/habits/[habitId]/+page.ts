import type { IHabit } from '$lib/types/Habit';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends, data }) => {
	depends('supabase:db:habits');
	depends('supabase:db:habit_data');
	const res = await fetch(`/habits/${params.habitId}`);
	const habits: { habits: IHabit[] } = await res.json();

	if (!data) {
		error(500, {
			message: 'Habit not found',
		});
	}

	return { habit: habits.habits[0], habitForm: data.habitForm };
};
