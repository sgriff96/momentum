import { MOCK_HABITS } from '../mocks/habits';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const habits = MOCK_HABITS; // fake api call
	return {
		habits
	};
};
