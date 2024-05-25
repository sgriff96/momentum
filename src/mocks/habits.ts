import type { Habit } from '$lib/types/Habit';

const HABIT_DATA = [
	{
		date: new Date('2024-04-25T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-04-26T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-04-27T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-04-28T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-04-29T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-04-30T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-01T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-02T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-03T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-04T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-05T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-06T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-07T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-08T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-09T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-10T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-11T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-12T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-13T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-14T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-15T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-16T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-17T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-18T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-19T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-20T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-21T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-22T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-23T07:00:00.000Z'),
		completed: true
	},
	{
		date: new Date('2024-05-24T07:00:00.000Z'),
		completed: true
	}
];

export const MOCK_HABITS: Habit[] = [
	{
		id: '1',
		name: 'Exercise',
		description: 'Do some exercise',
		data: HABIT_DATA
	},
	{
		id: '2',
		name: 'Read',
		description: 'Read a book',
		data: HABIT_DATA
	},
	{
		id: '3',
		name: 'Meditate',
		description: 'Meditate for 10 minutes',
		data: HABIT_DATA
	}
];
