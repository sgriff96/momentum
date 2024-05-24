export type Habit = {
	id: string;
	name: string;
	description?: string;
};

export type Habits = Record<string, Habit>;
