import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { habitFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ depends, locals: { supabase, session } }) => {
	depends('supabase:db:habits');
	console.log('session', session);
	const { data: habits } = await supabase
		.from('habits')
		.select('*')
		.eq('user_id', session?.user.id);
	console.log('habits', habits);
	return {
		habits: habits ?? [],
		habitForm: await superValidate(zod(habitFormSchema))
	};
};
