import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { habitFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ depends, locals: { supabase, session } }) => {
	depends('supabase:db:habits');
	const { data: habits } = await supabase
		.from('habits')
		.select('*')
		.eq('user_id', session?.user.id);
	return {
		habits: habits ?? [],
		habitForm: await superValidate(zod(habitFormSchema))
	};
};
