<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	import type { LayoutData } from './$types';
	import NavBar from './NavBar.svelte';

	export let data: LayoutData;

	// const habits = writable<IHabit[]>();
	// $: habits.set(data.habits);

	// setContext('habits', habits);
</script>

<ModeWatcher />
<div class="mx-auto my-0 max-w-screen-2xl px-[1rem] py-0">
	<div class="flex flex-col md:flex-row md:gap-10">
		<NavBar data={data} />
		<div class="flex w-full flex-col pt-8 md:w-3/4">
			<div>
				<slot />
			</div>
		</div>
	</div>
</div>
