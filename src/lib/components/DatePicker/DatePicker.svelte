<script lang="ts">
	import { add, sub } from 'date-fns';
	import Button from '../ui/button/button.svelte';
	import DateView from './DateView.svelte';
	import { getWeekDates } from './helpers';
	import type { HabitData } from '$lib/types/Habit';

	export let habitData: HabitData[];

	console.log('habitData', habitData);

	const today = new Date();

	$: currentWorkingDate = new Date(today);

	$: weekDates = getWeekDates(currentWorkingDate);

	const goLeft = () => {
		currentWorkingDate = sub(currentWorkingDate, { weeks: 1 });
	};

	const goRight = () => {
		currentWorkingDate = add(currentWorkingDate, { weeks: 1 });
	};
</script>

<div class="flex flex-row items-center gap-2">
	<Button on:click={goLeft}>Left</Button>
	<DateView week={weekDates} habitData={habitData} />
	<Button on:click={goRight}>Right</Button>
</div>
{currentWorkingDate}
