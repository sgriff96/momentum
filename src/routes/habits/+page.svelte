<script lang="ts">
	import type { PageData } from './$types';
	import Habit from './Habit.svelte';
	import NewHabitForm from './NewHabitForm.svelte';

	export let data: PageData;
</script>

<div class="flex justify-between">
	<h1 class="mb-4 text-2xl font-bold">Habits</h1>
	<NewHabitForm data={data.habitForm} />
</div>

{#each data.habits as habit (habit.id)}
	<div class="mb-4">
		<Habit habit={habit} habitData={habit.habit_data} />
	</div>
{/each}
