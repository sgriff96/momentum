<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { IHabit } from '$lib/types/Habit';

	export let habit: IHabit;
	export let preview: boolean = false;
</script>

<Card.Root class="transition-colors {preview ? 'hover:bg-primary/20' : ''}">
	<Card.Header>
		<Card.Title>
			{habit.name}
		</Card.Title>
		<Card.Description>{habit.description}</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="pb-4">
			<slot />
		</div>
	</Card.Content>
</Card.Root>
