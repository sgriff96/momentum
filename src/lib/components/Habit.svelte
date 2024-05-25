<script lang="ts">
	import AreaChart from '$lib/charts/AreaChart.svelte';
	import * as Card from '$lib/components/ui/card';
	import type { Habit } from '$lib/types/Habit';

	export let habit: Habit;
</script>

<Card.Root class="overflow-hidden transition-all duration-300 ease-in-out hover:border-primary">
	<a href={`/habit/${habit.id}`}>
		<Card.Header>
			<Card.Title>{habit.name}</Card.Title>
			<Card.Description>{habit.description}</Card.Description>
		</Card.Header>
		<Card.Content>
			<AreaChart data={habit.data} />
		</Card.Content>
	</a>
</Card.Root>
