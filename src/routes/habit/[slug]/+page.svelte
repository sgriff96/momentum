<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const habit = data.habits.find((habit) => habit.id === data.habitId);
</script>

{#if habit}
	<Habit {habit} />
{/if}
