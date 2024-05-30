import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { PageServerLoad } from './$types';
import { habitFormSchema } from './schema';

export const load: PageServerLoad = async () => {
	return {
		habitForm: await superValidate(zod(habitFormSchema)),
	};
};
