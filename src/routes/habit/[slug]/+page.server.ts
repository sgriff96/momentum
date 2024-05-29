import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, depends, locals: { supabase, session } }) => {
	depends('supabase:db:habits');
	const { data: habit } = await supabase.from('habits').select('*').eq('id', params.slug);
	return {
		habit: habit[0]
	};
};
