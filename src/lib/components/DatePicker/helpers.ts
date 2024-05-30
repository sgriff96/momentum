import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';

export const getWeekDates = (date: Date) => {
	// Get the start and end date of the week
	const start = startOfWeek(date, { weekStartsOn: 1 }); // Monday
	const end = endOfWeek(date, { weekStartsOn: 1 }); // Sunday

	// Create an array with all dates of the week
	const weekDates = eachDayOfInterval({ start, end });

	return weekDates;
};
