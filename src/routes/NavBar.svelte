<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Separator } from '$lib/components/ui/separator';
	import { toggleMode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.css';
	import type { LayoutData } from './$types';
	import NavItem from './NavItem.svelte';

	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { Menu, Settings } from 'lucide-svelte';
	import LogOut from 'lucide-svelte/icons/log-out';
	import Logo from '$lib/components/Logo.svelte';

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

<div class="hidden h-screen w-3/12 flex-col items-center justify-between border-r border-border p-6 md:flex">
	<div class="flex w-full flex-col gap-2">
		<Logo />
		<Separator />
		{#if session?.user}
			<NavItem href="/habits" variant="header">Habits</NavItem>
			<div class="flex flex-col gap-1">
				{#each data.habits as habit}
					<NavItem href="/habits/{habit.id}">{habit.name}</NavItem>
				{/each}
			</div>
			<NavItem variant="header">My Account</NavItem>
			<div class="flex flex-col gap-2">
				<NavItem href="/settings">Settings</NavItem>
				<NavItem href="/auth" onClick={logout}>Logout</NavItem>
			</div>
		{/if}
	</div>
	<Button on:click={toggleMode} variant="outline">
		<ThemeToggle />
	</Button>
</div>

<div class="flex flex-row items-center justify-between p-4 md:hidden">
	<Logo />
	{#if session?.user}
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="outline" size="icon">
					<Menu class="h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
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
					<DropdownMenu.Item href="/settings">
						<Settings class="mr-2 h-4 w-4" />
						<span>Settings</span>
					</DropdownMenu.Item>
					<DropdownMenu.Item href="/auth" on:click={logout}>
						<LogOut class="mr-2 h-4 w-4" />
						<span>Log out</span>
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item on:click={toggleMode}>
					<ThemeToggle />
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	{/if}
</div>
