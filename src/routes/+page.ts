import { MOCK_HABITS } from '../mocks/habits';
import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return { habits: MOCK_HABITS };
};
