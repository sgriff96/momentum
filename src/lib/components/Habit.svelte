<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import Sparkline from '$lib/charts/Sparkline.svelte';
	import { populateMissingDates } from '$lib/components/DatePicker/helpers';
	import * as Card from '$lib/components/ui/card';
	import type { HabitData, HabitDataWithValue, IHabit } from '$lib/types/Habit';
	import { differenceInDays } from 'date-fns';

	export let habit: IHabit;
	export let habitData: HabitData[];
	export let preview: boolean = false;

	const getTrend = (data: HabitDataWithValue[], i: number) => {
		let trend = 0;
		if (data[i - 1]?.completed === true) {
			trend = 1;
		}

		if (data[i - 1]?.completed === false && data[i - 2]?.completed === true) {
			trend = 0;
		}

		if (data[i - 1]?.completed === false && data[i - 2]?.completed === false) {
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

		if (value < 0) {
			value = 0;
		}

		acc.push({
			...d,
			value,
		});
		return acc;
	}, []);
</script>

<Card.Root>
	<a href={`/habits/${habit.id}`} class={preview ? '' : 'pointer-events-none'}>
		<Card.Header class="rounded-t-lg transition-colors {preview ? 'hover:bg-primary/80' : ''}">
			<Card.Title>
				{habit.name}
			</Card.Title>
		</Card.Header>
	</a>
	<Card.Subheader>
		<Card.Description>{habit.description}</Card.Description>
	</Card.Subheader>
	<Card.Content>
		<div class="pb-4">
			{#if preview === true}
				<Sparkline data={data} />
			{:else}
				<AreaChart data={data} />
			{/if}
		</div>
	</Card.Content>
</Card.Root>
