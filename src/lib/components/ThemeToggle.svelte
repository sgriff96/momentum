<script lang="ts">
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { mode } from 'mode-watcher';
</script>

{#if $mode === 'light'}
	<Moon class="mr-2 h-[1.2rem] w-[1.2rem] md:mr-0" />
{:else}
	<Sun class="mr-2 h-[1.2rem] w-[1.2rem] md:mr-0" />
{/if}
<span>Toggle Theme</span>
