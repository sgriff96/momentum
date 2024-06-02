<script lang="ts">
	export let href: string | undefined = undefined;
</script>

<a
	href={href}
	class="pl-2 text-lg font-normal text-muted-foreground transition-colors hover:text-primary"
	{...$$restProps}
>
	<slot />
</a>
