<script lang="ts">
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import '../app.css';
	import { Separator } from '$lib/components/ui/separator';
	import NavItem from './NavItem.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toggleMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import type { LayoutData } from './$types';
	import { goto, invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	import LogOut from 'lucide-svelte/icons/log-out';
	import { Menu, Settings, User } from 'lucide-svelte';

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
</script>

<div
	class="flex flex-row items-center justify-between bg-card p-4 md:min-h-screen md:w-1/6 md:flex-col md:border-r md:border-border md:p-8">
	<div class="md:flex md:flex-col md:gap-4">
		<a href="/habits" class="text-xl font-normal transition-colors hover:text-primary">Momentum</a>
		<Separator class="hidden md:flex" />
		{#if session?.user}
			<div class="hidden md:flex md:flex-col md:gap-2">
				<span class="text-lg font-medium">Habits</span>
				{#each data.habits as habit}
					<NavItem href="/habits/{habit.id}">{habit.name}</NavItem>
				{/each}
			</div>
			<div class="hidden md:flex md:flex-col md:gap-2">
				<span class="text-lg font-medium">Account</span>
				<NavItem href="/auth" onClick={logout}>Logout</NavItem>
			</div>
		{/if}
	</div>
	<div class="flex flex-row items-center gap-4">
		{#if session?.user}
			<div class="md:hidden">
				<DropdownMenu.Root>
					<DropdownMenu.Trigger><Menu class="h-8 w-8" /></DropdownMenu.Trigger>
					<DropdownMenu.Content class="w-56">
						<DropdownMenu.Group>
							<DropdownMenu.Label>Habits</DropdownMenu.Label>
							<DropdownMenu.Separator />
							{#each data.habits as habit}
								<DropdownMenu.Item href="/habits/{habit.id}">{habit.name}</DropdownMenu.Item>
							{/each}
						</DropdownMenu.Group>
						<DropdownMenu.Separator />
						<DropdownMenu.Group>
							<DropdownMenu.Label>My Account</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<!-- <DropdownMenu.Item>
								<User class="mr-2 h-4 w-4" />
								<span>Profile</span>
							</DropdownMenu.Item>
							<DropdownMenu.Item>
								<Settings class="mr-2 h-4 w-4" />
								<span>Settings</span>
							</DropdownMenu.Item> -->
							<DropdownMenu.Item href="/auth" on:click={logout}>
								<LogOut class="mr-2 h-4 w-4" />
								<span>Log out</span>
							</DropdownMenu.Item>
						</DropdownMenu.Group>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>
		{/if}

		<Button on:click={toggleMode} variant="outline" size="icon">
			<Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span class="sr-only">Toggle theme</span>
		</Button>
	</div>
</div>
