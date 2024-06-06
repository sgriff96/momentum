<script lang="ts">
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import { Separator } from '$lib/components/ui/separator';

	import NavItem from './NavItem.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';

	import type { LayoutData } from './$types';

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
		setTimeout(() => {
			goto('/auth', { invalidateAll: true });
		});
	};

	// const habits = writable<IHabit[]>();
	// $: habits.set(data.habits);

	// setContext('habits', habits);
</script>

<ModeWatcher />
<div class="mx-auto my-0 max-w-screen-2xl px-[1rem] py-0">
	<div class="flex flex-row gap-10">
		<div class="flex min-h-screen w-1/6 flex-col justify-between border-r border-border px-8 py-8">
			<div class="flex flex-col gap-4">
				<a href="/habits" class="text-xl font-normal transition-colors hover:text-primary">Momentum</a>
				<Separator />
				{#if session?.user}
					<div class="flex flex-col gap-2">
						<span class="text-lg font-medium">Habits</span>
						{#each data.habits as habit}
							<NavItem href="/habits/{habit.id}">{habit.name}</NavItem>
						{/each}
					</div>
					<div class="flex flex-col gap-2">
						<span class="text-lg font-medium">Account</span>
						<a
							class="pl-2 text-lg font-normal text-muted-foreground transition-colors hover:text-primary"
							href="/auth"
							on:click={logout}>
							Logout
						</a>
					</div>
				{/if}
			</div>
			<Button on:click={toggleMode} variant="outline" size="icon">
				<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
				<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>

		<div class="flex w-3/4 flex-col pt-8">
			<div>
				<slot />
			</div>
		</div>
	</div>
</div>
