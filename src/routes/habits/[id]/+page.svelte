<script lang="ts">
	import DatePicker from '$lib/components/DatePicker/DatePicker.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import Settings from 'lucide-svelte/icons/settings';
	import Habit from '../Habit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const habitData = data.habit.data;
</script>

<Button variant="outline"><Settings class="mr-2 h-4 w-4" /> Modify</Button>
<DatePicker habitData={habitData} />

{#if data.habit}
	<Habit habit={data.habit} />
{/if}
