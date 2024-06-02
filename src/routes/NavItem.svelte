<script lang="ts">
	export let href: string;
</script>

<a href={href} class="group transition duration-300">
	<slot />
	<span class="block h-0.5 max-w-0 bg-primary transition-all duration-300 group-hover:max-w-full"></span>
</a>
