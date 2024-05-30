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
				data
  		`,
		)
		.eq('user_id', session?.user.id)
		.returns<IHabit[]>();

	if (habitError) {
		error(Number(habitError.code), {
			message: habitError.message,
		});
	}

	// console.log(habits);

	// const res = await supabase
	// 	.from('habits')
	// 	.update({
	// 		data: habits[1].habit_data.sort((a, b) => new Date(a.date) - new Date(b.date)),
	// 	})
	// 	.eq('id', '7e766f8d-050a-4c56-b6b0-0d58dba21b45');

	// // console.log(res);

	return json(habits);
}
