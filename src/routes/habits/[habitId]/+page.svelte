<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Settings from 'lucide-svelte/icons/settings';
	import Habit from '../Habit.svelte';
	import type { PageData } from './$types';
	import type { HabitData } from '$lib/types/Habit';

	export let data: PageData;

	const handleValueChange = async (habitData: HabitData) => {
		if (habitData.id) {
			await fetch(`/habits/${data.habit.id}/data`, {
				method: 'PUT',
				body: JSON.stringify({ habitData }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		} else {
			await fetch(`/habits/${data.habit.id}/data`, {
				method: 'POST',
				body: JSON.stringify({ habitData }),
				headers: {
					'Content-Type': 'application/json',
				},
			});
		}
	};
</script>

<Button variant="outline"><Settings class="h-4 w-4" /> Modify</Button>
<DatePicker habitData={data.habitData} on:onValueChange={(event) => handleValueChange(event.detail)} />

{#if data.habit}
	<Habit habit={data.habit} habitData={data.habitData} />
{/if}
