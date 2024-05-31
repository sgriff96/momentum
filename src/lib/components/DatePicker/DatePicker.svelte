<script lang="ts">
	import type { HabitData } from '$lib/types/Habit';
	import { add, format, sub } from 'date-fns';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { getWeekDates, sortDateStrings } from './helpers';

	const dispatch = createEventDispatcher();

	export let habitData: HabitData[];

	// need to re-render when completed Date set is updated
	$: completedDatesSet = new Set(habitData.map((d) => d.date));

	const today = new Date();
	$: currentWorkingDate = new Date(today);
	$: weekDates = getWeekDates(currentWorkingDate);

	//const toggleGroupValues = writable(completedDatesSet);

	const goLeft = () => {
		currentWorkingDate = sub(currentWorkingDate, { weeks: 1 });
		weekDates = getWeekDates(currentWorkingDate);
	};

	const goRight = () => {
		currentWorkingDate = add(currentWorkingDate, { weeks: 1 });
		weekDates = getWeekDates(currentWorkingDate);
	};

	const onValueChange = (d: string) => {
		if (completedDatesSet.has(d)) {
			completedDatesSet.delete(d);
			completedDatesSet = new Set(completedDatesSet);
		} else {
			completedDatesSet.add(d);
			// I'm not sure if this is idiotic or genius
			completedDatesSet = new Set(completedDatesSet);
		}
		dispatch('onValueChange', Array.from(completedDatesSet).sort(sortDateStrings));
	};
</script>

<div class="flex flex-row items-center gap-2">
	<Button on:click={goLeft} variant="outline"><ChevronLeft /></Button>
	{#each weekDates as d}
		<Button variant={completedDatesSet.has(d) ? 'default' : 'outline'} on:click={() => onValueChange(d)}>
			{format(d, 'E')}
			{format(d, 'MM-dd')}
		</Button>
	{/each}
	<Button on:click={goRight} variant="outline"><ChevronRight /></Button>
</div>
