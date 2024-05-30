<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { HabitData, IHabit } from '$lib/types/Habit';
	import { diffDays } from '@formkit/tempo';

	export let habit: IHabit;

	const getTrend = (data: HabitData[], i: number) => {
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

	const data = habit.habit_data.reduce((acc: (HabitData & { value: number })[], d, i) => {
		let value;
		// y = mx + b
		// m is the trend, 1, 0 or -1
		// b is y(n-1), the previous value (?)
		// x is the amount of days since starting the habit
		let m = 0;

		if (i === 0 && d.completed === true) {
			value = 1;
		} else {
			const x = diffDays(new Date(d.date), new Date(String(habit.created_at)));
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
		<Card.Header>
			<Card.Title>{habit.name}</Card.Title>
			<Card.Description>{habit.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<AreaChart data={data} />
		</Card.Content>
	</a>
</Card.Root>
