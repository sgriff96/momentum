<script lang="ts">
	import { page } from '$app/stores';

	export let href: string | undefined = undefined;
	export let onClick: undefined | ((event: MouseEvent) => void) = undefined;

	$: isActive = $page.url.pathname === href;
</script>

<a
	href={href}
	on:click={onClick}
	class="text-md rounded-md py-1 pl-2 font-normal text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground {isActive
		? 'bg-primary text-primary-foreground'
		: ''}"
	{...$$restProps}>
	<slot />
</a>
