<script lang="ts">
	import Habit from '../Habit.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { getLocalTimeZone, parseDateTime, type DateValue } from '@internationalized/date';
	import CalendarIcon from 'lucide-svelte/icons/calendar';
	import Settings from 'lucide-svelte/icons/settings';
	import type { PageData } from './$types';
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';

	export let data: PageData;
	const habitData = data.habit.data;

	let calendarValues: DateValue[];
	$: calendarValues = habitData.map((d) => {
		const isoDate = new Date(d.date).toISOString().split('Z')[0];
		return parseDateTime(isoDate);
	});

	//console.log('calendarValues', calendarValues);

	const onClick = () => {
		const newCalendarValues = calendarValues.map((v) => {
			const newDate = v.toDate(getLocalTimeZone());
			return newDate;
		});
		// put to habit data endpoint all the data
		habitData.forEach((d, i) => {
			// console.log('d', d, 'value[i]', calendarValues[i], newCalendarValues[i]);
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
			<Calendar bind:value={calendarValues} multiple initialFocus onValueChange={(d) => console.log(d)} />
		</Popover.Content>
	</Popover.Root>
</div>

{#if data.habit}
	<Habit habit={data.habit} />
{/if}

<DatePicker habitData={habitData} />
