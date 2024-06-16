<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { type HabitFormSchema, habitFormSchema } from './schema';
	import { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Plus } from 'lucide-svelte';

	export let data: SuperValidated<Infer<HabitFormSchema>>;
	let open = false;

	const onSubmit = () => {
		if (data.valid) {
			open = false;
		}
	};

	const form = superForm(data, {
		validators: zodClient(habitFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open={open}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}>
		<Plus class="h-4 w-4" />
		<span>New Habit</span>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>New Habit</Dialog.Title>
			<form method="POST" use:enhance>
				<Form.Field form={form} name="habitName">
					<Form.Control let:attrs>
						<Form.Label>Habit Name</Form.Label>
						<Input {...attrs} bind:value={$formData.habitName} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field form={form} name="habitDescription">
					<Form.Control let:attrs>
						<Form.Label>Habit Description (optional)</Form.Label>
						<Textarea {...attrs} placeholder="A description of your habit" bind:value={$formData.habitDescription} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button on:click={onSubmit}>Submit</Form.Button>
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
