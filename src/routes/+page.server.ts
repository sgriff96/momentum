import { MOCK_HABITS } from '../mocks/habits';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = () => {
	const habits = MOCK_HABITS; // fake api call
	return { habits };
};
