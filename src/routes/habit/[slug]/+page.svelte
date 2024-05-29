<script lang="ts">
	import Settings from 'lucide-svelte/icons/settings';
	import Habit from '$lib/components/Habit.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { type DateValue, getLocalTimeZone } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import type { PageData } from './$types';
	import type { HabitData } from '$lib/types/Habit';

	export let data: PageData;
	const habitData = data.habit.data as HabitData[];

	let value: DateValue[] | undefined = undefined;
	const onClick = () => {
		console.log(value);
		for (let v of value) {
			const newDate = v.toDate(getLocalTimeZone());
			console.log(newDate);
		}
	};
</script>

<div class="flex gap-4 pb-2">
	<Button on:click={onClick}><Settings class="mr-2 h-4 w-4" /> Modify</Button>

	<Popover.Root>
		<Popover.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]} on:click={onClick}>
				<CalendarIcon class="mr-2 h-4 w-4" />
				Edit Dates
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<Calendar bind:value multiple initialFocus />
		</Popover.Content>
	</Popover.Root>
</div>

{#if data.habit}
	<Habit habit={data.habit} />
{/if}
