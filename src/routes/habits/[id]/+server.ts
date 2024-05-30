import type { IHabit } from '$lib/types/Habit';
import { error, json } from '@sveltejs/kit';

export async function GET({ params, locals: { supabase, session } }) {
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
				data
  		`,
		)
		.eq('user_id', session?.user.id)
		.eq('id', params.id)
		.returns<IHabit[]>();

	if (habitError) {
		error(Number(habitError.code), {
			message: habitError.message,
		});
	}

	return json(habits);
}
