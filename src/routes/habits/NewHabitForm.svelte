<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { habitFormSchema, type HabitFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';

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

<div class="flex justify-between">
	<h1 class="mb-4 text-2xl font-bold">Habits</h1>
	<Dialog.Root bind:open={open}>
		<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}>New Habit</Dialog.Trigger>
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
</div>
