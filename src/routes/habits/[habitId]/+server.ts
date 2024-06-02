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

export async function PUT({ params, request, locals: { supabase } }) {
	const { habitData } = await request.json();

	const { error: putError } = await supabase.from('habits').update({ data: habitData }).eq('id', params.habitId);

	if (putError) {
		return error(Number(putError.code), {
			message: putError.message,
		});
	}

	return new Response(null, { status: 204 });
}
