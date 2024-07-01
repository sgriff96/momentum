<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<div class="flex flex-col gap-4">
	<h1 class="text-xl">Settings</h1>

	<div>
		<Button variant="destructive" disabled>Delete Account</Button>
	</div>
</div>
