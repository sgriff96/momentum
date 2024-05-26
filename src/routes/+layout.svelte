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

	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data: LayoutData;

	$: ({ session, supabase } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (!newSession) {
				/**
				 * Queue this as a task so the navigation won't prevent the
				 * triggering function from completing
				 */
				setTimeout(() => {
					goto('/', { invalidateAll: true });
				});
			}
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});

	$: logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error(error);
		}
	};

	// const habits = writable<IHabit[]>();
	// $: habits.set(data.habits);

	// setContext('habits', habits);
</script>

<ModeWatcher />

<div class="mx-2">
	<div
		class="mb-2 mt-2 flex items-center justify-between rounded-md border border-border px-4 py-2"
	>
		<div class="flex gap-4">
			<NavItem href="/">Home</NavItem>
		</div>
		<div class="flex gap-4">
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
			{#if session?.user}
				<Button variant="outline" on:click={logout}>Logout</Button>
			{/if}
		</div>
	</div>
	<slot />
</div>
