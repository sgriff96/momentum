<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { habitFormSchema, type HabitFormSchema } from './schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Textarea } from '$lib/components/ui/textarea';

	export let data: SuperValidated<Infer<HabitFormSchema>>;

	const form = superForm(data, {
		validators: zodClient(habitFormSchema),
	});

	const { form: formData, enhance } = form;
</script>

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
	<Form.Button>Submit</Form.Button>
</form>
