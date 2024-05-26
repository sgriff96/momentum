import { supabase } from '$lib/supabaseClient';
import { MOCK_HABITS } from '../mocks/habits';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	// const habits = MOCK_HABITS; // fake api call
	const res = await supabase.from('habits').select('*');
	const habits = res.data;

	return {
		habits
	};
};
