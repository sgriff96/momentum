<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Settings from 'lucide-svelte/icons/settings';
	import Habit from '../Habit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	//const habitData = getHabitData(data.habit);

	const handleValueChange = async (habitData: string[]) => {
		// await fetch(`/habits/${data.habit.id}`, {
		// 	method: 'PUT',
		// 	body: JSON.stringify({ habitData }),
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// });
	};
</script>

<Button variant="outline"><Settings class="mr-2 h-4 w-4" /> Modify</Button>
<DatePicker habitData={data.habitData} on:onValueChange={(event) => handleValueChange(event.detail)} />

<!-- {#if data.habit}
	<Habit habit={data.habit} />
{/if} -->
