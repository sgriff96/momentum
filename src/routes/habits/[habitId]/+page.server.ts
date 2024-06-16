import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, PageServerLoad } from './$types';
import { habitFormSchema } from './schema';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		editHabitForm: await superValidate(zod(habitFormSchema)),
	};
};

export const actions: Actions = {
	edit: async (event) => {
		const form = await superValidate(event, zod(habitFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { habitName, habitDescription } = form.data;

		const { error: updateError } = await event.locals.supabase
			.from('habits')
			.update({
				name: habitName,
				description: habitDescription,
			})
			.eq('id', event.params.habitId);

		if (updateError) {
			return error(Number(updateError.code), {
				message: updateError.message,
			});
		}
	},
};
