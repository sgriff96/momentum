<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import Habit from '$lib/components/Habit.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Button>Edit Habit</Button>

<DatePicker />

{#if data.habit}
	<Habit habit={data.habit} />
{/if}
