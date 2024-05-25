<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import { habits } from '../../../stores';
	import type { PageData } from './$types';
	export let data: PageData;

	const habit = $habits.find((habit) => habit.id === data.habitId);
</script>

<p>Hello!</p>

{#if habit !== undefined}
	<p>{habit.name}</p>
{/if}
