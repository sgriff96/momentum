import type { Habit } from '$lib/types/Habit';
import { writable } from 'svelte/store';

const createHabitStore = () => {
	const { subscribe, set, update } = writable<Habit[]>([]);

	return {
		subscribe,
		add: (habit: Habit) => update((habits) => [...habits, habit]),
		remove: (id: string) => update((habits) => habits.filter((habit) => habit.id !== id)),
		reset: () => set([])
	};
};

export const habitStore = createHabitStore();
