import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad, Actions } from './$types';
import { habitFormSchema } from './schema';
import { error, fail } from '@sveltejs/kit';

export const load: PageServerLoad = async () => {
	return {
		habitForm: await superValidate(zod(habitFormSchema)),
	};
};

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(habitFormSchema));
		if (!form.valid) {
			return fail(400, {
				form,
			});
		}

		const { habitName, habitDescription } = form.data;

		const { error: insertError } = await event.locals.supabase.from('habits').insert({
			name: habitName,
			description: habitDescription,
			created_at: new Date(),
		});

		if (insertError) {
			return error(Number(insertError.code), {
				message: insertError.message,
			});
		}
	},
};
