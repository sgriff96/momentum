export type Habit = {
	id: string;
	name: string;
	data: HabitData[];
	description?: string;
};

export type HabitData = {
	date: Date;
	value: number;
};
