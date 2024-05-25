<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import type { PageData } from './$types';
	import { habits } from '../stores';

	export let data: PageData;

	habits.set(data.habits);
</script>

{#each $habits as habit (habit.id)}
	<div class="my-2">
		<Habit {habit} />
	</div>
{/each}
