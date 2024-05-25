<script lang="ts">
	import Habit from '$lib/components/Habit.svelte';
	import { Button } from '$lib/components/ui/button';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#each data.habits as habit (habit.id)}
	<div class="my-2">
		<Habit {habit} />
	</div>
{/each}
