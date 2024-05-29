import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import type { IHabit } from '$lib/types/Habit';

export const load: PageServerLoad = async ({ params, depends, locals: { supabase, session } }) => {
	depends('supabase:db:habits');
	depends('supabase:db:habit_data');
	const { data: habit, error: habitError } = await supabase
		.from('habits')
		.select(
			`
				*,
				habit_data (
					*
				)
			`,
		)
		.eq('id', params.slug)
		.eq('user_id', session?.user.id)
		.order('date', { referencedTable: 'habit_data', ascending: true })
		.returns<IHabit[]>();

	if (habitError) {
		error(Number(habitError.code), {
			message: habitError.message,
		});
	}

	return {
		habit: habit[0],
	};
};

export const actions = {
	updateDates: async (event) => {
		console.log(event);
	},
} satisfies Actions;
