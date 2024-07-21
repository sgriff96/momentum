<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import Sparkline from '$lib/charts/Sparkline.svelte';
	import { populateMissingDates } from '$lib/components/DatePicker/helpers';
	import type { HabitData, HabitDataWithValue, IHabit } from '$lib/types/Habit';
	import { differenceInDays } from 'date-fns';
	import HabitCard from './HabitCard.svelte';

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
		// TODO: fix calculation since it isn't quite right
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

{#if preview === true}
	<a href={`/habits/${habit.id}`}>
		<HabitCard habit={habit} preview={preview}>
			<Sparkline bind:data={data} />
		</HabitCard>
	</a>
{:else}
	<HabitCard habit={habit} preview={preview}>
		<AreaChart bind:data={data} />
	</HabitCard>
{/if}
