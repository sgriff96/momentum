<script lang="ts">
	import type { PageData } from './$types';
	import Habit from './Habit.svelte';
	import NewHabitForm from './NewHabitForm.svelte';

	export let data: PageData;
</script>

<NewHabitForm data={data.habitForm} />

{#each data.habits as habit (habit.id)}
	<div class="mb-4">
		<Habit habit={habit} habitData={habit.habit_data} />
	</div>
{/each}
