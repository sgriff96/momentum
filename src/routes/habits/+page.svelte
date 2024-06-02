<script lang="ts">
	import type { PageData } from './$types';
	import HabitPreview from './HabitPreview.svelte';
	import NewHabitForm from './NewHabitForm.svelte';

	export let data: PageData;
</script>

<div class="flex justify-between">
	<h1 class="mb-4 text-2xl font-bold">Habits</h1>
	<NewHabitForm data={data.habitForm} />
</div>

<div class="flex flex-row flex-wrap gap-4">
	{#each data.habits as habit (habit.id)}
		<div class="min-w-64">
			<HabitPreview habit={habit} habitData={habit.habit_data} />
		</div>
	{/each}
</div>
