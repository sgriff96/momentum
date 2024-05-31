import type { HabitData, IHabit } from '$lib/types/Habit';
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
				data
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

	const { data: habitData, error: dataError } = await supabase
		.from('habit_data')
		.select(
			`
				id,
				date,
				completed
			`,
		)
		.eq('user_id', session?.user.id)
		.eq('habit_id', params.habitId)
		.order('date', { ascending: true })
		.returns<HabitData[]>();

	if (dataError) {
		error(Number(dataError.code), {
			message: dataError.message,
		});
	}

	// habitData.forEach(async (item) => {
	// 	console.log('item', item);
	// 	const { error } = await supabase
	// 		.from('habit_data')
	// 		.update({ date: format(new Date(item.date), 'yyyy-MM-dd') })
	// 		.eq('id', item.id);

	// 	console.log('error', error);
	// });

	return json({
		habits,
		habitData,
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
