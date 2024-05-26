import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals: { session } }) => {
	// const res = await supabase.from('habits').select('*');
	// const blah: Tables<'habits'>[] | null = res.data;

	// await HABIT_DATA.forEach(async (data) => {
	// 	await supabase.from('habitData').insert({
	// 		...data,
	// 		habitId: '7e766f8d-050a-4c56-b6b0-0d58dba21b45'
	// 	});
	// });

	return {
		session
	};
};
