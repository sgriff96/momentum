import type { PageLoad } from './$types';

export const load: PageLoad = async ({ data }) => {
	return { habitForm: data.habitForm };
};
