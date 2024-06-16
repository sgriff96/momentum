<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import type { PageData } from './$types';
	import NewHabitForm from './NewHabitForm.svelte';

	export let data: PageData;
</script>

<div class="flex flex-row items-center justify-between">
	<h1 class="mb-4 text-2xl font-bold">Habits</h1>
	<NewHabitForm data={data.habitForm} />
</div>

<div class="flex flex-row flex-wrap gap-4">
	{#each data.habits as habit (habit.id)}
		<div class="min-w-64">
			<Habit habit={habit} habitData={habit.habit_data} preview={true} />
		</div>
	{/each}
</div>
