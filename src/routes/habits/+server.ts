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

	// const newData = habits.data.map((d) => ({
	// 	...d,

	// }))

	// console.log(habits);

	// const res = await supabase
	// 	.from('habits')
	// 	.update({
	// 		data: habits[1].data.map((d) => ({
	// 			date: format(new Date(d.date), 'yyyy-MM-dd'),
	// 			value: d.value,
	// 			completed: d.completed,
	// 		})),
	// 	})
	// 	.eq('id', 'b2a8fc07-e1c8-4fe9-bdc2-3a11bd6fcdb5');

	// console.log(res);

	return json(habits);
}
