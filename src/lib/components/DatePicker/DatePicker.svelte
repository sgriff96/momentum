<script lang="ts">
	import type { HabitData } from '$lib/types/Habit';
	import { add, format, sub } from 'date-fns';
	import Button from '../ui/button/button.svelte';
	import { getWeekDates } from './helpers';
	import * as ToggleGroup from '$lib/components/ui/toggle-group/index.js';
	import { writable } from 'svelte/store';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

	export let habitData: HabitData[];

	const completedDatesArr = habitData.filter((d) => d.completed).map((d) => format(new Date(d.date), 'yyyy-MM-dd'));

	const today = new Date();
	$: currentWorkingDate = new Date(today);
	$: weekDates = getWeekDates(currentWorkingDate);

	const toggleGroupValues = writable(completedDatesArr);

	const goLeft = () => {
		currentWorkingDate = sub(currentWorkingDate, { weeks: 1 });
		weekDates = getWeekDates(currentWorkingDate);
	};

	const goRight = () => {
		currentWorkingDate = add(currentWorkingDate, { weeks: 1 });
		weekDates = getWeekDates(currentWorkingDate);
	};

	const onValueChange = (v: string[] | undefined) => {
		if (v) {
			toggleGroupValues.set(v);
			// POST new values to api
		}
	};
</script>

<div class="flex flex-row items-center gap-2">
	<Button on:click={goLeft} variant="outline"><ChevronLeft /></Button>
	<ToggleGroup.Root type="multiple" variant="outline" bind:value={$toggleGroupValues} onValueChange={onValueChange}>
		{#each weekDates as d}
			<ToggleGroup.Item value={format(d, 'yyyy-MM-dd')}>
				{format(d, 'E')}
				{format(d, 'MM-dd')}
			</ToggleGroup.Item>
		{/each}
	</ToggleGroup.Root>
	<Button on:click={goRight} variant="outline"><ChevronRight /></Button>
</div>
