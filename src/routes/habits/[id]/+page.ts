import type { IHabit } from '$lib/types/Habit';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params, depends }) => {
	depends('supabase:db:habits');
	depends('supabase:db:habit_data');
	const res = await fetch(`/habits/${params.id}`);
	const habits: IHabit[] = await res.json();

	const habit = habits.find((habit) => habit.id === params.id);

	if (!habit) {
		error(500, {
			message: 'Habit not found',
		});
	}

	return { habit };
};
