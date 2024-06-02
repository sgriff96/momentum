<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Settings from 'lucide-svelte/icons/settings';
	import Habit from '../Habit.svelte';
	import type { PageData } from './$types';
	import type { HabitData } from '$lib/types/Habit';

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

<Button variant="outline"><Settings class="h-4 w-4" /> Modify</Button>
<DatePicker habitData={data.habit.habit_data} on:onValueChange={(event) => handleValueChange(event.detail)} />

{#if data.habit}
	<Habit habit={data.habit} bind:habitData={habitData} />
{/if}
