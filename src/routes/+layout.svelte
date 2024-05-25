<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';

	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button/index.js';
	import NavItem from '$lib/components/NavItem.svelte';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import type { LayoutData } from './$types';
	import type { IHabit } from '$lib/types/Habit';

	export let data: LayoutData;

	const habits = writable<IHabit[]>();
	$: habits.set(data.habits);

	setContext('habits', habits);
</script>

<ModeWatcher />

<div class="mx-2">
	<div
		class="mb-2 mt-2 flex items-center justify-between rounded-md border border-border px-4 py-2"
	>
		<div class="flex gap-4">
			<NavItem href="/">Home</NavItem>
		</div>
		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
	<slot />
</div>
