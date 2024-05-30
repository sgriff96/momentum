<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import type { PageData } from './$types';
	import Habit from './Habit.svelte';
	import NewHabitForm from './NewHabitForm.svelte';

	export let data: PageData;
</script>

<div class="flex justify-between">
	<h1 class="mb-4 text-2xl font-bold">Habits</h1>
	<Dialog.Root>
		<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}>New Habit</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title>New Habit</Dialog.Title>
				<NewHabitForm data={data.habitForm} />
			</Dialog.Header>
		</Dialog.Content>
	</Dialog.Root>
</div>

{#each data.habits as habit (habit.id)}
	<div class="mb-2">
		<Habit habit={habit} />
	</div>
{/each}
