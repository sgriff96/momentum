import type { Habits, Habit } from '$lib/types/Habit';
import { writable } from 'svelte/store';

const createHabitStore = () => {
	const { subscribe, set, update } = writable<Habits>({});

	return {
		subscribe,
		add: (habit: Habit) => update((habits) => ({ ...habits, habit })),
		remove: (id: string) =>
			update((habits) => {
				const { [id]: _, ...rest } = habits;
				return rest;
			}),
		reset: () => set({})
	};
};

export const habitStore = createHabitStore();
