<script lang="ts">
	import type { PageData } from './$types.js';
	import * as Card from '$lib/components/ui/card';
	import LoginForm from './LoginForm.svelte';
	export let data: PageData;
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<LoginForm data={data.form} />
	</Card.Content>
</Card.Root>
