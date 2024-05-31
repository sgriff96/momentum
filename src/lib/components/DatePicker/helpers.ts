import type { HabitData } from '$lib/types/Habit';
import { eachDayOfInterval, endOfWeek, format, parseISO, startOfWeek } from 'date-fns';

export const getWeekDates = (date: Date): string[] => {
	// Get the start and end date of the week
	const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
	const end = endOfWeek(date, { weekStartsOn: 1 }); // Sunday

	// Create an array with all dates of the week
	const weekDates = eachDayOfInterval({ start, end });

	// Format the dates to 'yyyy-MM-dd'
	return weekDates.map((date) => format(date, 'yyyy-MM-dd'));
};

export const getDatesBetween = (startDate: string) => {
	const now = new Date();
	const dates = eachDayOfInterval({ start: new Date(startDate), end: now });
	return dates.map((date) => format(date, 'yyyy-MM-dd'));
};

// Function to find the earliest date in the array and populate missing dates
export const populateMissingDates = (dateArray: HabitData[]): Omit<HabitData, 'id'>[] => {
	// Parse the date strings into Date objects and find the earliest date
	// @ts-expect-error Math.min typing expects a number but it does work with dates
	const earliestDate = new Date(Math.min(...dateArray.map((item) => parseISO(item.date))));
	const now = new Date();

	// Generate all dates between the earliest date and now
	const allDates = eachDayOfInterval({ start: earliestDate, end: now });

	// Create a map from the original dates for quick lookup
	const dateMap = new Map(dateArray.map((item) => [format(item.date, 'yyyy-MM-dd'), item]));

	// Populate missing dates and retain 'completed' and 'value' if the date existed
	const result = allDates.map((date) => {
		const formattedDate = format(date, 'yyyy-MM-dd');
		const item = dateMap.get(formattedDate);
		return {
			...(item ? { completed: item.completed } : { completed: false }),
			date: formattedDate,
		};
	});

	return result;
};

export const sortDates = (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime();
