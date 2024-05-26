import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends, locals: { supabase, session } }) => {
	depends('supabase:db:habits');
	console.log('session', session);
	const { data: habits } = await supabase
		.from('habits')
		.select('*')
		.eq('createdBy', session?.user.id);
	console.log('habits', habits);
	return { habits: habits ?? [] };
};
