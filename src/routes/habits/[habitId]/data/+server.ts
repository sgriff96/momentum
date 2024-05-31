import { error } from '@sveltejs/kit';

export async function POST({ params, request, locals: { supabase } }) {
	const { habitData } = await request.json();

	const { error: postError } = await supabase
		.from('habit_data')
		.insert({ date: habitData.date, habit_id: params.habitId, completed: habitData.completed });

	if (postError) {
		return error(Number(postError.code), {
			message: postError.message,
		});
	}

	return new Response(null, { status: 204 });
}

export async function PUT({ request, locals: { supabase } }) {
	const { habitData } = await request.json();

	const { error: putError } = await supabase
		.from('habit_data')
		.update({ date: habitData.date, completed: habitData.completed })
		.eq('id', habitData.id);

	if (putError) {
		return error(Number(putError.code), {
			message: putError.message,
		});
	}

	return new Response(null, { status: 204 });
}
