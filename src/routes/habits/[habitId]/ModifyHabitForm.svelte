<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { habitFormSchema, type HabitFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Settings } from 'lucide-svelte';
	import type { IHabit } from '$lib/types/Habit';

	export let data: SuperValidated<Infer<HabitFormSchema>>;
	export let habit: IHabit;
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

	formData.set({
		habitName: habit.name,
		habitDescription: habit.description || undefined,
	});
</script>

<Dialog.Root
	bind:open={open}
	onOutsideClick={() => {
		open = false;
	}}
>
	<Dialog.Trigger class={buttonVariants({ variant: 'default', size: 'sm' })}>
		<Settings class="mr-1 h-4 w-4" />Modify Habit</Dialog.Trigger
	>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Modify Habit</Dialog.Title>
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
				<Form.Button on:click={onSubmit}>Save</Form.Button>
			</form>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
