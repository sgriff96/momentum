<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import NewHabitCard from '$lib/components/NewHabitCard.svelte';
	import type { PageData } from './$types';
	import NewHabitForm from './NewHabitForm.svelte';

	export let data: PageData;
</script>

<h1 class="mb-4 text-2xl font-bold">Habits</h1>

<div class="flex flex-row flex-wrap gap-4">
	{#each data.habits as habit (habit.id)}
		<div class="min-w-64">
			<Habit habit={habit} habitData={habit.habit_data} preview={true} />
		</div>
	{/each}
	<NewHabitCard>
		<NewHabitForm data={data.habitForm} />
	</NewHabitCard>
</div>
