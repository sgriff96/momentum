<script lang="ts">
	import { page } from '$app/stores';

	export let href: string | undefined = undefined;
	export let onClick: undefined | ((event: MouseEvent) => void) = undefined;
	export let variant: 'default' | 'header' = 'default';

	$: isActive = $page.url.pathname === href;

	const headerClasses = 'text-lg font-medium text-foreground pl-2';
</script>

<a
	href={href}
	on:click={onClick}
	class="text-md rounded-md py-1 font-normal transition-colors hover:bg-primary/30 hover:text-primary-foreground {variant ===
	'header'
		? headerClasses
		: 'px-4 text-muted-foreground'} {isActive ? 'bg-primary text-primary-foreground' : ''}"
	{...$$restProps}>
	<slot />
</a>
