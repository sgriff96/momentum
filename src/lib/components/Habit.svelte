<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { HabitData, IHabit } from '$lib/types/Habit';

	export let habit: IHabit;

	console.log('habit', habit);

	const bah = habit.data.reduce((acc: HabitData[], d, i) => {
		let value;

		if (i === 0 && d.completed === true) {
			value = 1;
		} else if (d.completed === true && 'value' in acc[i - 1]) {
			value = acc[i - 1].value! + 1;
		}

		acc.push({
			...d,
			value
		});
		return acc;
	}, []);

	console.log(bah);
</script>

<Card.Root class="overflow-hidden transition-all duration-300 ease-in-out hover:border-primary">
	<a href={`/habit/${habit.id}`}>
		<Card.Header>
			<Card.Title>{habit.name}</Card.Title>
			<Card.Description>{habit.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<AreaChart data={bah} />
		</Card.Content>
	</a>
</Card.Root>
