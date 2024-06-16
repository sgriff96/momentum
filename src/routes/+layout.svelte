<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import type { LayoutData } from './$types';
	import NavBar from './NavBar.svelte';

	export let data: LayoutData;
</script>

<ModeWatcher />
<div class="mx-auto my-0 max-w-screen-2xl py-0 md:pr-[1rem]">
	<div class="flex flex-col md:flex-row md:gap-10">
		<NavBar data={data} />
		<div class="flex w-full flex-col px-4 pt-8 md:w-3/4 md:px-0">
			<div>
				<slot />
			</div>
		</div>
	</div>
</div>
