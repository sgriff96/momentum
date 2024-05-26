export interface IHabit {
	id: string;
	name: string;
	data: HabitData[];
	startDate: Date;
	description?: string;
}

export type HabitData = {
	date: Date;
	value?: number;
	completed: boolean;
};
