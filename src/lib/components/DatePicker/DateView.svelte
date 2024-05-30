<script lang="ts">
	import type { HabitData } from '$lib/types/Habit';
	import DayCard from './DayCard.svelte';

	export let habitData: HabitData[];
	export let week: Date[];

	$: completedHabits = new Set(habitData.filter((d) => d.completed).map((d) => new Date(d.date)));

	console.log('completedHabits', completedHabits);
</script>

<div class="flex flex-row items-center gap-2">
	{#each week as d}
		<DayCard date={d} />
	{/each}
</div>
