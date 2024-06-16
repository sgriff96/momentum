<script lang="ts">
	import { page } from '$app/stores';

	export let href: string | undefined = undefined;
	export let onClick: undefined | ((event: MouseEvent) => void) = undefined;
	export let variant: 'default' | 'header' = 'default';

	$: isActive = $page.url.pathname === href;

	const headerClasses = 'text-lg font-medium text-primary-foreground pl-2';

	console.log(href, $page.url.pathname);
</script>

<a
	href={href}
	on:click={onClick}
	class="text-md rounded-md py-1 font-normal text-muted-foreground transition-colors hover:bg-primary/80 hover:text-primary-foreground {isActive
		? 'bg-primary text-primary-foreground'
		: ''} {variant === 'header' ? headerClasses : 'pl-4'}"
	{...$$restProps}>
	<slot />
</a>
