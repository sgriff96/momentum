<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import type { HabitData } from '$lib/types/Habit';
	import Habit from '../Habit.svelte';
	import type { PageData } from './$types';
	import ModifyHabitForm from './ModifyHabitForm.svelte';

	export let data: PageData;

	$: habitData = data.habit.habit_data || [];

	const handleValueChange = async (d: HabitData) => {
		if (d.id) {
			await fetch(`/habits/${data.habit.id}/data`, {
				method: 'PUT',
				body: JSON.stringify({ habitData: d }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} else {
			await fetch(`/habits/${data.habit.id}/data`, {
				method: 'POST',
				body: JSON.stringify({ habitData: d }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
		habitData = [...habitData, d];
	};
</script>

<div class="flex justify-between">
	<h1 class="mb-4 text-2xl font-bold">{data.habit.name}</h1>
	<ModifyHabitForm data={data.habitForm} habit={data.habit} />
</div>
<DatePicker habitData={data.habit.habit_data} on:onValueChange={(event) => handleValueChange(event.detail)} />

{#if data.habit}
	<Habit habit={data.habit} bind:habitData={habitData} />
{/if}
