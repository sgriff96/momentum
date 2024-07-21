import type { IHabit } from '$lib/types/Habit';
import { error, json } from '@sveltejs/kit';

export async function GET({ params, locals: { supabase, session } }) {
	const { data: habits, error: habitsError } = await supabase
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
					completed
				)
  		`,
		)
		.eq('user_id', session?.user.id)
		.eq('id', params.habitId)
		.returns<IHabit[]>();

	if (habitsError) {
		error(Number(habitsError.code), {
			message: habitsError.message,
		});
	}

	return json({
		habits,
	});
}
