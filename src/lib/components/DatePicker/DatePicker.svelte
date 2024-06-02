<script lang="ts">
	import type { HabitData } from '$lib/types/Habit';
	import { add, format, sub } from 'date-fns';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';
	import { createEventDispatcher } from 'svelte';
	import Button from '../ui/button/button.svelte';
	import { getWeekDates } from './helpers';
	import { fly } from 'svelte/transition'; // Import fly transition

	const dispatch = createEventDispatcher();

	export let habitData: HabitData[];

	// need to re-render when completed Date set is updated
	$: allDates = new Map(habitData.map((d) => [d.date, d]));
	//$: completedDatesMap = new Map(habitData.filter((d) => d.completed === true).map((d) => [d.date, d]));

	const today = new Date();
	$: currentWorkingDate = new Date(today);
	$: weekDates = getWeekDates(currentWorkingDate);
	let direction = 'left'; // Track the current direction of transition

	const goLeft = () => {
		direction = 'left';
		currentWorkingDate = sub(currentWorkingDate, { weeks: 1 });
		weekDates = getWeekDates(currentWorkingDate);
	};

	const goRight = () => {
		direction = 'right';
		currentWorkingDate = add(currentWorkingDate, { weeks: 1 });
		weekDates = getWeekDates(currentWorkingDate);
	};

	const onValueChange = (date: string) => {
		if (allDates.has(date)) {
			const item = allDates.get(date);

			if (!item) {
				throw new Error('Item not found');
			}

			const newItem = { ...item, completed: !item.completed };
			allDates.set(date, newItem);
			allDates = new Map(allDates);
			dispatch('onValueChange', newItem);
		} else {
			const item = { date, completed: true };

			allDates.set(date, item);
			// I'm not sure if this is idiotic or genius
			allDates = new Map(allDates);
			dispatch('onValueChange', item);
		}
	};
</script>

<div class="flex w-[57rem] flex-row items-center justify-center gap-2">
	<Button on:click={goLeft} variant="outline"><ChevronLeft /></Button>
	<div class="relative flex h-12 flex-[2_2_0%] items-center overflow-hidden">
		{#key weekDates}
			<div
				class="absolute left-0 right-0 top-0 flex h-full flex-row items-center gap-2"
				in:fly={{ x: direction === 'left' ? -500 : 500, duration: 300 }}
				out:fly={{ x: direction === 'left' ? 500 : -500, duration: 300 }}
			>
				{#each weekDates as d}
					<Button
						variant={allDates.get(d)?.completed === true ? 'default' : 'outline'}
						on:click={() => onValueChange(d)}
					>
						{format(d, 'E')}
						{format(d, 'MM-dd')}
					</Button>
				{/each}
			</div>
		{/key}
	</div>
	<Button on:click={goRight} variant="outline"><ChevronRight /></Button>
</div>
