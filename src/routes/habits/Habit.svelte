<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import { populateMissingDates } from '$lib/components/DatePicker/helpers';
	import * as Card from '$lib/components/ui/card';
	import type { HabitData, IHabit, HabitDataWithValue } from '$lib/types/Habit';
	import { differenceInDays } from 'date-fns';
	import { Checkbox } from '$lib/components/ui/checkbox';
	export let habit: IHabit;
	export let habitData: HabitData[];

	const getTrend = (data: HabitDataWithValue[], i: number) => {
		let trend = 0;
		if (data[i - 1].completed === true) {
			trend = 1;
		}

		if (data[i - 1].completed === false && data[i - 2].completed === true) {
			trend = 0;
		}

		if (data[i - 1].completed === false && data[i - 2].completed === false) {
			trend = -1;
		}

		return trend;
	};

	// populate new data
	$: allDates = populateMissingDates(habitData);

	$: data = allDates.reduce((acc: HabitDataWithValue[], d, i) => {
		let value;
		// y = mx + b
		// m is the trend, 1, 0 or -1
		// b is y(n-1), the previous value (?)
		// x is the amount of days since starting the habit
		let m = 0;

		if (i === 0 && d.completed === true) {
			value = 1;
		} else {
			const x = differenceInDays(new Date(d.date), new Date(String(habit.created_at)));
			const b = acc[i - 1]?.value ?? 0;
			m = getTrend(acc, i); // THIS ISNT RIGHT

			value = m * x + b;
		}

		acc.push({
			...d,
			value,
		});
		return acc;
	}, []);
</script>

<Card.Root class="overflow-hidden transition-all duration-300 ease-in-out hover:border-primary">
	<a href={`/habits/${habit.id}`}>
		<Card.Header class="flex flex-row items-center justify-between">
			<div>
				<Card.Title class="pb-1">{habit.name}</Card.Title>
				<Card.Description>{habit.description}</Card.Description>
			</div>
			<Checkbox />
		</Card.Header>
		<Card.Content>
			<AreaChart bind:data={data} />
		</Card.Content>
	</a>
</Card.Root>
