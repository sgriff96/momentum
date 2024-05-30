import type { IHabit } from '$lib/types/Habit';
import { error, json } from '@sveltejs/kit';

export async function GET({ locals: { supabase, session } }) {
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
		.order('date', { referencedTable: 'habit_data', ascending: true })
		.returns<IHabit[]>();

	if (habitError) {
		error(Number(habitError.code), {
			message: habitError.message,
		});
	}

	return json(habits);
}
