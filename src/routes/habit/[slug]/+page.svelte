<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { getLocalTimeZone, parseDateTime, type DateValue } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Settings from 'lucide-svelte/icons/settings';
	import type { PageData } from './$types';

	export let data: PageData;
	const habitData = data.habit.habit_data;

	let value: DateValue[] = [];

	if (habitData) {
		value = habitData.map((d) => {
			const isoDate = new Date(d.date).toISOString().split('Z')[0];
			return parseDateTime(isoDate);
		});
	}

	const onClick = () => {
		const newValue = value.map((v) => {
			const newDate = v.toDate(getLocalTimeZone());
			return newDate;
		});
		// put to habit data endpoint all the data
		habitData.forEach((d, i) => {
			console.log('d', d, 'value[i]', value[i], newValue[i]);
			const id = d.id;
			// PUT /api/data/:id
		});
	};
</script>

<div class="flex gap-4 pb-2">
	<Button variant="outline" on:click={onClick}><Settings class="mr-2 h-4 w-4" /> Modify</Button>

	<Popover.Root>
		<Popover.Trigger asChild let:builder>
			<Button variant="outline" builders={[builder]} on:click={onClick}>
				<CalendarIcon class="mr-2 h-4 w-4" />
				Edit Dates
			</Button>
		</Popover.Trigger>
		<Popover.Content class="w-auto p-0">
			<Calendar bind:value={value} multiple initialFocus />
		</Popover.Content>
	</Popover.Root>
</div>

{#if data.habit}
	<Habit habit={data.habit} />
{/if}
