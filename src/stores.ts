import type { Habit } from '$lib/types/Habit';
import { writable } from 'svelte/store';

export const habits = writable<Habit[]>([]);
