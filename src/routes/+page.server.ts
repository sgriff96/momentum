import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { habitFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { error } from '@sveltejs/kit';
import type { IHabit } from '$lib/types/Habit';

export const load: PageServerLoad = async ({ depends, locals: { supabase, session } }) => {
	depends('supabase:db:habits');
	depends('supabase:db:habitData');
	const { data: habits, error: habitError } = await supabase
		.from('habits')
		.select(
			`
				id,
				name,
				description,
				created_at,
				user_id,
				is_active,
				created_at,
				habit_data (
					id,
					date,
					habit_id,
					completed,
					user_id
				)
			`,
		)
		.eq('user_id', session?.user.id)
		.returns<IHabit[]>();

	// HABIT_DATA.forEach(async (habitData) => {
	// 	const id = '4ca36d2e-9cd9-4cc1-a6cb-ed369d21c8aa';

	// 	const { error } = await supabase.from('habit_data').insert({ ...habitData, habit_id: id });
	// 	console.log(error);
	// });

	if (habitError) {
		error(Number(habitError.code), {
			message: habitError.message,
		});
	}

	return {
		habits: habits ?? [],
		habitForm: await superValidate(zod(habitFormSchema)),
	};
};
